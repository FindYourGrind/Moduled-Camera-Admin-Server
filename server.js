// modules =================================================
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs             = require('fs');

var app            = express();

// configuration ===========================================
var config         = require('./app/config');
var cameraConfig  = require('./app/lib/camera_config');

// config files
var port = process.env.PORT || 8080;//config.get('port'); // set our port

// routes handlers =========================================
var mainHandle = require('./app/routes/main');
var sensorHandle = require('./app/routes/sensor');
var apiHandle = require('./app/routes/api');

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
app.use('/', mainHandle);
app.use('/sensor', sensorHandle);
app.use('/api', apiHandle);

// start app ===============================================
app.listen(port);
console.log('Server started on port ' + port); 			// shoutout to the user

module.exports = app; 						// expose app

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

server.listen(8081);

io.on('connection', function(socket) {

    socket.emit('get_config');

    socket.on('config', function (data) {
        var configJSON = JSON.parse(data);
        for(var key in configJSON) {
            cameraConfig.set(key, configJSON[key]);
        }
        cameraConfig.save(function (err) {
            if (err) console.log('Error to save camera config data');
            console.log('Config OK');
        });
    });
});

exports.io = io;