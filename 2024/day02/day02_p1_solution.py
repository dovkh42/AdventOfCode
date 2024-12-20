counter = 0

def isValidList(list):
    list_len = len(list)
    is_increasing = all(list[i] < list[i + 1] and  list[i + 1]-list[i] <= 3  for i in range(list_len - 1))
    is_decreasing = all(list[i] > list[i + 1] and  list[i]-list[i + 1] <= 3  for i in range(list_len - 1))

    return is_increasing or is_decreasing

with open('input.txt', 'r') as file:
    for line_num, line in enumerate(file):
        clean_line = line.strip()
        num_list = list(map(int, clean_line.split()))

        if isValidList(num_list):
            counter += 1


print(counter)