/* global angular */

(function () {
    var Directive = function () {
        var Link = function ($scope) {
        
            // Cerrar una tarjeta
            $scope.closeOne = function(index) {
                $scope.source[index].flipped = !$scope.source[index].flipped;
            };
            
            // Voltear una tarjeta
            $scope.flipOne = function (index) {
                for (var i in $scope.source) {
                    $scope.source[i].flipped = false;
                }
                $scope.source[index].flipped = !$scope.source[index].flipped;
                $scope.get(index);
            };

        };
        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/procesos/ng-flipcard/ng-flipcard.template.html',
            link: Link,
            scope: {
                source: '=set',
                get: '=',
                rutas: '='
            }
        };
    };
    angular
        .module('mFlipCard', [])
        .directive('ngFlipcard', Directive);
})();