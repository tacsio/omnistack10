const { Router } = require('express')
const { index, store } = require('./controllers/DevController')
const { search } = require('./controllers/SearchController')

const routes = Router();

//dev
routes.get('/devs', index);
routes.post('/devs', store);

//search
routes.get('/search', search);

module.exports = routes;