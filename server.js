// express
var express = require("express");

// express-handlebars
var exphbs = require("express-handlebars");

// mongoose
var mongoose = require("mongoose");

// body-parser
var bodyParser = require("body-parser");

// path
var path = require("path");

// cheerio
var cheerio = require("cheerio");

// request
var request = require("request");

// morgan
var logger = require("morgan");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

app.use(logger("dev"));

// express-handlebars
var exphbs = require("express-handlebars")
app.engine("handlebars", exphbs({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "app/views/layouts")
}));

app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, "app/views"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static("./app/public"));

// Import routes and give the server access to them.
var routes = require("./app/controller/news_controller.js");
app.use("/", routes);

// Setting up database connection
mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_75tg9ssd:aspj7bfu2ps2g6cvjhqj3d8f3q@ds245518.mlab.com:45518/heroku_75tg9ssd");


app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});