/* global angular */

(function () {

    var service = function ($vash) {
        return {
            dimensions: function (source, view, organiceBy, show) {

                var processes,capabilities,sortAreas;
                var offset = {x : 20, y: 20};

                var htmlObject = function(){ 
                        this.offset = { x : 0 , y : 0 };
                        this.width = 0; 
                        this.height = 0; 
                    };

                processes = function(processesArr,offset){
                    for(var i in processesArr){
                        var width = 200;
                        var height = 500;
                        var process = processesArr[i];
                        var html = {};
                        // rect
                        html.rect = new htmlObject();
                        html.rect.width = width;
                        offset.x = offset.x + (width / 2);
                        html.rect.height = height;
                        html.rect.offset.x = offset.x;
                        html.rect.offset.y = offset.y + (height / 2);
                        // rectHeader
                        html.rectHeader = new htmlObject();
                        // textBoxHeader
                        html.textBoxHeader = new htmlObject(); 
                        // circleHeader
                        html.circleHeader = new htmlObject();
                        // relationshipArrow
                        html.relationshipArrow = new htmlObject();
                        // relationship
                        html.relationship = [];

                        process.html = html;

                        console.log(process);
                        (view !== 0) && capabilities(process.capabilities, offset);
                    }
                };
                capabilities = function(capabilitiesArr,offset){
                    var width = 150;
                    var height = 100;
                    for(var i in capabilitiesArr){
                        var capability = capabilitiesArr[i];
                        var html = {};
                        // rect
                        html.rect = new htmlObject();
                        html.rect.width = width;
                        html.rect.height = height;
                        // textBox
                        html.textBox = new htmlObject();

                        capability.html = html;

                        console.log(capability);
                        (show === 1) && sortAreas(capabilitiesArr, i, capability.sortAreas.areas, offset);
                        (show === 2) && sortAreas(capabilitiesArr, i, capability.sortAreas.applications, offset);
                        (show === 3) && sortAreas(capabilitiesArr, i, capability.sortAreas.kpis, offset);
                    }    
                };
                sortAreas = function(capabilitiesArr, i, arr, offset){
                    var width = 150;
                    var height = 20;

                    var switchView = [
                        function(){// view 0

                        },function(){// view 1 - Areas

                        },function(){// view 2 - Applications
                            
                        },function(item){// view 3 -  KPI
                            var html = {};
                            // rect
                            html.rect = new htmlObject();
                            html.rect.width = width;
                            html.rect.height = height;
                            // textBox
                            html.textBox = new htmlObject();
                            html.textBox.height = height;
                            html.textBox.height = height;

                            item.html = html;
                        }
                    ];

                    for(var i in arr){
                        var item = arr[i];
                        switchView[show](item);
                    }
                    
                };

                processes(source.processes,offset);
            }
    };

};
    angular
        .module('mDiagrama')
        .service('$setting', service);
    
})();