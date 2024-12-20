from functools import reduce

COLS, ROWS = 101, 103
CENTER_COL, CENTER_ROW = COLS // 2, ROWS // 2

robots = [[tuple(map(int, line.strip().split(' ')[0].split('=')[1].split(','))), 
           tuple(map(int, line.strip().split(' ')[1].split('=')[1].split(',')))] 
           for line in open("input.txt", "rt")]


def move_robots(seconds):
    quadrants = [0] * 4
    
    for (loc_x, loc_y), (vel_x, vel_y) in robots:
        loc_x, loc_y = ((loc_x + vel_x * seconds) % COLS, 
                        (loc_y + vel_y * seconds) % ROWS)

        quadrants[0] += loc_x<CENTER_COL and loc_y<CENTER_ROW
        quadrants[1] += loc_x<CENTER_COL and CENTER_ROW<loc_y
        quadrants[2] += CENTER_COL<loc_x and loc_y<CENTER_ROW
        quadrants[3] += CENTER_COL<loc_x and CENTER_ROW<loc_y

    return reduce(lambda x, y: x * y, quadrants)

print(min(range(50000), key=move_robots))