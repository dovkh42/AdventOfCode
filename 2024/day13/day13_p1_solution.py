def calc_min_tokens(a, b, prize):
    a_x, a_y = a
    b_x, b_y = b
    prize_x, prize_y = prize
    min_cost = float('inf')

    max_x = min(max(prize_x // a_x + 1, prize_x // b_x + 1), 100)
    max_y = min(max(prize_x // a_y + 1, prize_y // b_y + 1), 100)

    for x in range(max_x):
        for y in range(max_y):
            total_x = x*a_x + y*b_x
            total_y = x*a_y + y*b_y

            if total_x == prize_x and total_y == prize_y:
                curr_cost = x * 3 + y * 1
                min_cost = min(min_cost, curr_cost)

    return min_cost if min_cost != float('inf') else 0


make_tuple = lambda part, sign: int(part.split(sign)[1])

with open("input.txt", "rt") as file:
    location = []
    total_tokens = 0
    for i, line in enumerate(file):
        if line == "\n":
            location = []
        else:
            sign = "+" if line[0] == "B" else "="
            location.append(tuple(map(lambda part: int(part.split(sign)[1]), line.strip().split(':')[1].strip().split(","))))
            if sign == "=": total_tokens += calc_min_tokens(*location)
    
    print(total_tokens)