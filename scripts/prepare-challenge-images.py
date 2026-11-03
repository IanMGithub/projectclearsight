#!/usr/bin/env python3
"""Copy challenge images into public/challenge without altering pixels.

Source files use a .PNG extension but their bytes are JPEG. Copies keep those
bytes and use a lowercase .jpg extension. Originals in
challenge-images-originals/ are not modified.

The public dataset does not include the original Real/Fake filenames.
Which file is pair-XX-a is fixed below so "a" is not always the photograph.
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "challenge-images-originals"
DEST = ROOT / "public" / "challenge"
MAPPING = ROOT / "data" / "challenge-image-mapping.json"

REAL_NAME = re.compile(r"^Real([A-Za-z]+)\.PNG$")
FAKE_NAME = re.compile(r"^Fake([A-Za-z]+)1\.PNG$")

# Fixed, reviewable slot assignment. Not a rule that A is the photograph.
PHOTOGRAPH_SLOT = {
    "Burger": "a",
    "Cake": "b",
    "Cat": "b",
    "Clock": "a",
    "Cup": "b",
    "Dog": "a",
    "Flower": "a",
    "Pizza": "b",
    "Plant": "a",
    "Tree": "b",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    digest.update(path.read_bytes())
    return digest.hexdigest()


def jpeg_size(data: bytes) -> tuple[int, int]:
    if data[:2] != b"\xff\xd8":
        raise SystemExit("Refusing to copy a file that is not JPEG data.")
    index = 2
    while index < len(data) - 1:
        if data[index] != 0xFF:
            raise SystemExit("Invalid JPEG marker structure.")
        index += 1
        while data[index] == 0xFF:
            index += 1
        marker = data[index]
        index += 1
        if marker in {0xD8, 0xD9}:
            continue
        if marker == 0x01 or 0xD0 <= marker <= 0xD7:
            continue
        if index + 2 > len(data):
            break
        length = int.from_bytes(data[index : index + 2], "big")
        if marker in {0xC0, 0xC1, 0xC2}:
            height = int.from_bytes(data[index + 3 : index + 5], "big")
            width = int.from_bytes(data[index + 5 : index + 7], "big")
            return width, height
        index += length
    raise SystemExit("Could not read JPEG dimensions.")


def match_sources() -> dict[str, dict[str, Path]]:
    if not SOURCE.is_dir():
        raise SystemExit(f"Missing source folder: {SOURCE}")

    files = sorted(path for path in SOURCE.iterdir() if path.is_file() and not path.name.startswith("."))
    pairs: dict[str, dict[str, Path]] = {}
    unknown: list[str] = []

    for path in files:
        real = REAL_NAME.fullmatch(path.name)
        fake = FAKE_NAME.fullmatch(path.name)
        if real:
            slot = pairs.setdefault(real.group(1), {})
            if "photograph" in slot:
                raise SystemExit(f"Multiple photograph files for {real.group(1)}.")
            slot["photograph"] = path
        elif fake:
            slot = pairs.setdefault(fake.group(1), {})
            if "ai" in slot:
                raise SystemExit(f"Multiple AI-image files for {fake.group(1)}.")
            slot["ai"] = path
        else:
            unknown.append(path.name)

    if unknown:
        raise SystemExit("Unrecognized source filenames: " + ", ".join(unknown))

    incomplete = [subject for subject, slot in pairs.items() if set(slot) != {"photograph", "ai"}]
    if incomplete:
        raise SystemExit("Subjects missing a photograph or AI image: " + ", ".join(sorted(incomplete)))

    expected = set(PHOTOGRAPH_SLOT)
    found = set(pairs)
    if found != expected:
        raise SystemExit(
            "Subject list does not match the known pairs. "
            f"Missing: {sorted(expected - found)}. Unexpected: {sorted(found - expected)}."
        )
    return pairs


def main() -> None:
    before = {path.name: sha256(path) for path in sorted(SOURCE.iterdir()) if path.is_file()}
    pairs = match_sources()
    DEST.mkdir(parents=True, exist_ok=True)
    MAPPING.parent.mkdir(parents=True, exist_ok=True)

    mapping_pairs = []

    for number, subject in enumerate(sorted(pairs), start=1):
        pair_id = f"pair-{number:02d}"
        photo_slot = PHOTOGRAPH_SLOT[subject]
        slots = {}
        for role, source in (("photograph", pairs[subject]["photograph"]), ("ai", pairs[subject]["ai"])):
            slot = photo_slot if role == "photograph" else ("b" if photo_slot == "a" else "a")
            filename = f"{pair_id}-{slot}.jpg"
            target = DEST / filename
            data = source.read_bytes()
            width, height = jpeg_size(data)
            target.write_bytes(data)
            if target.read_bytes() != data:
                raise SystemExit(f"Copy mismatch for {filename}")
            slots[role] = {
                "file": filename,
                "src": f"/challenge/{filename}",
                "width": width,
                "height": height,
                "bytes": len(data),
                "sha256": hashlib.sha256(data).hexdigest(),
                "original": source.name,
            }

        images = []
        for slot in ("a", "b"):
            role = "photograph" if slots["photograph"]["file"].endswith(f"-{slot}.jpg") else "ai"
            info = slots[role]
            images.append(
                {
                    "id": f"{pair_id}-{slot}",
                    "src": info["src"],
                    "width": info["width"],
                    "height": info["height"],
                    "kind": "photograph" if role == "photograph" else "ai-generated",
                }
            )

        kinds = [image["kind"] for image in images]
        if kinds.count("photograph") != 1 or kinds.count("ai-generated") != 1:
            raise SystemExit(f"{pair_id} does not contain exactly one photograph and one AI image.")

        mapping_pairs.append(
            {
                "subject": subject,
                "originalPhotograph": slots["photograph"]["original"],
                "originalAiImage": slots["ai"]["original"],
                "photographFile": slots["photograph"]["file"],
                "aiImageFile": slots["ai"]["file"],
                "newFilenames": [slots["photograph"]["file"], slots["ai"]["file"]],
                "photograph": {
                    "file": slots["photograph"]["file"],
                    "sha256": slots["photograph"]["sha256"],
                    "bytes": slots["photograph"]["bytes"],
                    "width": slots["photograph"]["width"],
                    "height": slots["photograph"]["height"],
                },
                "aiImage": {
                    "file": slots["ai"]["file"],
                    "sha256": slots["ai"]["sha256"],
                    "bytes": slots["ai"]["bytes"],
                    "width": slots["ai"]["width"],
                    "height": slots["ai"]["height"],
                },
            }
        )
    expected_files = {name for record in mapping_pairs for name in record["newFilenames"]}
    for path in DEST.iterdir():
        if path.is_file() and path.name not in expected_files:
            path.unlink()

    after = {path.name: sha256(path) for path in sorted(SOURCE.iterdir()) if path.is_file()}
    if after != before:
        raise SystemExit("Source folder changed. Expected originals to stay untouched.")

    mapping = {
        "purpose": "Private review mapping from original challenge filenames to public asset filenames. Do not import this file into the site.",
        "sourceFolder": "challenge-images-originals",
        "publicFolder": "public/challenge",
        "format": "Source filenames end in .PNG, but every file is JPEG data. Public copies are byte-for-byte and use .jpg. Images were not converted, cropped, compressed, or regenerated.",
        "pairs": mapping_pairs,
    }
    MAPPING.write_text(json.dumps(mapping, indent=2) + "\n", encoding="utf-8")
    print(f"Copied {len(mapping_pairs)} pairs to {DEST}")
    print(f"Wrote {MAPPING}")
    print("Pair answers, explanations, and credits stay in src/content/challenge-pairs.ts")


if __name__ == "__main__":
    main()
