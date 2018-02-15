var express = require("express");
var router = express.Router();
var db = require("../../models");
var request = require('request');
var cheerio = require('cheerio');


function getNewsFlashes(req, res) {
    console.log("I'm in getNewsFlashes");

    // Grab every document in the Newsflash collection
    db.Newsflash.find({})

        .then(function (data, err) {
            // console.log("Here is the data" + data[1]);
            // console.log(data[0]);
            var newsFlashes = [];

            if (err) {
                res.status(500).end();
            } else if (data[0]) {
                console.log("I'm in the else if");
                var news = {};
                for (let i = 0; i < data.length; i++) {
                    news = {
                        title: data[i].title,
                        summary: data[i].summary,
                        link: data[i].link,
                        id: data[i].id,
                        saved: data[i].saved
                    }
                    newsFlashes.push(news);
                    // console.log(data[0].title);

                }
                res.render("index", {
                    newsFlash: newsFlashes
                });
                // If we were able to successfully find Newsflashes, send them back to the client
            };
            // console.log("dbNewsflash is " + dbNewsflash);

            // console.log("this is dbNewsFlash in getNewsFlashes" + dbNewsflash);

            // .catch(function (err) {
            //     // If an error occurred, send it to the client
            //     res.json(err);
            // });
            // console.log("got NewsFlashes");

        });
};




router.get("/scrape", function (req, res) {
    console.log("I'm in scrape in the controller");
    request("https://www.usatoday.com/news/world/", function (error, response, html) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);

        // An empty array to save the data that we'll scrape

        // choose the element span with class hgpm-list-hed as a starting point to be able to access all needed article info
        $("span.hgpm-list-hed").each(function (i, element) {

            var results = [];
            // Save the text of the element in a "title" variable
            var title = $(element).text();

            // Save the article summary in a "summary" variable
            var summary = $(element).next().attr("data-fulltext");

            // accessing the link to the article by the "href" attribute of it's great grandparents
            var link = $(element).parent().parent().parent().attr("href");

            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                summary: summary,
                link: link,
                saved: false
            });

            // sending the results to the database
            db.Newsflash.create(results)

                .then(function (dbNewsflash) {
                    // View the added result in the console
                    console.log("dbNewsFlash after scraping and adding to the database" + dbNewsflash);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });
        // Log the results once you've looped through each of the elements found with cheerio

        res.send("Scrape Complete");

        getNewsFlashes(res);

    });
});


// Default route will get the Newsflashes from the database
router.get("/", function (req, res) {
    getNewsFlashes(req, res);
});

// Route to see all unsaved articles in the database
router.get("/newsflashes", function (req, res) {
    getNewsFlashes(req, res);
});

// Route for the savednews page 
router.get("/savednews", function (req, res) {
    getSavedNews(req, res);

});

// Route to save an article
router.put("api/savednews/:id", function (req, res) {

});

// Route to add a new note
router.post("/api/notes/:id", function (req, res) {

});

// Route to delete a note
router.delete("/api/notes/:id", function (req, res) {

});

// export router for server.js 
module.exports = router;