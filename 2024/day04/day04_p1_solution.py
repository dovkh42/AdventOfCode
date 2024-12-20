import re

def count_matches(pattern, strings):
    num_of_matches = 0
    for string in strings:
        start = 0
        while True:
            match = pattern.search(string, start)
            if match:
                num_of_matches += 1
                start = match.start() + 1
            else:
                break
    return num_of_matches

def make_diagonals(rows):
    n = len(rows)
    grid = [list(line.strip()) for line in rows]

    main_diagonals = []
    anti_diagonals = []

    for shift in range(-n + 1, n):
        main_diag = "".join(
            grid[i][i + shift]
            for i in range(n)
            if 0 <= i + shift < n
        )
        anti_diag = "".join(
            grid[i][n - 1 - i + shift]
            for i in range(n)
            if 0 <= n - 1 - i + shift < n
        )
        main_diagonals.append(main_diag)
        anti_diagonals.append(anti_diag)

    return main_diagonals, anti_diagonals

rows = [line.strip() for line in open("input.txt")]
columns = [''.join(col) for col in zip(*rows)]
main_diagonals, anti_diagonals = make_diagonals(rows)

pattern = re.compile(r"XMAS|SAMX")

num_of_matches = (count_matches(pattern, rows) + 
                  count_matches(pattern, columns) +
                  count_matches(pattern, main_diagonals) +
                  count_matches(pattern, anti_diagonals))

print(num_of_matches)
