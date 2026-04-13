"""
TTS Pipeline for TICU.TV - Generates multi-character narration audio using Kokoro.

Usage:
    py -3.10 scripts/tts-pipeline.py --chapter 1
    py -3.10 scripts/tts-pipeline.py --chapter 1 --test-voices
    py -3.10 scripts/tts-pipeline.py --chapter all

Steps:
  1. Parse chapter text into segments (narration/dialogue/verse)
  2. Generate audio per segment using Kokoro TTS
  3. Stitch segments into full chapter MP3
  4. Produce timing JSON for frontend sync
"""

import argparse
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

import numpy as np
import soundfile as sf

# ── Paths ────────────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CLEANED_DIR = PROJECT_ROOT / "cleaned_chapters"
AUDIO_DIR = PROJECT_ROOT / "public" / "audio" / "chapters"
DATA_DIR = PROJECT_ROOT / "public" / "data" / "narration"
FFMPEG = "C:/ffmpeg/bin/ffmpeg.exe"

SAMPLE_RATE = 24000

# ── Voice Map ────────────────────────────────────────────────────────────────

VOICE_MAP = {
    "narrator":    {"voice": "bm_daniel",  "speed": 0.95, "label": "Narrator"},
    "caelin":      {"voice": "am_michael", "speed": 1.0,  "label": "Caelin"},
    "vex":         {"voice": "af_jessica", "speed": 1.1,  "label": "Vex"},
    "thornik":     {"voice": "bm_george",  "speed": 1.05, "label": "Thornik"},
    "serana":      {"voice": "bf_emma",    "speed": 0.95, "label": "Serana"},
    "elowen":      {"voice": "af_nova",    "speed": 0.9,  "label": "Elowen"},
    "durgan":      {"voice": "am_fenrir",  "speed": 0.9,  "label": "Durgan"},
    "nyxara":      {"voice": "af_kore",    "speed": 1.0,  "label": "Nyxara"},
    "aldric":      {"voice": "am_onyx",    "speed": 0.9,  "label": "Aldric"},
    "vharisax":    {"voice": "bf_alice",   "speed": 0.8,  "label": "Vharisax"},
    "mira":        {"voice": "af_heart",   "speed": 1.05, "label": "Mira"},
    "gareth":      {"voice": "bm_lewis",   "speed": 0.9,  "label": "Gareth"},
    "scale":       {"voice": "af_alloy",   "speed": 0.85, "label": "Scale"},
    "inscription": {"voice": "bm_fable",   "speed": 0.8,  "label": "Inscription"},
    "unknown":     {"voice": "bm_daniel",  "speed": 0.95, "label": "Unknown"},
}

# ── Chapter File Mapping ─────────────────────────────────────────────────────

CHAPTER_FILES = {
    1:  ["Ch1_revised.txt"],
    2:  ["Ch2_revised.txt"],
    3:  ["Ch3_revised.txt"],
    4:  ["Ch4_revised.txt"],
    5:  ["Ch5_revised.txt"],
    6:  ["Ch6_revised.txt"],
    7:  ["Ch7_revised.txt"],
    8:  ["Ch8_revised.txt"],
    9:  ["Ch9_revised.txt"],
    10: ["Ch10_road.txt"],
    11: ["Ch11_boundary.txt"],
    12: ["Epilogue.txt"],  # chapter 12 = epilogue
}

CHAPTER_TITLES = {
    1: "The Dragon's Last Breath",
    2: "Gathering Shadows",
    3: "Nature's Messenger",
    4: "Bonds and Burdens",
    5: "The Undervault",
    6: "Stone That Breathes",
    7: "The Fractured Sanctum",
    8: "Down from the Peaks",
    9: "The Siege",
    10: "Road to the Plateau",
    11: "Before the Boundary",
    12: "Epilogue",
}

# ── Known Speakers per Chapter ───────────────────────────────────────────────

CHAPTER_SPEAKERS = {
    1: ["caelin", "vex", "vharisax", "gareth", "mira"],
    2: ["caelin", "vex", "gareth", "mira", "thornik", "serana"],
    3: ["caelin", "vex", "elowen", "thornik"],
    4: ["caelin", "vex", "thornik", "elowen", "gareth", "mira"],
    5: ["caelin", "vex", "thornik", "elowen", "durgan"],
    6: ["caelin", "vex", "thornik", "elowen", "durgan"],
    7: ["caelin", "vex", "thornik", "elowen", "nyxara"],
    8: ["caelin", "vex", "thornik", "elowen", "nyxara"],
    9: ["caelin", "vex", "thornik", "elowen", "aldric"],
    10: ["caelin", "vex", "thornik", "elowen"],
    11: ["caelin", "vex", "thornik", "elowen"],
    12: ["caelin", "vex"],
}

