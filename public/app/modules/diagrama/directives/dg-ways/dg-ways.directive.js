/* global angular, Snap, svgAsPngUri, jsPDF */
(function () {
    var Directive = function ($setting, $builder) {

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

            $scope.init = function(){
                $scope.$watchGroup(['source','view','organiceBy','show','layout'], function () {
                    $scope.reset();
                });
                $scope.$watch('zoom', function () {
                    // $zoom.change($scope.layout);
                    changeViewBox($scope.zoom);
                });
            };
            
            function changeViewBox(value) {
                $scope.widthCanvas = ($scope.svgWidth * value) + 'px';
                $scope.heightCanvas = ($scope.svgHeight * value) + 'px';
            }

            $scope.reset = function(){
                console.log(".reset()");

                $scope.svg.clear();
                $scope.zoom = 1;

                $scope.sourceTemp = JSON.parse(JSON.stringify($scope.source));
                ($scope.organiceBy === 1) && $setting.dimensionsAreas($scope.areasList);
                $setting.dimensions($scope.sourceTemp,$scope.areasList, $scope.view, $scope.organiceBy, $scope.show);
                $builder.build($scope.svg, $scope.sourceTemp, $scope.show);

                $scope.settingSvg($scope.sourceTemp);
                ($scope.organiceBy === 1) && $builder.buildAreas($scope.svg, $scope.areasList, $scope.h);
                
                // };
            };

            $scope.settingSvg = function(source){
                var maxHeight = 0;
                var maxWidth = 0;
                var marginBottom = 20;
                var marginTop = 40;

                for(var i in source.procesos){
                    var height = source.procesos[i].html.rect.height;
                    var width = source.procesos[i].html.rect.width;

                    if(height > maxHeight){
                        maxHeight = height;
                    }
                    maxWidth += width + 30;
                }

                var lengthProcess = $scope.sourceTemp.procesos.length - 1;
                var lengthCapability = $scope.sourceTemp.procesos[lengthProcess].capacidades.length - 1;
                var lastY = $scope.sourceTemp.procesos[lengthProcess].capacidades[lengthCapability].html.rect.offset.y;

                console.log(lastY);
                $scope.w = ($scope.organiceBy === 1) ? (220*$scope.areasList.length) : maxWidth;
                $scope.h = ($scope.organiceBy === 1) ? lastY + 150 : maxWidth;;
                $scope.width    = $scope.w + "px";
                $scope.height   = $scope.h + "px";
                
                $scope.svgWidth = $scope.w;
                $scope.svgHeight = $scope.h;
                $scope.svg.attr({
                    viewBox: "0 0 " + ($scope.svgWidth) + " " + ($scope.svgHeight)
                });
                changeViewBox($scope.zoom);
            };

            $scope.init();
        };
        return {
            restrict    : 'E',
            link        : Link,
            templateUrl: 'app/modules/diagrama/directives/dg-ways/dg-ways.template.html',
            require     : '?ngModel',
            scope       : {
                source          : '=setSource',
                view            : '=setView',
                organiceBy      : '=setOrganiceBy',
                show            : '=setShow',
                zoom            : '=setZoom',
                print           : '=setPrint',
                macroprocessName: '=setMacroprocessName',
                areasList: '=setAreasList'
            }
        };
    };
    angular
        .module('dgDiagramaWays', [])
        .directive('dgWays', Directive);
})();