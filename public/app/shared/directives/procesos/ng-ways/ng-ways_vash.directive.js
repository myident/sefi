/* global angular, Snap, svgAsPngUri, jsPDF */
(function () {
    var Directive = function ($vash, $build, $layout, $settings, $rootScope) {

        var Link = function ($scope, element) {

            $scope.svg = Snap(element[0]); // Creación del Paper

            $scope.layoutGroups = [{}, {}, {}]; // Grupos de Layout para guardar los Layouts
            $scope.objss = []; // Array que contiene las capacidades del proceso
            $scope.prccessArr = []; // Array que contiene los procesos
            $scope.procesosGroup = {}; // Grupo que contiene los procesos a nivel de SVG

            // MARK: - Watchers que escuchan los cambios de la directiva

            $scope.$watch('source', function () {
                $scope.reset();
            });

            $scope.$watch('layout', function () {
                $scope.reset();
            });

            $scope.$watch('type', function () {
                $scope.reset();
            });

            $scope.$watch('activar', function () {
                $scope.reset();
            });

            $scope.$watch('documentName', function () {});

            $scope.$watch('print', function (n) {
                $scope.imprimir(n);
            });
            

            //MARK: - Funciones
            
            // Función para imprimir el PDF
            $scope.imprimir = function (n) {
                if (n == 'print') {
                    if ($scope.documentName !== '') {
                        $rootScope.spin = true;

                        var ancho, alto, nuevaAltura;

                        var nombre = $vash.camelize($scope.documentName);

                        if ($scope.layout > 0) {
                            

                            ancho = $vash.sumOffsetsInX();
                            alto = $vash.sumOffsetsInY();
                            
                            if (alto > ancho) {
                                nuevaAltura = (((780 * ancho) / alto) * 2);
                                var nuevaAnchura = (780 * 2);
                                svgAsPngUri(element[0], {
                                    scale: 1.5
                                }, function (uri) {

                                    var pdf = new jsPDF('p', 'pt', 'letter');

                                    pdf.addImage(uri, 'PNG', 0, 0, 
                                                 nuevaAltura, nuevaAnchura);
                                    
                                    pdf.addPage();
                                    pdf.addImage(uri, 'PNG', 0, -780, 
                                                 nuevaAltura, nuevaAnchura);
                                    
                                    $rootScope.spin = false;
                                    pdf.save(nombre + '_areas.pdf');
                                }); 
                            }
                            else {
                                ancho = $vash.sumOffsetsInX();
                                alto = $vash.heightProcesosMax();
                                nuevaAltura = ((780 * alto) / ancho);
                                svgAsPngUri(element[0], {
                                    scale: 3.5
                                }, function (uri) {
                                    var pdf = new jsPDF('l', 'pt', 'letter');
                                    pdf.addImage(uri, 'PNG', 0, 0, 780, nuevaAltura);
                                    $rootScope.spin = false;
                                    pdf.save(nombre + '_capacities.pdf');
                                });
                            }


                        } else {
                            
                            ancho = $vash.sumOffsetsInX();
                            alto = $vash.heightProcesosMax();
                            nuevaAltura = ((780 * alto) / ancho);
                            svgAsPngUri(element[0], {
                                scale: 3.5
                            }, function (uri) {
                                var pdf = new jsPDF('l', 'pt', 'letter');
                                pdf.addImage(uri, 'PNG', 0, 0, 780, nuevaAltura);
                                $rootScope.spin = false;
                                pdf.save(nombre + '_capacities.pdf');
                            });

                        }
                    }
                }
                $scope.print = "";
            };

            
            // Constructor de los Layouts
            $scope.buildLayouts = function () {

                // Tamaño de cada uno de los Layouts
                // En orden queda [initial, areas, applications]
                var layoutSizes = [
                    {
                        offset: {
                            x: 130,
                            y: 200
                        },
                        width: 172
                    },
                    {
                        width: 184,
                        height: 30,
                        offset: {
                            x: 92,
                            y: 15
                        }
                    },
                    {
                        width: 144,
                        height: 30,
                        offset: {
                            x: 72,
                            y: 15
                        }
                    }
                ];

                // Se crea la configuración para utilizar el servicio $layout
                $layout.setConfiguration(
                    $scope.config,
                    $scope.svg,
                    $scope.source,
                    $scope.sizes);

                // Con el servicio $layout se crea cada layout, de acuerdo al $scope.layout
                // Se debe tener en cuenta que $scope.layout se recibe en la directiva
                $layout.create[0](
                    layoutSizes[0],
                    $scope.layoutGroups[0]);

                $layout.create[1](
                    layoutSizes[1],
                    $scope.layoutGroups[1]);

                $layout.create[2](
                    layoutSizes[2],
                    $scope.layoutGroups[2]);
            };

            // Función que crea los procesos
            $scope.reset = function () {
                // Offsets iniciales de cada uno de los Procesos en los layouts
                // En orden queda [initial, areas, applications]
                var offsetsInit = [
                    {
                        x: 0,
                        y: 145 // Distancia de la primera capacidad con respecto al proceso
                    },
                    {
                        x: 0,
                        y: 150
                    },
                    {
                        x: 0,
                        y: 140
                    }
                ];

                // Se limpia el SVG
                $scope.svg.clear();
                $vash.zoom = 1;

                // Se reconstruyen los layouts
                $scope.buildLayouts();


                // Se verifica que existan procesos en $scope.source
                if ($scope.source.length) {


                    // Se preparan los procesos para dibujarlos
                    $settings.processes(
                        $scope.source, // array que contiene los procesos
                        offsetsInit, // offsets por default para los procesos
                        $scope.config, // el config que recibe la directiva
                        $scope.layout, // el layout que debe cargar segun la directiva
                        $scope.type,
                        $scope.activar); // se refiere si muestra capacidades o reglas de negocio


                    // Se dibujan los procesos
                    $build.processes(
                        $scope.source,
                        $scope.svg,
                        $scope.layout,
                        $scope.objss,
                        $scope.prccessArr,
                        $scope.procesosGroup,
                        $scope.type,
                        $scope.activar);


                    // Se configura el tamaño del SVG para poder hacer el ZOOM
                    if ($scope.layout > 0) {
                        
                        if ($scope.layout == 2) {
                            $scope.svg.attr({
                                viewBox: "0 0 " + $vash.sumMaxInX() + " " + $vash.sumOffsetsInY()
                            });  
                        } 
                        if ($scope.layout == 1){
                            $scope.svg.attr({
                                viewBox: "0 0 " + $vash.sumOffsetsInX() + " " + $vash.sumOffsetsInY()
                            });
                        }

                    } else {
                        $scope.svg.attr({
                            viewBox: "0 0 " + $vash.sumOffsetsInX() + " " + $vash.heightProcesosMax()
                        });
                    }


                }

            };

        };
        return {
            restrict: 'A',
            link: Link,
            require: '?ngModel',
            scope: {
                source: '=',
                config: '=catalogos',
                layout: '=verPor',
                type: '=ordenarPor',
                activar: '=soloProcesos',
                print: '=enviarImprimir',
                documentName: '=nombrePdf'

            }
        };
    };
    angular
        .module('ngWays', [])
        .directive('ngWays', Directive);
})();