/* global angular */
(function () {
    var Directive = function ($rootScope) {

        var Link = function ($scope) {
            
            $scope.closeAlert = function(){
                $rootScope.showAlert = false;
                $scope.content.event();
            };
            
        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-alert/abc-alert.template.html',
            scope: {
                content: '='
            },
            link: Link
        };
    };
    angular
        .module('abcAlert', [])
        .directive('abcAlert', Directive);
})();