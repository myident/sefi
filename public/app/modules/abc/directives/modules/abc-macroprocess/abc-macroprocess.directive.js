/* global angular */
(function(){
    var Directive = function(){
        var Link = function($scope){
            $scope.megaprocesos = ['CRM', 'Custom Manager'];
            $scope.areas = ['IT', 'OCM', 'OSS', 'ROSE'];
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-macroprocess/abc-macroprocess.template.html',
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