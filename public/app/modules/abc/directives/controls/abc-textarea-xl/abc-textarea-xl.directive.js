/* global angular */
(function () {
    var Directive = function () {
        
        var Link = function ($scope) {
            $scope.maxLength = $scope.maxLength || 2000;
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
            templateUrl: 'app/modules/abc/directives/controls/abc-textarea-xl/abc-textarea-xl.template.html',
            scope: {
                title: '@',
                model: '=',
                label: '@',
                event: '=',
                maxLength: '=?'
            },
            link: Link
        };
    };
    angular
        .module('abcTextareaXl', [])
        .directive('abcTextareaXl', Directive);
})();