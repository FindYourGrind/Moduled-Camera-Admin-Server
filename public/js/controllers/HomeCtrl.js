angular.module('HomeCtrl', []).controller('HomeController', function($scope, $location, socket) {

    $scope.$location = $location;
    //socket.disconnect();
    //socket.connect();

    $scope.doUpdate = function () {
        socket.emit('update')
    };

    $scope.doRestart = function () {
        socket.emit('restart')
    };

    socket.stop();
});