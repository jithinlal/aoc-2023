const fs = require('fs');

const input = fs.readFileSync('2.txt', 'utf8');
const values = input.split('\n');

const hash = {
	re: 12,
	gr: 13,
	bl: 14,
};

function findPossible(values) {
	let i = 1;
	let sum = 0;
	for (const value of values) {
		let selections = value.split(':')[1];
		if (selections) {
			let flag = true;
			selections = selections.split(';');
			for (const selection of selections) {
				let items = selection.match(/\d+|bl|re|gr/g);
				for (let j = 1; j < items.length; j = j + 2) {
					if (hash[items[j]] < items[j - 1]) {
						flag = false;
					}
				}
			}

			if (flag) {
				sum += i;
			}
		}
		i++;
	}

	return sum;
}

console.log(findPossible(values));
