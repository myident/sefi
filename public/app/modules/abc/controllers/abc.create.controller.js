/* global angular */
(function () {
    var Controller = function ($scope, $rootScope, $abcCreate, $apidominio, $apimegaproceso, $apimacroproceso, $apiarea, $apikpi, Upload, $http, $window, $abcUpdate, $apiaplicaciones, $apimacroprocesodesc) {

        $scope.regresar = function () {
            $window.history.back();
            $scope.domainControl.clear();
            $scope.megaControl.clear();
            $scope.macroControl.clear();
            $scope.areaControl.clear();
            $scope.kpiControl.clear();
            $scope.aplicacionControl.clear();
        };



        $scope.init = function () {
            console.log($abcUpdate);
            $scope.update = $abcUpdate.update || false;
            $scope.showItems = $abcUpdate.show;
            if($abcUpdate.update){
                for(var i in $scope.types){
                    $scope.types[i].active = false;
                }
                switch ($abcUpdate.obj.id) {
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
                        id: $abcUpdate.obj.obj.id,
                        domain: {
                            name: $abcUpdate.obj.obj.desc_dominio,
                            id: $abcUpdate.obj.obj.id_dominio
                        },
                        name: $abcUpdate.obj.obj.title
                    };
                    break;
                case 2:
                    $scope.types[2].active = true;
                    var macrodesc = new $apimacroprocesodesc();
                    console.log($abcUpdate.obj.obj.id);
                    macrodesc.$get({
                        id: $abcUpdate.obj.obj.id
                    }, function (data) {
                        $rootScope.spin = false;

                        console.log(data);

                        $scope.types[2].source = {
                            id: $abcUpdate.obj.obj.area_id,
                            mega_id: data.ega_id,
                            macro_id: $abcUpdate.obj.obj.id,
                            nombre_Macro: data.nombre_Macro,
                            version_autor: data.version_autor,
                            version_vers: data.version_vers,
                            version_desc: data.version_desc,
                            objetivo_Macro: data.bjetivo_Macro,
                            scope_Macro: data.scope_Macro,
                            security_Macro: data.security_Macro,
                            operation_system_Macro: data.peration_system_Macro,


                            attach: data.attach,
                            operative: data.operative,
                            process_change: data.rocess_change,
                            SLA_service: data.SLA_service,
                            glosary: data.glosary,
                            assumtion: data.assumtion,
                            non_funtionals: data.non_funtionals,
                            asosiate_buss: data.asosiate_buss,
                            process_owner: data.process_owner
                        };


                    }, function (e) {
                        console.log(e);
                        $rootScope.showAlert = true;
                        $scope.contentAlert = {
                            title: 'ERROR',
                            text: 'An error ocurred during the delete of the Domain.',
                            button: 'OK',
                            type: 'red',
                            event: function () {}
                        };
                        return;
                    });

                    break;
                case 3:
                    $scope.types[3].active = true;
                    $scope.types[3].source = {
                        id: $abcUpdate.obj.obj.area_id,
                        name: $abcUpdate.obj.obj.area_desc,
                        type: $abcUpdate.obj.obj.tipo === 'O' ? 0 : 1
                    }
                    break;
                case 4:
                    $scope.types[4].active = true;
                    $scope.types[4].source = {
                        id: $abcUpdate.obj.obj.id,
                        name: $abcUpdate.obj.obj.name,
                        shortname: $abcUpdate.obj.obj.sname,
                        type: $abcUpdate.obj.obj.kpi_TYPE === 'I' ? 0 : 1

                    }
                    break;
                case 5:
                    $scope.types[5].active = true;
                    $scope.types[5].source = {
                        id: $abcUpdate.obj.obj.id,
                        name: $abcUpdate.obj.obj.name
                    }
                    break;
                default:
                    $scope.types[0].active = true;
                    break;
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
            $rootScope.showAlert = true;
            $scope.contentAlert = {
                title: 'ERROR',
                text: 'An error ocurred during the load of the Domains.',
                button: 'OK',
                type: 'red',
                event: function () {}
            };
            return;
        });

        // MARK: - GET Lista de los Megaprocesos
        $scope.listaMegaprocesos = $apimegaproceso.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
            $rootScope.showAlert = true;
            $scope.contentAlert = {
                title: 'ERROR',
                text: 'An error ocurred during the load of the Megaprocesses.',
                button: 'OK',
                type: 'red',
                event: function () {}
            };
            return;
        });

        // MARK: - GET Lista de las Areas
        $scope.listaAreas = $apiarea.query(function (data) {
            console.log(data);
        }, function (e) {
            console.log(e);
            $rootScope.showAlert = true;
            $scope.contentAlert = {
                title: 'ERROR',
                text: 'An error ocurred during the load of the Areas.',
                button: 'OK',
                type: 'red',
                event: function () {}
            };
            return;
        });


        // MARK: - POST Guarda un Dominio
        $scope.domainControl = {};
        $scope.saveDomain = function (name, shortname) {
            $rootScope.spin = true;
            var dominio = new $apidominio();
            dominio.LNAME = name;
            dominio.SNAME = shortname;
            dominio.$save(function (data) {
                $rootScope.spin = false;
                // MARK: - GET Lista de los Dominios
                $scope.listaDominios = $apidominio.query(function (data) {
                    console.log(data);
                }, function (e) {
                    console.log(e);
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'ERROR',
                        text: 'An error ocurred during the load of the Domains.',
                        button: 'OK',
                        type: 'red',
                        event: function () {}
                    };
                    return;
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
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'An error ocurred during the save of the Domain.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
                return;
            });
        };

        $scope.updateDomain = function (id, name, shortname) {
            $rootScope.spin = true;
            var dominio = new $apidominio();
            dominio.DOMID = id;
            dominio.LNAME = name;
            dominio.SNAME = shortname;
            dominio.$update(function (data) {
                $rootScope.spin = false;
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
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'An error ocurred during the update of the Domain.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
                return;
            });
        };
        $scope.deleteDomain = function (id) {
            $rootScope.spin = true;
            var dominio = new $apidominio();
            dominio.$delete({
                id: id
            }, function (data) {
                $rootScope.spin = false;
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
                    text: 'The element was delete.',
                    button: 'OK',
                    type: 'blue',
                    event: function () {
                        $scope.domainControl.clear();
                    }
                };
            }, function (e) {
                console.log(e);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'An error ocurred during the delete of the Domain.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
                return;
            });
        };

        // MARK: - POST Guarda un Megaproceso
        $scope.megaControl = {};
        $scope.saveMega = function (name, domain) {
            $rootScope.spin = true;

            var megaproceso = new $apimegaproceso();
            megaproceso.DOMID = domain.id;
            megaproceso.LDESC = name;
            megaproceso.$save(function (data) {
                $rootScope.spin = false;
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
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'An error ocurred during the save of the Megaprocess.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
                return;
            });
        };

        $scope.updateMega = function (id, name, domain) {
            $rootScope.spin = true;

            var megaproceso = new $apimegaproceso();
            megaproceso.MEGA = id;
            megaproceso.DOMID = domain.id;
            megaproceso.LDESC = name;
            megaproceso.$update(function (data) {
                $rootScope.spin = false;
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
            $rootScope.spin = true;
            var megaproceso = new $apimegaproceso();
            megaproceso.$delete({
                id: id
            }, function (data) {
                $rootScope.spin = false;
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
                    text: 'The element was delete.',
                    button: 'OK',
                    type: 'blue',
                    event: function () {
                        $scope.domainControl.clear();
                    }
                };
            }, function (e) {
                console.log(e);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'An error ocurred during the delete of the Megaprocess.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
                return;
            });
        };

        // MARK: - POST Guarda un Macroproceso
        $scope.macroControl = {};
        $scope.saveMacro = function (obj) {
            $rootScope.spin = true;
            var macroproceso = new $apimacroproceso(obj);
            macroproceso.$save(
                function () {
                    $rootScope.spin = false;
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
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'ERROR',
                        text: 'An error ocurred during the save of the Macro.',
                        button: 'OK',
                        type: 'red',
                        event: function () {}
                    };
                    return;
                });
        };

        $scope.updateMacro = function (obj) {
            $rootScope.spin = true;
            var macroproceso = new $apimacroproceso(obj);
            macroproceso.$update(
                function () {
                    $rootScope.spin = false;
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
            $rootScope.spin = true;
            var macroproceso = new $apimacroproceso();
            macroproceso.$delete({
                id: id
            }, function (data) {
                $rootScope.spin = false;
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
            $rootScope.spin = true;
            var area = new $apiarea();
            area.LDESC = name;
            area.TIPO = type;
            area.POS = 1;
            area.$save(
                function (data) {
                    $rootScope.spin = false;
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
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'ERROR',
                        text: 'An error ocurred during the save of the Area.',
                        button: 'OK',
                        type: 'red',
                        event: function () {}
                    };
                    return;
                });
        };

        $scope.updateArea = function (id, name, type) {
            $rootScope.spin = true;
            var area = new $apiarea();
            area.ARID = id;
            area.LDESC = name;
            area.TIPO = type;
            area.POS = 1;
            area.$update(
                function (data) {
                    $rootScope.spin = false;
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
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'ERROR',
                        text: 'An error ocurred during the update of the Area.',
                        button: 'OK',
                        type: 'red',
                        event: function () {}
                    };
                    return;
                });
        };

        $scope.deleteArea = function (id) {
            $rootScope.spin = true;
            var area = new $apiarea();
            area.$delete({
                id: id
            }, function (data) {
                $rootScope.spin = false;
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
                    text: 'The element was delete.',
                    button: 'OK',
                    type: 'blue',
                    event: function () {
                        $scope.domainControl.clear();
                    }
                };
            }, function (e) {
                console.log(e);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'An error ocurred during the delete of the Area.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
                return;
            });
        };

        // MARK: - POST Guarda un KPI
        $scope.kpiControl = {};
        $scope.saveKpi = function (name, shortname, level) {
            $rootScope.spin = true;
            var kpi = new $apikpi();
            kpi.LDESC = name;
            kpi.SDESC = shortname;
            kpi.TIPO = level;
            kpi.$save(
                function (data) {
                    $rootScope.spin = false;
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

        $scope.updateKpi = function (id, name, shortname, level) {
            $rootScope.spin = true;
            var kpi = new $apikpi();
            kpi.KPID = id;
            kpi.LDESC = name;
            kpi.SDESC = shortname;
            kpi.TIPO = level;
            kpi.$update(
                function (data) {
                    $rootScope.spin = false;
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
            $rootScope.spin = true;
            var kpi = new $apikpi();
            kpi.$delete({
                id: id
            }, function (data) {
                $rootScope.spin = false;
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
                    text: 'The element was delete.',
                    button: 'OK',
                    type: 'blue',
                    event: function () {
                        $scope.domainControl.clear();
                    }
                };
            }, function (e) {
                console.log(e);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'An error ocurred during the delete of the KPI.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
                return;
            });
        };




        // MARK: - POST Guarda una Aplicación
        $scope.aplicacionControl = {};
        $scope.saveAplicacion = function (name) {
            var isReady = false;
            $rootScope.spin = true;
            if (isReady) {
                var aplicacion = new $apiaplicaciones();
                aplicacion.LDESC = name;
                aplicacion.$save(function (data) {
                    console.log(data);
                    $rootScope.spin = false;
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
                    $rootScope.spin = false;
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'ERROR',
                        text: 'You have not permission to create the Application in Database',
                        button: 'OK',
                        type: 'red',
                        event: function () {}
                    };
                });
            } else {
                $rootScope.spin = false;
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'You have not permission to create the Application in Database',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
            }
        };

        $scope.updateAplicacion = function (id, name) {
            var isReady = false;
            $rootScope.spin = true;
            if (isReady) {
                var aplicacion = new $apiaplicaciones();
                aplicacion.id = id;
                aplicacion.LDESC = name;
                aplicacion.$update(function (data) {
                    $rootScope.spin = false;
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'DONE',
                        text: 'The element does not have permission to be updated in Database.',
                        button: 'OK',
                        type: 'red',
                        event: function () {
                            $scope.aplicacionControl.clear();
                        }
                    };
                }, function (e) {
                    console.log(e);
                    $rootScope.spin = false;
                    $rootScope.showAlert = true;
                    $scope.contentAlert = {
                        title: 'ERROR',
                        text: 'The element does not have permission to be updated in Database.',
                        button: 'OK',
                        type: 'red',
                        event: function () {}
                    };
                });
            } else {
                $rootScope.spin = false;
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'The element does not have permission to be updated in Database.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
            }
        };

        $scope.deleteAplicacion = function () {
            var isReady = false;

            if (isReady) {

            } else {
                $rootScope.spin = false;
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'The element does not have permission to be updated in Database.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
            }
        };

        $scope.deleteKpi = function (id) {
            $rootScope.spin = true;
            
            var aplicacion = new $apiaplicaciones();
            
            aplicacion.$delete({
                id: id
            }, function (data) {
                $rootScope.spin = false;
                console.log(data);
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'DONE',
                    text: 'The element was delete.',
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
            $rootScope.spin = true;
            Upload.upload({
                url: 'http://14.128.82.183:14501/ITBook/Macroprocesos',
                data: obj
            }).then(function (data) {
                $rootScope.spin = false;
                console.log(data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            });
        };

        // MARK: - POST Guarda un Macroproceso FormData
        $scope.saveMacroFromFormData = function (obj) {
            $rootScope.spin = true;
            var uploadUrl = 'http://14.128.82.183:14501/ITBook/Macroprocesos';
            var fd = new FormData();
            fd.append('attach', obj.attach);
            fd.append('operative', obj.operative);
            fd.append('objmacro', obj.objmacro);
            $http
                .post(uploadUrl, fd, {

                    transformRequest: function (data, headersGetterFunction) {
                        $rootScope.spin = false;
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
    Controller.$inject = ['$scope', '$rootScope', '$abcCreate', '$apidominio', '$apimegaproceso', '$apimacroproceso', '$apiarea', '$apikpi', 'Upload', '$http', '$window', '$abcUpdate', '$apiaplicaciones', '$apimacroprocesodesc'];
    angular
        .module('mAbc')
        .controller('AbcCreateController', Controller);
})();