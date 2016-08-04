/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            $scope.openOptions = function () {
                $scope.optionsShow = !$scope.optionsShow;
            };

            $scope.optionsShow = false;
            
            

            // view
            $scope.view = [
                {
                    title: 'Processes (Level 1)'
                },
                {
                    title: 'Capabilites (Level 2)'
                },
                {
                    title: 'Business rules (Level 3)'
                }
            ];

            $scope.setView = function (value) {
                for (var i = 0; i < $scope.view.length; i++) {
                    $scope.view[i].active = false;
                    if (value == i) {
                        $scope.view[i].active = true;
                    }
                }
            };
            
            $scope.getView = function(){
                var number = 0;
                for (var i = 0; i < $scope.view.length; i++) {
                    if ($scope.view[i].active) {
                        number = i;
                    }
                }
                return number;
            };
            
            $scope.getViewName = function () {
                var name = $scope.view[0].title;
                for (var i = 0; i < $scope.view.length; i++) {
                    if ($scope.view[i].active) {
                        name = $scope.view[i].title;
                    }
                }
                return name;
            };
            
            $scope.selectView = function (option) {
                $scope.setView(option);
                $scope.openOptions();
                $scope.sendView(option);
            };
            
            $scope.setView($scope.configView);
            

            
            // organize
            
            $scope.organize = {
                active: false
            };
            
            $scope.setOrganize = function(value){
                $scope.organize.active = value;
            };

            $scope.toggleOrganize = function () {
                $scope.organize.active = !$scope.organize.active;
                $scope.sendOrganize($scope.organize.active);
            };
            
            $scope.getOrganize = function(){
                return $scope.organize.active;
            };
            
            $scope.setOrganize($scope.configOrganize);
            
            
            
            // show
            
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
            
            $scope.setShow = function(value){
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
                console.log(value);
                $scope.show[value].active = true;
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
            
            $scope.setShow($scope.configShow);

        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/diagrama/directives/dg-barra-herramientas/dg-barra-herramientas.template.html',
            link: Link,
            scope: {
                configView: '=view',
                configOrganize: '=organize',
                configShow: '=show',
                configZoom: '=zoom',
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