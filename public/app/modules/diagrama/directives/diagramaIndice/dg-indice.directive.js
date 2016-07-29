/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {
            $scope.msn = '';
        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/diagrama/directives/diagramaIndice/dg-indice.template.html',
            link: Link,
            scope: {
            }
        };
    };
    angular
        .module('dgDiagramaIndice', [])
        .directive('dgIndice', Directive);
})();