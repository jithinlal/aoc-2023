const fs = require('fs');

const input = fs.readFileSync('4.txt', 'utf8');
const values = input.split('\n');

function totalSum(values) {
	let sum = 0;
	let i = 1;
	for (const value of values) {
		let line = value.split(':')[1];
		let win = line.split('|')[0];
		let cards = line.split('|')[1];

		let winNumbers = win.match(/\d+/g);
		let cardNumbers = cards.match(/\d+/g);

		sum += compare(winNumbers, cardNumbers, i);
		i++;
	}
	console.log(sum);
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

	if (sum === 0) {
		return 0;
	}

	return 2 ** (sum - 1);
}
