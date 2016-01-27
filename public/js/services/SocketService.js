'use strict';
angular.module('SocketService', [])
    .factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:8081');
    return {
        connect: function () {
            socket = io.connect('http://localhost:8081');
        },
        disconnect: function () {
            if(socket){
                socket.close();
            }
        },
        on: function (eventName, callback) {
            if(socket) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });

            }
        },
        emit: function (eventName, data, callback) {
            if(socket) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        }
    };
});