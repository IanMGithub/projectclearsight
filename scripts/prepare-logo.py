#!/usr/bin/env python3
"""Build web logo files from brand/logo-source.png.

The supplied badge sits on a dark surround. This script keeps the circular
badge, removes that surround, and writes optimized files into public/.
Replace brand/logo-source.png, then run: npm run logo
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "brand" / "logo-source.png"
PUBLIC = ROOT / "public"

# Measured on the supplied 433×442 source: center of the white badge.
CENTER_X = 216.0
CENTER_Y = 240.0
RADIUS = 187.5


def build_badge(source: Image.Image) -> Image.Image:
    image = source.convert("RGBA")
    pixels = image.load()
    width, height = image.size
    badge = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    output = badge.load()

    for y in range(height):
        for x in range(width):
            distance = math.hypot(x - CENTER_X, y - CENTER_Y)
            if distance >= RADIUS + 1.25:
                continue

            red, green, blue, _alpha = pixels[x, y]
            coverage = 1.0 if distance <= RADIUS - 1.0 else max(
                0.0, min(1.0, (RADIUS + 1.25 - distance) / 2.25)
            )
            neutral = abs(red - green) < 22 and abs(green - blue) < 22

            # The badge edge is blended with the dark surround. Restore that
            # rim to white so it does not keep a gray halo on light pages.
            if neutral and distance > RADIUS - 4:
                lightness = (red + green + blue) / 3
                edge_alpha = max(0.0, min(1.0, (lightness - 39) / (248 - 39)))
                alpha = int(round(255 * coverage * edge_alpha))
                if alpha > 0:
                    output[x, y] = (255, 255, 252, alpha)
                continue

            output[x, y] = (red, green, blue, int(round(255 * coverage)))

    side = int(math.ceil(RADIUS * 2 + 4))
    left = int(round(CENTER_X - RADIUS - 2))
    top = int(round(CENTER_Y - RADIUS - 2))
    return badge.crop((left, top, left + side, top + side))


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Missing logo source: {SOURCE}")

    PUBLIC.mkdir(exist_ok=True)
    badge = build_badge(Image.open(SOURCE))
    badge.save(PUBLIC / "logo.png", optimize=True)
    badge.resize((64, 64), Image.Resampling.LANCZOS).save(
        PUBLIC / "favicon.png", optimize=True
    )
    badge.resize((180, 180), Image.Resampling.LANCZOS).save(
        PUBLIC / "apple-touch-icon.png", optimize=True
    )
    print(f"Wrote logo {badge.size[0]}x{badge.size[1]}, favicon, and apple touch icon.")


if __name__ == "__main__":
    main()
