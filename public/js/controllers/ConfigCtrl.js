angular.module('ConfigCtrl', []).controller('ConfigController', function($scope, Receive) {

    $scope.getConfig = function () {
        Receive.receiveConfig()
            .success(function (data) {
                $scope.configData = data;
            })
            .error(function (error) {

            });
    };

    $scope.doConfig = function () {

    };

    $scope.getConfig();

});