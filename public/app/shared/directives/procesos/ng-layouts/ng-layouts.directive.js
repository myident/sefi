/* global angular, Snap */

(function () {
    var Directive = function ($vash, $paint, $shapes) {
        var Link = function (scope, element, attrs, ngModel) {

            scope.sizes = [
                {
                    width: 1920,
                    height: 840
                },
                {
                    width: 553,
                    height: 6410
                },
                {
                    width: 2740,
                    height: 6210
                }
            ];

            scope.svg = [];
            scope.svg[1] = Snap(angular.element(element[0]).children()[0]);
            scope.svg[2] = Snap(angular.element(element[0]).children()[1]);

            //console.log(angular.element(element[0]).children());

            scope.width = scope.sizes[scope.layout].width;
            scope.height = scope.sizes[scope.layout].height;

            // Se configura el scope svg en $shapes

            var shapes = [];
            shapes[1] = $shapes.svg(scope.svg[1]);
            shapes[2] = $shapes.svg(scope.svg[2]);

            scope.$factory = [];
            $shapes.svg(scope.svg[1]);
            scope.$factory[1] = $shapes.factory;

            $shapes.svg(scope.svg[2]);
            scope.$factory[2] = $shapes.factory;


            // shapes[1].svg(scope.svg[1]);
            // shapes[2].svg(scope.svg[2]);


            // este factory crea cada una de las formas
            //scope.$factory = $shapes.factory;

            // este service se encarga de decorar las formas
            scope.$paint = $paint;

            // Función que cambia los Layouts
            scope.changeLayoutSelect = function (layoutSelect) {
                scope.layoutVerticalGroup.attr({
                    visibility: "hidden"
                });
                scope.layoutHorizontalGroup.attr({
                    visibility: "hidden"
                });
                switch (layoutSelect) {
                case 0:
                    break;
                case 1:
                    scope.layoutVerticalGroup.attr({
                        visibility: "visible"
                    });
                    break;
                case 2:
                    scope.layoutHorizontalGroup.attr({
                        visibility: "visible"
                    });
                    break;
                default:
                    break;
                }
            };
            var myString = function (value) {
                this.text = value;
            };
            myString.prototype.capitalize = function () {
                //                    return this.text.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
                return this.text.toLowerCase().replace(/\b./g, function (a) {
                    return a.toUpperCase();
                });
            };
            // Crea el Layout 3
            scope.buildLayoutHorizontal = function () {

                var height = 30;
                var width = 144;
                var offset = {
                    x: 72,
                    y: 15
                };


                scope.layoutHorizontalGroup = scope.svg[2].group();
                for (i in scope.config.layouts.horizontal) {
                    var rect, line, text;

                    var texto = new myString(scope.config.layouts.horizontal[i].text);

                    rect = scope.$factory[2].rect(offset, width, height);
                    rect = scope.$paint.rectApplication(rect);
                    line = scope.$factory[2].line({
                        x: offset.x + (width / 2),
                        y: offset.y - (height / 2)
                    }, {
                        x: offset.x + (width / 2),
                        y: scope.sizes[2].height
                    });
                    line = scope.$paint.lineApplication(line);
                    text = scope.$factory[2].textbox(offset, width - 40, height, texto.capitalize(), 13);
                    text = scope.$paint.textAreas(text);


                    var g = scope.svg[2].group(rect, line, text);
                    scope.layoutHorizontalGroup.append(g);

                    var offsetCopy = JSON.parse(JSON.stringify(offset));
                    //offsetCopy.x = offsetCopy.x + (width/2);
                    scope.config.layouts.horizontal[i].offset = offsetCopy;
                    offset.x += width;
                }
            };

            // Crear el Layout 2
            scope.buildLayoutVertical = function () {
                var height = 30;
                var width = 184;
                var offset = {
                    x: 92,
                    y: 15
                };

                scope.layoutVerticalGroup = scope.svg[1].group();
                for (i in scope.config.layouts.vertical) {
                    var rect, line, text;
                    var texto = new myString(scope.config.layouts.vertical[i].text);
                    rect = scope.$factory[1].rect(offset, width, height);
                    rect = scope.$paint.rectApplication(rect);

                    line = scope.$factory[1].line({
                        x: offset.x + (width / 2),
                        y: offset.y - (height / 2)
                    }, {
                        x: offset.x + (width / 2),
                        y: scope.sizes[1].height
                    });
                    line = scope.$paint.lineApplication(line);
                    text = scope.$factory[1].textbox(offset, width - 40, height, texto.capitalize(), 16);
                    text = scope.$paint.textAreas(text);

                    var g = scope.svg[1].group(rect, line, text);
                    scope.layoutVerticalGroup.append(g);

                    var offsetCopy = JSON.parse(JSON.stringify(offset));
                    //offsetCopy.x = offsetCopy.x + (width/2);
                    scope.config.layouts.vertical[i].offset = offsetCopy;
                    offset.x += width;
                }
            };

            // Router de Layouts
            scope.buildLayouts = function () {
                scope.buildLayoutHorizontal();
                scope.buildLayoutVertical();
            };


            // Inicializa la pantalla
            scope.init = function () {
                scope.buildLayouts();
                scope.changeLayoutSelect(scope.layout);
            };

            scope.init();
            scope.$watch('layout', function () {

                scope.svg[1].clear();
                scope.svg[2].clear();


                if ($vash.sumOffsetsInX() > 0) {
                    if (scope.layout < 1) {
                        scope.svg[1].attr({
                            viewBox: "0 0 " + $vash.sumOffsetsInX() + " 30"
                        });
                        scope.svg[2].attr({
                            viewBox: "0 0 " + $vash.sumOffsetsInX() + " 30"
                        });
                    } else {
                        if(scope.layout == 1){
                            scope.svg[1].attr({
                                viewBox: "0 0 " + $vash.sumMaxInX() + " 30"
                            });
                            scope.svg[2].attr({
                                viewBox: "0 0 " + $vash.sumMaxInX() + " 30"
                            });
                        }
                        scope.svg[1].attr({
                            viewBox: "0 0 " + $vash.sumMaxInX() + " 30"
                        });
                        scope.svg[2].attr({
                            viewBox: "0 0 " + $vash.sumMaxInX() + " 30"
                        });
                    }
                }
                scope.init();

            });
            scope.$watch('config', function () {
                
                scope.svg[1].clear();
                scope.svg[2].clear();


                if ($vash.sumOffsetsInX() > 0) {
                    if (scope.layout < 1) {
                        scope.svg[1].attr({
                            viewBox: "0 0 " + $vash.sumOffsetsInX() + " 30"
                        });
                        scope.svg[2].attr({
                            viewBox: "0 0 " + $vash.sumOffsetsInX() + " 30"
                        });
                    } else {
                        scope.svg[1].attr({
                            viewBox: "0 0 " + $vash.sumOffsetsInX() + " 30"
                        });
                        scope.svg[2].attr({
                            viewBox: "0 0 " + $vash.sumOffsetsInX() + " 30"
                        });
                    }
                }
                scope.init();

            });


        };
        return {
            restrict: 'A',
            link: Link,
            require: '?ngModel',
            templateUrl: 'app/shared/directives/procesos/ng-layouts/ng-layouts.template.html',
            scope: {
                config: '=',
                layout: '='

            }
        };
    };
    angular
        .module('ngLayouts', [])
        .directive('ngLayouts', Directive);
})();