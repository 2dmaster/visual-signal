
'use strict';

var signal = angular.module('signal', [
    'ngRoute',
    'signalControllers'
]);

signal.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/app-views/signal.view.html',
                controller: 'mainCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

