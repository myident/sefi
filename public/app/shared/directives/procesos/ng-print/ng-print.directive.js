/* global angular, Snap, svgAsPngUri, jsPDF */
(function () {
    var Directive = function () {

        var Link = function ($scope, $element) {
            console.log(angular.element($element).children()[0].children());
        };
        return {
            restrict: 'A',
            link: Link,
            scope: {
                source: '='
            }
        };
    };
    angular
        .module('ngPrint', [])
        .directive('ngPrint', Directive);
})();