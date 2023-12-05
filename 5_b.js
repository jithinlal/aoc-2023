// const fs = require('fs');

// const input = fs.readFileSync('5.txt', 'utf8');
// const values = input.split('\n');

// function findLocation(values) {
// 	let seedLine = [];
// 	let seedLines = [];
// 	let seedToSoil = [];
// 	let soilToFertilizer = [];
// 	let fertilizerToWater = [];
// 	let waterToLight = [];
// 	let lightToTemperature = [];
// 	let temperatureToHumidity = [];
// 	let humidityToLocation = [];

// 	// let seedLines = [];
// 	// let seedLine = [79, 14, 55, 13];
// 	// let seedToSoil = [
// 	// 	[50, 98, 2],
// 	// 	[52, 50, 48],
// 	// ];
// 	// let soilToFertilizer = [
// 	// 	[0, 15, 37],
// 	// 	[37, 52, 2],
// 	// 	[39, 0, 15],
// 	// ];
// 	// let fertilizerToWater = [
// 	// 	[49, 53, 8],
// 	// 	[0, 11, 42],
// 	// 	[42, 0, 7],
// 	// 	[57, 7, 4],
// 	// ];
// 	// let waterToLight = [
// 	// 	[88, 18, 7],
// 	// 	[18, 25, 70],
// 	// ];
// 	// let lightToTemperature = [
// 	// 	[45, 77, 23],
// 	// 	[81, 45, 19],
// 	// 	[68, 64, 13],
// 	// ];
// 	// let temperatureToHumidity = [
// 	// 	[0, 69, 1],
// 	// 	[1, 0, 69],
// 	// ];
// 	// let humidityToLocation = [
// 	// 	[60, 56, 37],
// 	// 	[56, 93, 4],
// 	// ];
// 	// for (let k = 1; k < seedLine.length; k = k + 2) {
// 	// 	seedLines.push([seedLine[k - 1], seedLine[k - 1] + seedLine[k] - 1]);
// 	// }

// 	for (let i = 0; i < values.length; i++) {
// 		if (i === 0) {
// 			seedLine = values[i]
// 				.split(':')[1]
// 				.match(/\d+/g)
// 				.map((item) => +item);

// 			for (let k = 1; k < seedLine.length; k = k + 2) {
// 				seedLines.push([seedLine[k - 1], seedLine[k - 1] + seedLine[k] - 1]);
// 			}
// 		}

// 		if (i >= 3 && i <= 24) {
// 			seedToSoil.push(values[i].match(/\d+/g).map((item) => +item));
// 		}

// 		if (i >= 27 && i <= 53) {
// 			soilToFertilizer.push(values[i].match(/\d+/g).map((item) => +item));
// 		}

// 		if (i >= 56 && i <= 93) {
// 			fertilizerToWater.push(values[i].match(/\d+/g).map((item) => +item));
// 		}

// 		if (i >= 96 && i <= 120) {
// 			waterToLight.push(values[i].match(/\d+/g).map((item) => +item));
// 		}

// 		if (i >= 123 && i <= 142) {
// 			lightToTemperature.push(values[i].match(/\d+/g).map((item) => +item));
// 		}

// 		if (i >= 145 && i <= 170) {
// 			temperatureToHumidity.push(values[i].match(/\d+/g).map((item) => +item));
// 		}

// 		if (i >= 173 && i <= 208) {
// 			humidityToLocation.push(values[i].match(/\d+/g).map((item) => +item));
// 		}
// 	}

// 	let low = Number.POSITIVE_INFINITY;

// 	for (let i = 0; i < seedLines.length; i++) {
// 		let soil = nextMap([seedLines[i]], seedToSoil);
// 		let fertilizer = nextMap(soil, soilToFertilizer);
// 		let water = nextMap(fertilizer, fertilizerToWater);
// 		let light = nextMap(water, waterToLight);
// 		let temperature = nextMap(light, lightToTemperature);
// 		let humidity = nextMap(temperature, temperatureToHumidity);
// 		let location = nextMap(humidity, humidityToLocation);

// 		for (let x = 0; x < location.length; x++) {
// 			let lowest = Math.min(location[x][0], location[x][1]);
// 			if (low > lowest) {
// 				low = lowest;
// 			}
// 		}
// 		console.log({ i: i + 1, location });
// 	}

// 	console.log(low);
// }

// function nextMap(value, mapSet) {
// 	let mapper = [];

