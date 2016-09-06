/* global angular, Snap, svgAsPngUri, jsPDF */
(function () {
    var Directive = function ($setting, $builder, $barraHerramientas) {

        var Link = function ($scope, element, attr, ctrl) {

            var svgElement = document.getElementById('dgWaysSvg');
            $scope.svg = Snap(svgElement);
            $scope.zoom = 1;
            $scope.width = 0;
            $scope.height = 0;
            $scope.svgWidth = 0;
            $scope.svgHeight = 0;
            $scope.widthCanvas = 0;
            $scope.heightCanvas = 0;

            $scope.valid = function(){
                var success = true;
                $scope.svg.clear();
                switch($scope.view){
                    case 0: 
                        if($scope.source && $scope.source.procesos && $scope.source.procesos.length){

                        }else{
                            success = false;
                        }
                    break;
                    case 1: if($scope.source && $scope.source.procesos && $scope.source.procesos.length){
                            
                            var errorArr = [];
                            var data = $scope.source.procesos;
                            for(var i  in data){
                                var proceso = data[i];
                                 if(proceso.capacidades.length){
                                        for( var j in  proceso.capacidades){
                                            var capacidad = proceso.capacidades[j];

                                            if($scope.organiceBy === 1){ 
                                                if(!capacidad.sortAreas.areas.length){
                                                    var errorStr =  'WARN '+count +' -> ('+proceso.name+' > '+capacidad.name + ') - Falta información de base de datos: [capacidades] Faltan areas';
                                                    console.warn(errorStr);
                                                    errorArr.push(errorStr);
                                                    success = false;
                                                    count++;
                                                }else{

                                                }
                                            }
                                        }
                                    }else{
                                        var errorStr =  'WARN '+count +' -> (PROCESO<'+proceso.name +'>) Falta información de base de datos: Faltan capacidades'
                                        console.warn(errorStr);
                                        errorArr.push(errorStr);
                                        success = false;
                                                count++;
                                    }
                                }

                        }

                        break;
                    case 2: 
                    if($scope.source && $scope.source.procesos && $scope.source.procesos.length){
                            
                            var errorArr = [];
                            var data = $scope.source.procesos;
                            for(var i  in data){
                                var proceso = data[i];
                                 if(proceso.reglas.length){
                                        for( var j in  proceso.reglas){
                                            var capacidad = proceso.reglas[j];
                                            if(!capacidad.sortAreas.areas.length){
                                                var errorStr =  'WARN '+count +' -> ('+proceso.name+' > '+capacidad.name + ') - Falta información de base de datos: [reglas] Faltan areas';
                                                console.warn(errorStr);
                                                errorArr.push(errorStr);
                                                success = false;
                                                count++;
                                            }else{

                                            }
                                        }
                                    }else{
                                        var errorStr =  'WARN '+count +' -> (PROCESO<'+proceso.name + '>) Falta información de base de datos: Faltan reglas'
                                        console.warn(errorStr);
                                        errorArr.push(errorStr);
                                        success = false;
                                                count++;
                                    }
                                }

                        }

                        break;
                }
                return success;
            };

            $scope.init = function () {
                $scope.$watchGroup(['source', 'view', 'organiceBy', 'show', 'layout'], function () {
                    $scope.valid() && $scope.reset();
                });

                $scope.$watch(
                    function () {
                        return $barraHerramientas.zoom;
                    },
                    function (newVal) {
                        if (typeof newVal !== 'undefined') {
                            changeViewBox($barraHerramientas.zoom);
                        }
                    });
            };

            function changeViewBox(value) {
                $scope.widthCanvas = ($scope.svgWidth * value) + 'px';
                $scope.heightCanvas = ($scope.svgHeight * value) + 'px';
            }

            $scope.reset = function () {

                $scope.zoom = 1;

                $scope.sourceTemp = JSON.parse(JSON.stringify($scope.source));
                ($scope.organiceBy === 1) && $setting.dimensionsAreas($scope.areasList);
                $setting.dimensions($scope.sourceTemp, $scope.areasList, $scope.view, $scope.organiceBy, $scope.show);
                $builder.build($scope.svg, $scope.sourceTemp, $scope.show, $scope.view);

                $scope.settingSvg($scope.sourceTemp);
                ($scope.organiceBy === 1) && $builder.buildAreas($scope.svg, $scope.areasList, $scope.h);
            };

            $scope.settingSvg = function (source) {
                var maxHeight = 0;
                var maxWidth = 0;
                var marginBottom = 20;
                var marginTop = 40;


                for (var i in source.procesos) {
                    var height = source.procesos[i].html.rect.height;
                    var width = source.procesos[i].html.rect.width;

                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                    maxWidth += width + 30;
                }

                var lengthProcess = $scope.sourceTemp.procesos.length - 1;
                var lengthCapability = 0;
                var lastY = 0;
                switch ($scope.view) {
                case 0:
                    break;
                case 1:
                    lengthCapability = $scope.sourceTemp.procesos[lengthProcess].capacidades.length - 1;
                    lastY = $scope.sourceTemp.procesos[lengthProcess].capacidades[lengthCapability].html.rect.offset.y;
                    break;
                case 2:
                    lengthCapability = $scope.sourceTemp.procesos[lengthProcess].reglas.length - 1;
                    lastY = $scope.sourceTemp.procesos[lengthProcess].reglas[lengthCapability].html.rect.offset.y + 70;
                    break;
                }
                // var lengthCapability = ($scope.view !== 0) ? $scope.sourceTemp.procesos[lengthProcess].capacidades.length - 1 : 0;
                // var lastY = ($scope.view !== 0) ? $scope.sourceTemp.procesos[lengthProcess].capacidades[lengthCapability].html.rect.offset.y : 50;

                $scope.w = ($scope.organiceBy === 1) ? $setting.getSVGWidth($scope.areasList) : maxWidth;
                $scope.h = ($scope.organiceBy === 1) ? lastY + 150 : maxHeight + 100;

                $scope.h = ($scope.view === 0) ? 150 : $scope.h;
                $scope.width = $scope.w + "px";
                $scope.height = $scope.h + "px";

                $scope.svgWidth = $scope.w;
                $barraHerramientas.svgSize.width = $scope.w;
                $scope.svgHeight = $scope.h;
                $barraHerramientas.svgSize.height = $scope.h;
                $scope.svg.attr({
                    viewBox: "0 0 " + ($scope.svgWidth) + " " + ($scope.svgHeight)
                });
                changeViewBox($scope.zoom);
            };
            $scope.init();
        };
        return {
            restrict: 'E',
            link: Link,
            templateUrl: 'app/modules/diagrama/directives/dg-ways/dg-ways.template.html',
            require: '?ngModel',
            scope: {
                source: '=setSource',
                view: '=setView',
                organiceBy: '=setOrganiceBy',
                show: '=setShow',
                zoom: '=setZoom',
                macroprocessName: '=setMacroprocessName',
                areasList: '=setAreasList',
                print: '='
            }
        };
    };
    angular
        .module('dgDiagramaWays', [])
        .directive('dgWays', Directive);
})();