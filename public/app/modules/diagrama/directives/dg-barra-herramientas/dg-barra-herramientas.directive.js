/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            $scope.organizeByAreas = function () {
                $scope.organize.areas.active = true;
                $scope.organize.unorganized.active = false;
            };

            $scope.unorganize = function () {
                $scope.organize.areas.active = false;
                $scope.organize.unorganized.active = true;
            };

            $scope.organize = {
                areas: {
                    active: false
                },
                unorganized: {
                    active: true
                }
            };

            $scope.show = {
                areas: {
                    active: false
                },
                applications: {
                    active: false
                },
                kpis: {
                    actions: false
                }
            };

            $scope.toggleShow = function (option) {
                $scope.show = {
                    areas: {
                        active: false
                    },
                    applications: {
                        active: false
                    },
                    kpis: {
                        actions: false
                    }
                };
                $scope.show[option].active = true;
            };

        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/diagrama/directives/dg-barra-herramientas/dg-barra-herramientas.template.html',
            link: Link,
            scope: {}
        };
    };
    angular
        .module('dgDiagramaBarraHerramientas', [])
        .directive('dgBarraHerramientas', Directive);
})();