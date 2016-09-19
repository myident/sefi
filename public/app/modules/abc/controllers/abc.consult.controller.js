/* global angular */

(function () {

    var Controller = function ($scope, $rootScope, $aplicaciones, $window, $apidominio, $apimegaproceso, $apimacroproceso, $apiarea, $apikpi, $apiaplicaciones) {
        $scope.regresar = function(){
            $window.history.back();
        };
        
        $rootScope.spin = false;
        // $scope.aplicaciones = $aplicaciones.query(function () {
        //     $scope.viewer.setting($scope.aplicaciones);
        // });

        $scope.typeContentList = [
            {
                name: 'All contents',
                id: 0
            },
            {
                name: 'Dominio',
                id: 1
            },
            {
                name: 'Megaproceso',
                id: 2
            },
            {
                name: 'Macroproceso',
                id: 1
            },
            {
                name: 'Areas',
                id: 2
            },
             {
                name: 'KPI',
                id: 1
            },
            {
                name: 'Aplicaciones',
                id: 2
            }
        ];

        $scope.list = [];
        $scope.init = function(){
            $scope.apidominio = $apidominio.query(function () {
                $scope.join($scope.list, $scope.apidominio, 'Dominio', 'name');
                $scope.apimegaproceso = $apimegaproceso.query(function () {
                    console.log($scope.apimegaproceso);
                    $scope.join($scope.list, $scope.apimegaproceso, 'Megaproceso', 'title');
                    $scope.apimacroproceso = $apimacroproceso.query(function () {
                        $scope.join($scope.list, $scope.apimacroproceso, 'Macroproceso', 'title');
                        $scope.apiarea = $apiarea.query(function () {
                            $scope.join($scope.list, $scope.apiarea, 'Areas', 'area_desc');
                            $scope.apikpi = $apikpi.query(function () {
                            $scope.join($scope.list, $scope.apikpi, 'KPI', 'name');
                                $scope.apiaplicaciones = $apiaplicaciones.query(function () {
                                    $scope.join($scope.list, $scope.apiaplicaciones, 'Aplicaciones', 'name');
                                    $scope.aplicaciones = $scope.list;
                                    $scope.viewer.setting($scope.list);
                                });
                            });
                        });
                    });
                });
            });
            
       };

        $scope.join = function(list,listTemp, type, name){
            for(var i in listTemp){
                var item = {
                    name: listTemp[i][name] || '',
                    type: type,
                    obj: listTemp[i]
                };
                list.push(item);
            }
            console.log(type);
            console.log(list.length);
            console.log(list);
        };


        $scope.goProcesos = function () {
            $window.history.back();
        };

        $scope.abc = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

        $scope.viewer = {};

        $scope.viewer.filterBy = 'all';

        var h = $window.innerHeight;
        var rows = (Math.floor((h - 400) / 46)) * 3;
        $scope.viewer.itemsCount = rows;
        $scope.viewer.items = [];
        $scope.viewer.change = function (index) {

            console.log(index);
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

        $scope.viewer.setting = function (aplicaciones) {
            $scope.contents = aplicaciones;
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

        $scope.viewer.findAll = function (str) {
            $scope.viewer.filterBy = 'all';
            $scope.typeContent = {};
            $scope.viewer.setting($scope.aplicaciones);
        };

        $scope.find = function (str) {
            $scope.viewer.filterBy = str === '' ? 'all' : '';
            $scope.typeContent = {};
            str = str.toUpperCase();
            var regExp = new RegExp(str);
            var arr = [];
            for (var i = 0; i < $scope.aplicaciones.length; i++) {
                if (regExp.test($scope.aplicaciones[i].name.toUpperCase())) {
                    arr.push($scope.aplicaciones[i]);
                }
            }
            $scope.viewer.setting(arr);
        };

        $scope.findByCapital = function (str) {
            $scope.viewer.filterBy = str;
            $scope.filterModel = '';
            $scope.typeContent = {};
            str = str.toUpperCase();
            var regExp = new RegExp('^[' + str + ']');
            var arr = [];
            for (var i = 0; i < $scope.aplicaciones.length; i++) {
                if (regExp.test($scope.aplicaciones[i].name.toUpperCase())) {
                    arr.push($scope.aplicaciones[i]);
                }
            }
            $scope.viewer.setting(arr);
        };

        $scope.toggleActiveButton = function(obj){
            obj.name === 'All contents' ? $scope.viewer.findAll() : (function(){
                $scope.viewer.filterBy = obj.name;
                var arr = [];
                for (var i = 0; i < $scope.aplicaciones.length; i++) {
                    if ($scope.aplicaciones[i].type === obj.name) {
                        arr.push($scope.aplicaciones[i]);
                    }
                }
                $scope.viewer.setting(arr);
            })();
            
        };

        $scope.click = function(item){
            console.log(item);
        };

        $scope.init();
    };

    Controller.$inject = ['$scope', '$rootScope', '$aplicaciones', '$window', '$apidominio','$apimegaproceso', '$apimacroproceso', '$apiarea', '$apikpi', '$apiaplicaciones'];

    angular
        .module('mAbc')
        .controller('abcConsultController', Controller);
})();