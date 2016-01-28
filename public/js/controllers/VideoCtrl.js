angular.module('VideoCtrl', [])
    .controller('VideoController', function($scope, $timeout, $interval, socket) {

        $scope.directionModeFlag = false;

        $scope.startStream = function (directionMode) {
            $scope.directionModeFlag = directionMode;
        };

        socket.on('new_image', function (data) {

            var canvas;

            if ($scope.directionModeFlag) {
                canvas = document.getElementById("myCanvasConfig");
            } else {
                canvas = document.getElementById("myCanvasVideo");
            }

            var context = canvas.getContext("2d");
            var im = new Image();

            im.src = 'data:image/jpeg;base64,' + data;
            im.onload = function() {
                context.drawImage(im, 0, 0, 320, 240);

                if ($scope.directionModeFlag) {

                    var w = 320;
                    var h = 240;

                    context.beginPath();
                    context.strokeStyle = "#0F0";
                    context.font = "bold 30px sans-serif";
                    context.moveTo(w / 5, 0);
                    context.lineTo(w / 5, h);
                    context.moveTo(w - w / 5, 0);
                    context.lineTo(w - w / 5, h);
                    context.strokeText("1", 23, 33);
                    context.strokeText("13", 15, h - 13);
                    context.moveTo(0, h / 5);
                    context.lineTo(w, h / 5);
                    context.moveTo(0, h - h / 5);
                    context.lineTo(w, h - h / 5);
                    context.strokeText("2", 23 + w / 5, 33);
                    context.strokeText("12", 15 + w / 5, h - 13);
                    context.moveTo(2 * w / 5, 0);
                    context.lineTo(2 * w / 5, h / 5);
                    context.moveTo(3 * w / 5, 0);
                    context.lineTo(3 * w / 5, h / 5);
                    context.strokeText("3", 23 + 2 * w / 5, 33);
                    context.strokeText("11", 15 + 2 * w / 5, h - 13);
                    context.moveTo(0, 2 * h / 5);
                    context.lineTo(w / 5, 2 * h / 5);
                    context.moveTo(0, 3 * h / 5);
                    context.lineTo(w / 5, 3 * h / 5);
                    context.strokeText("4", 23 + 3 * w / 5, 33);
                    context.strokeText("10", 15 + 3 * w / 5, h - 13);
                    context.moveTo(2 * w / 5, h - h / 5);
                    context.lineTo(2 * w / 5, h);
                    context.moveTo(3 * w / 5, h - h / 5);
                    context.lineTo(3 * w / 5, h);
                    context.strokeText("5", 23 + 4 * w / 5, 33);
                    context.strokeText("9", 23 + 4 * w / 5, h - 13);
                    context.moveTo(w - w / 5, 2 * h / 5);
                    context.lineTo(w, 2 * h / 5);
                    context.moveTo(w - w / 5, 3 * h / 5);
                    context.lineTo(w, 3 * h / 5);
                    context.strokeText("16", 15, 33 + h / 5);
                    context.strokeText("6", 23 + 4 * w / 5, 33 + h / 5);
                    context.strokeText("15", 15, 33 + 2 * h / 5);
                    context.strokeText("7", 23 + 4 * w / 5, 33 + 2 * h / 5);
                    context.strokeText("14", 15, 33 + 3 * h / 5);
                    context.strokeText("8", 23 + 4 * w / 5, 33 + 3 * h / 5);
                    context.strokeStyle = "#00FF00";
                    context.stroke();
                }
            }
        });

        socket.stop();
        socket.start();
    });