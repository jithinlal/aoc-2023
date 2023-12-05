const fs = require('fs');

const input = fs.readFileSync('5.txt', 'utf8');
const values = input.split('\n');

function findLocation(values) {
	let seedLine = [];
	let seedToSoil = [];
	let soilToFertilizer = [];
	let fertilizerToWater = [];
	let waterToLight = [];
	let lightToTemperature = [];
	let temperatureToHumidity = [];
	let humidityToLocation = [];

	// 98 < 79 < 98+2  X
	// 50 < 79 < 50+48 ? (79-50) = 29, 52+29 => 81
	// if not then 79 = 79

	// let seedLine = [79, 14, 55, 13];
	// let seedToSoil = [
	// 	[50, 98, 2],
	// 	[52, 50, 48],
	// ];
	// let soilToFertilizer = [
	// 	[0, 15, 37],
	// 	[37, 52, 2],
	// 	[39, 0, 15],
	// ];
	// let fertilizerToWater = [
	// 	[49, 53, 8],
	// 	[0, 11, 42],
	// 	[42, 0, 7],
	// 	[57, 7, 4],
	// ];
	// let waterToLight = [
	// 	[88, 18, 7],
	// 	[18, 25, 70],
	// ];
	// let lightToTemperature = [
	// 	[45, 77, 23],
	// 	[81, 45, 19],
	// 	[68, 64, 13],
	// ];
	// let temperatureToHumidity = [
	// 	[0, 69, 1],
	// 	[1, 0, 69],
	// ];
	// let humidityToLocation = [
	// 	[60, 56, 37],
	// 	[56, 93, 4],
	// ];

	for (let i = 0; i < values.length; i++) {
		if (i === 0) {
			seedLine = values[i]
				.split(':')[1]
				.match(/\d+/g)
				.map((item) => +item);
		}

		if (i >= 3 && i <= 24) {
			seedToSoil.push(values[i].match(/\d+/g).map((item) => +item));
		}

		if (i >= 27 && i <= 53) {
			soilToFertilizer.push(values[i].match(/\d+/g).map((item) => +item));
		}

		if (i >= 56 && i <= 93) {
			fertilizerToWater.push(values[i].match(/\d+/g).map((item) => +item));
		}

		if (i >= 96 && i <= 120) {
			waterToLight.push(values[i].match(/\d+/g).map((item) => +item));
		}

		if (i >= 123 && i <= 142) {
			lightToTemperature.push(values[i].match(/\d+/g).map((item) => +item));
		}

		if (i >= 145 && i <= 170) {
			temperatureToHumidity.push(values[i].match(/\d+/g).map((item) => +item));
		}

		if (i >= 173 && i <= 208) {
			humidityToLocation.push(values[i].match(/\d+/g).map((item) => +item));
		}
	}

	let low = Number.POSITIVE_INFINITY;

	for (let i = 0; i < seedLine.length; i++) {
		let soil = nextMap(seedLine[i], seedToSoil);
		let fertilizer = nextMap(soil, soilToFertilizer);
		let water = nextMap(fertilizer, fertilizerToWater);
		let light = nextMap(water, waterToLight);
		let temperature = nextMap(light, lightToTemperature);
		let humidity = nextMap(temperature, temperatureToHumidity);
		let location = nextMap(humidity, humidityToLocation);

		if (low > location) {
			low = location;
		}
	}

	console.log(low);
}

function nextMap(value, mapSet) {
	let mapper = value;

	for (let i = 0; i < mapSet.length; i++) {
		let source = mapSet[i][1];
		let destination = mapSet[i][0];
		let adder = mapSet[i][2];

		if (source <= value && value <= source + adder - 1) {
			let minus = value - source;
			mapper = destination + minus;
		}
	}

	return mapper;
}

findLocation(values);
