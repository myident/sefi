/* global angular */

(function () {

    var service = function ($vash) {
        return {
            dimensions: function (source, view, organiceBy, show) {

                var processes,capabilities,sortAreas,labels;
                var offset = {x : 20, y: 20};

                var htmlObject = function(w, h, offset, radio){ 
                        this.offset = offset || { x : 0 , y : 0 };
                        this.width = w || 0; 
                        this.height = h || 0;
                        this.radio = radio || 0;
                    };
                var positionCapabilitiesDefault = function(i){
                    var result = 120;
                    return i === 0 ? result : (result + (220*(i)));
                };

                processes = function(processesArr,offset){

                    var width = 200;
                    var height = 500;
                    var heightHeader = 100;
                    var radio = 15;

                    for(var i in processesArr){
                        
                        var process = processesArr[i];
                        var html = {};
                        var yTemp = offset.y;
                        offset.x = positionCapabilitiesDefault(Number(i));
                        console.log("offset.x");
                        console.log(offset.x);
                        // rect
                        html.rectHeader = new htmlObject(width, heightHeader, { x:offset.x, y : offset.y + (heightHeader / 2) });
                        html.textBoxHeader = new htmlObject(width - 50, heightHeader, { x:offset.x - (width/2) + (radio*2)+20, y : offset.y + (heightHeader / 2) }); 
                        html.circleHeader = new htmlObject(0,0,{ x:offset.x - (width/2) + radio + 10, y : offset.y + (heightHeader / 2) }, radio);
                        html.textBoxCircleHeader = new htmlObject(radio*2,radio*2,{ x:offset.x - (width/2) + radio + 10, y : offset.y + (heightHeader / 2) });
                        html.textBoxLabelCount = new htmlObject(width, heightHeader, { x:(offset.x+(width/2)-5), y : offset.y + 10 });
                        html.relationshipArrow = new htmlObject();
                        html.relationship = [];
                        process.html = html;

                        (view !== 0) && capabilities(process.capabilities, offset);
                        
                        var rectHeight = offset.y - yTemp;
                        html.rect = new htmlObject(width, rectHeight, { x:offset.x, y : yTemp + (rectHeight/2) });
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
                     console.log("Y");
                     console.log(offset.y);
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