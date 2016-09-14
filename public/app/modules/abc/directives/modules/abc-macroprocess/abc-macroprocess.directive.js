/* global angular */
(function(){
    var Directive = function(){
        var Link = function($scope){
            
            $scope.canSave = true;
            
            $scope.date = new Date();
            
            $scope.save = function(){
                var macroproceso = {
                    mega: $scope.mega,
                    name: $scope.name,
                    date: $scope.date,
                    author: $scope.author,
                    version: $scope.version,
                    processOwner: $scope.processOwner,
                    macroProcessObjective: $scope.macroProcessObjective,
                    associatedBusinessObjectives: $scope.associatedBusinessObjectives,
                    macroprocessScope: $scope.macroprocessScope,
                    assumptions: $scope.assumptions,
                    termGlossary: $scope.termGlossary,
                    nonFunctionalRequeriments: $scope.nonFunctionalRequeriments,
                    sla: $scope.sla,
                    security: $scope.security,
                    operativeReports: $scope.operativeReports,
                    operationSystemReport: $scope.operationSystemReport,
                    processChanges: $scope.processChanges,
                    attachments: $scope.attachments
                };
                console.log(macroproceso);
            };
            
        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-macroprocess/abc-macroprocess.template.html',
            scope: {
                title: '@',
                megaprocesos: '=',
                areas: '=',
                event: '='
            },
            link: Link
        };
    };
    angular
        .module('abcMacroprocess', [])
        .directive('abcMacroprocess', Directive);
})();