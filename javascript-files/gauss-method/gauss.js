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

function allZeroes(mat) {
	if (mat instanceof Array) {
		for (let i = 0; i < mat.length; i++) {
			for (let j = 0; j < mat[0].length; j++) {
				if (mat[i][j] !== 0) {
					return false;
				}
			}
		}
	}
	return true; 
}

let n = 0;
let file = input.split('\n');
let ptr = 0;
let multipleInputs = true;

while (multipleInputs) {
	n = file[ptr];
	n = Number(n);
	if (n == 0) {
		multipleInputs = false;
		break;
	}
	ptr++;
	let mat = new Array(n);
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

	if (allZeroes(mat) == true) {
		fs.appendFileSync('output.txt', 'End of inputs\n');
		break;
	}
	if (isApplicable(mat) == false) {
		fs.appendFileSync('output.txt', 'The matrix is not applicable.\n');
		continue;
	}


	let res = new Array(n);
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			if (Math.abs(mat[i][i]) < Math.abs(mat[j][i])) {
				for (let k = 0; k < n + 1; k++) {
					mat[i][k] = mat[i][k] + mat[j][k];
					mat[j][k] = mat[i][k] - mat[j][k];
					mat[i][k] = mat[i][k] - mat[j][k];
				}
			}
		}
	}

	for (let i = 0; i < n - 1; i++) {
		for (let j = i + 1; j < n; j++) {
			let f = mat[j][i] / mat[i][i];
			for (let k = 0; k < n + 1; k++) {
				mat[j][k] = mat[j][k] - f * mat[i][k];
			}
		}
	}

	for(let i = n - 1; i >= 0; i--) {
		res[i] = mat[i][n];

		for(let j = i + 1; j < n; j++) {
			if(i != j) {
				res[i] = res[i] - mat[i][j] * res[j];
			}
		}
		res[i] = res[i] / mat[i][i];
	}
	console.log(res)

		for (let i = 0; i < n; i++) {
			fs.appendFileSync('output.txt', res[i].toPrecision(3) + " ");
		}
	fs.appendFileSync('output.txt', "\n");


	//closing the output file
	let od = fs.openSync("output.txt");
	fs.close(od, (err) => {
			if (err)
			console.error('Failed to close file', err);
			});


	//opening diff file
	const output = fs.readFileSync("output.txt", "utf-8");
	const golden = fs.readFileSync("golden.txt", "utf-8");

	let outData = output.split('\n');
	let goldData = golden.split('\n');

	let minLength = Math.min(outData.length, goldData.length) - 1;

	//comparing output.txt and golden.txt
	for (let i = 0; i < minLength; i++) {
		if (outData[i] == goldData[i]) {
			fs.appendFileSync('diff.txt', "PASS " + outData[i] + '\n');
		}
		else {
			fs.appendFileSync('diff.txt', "FAILED: output " + outData[i] + ", golden " + goldData[i] + '\n');
		}
	}

	//closing output.txt diff.txt
	od = fs.openSync("output.txt");
	fs.close(od, (err) => {
		if (err)
		console.error('Failed to close file', err);
	});

	od = fs.openSync("golden.txt");
	fs.close(od, (err) => {
		if (err)
		console.error('Failed to close file', err);
	});

	od = fs.openSync("diff.txt");
	fs.close(od, (err) => {
		if (err)
		console.error('Failed to close file', err);
	});



}













