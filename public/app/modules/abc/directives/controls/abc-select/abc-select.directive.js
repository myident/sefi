/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            $scope.showOptions = false;
            
            $scope.modelSelected = false;

            // Execute the event configured
            $scope.triggerEvent = function () {
                if ($scope.event) {
                    $scope.event($scope.model);
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
                $scope.model = $scope.options[index].id;
                $scope.holder = $scope.options[index].name ? $scope.options[index].name : $scope.options[index].title;
                if ($scope.isArea){
                    $scope.model = $scope.options[index].area_id;
                    $scope.holder = $scope.options[index].area_desc;
                }
                $scope.triggerEvent();
            };
        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-select/abc-select.template.html',
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
        .module('abcSelect', [])
        .directive('abcSelect', Directive);
})();