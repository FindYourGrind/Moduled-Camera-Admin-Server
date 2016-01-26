angular.module('sampleApp',
                ['ngRoute',    'appRoutes',
                 'HomeCtrl',   'HomeService',
                 'VideoCtrl',  'VideoService',
                 'ConfigCtrl', 'ConfigService',
                 'LogsCtrl',   'LogsService',
                 'SocketService']);