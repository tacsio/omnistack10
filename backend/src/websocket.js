const socketio = require('socket.io')

const { parseStringAsArray } = require('./util/parseStringAsArray')
const { MAXDISTANCE } = require('./util/constants')
const calculateDistance = require('./util/calculateDistance')
 
const connections = [];
let io;

exports.setupWebsocket = (server) => {
	io = socketio(server);

	io.on('connection', socket => {
		const { latitude, longitude, techs } = socket.handshake.query;

		connections.push({
			id: socket.id,
			coordinates: {
				latitude: Number(latitude),
				longitude: Number(longitude),
			},
			techs: parseStringAsArray(techs),
		});
	});
};

exports.findConnections = (coordinates, techs) => {
	return connections.filter(connection => {
		return calculateDistance(coordinates, connection.coordinates) < MAXDISTANCE/1000
			&& connection.techs.some(item => techs.includes(item))
	})
};

exports.sendMessage = (to, message, data) => {
	to.forEach(connection => {
		io.to(connection.id).emit(message, data);
	});
};