# All known character names for speaker detection
ALL_SPEAKERS = {
    "caelin", "vex", "thornik", "serana", "elowen", "durgan",
    "nyxara", "aldric", "gareth", "mira", "vharisax", "scale",
    "virella",  # Vex's full name
}

SPEECH_VERBS = (
    "said|asked|whispered|murmured|called|hissed|rasped|growled|shouted|"
    "replied|answered|observed|continued|added|muttered|breathed|snapped|"
    "demanded|offered|suggested|warned|noted|told|began|finished|started|"
    "insisted|declared|protested|announced|sighed|laughed|grunted|mused|"
    "pressed|prompted|conceded|admitted|agreed|corrected|explained|"
    "interrupted|managed|ventured|grumbled|scoffed|chuckled|grinned|"
    "remarked|reported|volunteered|countered"
)


# ── Step 1: Parse chapter into segments ──────────────────────────────────────

def parse_chapter(chapter_num: int) -> list[dict]:
    """Parse a chapter text file into an ordered list of segments."""
    text = ""
    for fname in CHAPTER_FILES[chapter_num]:
        fpath = CLEANED_DIR / fname
        with open(fpath, "r", encoding="utf-8") as f:
            text += f.read() + "\n"

    # Split into acts
    acts = split_into_acts(text, chapter_num)
    segments = []
    seg_counter = 0

    for act_num, act_text in enumerate(acts, 1):
        paragraphs = [p.strip() for p in act_text.split("\n") if p.strip()]

        for para_idx, paragraph in enumerate(paragraphs):
            # Skip act headers
            if re.match(r"^(Act\s+[IVXLC]+|ACT\s+[IVXLC]+|[IVXLC]+\.)\s*", paragraph):
                continue
            if re.match(r"^Chapter\s+\d+", paragraph, re.IGNORECASE):
                continue

            # Check for verse (the dragon rhyme)
            if is_verse(paragraph):
                seg_counter += 1
                segments.append({
                    "id": f"ch{chapter_num}-act{act_num}-seg{seg_counter:03d}",
                    "type": "verse",
                    "speaker": "narrator",
                    "text": paragraph,
                    "act": act_num,
                    "paragraphIndex": para_idx,
                })
                continue

            # Split paragraph into narration/dialogue segments
            para_segments = segment_paragraph(paragraph, chapter_num)
            for ps in para_segments:
                seg_counter += 1
                segments.append({
                    "id": f"ch{chapter_num}-act{act_num}-seg{seg_counter:03d}",
                    "type": ps["type"],
                    "speaker": ps["speaker"],
                    "text": ps["text"],
                    "act": act_num,
                    "paragraphIndex": para_idx,
                })

    # Post-process: resolve unknown speakers via alternation
    resolve_unknown_speakers(segments)

    return segments


def split_into_acts(text: str, chapter_num: int) -> list[str]:
    """Split chapter text into acts."""
    if chapter_num == 12:  # Epilogue uses I. II. III.
        pattern = r"^([IVXLC]+\.)\s*$"
        parts = re.split(pattern, text, flags=re.MULTILINE)
        acts = []
        i = 1
        while i < len(parts):
            if i + 1 < len(parts):
                acts.append(parts[i + 1])
            i += 2
        if not acts:
            acts = [text]
        return acts

    # Standard act headers: "Act I:", "ACT II:", "Act III --", etc.
    pattern = r"^(?:Act|ACT)\s+[IVXLC]+\s*(?::|--| --|\u2014)?\s*.*$"
    parts = re.split(pattern, text, flags=re.MULTILINE)

    # First part may be chapter title/preamble
    acts = [p.strip() for p in parts if p.strip()]

    # If only 1 act found, the whole text is one act
    if len(acts) <= 1:
        acts = [text]

    return acts


def is_verse(text: str) -> bool:
    """Check if text is the dragon rhyme or a verse passage."""
    verse_markers = ["Nine the arts", "eight the seals", "Seven the keepers"]
    return any(marker in text for marker in verse_markers)


