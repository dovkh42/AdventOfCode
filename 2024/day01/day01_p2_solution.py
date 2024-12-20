from array import array
from collections import defaultdict

lhs_array = array('i')
rhs_map = defaultdict(int)


with open('input.txt', 'r') as file:
    for line_num, line in enumerate(file):
        clean_line = line.strip()
        lhs, rhs = map(int, clean_line.split())

        lhs_array.append(lhs)
        rhs_map[rhs] += 1

sum = 0
for i in range(len(lhs_array)):
    sum += rhs_map[lhs_array[i]]*lhs_array[i]


print(sum)