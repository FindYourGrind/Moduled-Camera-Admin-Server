angular.module('VideoCtrl', []).controller('VideoController', function($scope, socket) {

    $scope.startStream = function () {
        socket.emit('get_new_image');
    };

    socket.on('new_image', function (data) {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        var im = new Image();

        im.src = 'data:image/jpeg;base64,' + data;
        context.drawImage(im, 0, 0, 320, 240);
        socket.emit('get_new_image');
    });

});