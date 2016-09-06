/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/abc-input/abc-input.template.html',
            scope: {
                title: '@',
                model: '=',
                label: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcInput', [])
        .directive('abcInput', Directive);
})();