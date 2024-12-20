nums = list(map(int, open('input.txt', 'rt').readlines()[0].strip().split(' ')))

def transform_stones(nums, blinks):
    for j in range(blinks):
        new_nums = []
        for i, num in enumerate(nums):
            if num == 0:
                new_nums.append(1)
            elif len(str(num)) % 2 == 0:
                num1 = int(str(num)[:(len(str(num)) // 2)])
                num2 = int(str(num)[(len(str(num)) // 2):])
                new_nums.extend([num1, num2])
            else:
                new_nums.append(num * 2024)
        nums = new_nums
    return nums

nums = transform_stones(nums, 25)
print(len(nums))
