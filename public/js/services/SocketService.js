'use strict';
angular.module('SocketService', [])
    .factory('socket', function ($rootScope, $interval) {
        var promise;
        var socket = io.connect();
        return {
            start: function () {
                if (promise) {
                    $interval.cancel(promise);
                }
                promise = $interval(function () {
                    socket.emit('get_new_image');
                }, 100);
            },
            stop: function () {
                if (promise) {
                    $interval.cancel(promise);
                }
                promise = null;
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