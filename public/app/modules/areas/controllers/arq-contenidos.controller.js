/*global angular*/

(function () {
    var Controller = function($scope) {
        $scope.open = false;
        $scope.toggleOpen = function() {
            $scope.open = !$scope.open;
        };

        $scope.contents = [
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2016',
		        	img:'1466033498_Excel.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2016',
		        	img:'1466033498_Excel.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        },
		        {
		        	name:'Estrategia 2014',
		        	img:'1466033485_Powerpoint.png'
		        },
		        {
		        	name:'Estrategia 2015',
		        	img:'1466033491_Word.png'
		        }
		     ];

		$scope.viewer = {};
		
		$scope.viewer.itemsCount = 12;
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

		$scope.viewer.setting = function(){
			$scope.viewer.pages = [];
			$scope.viewer.pagesCount = Math.ceil($scope.contents.length / $scope.viewer.itemsCount);
			for(var i = 0 ; i < $scope.viewer.pagesCount ; i++){
				$scope.viewer.pages.push({ number:(i+1), active:false });
			}
			$scope.viewer.change(0);
		};

		$scope.viewer.setting();

		

    };
    Controller.$inject = ['$scope'];
    angular.module('mAreas').controller('ArqContenidosController', Controller);
})();