import difflib
from gauss import * 
itreation = True
	
matrix = get_matrix() 
print_output(Gauss(matrix))

try:
    fo = open("output.txt", "r+")
    fg = open("golden.txt", "r+")
    fd = open("diff.txt","w")
    fo_text = fo.readlines()
    fg_text = fg.readlines()
except IOError:
    print("Error: File does not appear to exist.")
    exit(1)

for line in difflib.unified_diff(fo_text, fg_text,fromfile='output.txt', tofile='golden.txt', lineterm='\n'):
    fd.write(line)
    fd.write('\n')

fo.close()
fg.close()
