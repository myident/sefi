/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            $scope.canSave = false;
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
                    $scope.event($scope.name);
                }
            };

            // Clear the data structure
            $scope.clear = function () {
                $scope.name = '';
                $scope.canSave = false;
            };
            
            // MARK: - Update
            if ($scope.source) {
                $scope.name = $scope.source.name;
                $scope.toggleActiveButton();
            }
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-application/abc-application.template.html',
            scope: {
                title: '@',
                event: '=',
                source: '='
            },
            link: Link
        };
    };
    angular
        .module('abcApplication', [])
        .directive('abcApplication', Directive);
})();