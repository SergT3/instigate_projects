const fs = require('fs');
const readline = require('readline');
const input = fs.readFileSync("input.txt", "utf-8");

function isApplicable(mat) {
	if (mat instanceof Array) {
		let sum;
		for (let i = 0; i < mat.length; i++) {
			sum = 0;
			for (let j = 0; j < mat[0].length; j++){
				if (i != j) {
					sum += Math.abs(mat[i][j]);
				}
			}
			if (sum >= Math.abs(mat[i][i])) {
				return false;
			}
		}
		return true;
	}
}

let n = 0;
let file = input.split('\n');
let ptr = 0;
let multipleInputs = true;
let e = 0.001;
while (multipleInputs) {
						//Reading the size of your matrix
	n = file[ptr];
	n = Number(n);
	if (n == 0) {
		multipleInputs = false;
		break;
	}
	ptr++;
	let mat = new Array(n);			//Creating the matrix from input
	for(let i = 0; i < n; i++) {
		mat[i] = file[ptr + i].split(" ");
	}
	ptr += n;
	
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n + 1; j++) {
			mat[i][j] = Number(mat[i][j]);
		}
	}


console.log(mat);
console.log(ptr);
	
	if (isApplicable(mat) == false) {
		fs.appendFileSync('output.txt', 'The matrix is not applicable.\n');
	}


	let prev = new Array(n);
	prev.fill(0);
	let iter = new Array(n);
	iter.fill(0);
	console.log(iter);
	let check = true;
	for (let i = 0; i < n; i++) {
		iter[i] = mat[i][n];
	}
	while (check) {
		for (let i = 0; i < n; ++i) {
			prev[i] = iter[i];
			for (let j = 0; j < n; ++j) {
				if (j !== i) {
					iter[i] -= prev[j] * mat[i][j];
				}
				else {
					continue;
				}
			}
			iter[i] /= mat[i][i];
		}
		for (let i = 0; i < n; ++i) {
			//if (Math.abs(iter[i]) - Math.abs(prev[i]) > e) {
			if (Math.abs(iter[i] - prev[i]) > e) {
				break;
			}
			else {
				check = false;
			}
		}
	}
	for (let i = 0; i < n; i++) {
		fs.appendFileSync('output.txt', prev[i] + " ");
	}
	fs.appendFileSync('output.txt', "\n");
}










