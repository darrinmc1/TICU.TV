"""
Clean chapter text files: fix encoding artifacts (smart quotes, em dashes, mojibake).
Reads from C:/Users/macca/Desktop/books/
Writes to cleaned_chapters/
"""
import os
import glob

SRC = "C:/Users/macca/Desktop/books"
DST = "C:/Users/macca/Desktop/TICU-TV/TICU.TV/cleaned_chapters"
os.makedirs(DST, exist_ok=True)

for f in sorted(glob.glob(os.path.join(SRC, "*.txt"))):
    basename = os.path.basename(f)

    # Try reading with different encodings
    text = None
    for enc in ["utf-8", "cp1252", "latin-1"]:
        try:
            with open(f, "r", encoding=enc) as fh:
                text = fh.read()
            break
        except UnicodeDecodeError:
            continue

    if text is None:
        print(f"SKIP {basename}: could not decode")
        continue

    # Fix common encoding artifacts
    replacements = {
        "\ufffd": "'",         # replacement character -> apostrophe
        "\u2018": "'",         # left single quote
        "\u2019": "'",         # right single quote
        "\u201c": '"',         # left double quote
        "\u201d": '"',         # right double quote
        "\u2014": " -- ",      # em dash -> spaced double dash (better for TTS)
        "\u2013": " - ",       # en dash -> spaced dash
        "\u2026": "...",       # ellipsis
        "\u00e2\u0080\u0099": "'",    # UTF-8 mojibake for right single quote
        "\u00e2\u0080\u009c": '"',    # mojibake for left double quote
        "\u00e2\u0080\u009d": '"',    # mojibake for right double quote
        "\u00e2\u0080\u0094": " -- ", # mojibake for em dash
        "\u00e2\u0080\u0093": " - ",  # mojibake for en dash
    }
    for old, new in replacements.items():
        text = text.replace(old, new)

    # Clean up double spaces from em dash replacement
    while "  " in text:
        text = text.replace("  ", " ")

    out_path = os.path.join(DST, basename)
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(text)

    # Check for remaining non-ASCII
    non_ascii = set()
    for ch in text:
        if ord(ch) > 127:
            non_ascii.add(ch)

    status = f"  non-ASCII remaining: {non_ascii}" if non_ascii else ""
    print(f"{basename}: {len(text):,} chars{status}")

print(f"\nDone. {len(glob.glob(os.path.join(DST, '*.txt')))} files in {DST}")