// 	for (let i = 0; i < value.length; i++) {
// 		let low = value[i][0];
// 		let high = value[i][1];
// 		let flag = true;

// 		for (let j = 0; j < mapSet.length; j++) {
// 			let source = mapSet[j][1];
// 			let destination = mapSet[j][0];
// 			let adder = mapSet[j][2];

// 			if (
// 				source <= low &&
// 				low <= source + adder - 1 &&
// 				source <= high &&
// 				high <= source + adder - 1
// 			) {
// 				let minusLow = low - source;
// 				let minusHigh = high - source;
// 				mapper.push([destination + minusLow, destination + minusHigh]);
// 				break;
// 			} else if (low < source && source <= high && high <= source + adder - 1) {
// 				let minusHigh = high - source;
// 				mapper.push([destination, destination + minusHigh]);
// 				low = low;
// 				high = source - 1;
// 			} else if (
// 				source <= low &&
// 				low <= source + adder - 1 &&
// 				source + adder - 1 < high
// 			) {
// 				let minusLow = low - source;
// 				mapper.push([destination + minusLow, destination]);
// 				low = source + adder;
// 				high = high;
// 			}
// 		}

// 		if (flag) {
// 			mapper.push([low, high]);
// 		}
// 	}

// 	return mapper;
// }

// findLocation(values);

const path = require('path');
const fs = require('fs');

const processSeedRanges = (section) => {
	const seeds = section.split(':')[1].trim().split(/\s+/).map(Number);

	return seeds.reduce((ranges, value, i) => {
		if (i % 2 === 0) {
			ranges.push([value, seeds[i + 1]]);
		}

		return ranges;
	}, []);
};

const processCategory = (section) => {
	const [title, values] = section.split(':\n');

	const mapping = values.split('\n').map((line) => {
		const [destStart, srcStart, rangeLength] = line.split(/\s+/).map(Number);

		return [destStart, srcStart, rangeLength];
	});

	return { title, mapping };
};

const processAlmanac = (almanac) => {
	const sections = almanac.split('\n\n');

	return sections.reduce((acc, section) => {
		if (section.startsWith('seeds:')) {
			acc.seedRanges = processSeedRanges(section);
		} else {
			const { title, mapping } = processCategory(section);

			acc.categories = acc.categories || {};
			acc.categories[title] = acc.categories[title] || [];
			acc.categories[title] = mapping || [];
		}

		return acc;
	}, {});
};

const convertRange = (range, mapping) => {
	let [start, length] = range;
	let convertedRanges = [];

	/*
        loop through each mapping and check if the number falls into the source range
        if it does, then convert it to the destination range
        if it doesn't, then move on to the next mapping
    */
	mapping.forEach(([destStart, srcStart, rangeLength]) => {
		let srcEnd = srcStart + rangeLength;

		if (start < srcEnd && start + length > srcStart) {
			// calculate the overlap between the two ranges
			let overlapStart = Math.max(start, srcStart);
			let overlapEnd = Math.min(start + length, srcEnd);
			let newStart = destStart + (overlapStart - srcStart);

			convertedRanges.push([newStart, overlapEnd - overlapStart]);
		}
	});

	// if the range doesn't overlap with any of the ranges, then it's already in the destination category, so return it as-is
	return convertedRanges.length > 0 ? convertedRanges : [[start, length]];
};

const convertThroughCategories = (seedRange, categories) => {
	console.log({ seedRange, categories });
	let currentRanges = [seedRange];

	for (const category in categories) {
		let newRanges = [];

		currentRanges.forEach((range) => {
			convertRange(range, categories[category]).forEach((convertedRange) => {
				newRanges.push(convertedRange);
			});
		});

		currentRanges = newRanges;
	}

	console.log({ currentRanges });

	return currentRanges;
};

const findLowestLocationNumber = (almanac) => {
	let lowestLocation = Number.MAX_SAFE_INTEGER;

	almanac['seedRanges'].forEach((seedRange) => {
		const locationRanges = convertThroughCategories(
			seedRange,
			almanac['categories'],
		);

		locationRanges.forEach(([start]) => {
			if (start < lowestLocation) {
				lowestLocation = start;
			}
		});
	});

	return lowestLocation;
};

const input = fs
	.readFileSync(path.join(__dirname, '5.txt'), 'utf8')
	.toString()
	.trim();
const almanac = processAlmanac(input);
const result = findLowestLocationNumber(almanac);

console.log(result);
