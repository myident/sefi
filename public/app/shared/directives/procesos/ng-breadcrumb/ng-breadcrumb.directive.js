/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {
            
            $scope.$watch('zoom', function () {

            });
            
            $scope.imprimir = function(value){
                $scope.print(value);
            };
            
            $scope.selected = 0;
            $scope.ver = 0;
            $scope.openBar = true;
            $scope.selectBoxVerHidden = true;
            $scope.selectBoxOrdenarHidden = true;
            $scope.selectBoxDescargaHidden = true;
            
            $scope.muestraDescarga = function() {
                $scope.selectBoxDescargaHidden = !$scope.selectBoxDescargaHidden;
                $scope.selectBoxOrdenarHidden = true;
                $scope.selectBoxVerHidden = true;
            };
            
            $scope.muestraVer = function() {
                $scope.selectBoxVerHidden = !$scope.selectBoxVerHidden;
                $scope.selectBoxOrdenarHidden = true;
                $scope.selectBoxDescargaHidden = true;
            };
            
            $scope.muestraOrdenar = function() {
                $scope.selectBoxVerHidden = true;
                $scope.selectBoxOrdenarHidden = !$scope.selectBoxOrdenarHidden;
                $scope.selectBoxDescargaHidden = true;
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