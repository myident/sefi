/* global angular, svgAsPngUri */
(function () {
    var Directive = function ($word, $barraHerramientas, $window) {

        var Link = function ($scope) {
            $scope.showDownloadMenu = false;

            $scope.$watch(
                function () {
                    return $barraHerramientas.zoom;
                },
                function (newVal) {
                    if (typeof newVal !== 'undefined') {
                        $scope.zoom = newVal;
                        $scope.displayZoom = parseInt($scope.zoom * 100) + '%';
                    }
                });
            
            $scope.$watch(
                function () {
                    return $barraHerramientas.showBar;
                },
                function (newVal) {
                    $scope.showBar = newVal;
                });
            
            $scope.$watch(
                function () {
                    return $barraHerramientas.view;
                },
                function () {
                    $scope.sendView($barraHerramientas.view);
                    $scope.setView($barraHerramientas.view);
                });


            $scope.levelOne = true;

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
                $barraHerramientas.zoom = 1;
                $scope.zoom = $barraHerramientas.zoom;
                $scope.displayZoom = parseInt($scope.zoom * 100) + '%';
                if (value === 0) {
                    $scope.levelOne = true;
                    $scope.sendOrganize(0);
                    $scope.sendShow(0);
                    $scope.organize.active = false;
                    $scope.organize.disabled = false;
                    $scope.show[0].disabled = false;
                    $scope.show[1].disabled = false;
                    $scope.show[2].disabled = false;
                } else if (value == 2) {
                    $scope.levelOne = false;
                    $scope.sendOrganize(1);
                    $scope.sendShow(2);
                    $scope.organize.active = true;
                    $scope.organize.disabled = true;
                    $scope.show[0].disabled = true;
                    $scope.show[1].disabled = true;
                    $scope.show[2].disabled = true;
                    $scope.show[0].active = false;
                    $scope.show[1].active = true;
                    $scope.show[2].active = false;
                } else {
                    $scope.levelOne = false;
                    $scope.sendOrganize(0);
                    $scope.organize.active = false;
                    $scope.organize.disabled = false;
                    $scope.show[0].disabled = false;
                    $scope.show[1].disabled = false;
                    $scope.show[2].disabled = false;
                    $scope.show[0].active = false;
                    $scope.show[1].active = false;
                    $scope.show[2].active = false;
                    $scope.sendShow(0);
                }
            };
            $scope.getView = function () {
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
            $scope.setOrganize = function (value) {

                if (value === 0) {
                    $scope.organize.active = false;
                } else {
                    $scope.organize.active = true;
                }

            };
            $scope.toggleOrganize = function () {
                var value = 0;
                if (!$scope.organize.disabled) {
                    $scope.organize.active = !$scope.organize.active;
                    if ($scope.organize.active) {
                        value = 1;
                        if ($scope.configShow == 1) {
                            $scope.setShow(0);
                        }
                    }
                    if (value == 1) {
                        $scope.show[0].disabled = true;
                    } else {
                        $scope.show[0].disabled = false;
                    }
                    $scope.configOrganize = value;
                    $scope.sendOrganize(value);
                }
            };
            $scope.getOrganize = function () {
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
            $scope.toggleShow = function (value) {

                var realValue = value + 1;
                var oldValue = 0;
                if (!$scope.show[value].disabled) {
                    if ($scope.configOrganize == 1 && realValue == 1) {

                    } else {

                        for (var i = 0; i < $scope.show.length; i++) {

                            if ($scope.show[i].active) {
                                oldValue = i + 1;
                            }

                        }
                        if (oldValue == realValue) {
                            $scope.setShow(0);
                        } else {
                            $scope.setShow(realValue);
                        }
                    }
                }

            };
            $scope.setShow = function (value) {
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

            $scope.zoom = $barraHerramientas.zoom;
            $scope.displayZoom = parseInt($scope.zoom * 100) + '%';

            $scope.changeZoom = function (direction) {
                var options = {
                    menos: function () {
                        if ($scope.zoom >= 0.5) {
                            $scope.zoom -= 0.02;
                            $scope.displayZoom = parseInt($scope.zoom * 100) + '%';
                            $barraHerramientas.zoom = $scope.zoom;
                        }
                        return Math.round($scope.zoom * 100);
                    },
                    mas: function () {
                        if ($scope.zoom <= 2) {
                            $scope.zoom += 0.02;
                            $scope.displayZoom = parseInt($scope.zoom * 100) + '%';
                            $barraHerramientas.zoom = $scope.zoom;
                        }
                        return Math.round($scope.zoom * 100);
                    },
                    default: function () {
                        $scope.zoom = 1;
                        $scope.displayZoom = parseInt($scope.zoom * 100) + '%';
                        $barraHerramientas.zoom = $scope.zoom;
                        return Math.round($scope.zoom * 100);
                    }
                };
                options[direction]();
            };


            // MARK: - print
            
            // Download docukmento con diagrama dentro PDF
            $scope.downloadDocumentWithDiagram = function () {

                var svgElement = $window.document.getElementById('dgWaysSvg'),
                    ancho = $barraHerramientas.svgSize.width / 2.25,
                    alto = $barraHerramientas.svgSize.height / 2.25,
                    diagrama = {};

                svgAsPngUri(svgElement, {
                    scale: 1.5
                }, function (uri) {
                    diagrama.ancho = ancho;
                    diagrama.alto = alto;
                    diagrama.contenido = uri;
                    $word.$make(diagrama);
                });

            };

            // Download diagrama y abre documento PDF
            $scope.downloadDiagramOpenDocument = function () {
                var ancho = $barraHerramientas.svgSize.width / 2.25,
                    alto = $barraHerramientas.svgSize.height / 2.25;
                $word.$noDiagram();
                $word.$appart(ancho, alto, $window.document.getElementById('dgWaysSvg'));
            };
            
            // Download diagrama PDF
            $scope.downloadDiagram = function () {
                $scope.showDownloadMenu = false;
                $word.$diagramMake($window.document.getElementById('dgWaysSvg'));
            };
            
        
            // Download documento PDF
            $scope.downloadDocument = function () {
                $word.$documentMake();
                $scope.showDownloadMenu = false;
            };
            
            // Exporta diagrama PNG
            $scope.exportDiagram = function(){
                $scope.showDownloadMenu = false;
                $word.$exportDiagram($window.document.getElementById('dgWaysSvg'));
            };
            
            // Download diagrama en piezas
            $scope.downloadDiagramPieces = function(){
                $scope.showDownloadMenu = false;
                
                var ancho = $barraHerramientas.svgSize.width / 7,
                    alto = $barraHerramientas.svgSize.height / 7;
                                
                $word.$appart(ancho, alto, $window.document.getElementById('dgWaysSvg'));
            };
            
            // I N I T S
            $scope.setView($barraHerramientas.view);
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
                hideToggle: '=hideToggle'
            }
        };
    };
    angular
        .module('dgDiagramaBarraHerramientas', [])
        .directive('dgBarraHerramientas', Directive);
})();