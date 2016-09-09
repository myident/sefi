/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-area/abc-area.template.html',
            scope: {
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcArea', [])
        .directive('abcArea', Directive);
})();