(function(){
	angular.module().factory('Kpi',function($source, $singleton){
		return $resource($singleton.path+'Dominio/:id');
	});
})();