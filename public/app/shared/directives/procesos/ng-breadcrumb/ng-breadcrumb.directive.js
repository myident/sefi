/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {
            
            $scope.$watch('zoom', function () {

            });
            
            $scope.imprimir = function(){
                $scope.print();
            };
            
            $scope.selected = 0;
            $scope.ver = 0;
            $scope.openBar = true;
            $scope.selectBoxVerHidden = true;
            $scope.selectBoxOrdenarHidden = true;
            
            
            $scope.muestraVer = function() {
                $scope.selectBoxVerHidden = false;
                $scope.selectBoxOrdenarHidden = true;
            };
            
            $scope.muestraOrdenar = function() {
                $scope.selectBoxVerHidden = true;
                $scope.selectBoxOrdenarHidden = false;
            };

            $scope.clickOption = function(value) {
                $scope.selected = value;
                $scope.send(value);
                $scope.selectBoxVerHidden = true;
                $scope.selectBoxOrdenarHidden = true;
            };
            
            $scope.clickVer = function(value) {
                if (value === 0) {
                    $scope.selected = 0;
                    $scope.send(value);
                }
                $scope.ver = value;
                $scope.sendVer(value);
                $scope.selectBoxVerHidden = true;
                $scope.selectBoxOrdenarHidden = true;
            };
            
            $scope.hideLeftBar = function() {
                $scope.openBar = !$scope.openBar;
                $scope.hideBar($scope.openBar);
            };

            $scope.mas = function() {
                $scope.zoomIn();
            };
            
            $scope.menos = function() {
                $scope.zoomOut();
            };
            
            $scope.restablecer = function () {
                $scope.zoomReset();
                $scope.zoom = '100%';
            };
            
        };
        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/procesos/ng-breadcrumb/ng-breadcrumb.template.html',
            link: Link,
            scope: {
                source: '=set',
                send: '=',
                sendVer: '=',
                hideBar: '=',
                zoom: '=',
                zoomIn: '=',
                zoomOut: '=',
                zoomReset: '=',
                print: '='
            }
        };
    };
    angular
        .module('mBreadcrumb', [])
        .directive('ngBreadcrumb', Directive);
})();