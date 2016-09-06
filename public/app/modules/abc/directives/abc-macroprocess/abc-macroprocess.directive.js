/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/abc-macroprocess/abc-macroprocess.template.html',
            scope: {
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcMacroprocess', [])
        .directive('abcMacroprocess', Directive);
})();