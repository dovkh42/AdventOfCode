with open('input.txt', 'rt') as file:
    pc_map = {}

    for line in file:
        a, b = line.strip().split('-')
        pc_map.setdefault(a, []).append(b)
        pc_map.setdefault(b, []).append(a)

res_sum, res_links = 0, {}
for first, first_links in pc_map.items():
    common = set([first] + first_links)

    for nested in first_links:
        current_set = set([nested] + pc_map[nested])
        common = common.intersection(current_set)

        if len(common) >= res_sum:
            res_sum = len(common)
            res_links = common.copy()

print(*sorted(res_links), sep=',')
