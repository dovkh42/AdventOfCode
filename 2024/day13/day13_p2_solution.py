def calc_min_tokens(a, b, prize):
    a_x, a_y = a
    b_x, b_y = b
    prize_x, prize_y = prize
    prize_x, prize_y = prize_x + 10000000000000, prize_y + 10000000000000

    if((prize_x * b_y - prize_y * b_x) % (a_x * b_y - a_y * b_x) != 0 or 
       (prize_x * a_y - prize_y * a_x) % (b_x * a_y - b_y * a_x) != 0):
        return 0

    a_presses = (prize_x * b_y - prize_y * b_x) // (a_x * b_y - a_y * b_x)
    b_presses = (prize_x * a_y - prize_y * a_x) // (b_x * a_y - b_y * a_x)

    cost = a_presses * 3 + b_presses * 1

    return cost

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