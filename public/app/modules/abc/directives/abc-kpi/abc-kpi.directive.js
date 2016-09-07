/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/abc-kpi/abc-kpi.template.html',
            scope: {
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcKpi', [])
        .directive('abcKpi', Directive);
})();