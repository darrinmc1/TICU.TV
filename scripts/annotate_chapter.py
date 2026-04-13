"""
Performance annotation engine for TTS narration.

Reads parsed segment JSON files, analyzes context to determine:
- Per-segment speed modifiers based on emotional context
- Pause types (beat, breath, act break)
- Text modifications for better TTS delivery (added pauses, emphasis)
- Character voice direction tags

Produces:
  chapters_annotated/chapter_N_annotated.txt  - Performance-marked text
  chapters_annotated/chapter_N_direction.json  - Segment direction metadata

Usage:
    py -3.10 scripts/annotate_chapter.py --chapter 1
    py -3.10 scripts/annotate_chapter.py --chapter all
"""

import argparse
import json
import os
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SEGMENTS_DIR = PROJECT_ROOT / "public" / "data" / "narration"
ANNOTATED_DIR = PROJECT_ROOT / "chapters_annotated"
ANNOTATED_DIR.mkdir(parents=True, exist_ok=True)

# ── Character voice direction profiles ───────────────────────────────────────

CHARACTER_PROFILES = {
    "caelin": {
        "default_direction": "earnest, determined",
        "stress_direction": "rough, strained",
        "quiet_direction": "quiet, thoughtful",
    },
    "vex": {
        "default_direction": "dry, quick",
        "stress_direction": "sharp, clipped",
        "quiet_direction": "quieter, almost warm",
    },
    "vharisax": {
        "default_direction": "slowly, with vast weight",
        "stress_direction": "fading but insistent",
        "quiet_direction": "barely a whisper, ancient",
    },
    "gareth": {
        "default_direction": "raspy, steady",
        "stress_direction": "hoarse, urgent",
        "quiet_direction": "gentle, grief-worn",
    },
    "mira": {
        "default_direction": "small, earnest",
        "stress_direction": "frightened, gasping",
        "quiet_direction": "in a tiny voice, whispering",
    },
    "thornik": {
        "default_direction": "warm, enthusiastic",
        "stress_direction": "gruff, alarmed",
        "quiet_direction": "reverently, hushed",
    },
    "serana": {
        "default_direction": "measured, formal",
        "stress_direction": "strained, cracking",
        "quiet_direction": "quietly, precise",
    },
    "elowen": {
        "default_direction": "calm, unhurried",
        "stress_direction": "firm, urgent but controlled",
        "quiet_direction": "softly, with gentle certainty",
    },
    "durgan": {
        "default_direction": "clipped, minimal",
        "stress_direction": "through gritted teeth",
        "quiet_direction": "flatly, quiet",
    },
    "nyxara": {
        "default_direction": "theatrical, smooth",
        "stress_direction": "sharp, dropping the mask",
        "quiet_direction": "archly, with dark humor",
    },
    "aldric": {
        "default_direction": "dry, direct",
        "stress_direction": "firm, commanding",
        "quiet_direction": "matter-of-factly",
    },
    "narrator": {
        "default_direction": "neutral, measured",
        "stress_direction": "building intensity",
        "quiet_direction": "intimate, quiet",
    },
}

# ── Emotional context detection ──────────────────────────────────────────────

# Words/patterns that indicate emotional intensity
URGENT_PATTERNS = [
    r"\bran\b", r"\bgasped\b", r"\bscreamed\b", r"\bshouted\b",
    r"\bdesperately\b", r"\bfrantically\b", r"\burgent\b", r"\bhurry\b",
    r"\bRun\b", r"\bNow\b", r"\bHold on\b", r"\bLook out\b",
    r"!", r"\bcrashed\b", r"\bexploded\b", r"\bshattered\b",
    r"\bsnapped\b", r"\bslammed\b",
]

TENSE_PATTERNS = [
    r"\bhesitat", r"\bhorror\b", r"\bfear\b", r"\bterrif",
    r"\bscream", r"\bpinned\b", r"\btrapped\b", r"\bcollapsed\b",
    r"\bblood\b", r"\bwound", r"\bpain\b", r"\bgrief\b",
    r"\bdying\b", r"\bdeath\b", r"\bdead\b", r"\bkilled\b",
]

QUIET_PATTERNS = [
    r"\bwhispered\b", r"\bmurmured\b", r"\bquietly\b", r"\bsoftly\b",
    r"\bgently\b", r"\bsilence\b", r"\bstill\b", r"\bpeace\b",
    r"\bcalm\b", r"\bhushed\b", r"\bbarely audible\b",
]

SOLEMN_PATTERNS = [
    r"\bburden\b", r"\bduty\b", r"\bcompact\b", r"\bseal\b",
    r"\bancient\b", r"\bpurpose\b", r"\bdestiny\b", r"\boath\b",
    r"\bsacrifice\b", r"\bcovenant\b", r"\bvow\b",
]

AWE_PATTERNS = [
    r"\bvast\b", r"\bimmense\b", r"\btowering\b", r"\bcolossal\b",
    r"\bstared\b", r"\bgaped\b", r"\bimpossible\b", r"\bmagnificent\b",
    r"\bbreathtaking\b", r"\bglowed\b", r"\btransformed\b",
]

