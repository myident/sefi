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

                var type;
                var offset;
                var processes,capabilities,sortAreas,labels,getOffsetX, getOffsetProcess, intersections, getOffsetsTo;
                var offset = {x : 20, y: 40};
                var widthCapability = 150;
                var heightCapability = 100;
                var paddingProcess = 20;
                var heightHeader = 100;

                if(view === 2){
                    type = 'reglas';
                    offset = {x : 20, y: 150};
                }else{
                    type = 'capacidades';
                    offset = {x : 20, y: 40};
                }

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
                    var obj = { offset:{},width:0, };
                    var maxY=0, minY=100000, maxX=0, minX=1000000;
                    for(var i in capabilitiesList){
                        var offset = capabilitiesList[i].html.rect.offset;
                        minY = (minY < offset.y) ? minY : offset.y;
                        maxY = (maxY > offset.y) ? maxY : offset.y;
                        minX = (minX < offset.x) ? minX : offset.x;
                        maxX = (maxX > offset.x) ? maxX : offset.x;
                    }
                    var heightLabels = capabilitiesList[capabilitiesList.length-1].labels.length*20;
                    obj.width = (maxX === minX) ? ( (paddingProcess*2 ) + widthCapability) : ( (paddingProcess* 2 ) + maxX - minX) + widthCapability;
                    obj.height = (maxY === minY) ? ( (paddingProcess*2) + heightCapability + heightHeader) + heightLabels: (maxY - minY)+heightHeader+heightCapability + (paddingProcess*2) + heightLabels;
                    obj.offset.y = (maxY === minY) ? minY - (heightHeader/2) + (heightLabels/2) :  maxY - (obj.height/2) + (heightCapability/2)+20+heightLabels;
                    obj.offset.x = (maxX === minX) ? minX : ((maxX - minX)/2) + minX;
                    console.log( "x:"+minX+" - "+"x"+ maxX);
                    console.log( "y:"+minY+" - "+"y"+ maxY);
                    return obj;
                }

                processes = function(processesList,offset){

                    var width = 200;
                    var height = 100;
                    var radio = 15;
                    var rectHeight = 100;

                    if(view !== 0){
                        for(var i in processesList){
                            var process = processesList[i];                        
                            (view !== 0) && (function(){
                                offset.x = (organiceBy === 1) ? offset.x : positionCapabilitiesDefault(Number(i)) ;
                                switch(view){
                                    case 1: capabilities(process,process.capacidades, offset); break;
                                    case 2: capabilities(process,process.reglas, offset); break;
                                    default: break;
                                }
                                
                                offset.y = (organiceBy === 1) ? offset.y : 40;
                            })();
                        }
                        for( var i in processesList){
                            var process = processesList[i];
                            var html = {};

                            var heightHard = process.height + paddingProcess;
                            var obj;
                            switch(view){
                                    case 1: obj = getDimensionsProcess(process.capacidades); break;
                                    case 2: obj = getDimensionsProcess(process.reglas); break;
                                    default: break;
                                }
                            offset.x =  positionCapabilitiesDefault(Number(i));
                            offset.y = process.height / 2 + heightCapability - (paddingProcess*1.5);
                            offset  = (organiceBy === 1 ) ? obj.offset : offset;
                            width   = (organiceBy === 1 ) ? obj.width : width;
                            height  = (organiceBy === 1 ) ? obj.height : heightHard;

                            var offsetHeader = {x: offset.x, y:offset.y  - (height/2) + (heightHeader / 2) };
                            // rect
                            html.rect = new htmlObject(width, height, { x:offset.x, y : offset.y });
                            html.rectHeader = new htmlObject(width, heightHeader, { x:offsetHeader.x, y : offsetHeader.y});
                            html.textBoxHeader = new htmlObject(width - 50, heightHeader, { x:offsetHeader.x - (width/2) + (radio*2)+20, y : offsetHeader.y }); 
                            html.circleHeader = new htmlObject(0,0,{ x:offsetHeader.x - (width/2) + radio + 10, y : offsetHeader.y }, radio);
                            html.textBoxCircleHeader = new htmlObject(radio*2,radio*2,{ x:offsetHeader.x - (width/2) + radio + 10, y : offsetHeader.y });
                            html.textBoxLabelCount = new htmlObject(width, heightHeader, { x:(offsetHeader.x+(width/2)-5), y : offsetHeader.y - (heightHeader/2) + 10 });
                            // html.relationshipArrow = new htmlObject();
                            // html.relationship = [];
                            process.html = html;
                        }
                    }else{
                        offset.x = (width / 2) + 20;
                        offset.y = (height / 2) + 40;
                        for( var i in processesList){
                            var html = {};
                            var process = processesList[i];
                            html.rect = new htmlObject(width, height, { x:offset.x, y : offset.y });
                            html.rectHeader = new htmlObject(width, height, { x:offset.x, y : offset.y});
                            html.textBoxHeader = new htmlObject(width - 50, height, { x:offset.x - (width/2) + (radio*2)+20, y : offset.y }); 
                            html.circleHeader = new htmlObject(0,0,{ x:offset.x - (width/2) + radio + 10, y : offset.y }, radio);
                            html.textBoxCircleHeader = new htmlObject(radio*2,radio*2,{ x:offset.x - (width/2) + radio + 10, y : offset.y });
                            html.textBoxLabelCount = new htmlObject(width, heightHeader, { x:(offset.x+(width/2)-5), y : offset.y - (height/2) + 10 });
                            offset.x += width + 20;
                            process.html = html;
                        }
                    }
                };
                capabilities = function(process,capabilitiesArr,offset){
                    
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
                    process.height = offset.y - heightCapability + marginBottom; 
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
                        for(var j = 0 ; j < process[type].length ; j++){
                            var capability = process[type][j];
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

                                    process[type].splice(++j,0,capabilityTemp);
                                }
                            }
                       }
                   }
                };

                getOffsetsTo =  function(source,id, capacidad){
                    for(var i in source){
                        for(var j in source[i]['reglas']){
                            var regla = source[i]['reglas'][j];
                            if(regla.pactual === id){
                                return regla.html.rect.offset;
                            }
                        }
                    }
                    capacidad.name = "ERROR: Paso siguiente inconsistente"
                    return regla.html.rect.offset;
                };

                intersections = function(processesList){
                    for(var i in  processesList){
                        var process = processesList[i];
                        for(var j in process.reglas){
                            var regla = process.reglas[j];
                            for(var k in regla.psiguiente){
                                var offsetTo = getOffsetsTo(processesList, regla.psiguiente[k],regla);
                                console.log(offsetTo);
                            }
                        }
                    }
                };

                (organiceBy === 1) && cloneCapabilities(source.procesos);
                processes(source.procesos,offset);
                if(view === 2){
                    intersections(source.procesos);
                }
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