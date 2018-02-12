var express = require("express");
var db = require("../../models");
var router = express.Router();

function getNewsflashes() {
    // Grab every document in the Articles collection
    db.Newsflash.find({})
        .then(function (dbNewsflash) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbNewsflash);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    res.render("index");
};

function getSavedNews() {

}

router.get("/scrape", function (req, res) {

    request("https://www.usatoday.com/news/world/", function (error, response, html) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);

        // An empty array to save the data that we'll scrape
        var results = [];

        // chose the element span with class hgpm-list-hed as a starting point to be able to access all needed article info
        $("span.hgpm-list-hed").each(function (i, element) {

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

            db.Newsflash.create(result)
                .then(function (dbNewsflash) {
                    // View the added result in the console
                    console.log(dbNewsflash);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });
        // Log the results once you've looped through each of the elements found with cheerio

        res.send("Scrape Complete");
        getNewsFlashes();
    });
});

// Default route and route for getting the Newsflashes from the database
router.get("/", function (req, res) {
    getNewsflashes();
});

router.get("/newsflashes", function (req, res) {
    getNewsflashes();
});

// Route for the savednews page 
router.get("/savednews", function (req, res) {
    getSavedNews();

});



// Route to add a new note
router.post("/api/notes/:id", function (req, res) {

});
// Route to delete a note
router.delete("/api/notes/:id", function (req, res) {

});