/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {


            $scope.showOptions = false;
            if ($scope.model){
                $scope.modelSelected = true;
            } else {
               $scope.modelSelected = false;
            }
            
            

            // Execute the event configured
            $scope.triggerEvent = function (index) {
                if ($scope.event) {
                    $scope.event($scope.model, index);
                } else {
                    console.log('WARNING: El evento de la directiva Select ' + $scope.label + ', no está definido');
                }
            };

            $scope.toggleShowOptions = function () {

                if ($scope.options) {
                    $scope.showOptions = !$scope.showOptions;
                } else {
                    console.log('WARNING: Las opciones de la directiva Select ' + $scope.label + ', no están definidas');
                }
                
            };

            $scope.selectOption = function (index) {
                $scope.modelSelected = true;
                $scope.showOptions = false;
                $scope.model = {
                    id: $scope.options[index].id,
                    name: $scope.options[index].name ? $scope.options[index].name : $scope.options[index].title
                };
                if ($scope.isArea){
                    $scope.model = {
                        id: $scope.options[index].area_id,
                        name: $scope.options[index].area_desc
                    };
                }
                $scope.triggerEvent(index);
            };
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