/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {

            $scope.canSave = true;

            $scope.date = new Date();

            $scope.save = function () {
                var macroproceso = {
                    
                        mega_id: $scope.mega || 0,
                        macro_id: $scope.macro || 0,
                        nombre_Macro: $scope.name || '',
                        version_fecha: $scope.date,
                        version_autor: $scope.author || '',
                        version_vers: $scope.version || '',
                        version_desc: $scope.version_desc || '',
                        objetivo_Macro: $scope.macroProcessObjective || '',
                        scope_Macro: $scope.macroprocessScope || '',
                        security_Macro: $scope.security || '',
                        operation_system_Macro: $scope.operationSystemReport || '',
                        
                        
                        attach: $scope.attachments || [],
                        operative: $scope.operativeReports || [],
                        process_change: $scope.processChanges || [],
                        SLA_service: $scope.sla || [],
                        glosary: $scope.termGlossary || [],
                        assumtion: $scope.assumptions || [],
                        non_funtionals: [{mcro: 0, req_ID: 0, des_REQ: $scope.nonFunctionalRequeriments || '', status: 0}],
                        asosiate_buss: $scope.associatedBusinessObjectives || [],
                        process_owner: $scope.processOwner || []
  
                    
                };
                $scope.event(macroproceso);
                console.log(macroproceso);
            };
            
            if ($scope.source){
                $scope.mega = $scope.source.mega_id;
                $scope.macro = $scope.source.macro;
                $scope.name = $scope.source.nombre_Macro;
                $scope.author = $scope.source.version_autor;
                $scope.version = $scope.source.version_vers;
                $scope.version_desc = $scope.source.version_desc;
                $scope.macroProcessObjective = $scope.source.objetivo_Macro;
                $scope.macroprocessScope = $scope.source.scope_Macro;
                $scope.security = $scope.source.security_Macro;
                $scope.operationSystemReport = $scope.source.operation_system_Macro;
                
                $scope.attachments = $scope.source.attach;
                $scope.operativeReports = $scope.source.operative;
                $scope.processChanges = $scope.source.process_change;
                $scope.sla = $scope.source.SLA_service;
                $scope.termGlossary = $scope.source.glosary;
                $scope.assumptions = $scope.source.assumtion;
                
            }

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