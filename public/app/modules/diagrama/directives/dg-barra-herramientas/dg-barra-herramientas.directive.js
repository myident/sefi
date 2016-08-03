/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {
            
            $scope.openOptions = function () {
                $scope.optionsShow = !$scope.optionsShow;
            };
            $scope.optionsShow = false;
            
            $scope.view = [
                {
                    title: 'Processes (Level 1)',
                    active: true
                },
                {
                    title: 'Capabilites (Level 2)',
                    active: false
                },
                {
                    title: 'Business rules (Level 3)',
                    active: false
                }
            ];
            
            $scope.getView = function () {
                var name = 'Default';
                for (var i = 0; i < $scope.view.length; i++) {
                    if ($scope.view[i].active) {
                        name = $scope.view[i].title;
                    }
                }
                return name;
            };
            
            $scope.selectView = function (option) {
                $scope.view = [
                    {
                        title: 'Processes (Level 1)',
                        active: false
                    },
                    {
                        title: 'Capabilites (Level 2)',
                        active: false
                    },
                    {
                        title: 'Business rules (Level 3)',
                        active: false
                    }
                ];
                $scope.view[option].active = true;
                $scope.openOptions();
                $scope.sendView(option);
            };
            
            $scope.organize = {
                active: false
            };
            
            $scope.toggleOrganize = function () {
                $scope.organize.active = !$scope.organize.active;
                $scope.sendOrganize($scope.organize.active);
            };

            $scope.show = {
                areas: {
                    active: false
                },
                applications: {
                    active: false
                },
                kpis: {
                    active: false
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
                        active: false
                    }
                };
                $scope.show[option].active = true;
                $scope.sendShow(option);
            };

        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/diagrama/directives/dg-barra-herramientas/dg-barra-herramientas.template.html',
            link: Link,
            scope: {
                sendView: '=getView',
                sendOrganize: '=getOrganize',
                sendShow: '=getShow'
            }
        };
    };
    angular
        .module('dgDiagramaBarraHerramientas', [])
        .directive('dgBarraHerramientas', Directive);
})();