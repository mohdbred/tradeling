
const express = require('express');
var httpContext = require('express-http-context');
require("dotenv").config();
var bodyParser = require('body-parser');
const limiter = require('./middlewares/rate-limit.middleware');
const es_route = require('./routes/elasticsearch.route');

const app = express();

var httpContext = require('express-http-context');
app.use(httpContext.middleware);

var bodyParser = require('body-parser');
app.use(bodyParser.json());// support json encoded bodies


app.use(express.urlencoded({ extended: true })); // support encoded bodies


app.use((req, res, next) => {
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
    next();
});

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Hello from Mohd Belal Server for Tradeling');
});

app.use('/elasticsearch/V1', limiter, es_route);



app.listen(7860, function () {
    console.log(`${new Date()} : Mohd Belal Server running using HTTP on port ${7860}...`);
});




