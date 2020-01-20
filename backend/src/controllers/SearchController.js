const Dev = require('../models/Dev')
const { MAXDISTANCE } = require('../util/constants')
const { parseStringAsArray } = require('../util/parseStringAsArray')

module.exports = {
	async search(request, response) {
		const { latitude, longitude, techs } = request.query;
		const techsFilter = parseStringAsArray(techs);

		const devs = await Dev.find({
			techs: {
				$in: techsFilter
			},
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [longitude, latitude],
					},
					$maxDistance: MAXDISTANCE,
				}
			}
		});
		return response.json({devs: devs});
	}
}