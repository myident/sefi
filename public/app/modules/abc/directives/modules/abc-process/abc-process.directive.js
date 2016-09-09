/* global angular */
(function () {
    var Directive = function () {

        var Link = function ($scope) {

            $scope.canSave = false;

            // Data structure
            $scope.name = '';

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
                    console.log($scope.name);
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
                title: '@'
            },
            link: Link
        };
    };
    angular
        .module('abcProcess', [])
        .directive('abcProcess', Directive);
})();