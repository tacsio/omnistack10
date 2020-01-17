const axios = require('axios')
const Dev = require('../models/Dev')
const { parseStringAsArray } = require('../util/parseStringAsArray')

module.exports = {

	async index(request, response) {
		const devs = await Dev.find();

		return response.json(devs);
	},

	async store(request, response) {
		const { github_username, techs, latitude, longiture: longitude } = request.body;

		let dev = await Dev.findOne({ github_username });

		if(!dev) {
			const { data } = await axios.get(`https://api.github.com/users/${github_username}`);
			const { name = login, avatar_url, bio } = data;
			const techsArray = parseStringAsArray(techs);
			const location = {
				type: 'Point',
				coordinates: [longitude, latitude]
			}
		
			dev = await Dev.create({
				name,
				github_username,
				bio,
				avatar_url,
				techs: techsArray,
				location
			});
		}

		return response.json(dev);
	},

	async update(request, response) {

	},

	async destroy(request, response) {

	},
}