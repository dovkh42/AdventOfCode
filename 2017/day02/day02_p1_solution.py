from aocd.models import Puzzle
puzzle_input = Puzzle(year=2017, day=2).input_data

lines = puzzle_input.strip().split('\n')
sum = 0

for line in lines:
    row = list(map(int, line.split()))
    sum += max(row)-min(row)

print(sum)