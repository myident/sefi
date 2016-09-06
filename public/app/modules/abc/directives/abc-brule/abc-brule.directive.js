/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/abc-brule/abc-brule.template.html',
            scope: {
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcBrule', [])
        .directive('abcBrule', Directive);
})();