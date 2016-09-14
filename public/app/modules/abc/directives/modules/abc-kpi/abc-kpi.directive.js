/* global angular */
(function(){
    var Directive = function(){
        var Link = function($scope){
            
            $scope.canSave = false;

            // Data structure
            $scope.name      = '';
            $scope.shortname = '';
            
            $scope.typeOptions = [
                {
                    name:'Capability KPI', 
                    active: true
                }, 
                {
                    name:'Macroprocess KPI', 
                    active: false
                }
            ];

            if ($scope.source) {
                $scope.name = $scope.source.name;
                $scope.shortname = $scope.source.shortname;
            }

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
                var type = 'I';
                if ($scope.canSave) {
                    if ($scope.type == 1){
                        type = 'G';
                    }
                    $scope.event($scope.name, $scope.shortname, type);
                }
            };

            // Clear the data structure
            $scope.clear = function () {
                $scope.name = '';
                $scope.shortname = '';
                $scope.canSave = false;
            };
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-kpi/abc-kpi.template.html',
            scope: {
                title: '@',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcKpi', [])
        .directive('abcKpi', Directive);
})();