/* global angular */
(function(){
	angular.module('mAbc').factory('$apimacroproceso',function($resource, $singleton){
		return $resource($singleton.path+'Macroprocesos/:id');
	});
	angular.module('mAbc').factory('$apimacroprocesodesc',function($resource, $singleton){
		return $resource($singleton.path+'Macrodesc/:id');
	});
})();