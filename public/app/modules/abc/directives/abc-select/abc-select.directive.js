/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/abc-select/abc-select.template.html',
            scope: {
                title: '@',
                model: '=',
                label: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcSelect', [])
        .directive('abcSelect', Directive);
})();