/*global angular*/

(function () {
    var Controller = function($scope) {
        $scope.open = false;
        $scope.toggleOpen = function() {
            $scope.open = !$scope.open;
        };

        $scope.contents = [
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:''
		        }
		     ];

		$scope.viewer = {};
		$scope.viewer.itemsCount = 12;
		$scope.viewer.items = [];
		$scope.viewer.change = function(index){

			$scope.viewer.start = index;
			$scope.viewer.items = [];
			for(var i = index ; i < $scope.viewer.itemsCount ; i++){
				$scope.viewer.items.push($scope.contents[i]);
				$scope.viewer.end = i;
			}
		};

		$scope.viewer.forw = function(){
			$scope.viewer.change($scope.viewer.start + itemsCount);
		};
		$scope.viewer.back = function(){
			$scope.viewer.change($scope.viewer.start - itemsCount);
		};
		$scope.goTo = function(index){
			$scope.viewer.change(--index * itemsCount);
		};

		$scope.viewer.change(0);

    };
    Controller.$inject = ['$scope'];
    angular.module('mAreas').controller('ArqContenidosController', Controller);
})();