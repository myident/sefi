/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

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
            templateUrl: 'app/modules/abc/directives/abc-input/abc-input.template.html',
            scope: {
                title: '@',
                model: '=',
                label: '@',
                event: '=',
                warning: '='
            },
            link: Link
        };
    };
    angular
        .module('abcInput', [])
        .directive('abcInput', Directive);
})();