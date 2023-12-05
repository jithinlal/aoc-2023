const fs = require('fs');

const input = fs.readFileSync('1.txt', 'utf8');
const values = input.split('\n');

const numbers = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
};

function findWords(input) {
	const words = [...Object.keys(numbers), ...Object.values(numbers)];
	const matches = [];

	for (const word of words) {
		let pos = input.indexOf(word);
		while (pos !== -1) {
			matches.push({ word, pos });
			pos = input.indexOf(word, pos + 1);
		}
	}

	return matches.sort((a, b) => a.pos - b.pos);
}

function partTwo(inputArray) {
	return inputArray
		.map((line) => {
			const words = findWords(line);
			if (!words.length) return 0;

			const firstWord = words[0].word;
			const first = numbers[firstWord] || firstWord;

			const lastWord = words[words.length - 1].word;
			const last = numbers[lastWord] || lastWord;
			console.log(words, first, last);

			return parseInt(first + last);
		})
		.reduce((a, b) => a + b, 0);
}

console.log(partTwo(values));
