/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            $scope.$watch('model', function (newVal) {

            });
        };

        return {
            restrict: 'E',
            templateUrl: 'app/modules/abc/directives/controls/abc-nice-label/abc-nice-label.template.html',
            scope: {
                model: '=',
                label: '@',
            },
            link: Link
        };
    };
    angular
        .module('abcNiceLabel', [])
        .directive('abcNiceLabel', Directive);
})();