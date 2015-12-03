'use strict';

var signalControllers = angular.module('signalControllers', []);

signalControllers.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.player = {
        peaksResolutions:[
            {
                name:'Low',
                value:32
            },
            {
                name:'Medium',
                value:64
            },
            {
                name:'Hi',
                value:128
            }
        ],
        currentResolution:null,
        track: 'app/audio/radio.mp3'
    };

    $scope.player.currentResolution = $scope.player.peaksResolutions[1].value;
}]);