const lib = require("./quadratic-equation");
const fs = require('fs');
const readline = require('readline');

const input = fs.readFileSync("input.txt", "utf-8");

let data = input.split('\n');
data.forEach( line => {
	if (line != '') {
		let elem = line.split(' ');
		let a = elem[0];
		let b = elem[1];
		let c = elem[2];
		fs.appendFileSync('output.txt', lib.quadrEquation(a, b, c) + '\n');
	}
});

let od = fs.openSync("output.txt");
fs.close(od, (err) => {
	if (err)
		console.error('Failed to close file', err);
});

const output = fs.readFileSync("output.txt", "utf-8");
const golden = fs.readFileSync("golden.txt", "utf-8");

let outData = output.split('\n');
let goldData = golden.split('\n');

let minLength = Math.min(outData.length, goldData.length) - 1;

for (let i = 0; i < minLength; i++) {
	if (outData[i] == goldData[i]) {
		fs.appendFileSync('diff.txt', "PASS " + outData[i] + '\n');
	}
	else {
		fs.appendFileSync('diff.txt', "FAILED: output " + outData[i] + ", golden " + goldData[i] + '\n');
	}
}

od = fs.openSync("output.txt");
fs.close(od, (err) => {
	if (err)
		console.error('Failed to close file', err);
});

od = fs.openSync("diff.txt");
fs.close(od, (err) => {
	if (err)
		console.error('Failed to close file', err);
});
