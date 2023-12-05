const fs = require('fs');

const input = fs.readFileSync('4.txt', 'utf8');
const values = input.split('\n');

function totalSum(values) {
	let i = 1;
	let hash = {};
	for (let k = 1; k <= 198; k++) {
		hash[k] = 1;
	}

	for (const value of values) {
		let line = value.split(':')[1];
		let win = line.split('|')[0];
		let cards = line.split('|')[1];

		let winNumbers = win.match(/\d+/g);
		let cardNumbers = cards.match(/\d+/g);

		let sum = compare(winNumbers, cardNumbers, i);

		for (let j = i + 1; j <= i + sum; j++) {
			hash[j] = hash[j] + hash[i];
		}

		i++;
	}

	let total = 0;
	Object.keys(hash).forEach((key) => {
		total += hash[key];
	});

	console.log(total);
}

totalSum(values);

function compare(a, b, k) {
	let hash = {};
	for (let i = 0; i < a.length; i++) {
		hash[a[i]] = true;
	}

	let sum = 0;
	for (let i = 0; i < b.length; i++) {
		if (hash[b[i]]) {
			sum++;
		}
	}

	return sum;
}
