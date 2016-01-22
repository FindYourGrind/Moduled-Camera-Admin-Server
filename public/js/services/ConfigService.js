angular.module('ConfigService', [])
    .factory('Receive', ['$http', function($http) {
        var Receive = {};

        Receive.receiveConfig = function () {
            return $http.get('/api/config');
        };

        return Receive;
    }])
    .factory('Update', ['$http', function($http) {
        var Update = {};

        Update.updateConfig = function (dataForUpdating) {
            return $http.put('/api/config', dataForUpdating);
        };

        return Update;
    }]);