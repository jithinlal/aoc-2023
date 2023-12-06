const fs = require('fs');

const input = fs.readFileSync('6.txt', 'utf8');
const values = input.split('\n');

function findWins(values) {
	let i = 1;
	let time = [];
	let winner = [];
	for (const value of values) {
		let output = value
			.split(':')[1]
			.trim()
			.match(/\d+/g)
			.map((item) => +item);

		if (i === 1) {
			time = output;
		} else {
			winner = output;
		}
		i++;
	}

	let sum = 1;
	for (let i = 0; i < time.length; i++) {
		let timer = time[i];

		let count = 0;
		for (let j = 1; j < timer; j++) {
			let value = (timer - j) * j;

			if (value > winner[i]) {
				count++;
			}
		}

		sum *= count;
	}

	console.log(sum);
}

findWins(values);
