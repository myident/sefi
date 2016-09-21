/* global angular */

(function () {

    var Controller = function ($scope, $rootScope, $aplicaciones, $window, $apidominio, $apimegaproceso, $apimacroproceso, $apiarea, $apikpi, $apiaplicaciones, $abcUpdate) {
        $scope.regresar = function(){
            $window.history.back();
        };
        
        $rootScope.showAlert = false;

        $rootScope.spin = true;
        // $scope.aplicaciones = $aplicaciones.query(function () {
        //     $scope.viewer.setting($scope.aplicaciones);
        // });

        $scope.typeContentList = [
            {
                name: 'All contents',
                id: -1
            },
            {
                name: 'Dominio',
                id: 0
            },
            {
                name: 'Megaproceso',
                id: 1
            },
            {
                name: 'Macroproceso',
                id: 2
            },
            {
                name: 'Areas',
                id: 3
            },
             {
                name: 'KPI',
                id: 4
            }
            // ,
            // {
            //     name: 'Aplicaciones',
            //     id: 5
            // }
        ];

        $scope.list = [];
        $scope.init = function(){
            $scope.apidominio = $apidominio.query(function () {
                $rootScope.spin = false;
                $scope.join($scope.list, $scope.apidominio, 'Dominio',0, 'name');
                $scope.apimegaproceso = $apimegaproceso.query(function () {
                    $scope.join($scope.list, $scope.apimegaproceso, 'Megaproceso',1, 'title');
                    $scope.apimacroproceso = $apimacroproceso.query(function () {
                        $scope.join($scope.list, $scope.apimacroproceso, 'Macroproceso',2, 'title');
                        // $scope.apiarea = $apiarea.query(function () {
                        //     $scope.join($scope.list, $scope.apiarea, 'Areas',3, 'area_desc');
                            $scope.apikpi = $apikpi.query(function () {
                            $scope.join($scope.list, $scope.apikpi, 'KPI',4, 'name');
                            $scope.aplicaciones = $scope.list;
                            $scope.viewer.setting($scope.list);
                                // $scope.apiaplicaciones = $apiaplicaciones.query(function () {
                                //     $scope.join($scope.list, $scope.apiaplicaciones, 'Aplicaciones',5, 'name');
                                //     $scope.aplicaciones = $scope.list;
                                //     $scope.viewer.setting($scope.list);
                                // });
                            });
                        // });
                    });
                });
            }, function(e){
                console.log(e);
                $rootScope.spin = false;
                $rootScope.showAlert = true;
                $scope.contentAlert = {
                    title: 'ERROR',
                    text: 'An error ocurred with the connection.',
                    button: 'OK',
                    type: 'red',
                    event: function () {}
                };
                return;
            });
            
       };

        $scope.join = function(list,listTemp, type, id, name){
            for(var i = 0; i < listTemp.length; i++){
                var item = {
                    name: listTemp[i][name] || '',
                    type: type,
                    obj: listTemp[i],
                    id: id
                };
                list.push(item);
            }
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
            $abcUpdate.update = true;
            for(var i in $abcUpdate.show){$abcUpdate.show[i] = false};
            $abcUpdate.show[item.id] = true;
            $abcUpdate.obj = item;
            $window.location = '#/abc-create';

        };

        $scope.init();
    };

    Controller.$inject = ['$scope', '$rootScope', '$aplicaciones', '$window', '$apidominio','$apimegaproceso', '$apimacroproceso', '$apiarea', '$apikpi', '$apiaplicaciones', '$abcUpdate'];

    angular
        .module('mAbc')
        .controller('abcConsultController', Controller);
})();