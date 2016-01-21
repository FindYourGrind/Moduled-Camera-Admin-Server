/**
 * Created by admin on 1/20/2016.
 */
module.exports =  function (server) {
    var io = require('socket.io').listen(server);
    return io;
};
