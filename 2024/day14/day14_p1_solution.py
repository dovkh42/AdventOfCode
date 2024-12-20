from functools import reduce

COLS = 101
ROWS = 103
CENTER_COL = (COLS ) // 2
CENTER_ROW = (ROWS ) // 2

robots = [[tuple(map(int, line.strip().split(' ')[0].split('=')[1].split(','))), 
           tuple(map(int, line.strip().split(' ')[1].split('=')[1].split(',')))] 
           for line in open("input.txt", "rt")]

quadrants = [0] * 4

def move_robots(seconds):
    for robot in robots:
        loc_x, loc_y = robot[0]
        vel_x, vel_y = robot[1]
        loc_x, loc_y = (loc_x + vel_x*seconds)%COLS, (loc_y + vel_y*seconds)%ROWS
        robot[0] = (loc_x, loc_y)

        if loc_x<CENTER_COL:
            if loc_y<CENTER_ROW:
                quadrants[0] += 1
            elif CENTER_ROW<loc_y:
                quadrants[1] += 1
        elif CENTER_COL<loc_x:
            if loc_y<CENTER_ROW:
                quadrants[2] += 1
            elif CENTER_ROW<loc_y:
                quadrants[3] += 1

move_robots(100)
print(reduce(lambda x, y: x * y, quadrants))