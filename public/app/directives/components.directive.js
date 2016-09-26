(function(){
	var login = function(){
		return {
			restrict: 'E',
			require: 'ngModel',
		    scope: {
		    	btnSend:'&btnSend',
		    	message:'=message',
		    	toggleAlert:'=toggleAlert',
		    },
		    templateUrl: './templates/login.template.html',
		    link: function (scope, element, attr, ngModel) {
		    	scope.data = {};
		    	scope.toggleAlert = false;

		    	ngModel.$render = function(){
		    		scope.data 	= ngModel.$modelValue;
		    	};

		    	scope.keypress = function(event){
		    		if(event.which == 13){
		    			scope.send();
		    		}
		    	};

			    scope.send = function(){
			      	ngModel.$setViewValue(scope.data);
			      	if(scope.data.user == "" || scope.data.password == ""){
			      		scope.message = "Se necesita usuario y contraseña"
			      		scope.showAlert();
			      	}else{
			      		scope.hideAlert();
				      	scope.btnSend();
			      	}
			      	
			    };

		      	scope.showAlert = function(val){
		    		scope.toggleAlert = true;
		    	};
		    	scope.hideAlert = function(val){
		    		scope.toggleAlert = false;
		    	};

		    }
		}
	};

	var spin = function(){
		return {
			restrict: 'E',
			require: 'ngModel',
			scope: {},
		    templateUrl: './templates/spin.template.html',
		    link: function (scope, element, attr, ngModel) {

		    	scope.toggle = function(val){
		    		val ? element.removeClass('ng-hide') : element.addClass('ng-hide');
		    	};

		    	ngModel.$render = function(){
		    		scope.toggle(ngModel.$modelValue)
		    	};

		    	scope.$watch("model", function() {
		           scope.toggle(ngModel.$modelValue)
		        });

		    }
		}
	};

	angular.module('Components',[])
		.directive('login',login)
		.directive('spin',spin);
})();