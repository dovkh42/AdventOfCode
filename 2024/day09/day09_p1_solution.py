def parse_string(line):
    counter = 0
    list1 = []
    is_even = False 
    empty = '.'

    for char in line:
        char_num = int(char)
        if not is_even:
            counter_char = str(counter)
            for char in range(char_num):
                list1.append(counter_char)
            counter += 1
        else:
            for char in range(char_num):
                list1.append(empty )
        is_even = not is_even

    return list1

def defrag(list1):
    last_idx = len(list1) - 1
    for idx, char in enumerate(list1):
        while list1[last_idx] == ".":
            last_idx -= 1
        if idx >= last_idx:
            break;
        if char == '.':
            list1[idx], list1[last_idx] = list1[last_idx], list1[idx]
            last_idx -= 1

    return list1

def calc_checksum(list1):
    res = 0
    for idx, char in enumerate(list1):
        if char != '.':
            res += idx * int(char)
        else:
            break

    return res

with open('input.txt', "r") as file:
    print(calc_checksum(defrag(parse_string(file.readline().strip()))))
