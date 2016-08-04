/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            $scope.openOptions = function () {
                $scope.optionsShow = !$scope.optionsShow;
            };

            $scope.optionsShow = false;

            // MARK: - view
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
            
            
            // MARK: - organize
            $scope.organize = {
                active: false
            };
            $scope.setOrganize = function(value){
                if (value === 0){
                    $scope.organize.active = false;
                } else {
                    $scope.organize.active = true;
                    
                }
            };
            $scope.toggleOrganize = function () {
                var value = 0;
                $scope.organize.active = !$scope.organize.active;
                if ($scope.organize.active){
                    value = 1;
                    if ($scope.configShow == 1){
                        $scope.setShow(0);
                    }
                }
                if (value == 1){
                    $scope.show[0].disabled = true;
                } else {
                    $scope.show[0].disabled = false;
                }
                $scope.configOrganize = value;
                $scope.sendOrganize(value);
                
            };
            $scope.getOrganize = function(){
                return $scope.organize.active;
            };
            
            
            // MARK: - show
            $scope.show = [
                {
                    title: 'Areas',
                    class: 'areas'
                },
                {
                    title: 'Applications',
                    class: 'apps'
                },
                {
                    title: 'KPIs',
                    class: 'kpis'
                }
            ];
            $scope.toggleShow = function(value){
                var realValue = value + 1;
                var oldValue = 0;
                if ($scope.configOrganize == 1 && realValue == 1){
                    
                } else {
                    for (var i = 0; i < $scope.show.length; i ++){
                        if ($scope.show[i].active){
                            oldValue = i + 1;
                        }
                    }
                    if (oldValue == realValue){
                        $scope.setShow(0);
                    } else {
                        $scope.setShow(realValue);
                    }
                }
            };
            $scope.setShow = function(value){
                for (var i = 0; i < $scope.show.length; i++) {
                    $scope.show[i].active = false;
                    if (value == (i + 1)) {
                        $scope.show[i].active = true;
                    }
                }
                $scope.configShow = value;
                $scope.sendShow(value);
            };
            
            
            // MARK: - zoom
            
            $scope.zoom = $scope.configZoom;
            $scope.displayZoom = parseInt($scope.zoom * 100) + '%';
            
            $scope.changeZoom = function(direction){

                var options = {
                    menos: function(){
                        if ($scope.zoom >= 0.5){
                            $scope.zoom -= 0.02;
                            $scope.displayZoom = parseInt($scope.zoom * 100) + '%';
                        }
                        return $scope.zoom;
                    },
                    mas: function(){
                        if ($scope.zoom <= 2){
                            $scope.zoom += 0.02;
                            $scope.displayZoom = parseInt($scope.zoom * 100) + '%';
                        }
                        return $scope.zoom;
                    },
                    default: function(){
                        $scope.zoom = 1;
                        $scope.displayZoom = parseInt($scope.zoom * 100) + '%';
                        return $scope.zoom;
                    }
                };
                
                
                
                $scope.sendZoom(parseFloat(options[direction]()));
            };
            
            
            // I N I T S
            $scope.setView($scope.configView);
            $scope.setOrganize($scope.configOrganize);
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
                sendShow: '=getShow',
                sendZoom: '=getZoom'
            }
        };
    };
    angular
        .module('dgDiagramaBarraHerramientas', [])
        .directive('dgBarraHerramientas', Directive);
})();