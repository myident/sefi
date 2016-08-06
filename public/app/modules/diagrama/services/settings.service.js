/* global angular */

(function () {

    var service = function ($vash) {
        var htmlObject = function(w, h, offset, radio){ 
                        this.offset = offset || { x : 0 , y : 0 };
                        this.width = w || 0; 
                        this.height = h || 0;
                        this.radio = radio || 0;
                    };
        return {
            dimensions: function (source, areasList, view, organiceBy, show) {

                var processes,capabilities,sortAreas,labels,getOffsetX, getOffsetProcess;
                var offset = {x : 20, y: 40};
                var widthCapability = 150;
                var heightCapability = 100;
                var paddingProcess = 20;
                var heightHeader = 100;

                var positionCapabilitiesDefault = function(i){
                    var result = 120;
                    return i === 0 ? result : (result + (220*(i)));
                };

                getOffsetX = function(areaText){
                    for(var i in areasList){
                        var area = areasList[i];
                        if(areasList[i].text === areaText){
                            return area.html.offset.x;
                        }
                    }
                };

                getDimensionsProcess = function(capabilitiesList){
                    var obj = { offset:{} };
                    var maxY=0, minY=100000, maxX=0, minX=1000000;
                    for(var i in capabilitiesList){
                        var offset = capabilitiesList[i].html.rect.offset;
                        minY = (minY < offset.y) ? minY : offset.y;
                        maxY = (maxY > offset.y) ? maxY : offset.y;
                        minX = (minX < offset.x) ? minX : offset.x;
                        maxX = (maxX > offset.x) ? maxX : offset.x;
                    }
                    var heightLabels = capabilitiesList[capabilitiesList.length-1].labels.length*20;
                    obj.width = (maxX === minX) ? ( (paddingProcess*2 ) + widthCapability) : ( (paddingProcess* 2 ) + maxX - minX);
                    obj.height = (maxY === minY) ? ( (paddingProcess*2) + heightCapability + heightHeader) + heightLabels: (maxY - minY)+heightHeader+heightCapability + (paddingProcess*2) + heightLabels;
                    obj.offset.y = (maxY === minY) ? minY - (heightHeader/2) + (heightLabels/2) :  maxY - (obj.height/2) + (heightCapability/2)+20+heightLabels;
                    obj.offset.x = (maxX === minX) ? minX : (maxX - minX);
                    console.log( minY+" - "+ maxY);
                    return obj;
                }

                processes = function(processesList,offset){

                    var width = 200;
                    var height = 500;
                    var radio = 15;
                    var rectHeight = 100;

                    for(var i in processesList){
                        var process = processesList[i];                        
                        (show !== 0) && (function(){
                            offset.x = (organiceBy === 1) ? offset.x : positionCapabilitiesDefault(Number(i)) ;
                            capabilities(process.capacidades, offset);
                            offset.y = (organiceBy === 1) ? offset.y : 40;
                        })();
                    }
                    for( var i in processesList){
                        var process = processesList[i];
                        var html = {};

                        var heightHard = process.capacidades[process.capacidades.length-1].html.rect.offset.y;
                        var lastY = process.capacidades[process.capacidades.length-1].html.rect.offset.y / 2 + heightCapability - paddingProcess;
                        var obj = getDimensionsProcess(process.capacidades);
                        offset.x =  positionCapabilitiesDefault(Number(i));
                        offset.y = lastY;
                        offset  = (organiceBy === 1 ) ? obj.offset : offset;
                        width   = (organiceBy === 1 ) ? obj.width : width;
                        height  = (organiceBy === 1 ) ? obj.height : heightHard;

                        // rect
                        html.rect = new htmlObject(width, height, { x:offset.x, y : offset.y });
                        //html.rectHeader = new htmlObject(width, heightHeader, { x:offset.x, y : offset.y + (heightHeader / 2) });
                        // html.textBoxHeader = new htmlObject(width - 50, heightHeader, { x:offset.x - (width/2) + (radio*2)+20, y : offset.y + (heightHeader / 2) }); 
                        // html.circleHeader = new htmlObject(0,0,{ x:offset.x - (width/2) + radio + 10, y : offset.y + (heightHeader / 2) }, radio);
                        // html.textBoxCircleHeader = new htmlObject(radio*2,radio*2,{ x:offset.x - (width/2) + radio + 10, y : offset.y + (heightHeader / 2) });
                        // html.textBoxLabelCount = new htmlObject(width, heightHeader, { x:(offset.x+(width/2)-5), y : offset.y + 10 });
                        // html.relationshipArrow = new htmlObject();
                        // html.relationship = [];
                        process.html = html;
                        
                    }
                };
                capabilities = function(capabilitiesArr,offset){
                    
                    var marginBottom = 20;
                    offset.y = offset.y + 140;

                    for(var i in capabilitiesArr){
                        var capability = capabilitiesArr[i];
                        var html = {};
                        offset.x = (organiceBy === 1) ? getOffsetX(capability.area) : offset.x;
                        html.rect = new htmlObject(widthCapability, heightCapability, { x:offset.x, y : offset.y + (heightCapability / 2) });
                        html.textBox = new htmlObject(widthCapability, heightCapability, { x:offset.x, y : offset.y + (heightCapability / 2) });
                        capability.html = html;

                        offset.y += heightCapability;

                        capability.labels = [];
                        switch(show){
                            case 1: capability.labels = capability.sortAreas.areas; break;
                            case 2: capability.labels = capability.sortAreas.aplicaciones; break;
                            case 3: capability.labels = capability.sortAreas.kpis; break;
                            default: break;
                        }

                        sortAreas(capability.labels, offset);
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

                cloneCapabilities = function(processes){
                   for(var i = 0 ; i < processes.length; i++){
                        var process = processes[i];
                        for(var j = 0 ; j < process.capacidades.length ; j++){
                            var capability = process.capacidades[j];
                            for(var k = 0; k < capability.sortAreas.areas.length; k++){
                                var area = JSON.parse(JSON.stringify(capability.sortAreas.areas[k]));
                                
                                if(k === 0){
                                    capability.sortAreas.aplicaciones = area.aplicaciones;
                                    capability.sortAreas.kpis = area.kpis;
                                    capability.area = area.name;
                                }else{
                                    var capabilityTemp = JSON.parse(JSON.stringify(capability));
                                    capabilityTemp.clone = true;
                                    capabilityTemp.area = area.name;
                                    capabilityTemp.sortAreas.aplicaciones = area.aplicaciones;
                                    capabilityTemp.sortAreas.kpis = area.kpis;

                                    process.capacidades.splice(++j,0,capabilityTemp);                                }
                            }
                       }
                   }
                };

                (organiceBy === 1) && cloneCapabilities(source.procesos);
                processes(source.procesos,offset);
            },
        dimensionsAreas: function (source) {
            var width = 220;
            var height = 30;
            var offset = {x: ((width/2) - width), y: (height/2)};
            var fontSize = 16;

            for(var i in source){
                offset.x +=width
                var hrml = new htmlObject(width, height, { x: offset.x, y : offset.y });
                
                source[i].html = hrml;
            }
        }
    };

};
    angular
        .module('mDiagrama')
        .service('$setting', service);
    
})();