def segment_paragraph(paragraph: str, chapter_num: int) -> list[dict]:
    """Split a paragraph into narration and dialogue segments."""
    # Find quoted dialogue spans
    quotes = find_quoted_spans(paragraph)

    if not quotes:
        # Pure narration - split into sentence chunks for TTS (max ~200 chars)
        return split_narration(paragraph)

    segments = []
    last_end = 0
    last_speaker = None

    for q_start, q_end in quotes:
        # Narration before this quote
        if q_start > last_end:
            narr_text = paragraph[last_end:q_start].strip()
            if narr_text:
                segments.extend(split_narration(narr_text))

        # The dialogue itself
        dialogue_text = paragraph[q_start:q_end].strip()
        if dialogue_text:
            # Try to detect speaker from surrounding context
            speaker = detect_speaker_context(
                paragraph, q_start, q_end, last_speaker
            )
            last_speaker = speaker if speaker != "unknown" else last_speaker
            segments.append({
                "type": "dialogue",
                "speaker": speaker,
                "text": dialogue_text,
            })

        last_end = q_end

    # Trailing narration
    if last_end < len(paragraph):
        trail = paragraph[last_end:].strip()
        if trail:
            segments.extend(split_narration(trail))

    return segments


def find_quoted_spans(text: str) -> list[tuple[int, int]]:
    """Find all quoted dialogue spans in text."""
    spans = []
    i = 0
    while i < len(text):
        if text[i] == '"':
            # Find closing quote
            j = text.find('"', i + 1)
            if j == -1:
                break
            spans.append((i, j + 1))
            i = j + 1
        else:
            i += 1
    return spans


def detect_speaker_context(
    paragraph: str, q_start: int, q_end: int, last_speaker: str | None
) -> str:
    """Detect who is speaking a quoted passage from surrounding context."""
    # Look at text after the closing quote (attribution)
    after = paragraph[q_end:q_end + 80].strip()
    # Pattern: "dialogue," Name verb
    m = re.match(
        rf'[,.]?\s*([A-Z][a-z]+)\s+(?:{SPEECH_VERBS})',
        after
    )
    if m:
        name = m.group(1).lower()
        if name in ALL_SPEAKERS:
            return "vex" if name == "virella" else name

    # Look at text before the quote
    before = paragraph[max(0, q_start - 80):q_start].strip()
    # Pattern: Name verb, "dialogue"
    m = re.search(
        rf'([A-Z][a-z]+)\s+(?:{SPEECH_VERBS})\s*[,:]?\s*$',
        before
    )
    if m:
        name = m.group(1).lower()
        if name in ALL_SPEAKERS:
            return "vex" if name == "virella" else name

    return "unknown"


def split_narration(text: str) -> list[dict]:
    """Split narration text into sentence-sized chunks for TTS."""
    if len(text) < 300:
        return [{"type": "narration", "speaker": "narrator", "text": text}]

    # Split on sentence boundaries
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current = ""

    for sentence in sentences:
        if len(current) + len(sentence) > 250 and current:
            chunks.append(current.strip())
            current = sentence
        else:
            current = (current + " " + sentence).strip()

    if current:
        chunks.append(current.strip())

    return [
        {"type": "narration", "speaker": "narrator", "text": c}
        for c in chunks if c
    ]


def resolve_unknown_speakers(segments: list[dict]) -> None:
    """Post-process: resolve 'unknown' speakers via dialogue alternation."""
    for i, seg in enumerate(segments):
        if seg["type"] != "dialogue" or seg["speaker"] != "unknown":
            continue

        # Find the two most recent distinct dialogue speakers
        recent = []
        for j in range(i - 1, -1, -1):
            if segments[j]["type"] == "dialogue" and segments[j]["speaker"] not in ("unknown", "narrator"):
                if segments[j]["speaker"] not in recent:
                    recent.append(segments[j]["speaker"])
                if len(recent) >= 2:
                    break

        if len(recent) >= 2:
            # Find immediate previous dialogue speaker
            prev_speaker = None
            for j in range(i - 1, -1, -1):
                if segments[j]["type"] == "dialogue" and segments[j]["speaker"] != "narrator":
                    prev_speaker = segments[j]["speaker"]
                    break
            # Alternate
            seg["speaker"] = recent[1] if prev_speaker == recent[0] else recent[0]
        elif len(recent) == 1:
            seg["speaker"] = recent[0]


# ── Step 2: Generate audio per segment ───────────────────────────────────────

_pipeline = None

