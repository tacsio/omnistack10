const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')

const routes = require('./routes')
const { setupWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

const connectionUrl = "mongodb://localhost:27017/omnistack";
//const connectionUrl = "mongodb://192.168.99.100:27017/omnistack";

mongoose.connect(connectionUrl, {
  useUnifiedTopology: true,  
	useNewUrlParser: true,
	useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
