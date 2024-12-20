from aocd.models import Puzzle
puzzle_input = Puzzle(year=2017, day=1).input_data

sum = 0
half_length = int(len(puzzle_input)/2)

for i in range(0, half_length):
    if puzzle_input[i] == puzzle_input[i+half_length]:
        sum += 2*int(puzzle_input[i])

print(sum)

