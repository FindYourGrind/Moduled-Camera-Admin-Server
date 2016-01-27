var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var io     = require('../../server');

router.get('/config', function(req, res) {
    fs.readFile('./app/lib/camera_config/config.json', function (err, data) {
        if (err) res.status(404).send(err.message);
        res.status(200).send(data);
    });
});

router.put('/config', function(req, res) {
    fs.writeFile('./app/lib/camera_config/config.json', JSON.stringify(req.body, "", 4), function (err) {
        if (err) res.status(404).send(err.message);
        res.status(200).send('OK');
    });
    io.io.sockets.emit('set_config', JSON.stringify(req.body, "", 4));
});

router.get('/image', function(req, res) {
    io.io.sockets.emit('get_image');
    io.io.on('connection', function(socket) {
        socket.on('send_image', function (data) {
            res.end(data);
        });
    });
});

router.get('/log', function(req, res) {
    io.io.sockets.emit('get_log');
    io.io.on('connection', function(socket) {
        socket.on('send_log', function (data) {
            console.log(data);
        });
    });
    res.send('hi');
});

module.exports = router;