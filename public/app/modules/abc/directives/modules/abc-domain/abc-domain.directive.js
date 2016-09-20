/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            // MARK: - Create
            $scope.canSave = false;
            $scope.name      = '';
            $scope.shortname = '';

            // Active the save button
            $scope.toggleActiveButton = function () {
                if ($scope.name !== undefined && $scope.name !== '') {
                    if ($scope.shortname !== undefined && $scope.shortname !== '') {
                        $scope.canSave = true;
                    } else {
                        $scope.canSave = false;
                    }
                } else {
                    $scope.canSave = false;
                }
            };
            
            // Save the object Domain
            $scope.save = function () {
                if ($scope.canSave) {
                    $scope.event($scope.name, $scope.shortname);
                }
            };

            $scope.update = function () {
                if ($scope.canSave) {
                    $scope.eventUpdate($scope.id, $scope.name, $scope.shortname);
                }
            };

            $scope.delete = function () {
                    $scope.eventDelete($scope.id);
            };

            // Clear the data structure
            $scope.clear = function () {
                $scope.name = '';
                $scope.shortname = '';
                $scope.canSave = false;
            };


            
            // MARK: - Update
            if ($scope.source) {
                $scope.id = $scope.source.id;
                $scope.name = $scope.source.name;
                $scope.shortname = $scope.source.shortname;
                $scope.toggleActiveButton();
            }

            $scope.internalControl = $scope.control || {};
            $scope.internalControl.clear = function(){
                $scope.clear();  
            };
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-domain/abc-domain.template.html',
            scope: {
                source: '=',
                event: '=',
                eventUpdate: '=',
                eventDelete: '=',
                control: '=',
                update:'='
            },
            link: Link
        };
    };
    angular
        .module('abcDomain', [])
        .directive('abcDomain', Directive);
})();