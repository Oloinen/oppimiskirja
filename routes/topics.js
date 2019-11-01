var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
let app = express();
app.use(bodyParser.json());
let parser = bodyParser.urlencoded({ extended: true});
const topic = require('../dbhandle/psqlbase');

router
.get('/', function(req, res, next) {
    topic.getTopics(result => {
        res.json(result)
    })  
})
.post('/', (req, res) => {
    topic.createTopic(req, result => {
        res.send(result);
    })
})

router.route('/topics/:id')
.get((req, res) => {
    topic.getTopicById(req, result => {
        res.status(200)
            .json(result)
            .end();
    })
})
.delete((req, res) => {
    topic.deleteTopic(req, result => {
        res.send(result);
    })
})
.put((req, res) => {
    topic.updateTopic(req, result => {
        res.send(result);
    })

})

module.exports = router;
