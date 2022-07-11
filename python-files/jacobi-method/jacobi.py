def get_matrix():
    with open('input.txt', 'r') as f:
        matrix = [[int(num) for num in line.split(' ')] for line in f]
    return matrix

def print_output(solution):
    try:
        fo = open("output.txt","w")
    except IOError:
        print("Error: File does not appear to exist.")
        exit(1)

    solution = jacobi(get_matrix())
    res = ''
    for s in solution:
        res = res + str(s) + ' '
    fo.write(res)
    fo.write('\n')

def isApplicable(mat):
    n = len(mat)
    for i in range(n):
        sum = 0
        for j in range(n+1):
            if i != j:
                sum = sum + abs(mat[i][j])
            if sum >= abs(mat[i][i]):
                return False
    return True

def jacobi(matrix):
    e = 0.0001
    n = len(matrix)
    if isApplicable(matrix) == False:
        return "Not applicable"
    prev = [0 for i in range(n)]
    curr = [0 for i in range(n)]
    check = True
    while check:
        for i in range(n):
            prev[i] = curr[i]
            curr[i] = matrix[i][n]
            for j in range(n):
                if i != j:
                    curr[i] -= prev[j]*matrix[i][j]
                else:
                    continue
            curr[i] /= matrix[i][j]
        for i in range(n):
            if abs(curr[i] - prev[i]) > e:
                break
            else:
                check = False
    for s in range(n):
        curr[s] = round(curr[s], 3)
    return curr

matrix = get_matrix()
print_output(jacobi(matrix))




