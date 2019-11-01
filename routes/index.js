var express = require('express');
var router = express.Router();
const topic = require('../dbhandle/psqlbase');

router.route('/')
.get((req, res, next) => {
    console.log('Täällä')
    topic.getTopics(result => {
        res.send(result)
    })  
})
.post((req, res) => {
    topic.createTopic(req, result => {
        res.send(result);
    })
})

module.exports = router;
