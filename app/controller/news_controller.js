var express = require("express");
var router = express.Router();
var db = require("../../models");
var request = require('request');
var cheerio = require('cheerio');

// Scraping function to access articles from USA Today
function newsScrape(req, res) {

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

            // Save the article summary in a "summary" variable
            // accessing the link to the article by the "href" attribute of it's great grandparents
            var linkPath = $(element).parent().parent().parent().attr("href");
            var linkRoot = "https://www.usatoday.com/";
            var link = linkRoot + linkPath;

            results.push({
                title: title,
                summary: summary,
                link: link,
                saved: false
            });
            // var i = results.length;
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
    });

};

// Grab every document in the Newsflash collection and use handlebars to render it on the home page
function getNewsFlashes(req, res) {
    console.log("I'm in getNewsFlashes");

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
                    console.log(data[0].title);

                }
                res.render("index", {
                    newsFlash: newsFlashes
                });
            } else {
                res.render("index", {
                    newsFlash: newsFlashes
                });
            }
        });
};

// grab all savedNewsFlashes and render them to the savednews page using handlebars
function savedNewsFlashes(req, res) {
    console.log("I'm in savedNewsFlashes");

    // Grab every document in the Newsflash collection
    db.Newsflash.find({})

        .then(function (data, err) {
            // console.log("Here is the data" + data[1]);
            // console.log(data[0]);
            var newsFlashes = [];

            if (err) {
                res.status(500).end();
            } else if (data[0]) {
                console.log("I'm in the saved else if");
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
                    console.log(data[0].title);

                }
                res.render("savednews", {
                    newsFlash: newsFlashes
                });
            } else {
                res.render("savednews", {
                    newsFlash: newsFlashes
                });
            }
        });
};

// get the notes related to a specific article
function getNotes(req, res) {
    console.log(req.params.id);
    db.Newsflash.findOne({
            _id: req.params.id
        })
        // ..and populate all of the notes associated with it

        .populate("notes")
        .then(function (data, err) {
            console.log("I'm in get notes in the controller");
            console.log("data is " + data);

            // If we were able to successfully find an Article with the given id, send it back to the client
            var existingNotes = [];
            console.log(data.notes);
            if (err) {
                res.status(500).end();
            } else
            if (data) {
                console.log("I'm in the notes gatherer");
                console.log(data);
                // console.log(data.notes.text);
                // console.log(data.notes.saved);
                // console.log(data.notes._id);

                // var i = 0;
                // for (i = 0; i < data.notes.length; i++) {
                if (data.notes !== null) {
                    existingNotes = data.notes;
                    // var note = {
                    //     text: data.notes.text,
                    //     saved: data.notes.saved,
                    //     _id: data.notes._id

                    // }
                    // console.log("note is " + note);
                    // existingNotes.push(note);
                    // console.log(data[0].notes);
                    // console.log(data[0]._id);
                    // console.log(data[0].text);
                    console.log(existingNotes);
                }
                console.log("rendering array");
                res.render("notes", {
                    existingNotes,
                    id: req.params.id

                });

            } else {

                console.log("empty else");
                res.render("notes", {
                    id: req.params.id

                });
            };
        });
};

// Route to scrape the data and send it to the database
router.get("/scrape", function (req, res) {
    console.log("I'm in scrape in the controller");
    newsScrape(req, res);
    // setTimeout(function () {
    //     getNewsFlashes(res);
    // }, 4000);
    // setTimeout(getNewsFlashes, 3000);
    // getNewsFlashes(req, res);
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
    savedNewsFlashes(req, res);

});

// Route to save an article
router.put("/api/savednews/:id", function (req, res) {
    console.log("controller saving article");
    console.log(req.params.id);
    db.Newsflash.update({
        "_id": req.params.id
    }, {
        $set: {
            "saved": true
        }
    }).then(function (data, err) {
        console.log("I'm out of the database");
        if (err) {
            // If an error occurred, send a generic server failure
            console.log("an error occurred");
            console.log(err);
            res.status(500).end();
        } else if (data) {
            console.log(data);
            console.log("article is saved");
            savedNewsFlashes(req, res);
        }
    });

});

// Route to delete an article from the saved list
router.delete("/api/savednews/:id", function (req, res) {

    console.log("controller deleting article");
    console.log(req.params.id);
    db.Newsflash.deleteOne({
        "_id": req.params.id
    }).then(function (data, err) {
        console.log("I'm out of the database delete");

        if (err) {
            // If an error occurred, send a generic server failure
            console.log("an error occurred");
            console.log(err);
            res.status(500).end();
        } else if (data) {
            console.log(data);
            console.log("article is deleted");
            savedNewsFlashes(req, res);
        }
    });


});

// Route to get existing notes on an article
router.get("/notes/:id", function (req, res) {
    console.log(req.params.id);
    // Using the id passed in the id parameter 
    getNotes(req, res);

});

// Route to add a new note
router.post("/api/notes/:id", function (req, res) {
    id = req.params.id;
    console.log("req is" + req.body.text);
    // console.log("req.body.text is" + req.body);
    console.log("req.params.id is" + id);
    db.Notes.create({
            // newsflash: req.params.id,

            text: req.body.text
        })
        .then(function (dbNotes) {
            // View the added result in the console
            console.log("dbNotes after posting new note to the database" + dbNotes);
            console.log("dbNotes_id is " + dbNotes._id);
            console.log(req.params.id);
            // var note = dbNotes._id;
        })
    return db.Newsflash.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                notes: dbNotes_id
            }
        })
        .then(function (dbNewsflash) {

            console.log("dbNewsflash" + dbNewsflash);
            getNotes(res);

        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
        });

});

// Route to delete a note
router.delete("/api/notes/:id", function (req, res) {
    db.Notes.deleteOne({
        _id: req.params.id
    }).then(function (data, err) {
        console.log("I'm out of the database delete");
        if (err) {
            // If an error occurred, send a generic server failure
            console.log("an error occurred");
            console.log(err);
            res.status(500).end();
        } else if (data) {
            console.log(data);
            console.log("note is deleted");
        }
    });
    getNotes(req, res);
});

// export router for server.js 
module.exports = router;