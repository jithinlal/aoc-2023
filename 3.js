const fs = require('fs');

const input = fs.readFileSync('3.txt', 'utf8');
const values = input.split('\n');

function totalSum(values) {
	let sum = 0;
	for (let i = 1; i < 139; i++) {
		let line = values[i];
		for (let j = 1; j < line.length - 1; j++) {
			let item = line[j];

			if (isSymbol(item)) {
				if (Number.isInteger(+values[i - 1][j - 1])) {
					sum += findNumber(values, i - 1, j - 1);
				}
				if (Number.isInteger(+values[i - 1][j])) {
					sum += findNumber(values, i - 1, j);
				}
				if (Number.isInteger(+values[i - 1][j + 1])) {
					sum += findNumber(values, i - 1, j + 1);
				}
				if (Number.isInteger(+values[i][j - 1])) {
					sum += findNumber(values, i, j - 1);
				}
				if (Number.isInteger(+values[i][j + 1])) {
					sum += findNumber(values, i, j + 1);
				}
				if (Number.isInteger(+values[i + 1][j - 1])) {
					sum += findNumber(values, i + 1, j - 1);
				}
				if (Number.isInteger(+values[i + 1][j])) {
					sum += findNumber(values, i + 1, j);
				}
				if (Number.isInteger(+values[i + 1][j + 1])) {
					sum += findNumber(values, i + 1, j + 1);
				}
			}
		}
	}

	console.log(sum);
}

function findNumber(values, i, j) {
	let numberQueue = [];

	numberQueue.push(+values[i][j]);

	let k = j - 1;
	let w = 1;

	while (Number.isInteger(+values[i][k + w])) {
		numberQueue.push(+values[i][k + w]);
		values[i][k + w] = '.';
		w++;
	}

	k = j - 1;
	w = 1;

	while (Number.isInteger(+values[i][k - w])) {
		numberQueue = [+values[i][k - w], ...numberQueue];
		values[i][k - w] = '.';
		w--;
	}

	num = makeInteger(numberQueue);

	return num;
}

function isSymbol(value) {
	if (Number.isInteger(+value)) {
		return false;
	} else if (value === '.') {
		return false;
	} else {
		return true;
	}
}

function makeInteger(list) {
	let sum = 0;
	let k = 1;
	for (let i = list.length - 1; i >= 0; i--) {
		sum += list[i] * k;
		k *= 10;
	}

	return sum;
}

totalSum(values);
