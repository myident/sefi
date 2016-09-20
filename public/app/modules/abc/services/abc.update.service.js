/* global angular */
(function() {
    var Service = function () {
        this.update = false;
        this.obj = {};
    };
    angular.module('mAbc').service('$abcUpdate', Service);
})();