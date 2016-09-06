/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/abc-text-area/abc-textarea.template.html',
            scope: {
                title: '@',
                model: '=',
                label: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcTextarea', [])
        .directive('abcTextarea', Directive);
})();