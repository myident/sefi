/*global angular*/
(function () {

    var angularModules      = ["ngRoute","ngTouch", "ngResource", "ngAnimate", "angular-parallax"];
    
    var customModules       = ["mHome", "mProcesses", "mEcosistema", "mAreas","mAdmin", "mArchitecture"];
    
    var componentsModules   = ["mHeaderDirective", "mBackground", "Spin","mSlideview","mParagraph", "mGetdimensions", "mDiagrama"];
    
    var services            = ["mainService", "mVash", "Singleton", "Arquitecturas", "Dominios", "Megaprocesos", "Macroprocesos", "Procesos","Arquitecturaseco", "mPrint"];

    var modules = angularModules.concat(customModules,componentsModules, services);
    
    angular
        .module('app', modules);

})();