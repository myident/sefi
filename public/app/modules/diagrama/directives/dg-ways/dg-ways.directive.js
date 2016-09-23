/* global angular, Snap */
(function () {
    var Directive = function ($setting, $builder, $barraHerramientas, $timeout, $window) {

        var Link = function ($scope, element) {

            var svgElement = $window.document.getElementById('dgWaysSvg');
            $scope.svg = Snap(svgElement);
            $scope.widthCanvas = 0;
            $scope.heightCanvas = 0;

            $scope.valid = function () {
                var success = true,
                    count = 0,
                    errorStr = '',
                    errorArr = [],
                    data = [],
                    proceso = {},
                    capacidad = {};
                $scope.svg.clear();

                switch ($scope.view) {
                case 0:
                    if ($scope.source && $scope.source.procesos && $scope.source.procesos.length) {

                    } else {
                        success = false;
                    }
                    break;
                case 1:
                    if ($scope.source && $scope.source.procesos && $scope.source.procesos.length) {

                        errorArr = [];
                        data = $scope.source.procesos;
                        for (var i in data) {
                            proceso = data[i];
                            if (proceso.capacidades.length) {
                                for (var j in proceso.capacidades) {
                                    capacidad = proceso.capacidades[j];

                                    if ($scope.organiceBy === 1) {
                                        if (!capacidad.sortAreas.areas.length) {
                                            errorStr = 'WARN ' + count + ' -> (' + proceso.name + ' > ' + capacidad.name + ') - Falta información de base de datos: [capacidades] Faltan areas';
                                            console.warn(errorStr);
                                            errorArr.push(errorStr);
                                            success = false;
                                            count++;
                                        } else {

                                        }
                                    }
                                }
                            } else {
                                errorStr = 'WARN ' + count + ' -> (PROCESO<' + proceso.name + '>) Falta información de base de datos: Faltan capacidades';
                                console.warn(errorStr);
                                errorArr.push(errorStr);
                                success = false;
                                count++;
                            }
                        }

                    }

                    break;
                case 2:
                    if ($scope.source && $scope.source.procesos && $scope.source.procesos.length) {

                        errorArr = [];
                        data = $scope.source.procesos;
                        for (var k in data) {
                            proceso = data[k];
                            if (proceso.reglas.length) {
                                for (var l in proceso.reglas) {
                                    capacidad = proceso.reglas[l];
                                    if (!capacidad.sortAreas.areas.length) {
                                        errorStr = 'WARN ' + count + ' -> (' + proceso.name + ' > ' + capacidad.name + ') - Falta información de base de datos: [reglas] Faltan areas';
                                        console.warn(errorStr);
                                        errorArr.push(errorStr);
                                        success = false;
                                        count++;
                                    } else {

                                    }
                                }
                            } else {
                                errorStr = 'WARN ' + count + ' -> (PROCESO<' + proceso.name + '>) Falta información de base de datos: Faltan reglas';
                                console.warn(errorStr);
                                errorArr.push(errorStr);
                                success = false;
                                count++;
                            }
                        }

                    }

                    break;
                }
                return success;
            };

            $scope.init = function () {

                $scope.$watch('hideToggle', function () {
                    $timeout(function () {
                        $scope.valid() && $scope.reset();
                    }, 300);

                });

                $scope.$watchGroup(['source', 'view', 'organiceBy', 'show', 'layout'], function () {
                    $scope.valid() && $scope.reset();

                });

                $scope.$watch(
                    function () {
                        return $barraHerramientas.zoom;
                    },
                    function (newVal) {
                        if (typeof newVal !== 'undefined') {
                            $scope.changeViewBox($barraHerramientas.zoom);
                        }
                    });
            };

            $scope.reset = function () {

                $scope.sourceTemp = JSON.parse(JSON.stringify($scope.source));
                ($scope.organiceBy === 1) && $setting.dimensionsAreas($scope.areasList, $scope.hideToggle);
                $setting.dimensions($scope.sourceTemp, $scope.areasList, $scope.view, $scope.organiceBy, $scope.show);
                $builder.build($scope.svg, $scope.sourceTemp, $scope.show, $scope.view);

                $scope.settingSvg($scope.sourceTemp);
                ($scope.organiceBy === 1) && $builder.buildAreas($scope.svg, $scope.areasList, $scope.h);

                $scope.fit(element[0].offsetWidth, $scope.w);
            };

            $scope.settingSvg = function (source) {
                var maxHeight = 0;
                var maxWidth = 0;
                for (var i in source.procesos) {
                    var height = source.procesos[i].html.rect.height;
                    var width = source.procesos[i].html.rect.width;

                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                    maxWidth += width + 22;
                }

                var lengthProcess = $scope.sourceTemp.procesos.length - 1;
                var lengthCapability = 0;
                var lastY = 0;
                switch ($scope.view) {
                case 0:
                    break;
                case 1:
                    lengthCapability = $scope.sourceTemp.procesos[lengthProcess].capacidades.length - 1;
                    lastY = $scope.sourceTemp.procesos[lengthProcess].capacidades[lengthCapability].html.rect.offset.y;
                    break;
                case 2:
                    lengthCapability = $scope.sourceTemp.procesos[lengthProcess].reglas.length - 1;
                    lastY = $scope.sourceTemp.procesos[lengthProcess].reglas[lengthCapability].html.rect.offset.y + 200;
                    break;
                }
                // var lengthCapability = ($scope.view !== 0) ? $scope.sourceTemp.procesos[lengthProcess].capacidades.length - 1 : 0;
                // var lastY = ($scope.view !== 0) ? $scope.sourceTemp.procesos[lengthProcess].capacidades[lengthCapability].html.rect.offset.y : 50;

                $scope.w = ($scope.organiceBy === 1) ? $setting.getSVGWidth($scope.areasList, $scope.hideToggle) : maxWidth;

                $scope.h = ($scope.organiceBy === 1) ? lastY + 150 : maxHeight + 100;

                $scope.h = ($scope.view === 0) ? 150 : $scope.h;


                $barraHerramientas.svgSize.width = $scope.w;
                $barraHerramientas.svgSize.height = $scope.h;

                $scope.svg.attr({
                    viewBox: "0 0 " + ($scope.w) + " " + ($scope.h)
                });
            };

            // Función que escala el svg
            $scope.changeViewBox = function (value) {
                // Estos valores se envían directamente a la vista
                $scope.widthCanvas = ($scope.w * value) + 'px';
                $scope.heightCanvas = ($scope.h * value) + 'px';
            };

            // Función para autocalcular el zoom
            $scope.fit = function (totalSize, elementSize) {
                $scope.zoom = (totalSize / elementSize);
                $barraHerramientas.zoom = (totalSize / elementSize);
                $scope.changeViewBox($scope.zoom);
            };

            $scope.init();
        };
        return {
            restrict: 'E',
            link: Link,
            templateUrl: 'app/modules/diagrama/directives/dg-ways/dg-ways.template.html',
            require: '?ngModel',
            scope: {
                source: '=setSource',
                view: '=setView',
                organiceBy: '=setOrganiceBy',
                show: '=setShow',
                zoom: '=setZoom',
                macroprocessName: '=setMacroprocessName',
                areasList: '=setAreasList',
                print: '=',
                hideToggle: "=setHideToggle"
            }
        };
    };
    angular
        .module('dgDiagramaWays', [])
        .directive('dgWays', Directive);
})();