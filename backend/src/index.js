const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express();

const connectionUrl = "mongodb://localhost:27017/omnistack";
mongoose.connect(connectionUrl, {
  useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);