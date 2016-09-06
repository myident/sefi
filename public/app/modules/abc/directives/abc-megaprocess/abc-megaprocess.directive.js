/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/abc-megaprocess/abc-megaprocess.template.html',
            scope: {
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcMegaprocess', [])
        .directive('abcMegaprocess', Directive);
})();