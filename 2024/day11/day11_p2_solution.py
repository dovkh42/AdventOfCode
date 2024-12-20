nums = list(map(int, open('input.txt', 'rt').readlines()[0].strip().split(' ')))
nums_map = {}

for num in nums:
    nums_map[num] = nums_map.get(num, 0) + 1

def transform_stones(nums, blinks):
    for i in range(blinks):
        new_nums = {}
        for num in nums:
            num_str = str(num)
            if num == 0:
                new_nums[1] = new_nums.get(1, 0)+1*nums[num]
            elif len(num_str) % 2 == 0:
                num1 = int(num_str[:(len(num_str) // 2)])
                num2 = int(num_str[(len(num_str) // 2):])
                new_nums[num1] = new_nums.get(num1, 0)+1*nums[num]
                new_nums[num2] = new_nums.get(num2, 0)+1*nums[num]
            else:
                new_nums[num * 2024] = new_nums.get(num * 2024, 0)+1*nums[num]
        nums = new_nums
    return nums

nums_map = transform_stones(nums_map, 75)
calc = 0
for num in nums_map:
    calc += nums_map[num]
print(calc)





