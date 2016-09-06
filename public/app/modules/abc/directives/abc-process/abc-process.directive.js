/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/abc-process/abc-process.template.html',
            scope: {
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcProcess', [])
        .directive('abcProcess', Directive);
})();