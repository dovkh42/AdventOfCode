from aocd.models import Puzzle
puzzle_input = Puzzle(year=2017, day=2).input_data

lines = puzzle_input.strip().split('\n')
result = []

for line in lines:
    row = list(map(int, line.split()))
    
    for val in row:
        division = [int(val / v) for v in row if val != v and val % v == 0]
        result.extend(division)

print(sum(result))