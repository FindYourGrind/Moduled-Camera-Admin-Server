var express = require('express');
var router  = express.Router();
var fs      = require('fs');

router.get('/config', function(req, res) {
    fs.readFile('./app//lib/camera_config/config.json', function (err, data) {
        if (err) res.status(404).send(err.message);
        res.status(200).send(data);
    });
});

module.exports = router;