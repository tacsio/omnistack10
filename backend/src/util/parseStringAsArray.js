module.exports =  {
	parseStringAsArray(arrayAsString) {
	const array = arrayAsString.split(',').map(item => item.trim());

	return array;
	},
}