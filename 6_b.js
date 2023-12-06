const fs = require('fs');

const input = fs.readFileSync('6.txt', 'utf8');
const values = input.split('\n');

function findWins(values) {
	let i = 1;
	let time = [];
	let winner = [];
	for (const value of values) {
		let output = +value.split(':')[1].trim().match(/\d+/g).join('');

		if (i === 1) {
			time = output;
		} else {
			winner = output;
		}
		i++;
	}

	let count = 0;

	for (let j = 1; j < time; j++) {
		let value = (time - j) * j;

		if (value > winner) {
			count++;
		}
	}

	console.log(count);
}

findWins(values);
