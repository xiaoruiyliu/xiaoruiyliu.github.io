"""Generate public/assets/herringbone.svg, the page background.

Horizontal brick k sits at [k, k+N] x [k, k+1] and vertical brick k at
[k+N, k+N+1] x [k+1-N, k+1]; strips repeat every (N, -N). Colors alternate by
the parity of k (one row per chevron). Accent colors are keyed on position
modulo the tile so bricks cut by a tile edge match their copy.
"""

import random

WIDTH = 12   # px, brick short side
LENGTH = 48  # px, brick long side (must be a whole multiple of WIDTH)

BASE = "#2B4128"   # even rows (matches side-bg in tailwind.config.js)
ALT = "#2F462C"    # odd rows
SEAM = "#22341F"   # mortar lines

ACCENTS = [
    ("#34482A", 0.12),  # (shade, probability)
    ("#263A25", 0.10),
]
SEED = 7     # change for a different random arrangement
TILE_PX = 576  # approximate final tile size; larger = less visible repetition

N = LENGTH // WIDTH
BASE_SIZE = 2 * N if N % 2 == 0 else 4 * N
SIZE = BASE_SIZE * max(1, round(TILE_PX / (BASE_SIZE * WIDTH)))  # tile side, in units
assert N * WIDTH == LENGTH, "LENGTH must be a multiple of WIDTH"


def brick_color(x, y, horizontal, row_fill):
    key = (x % SIZE, y % SIZE, horizontal)
    roll = random.Random(f"{SEED}-{key}").random()
    for shade, chance in ACCENTS:
        if roll < chance:
            return shade
        roll -= chance
    return row_fill


def bricks():
    for m in range(-SIZE, SIZE + 1):  # strip offset (N*m, -N*m)
        for k in range(-3 * SIZE, 3 * SIZE + 1):
            ox, oy = k + N * m, k - N * m
            fill = BASE if k % 2 == 0 else ALT
            yield (ox, oy, N, 1, brick_color(ox, oy, True, fill))  # horizontal
            vx, vy = ox + N, oy + 1 - N
            yield (vx, vy, 1, N, brick_color(vx, vy, False, fill))  # vertical


def overlaps_tile(x, y, w, h):
    return x < SIZE and x + w > 0 and y < SIZE and y + h > 0


rects = "\n".join(
    f'      <rect x="{x * WIDTH}" y="{y * WIDTH}" width="{w * WIDTH}" height="{h * WIDTH}" fill="{fill}"/>'
    for x, y, w, h, fill in bricks()
    if overlaps_tile(x, y, w, h)
)

svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    <pattern id="herringbone" width="{SIZE * WIDTH}" height="{SIZE * WIDTH}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <g stroke="{SEAM}" stroke-width="1">
{rects}
      </g>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#herringbone)"/>
</svg>
"""

with open("public/assets/herringbone.svg", "w") as f:
    f.write(svg)
