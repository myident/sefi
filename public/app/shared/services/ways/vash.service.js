/* global angular */

(function () {

    var service = function ($paint) {

        var self = this;
        
        self.heightProcesos = [];
        self.widthProcesos = [];
        self.offsetProcesos = {
            x: [],
            y: []
        };
        
        self.zoom = 1;
        
        self.heightHeader = function() {
            return (self.zoom * 30); 
        };
        
        self.heightProcesosMax = function() {
            var maximo = Math.max.apply( Math, self.heightProcesos);
            return ((maximo + 40) * self.zoom);
        };
        
        self.sumOffsetsInY = function() {
            var lastOffset = self.offsetProcesos.y[(self.offsetProcesos.y.length - 1)];
            var lastHeight = (self.heightProcesos[(self.heightProcesos.length - 1)] / 2);
            var totalHeight = lastHeight + lastOffset + 25;
            return (totalHeight * self.zoom);
        };
        
        self.sumOffsetsInX = function() {
            var lastOffset = self.offsetProcesos.x[(self.offsetProcesos.x.length - 1)];
            var lastWidth = (self.widthProcesos[(self.widthProcesos.length - 1)] / 2);
            var totalWidth = lastWidth + lastOffset + 25;
            return (totalWidth * self.zoom);
//            return 600;
        };

        
        //filter: scope.svg.filter(Snap.filter.shadow(0, 3, 3, '#000', 0.3))

        /* findOffsetInArray(): - encuentra un arreglo de offsets basado en un arreglo */
        /* ************************************************************************************** */
        /* Recibes los siguientes parametros:  */
        /* arr:       es el arreglo de coordenadas con nombre [{nombre, offset}] */
        /* capacity:         es la capacidad que buscamos {nombre, aplicaciones, kpis, ...}*/
        /* searchIn:        es la busqueda en determinado lugar (areas, aplicaciones, ...) */
        /* searchBy:         es la busqueda por determinado atributo (name, title, text, ...) */
        /* ************************************************************************************** */
        /* return:  offset {x, y} */
        self.findOffsetInArray = function (arr, capacity, searchIn, searchBy) {

            var offset = {};

            searchIn = searchIn || '';
            searchBy = searchBy || 'name';

            var textInTheArray = '';
            var textToMatch = '';

            if (searchIn !== '') {
                
                if (capacity[searchIn] !== undefined && capacity[searchIn].length) {
//                    console.log(capacity.name)
                    // Search In: Array
                    for (var k in arr) {
                        textInTheArray = arr[k].text;
                        
                        for (var l in capacity[searchIn]) {
                            textToMatch = capacity[searchIn][l][searchBy];
                            
                            if (textToMatch !== undefined &&
                                textToMatch.toUpperCase() == textInTheArray.toUpperCase()) {
                                
                                offset = arr[k].offset;
                            }
                        }
                    }
                } else {
                    // Search In: Object
                    for (var j in arr) {
                        textInTheArray = arr[j].text;
                        if (capacity[searchIn]) {
                            textToMatch = capacity[searchIn][searchBy];
                            if (textToMatch !== undefined &&
                                textToMatch.toUpperCase() == textInTheArray.toUpperCase()) {
                                offset = arr[j].offset;
                            }
                        }

                    }
                }
            } else {
                // Search By
                for (var i in arr) {
                    textInTheArray = arr[i].text;
                    textToMatch = capacity[searchBy];

                    if (textToMatch !== undefined &&
                        textToMatch.toUpperCase() == textInTheArray.toUpperCase()) {
                        offset = arr[i].offset;
                    }
                }

            }

            return offset;
        };

        /* intersectionFill(): - encuentra las intersecciones y la dirección de acuerdo a dos elementos */
        /* ************************************************************************************** */
        /* Recibes los siguientes parametros:  */
        /* first:    es el primer elemento, contiene: {nombre, aplicaciones, kpis, ...} */
        /* second:   es el segundo elemento, también contiene: {nombre, aplicaciones, kpis, ...}*/
        /* matrix:   es una variable booleana, que se recibe para iterar*/
        /* ************************************************************************************** */
        /* return:  first ~ {nombre, aplicaciones, kpis, ...} + direction:Array[Int], intersection:Array[Array] */
        self.intersectionFill = function (first, second, matrix) {
            var intersectionArray = [[], [], []];
            var directionsArray = [];
            var x0, y0, x1, y1;

            if (matrix) {
                for (var off in first.offsets) {

                    intersectionArray[off][0] = first.offsets[off];
                    intersectionArray[off][1] = {};
                    intersectionArray[off][2] = second.offsets[off];

                    x0 = first.offsets[off].x;
                    y0 = first.offsets[off].y;

                    x1 = second.offsets[off].x;
                    y1 = second.offsets[off].y;

                    // Verifica si es vertical
                    if (x0 == x1) {

                        if (y0 >= y1) {
                            directionsArray[off] = 'down';
                        } else {
                            directionsArray[off] = 'down';
                        }

                        if (y0 == y1) {
                            intersectionArray[off][1] = {
                                x: x0,
                                y: y1
                            };
                        } else {
                            intersectionArray[off][1] = {
                                x: x0,
                                y: ((y1 - y0) / 2) + y0
                            };
                        }
                    }
                    // Verifica si es horizontal
                    else {
                        
                        // va hacia la derecha
                        
                        if (x0 <= x1) {
                            
                            if (y0 > y1) {
                                directionsArray[off] = 'down';
                            } else {
                                if (y0 == y1) {
                                    directionsArray[off] = 'down';
                                } else {
                                    directionsArray[off] = 'right';
                                }

                            }
                            
                        } else {
                            directionsArray[off] = 'left';
                        }

                        if (y0 == y1) {
                            intersectionArray[off][1] = {
                                x: ((x1 - x0) / 2) + x1,
                                y: y0
                            };
                        } else {
                            if (y0 > y1) {
                                intersectionArray[off][1] = {
                                    x: x0,
                                    y: y1
                                };
                            } else {
                                intersectionArray[off][1] = {
                                    x: x0,
                                    y: y1
                                };
                            }
                        }
                    }

                }

            }

            first.intersection = intersectionArray;
            first.direction = directionsArray;

            return first;
        };
        
        
        self.customIntersectionFill = function(first, second) { 
            var intersectionArray = [[], [], []];
            var directionsArray = [];
            var x0, y0, x1, y1;
            
            var padding = {
                x: 0,
                y: 30
            };
            
            for (var off in first.offsets) {
                
                var xInit = second.offsets[off].x - (second.width[off] / 2);
                var xFin = second.offsets[off].x + (second.width[off] / 2);
                
                // Configuracion de Interseccion
                intersectionArray[off][0] = {
                    x: first.offsets[off].x  + padding.x,
                    y: first.offsets[off].y + 25 + padding.y
                };
                
                intersectionArray[off][1] = {};
                
                
                if (xInit < first.offsets[off].x) {
                    // Izquierda
                    if(xFin < first.offsets[off].x) {
                        intersectionArray[off][2] = {
                            x: second.offsets[off].x + (second.width[off] / 2),
                            y: second.offsets[off].y - (second.height[off] / 2) + 34
                        };
                        x1 = second.offsets[off].x;  
                    } else {
                        // Abajo
                        intersectionArray[off][2] = {
                            x: first.offsets[off].x,
                            y: second.offsets[off].y - (second.height[off] / 2) + 34
                        };
                        x1 = first.offsets[off].x;
                    }
                } else {
                    // Derecha
                    intersectionArray[off][2] = {
                        x: second.offsets[off].x - (second.width[off] / 2),
                        y: second.offsets[off].y - (second.height[off] / 2) + 34
                    };
                    x1 = second.offsets[off].x;
                }



                // configuracion de coordenadas para obtener interseccion[1]
                x0 = first.offsets[off].x;
                y0 = first.offsets[off].y;

                
                y1 = second.offsets[off].y - (second.height[off] / 2) + 34;

                // Verifica si es vertical
                if (x0 == x1) {

                    if (y0 >= y1) {
                        directionsArray[off] = 'down';
                    } else {
                        directionsArray[off] = 'down';
                    }

                    if (y0 == y1) {
                        intersectionArray[off][1] = {
                            x: x0,
                            y: y1
                        };
                    } else {
                        intersectionArray[off][1] = {
                            x: x0,
                            y: ((y1 - y0) / 2) + y0
                        };
                    }
                }
                // Verifica si es horizontal
                else {

                    // va hacia la derecha

                    if (x0 <= x1) {

                        if (y0 > y1) {
                            directionsArray[off] = 'down';
                        } else {
                            if (y0 == y1) {
                                directionsArray[off] = 'down';
                            } else {
                                directionsArray[off] = 'right';
                            }

                        }

                    } else {
                        directionsArray[off] = 'left';
                    }

                    if (y0 == y1) {
                        intersectionArray[off][1] = {
                            x: ((x1 - x0) / 2) + x1,
                            y: y0
                        };
                    } else {
                        if (y0 > y1) {
                            intersectionArray[off][1] = {
                                x: x0,
                                y: y1
                            };
                        } else {
                            intersectionArray[off][1] = {
                                x: x0,
                                y: y1
                            };
                        }
                    }
                }

            }

            first.intersection = intersectionArray;
            first.direction = directionsArray;

            return first;
        };

        self.settingDimensionsToProcess = function (proceso, matrix, indice, switchCapacidades, main) {
            if (matrix) {
                if (proceso[switchCapacidades] !== undefined && proceso[switchCapacidades].length) {

                    // Encuentra el primero y el último
                    var first, last;
                    var arregloX = [];
                    var arregloY = [];
                    
                    for (var i in proceso[switchCapacidades]) {
                        arregloX.push(proceso[switchCapacidades][i].offsets[indice].x);
                        arregloY.push(proceso[switchCapacidades][i].offsets[indice].y);
                            var minimoX = Math.min.apply( Math, arregloX);
                            var minimoY = Math.min.apply( Math, arregloY);
                            var maximo = Math.max.apply( Math, arregloX);
                            var maximoY = Math.max.apply( Math, arregloY);
                            first = {
                                x: minimoX,
                                y: minimoY
                            };
                            last = {
                                x: maximo,
                                y: maximoY
                            };
                    }

                    var first0, last0;
                    for (var i0 in proceso[switchCapacidades]) {
                        if (i0 == 0) {
                            first0 = proceso[switchCapacidades][i0].offsets[0];
                        }
                        if (i0 == (proceso[switchCapacidades].length - 1)) {
                            last0 = proceso[switchCapacidades][i0].offsets[0];
                        }
                    }

                    var first2, last2;
                    for (var i2 in proceso[switchCapacidades]) {
                        arregloX.push(proceso[switchCapacidades][i2].offsets[indice].x);
                        arregloY.push(proceso[switchCapacidades][i2].offsets[indice].y);
                            var minimoX = Math.min.apply( Math, arregloX);
                            var minimoY = Math.min.apply( Math, arregloY);
                            var maximo = Math.max.apply( Math, arregloX);
                            var maximoY = Math.max.apply( Math, arregloY);
                            first2 = {
                                x: minimoX,
                                y: minimoY
                            };
                            last2 = {
                                x: maximo,
                                y: maximoY
                            };
                    }

                    // Alto y ancho

                    var height0 = last0.y - first0.y + main.procesos.procesoMargen.y;
                    var width0 = last0.x - first0.x + main.procesos.procesoMargen.x;
                    
                    var height = last.y - first.y + 180;
                    var width = last.x - first.x + 132;

                    var height2 = last2.y - first2.y + 180;
                    var width2 = last2.x - first2.x + 132;


                    // Extremos Y
                    var extremosY = {
                        first: first.y + 140,
                        last: last.y + 70
                    };

                    var extremosY0 = {
                        first: first0.y + 165,
                        last: last0.y + 132
                    };

                    var extremosY2 = {
                        first: first2.y + 140,
                        last: last2.y + 70
                    };

                    // Offset Y
                    var offsetY = first.y + ((extremosY.last - extremosY.first) / 2);

                    var offsetY0 = first0.y + ((extremosY0.last - extremosY0.first) / 2);

                    var offsetY2 = first2.y + ((extremosY2.last - extremosY2.first) / 2);


                    // Extremos X, Offset X
                    var offsetX, extremosX;

                    var offsetX0, extremosX0;

                    var offsetX2, extremosX2;

                    if (last.x != first.x) {
                        if (last.x > first.x) {
                            extremosX = {
                                first: first.x + 95,
                                last: last.x + 95
                            };
                            offsetX = first.x + ((extremosX.last - extremosX.first) / 2);
                        } else {
                            extremosX = {
                                first: first.x + 95,
                                last: last.x + 95
                            };
                            offsetX = first.x + ((extremosX.first - extremosX.last) / 2);
                        }
                    } else {
                        offsetX = last.x;
                    }


                    if (last0.x != first0.x) {
                        if (last0.x > first0.x) {
                            extremosX0 = {
                                first: first0.x + 95,
                                last: last0.x + 95
                            };
                            offsetX0 = first0.x + ((extremosX0.last - extremosX0.first) / 2);
                        } else {
                            extremosX0 = {
                                first: first0.x + 95,
                                last: last0.x + 95
                            };
                            offsetX0 = first0.x + ((extremosX0.first - extremosX0.last) / 2);
                        }
                    } else {
                        offsetX0 = last0.x;
                    }



                    if (last2.x != first2.x) {
                        if (last2.x > first2.x) {
                            extremosX2 = {
                                first: first2.x + 95,
                                last: last2.x + 95
                            };
                            offsetX2 = first2.x + ((extremosX2.last - extremosX2.first) / 2);
                        } else {
                            extremosX2 = {
                                first: first2.x + 95,
                                last: last2.x + 95
                            };
                            offsetX2 = first2.x + ((extremosX2.first - extremosX2.last) / 2);
                        }
                    } else {
                        offsetX2 = last2.x;
                    }

                    // Offset Principal
                    var mainOffset = {
                        x: offsetX,
                        y: offsetY
                    };

                    var mainOffset0 = {
                        x: offsetX0,
                        y: offsetY0
                    };

                    var mainOffset2 = {
                        x: offsetX2,
                        y: offsetY2
                    };



                    proceso.offsets[1] = mainOffset;
                    proceso.offsets[0] = mainOffset0;
                    proceso.offsets[2] = mainOffset2;
                    proceso.width = [width0, width, width2];
                    proceso.height = [height0, height, height2];

                    return proceso;
                }
            } else {
                    proceso.width = [130, 130, 130];
                    proceso.height = [70, 70, 70];

                    return proceso;
            }

        };

        self.getElementsTransformY = function (arrayProcesos, capacidad, switchCapacidades) {

            var indexProcesoComienzo = 0;
            var indexCapacidadComienzo = 0;

            //Buscamos el index en procesos y capacidades respecto a la capacidad elegida

            for (var i in arrayProcesos) {
                var proceso = arrayProcesos[i];
                for (var j in proceso[switchCapacidades]) {

                    var capacidadElegida = capacidad.name;
                    var capacidadEncontrada = proceso[switchCapacidades][j].name;

                    if (capacidadEncontrada == capacidadElegida) {
                        indexProcesoComienzo = (Number(i));
                        indexCapacidadComienzo = (Number(j));
                    }
                }
            }


            // Se crea el objeto a regresar, vacío por defecto

            var arrayRetorno = {
                procesos: [],
                capacidades: [],
                index: [indexProcesoComienzo, indexCapacidadComienzo],
                indexProceso: indexProcesoComienzo,
                indexCapacidad: indexCapacidadComienzo
            };

            for (var k = (indexProcesoComienzo + 1); k < arrayProcesos.length; k++) {
                arrayRetorno.procesos.push(arrayProcesos[k]);
            }

            for (var l = (indexCapacidadComienzo + 1); l < arrayProcesos[(indexProcesoComienzo)][switchCapacidades].length; l++) {
                arrayRetorno[switchCapacidades].push(arrayProcesos[(indexProcesoComienzo)][switchCapacidades][l]);
            }

            return arrayRetorno;
        };

        self.setIntersectionsWithDirection = function(capacidad, intersections, width, height) {
            
            for (var i in capacidad.direction){
                
                if(capacidad.direction[i] == 'right'){
                    intersections[i][2].x = intersections[i][2].x - (width / 2) - 7;
                }
                
                if(capacidad.direction[i] == 'left'){
                    intersections[i][2].x = intersections[i][2].x + (width / 2) + 7;
                }
                
                if(capacidad.direction[i] == 'down'){
                    intersections[i][2].y = intersections[i][2].y - (height / 2) - 15;
                }
            }
            
            return intersections;
        };
        
        self.rotateArrowFromDirection = function(capacidad, layout, arrow) {
            if (capacidad.direction[2] == 'right' && layout == 2) {
                $paint.rotate90(arrow);
            }
            if (capacidad.direction[2] == 'left' && layout == 2) {
                $paint.rotateMinus90(arrow);
            }
            if (capacidad.direction[1] == 'right' && layout == 1) {
                $paint.rotate90(arrow);
            }

            if (capacidad.direction[1] == 'left' && layout == 1) {
                $paint.rotateMinus90(arrow);
            }

            if (capacidad.direction == 'up' && layout == 2) {
                $paint.rotate180(arrow);
            }
        };


        return self;
    };


    angular
        .module('mVash', [])
        .service('$vash', service);

})();