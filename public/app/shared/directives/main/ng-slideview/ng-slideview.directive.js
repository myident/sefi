/* global angular */

(function () {
    var Directive = function () {
        var Link = function ($scope) {

        };
        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/main/ng-slideview/ng-slideview.template.html',
            link: Link,
            scope: {
                active:"=active"
            }
        };
    };
    angular
        .module('mSlideview', [])
        .directive('ngSlideview', Directive);
})();