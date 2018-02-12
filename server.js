var express = require("express");
// Configure middleware

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

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/Newsflashes");


app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});