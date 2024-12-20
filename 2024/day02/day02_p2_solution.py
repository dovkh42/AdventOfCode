import time

start_time = time.time()  # Record start time

counter = 0

print(*[sum(x) for x in zip(*[((lambda l: (lambda ds: (all(d > 0 for d in ds) or all(d < 0 for d in ds))and all(1 <= abs(d) <= 3 for d in ds) and all(d != 0 for d in ds))([l[i+1]-l[i] for i in range(len(l)-1)]))(list(map(int, line.strip().split()))),(lambda l: (lambda s: s(l) or any(s(l[:i]+l[i+1:]) for i in range(len(l))))(lambda l: (lambda ds: (all(d > 0 for d in ds) or all(d < 0 for d in ds))and all(1 <= abs(d) <= 3 for d in ds) and all(d != 0 for d in ds))([l[i+1]-l[i] for i in range(len(l)-1)])))(list(map(int, line.strip().split())))) for line in open('input.txt')])])
end_time = time.time()  # Record end time
elapsed_time = end_time - start_time


print(counter)
print(f"Elapsed time: {elapsed_time:.4f} seconds")