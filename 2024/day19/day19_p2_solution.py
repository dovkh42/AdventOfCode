def can_form_string(towel, patterns):
    possible_substrings_arr = [0] * (len(towel) + 1)
    possible_substrings_arr[0] = 1

    for i in range(1, len(towel) + 1):
        for pattern in patterns:
            if (i >= len(pattern) and 
                towel[i - len(pattern):i] == pattern and 
                possible_substrings_arr[i - len(pattern)]):
                possible_substrings_arr[i] += possible_substrings_arr[i - len(pattern)]

    return possible_substrings_arr[len(towel)]

with open('input.txt', "rt") as file:
    line = None
    count = 0
    for i, l in enumerate(file):
        if i == 0:
            line = [str for str in l.strip().split(', ')]
        elif i>1:
            count += can_form_string(l.strip(), line)

print(count)