HUMOR_PATTERNS = [
    r"\bsmirk", r"\bsmil", r"\bironic", r"\bwry\b", r"\bdry\b",
    r"\bamus", r"\bhumor\b", r"darkly amusing",
    r"\bsardonic\b", r"\bquipped\b",
]


def detect_mood(text: str) -> str:
    """Detect the emotional mood of a segment from its text."""
    text_lower = text.lower()

    scores = {
        "urgent": sum(1 for p in URGENT_PATTERNS if re.search(p, text, re.IGNORECASE)),
        "tense": sum(1 for p in TENSE_PATTERNS if re.search(p, text_lower)),
        "quiet": sum(1 for p in QUIET_PATTERNS if re.search(p, text_lower)),
        "solemn": sum(1 for p in SOLEMN_PATTERNS if re.search(p, text_lower)),
        "awe": sum(1 for p in AWE_PATTERNS if re.search(p, text_lower)),
        "humor": sum(1 for p in HUMOR_PATTERNS if re.search(p, text_lower)),
    }

    # Short sentences (< 30 chars) with ! are urgent
    if len(text) < 30 and "!" in text:
        scores["urgent"] += 2

    # Very short narration sentences are punchy (but not dialogue — short dialogue is normal)
    if len(text) < 15 and not text.startswith('"'):
        scores["urgent"] += 1

    # Long flowing sentences are calm/descriptive
    if len(text) > 200 and scores["urgent"] == 0:
        scores["quiet"] += 1

    best = max(scores, key=scores.get)
    if scores[best] == 0:
        return "neutral"
    return best


def get_speed_for_mood(mood: str, seg_type: str, speaker: str) -> float:
    """Calculate speed multiplier based on mood, type, and speaker."""
    # Base speed adjustments by mood
    mood_speeds = {
        "urgent": 1.12,
        "tense": 1.05,
        "quiet": 0.90,
        "solemn": 0.88,
        "awe": 0.85,
        "humor": 1.05,
        "neutral": 1.0,
    }

    speed = mood_speeds.get(mood, 1.0)

    # Verse is always slower
    if seg_type == "verse":
        speed = 0.80

    # Inscription is slow and formal
    if seg_type == "inscription":
        speed = 0.78

    return round(speed, 2)


def get_direction_for_segment(seg: dict, prev_seg: dict | None, next_seg: dict | None) -> dict:
    """Determine performance direction for a segment."""
    text = seg["text"]
    speaker = seg["speaker"]
    seg_type = seg["type"]
    mood = detect_mood(text)

    profile = CHARACTER_PROFILES.get(speaker, CHARACTER_PROFILES["narrator"])

    # Pick direction based on mood
    if mood in ("urgent", "tense"):
        direction = profile["stress_direction"]
    elif mood in ("quiet", "solemn", "awe"):
        direction = profile["quiet_direction"]
    elif mood == "humor":
        if speaker == "vex":
            direction = "dry, amused"
        else:
            direction = profile["default_direction"]
    else:
        direction = profile["default_direction"]

    # Special cases for dialogue context
    if seg_type == "dialogue":
        # Detect whisper/shout from surrounding narration
        context = ""
        if prev_seg and prev_seg["type"] == "narration":
            context += prev_seg["text"].lower()
        if next_seg and next_seg["type"] == "narration":
            context += " " + next_seg["text"].lower()

        if "whisper" in context or "barely audible" in context:
            direction = "whispering"
        elif "shout" in context or "yell" in context or "scream" in context:
            direction = "shouting"
        elif "rasped" in context or "rasp" in context:
            direction = "hoarse, rasping"
        elif "murmur" in context or "mutter" in context:
            direction = "low, muttering"
        elif "laugh" in context or "chuckle" in context:
            direction = "with a laugh"
        elif "sigh" in context or "sighed" in context:
            direction = "with a sigh"

    speed = get_speed_for_mood(mood, seg_type, speaker)

    # Determine if we need a pause before this segment
    pause_before = None
    if prev_seg:
        # Act transition
        if seg.get("act") != prev_seg.get("act"):
            pause_before = {"type": "act_break", "duration_ms": 1200}
        # Major mood shift
        elif mood in ("awe", "solemn") and detect_mood(prev_seg["text"]) in ("urgent", "humor"):
            pause_before = {"type": "beat", "duration_ms": 800}
        # After short punchy lines
        elif len(prev_seg["text"]) < 20 and seg_type == "narration":
            pause_before = {"type": "breath", "duration_ms": 400}

    return {
        "direction": direction,
        "mood": mood,
        "speed": speed,
        "pause_before": pause_before,
    }


# ── Text modification for TTS ────────────────────────────────────────────────

