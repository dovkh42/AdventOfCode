result = 0

with open('input.txt', 'r') as file:
    data_map = {}

    for line in file:
        if line == '\n':
            break
        key, value = map(int, line.strip().split('|'))
        data_map.setdefault(key, set()).add(value)

    for line in file:
        is_invalid = False
        line = list(map(int,line.strip().split(',')))
        
        i = 0
        while i < len(line)-1:
            if line[i+1] not in data_map.get(line[i], set()):
                is_invalid = True
                line[i], line[i+1] = line[i+1], line[i]
                i = max(i-1, 0)
                continue
            
            i += 1

        if is_invalid:
            result += line[len(line)//2]

print(result)
