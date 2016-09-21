/* global angular */
(function () {
    var Directive = function () {
        
        var Link = function ($scope) {
            $scope.maxLength = $scope.maxLength || 1000;
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
            templateUrl: 'app/modules/abc/directives/controls/abc-text-area/abc-textarea.template.html',
            scope: {
                title: '@',
                model: '=',
                label: '@',
                event: '=',
                maxLength:"=?"
            },
            link: Link
        };
    };
    angular
        .module('abcTextarea', [])
        .directive('abcTextarea', Directive);
})();