angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/video', {
			templateUrl: 'views/video.html',
			controller: 'VideoController'
		})

		.when('/config', {
			templateUrl: 'views/config.html',
			controller: 'ConfigController'
		})

		.when('/logs', {
			templateUrl: 'views/logs.html',
			controller: 'LogsController'
		})

		.otherwise({
			redirectTo: '/home'
		});

	//$locationProvider.html5Mode(true);

}]);