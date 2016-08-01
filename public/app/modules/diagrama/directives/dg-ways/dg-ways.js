/* global angular, Snap, svgAsPngUri, jsPDF */
(function () {
    var Directive = function ($validation, $zoom) {

        var Link = function ($scope, element, attr, ctrl) {
            
            $scope.svg = Snap(element[0]);
            $vash.zoom = 1;

            $scope.init = function(){
                $scope.$watch('source', function () {
                    $scope.reset();
                });
                $scope.$watch('view', function () {
                    $scope.reset();
                });
                $scope.$watch('organiceBy', function () {
                    $scope.reset();
                });
                $scope.$watch('show', function () {
                    $scope.reset();
                });
                $scope.$watch('layout', function () {
                    $scope.reset();
                });
                $scope.$watch('zoom', function () {
                    $zoom.change($scope.layout);
                });
            };
            

            $scope.reset = function(){
                $scope.svg.clear();
                $vash.zoom = 1;
                var isValid = $validation.validate($scope.source,function(e){
                    console.log(e);
                });

                isValid && function(){
                    $setting.dimensions($scope.source,$scope.view);
                    $setting.relationship($scope.source),$scope.view;
                    $setting.offsets($scope.source,$scope.view);

                    $build.processes(
                            $scope.source,
                            $scope.svg
                        );
                    $build.capabilities(
                            $scope.source,
                            $scope.svg,  
                            $scope.view,
                            $scope.organiceBy,
                            $scope.show
                        );
                };
            };

            $scope.init();
        };
        return {
            restrict    : 'A',
            link        : Link,
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
        .module('dgWays', [])
        .directive('dgWays', Directive);
})();