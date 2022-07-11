import sys


def get_matrix():
    with open('input.txt', 'r') as f:
        matrix = [[int(num) for num in line.split(' ')] for line in f]
    return matrix

def Gauss(matrix):
    n = len(matrix)
    solution = [0 for i in range(n)]
    # Applying Gauss Elimination
    for i in range(n):
        if matrix[i][i] == 0.0:
            sys.exit('Divide by zero detected!')
            
        for j in range(i+1, n):
            ratio = matrix[j][i]/matrix[i][i]
            
            for k in range(n + 1):
                matrix[j][k] = matrix[j][k] - ratio * matrix[i][k]

    # Back Substitution
    solution[n-1] = matrix[n-1][n]/matrix[n-1][n-1]

    for i in range(n-2,-1,-1):
        solution[i] = matrix[i][n]
        
        for j in range(i+1,n):
            solution[i] = solution[i] - matrix[i][j]*solution[j]
        
        solution[i] = solution[i]/matrix[i][i]
        for s in range(n):
            solution[s] = round(solution[s], 3)

        return solution

def print_output(solution):
    try:
        fo = open("output.txt","w")
    except IOError:
        print("Error: File does not appear to exist.")
        exit(1)

    solution = Gauss(get_matrix())
    res = ''
    for s in solution:
        res = res + str(s) + ' '
    fo.write(res)
    fo.write('\n')


