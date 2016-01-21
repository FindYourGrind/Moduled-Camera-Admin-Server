/**
 * Created by admin on 1/20/2016.
 */
/**
 * Created by admin on 1/18/2016.
 */
var express = require('express');
var router = express.Router();
var io     = require('../../server');

router.post('/drive', function(req, res) {
    io.io.sockets.emit('sensor');
    console.log('drive');
});

router.post('/leave', function(req, res) {
    console.log('leave');
});

module.exports = router;