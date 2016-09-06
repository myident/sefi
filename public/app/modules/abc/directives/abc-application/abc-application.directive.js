/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/abc-application/abc-application.template.html',
            scope: {
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcApplication', [])
        .directive('abcApplication', Directive);
})();