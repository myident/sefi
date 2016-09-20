/* global angular */
(function() {
    var Service = function () {
    	this.update = false;
        this.show = [false,false,false,false,false,false];
        this.obj = {};
    };
    angular.module('mAbc').service('$abcUpdate', Service);
})();