def get_pipeline():
    """Lazy-load the Kokoro pipeline."""
    global _pipeline
    if _pipeline is None:
        from kokoro import KPipeline
        print("Loading Kokoro TTS pipeline...")
        _pipeline = KPipeline(lang_code="a")
        print("Kokoro ready.")
    return _pipeline


def generate_segment_audio(
    segment: dict, output_dir: Path, direction: dict | None = None
) -> dict | None:
    """Generate a WAV file for a single segment. Returns audio info or None.

    If direction is provided, uses its speed modifier and tts_text.
    """
    pipeline = get_pipeline()
    voice_config = VOICE_MAP.get(segment["speaker"], VOICE_MAP["narrator"])
    voice = voice_config["voice"]
    base_speed = voice_config["speed"]

    # Apply direction-based speed on top of character base speed
    if direction:
        direction_speed = direction.get("speed", 1.0)
        speed = round(base_speed * direction_speed, 2)
        speed = max(0.6, min(1.5, speed))  # clamp
        tts_text = direction.get("tts_text", segment["text"])
    else:
        speed = base_speed
        tts_text = segment["text"]

    filepath = output_dir / f"{segment['id']}.wav"

    # Skip if already generated (use --force to regenerate)
    if not _force_regenerate and filepath.exists() and filepath.stat().st_size > 100:
        audio_data, sr = sf.read(str(filepath))
        duration = len(audio_data) / sr
        return {
            "id": segment["id"],
            "file": filepath.name,
            "filepath": str(filepath),
            "duration": duration,
        }

    try:
        audio_chunks = []
        for _graphemes, _phonemes, audio in pipeline(
            tts_text, voice=voice, speed=speed
        ):
            if audio is not None:
                audio_chunks.append(audio)

        if not audio_chunks:
            print(f"  WARNING: No audio generated for {segment['id']}")
            return None

        full_audio = np.concatenate(audio_chunks)
        sf.write(str(filepath), full_audio, SAMPLE_RATE)

        duration = len(full_audio) / SAMPLE_RATE
        return {
            "id": segment["id"],
            "file": filepath.name,
            "filepath": str(filepath),
            "duration": duration,
        }

    except Exception as e:
        print(f"  ERROR generating {segment['id']}: {e}")
        return None


# ── Step 3: Stitch into full chapter audio ───────────────────────────────────

def stitch_chapter(
    chapter_num: int,
    segments: list[dict],
    audio_info: dict[str, dict],
    output_dir: Path,
    direction_map: dict[str, dict] | None = None,
) -> list[dict]:
    """Concatenate segment WAVs into a single chapter WAV, then convert to MP3.

    If direction_map is provided, uses its pause_before metadata for gap sizing.
    """
    all_audio = []
    timing = []
    current_time = 0.0
    prev_act = None

    for i, seg in enumerate(segments):
        info = audio_info.get(seg["id"])
        if info is None:
            continue

        audio_data, _sr = sf.read(info["filepath"])

        # Add silence gaps — use direction pauses if available
        if i > 0:
            dirn = direction_map.get(seg["id"]) if direction_map else None
            pause = dirn.get("pause_before") if dirn else None

            if pause:
                gap_duration = pause["duration_ms"] / 1000.0
            elif prev_act is not None and seg.get("act") != prev_act:
                gap_duration = 1.2  # act break
            elif seg["type"] == "dialogue":
                gap_duration = 0.15
            else:
                gap_duration = 0.3

            gap = np.zeros(int(SAMPLE_RATE * gap_duration))
            all_audio.append(gap)
            current_time += gap_duration

        timing.append({
            "id": seg["id"],
            "start": round(current_time, 3),
            "end": round(current_time + info["duration"], 3),
            "speaker": seg["speaker"],
            "type": seg["type"],
            "text": seg["text"],
        })

        all_audio.append(audio_data)
        current_time += info["duration"]
        prev_act = seg.get("act")

    if not all_audio:
        print("  ERROR: No audio to stitch!")
        return []

    combined = np.concatenate(all_audio)

    # Save combined WAV
    wav_path = output_dir / f"chapter-{chapter_num}.wav"
    sf.write(str(wav_path), combined, SAMPLE_RATE)
    print(f"  Combined WAV: {wav_path} ({current_time:.1f}s)")

    # Convert to MP3
    mp3_path = output_dir / f"chapter-{chapter_num}.mp3"
    try:
        subprocess.run(
            [FFMPEG, "-i", str(wav_path), "-b:a", "192k", "-y", str(mp3_path)],
            check=True,
            capture_output=True,
        )
        print(f"  MP3: {mp3_path}")
        # Remove WAV to save space
        wav_path.unlink()
    except subprocess.CalledProcessError as e:
        print(f"  WARNING: ffmpeg conversion failed: {e.stderr[:200]}")
        print(f"  Keeping WAV at {wav_path}")

    return timing


