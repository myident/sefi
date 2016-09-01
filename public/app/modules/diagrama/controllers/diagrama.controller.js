/*global angular*/

(function () {
    var Controller = function ($scope, $rootScope, $window, $indice, $historial, $barraHerramientas) {

        $rootScope.spin = false;

        // indice
        $scope.arquitecturas = {};
        $scope.arquitectura = {};
        $scope.dominios = [];
        $scope.megaprocesos = [];
        $scope.macroprocesos = [];
        $scope.procesos = [];
        
        $scope.areasList = $indice.areasList();

        // historial
        $scope.historial = [];

        // barra herramientas
        $scope.view = $barraHerramientas.view;
        $scope.organize = $barraHerramientas.organize;
        $scope.show = $barraHerramientas.show;
        $scope.zoom = $barraHerramientas.zoom;

        

        // $indexes
        var $indexArquitectura = $indice.$indexArquitectura || 0;
        var $indexDominio = $indice.$indexDominio || 0;
        var $indexMegaproceso = $indice.$indexMegaproceso || 0;
        var $indexMacroproceso = $indice.$indexMacroproceso || 0;

        // init arquitecturas, dominios, megaprocesos
        // $scope.arquitecturas = $indice.arquitecturas(
        //     function (data) {
        //         $scope.arquitectura = data.arquitectura[$indexArquitectura];
        //         if (data.arquitectura[$indexArquitectura].dominios.length) {
        //             // Update Dominios
        //             $scope.dominios = data.arquitectura[$indexArquitectura].dominios;
        //             $scope.dominios[$indexDominio].open = true;
        //             // Update Historial
        //             $scope.historial = $historial.update(
        //                 $scope.arquitectura.name,
        //                 $scope.dominios[$indexDominio].title);
        //             // Update megaprocesos
        //             $scope.megaprocesos = $indice.megaprocesos(
        //                 $scope.dominios[$indexDominio].id,
        //                 function () {

                            
        //                 });
        //         }
        //     });

        //MARK: - getter Megaprocesos
        $scope.getMegaprocesos = function (value, index) {
            $scope.megaprocesos = $indice.megaprocesos(
                value,
                function () {
                    // Update Historial
                    $scope.historial = $historial.update(
                        $scope.arquitectura.name,
                        $scope.dominios[index].title);
                    // Update indexDominio
                    $indexDominio = index;
                });
        };
        //MARK: - getter Macroprocesos
        $scope.getMacroprocesos = function (value, index) {
            console.log('Macros');
            console.log(value);
            console.log(index);
            $scope.macroprocesos = $indice.macroprocesos(
                value,
                index,
                function (data) {
                    // Update Historial
                    $scope.historial = $historial.update(
                        $scope.arquitectura.name,
                        $scope.dominios[$indexDominio].title,
                        $scope.megaprocesos[index].title);
                    // Update indexMegaproceso
                    $indexMegaproceso = index;
                    // Update Macroprocesos
                    $scope.megaprocesos[index].macroprocesos = data;
                });
        };
        //MARK: - getter Procesos
        // $scope.getProcesos = function (value, index) {
        //     console.log('Procesos');
        //     console.log(value);
        //     console.log(index);
        //     $indice.procesos(
        //         value,
        //         index,
        //         function (data) {
        //             // Update Historial
        //             $scope.historial = $historial.update(
        //                 $scope.arquitectura.name,
        //                 $scope.dominios[$indexDominio].title,
        //                 $scope.megaprocesos[$indexMegaproceso].title,
        //                 $scope.macroprocesos[index].title);
        //             // Update Procesos
        //             $scope.procesos = data.procesos;
        //             console.log(data);
        //             $scope.source = {procesos: ddata.procesos, kpis:ddata.procesos, areas: ddata.areas};
        //         });
        // };

        $scope.source = {procesos: ddata.procesos, kpis:ddata.procesos, areas: ddata.areas};
        // $scope.source = {
        //     procesos: []
        // };

        //MARK: - getter View
        $scope.getView = function (value) {
            // Update view
            $scope.view = value;
            $barraHerramientas.view = value;
        };
        //MARK: - getter Organize
        $scope.getOrganize = function (value) {
            // Update organize
            $scope.organize = value;
            $barraHerramientas.organize = value;
        };
        //MARK: - getter Show
        $scope.getShow = function (value) {
            // Update show
            $scope.show = value;
            $barraHerramientas.show = value;
        };
        //MARK: - getter Zoom
        $scope.getZoom = function(value) {
            $scope.zoom = value;
            $barraHerramientas.zoom = value;
        };
        // MARK: - getter Print
        $scope.getPrint = function() {
            $scope.printPDF('pdf');
        };
        
        $scope.getSVG = function(value){
            console.log(value);
        };
        

        //MARK: - Regresar
        $scope.regresar = function () {
            $window.history.back();
        };

        

    };

    Controller.$inject = ['$scope', '$rootScope', '$window', '$indice', '$historial', '$barraHerramientas'];

    angular
        .module('mDiagrama').controller('DiagramaController', Controller);
})();

