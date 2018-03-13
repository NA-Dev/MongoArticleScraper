var express = require('express');
var router = express.Router();
var controller = require('../controllers/html-controller.js');

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/scrape', controller.scrape);

// 2. At the "/all" path, display every entry in the animals collection
router.get("/all", function (req, res) {
    // Query: In our database, go to the animals collection, then "find" everything
    db.animals.find({}, function (error, found) {
        // Log any errors if the server encounters one
        if (error) {
            console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
            res.json(found);
        }
    });
});

// 3. At the "/name" path, display every entry in the animals collection, sorted by name
router.get("/name", function (req, res) {
    // Query: In our database, go to the animals collection, then "find" everything,
    // but this time, sort it by name (1 means ascending order)
    db.animals.find().sort({ name: 1 }, function (error, found) {
        // Log any errors if the server encounters one
        if (error) {
            console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
            res.json(found);
        }
    });
});

// 4. At the "/weight" path, display every entry in the animals collection, sorted by weight
router.get("/weight", function (req, res) {
    // Query: In our database, go to the animals collection, then "find" everything,
    // but this time, sort it by weight (-1 means descending order)
    db.animals.find().sort({ weight: -1 }, function (error, found) {
        // Log any errors if the server encounters one
        if (error) {
            console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
            res.json(found);
        }
    });
});

module.exports = router;
