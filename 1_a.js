const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
	const fileStream = fs.createReadStream('1.txt');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	let sum = 0;
	for await (const line of rl) {
		let ans = line.match(/\d+/g);
		let f = ans[0].length !== 1 ? ans[0][0] : ans[0];
		let l =
			ans[ans.length - 1].length !== 1
				? ans[ans.length - 1][ans[ans.length - 1].length - 1]
				: ans[ans.length - 1];

		console.log(ans, f, l);
		sum += +f * 10 + +l;
	}
	console.log(sum);
}

processLineByLine();
