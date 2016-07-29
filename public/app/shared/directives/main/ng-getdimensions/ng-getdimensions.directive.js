/* global angular */

(function () {
    var Directive = function () {
        var Link = function ($scope, $elem) {
            $scope.height = $elem[0].offsetHeight;
        };
        return {
            restrict: 'A',
            link: Link
        };
    };
    
    var ScrollDirective = function($window) {
        var Link = function($scope) {
            angular.element($window).bind("scroll", function() {
                $scope.getScroll(this.pageYOffset);
                $scope.$apply();
            });
        };
        return {
            restrict: 'A',
            link: Link,
            scope: {
                getScroll: '='
            }
        };
    };
    
    angular
        .module('mGetdimensions', [])
        .directive('ngGetdimensions', Directive)
        .directive('scroll', ScrollDirective);
})();