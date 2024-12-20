def isSumPossible(test_sum, curr_sum, nums, idx):
    if idx == len(nums):
        return curr_sum == test_sum

    return (
        isSumPossible(test_sum, curr_sum + nums[idx], nums, idx + 1) or 
        isSumPossible(test_sum, curr_sum * nums[idx], nums, idx + 1) or
        isSumPossible(test_sum, int(str(curr_sum) + str(nums[idx])) , nums, idx + 1)
    )

with open('input.txt', 'r') as file:
    map = [(int(left), list(map(int, right.split()))) 
           for left, right in (line.split(':') 
                               for line in file)]

total_calibration_result = 0
for line in map:
    test_sum , nums = line
    if(isSumPossible(test_sum, 0, nums, 0)):
        total_calibration_result += test_sum;

print(total_calibration_result)
