var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");
// var mongojs = require("mongojs");
var moment = require("moment");

function scrape(req, res) {
    request("http://www.echojs.com/", function (error, response, body) {
        var $ = cheerio.load(body);

        $("article h2").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });
        });

        res.send("Scrape Complete");
    });
}

function all(req, res) {
    db.Article.find({})
        .populate("notes")
        .then(function (found) {
            res.render("index", {              
                moment,
                articles: found
            });
        })
        .catch(function (err) {
            console.log(error);
        });
}

function addNote(req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then(function (dbArticle) {
            // If the User was updated successfully, send it back to the client
            res.redirect("/#" + req.params.id);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            console.log(err);
        });
}

function deleteNote(req, res) {
    db.Note.remove({
        _id: req.params.noteID
    })
    .then( function (deleted) {
            console.log("Note deleted");
            res.redirect("/#" + req.params.id);
    })
    .catch(function(err) {
        console.log(error);
    });
}

module.exports = {
    scrape, all, addNote, deleteNote
};