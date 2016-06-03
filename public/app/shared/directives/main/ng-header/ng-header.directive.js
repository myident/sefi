/* global angular */

(function () {
    var HeaderDirective = function () {
        var Link = function ($scope) {
            // MARK: - Settings
            $scope.elementHovering = 0;
            $scope.submenuHidden = true;
            $scope.overlayHidden = false;
            // MARK: - Muestra el submenu relacionado a un elemento [index], además muestra un overlay
            // Si el submenu no tiene elementos, entonces no se muestra
            $scope.showsubmenu = function (index) {
                $scope.elementHovering = index;
                $scope.overlayHidden = false;
                for (var i = 0; i < $scope.menu.length; i++) {
                    $scope.menu[i].active = false;
                }
                if ($scope.menu[$scope.elementHovering].subElements.length > 0) {
                    $scope.submenuHidden = false;
                } else {
                    $scope.submenuHidden = true;
                }
                $scope.menu[$scope.elementHovering].active = true;
            };
            // MARK: - Esconde el submenu y el overlay
            $scope.hidesubmenu = function () {
                $scope.menu[$scope.elementHovering].active = false;
                $scope.submenuHidden = true;
                $scope.overlayHidden = true;
            };
            // MARK: - activa un elemento del submenu
            $scope.activateElement = function (index) {
                $scope.menu[$scope.elementHovering].subElements[index].active = true;
                $scope.menu[$scope.elementHovering].active = true;
            };
            // MARK: - desactiva los elementos del submenu
            $scope.deactivateElement = function () {
                for (var i = 0; i < $scope.menu[$scope.elementHovering].subElements.length; i++) {
                    $scope.menu[$scope.elementHovering].subElements[i].active = false;
                }
            };

            $scope.menu = $scope.setElementosMenu;
        };
        return {
            restrict: 'E',
            templateUrl: 'app/shared/directives/main/ng-header/ng-header.template.html',
            link: Link,
            scope: {
                setElementosMenu: '='
            }
        };
    };
    angular
        .module('mHeaderDirective', [])
        .directive('ngHeader', HeaderDirective);
})();