# ── Step 4: Generate timing manifest ─────────────────────────────────────────

def save_timing(chapter_num: int, timing: list[dict]) -> None:
    """Save timing JSON for frontend sync."""
    chapter_slug = "epilogue" if chapter_num == 12 else f"chapter-{chapter_num}"
    mp3_file = f"/audio/chapters/chapter-{chapter_num}.mp3"

    total_duration = timing[-1]["end"] if timing else 0

    manifest = {
        "chapter": chapter_num,
        "title": CHAPTER_TITLES[chapter_num],
        "audioFile": mp3_file,
        "totalDuration": round(total_duration, 3),
        "segments": timing,
    }

    out_path = DATA_DIR / f"chapter-{chapter_num}-timing.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"  Timing JSON: {out_path} ({len(timing)} segments, {total_duration:.1f}s)")


def save_segments(chapter_num: int, segments: list[dict]) -> None:
    """Save parsed segments JSON."""
    out_path = DATA_DIR / f"chapter-{chapter_num}-segments.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(segments, f, indent=2)
    print(f"  Segments JSON: {out_path} ({len(segments)} segments)")


# ── Voice Testing ────────────────────────────────────────────────────────────

def test_voices():
    """Generate a short sample from each voice to test quality."""
    pipeline = get_pipeline()
    test_dir = AUDIO_DIR / "voice-tests"
    test_dir.mkdir(parents=True, exist_ok=True)

    samples = {
        "narrator": "The sun set behind the mountains, casting long shadows across the valley below.",
        "caelin": "I won't let them down. Not this time. Not ever again.",
        "vex": "Oh, that's a terrible plan. I love it. Let's go.",
        "vharisax": "The compact must continue. The Nine must be found.",
        "gareth": "Listen carefully, boy. The old ways remember, even if men forget.",
        "mira": "Look! The stars are different tonight. Can you see them?",
        "thornik": "By the deep roots! That's the finest stonework I've ever laid eyes on.",
        "elowen": "The forest speaks to those who listen. Be still.",
        "durgan": "We dig. We endure. That is the dwarf way.",
        "serana": "The Council will not be pleased with this development.",
    }

    for speaker, text in samples.items():
        config = VOICE_MAP.get(speaker, VOICE_MAP["narrator"])
        voice = config["voice"]
        speed = config["speed"]

        print(f"  Testing {speaker} ({voice}, speed={speed})...")
        try:
            audio_chunks = []
            for _, _, audio in pipeline(text, voice=voice, speed=speed):
                if audio is not None:
                    audio_chunks.append(audio)

            if audio_chunks:
                full = np.concatenate(audio_chunks)
                out = test_dir / f"test-{speaker}-{voice}.wav"
                sf.write(str(out), full, SAMPLE_RATE)
                dur = len(full) / SAMPLE_RATE
                print(f"    OK: {out.name} ({dur:.1f}s)")
            else:
                print(f"    FAIL: no audio produced")
        except Exception as e:
            print(f"    ERROR: {e}")


# ── Main Pipeline ────────────────────────────────────────────────────────────

