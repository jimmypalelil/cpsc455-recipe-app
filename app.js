var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const fs = require('fs');

var recipesRouter = require('./routes/recipes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static("build"))

app.use('/recipes', recipesRouter);




module.exports = app;
