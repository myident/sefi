/*global angular*/
/* jslint browser:true */
(function () {

    var Controller = function ($scope, $rootScope, $routeParams, $itbook, $vash) {
        
        //Background está en $rootScope
        //Header está en $rootScope
        
        
        
        
        // MARK : - Breadcrumb Directive
    
        $scope.breadcrumb = {}; // Se llena en $scope.init()
        
        $scope.getLayout = function (value) {
            // regresa [0, 1, 2]
            $scope.layout = value;
            $scope.restablecerZoom();
        };
        
        $scope.getVista = function (value) {
            
            if (value == 2) {
                $scope.type = 'reglas';
                $scope.abrirCapacidades = true; // Se inicializa en el Ways Directive
            }
            if (value == 1) {
                $scope.type = 'capacidades';
                $scope.abrirCapacidades = true;
            }
            if (value === 0) {
                $scope.type = 'capacidades';
                $scope.abrirCapacidades = false;
            }
            
            $scope.restablecerZoom();
        };
        
        $scope.openBar = true;
        
        $scope.hideBar = function (value) {
            $scope.openBar = value;
        };
        
        $scope.zoom = Math.round($vash.zoom * 100) + '%';
        
        // MARK: - Botones zoom
        
        $scope.mas = function () {
            if($vash.zoom < 2) {
                $vash.zoom += 0.02;
                $scope.zoom = Math.round($vash.zoom * 100) + '%';
            }
        };

        $scope.menos = function () {
            if($vash.zoom > 0.02) {
                $vash.zoom -= 0.02;
                $scope.zoom = Math.round($vash.zoom * 100) + '%';
            }
        };
        
        $scope.restablecerZoom = function() {
            $vash.zoom = 1;
            $scope.zoom = '100%';
        };
        
        
        
        
        // MARK: - Mapside Directive
        
        $scope.dominios = []; // Se llena en $scope.init()
        
        
        
        
        // MARK: - Index Directive
        
        $scope.megaprocesos = []; // Se llena en $scope.init()
        
        /* getIndex(): - Obtiene el tipo e índice de algun elemento seleccionado en la directiva ngIndex */
        /* ************************************************************************************** */
        /* Recibes los siguientes parametros:  */
        /* type:   es el tipo de elemento seleccionado, puede ser macro(macroproceso) o mega(megaproceso)*/
        /* index:  es el índice de macro o mega proceso elegido */
        $scope.getIndex = function (type, index) {

            if (type == 'macro') {

                // SVG
                if (index < 1) {
                    $scope.muestralo = true;
                } else {
                    $scope.muestralo = false;
                }
                // Con el indexMega (índice de megaproceso elegido) se verifica si hay macroprocesos
                if ($scope.megaprocesos[$scope.indexMega].macroprocesos.length) {
                    $scope.macroprocesos = $scope.megaprocesos[$scope.indexMega].macroprocesos;

                    // Se verifica si el macroproceso elegido en el índice tiene procesos
                    if ($scope.macroprocesos[index].procesos.length) {
                        // Si tiene procesos se guardan en $scope.procesos
                        $scope.procesos = $scope.macroprocesos[index].procesos;
                        $scope.config = {
                            layouts: {
                                horizontal: $scope.macroprocesos[index].aplicaciones,
                                vertical: $scope.macroprocesos[index].areas
                            }
                        };

                    } else {
                        // Si no tiene, se guarda el arreglo vacío
                        $scope.procesos = [];      
                        $scope.config = {
                            layouts: {
                                horizontal: [],
                                vertical: []
                            }
                        };
                    }
                    // Se guarda el macroproceso elegido en el breadcrumb
                    $scope.breadcrumb.capacidad = '/ ' + $scope.megaprocesos[$scope.indexMega].macroprocesos[index].title;

                }
            } else {
                // Cuando se elige un megaproceso en el índice, se guarda el $index en indexMega
                $scope.indexMega = index;
                // Se guarda el megaproceso elegido en el breadcrumb
                $scope.breadcrumb.proceso = '/ ' + $scope.megaprocesos[$scope.indexMega].title;
            }

        };
        
        
        
        
        // MARK: - Pestaña cerrar sideBar
        
        $scope.cerrarSideBar = function () {
            $scope.openBar = !$scope.openBar;
        };
        
        
        
        
        // MARK: - Layout Directive
    
        $scope.config = {
            layouts: {
                horizontal: [],
                vertical: []
            }
        };
        
        $scope.layout = 0;
        
        
        
        
        
        // MARK: - Diagram Container
        
        $scope.getStyle = function () {
            if ($scope.procesos.length) {
                return {
                    width: $vash.sumOffsetsInX() + 'px',
                    height: 'calc(100% - ' + $vash.heightHeader() + 'px)',
                    top: $vash.heightHeader() + 'px'
                }; 
            }
        };
        
        $scope.getHeaderStyle = function() {
            if ($scope.procesos.length) {
                return {
                    width: $vash.sumOffsetsInX() + 'px',
                    height: $vash.heightHeader() + 'px'
                };
            }
        };
                
        
        
        
        // MARK: - Ways Directive
        
        $scope.macroprocesos = [];
        $scope.procesos = [];

        $scope.type = 'capacidades';

        $scope.abrirCapacidades = false;
        

        
        
        // MARK: - Inicializa el controller

        $scope.init = function () {
            
            $rootScope.spin = false;

            var dominio = $routeParams.procesos || $rootScope.source.rutas[0];
            var megaproceso = $routeParams.subprocesos || $rootScope.source.rutas[1];

            $rootScope.source.rutas[1] = $routeParams.subprocesos;
            $scope.subposicion = megaproceso;

            // Direcciones abreviadas
            $scope.dominioActual = $rootScope.source.arquitectura[dominio];
            $scope.megaProcesoActual = $rootScope.source.arquitectura[dominio].dominios[megaproceso];

            // El objeto para inicializar el Breadcrumb
            $scope.breadcrumb = {
                dominio: $scope.dominioActual.name,
                color: $scope.dominioActual.backColor,
                colorMegaproceso: $scope.megaProcesoActual.color,
                titulo: $scope.dominioActual.title,
                subtitulo: $scope.megaProcesoActual.title,
                proceso: '',
                capacidad: '',
                megaproceso: $scope.megaProcesoActual.name
            };

            // Se verifica si la arquitectura tiene dominios
            if ($scope.dominioActual.dominios && $scope.dominioActual.dominios.length) {
                $scope.dominios = $scope.dominioActual.dominios;
                // Se verifica que el dominio elegido tenga megaprocesos
                if ($scope.megaProcesoActual.megaprocesos && $scope.megaProcesoActual.megaprocesos.length) {
                    $scope.megaprocesos = $scope.megaProcesoActual.megaprocesos;
                } else {
                    $scope.megaprocesos = [];
                }
            } else {
                $scope.dominios = [];
            }
            // Index del megaproceso
            $scope.indexMega = 0;
        };

        
        
        
        
        
        // MARK: - Consulta al servicio RESTful

        if (!$rootScope.source.rutas) {
            $rootScope.source = $itbook.get(function () {
                $scope.init();
            });
        } else {
            $scope.init();
        }        



    };


    Controller.$inject = ['$scope', '$rootScope', '$routeParams', '$itbook', '$vash'];

    angular
        .module('mProcesses')
        .controller('ProcessesDetailController', Controller);
})();