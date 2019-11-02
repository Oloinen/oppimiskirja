var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
let parser = bodyParser.urlencoded({ extended: true});
const topic = require('../dbhandle/psqlbase');

router.route('/')
.get((req, res, next) => {
    topic.getTopics(result => {
        res.json(result)
    })  
})
.post((req, res) => {
    topic.createTopic(req, result => {
        res.status(201).end();
    })
})

module.exports = router;
