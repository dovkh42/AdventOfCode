grid = [list(line.strip()) for line in open('input.txt', 'r')]
grid_size = len(grid)
counter = 0

for row in range(grid_size):
    for col in range(grid_size):
        if (grid[row][col] == "A" and 
            0 < row < grid_size-1 and 
            0 < col < grid_size-1):
             if (((grid[row-1][col-1] == "M" and grid[row+1][col+1] == "S") or
                  (grid[row-1][col-1] == "S" and grid[row+1][col+1] == "M")) and
                  ((grid[row-1][col+1] == "M" and grid[row+1][col-1] == "S") or
                   (grid[row-1][col+1] == "S" and grid[row+1][col-1] == "M"))):
                  counter += 1

print(counter)