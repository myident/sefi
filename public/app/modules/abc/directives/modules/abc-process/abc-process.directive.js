/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            $scope.canSave = false;

            // Data structure
            $scope.name = '';

            if ($scope.source) {
                $scope.name = $scope.source.name;
            }

            // Active the save button
            $scope.toggleActiveButton = function () {
                if ($scope.name !== undefined && $scope.name !== '') {
                    $scope.canSave = true;
                } else {
                    $scope.canSave = false;
                }
            };

            // Save the object Domain
            $scope.save = function () {
                if ($scope.canSave) {
                    $scope.event($scope.name);
                }
            };

            // Clear the data structure
            $scope.clear = function () {
                $scope.name = '';
                $scope.canSave = false;
            };
        };

        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-process/abc-process.template.html',
            scope: {
                title: '@',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcProcess', [])
        .directive('abcProcess', Directive);
})();