/* global angular */
(function () {
    var Controller = function ($scope, $rootScope, $abcCreate, $apidominio, $apimegaproceso, $apimacroproceso, $apiarea, $apikpi, Upload, $http, $window, $abcUpdate, apiaplicaciones) {

        $scope.regresar = function () {
            $window.history.back();
        };

        $scope.init = function(){
            console.log($abcUpdate);
            $scope.update = $abcUpdate.update || false;
            if($abcUpdate.update){
                for(var i in $scope.types){
                    $scope.types[i].active = false;
                }
                switch($abcUpdate.obj.id){
                    case 0: 
                        $scope.types[0].active = true; 
                        $scope.types[0].source = {
                           id: $abcUpdate.obj.obj.id,
                           name: $abcUpdate.obj.obj.name,
                           shortname: $abcUpdate.obj.obj.title
                       };
                        break;
                    case 1: 
                        $scope.types[1].active = true;

                        $scope.types[1].source = {
                               id : $abcUpdate.obj.obj.id,
                               domain: {
                                   name: $abcUpdate.obj.obj.desc_dominio,
                                   id: $abcUpdate.obj.obj.id_dominio
                               },
                               name: $abcUpdate.obj.obj.title
                           };
                        break;
                    case 2: 
                        $scope.types[2].active = true; 
                        $scope.types[2].source = {
                            id: $abcUpdate.obj.obj.area_id,
                           mega_id: 0,
                           macro_id: $abcUpdate.obj.obj.id,
                           nombre_Macro: $abcUpdate.obj.obj.title,
                           version_autor: 'Alan Olvera',
                           version_vers: '',
                           version_desc: '',
                           objetivo_Macro: '',
                           scope_Macro: '',
                           security_Macro: '',
                           operation_system_Macro: '',


                           attach: [],
                           operative: [],
                           process_change: [],
                           SLA_service: [],
                           glosary: [],
                           assumtion: [],
                           non_funtionals: [{
                               mcro: 0,
                               req_ID: 0,
                               des_REQ: '',
                               status: 0
                           }],
                           asosiate_buss: [],
                           process_owner: []
                       };
                        break;
                    case 3: 
                        $scope.types[3].active = true; 
                        $scope.types[3].source =  {
                            id: $abcUpdate.obj.obj.area_id,
                            name: $abcUpdate.obj.obj.area_desc,
                            type: $abcUpdate.obj.obj.tipo === 'O' ? 0 : 1
                       }
                        break;
                    case 4: 
                        $scope.types[4].active = true; 
                        $scope.types[4].source = {
                            id : $abcUpdate.obj.obj.id,
                            name: $abcUpdate.obj.obj.name,
                            shortname: $abcUpdate.obj.obj.sname,
                            type: $abcUpdate.obj.obj.kpi_TYPE === 'I' ? 0 : 1

                       }
                        break;
                    case 5:    
                        $scope.types[5].active = true; 
                        $scope.types[5].source = {
                           id : $abcUpdate.obj.obj.id,
                           name: $abcUpdate.obj.obj.name
                       }
                        break;
                    default: $scope.types[0].active = true; break; 
                }
            }
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

        $scope.updateDomain = function (id, name, shortname) {
            var dominio = new $apidominio();
            dominio.DOMID = id;
            dominio.LNAME = name;
            dominio.SNAME = shortname;
            dominio.$update(function (data) {
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
                    text: 'The element ' + name + ' was update.',
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
        $scope.deleteDomain = function (id) {
            var dominio = new $apidominio();
            dominio.$delete({id:id}, function (data) {
                // MARK: - GET Lista de los Dominios
                // $scope.listaDominios = $apidominio.query(function (data) {
                //     console.log(data);
                // }, function (e) {
                //     console.log(e);
                // });
                console.log(data);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element ' + name + ' was delete.',
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

        $scope.updateMega = function (id, name, domain) {

            var megaproceso = new $apimegaproceso();
            megaproceso.MEGA = id;
            megaproceso.DOMID = domain.id;
            megaproceso.LDESC = name;
            megaproceso.$update(function (data) {
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
                    text: 'The element ' + name + ' was update.',
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

        $scope.deleteMega = function (id) {
            var megaproceso = new $apimegaproceso();
            megaproceso.$delete({id:id}, function (data) {
                // MARK: - GET Lista de los Dominios
                // $scope.listaDominios = $apidominio.query(function (data) {
                //     console.log(data);
                // }, function (e) {
                //     console.log(e);
                // });
                console.log(data);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element ' + name + ' was delete.',
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

        $scope.updateMacro = function (obj) {
            var macroproceso = new $apimacroproceso(obj);
            macroproceso.$update(
                function () {
                    console.log('Save succesfull');
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'DONE',
                        text: 'The element ' + obj.nombre_Macro + ' was update.',
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

        $scope.deleteMacro = function (id) {
            var macroproceso = new $apimacroproceso();
            macroproceso.$delete({id:id}, function (data) {
                // MARK: - GET Lista de los Dominios
                // $scope.listaDominios = $apidominio.query(function (data) {
                //     console.log(data);
                // }, function (e) {
                //     console.log(e);
                // });
                console.log(data);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element ' + name + ' was delete.',
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

        $scope.updateArea = function (id, name, type) {
            var area = new $apiarea();
            area.ARID = id;
            area.LDESC = name;
            area.TIPO = type;
            area.POS = 1;
            area.$update(
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
                        text: 'The element ' + name + ' was update.',
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

        $scope.deleteArea = function (id) {
            var area = new $apiarea();
            area.$delete({id:id}, function (data) {
                // MARK: - GET Lista de los Dominios
                // $scope.listaDominios = $apidominio.query(function (data) {
                //     console.log(data);
                // }, function (e) {
                //     console.log(e);
                // });
                console.log(data);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element ' + name + ' was delete.',
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

        $scope.updateKpi= function (id, name, shortname, level) {
            var kpi = new $apikpi();
            kpi.KPID = id;
            kpi.LDESC = name;
            kpi.SDESC = shortname;
            kpi.TIPO = level;
            kpi.$update(
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
                        text: 'The element ' + name + ' was update.',
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

        $scope.deleteKpi = function (id) {
            var kpi = new $apikpi();
            kpi.$delete({id:id}, function (data) {
                // MARK: - GET Lista de los Dominios
                // $scope.listaDominios = $apidominio.query(function (data) {
                //     console.log(data);
                // }, function (e) {
                //     console.log(e);
                // });
                console.log(data);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element ' + name + ' was delete.',
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
        $scope.updateAplicacion = function (id, name) {

           var aplicacion = new $apiaplicaciones();
           aplicacion.id = id;
           aplicacion.LDESC = name;
           aplicacion.$update(function (data) {
               console.log(data);
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
           }, function (e) {
               console.log(e);
           });

        };

        $scope.deleteKpi = function (id) {
            var aplicacion = new $apiaplicaciones();
            aplicacion.$delete({id:id}, function (data) {
                
                console.log(data);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element ' + name + ' was delete.',
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

        $scope.init();

    };
    Controller.$inject = ['$scope', '$rootScope', '$abcCreate', '$apidominio', '$apimegaproceso', '$apimacroproceso', '$apiarea', '$apikpi', 'Upload', '$http', '$window', '$abcUpdate', '$apiaplicaciones'];
    angular
        .module('mAbc')
        .controller('AbcCreateController', Controller);
})();