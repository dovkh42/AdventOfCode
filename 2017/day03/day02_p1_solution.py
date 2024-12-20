from math import sqrt, ceil
from aocd.models import Puzzle

puzzle_input = int(Puzzle(year=2017, day=3).input_data)

result = 0

def get_ring_level(num):
    ring_level = ceil(sqrt(num))
    if ring_level % 2 == 0:
        ring_level += 1

    return ring_level

def get_corners(level):
    bottom_right = level * level
    bottom_left = bottom_right - level + 1
    top_left = bottom_left - level + 1
    top_right = top_left - level + 1

    return [top_right, top_left, bottom_left, bottom_right]

level = get_ring_level(puzzle_input)
corners = get_corners(level)

for corner in corners:
    if puzzle_input < corner:
        mid = corner - int((level-1) / 2)
        result = puzzle_input - mid + int((level-1) / 2)
        break

print(result)
