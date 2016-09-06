/* global angular */
(function(){
    var Directive = function(){
        var Link = function(){
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/abc-capability/abc-capability.template.html',
            scope: {
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcCapability', [])
        .directive('abcCapability', Directive);
})();