import re

res = 0

with open('input.txt', 'r') as file:
    for line_num, line in enumerate(file):
        clean_line = line.strip()

        pattern = re.compile(r"mul\(([\d]+),([\d]+)\)")
        matches = re.findall(pattern, clean_line)

        for match in matches:
            num1, num2 = match
            res += int(num1)*int(num2)

print(res)