angular.module('ConfigService', [])
    .factory('Receive', ['$http', function($http) {
        var Receive = {};

        Receive.receiveConfig = function (dataForReceiveing) {
            return $http.get('/api/config');
        };

        return Receive;
    }]);