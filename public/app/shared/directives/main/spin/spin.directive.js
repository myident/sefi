/*global angular*/
/*jslint browser:true*/
(function () {
    var directive = function () {
        var link = function (scope) {

        };

        return {
            restrict: 'E',
            link: link,
            templateUrl: 'app/shared/directives/main/spin/spin.template.html',
        };
    };
    angular.module('Spin', []).directive('spin', directive);

})();