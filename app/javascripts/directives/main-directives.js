signal.directive('playAndVisualize', ['$window', function($window){
    return{
        restrict: 'AE',
        scope:{
            playAndVisualize:'@',
            autoplay:'=',
            loop:'=',
            peaksCount:'='
        },
        templateUrl: "app/directive-views/play-and-visualize.view.html",
        link: function ($scope, $element) {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            $scope.models = {
                audio: new Audio(),
                context: new AudioContext(),
                spectrum: null,
                signalSource: null,
                signalSourceNode: null,
                signalAnalyser: null,
                currentPlayPosition: null,
                audioDuration:null,
                peaks:[],
                peakWidth : Math.round(($element[0].clientWidth / 2) / $scope.peaksCount * 1100) / 1100 + "px"
            };

            console.log($element);

            $scope.models.audio.loop = $scope.loop;
            $scope.models.audio.src = $scope.playAndVisualize;

            $scope.models.audio.addEventListener('loadedmetadata', function() {
                $scope.models.audioDuration = $scope.models.audio.duration;
            });

            $scope.models.audio.addEventListener('canplay', function (e) {
                $scope.models.signalAnalyser = ($scope.models.signalAnalyser || $scope.models.context.createAnalyser());
                $scope.models.signalSource = $scope.models.context.createBufferSource();
                $scope.models.signalAnalyser.fftSize = 4096;
                try {
                    $scope.models.signalSourceNode = $scope.models.context.createMediaElementSource($scope.models.audio);
                }
                catch (e) {
                    return;
                }
                $scope.models.signalSourceNode.connect($scope.models.signalAnalyser);
                $scope.models.signalSourceNode.connect($scope.models.context.destination);
                if ($scope.autoplay){
                    $scope.models.audio.play();
                    $scope.isPlaying = true;
                }
                $scope.getSpectrumData();
            });

            $scope.getSpectrumData = function () {
                $scope.models.spectrum = new Uint8Array($scope.models.signalAnalyser.frequencyBinCount);
                $scope.models.signalAnalyser.getByteFrequencyData($scope.models.spectrum);
                if($scope.isPlaying){
                    $scope.drawPeaks();
                }
                $scope.models.currentPlayPosition = $scope.models.audio.currentTime;
                if ($scope.models.currentPlayPosition < $scope.models.audioDuration ){
                    window.requestAnimationFrame($scope.getSpectrumData);
                }
                $scope.$apply();
            };

            $scope.drawPeaks = function () {
                for (var i = 0; i < $scope.peaksCount; i++) {
                    $scope.models.peaks[i] = {
                        height:$scope.models.spectrum[i] + "px",
                        width: $scope.models.peakWidth
                    };
                }
            };

            $scope.playPauseToggle = function () {
                if ($scope.isPlaying == true) {
                    $scope.isPlaying = false;
                    $scope.models.audio.pause();
                }
                else {
                    $scope.isPlaying = true;
                    $scope.models.audio.play();
                }
            };

        }
    };
}]);