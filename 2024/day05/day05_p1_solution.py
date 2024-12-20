sums = 0
data_map = {}

with open('input.txt', 'r') as file:
    for line in file:
        if line == '\n':
            break
        key, value = map(int, line.strip().split('|'))
        if key not in data_map:
            data_map[key] = []
        data_map[key].append(value)

    for line in file:
        is_valid = True
        line = list(map(int,line.strip().split(',')))
        for i in range(len(line)-1):
            if line[i+1] not in data_map[line[i]]:
                is_valid = False
                break

        if is_valid:
            sums += line[len(line)//2]

print(sums)