var ddata = {
  "id": 0,
  "title": "null",
  "open": false,
  "aplicaciones": [
    {
      "text": "Invoice Gateway"
    },
    {
      "text": "Maximage"
    },
    {
      "text": "INAR"
    },
    {
      "text": "Oracle Financials Application"
    },
    {
      "text": "OPUS"
    },
    {
      "text": "Customer Account Payment Management"
    },
    {
      "text": "Amdocs"
    },
    {
      "text": "Amdocs Billing"
    },
    {
      "text": "AT&T API"
    },
    {
      "text": "AT&T Blacklist Mangement"
    },
    {
      "text": "eDOC"
    },
    {
      "text": "ICAS"
    },
    {
      "text": "IVR"
    },
    {
      "text": "MEC"
    },
    {
      "text": "NPS"
    },
    {
      "text": "OMS"
    },
    {
      "text": "Opus Validator"
    },
    {
      "text": "Oracle GL"
    },
    {
      "text": "SRM"
    },
    {
      "text": "Coexistence"
    },
    {
      "text": "Welcome center OPUS"
    },
    {
      "text": "ASD"
    }
  ],
  "procesos": [
    {
      "name": "Queue Management",
      "selected": false,
      "capacidades": [
        {
          "name": "Customer Billing System Identification",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Credit",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          }
        },
        {
          "name": "Customer Identification",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          }
        }
      ],
      "reglas": [
        {
          "id": 1,
          "name": "Customer Identification",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "",
          "pactual": 1,
          "psiguiente": 2,
          "caminos": 0,
          "idfigura": 1,
          "desviacion": []
        },
        {
          "id": 2,
          "name": "Customer Billing System Identification",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "IT",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "",
          "pactual": 2,
          "psiguiente": 3,
          "caminos": 0,
          "idfigura": 1,
          "desviacion": []
        },
        {
          "id": 3,
          "name": "Capture billing/personal information – name, DOB, SSN",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "",
          "pactual": 3,
          "psiguiente": 4,
          "caminos": 0,
          "idfigura": 1,
          "desviacion": []
        },
        {
          "id": 4,
          "name": "Contact info (phone, e-mail and billing address)",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "",
          "pactual": 4,
          "psiguiente": 5,
          "caminos": 0,
          "idfigura": 1,
          "desviacion": []
        },
        {
          "id": 5,
          "name": "Correct Data",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "NO",
          "pactual": 5,
          "psiguiente": 3,
          "caminos": 0,
          "idfigura": 3,
          "desviacion": []
        },
        {
          "id": 5,
          "name": "Correct Data",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "YES",
          "pactual": 5,
          "psiguiente": 6,
          "caminos": 0,
          "idfigura": 3,
          "desviacion": []
        }
      ]
    },
    {
      "name": "Offer Type",
      "selected": false,
      "capacidades": [
        {
          "name": "Commercial Offer",
          "selected": false,
          "sortAreas": {
            "kpis": [
              {
                "name": "# Rate Plans",
                "selected": false
              }
            ],
            "aplicaciones": [
              {
                "id": 0,
                "name": "OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 350,
                    "name": "OPUS",
                    "selected": false
                  }
                ],
                "kpis": [
                  {
                    "name": "# Rate Plans",
                    "selected": false
                  }
                ]
              }
            ]
          }
        }
      ],
      "reglas": [
        {
          "id": 6,
          "name": "Welcome Center Add Customer Name OpusReason for Visit",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "",
          "pactual": 6,
          "psiguiente": 7,
          "caminos": 0,
          "idfigura": 1,
          "desviacion": []
        },
        {
          "id": 7,
          "name": "Display Customer Type(Postpaid, Hybrids without Credit Check)Residential, Anonymous or Business CustomerPhysical with business",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "",
          "pactual": 7,
          "psiguiente": 8,
          "caminos": 0,
          "idfigura": 1,
          "desviacion": []
        },
        {
          "id": 8,
          "name": "Postpaid With Credit Check",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "",
          "pactual": 8,
          "psiguiente": 9,
          "caminos": 0,
          "idfigura": 3,
          "desviacion": []
        },
        {
          "id": 8,
          "name": "Postpaid With Credit Check",
          "selected": false,
          "sortAreas": {
            "kpis": [],
            "aplicaciones": [
              {
                "id": 0,
                "name": "Welcome center OPUS",
                "selected": false
              }
            ],
            "areas": [
              {
                "name": "Sales Rep",
                "aplicaciones": [
                  {
                    "id": 410,
                    "name": "Welcome center OPUS",
                    "selected": false
                  }
                ],
                "kpis": []
              }
            ]
          },
          "type": "",
          "pactual": 8,
          "psiguiente": 10,
          "caminos": 0,
          "idfigura": 3,
          "desviacion": []
        }
      ]
    }
  ],
  "areas": [
    {
      "text": "Sales Rep"
    },
    {
      "text": "Credit"
    },
    {
      "text": "IT"
    }
  ],
  "kpis": [
    {
      "name": "# Rate Plans",
      "selected": false
    },
    {
      "name": "# Contract Orders",
      "selected": false
    },
    {
      "name": "# Customers",
      "selected": false
    },
    {
      "name": "# Contract Orders by status",
      "selected": false
    },
    {
      "name": "# Rate Plans",
      "selected": false
    },
    {
      "name": "# Port-In",
      "selected": false
    },
    {
      "name": "# Contracts",
      "selected": false
    },
    {
      "name": "# Warranties",
      "selected": false
    },
    {
      "name": "# Contracts",
      "selected": false
    },
    {
      "name": "# Contracts",
      "selected": false
    },
    {
      "name": "# Contract Orders",
      "selected": false
    },
    {
      "name": "# Devices",
      "selected": false
    },
    {
      "name": "# Contract Orders",
      "selected": false
    },
    {
      "name": "# Contract Orders",
      "selected": false
    },
    {
      "name": "# Contract Orders",
      "selected": false
    },
    {
      "name": "# Warranties",
      "selected": false
    },
    {
      "name": "# Contracts",
      "selected": false
    },
    {
      "name": "# Contracts",
      "selected": false
    }
  ]
};