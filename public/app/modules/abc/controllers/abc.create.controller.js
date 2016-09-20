/* global angular */
(function () {
    var Controller = function ($scope, $rootScope, $abcCreate, $apidominio, $apimegaproceso, $apimacroproceso, $apiarea, $apikpi, Upload, $http, $window, $apiaplicaciones) {
        $scope.regresar = function () {
            $window.history.back();
        };

        $rootScope.showAlert = false;
        $scope.contentAlert = {
            title: 'DONE',
            text: 'The element Account Information (Capability) can not be deleted because it is being used by other elements.',
            button: 'OK',
            type: 'blue',
            event: function () {
                console.log('Cerraste alerta');
            }
        };


        // MARK: - Configuración de los elementos que se muestran
        $scope.types = $abcCreate.types;
        $scope.toggleType = function (index) {
            for (var i in $scope.types) {
                if (i == index) {
                    $scope.types[index].active = !$scope.types[index].active;
                } else {
                    $scope.types[i].active = false;
                }
            }
        };

        // MARK: - GET Lista de los Dominios
        $scope.listaDominios = $apidominio.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
        });

        // MARK: - GET Lista de los Megaprocesos
        $scope.listaMegaprocesos = $apimegaproceso.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
        });

        // MARK: - GET Lista de los Megaprocesos
        $scope.listaAreas = $apiarea.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
        });


        // MARK: - POST Guarda un Dominio
        $scope.domainControl = {};
        $scope.saveDomain = function (name, shortname) {
            var dominio = new $apidominio();
            dominio.LNAME = name;
            dominio.SNAME = shortname;
            dominio.$save(function (data) {
                // MARK: - GET Lista de los Dominios
                $scope.listaDominios = $apidominio.query(function (data) {
                    console.log(data);
                }, function (e) {
                    console.log(e);
                });
                console.log(data);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element ' + name + ' was created.',
                    button: 'OK',
                    type: 'blue',
                    event: function () {
                        $scope.domainControl.clear();
                    }
                };
            }, function (e) {
                console.log(e);
            });
        };

        // MARK: - POST Guarda un Megaproceso
        $scope.megaControl = {};
        $scope.saveMega = function (name, domain) {

            var megaproceso = new $apimegaproceso();
            megaproceso.DOMID = domain.id;
            megaproceso.LDESC = name;
            megaproceso.$save(function (data) {
                console.log(data);
                // MARK: - GET Lista de los Megaprocesos
                $scope.listaMegaprocesos = $apimegaproceso.query(function (data) {
                    console.log(data);
                }, function (e) {
                    console.log(e);
                });
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element ' + name + ' was created.',
                    button: 'OK',
                    type: 'blue',
                    event: function () {
                        $scope.megaControl.clear();
                    }
                };
            }, function (e) {
                console.log(e);
            });
        };

        // MARK: - POST Guarda un Macroproceso
        $scope.macroControl = {};
        $scope.saveMacro = function (obj) {
            var macroproceso = new $apimacroproceso(obj);
            macroproceso.$save(
                function () {
                    console.log('Save succesfull');
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'DONE',
                        text: 'The element ' + obj.nombre_Macro + ' was created.',
                        button: 'OK',
                        type: 'blue',
                        event: function () {
                            $scope.macroControl.clear();
                        }
                    };
                },
                function (e) {
                    console.log(e);
                });
        };

        // MARK: - POST Guarda un Area
        $scope.areaControl = {};
        $scope.saveArea = function (name, type) {
            var area = new $apiarea();
            area.LDESC = name;
            area.TIPO = type;
            area.POS = 1;
            area.$save(
                function (data) {
                    // MARK: - GET Lista de los Megaprocesos
                    $scope.listaAreas = $apiarea.query(function (data) {
                        console.log(data);
                    }, function (e) {
                        console.log(e);
                    });
                    console.log(data);
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'DONE',
                        text: 'The element ' + name + ' was created.',
                        button: 'OK',
                        type: 'blue',
                        event: function () {
                            $scope.areaControl.clear();
                        }
                    };
                },
                function (e) {
                    console.log(e);
                });
        };

        // MARK: - POST Guarda un KPI
        $scope.kpiControl = {};
        $scope.saveKpi = function (name, shortname, level) {
            var kpi = new $apikpi();
            kpi.LDESC = name;
            kpi.SDESC = shortname;
            kpi.TIPO = level;
            kpi.$save(
                function (data) {
                    console.log(data);
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'DONE',
                        text: 'The element ' + name + ' was created.',
                        button: 'OK',
                        type: 'blue',
                        event: function () {
                            $scope.kpiControl.clear();
                        }
                    };
                },
                function (e) {
                    console.log(e);
                });
        };




        // MARK: - POST Guarda una Aplicación
        $scope.aplicacionControl = {};
        $scope.saveAplicacion = function (name) {

//            var aplicacion = new $apiaplicaciones();
//            aplicacion.LDESC = name;
//            aplicacion.$save(function (data) {
//                console.log(data);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element ' + name + ' was created.',
                    button: 'OK',
                    type: 'blue',
                    event: function () {
                        $scope.aplicacionControl.clear();
                    }
                };
//            }, function (e) {
//                console.log(e);
//            });

        };









        // MARK: - POST Guarda un Macroproceso Multipart
        $scope.saveMacroMultipart = function (obj) {
            Upload.upload({
                url: 'http://14.128.82.183:14501/ITBook/Macroprocesos',
                data: obj
            }).then(function (data) {
                console.log(data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            });
        };

        // MARK: - POST Guarda un Macroproceso FormData
        $scope.saveMacroFromFormData = function (obj) {
            var uploadUrl = 'http://14.128.82.183:14501/ITBook/Macroprocesos';
            var fd = new FormData();
            fd.append('attach', obj.attach);
            fd.append('operative', obj.operative);
            fd.append('objmacro', obj.objmacro);
            $http
                .post(uploadUrl, fd, {
                    transformRequest: function (data, headersGetterFunction) {
                        console.log(data);
                        console.log(headersGetterFunction());
                        return data;
                    },
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function (data) {
                    console.log(data);
                })
                .error(function (e) {
                    console.log(e);
                });
        };

    };
    Controller.$inject = ['$scope', '$rootScope', '$abcCreate', '$apidominio', '$apimegaproceso', '$apimacroproceso', '$apiarea', '$apikpi', 'Upload', '$http', '$window', '$apiaplicaciones'];
    angular
        .module('mAbc')
        .controller('AbcCreateController', Controller);
})();