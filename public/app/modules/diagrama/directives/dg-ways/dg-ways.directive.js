/* global angular, Snap, svgAsPngUri, jsPDF */
(function () {
    var Directive = function ($setting, $builder, $barraHerramientas) {

        var Link = function ($scope, element, attr, ctrl) {

            var svgElement = document.getElementById('dgWaysSvg');
            $scope.svg = Snap(svgElement);
            $scope.zoom = 1;
            $scope.width = 0;
            $scope.height = 0;
            $scope.svgWidth = 0;
            $scope.svgHeight = 0;
            $scope.widthCanvas = 0;
            $scope.heightCanvas = 0;

            $scope.init = function () {
                $scope.$watchGroup(['source', 'view', 'organiceBy', 'show', 'layout'], function () {
                    console.log($scope.source.procesos);
                    $scope.source.procesos.length && $scope.reset();
                });

                $scope.$watch(
                    function () {
                        return $barraHerramientas.zoom;
                    },
                    function (newVal) {
                        if (typeof newVal !== 'undefined') {
                            changeViewBox($barraHerramientas.zoom);
                        }
                    });
            };

            function changeViewBox(value) {
                $scope.widthCanvas = ($scope.svgWidth * value) + 'px';
                $scope.heightCanvas = ($scope.svgHeight * value) + 'px';
            }

            $scope.reset = function () {

                $scope.svg.clear();
                $scope.zoom = 1;

                $scope.sourceTemp = JSON.parse(JSON.stringify($scope.source));
                console.log($scope.sourceTemp);
                ($scope.organiceBy === 1) && $setting.dimensionsAreas($scope.areasList);
                $setting.dimensions($scope.sourceTemp, $scope.areasList, $scope.view, $scope.organiceBy, $scope.show);
                $builder.build($scope.svg, $scope.sourceTemp, $scope.show, $scope.view);

                $scope.settingSvg($scope.sourceTemp);
                ($scope.organiceBy === 1) && $builder.buildAreas($scope.svg, $scope.areasList, $scope.h);
            };

            $scope.settingSvg = function (source) {
                var maxHeight = 0;
                var maxWidth = 0;
                var marginBottom = 20;
                var marginTop = 40;


                for (var i in source.procesos) {
                    var height = source.procesos[i].html.rect.height;
                    var width = source.procesos[i].html.rect.width;

                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                    maxWidth += width + 30;
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
                    lastY = $scope.sourceTemp.procesos[lengthProcess].reglas[lengthCapability].html.rect.offset.y + 70;
                    break;
                }
                // var lengthCapability = ($scope.view !== 0) ? $scope.sourceTemp.procesos[lengthProcess].capacidades.length - 1 : 0;
                // var lastY = ($scope.view !== 0) ? $scope.sourceTemp.procesos[lengthProcess].capacidades[lengthCapability].html.rect.offset.y : 50;

                $scope.w = ($scope.organiceBy === 1) ? (220 * $scope.areasList.length) : maxWidth;
                $scope.h = ($scope.organiceBy === 1) ? lastY + 150 : maxHeight + 100;

                $scope.h = ($scope.view === 0) ? 150 : $scope.h;
                $scope.width = $scope.w + "px";
                $scope.height = $scope.h + "px";

                $scope.svgWidth = $scope.w;
                $barraHerramientas.svgSize.width = $scope.w;
                $scope.svgHeight = $scope.h;
                $barraHerramientas.svgSize.height = $scope.h;
                $scope.svg.attr({
                    viewBox: "0 0 " + ($scope.svgWidth) + " " + ($scope.svgHeight)
                });
                changeViewBox($scope.zoom);
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
                print: '='
            }
        };
    };
    angular
        .module('dgDiagramaWays', [])
        .directive('dgWays', Directive);
})();