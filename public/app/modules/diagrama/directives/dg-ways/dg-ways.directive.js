/* global angular, Snap, svgAsPngUri, jsPDF */
(function () {
    var Directive = function ($setting, $builder) {

        var Link = function ($scope, element, attr, ctrl) {
            
            var svgElement = document.getElementById('dgWaysSvg');
            $scope.svg = Snap(svgElement);
            $scope.zoom = 1;
            $scope.width = 0;
            $scope.height = 0;

            $scope.init = function(){
                // $scope.$watch('source', function () {
                //     $scope.reset();
                // });
                // $scope.$watch('view', function () {
                //     $scope.reset();
                // });
                // $scope.$watch('organiceBy', function () {
                //     $scope.reset();
                // });
                // $scope.$watch('show', function () {
                //     $scope.reset();
                // });
                // $scope.$watch('layout', function () {
                //     $scope.reset();
                // });
                $scope.$watchGroup(['source','view','organiceBy','show','layout'], function () {
                    $scope.reset();
                });
                $scope.$watch('zoom', function () {
                    // $zoom.change($scope.layout);
                });
            };
            

            $scope.reset = function(){
                console.log(".reset()");

                $scope.svg.clear();
                $scope.zoom = 1;
                // var isValid = $validation.validate($scope.source,function(e){
                //     console.log(e);
                // });

                // isValid && function(){
                var sourceTemp = JSON.parse(JSON.stringify($scope.source));
                $setting.dimensions(sourceTemp,$scope.view, $scope.organiceBy, $scope.show);
                $builder.build($scope.svg, sourceTemp, $scope.show);

                $scope.settingSvg(sourceTemp);
                ($scope.organiceBy === 1) && $setting.dimensionsAreas($scope.areasList);
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

                $scope.w = ($scope.organiceBy === 1) ? (220*$scope.areasList.length):maxWidth;
                $scope.h = (maxHeight+ marginBottom + marginTop );
                $scope.width    = $scope.w + "px";
                $scope.height   = $scope.h + "px";
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