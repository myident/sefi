/* global angular */
/* jslint browser:true */

(function () {
    var Directive = function () {
        var Link = function ($scope) {
            $scope.$watch('subposition', function () {
                if ($scope.source.length) {
                    $scope.source[$scope.subposition].selected = true;
                }

            });
            if ($scope.source && $scope.source.length) {
                for (var i in $scope.source) {
                    $scope.source[i].selected = false;
                }
                if ($scope.subposition) {
                    $scope.source[$scope.subposition].selected = true;
                }
            }

            // Redireccionado de cada elemento
            $scope.href = function (position, index) {
                window.location = "#/procesos/" + position + "/detalle/" + index;
            };

        };
        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/procesos/ng-mapside/ng-mapside.template.html',
            link: Link,
            scope: {
                source: '=',
                position: '=',
                subposition: '='
            }
        };
    };
    angular
        .module('mMapSide', [])
        .directive('ngMapside', Directive);
})();