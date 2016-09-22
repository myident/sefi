/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {
            $scope.typeInput = $scope.typeInput || 'text';
            // Execute the event configured
            $scope.triggerEvent = function () {
                if ($scope.event){
                    $scope.event();
                } else {
                    console.log('WARNING: El evento de la directiva Textarea, no está definido');
                }
            };

        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-input/abc-input.template.html',
            scope: {
                title: '@',
                model: '=',
                label: '@',
                event: '=',
                warning: '=',
                typeInput:'@?'
            },
            link: Link
        };
    };
    angular
        .module('abcInput', [])
        .directive('abcInput', Directive);
})();