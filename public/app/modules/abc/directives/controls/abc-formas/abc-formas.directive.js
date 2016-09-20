/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            // MARK: - Configuración inicial
            $scope.showOptions = false;
            $scope.rectan = true;
            
            console.log($scope.model);


            if ($scope.model) {
                $scope.modelSelected = true;
            } else {
                $scope.modelSelected = false;
                $scope.model = {
                    id: $scope.options[1].id,
                    name: $scope.options[1].name ? $scope.options[1].name : $scope.options[1].title
                };
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
                    name: $scope.options[index].name ? $scope.options[index].name : $scope.options[index].title,
                    shape: $scope.options[index].shape
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


            $scope.activateForma = function (index) {
                $scope.modelSelected = true;
                $scope.showOptions = false;
                $scope.model = {
                    id: $scope.options[index].id,
                    name: $scope.options[index].name,
                    shape: $scope.options[index].shape
                };
                // Ejecutamos el evento que deseemos cuando se elige una opción
                if ($scope.event) {
                    $scope.event($scope.model, index);
                } else {
                    console.log('WARNING: El evento de la directiva Select ' + $scope.label + ', no está definido');
                }

                if (index === 0) {
                    $scope.redon = true;
                    $scope.rombo = false;
                    $scope.romboTache = false;
                    $scope.rectan = false;
                    $scope.redondo = false;
                }
                if (index == 1) {
                    $scope.redon = false;
                    $scope.rombo = false;
                    $scope.romboTache = false;
                    $scope.rectan = true;
                    $scope.redondo = false;
                }
                if (index == 2) {
                    $scope.redon = false;
                    $scope.rombo = true;
                    $scope.romboTache = false;
                    $scope.rectan = false;
                    $scope.redondo = false;
                }
                if (index == 3) {
                    $scope.redon = false;
                    $scope.rombo = false;
                    $scope.rectan = false;
                    $scope.paralelo = false;
                    $scope.redondo = true;
                }
                if (index == 4) {
                    $scope.redon = false;
                    $scope.rombo = false;
                    $scope.paralelo = true;
                    $scope.rectan = false;
                    $scope.redondo = false;
                }
            };
        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-formas/abc-formas.template.html',
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
        .module('abcFormas', [])
        .directive('abcFormas', Directive);
})();