def modify_text_for_tts(text: str, mood: str, seg_type: str) -> str:
    """Modify text to improve TTS delivery — add pauses, emphasis via punctuation."""
    modified = text

    # Replace double-dash with em dash pause
    modified = modified.replace(" -- ", "... ")

    # Add breath pauses in long sentences (split at natural points)
    if len(modified) > 200 and "," not in modified[:100]:
        # Add a comma after common conjunction points
        modified = re.sub(r"\b(and|but|then|while|as|when) ", r"\1, ", modified, count=1)

    # For urgent narration (not dialogue), add exclamation marks to short punchy lines
    if mood == "urgent" and "!" not in modified and seg_type == "narration" and len(modified) < 40:
        modified = modified.rstrip(".") + "!"

    # For trailing-off dialogue, ensure ellipsis
    if modified.endswith('"') and mood == "quiet":
        # Check if it ends with a period before the quote
        modified = re.sub(r'\."$', '..."', modified)

    # Add pause before dramatic reveals
    if mood == "awe" and re.search(r"^(At the center|There|Before|Above|Below)", modified):
        modified = "... " + modified

    return modified


# ── Main annotation pipeline ─────────────────────────────────────────────────

def annotate_chapter(chapter_num: int) -> None:
    """Annotate a chapter's segments with performance direction."""
    segments_path = SEGMENTS_DIR / f"chapter-{chapter_num}-segments.json"

    if not segments_path.exists():
        print(f"ERROR: No segments file at {segments_path}")
        print(f"  Run: py -3.10 scripts/tts-pipeline.py --chapter {chapter_num}")
        return

    with open(segments_path) as f:
        segments = json.load(f)

    print(f"\nAnnotating Chapter {chapter_num}: {len(segments)} segments")

    annotated_lines = []
    direction_segments = []

    for i, seg in enumerate(segments):
        prev_seg = segments[i - 1] if i > 0 else None
        next_seg = segments[i + 1] if i + 1 < len(segments) else None

        # Get performance direction
        dirn = get_direction_for_segment(seg, prev_seg, next_seg)

        # Modify text for TTS
        tts_text = modify_text_for_tts(seg["text"], dirn["mood"], seg["type"])

        # Build annotated text line
        if seg["type"] == "dialogue":
            speaker_name = seg["speaker"].capitalize()
            annotated_lines.append(
                f'[{speaker_name}, {dirn["direction"]}] {tts_text}'
            )
        elif seg["type"] == "verse":
            annotated_lines.append(f'{{slowly, chanting}} {tts_text}')
        elif seg["type"] == "narration":
            if dirn["mood"] != "neutral":
                annotated_lines.append(f'{{{dirn["direction"]}}} {tts_text}')
            else:
                annotated_lines.append(tts_text)

        # Add [BEAT] if needed
        if dirn["pause_before"] and dirn["pause_before"]["type"] == "beat":
            # Insert before the current line
            annotated_lines.insert(-1, "[BEAT]")

        # Build direction metadata
        direction_segments.append({
            "id": seg["id"],
            "type": seg["type"],
            "speaker": seg["speaker"],
            "direction": dirn["direction"],
            "mood": dirn["mood"],
            "speed": dirn["speed"],
            "pause_before": dirn["pause_before"],
            "original_text": seg["text"],
            "tts_text": tts_text,
            "act": seg.get("act"),
            "paragraphIndex": seg.get("paragraphIndex"),
        })

    # Save annotated text
    annotated_path = ANNOTATED_DIR / f"chapter_{chapter_num:02d}_annotated.txt"
    with open(annotated_path, "w", encoding="utf-8") as f:
        f.write("\n".join(annotated_lines))
    print(f"  Annotated text: {annotated_path}")

    # Save direction JSON
    direction_path = ANNOTATED_DIR / f"chapter_{chapter_num:02d}_direction.json"
    direction_data = {
        "chapter": chapter_num,
        "total_segments": len(direction_segments),
        "segments": direction_segments,
    }
    with open(direction_path, "w", encoding="utf-8") as f:
        json.dump(direction_data, f, indent=2)
    print(f"  Direction JSON: {direction_path}")

    # Stats
    moods = {}
    speeds = []
    pauses = 0
    for ds in direction_segments:
        moods[ds["mood"]] = moods.get(ds["mood"], 0) + 1
        speeds.append(ds["speed"])
        if ds["pause_before"]:
            pauses += 1

    print(f"  Mood distribution:")
    for mood, count in sorted(moods.items(), key=lambda x: -x[1]):
        print(f"    {mood}: {count}")
    avg_speed = sum(speeds) / len(speeds) if speeds else 1.0
    print(f"  Average speed modifier: {avg_speed:.2f}")
    print(f"  Dramatic pauses: {pauses}")


def main():
    parser = argparse.ArgumentParser(description="Chapter performance annotation")
    parser.add_argument("--chapter", type=str, default="1", help="Chapter number or 'all'")
    args = parser.parse_args()

    if args.chapter == "all":
        for ch in range(1, 13):
            seg_path = SEGMENTS_DIR / f"chapter-{ch}-segments.json"
            if seg_path.exists():
                annotate_chapter(ch)
            else:
                print(f"Skipping chapter {ch} (no segments file)")
    else:
        annotate_chapter(int(args.chapter))


if __name__ == "__main__":
    main()
