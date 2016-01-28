angular.module('ConfigCtrl', []).controller('ConfigController', function($scope, Receive, Update, socket) {

    //socket.disconnect();

    $scope.errors = null;

    $scope.argsRoiDrive = [];
    $scope.argsRoiLeave = [];

    var getConfig = function () {
        Receive.receiveConfig()
            .success(function (data) {
                $scope.configData = data;
                $scope.currentID = $scope.configData.general.cameraID;
                $scope.argsRoiDrive = $scope.configData.moving.roiForDrive;
                $scope.argsRoiLeave = $scope.configData.moving.roiForLeave;
                $scope.errors = null;
            })
            .error(function (error) {
                $scope.errors = error;
            });
    };

    $scope.doConfig = function () {
        Update.updateConfig($scope.configData)
            .success(function (data) {
                $scope.errors = null;
            })
            .error(function (error) {
                $scope.errors = error;
            });
    };

    $scope.addRoi = function (arr, v) {
        if (v) {
            if ((0 < v ) && (v < 17)){
                if(arr===$scope.argsRoiDrive) {
                    if($scope.argsRoiLeave.indexOf(v) > -1){
                        return 0
                    } else {
                        if ($scope.argsRoiDrive.indexOf(v) > -1) {
                            return 0;
                        } else {
                            arr.push(v);
                            arr.sort()
                        }
                    }
                } else if (arr===$scope.argsRoiLeave) {
                    if($scope.argsRoiDrive.indexOf(v) > -1){
                        return 0
                    } else {
                        if ($scope.argsRoiLeave.indexOf(v) > -1) {
                            return 0;
                        } else {
                            arr.push(v);
                            arr.sort()
                        }
                    }
                }
            } else {
                return 0;
            }
        } else {

            return 0;
        }
    };

    $scope.removeRoi = function (arr, v) {
        var index = arr.indexOf(v);
        arr.splice(index, 1);
    };

    socket.stop();
    getConfig();

});