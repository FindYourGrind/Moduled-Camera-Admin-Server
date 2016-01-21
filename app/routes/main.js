/**
 * Created by admin on 1/18/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

module.exports = router;