/* global angular */

(function () {
    var Directive = function () {
        var Link = function ($scope) {
            $scope.style = $scope.set;
        };
        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/main/ng-background/ng-background.template.html',
            link: Link,
            scope: {
                set: '@'
            }
        };
    };
    angular
        .module('mBackground', [])
        .directive('ngBackground', Directive);
})();