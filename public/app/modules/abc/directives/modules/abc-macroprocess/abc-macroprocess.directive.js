/* global angular */
(function () {
    var Directive = function () {
        var Link = function ($scope) {


            $scope.canSave = true;

            $scope.date = new Date();

            $scope.clear = function () {

                macro_id = 0;
                mega_id = 0;
                $scope.resetSelects = true;
                $scope.macro = '';
                $scope.name = '';
                $scope.author = '';
                $scope.version = '';
                $scope.version_desc = '';
                $scope.macroProcessObjective = '';
                $scope.macroprocessScope = '';
                $scope.security = '';
                $scope.operationSystemReport = '';

                $scope.process_owner = [];
                $scope.attachments = [];
                $scope.operativeReports = [];
                $scope.processChanges = [];
                $scope.sla = [];
                $scope.termGlossary = [];
                $scope.assumptions = [];
                $scope.associatedBusinessObjectives = [];

                $scope.hideWarningMega = false;
                $scope.hideWarningMacro = false;
                $scope.hideWarningAuthor = false;
                $scope.hideWarningVersion = false;
                $scope.hideWarningVersionDesc = false;
                $scope.hideWarningMacroObj = false;
                $scope.hideWarningAreaObj = false;
                $scope.hideWarningTerm = false;


            };

            $scope.hideMega = function () {
                $scope.hideWarningMega = true;
            };

            $scope.hideMacro = function () {
                if ($scope.name !== '' && $scope.name !== undefined) {
                    $scope.hideWarningMacro = true;
                } else {
                    $scope.hideWarningMacro = false;
                }
            };


            $scope.hideAuthor = function () {
                if ($scope.author !== '' && $scope.author !== undefined) {
                    $scope.hideWarningAuthor = true;
                } else {
                    $scope.hideWarningAuthor = false;
                }
            };


            $scope.hideVersion = function () {
                if ($scope.version !== '' && $scope.version !== undefined) {
                    $scope.hideWarningVersion = true;
                } else {
                    $scope.hideWarningVersion = false;
                }
            };

            $scope.hideVersionDesc = function () {
                if ($scope.version_desc !== '' && $scope.version_desc !== undefined) {
                    $scope.hideWarningVersionDesc = true;
                } else {
                    $scope.hideWarningVersionDesc = false;
                }
            };

            $scope.hideMacroObj = function () {
                if ($scope.macroProcessObjective !== '' && $scope.macroProcessObjective !== undefined) {
                    $scope.hideWarningMacroObj = true;
                } else {
                    $scope.hideWarningMacroObj = false;
                }
            };



            $scope.hideAreaObj = function () {
                if ($scope.associatedBusinessObjectives !== '' && $scope.associatedBusinessObjectives !== undefined) {
                    $scope.hideWarningAreaObj = true;
                } else {
                    $scope.hideWarningAreaObj = false;
                }
            };

            $scope.hideTerm = function () {
                if ($scope.termGlossary) {
                    if ($scope.termGlossary.length) {
                        $scope.hideWarningTerm = true;
                    } else {
                        $scope.hideWarningTerm = false;
                    }
                }

            };


            $scope.save = function () {

                if ($scope.author === '' || $scope.author === undefined) {
                    $scope.warningAuthor = true;
                } else {
                    $scope.warningAuthor = false;
                }
                if ($scope.version === '' || $scope.version === undefined) {
                    $scope.warningVersion = true;
                } else {
                    $scope.warningVersion = false;
                }
                if ($scope.version_desc === '' || $scope.version_desc === undefined) {
                    $scope.warningDescription = true;
                } else {
                    $scope.warningDescription = false;
                }

                var macroproceso = {

                    mega_id: $scope.mega_id || 0,
                    macro_id: $scope.macro_id || 0,
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
                    non_funtionals: [{
                        mcro: 0,
                        req_ID: 0,
                        des_REQ: $scope.nonFunctionalRequeriments || '',
                        status: 0
                    }],
                    asosiate_buss: $scope.associatedBusinessObjectives || [],
                    process_owner: $scope.process_owner || []


                };

                if($scope.hideWarningMega && $scope.hideWarningMacro && $scope.hideWarningAuthor && $scope.hideWarningVersion && $scope.hideWarningVersionDesc && $scope.hideWarningMacroObj && $scope.hideWarningAreaObj && $scope.hideWarningTerm){
                     $scope.event(macroproceso);
                }

               
                console.log(macroproceso);
            };

            $scope.edit = function () {

                if ($scope.author === '' || $scope.author === undefined) {
                    $scope.warningAuthor = true;
                } else {
                    $scope.warningAuthor = false;
                }
                if ($scope.version === '' || $scope.version === undefined) {
                    $scope.warningVersion = true;
                } else {
                    $scope.warningVersion = false;
                }
                if ($scope.version_desc === '' || $scope.version_desc === undefined) {
                    $scope.warningDescription = true;
                } else {
                    $scope.warningDescription = false;
                }

                var macroproceso = {
                    mega_id: $scope.mega_id || 0,
                    macro_id: $scope.macro_id || 0,
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
                    non_funtionals: [{
                        mcro: 0,
                        req_ID: 0,
                        des_REQ: $scope.nonFunctionalRequeriments || '',
                        status: 0
                    }],
                    asosiate_buss: $scope.associatedBusinessObjectives || [],
                    process_owner: $scope.process_owner || []


                };

                if($scope.hideWarningMega && $scope.hideWarningMacro && $scope.hideWarningAuthor && $scope.hideWarningVersion && $scope.hideWarningVersionDesc && $scope.hideWarningMacroObj && $scope.hideWarningAreaObj && $scope.hideWarningTerm){
                     $scope.eventUpdate(macroproceso);
                }
                
                console.log(macroproceso);
            };

            $scope.delete = function () {
                $scope.eventDelete($scope.id);
            };
            
            $scope.getMegaModel = function(id){
                for(var i in $scope.megaprocesos){
                    if($scope.megaprocesos[i].id === id){
                        return $scope.megaprocesos[i].title;
                    }
                }
            };

            $scope.reset = function () {

                if ($scope.source) {
                    $scope.id = $scope.source.id;
                    $scope.mega = {
                        id: $scope.source.mega_id, 
                        name: $scope.getMegaModel($scope.source.mega_id)
                    };
                    $scope.macro_id = $scope.source.macro_id;
                    $scope.mega_id = $scope.source.mega_id;
                    $scope.macro = $scope.source.macro;
                    $scope.name = $scope.source.nombre_Macro;
                    $scope.author = $scope.source.version_autor;
                    $scope.version = $scope.source.version_vers;
                    $scope.version_desc = $scope.source.version_desc;
                    $scope.macroProcessObjective = $scope.source.objetivo_Macro;
                    $scope.macroprocessScope = $scope.source.scope_Macro;
                    $scope.security = $scope.source.security_Macro;
                    $scope.operationSystemReport = $scope.source.operation_system_Macro;
                    $scope.nonFunctionalRequeriments = $scope.source.non_funtionals[0].des_REQ;
                    

                    $scope.attachments = $scope.source.attach;
                    $scope.operativeReports = $scope.source.operative;
                    $scope.processChanges = $scope.source.process_change;
                    $scope.sla = $scope.source.SLA_service;
                    $scope.termGlossary = $scope.source.glosary;
                    $scope.assumptions = $scope.source.assumtion;
                    $scope.process_owner = $scope.source.process_owner;
                    $scope.associatedBusinessObjectives = $scope.source.asosiate_buss;

                    $scope.hideWarningMega = true;
                    $scope.hideWarningMacro = true;
                    $scope.hideWarningAuthor = true;
                    $scope.hideWarningVersion = true;
                    $scope.hideWarningVersionDesc = true;
                    $scope.hideWarningMacroObj = true;
                    $scope.hideWarningAreaObj = true;
                    $scope.hideWarningTerm = true;
                }
            };

            $scope.$watch('source', function () {
                $scope.reset();
            });

            $scope.internalControl = $scope.control || {};
            $scope.internalControl.clear = function () {
                $scope.clear();
            };

        };
        return {
            restrict: 'A',
            templateUrl: 'app/modules/abc/directives/modules/abc-macroprocess/abc-macroprocess.template.html',
            scope: {
                title: '@',
                megaprocesos: '=',
                areas: '=',
                event: '=',
                eventUpdate: '=',
                eventDelete: '=',
                control: '=',
                source: '=',
                update: '='
            },
            link: Link
        };
    };
    angular
        .module('abcMacroprocess', [])
        .directive('abcMacroprocess', Directive);
})();