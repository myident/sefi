/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {
            $scope.$watch('historial', function () {});
        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/diagrama/directives/dg-historial/dg-historial.template.html',
            link: Link,
            scope: {
                historial: '='
            }
        };
    };
    angular
        .module('dgDiagramaHistorial', [])
        .directive('dgHistorial', Directive);
})();