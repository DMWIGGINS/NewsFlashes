// express
var express = require("express");

// express-handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
// mongoose
var mongoose = require("mongoose");
// body-parser
var bodyParser = require("body-parser");
// cheerio
var cheerio = require("cheerio");
// request
var request = require("request");

// Require all models
var db = require("./models");
var port = process.env.PORT || 3000;
// Initialize Express
var app = express();
// Configure middleware

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: false
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Import routes and give the server access to them.
var routes = require("./controller/news_controller.js");
app.use("/", routes);


request("https://www.usatoday.com/tech/", function(error, response, html) {
  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);
  // An empty array to save the data that we'll scrape
  var results = [];
  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("span.js-assett-headline").each(function(i, element) {
    // Save the text of the element in a "title" variable
    var title = $(element).text();
    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");
    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  });
  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
})