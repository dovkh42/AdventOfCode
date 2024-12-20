from aocd.models import Puzzle
puzzle = Puzzle(year=2017, day=1)

sum = 0
prev_char = puzzle.input_data[-1]
for char in puzzle.input_data:
    if char == prev_char:
        sum += int(prev_char)
    prev_char = char

print(sum)