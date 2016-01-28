angular.module('LogsCtrl', [])
    .controller('LogsController', function($scope, socket) {
        //socket.disconnect();
        //socket.connect();

        socket.emit('log');

        $scope.head = ['Good plates', 'Time', 'Direction','Bad plates'];

        socket.on('new_log', function(data) {
            var logArray = data.split('\r\n');
            $scope.logs = [];
            for (var note in logArray) {
                $scope.logs.push(JSON.parse(logArray[note]));
            }
        })

        socket.stop();
    });