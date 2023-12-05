const fs = require('fs');

const input = fs.readFileSync('2.txt', 'utf8');
const values = input.split('\n');

function findPossible(values) {
	let sum = 0;
	let i = 1;
	for (const value of values) {
		let selections = value.split(':')[1];
		if (selections) {
			let hash = {
				re: 0,
				gr: 0,
				bl: 0,
			};

			selections = selections.split(';');
			for (const selection of selections) {
				let items = selection.match(/\d+|bl|re|gr/g);
				for (let j = 1; j < items.length; j = j + 2) {
					if (hash[items[j]] < +items[j - 1]) {
						hash[items[j]] = +items[j - 1];
					}
				}
			}

			sum += hash['re'] * hash['bl'] * hash['gr'];
		}
		i++;
	}

	return sum;
}

console.log(findPossible(values));
