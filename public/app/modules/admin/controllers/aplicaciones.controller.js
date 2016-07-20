/*global angular*/

(function () {
    var Controller = function($rootScope, $scope, $aplicaciones) {
       $scope.aplicaciones = $aplicaciones.query(function () {
			$scope.viewer.setting($scope.aplicaciones);
        });


        $scope.abc = ['A','B','C','D','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','V','W','X','Y','Z'];
        
        $scope.viewer = {};
		
		$scope.viewer.filterBy = 'all';

		$scope.viewer.itemsCount = 24;
		$scope.viewer.items = [];
		$scope.viewer.change = function(index){

			console.log(index);
			$scope.viewer.start = index;
			$scope.viewer.items = [];
			var end = (index + $scope.viewer.itemsCount) < $scope.contents.length ? (index + $scope.viewer.itemsCount) : $scope.contents.length;
			for(var i = index ; i < end ; i++){
				$scope.viewer.items.push($scope.contents[i]);
				$scope.viewer.end = i;
			}
			$scope.viewer.indexPageNow = $scope.viewer.indexPage();
		};

		$scope.viewer.indexPage = function(){
			return Math.floor($scope.viewer.start / $scope.viewer.itemsCount);
		}

		$scope.viewer.forw = function(){
			if($scope.viewer.start + $scope.viewer.itemsCount < $scope.contents.length){
				$scope.viewer.change($scope.viewer.start + $scope.viewer.itemsCount);
			}
		};
		$scope.viewer.back = function(){
			if($scope.viewer.start - $scope.viewer.itemsCount >= 0){
				$scope.viewer.change($scope.viewer.start - $scope.viewer.itemsCount);
			}
		};
		$scope.viewer.goTo = function(index){
			$scope.viewer.change(index * $scope.viewer.itemsCount);
		};

		$scope.viewer.setting = function(aplicaciones){
			$scope.contents = aplicaciones;
			$scope.viewer.pages = [];
			$scope.viewer.pagesCount = Math.ceil($scope.contents.length / $scope.viewer.itemsCount);
			for(var i = 0 ; i < $scope.viewer.pagesCount ; i++){
				$scope.viewer.pages.push({ number:(i+1), active:false });
			}
			$scope.viewer.change(0);
		};
		$scope.viewer.findAll = function(str){
			$scope.viewer.filterBy = 'all';
			$scope.viewer.setting($scope.aplicaciones);
		}
       $scope.find = function(str){


       	$scope.viewer.filterBy = str === '' ? 'all' : '';
       		str = str.toUpperCase();
			var regExp = new RegExp(str);
			var arr = [];
			for(var i = 0 ; i < $scope.aplicaciones.length; i++){
				if(regExp.test($scope.aplicaciones[i].name.toUpperCase())){
					arr.push($scope.aplicaciones[i]);
				}
			}
			$scope.viewer.setting(arr);
		};
		$scope.findByCapital = function(str){
			$scope.viewer.filterBy = str;
			$scope.filterModel = '';
			str = str.toUpperCase();
			var regExp = new RegExp('^['+str+']');
			var arr = [];
			for(var i = 0 ; i < $scope.aplicaciones.length; i++){
				if(regExp.test($scope.aplicaciones[i].name.toUpperCase())){
					arr.push($scope.aplicaciones[i]);
				}
			}
			$scope.viewer.setting(arr);
		};

    };
    Controller.$inject = ['$rootScope', '$scope', '$aplicaciones'];
    angular.module('mAdmin').controller('AplicacionesController', Controller);
})();