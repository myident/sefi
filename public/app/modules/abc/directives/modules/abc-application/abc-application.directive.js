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
            $scope.edit = function () {
                if ($scope.canSave) {
                    $scope.eventUpdate($scope.id, $scope.name);
                }
            };

            $scope.delete = function () {
                    $scope.eventDelete($scope.id);
            };

            // Clear the data structure
            $scope.clear = function () {
                $scope.name = '';
                $scope.canSave = false;
            };
            
            // MARK: - Update
            if ($scope.source) {
                $scope.id = $scope.source.id;
                $scope.name = $scope.source.name;
                $scope.toggleActiveButton();
            }
            
            $scope.internalControl = $scope.control || {};
            $scope.internalControl.clear = function(){
                $scope.clear();  
            };
            
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-application/abc-application.template.html',
            scope: {
                title: '@',
                event: '=',
                source: '=',
                control: '=',
                update:'=',
                eventUpdate: '=',
                eventDelete: '='
            },
            link: Link
        };
    };
    angular
        .module('abcApplication', [])
        .directive('abcApplication', Directive);
})();