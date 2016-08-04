/* global angular */

(function () {

    var service = function ($vash) {
        return {
            dimensions: function (source, view, organiceBy, show) {

                var processes,capabilities,sortAreas,labels;
                var offset = {x : 20, y: 20};

                var htmlObject = function(w, h, offset){ 
                        this.offset = offset || { x : 0 , y : 0 };
                        this.width = w || 0; 
                        this.height = h || 0; 
                    };

                processes = function(processesArr,offset){

                    var width = 200;
                    var height = 500;

                    offset.x +=(width/2);

                    for(var i in processesArr){
                        
                        var process = processesArr[i];
                        var html = {};
                        // rect
                        html.rect = new htmlObject(width, height, { x:offset.x, y : offset.y + (height / 2) });
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
                        offset.y = 20;
                    }
                };
                capabilities = function(capabilitiesArr,offset){
                    var width = 150;
                    var height = 100;
                    var marginBottom = 20;
                    offset.y = offset.y + 120;

                    for(var i in capabilitiesArr){
                        var capability = capabilitiesArr[i];
                        var html = {};
                        html.rect = new htmlObject(width, height, { x:offset.x, y : offset.y + (height / 2) });
                        html.textBox = new htmlObject(width, height, { x:offset.x, y : offset.y + (height / 2) });
                        capability.html = html;

                        offset.y += height;

                        console.log(capability);
                        (show === 1) && sortAreas(capability.sortAreas.areas, offset);
                        (show === 2) && sortAreas(capability.sortAreas.applications, offset);
                        (show === 3) && sortAreas(capability.sortAreas.kpis, offset);

                        offset.y +=marginBottom;
                    }    
                };
                sortAreas = function(arr, offset){
                    

                    for(var i in arr){
                        var label = arr[i];
                        labels(label,offset);
                    }
                    
                };

                labels = function(item, offset){
                    var width = 150;
                    var height = 20;

                    var html = {};
                    html.rect = new htmlObject(width, height, { x:offset.x, y : offset.y + (height / 2) });
                    html.textBox = new htmlObject(width, height, { x:offset.x, y : offset.y + (height / 2) });
                    item.html = html;
                    offset.y +=height;
                };

                cloneCapabilities = function(source){
                    // cloneCapabilitie
                };

                (show === 2) && cloneCapabilities(source.processes);
                processes(source.processes,offset);
            }
    };

};
    angular
        .module('mDiagrama')
        .service('$setting', service);
    
})();