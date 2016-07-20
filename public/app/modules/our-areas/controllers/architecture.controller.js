/*global angular*/
/*jslint browser:true*/
(function () {
    var controller = function ($scope, $window, $rootScope) {
        
        $rootScope.spin = false;

        $scope.go = function(value) {
            $window.location = '#/areas/arquitectura/trayectoria/' + value;  
        };
        // MARK: - Dimensions

        $scope.vh = Math.max(document.documentElement.clientHeight, $window.innerHeight || 0);

        $scope.fotoEstrategiasOffsetY = 2754 + $scope.vh + 10;
        $scope.infoEstrategiasOffsetY = $scope.fotoEstrategiasOffsetY + 200;
        
        $scope.getTimeLineAreasStyle = function() {
            return {
                'height': ($scope.fotoEstrategiasOffsetY - $scope.vh + 100) + 'px'
            };
        };
        
        $scope.getTimeLineContentsStyle = function() {
            return {
                'top': ($scope.fotoEstrategiasOffsetY + 280) + 'px'
            };
        };
        
        $scope.getOrangeIconStyle = function() {
            return {
                'top': ($scope.fotoEstrategiasOffsetY + 200) + 'px'
            };
        };

        $scope.getIconStyle = function (value) {
            var icons = {
                'default': 'default',
                'Business Architecture': 'business-arch',
                'Application  & Data Architecture': 'app-data',
                'Technology Architecture': 'tech-arch',
                'Big Data and Data Science': 'big-data',
                'IT Governance': 'it-gov',
                'Digital Experience': 'digital-exp'
            };

            return icons[value] || icons['default'];
        };
        
        

        $scope.introPager = true;
        $scope.areasPager = false;
        $scope.contentsPager = false;

        $scope.getScroll = function (value) {

            $scope.introPager = true;
            $scope.areasPager = false;
            $scope.contentsPager = false;

            if (value > $scope.vh) {
                $scope.introPager = false;
                $scope.areasPager = true;
                $scope.contentsPager = false;
            }

            if (value > ($scope.fotoEstrategiasOffsetY - 300)) {
                $scope.introPager = false;
                $scope.areasPager = false;
                $scope.contentsPager = true;
            }


        };



        // MARK: - Areas

        $scope.areas = [
            {
                titulo: 'Business Architecture',
                descripcion: 'Business Architecture defines the strategy, structure and key processes of the organization based on the requirements of the Business areas. BA define the processes that are affected by these requirements, preparing the necessary documents to define the macroprocesses, their applications and their KPI`s .\\n  BA also elaborates detailed processes with business rules and involved applications and areas in order to provide Applications Business area the necessary information to meet the needs of Business Requirements.',
                director: 'Pablo Roberto Torres Tavera',
                id_trayectoria: 6,
                puesto: 'Business Architecture Director',
                foto: ''
            },
            {
                titulo: 'Application  & Data Architecture',
                descripcion: 'Application  & Data Architecture Area is responsible of providing a solution for each requirement asked by a business area. It determines the interactions between the systems and their relationships with the processes designed by the Business Architecture Area in order to fully cover the needs of the business areas.',
                director: 'José Fernando Sánchez Ruiz',
                id_trayectoria: 3,
                puesto: 'Application  & Data Architecture Director',
                foto: ''
            },
            {
                titulo: 'Technology Architecture',
                descripcion: 'Information Technology Architecture works in the process of development of methodical information technology specifications, models and guidelines. Information Technology Architecture can also be defined as a high-level map or plan of the information assets in an organization, including the physical design of the building that holds the hardware.\\n Nowadays, Technology Architecture is a key asset to keep the company innovating in order to have a competitive advantage.',
                director: 'Humberto Niño Román',
                id_trayectoria: 2,
                puesto: 'Technology Architecture Director',
                foto: ''
            },
            {
                titulo: 'Digital Experience',
                descripcion: 'In Digital Experience we build experiences purposefully crafted to fulfill human needs that both enhance and add to the AT&T eco-system. Digital Experience transforms business needs into digital products specifically made for each user. \\n We create and improve existent processes and solutions in order to generate positive experiences and satisfy every user needs.',
                id_trayectoria: 8,
                director: 'Franz Carlos Martínez Morales',
                puesto: 'Digital Experience Director',
                foto: ''
            },
            {
                titulo: 'Big Data and Data Science',
                descripcion: 'Big Data and Data Science provide to the organization reliable information for decision making through mathematical and statistical models, with flexible data foundations and using a holistic and agnostic view.',
                director: 'María Eugenia Ayala Porras',
                id_trayectoria: 4,
                puesto: 'Big Data and Data Science Director',
                foto: ''
            },
            {
                titulo: 'IT Governance',
                descripcion: 'IT Governance main responsibilities are: To create clarity between business goals and IT Projects, drawing the links between business and project objectives Management of the release plan, describing graphically the upcoming of the solution initiativesPlanning the IT workforce, ensuring IT have the right number and the right people as collaboratorsVendor Management, managing information related with third parties working with ITMonitoring  the building of IT Enterprise Architecture',
                director: 'Erika Zaragoza Bermeo',
                id_trayectoria: 5,
                puesto: 'Governance Assistant Director',
                foto: ''
            }
        ];


        //MARK: - Viewer

        $scope.contents = [
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2016',
                img: '1466033498_Excel.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2016',
                img: '1466033498_Excel.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        },
            {
                name: 'Estrategia 2014',
                img: '1466033485_Powerpoint.png'
		        },
            {
                name: 'Estrategia 2015',
                img: '1466033491_Word.png'
		        }
		     ];

        $scope.viewer = {};

        $scope.viewer.itemsCount = 12;

        $scope.viewer.items = [];

        $scope.viewer.change = function (index) {
            $scope.viewer.start = index;
            $scope.viewer.items = [];
            var end = (index + $scope.viewer.itemsCount) < $scope.contents.length ? (index + $scope.viewer.itemsCount) : $scope.contents.length;
            for (var i = index; i < end; i++) {
                $scope.viewer.items.push($scope.contents[i]);
                $scope.viewer.end = i;
            }
            $scope.viewer.indexPageNow = $scope.viewer.indexPage();
        };

        $scope.viewer.indexPage = function () {
            return Math.floor($scope.viewer.start / $scope.viewer.itemsCount);
        };

        $scope.viewer.forw = function () {
            if ($scope.viewer.start + $scope.viewer.itemsCount < $scope.contents.length) {
                $scope.viewer.change($scope.viewer.start + $scope.viewer.itemsCount);
            }
        };

        $scope.viewer.back = function () {
            if ($scope.viewer.start - $scope.viewer.itemsCount >= 0) {
                $scope.viewer.change($scope.viewer.start - $scope.viewer.itemsCount);
            }
        };

        $scope.viewer.goTo = function (index) {
            $scope.viewer.change(index * $scope.viewer.itemsCount);
        };

        $scope.viewer.setting = function () {
            $scope.viewer.pages = [];
            $scope.viewer.pagesCount = Math.ceil($scope.contents.length / $scope.viewer.itemsCount);
            for (var i = 0; i < $scope.viewer.pagesCount; i++) {
                $scope.viewer.pages.push({
                    number: (i + 1),
                    active: false
                });
            }
            $scope.viewer.change(0);
        };

        $scope.viewer.setting();
    };
    
    controller.$inject = ['$scope', '$window', '$rootScope'];
    
    angular
        .module('mArchitecture').controller('ArchController', controller);
})();