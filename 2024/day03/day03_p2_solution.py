import re

res = 0
should_do = True

with open('input.txt', 'r') as file:
    for line_num, line in enumerate(file):
        clean_line = line.strip()

        patterns = re.compile(r"mul\(([\d]+),([\d]+)\)|(don't|do)\(\)")
        matches = re.findall(patterns, clean_line)

        for match in matches:
            num1, num2, c = match
            if c == "don't":
                should_do = False
            elif c == "do":
                should_do = True

            if should_do and num1 != '':
                res += int(num1)*int(num2)

print(res)