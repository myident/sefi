/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {
            console.log($scope.model)

            // MARK: - Configuración inicial
            $scope.showOptions = false;
            if ($scope.model) {
                $scope.modelSelected = true;
                
            } else {
                $scope.modelSelected = false;
            }

            // MARK: - Muestra las posibles opciones del SELECT
            $scope.toggleShowOptions = function () {
                if ($scope.options) {
                    $scope.showOptions = !$scope.showOptions;
                } else {
                    console.log('WARNING: Las opciones de la directiva Select ' + $scope.label + ', no están definidas');
                }
            };

            // MARK: - Se ejecuta cuando elegimos una opción
            $scope.selectOption = function (index) {
                $scope.modelSelected = true;
                $scope.showOptions = false;
                $scope.model = {
                    id: $scope.options[index].id,
                    name: $scope.options[index].name ? $scope.options[index].name : $scope.options[index].title
                };
                if ($scope.isArea) {
                    $scope.model = {
                        id: $scope.options[index].area_id,
                        name: $scope.options[index].area_desc
                    };
                }
                // Ejecutamos el evento que deseemos cuando se elige una opción
                if ($scope.event) {
                    $scope.event($scope.model, index);
                } else {
                    console.log('WARNING: El evento de la directiva Select ' + $scope.label + ', no está definido');
                }


            };

            $scope.$watch('model', function (newVal) {
                if (newVal) {
                    if (newVal.name === undefined) {
                        $scope.modelSelected = false;
                        $scope.showOptions = false;
                    }
                }

            });
        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-special-select/abc-special-select.template.html',
            scope: {
                holder: '@',
                model: '=',
                label: '@',
                options: '=',
                event: '=',
                isArea: '='
            },
            link: Link
        };
    };
    angular
        .module('abcSpecialSelect', [])
        .directive('abcSpecialSelect', Directive);
})();