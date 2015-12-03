/**
 * Created by A.vachik on 10.07.2015.
 */

gallery.directive('notification', ['$timeout', function($timeout){
    return {
        restrict:'E',
        scope:{
            notificationMessage:'='
        },
        template:'<div class="notification-message"><span class="notification-message--text" ng-bind-html="notification.message"></span></div>',
        link:function($scope, $element){
            var $notificationContainer = angular.element($element.children()[0]);
            $scope.$watch('notificationMessage', function(notification){
                if (notification){
                    $scope.notification = notification;
                    $notificationContainer.addClass('active');
                    $timeout(function(){
                        $notificationContainer.removeClass('active')
                    }, 3000);
                }
            });
        }
    };
}]);

gallery.directive( 'inlineEdit', function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            onEditFinish: '='
        },
        template: '<div class="edit-icon"><i class="glyphicon glyphicon-edit base-icon-color"></i></div><span ng-click="edit()" ng-bind="model" title="Click to edit"></span><input ng-model="model" ng-keyup="handleKeys($event)">',
        link: function ( $scope, element ) {
            var inputElement = angular.element( element.children()[2] ); // get <input> element
            element.addClass( 'inline-edit-field' );
            $scope.editing = false;
            //$scope.old_value = '';
            if ($scope.model == '') {
                $scope.model = 0;
            }
            $scope.edit = function () {
                $scope.editing = true;
                element.addClass( 'active' );
                inputElement[0].focus();
                //$scope.old_value = $scope.model;
            };

            $scope.handleKeys = function($event){
                if($event.keyCode === 13){
                    inputElement[0].blur();
                }
            };

            inputElement.prop( 'onblur', function() {
                $scope.editing = false;
                element.removeClass( 'active' );
                if ($scope.onEditFinish){
                    $scope.onEditFinish();
                }
                if ($scope.model == '') {
                    $scope.model = 0;
                }
                //var offset = $scope.model - $scope.old_value;
                //$scope.$parent.$parent.$parent.recalculateDuration($scope.$parent.cardIndex, $scope.$parent.$parent.elemIndex, offset);
            });
        }
    };
});
