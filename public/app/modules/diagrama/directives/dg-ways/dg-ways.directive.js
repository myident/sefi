/* global angular, Snap, svgAsPngUri, jsPDF */
(function () {
    var Directive = function ($setting) {

        var Link = function ($scope, element, attr, ctrl) {
            
            var svgElement = document.getElementById('dgWaysSvg');
            $scope.svg = Snap(svgElement);
            $scope.zoom = 1;

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
                //     $setting.dimensions($scope.source,$scope.view);
                //     $setting.relationship($scope.source),$scope.view;

                $setting.dimensions($scope.source,$scope.view, $scope.organiceBy, $scope.show);
                console.log($scope.source);
                //     $build.processes(
                //             $scope.source,
                //             $scope.svg
                //         );
                //     $build.capabilities(
                //             $scope.source,
                //             $scope.svg,  
                //             $scope.view,
                //             $scope.organiceBy,
                //             $scope.show
                //         );
                // };
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
                macroprocessName: '=setMacroprocessName'
            }
        };
    };
    angular
        .module('dgDiagramaWays', [])
        .directive('dgWays', Directive);
})();