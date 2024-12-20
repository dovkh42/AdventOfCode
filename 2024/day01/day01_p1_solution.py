from array import array

lhs_array, rhs_array = array('i', []), array('i', [])

with open('input.txt', 'r') as file:
    for line_num, line in enumerate(file):
        clean_line = line.strip()
        lhs, rhs = map(int, clean_line.split())

        lhs_array.append(lhs)
        rhs_array.append(rhs)

lhs_array = array('i', sorted(lhs_array))
rhs_array = array('i', sorted(rhs_array)) 

res = 0
for i in range(len(lhs_array)):
    res += abs(lhs_array[i]-rhs_array[i])

print(res)