def process_chapter(chapter_num: int) -> None:
    """Full pipeline for one chapter."""
    print(f"\n{'='*60}")
    print(f"  Processing Chapter {chapter_num}: {CHAPTER_TITLES[chapter_num]}")
    print(f"{'='*60}\n")

    # Ensure directories exist
    seg_audio_dir = AUDIO_DIR / f"chapter-{chapter_num}"
    seg_audio_dir.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    # Step 1: Parse
    print("Step 1: Parsing chapter into segments...")
    t0 = time.time()
    segments = parse_chapter(chapter_num)
    save_segments(chapter_num, segments)

    # Stats
    types = {}
    speakers = {}
    for s in segments:
        types[s["type"]] = types.get(s["type"], 0) + 1
        speakers[s["speaker"]] = speakers.get(s["speaker"], 0) + 1

    print(f"  Total segments: {len(segments)}")
    for t, c in sorted(types.items()):
        print(f"    {t}: {c}")
    print(f"  Speakers:")
    for sp, c in sorted(speakers.items(), key=lambda x: -x[1]):
        print(f"    {sp}: {c}")

    unknowns = [s for s in segments if s["speaker"] == "unknown"]
    if unknowns:
        print(f"\n  WARNING: {len(unknowns)} segments with unknown speaker:")
        for u in unknowns[:5]:
            print(f"    {u['id']}: {u['text'][:60]}...")

    parse_time = time.time() - t0
    print(f"  Parse time: {parse_time:.1f}s\n")

    # Step 1.5: Load direction data if available
    direction_path = PROJECT_ROOT / "chapters_annotated" / f"chapter_{chapter_num:02d}_direction.json"
    direction_map: dict[str, dict] = {}
    if direction_path.exists():
        with open(direction_path) as f:
            direction_data = json.load(f)
        for ds in direction_data.get("segments", []):
            direction_map[ds["id"]] = ds
        print(f"  Loaded direction data: {len(direction_map)} segments with performance annotations")
    else:
        print("  No direction data found — using flat speed")

    # Step 2: Generate audio
    print("Step 2: Generating audio per segment...")
    t0 = time.time()
    audio_info = {}
    failed = []

    for i, seg in enumerate(segments):
        if (i + 1) % 25 == 0 or i == 0:
            print(f"  Generating {i+1}/{len(segments)}...")

        dirn = direction_map.get(seg["id"])
        info = generate_segment_audio(seg, seg_audio_dir, direction=dirn)
        if info:
            audio_info[seg["id"]] = info
        else:
            failed.append(seg["id"])

    gen_time = time.time() - t0
    print(f"  Generated: {len(audio_info)}/{len(segments)} segments in {gen_time:.1f}s")
    if failed:
        print(f"  FAILED: {len(failed)} segments: {failed[:5]}")

    # Step 3: Stitch
    print("\nStep 3: Stitching into full chapter audio...")
    t0 = time.time()
    timing = stitch_chapter(chapter_num, segments, audio_info, AUDIO_DIR, direction_map)
    stitch_time = time.time() - t0
    print(f"  Stitch time: {stitch_time:.1f}s")

    # Step 4: Save timing
    print("\nStep 4: Saving timing manifest...")
    save_timing(chapter_num, timing)

    total_time = parse_time + gen_time + stitch_time
    total_duration = timing[-1]["end"] if timing else 0
    print(f"\n{'='*60}")
    print(f"  Chapter {chapter_num} complete!")
    print(f"  Audio duration: {total_duration:.1f}s ({total_duration/60:.1f} min)")
    print(f"  Processing time: {total_time:.1f}s ({total_time/60:.1f} min)")
    print(f"  Segments: {len(audio_info)} generated, {len(failed)} failed")
    print(f"{'='*60}\n")


_force_regenerate = False


def main():
    global _force_regenerate

    parser = argparse.ArgumentParser(description="TICU.TV TTS Pipeline")
    parser.add_argument(
        "--chapter", type=str, default="1",
        help="Chapter number (1-12) or 'all'"
    )
    parser.add_argument(
        "--test-voices", action="store_true",
        help="Generate voice test samples only"
    )
    parser.add_argument(
        "--force", action="store_true",
        help="Force regeneration of all audio (ignore cached WAVs)"
    )
    args = parser.parse_args()
    _force_regenerate = args.force

    if args.test_voices:
        print("Testing Kokoro voices...\n")
        test_voices()
        return

    if args.chapter == "all":
        chapters = list(range(1, 13))
    else:
        chapters = [int(args.chapter)]

    for ch in chapters:
        if ch not in CHAPTER_FILES:
            print(f"ERROR: No source file for chapter {ch}")
            continue
        process_chapter(ch)

    # Generate master manifest
    if len(chapters) > 1:
        generate_master_manifest()


def generate_master_manifest():
    """Create manifest.json listing all processed chapters."""
    manifest = {"chapters": []}

    for ch in range(1, 13):
        timing_path = DATA_DIR / f"chapter-{ch}-timing.json"
        if timing_path.exists():
            with open(timing_path) as f:
                data = json.load(f)
            manifest["chapters"].append({
                "chapter": ch,
                "title": data["title"],
                "audioFile": data["audioFile"],
                "totalDuration": data["totalDuration"],
                "segmentCount": len(data["segments"]),
            })

    out = DATA_DIR / "manifest.json"
    with open(out, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"Master manifest: {out} ({len(manifest['chapters'])} chapters)")


if __name__ == "__main__":
    main()
