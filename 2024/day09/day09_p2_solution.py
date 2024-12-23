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

def find_next_free(list1, idx, right_idx):
    free_spaces = 0
    while list1[idx] != ".":
            idx += 1
    while idx + free_spaces < len(list1) and list1[idx + free_spaces] == '.':
        free_spaces += 1
        if idx + free_spaces >= len(list1):
            return idx, -1
        if idx >= right_idx:
            return idx, -1
        
    return idx, free_spaces

def find_spaces_to_defrag(list1, idx):
    spaces_to_defrag = 0
    while list1[idx] == ".":
        idx -= 1
    while list1[idx - spaces_to_defrag] != '.' and list1[idx - spaces_to_defrag] == list1[idx]:
        spaces_to_defrag += 1

    return idx, spaces_to_defrag

def defrag(list1):
    right_idx = len(list1) - 1
    left_idx = 0
    iteration = 0
    while left_idx < right_idx:
        free_spaces = 0
        spaces_to_defrag = 0
        while(left_idx < right_idx):
            left_idx, free_spaces = find_next_free(list1, left_idx+ free_spaces, right_idx)
            right_idx, spaces_to_defrag = find_spaces_to_defrag(list1, right_idx)
            if(free_spaces >= spaces_to_defrag):
                i = 0
                while i < spaces_to_defrag:
                    list1[left_idx+i], list1[right_idx-i] = list1[right_idx-i], list1[left_idx+i]
                    i += 1
                break
            if(free_spaces == -1):
                right_idx -= spaces_to_defrag
                left_idx = 0
                free_spaces = 0
        iteration += 1
        left_idx = 0
    return list1


def calc_checksum(list1):
    res = 0
    for idx, char in enumerate(list1):
        if char == '.':
            char = 0
            
        res += idx * int(char)

    return res

    

with open('input.txt', "r") as file:
    line = file.readline()
    
    print(calc_checksum(defrag(parse_string(line))))

