/* global angular, Snap */

(function () {

    var service = function () {

        var scope = this;

        scope.svg = null;

        return {
            svg: function (value) {
                scope.svg = value;
            },
            imprimeValor: function () {
                console.log(scope.svg);
            },
            factory: {
                rect: function (offset, w, h) {
                    var x = offset.x - (w / 2);
                    var y = offset.y - (h / 2);
                    return scope.svg.rect(x, y, w, h);
                },
                ellipse: function(offset, w, h, r1, r2){
                    var x = offset.x;
                    var y = offset.y;
                    var  ellipse = scope.svg.ellipse(x, y, r1, r2);
                    ellipse.attr({
                    fill: "rgba(245,245,245,1)",
                    stroke: "rgb(150,150,150)",
                    strokeWidth: 1
                });
                    return ellipse;
                },
                rectLines: function (offset, w, h) {
                    var x = offset.x - (w / 2);
                    var y = offset.y - (h / 2);
                    var l1x1 = x + 10;
                    var l1y1 = y;
                    var l1x2 = x + 10;
                    var l1y2 = y + h;
                    var l2x1 = (x + w ) - 10;
                    var l2y1 = y;
                    var l2x2 = ( x + w ) - 10;
                    var l2y2 = y + h;

                    var g = scope.svg.group();
                    var rect = scope.svg.rect(x, y, w, h);
                    var l1 = scope.svg.line(l1x1, l1y1, l1x2, l1y2);
                    var l2 = scope.svg.line(l2x1, l2y1, l2x2, l2y2);

                    g.append(rect).append(l1).append(l2);

                    return g;
                },
                line: function (start, end) {
                    var line =  scope.svg.line(start.x, start.y, end.x, end.y);
                    line.attr({
                        stroke: "#ccc"
                    });
                    return line;
                },
                text: function (offset, w, text) {
                    var multitext = scope.svg.multitext(offset.x, offset.y, text, w, {
                        "text-anchor": "middle",
                        "font-family": "SF, sans-serif"
                    });
                    return multitext;
                },
                textbox: function (offset, w, h, text, fontSize) {
                    var textbox = scope.svg.multitext(offset.x, offset.y, text, w, fontSize,{
                        "text-anchor": "middle",
                        "font-size": fontSize + 'px',
                        "font-family": "SF, sans-serif"
                    });
                    var yt = offset.y - (textbox.clientHeight / 2) + fontSize - 2;
                    textbox.attr({
                        y: yt
                    });
                    return textbox;
                },
                polyline: function (arr) {
                    var polyline = scope.svg.polyline(arr);
                    polyline.attr({
                        fill: "none",
                        stroke: "#757575",
                        strokeWidth: 1
                    });
                    // factotyArrow();
                    return polyline;
                },
                arrow: function (offset, b, direction) {
                    var path;
                    switch(direction){
                        case 'left': path = this.arrowRight(offset, b); break;
                        case 'right': path = this.arrowLeft(offset, b);break;
                        case 'top': path = this.arrowDown(offset, b);break;
                        case 'down': path = this.arrowUp(offset, b);break;
                    }
                    return path;
                },
                arrowDown: function (offset, b) {
                    var x = offset.x;
                    var y = offset.y;
                    var pathStr = "M" + (x - (b / 2)) + " " + y + " L" + (x + (b / 2)) + " " + y + " L" + x + " " + (y + b) + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "#757575",
                        stroke: "#757575",
                        strokeWidth: 0
                    });
                    return path;
                },
                arrowLeft: function (offset, b) {
                    var x = offset.x;
                    var y = offset.y;
                    var pathStr = "M" + x + " " + (y  + (b / 2)) + " L" + (x - b) + " " + y + " L" + x + " " + (y - (b / 2)) + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "#757575",
                        stroke: "#757575",
                        strokeWidth: 0
                    });
                    return path;
                },
                arrowUp: function (offset, b) {
                    var x = offset.x;
                    var y = offset.y;
                    var pathStr = "M" + (x - (b / 2)) + " " + y + " L" + (x) + " " + (y - b) + " L" + (x + (b / 2)) + " " + y + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "#757575",
                        stroke: "#757575",
                        strokeWidth: 0
                    });
                    return path;
                },
                arrowRight: function (offset, b) {
                    var x = offset.x;   
                    var y = offset.y;
                    var pathStr = "M" + (x) + " " + ( y - ( b / 2 )) + " L" + (x + b) + " " + y + " L" + x + " " + (y + ( b / 2 )) + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "#757575",
                        stroke: "#757575",
                        strokeWidth: 0
                    });
                    return path;
                },
                corner: function (offset, b) {
                    var x = offset.x;
                    var y = offset.y;
                    var pathStr = "M" + x + " " + y + " L" + x + " " + (y + b) + " L" + (x -  b ) + " " + (y + b) + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "#757575",
                        stroke: "#757575",
                        strokeWidth: 0
                    });
                    return path;
                },
                rombo: function (offset, w, h) {
                    var p1 = {
                        x: offset.x,
                        y: offset.y - (h / 2)
                    };
                    var p2 = {
                        x: offset.x + (w / 2),
                        y: offset.y
                    };
                    var p3 = {
                        x: offset.x,
                        y: offset.y + (h / 2)
                    };
                    var p4 = {
                        x: offset.x - (w / 2),
                        y: offset.y
                    };

                    var pathStr = "M" + p1.x + " " + p1.y + " L" + p2.x + " " + p2.y + " L" + p3.x + " " + p3.y + " L" + p4.x + " " + p4.y + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "rgb(240, 240, 240)",
                        stroke: "#979797",
                        strokeWidth: 1
                    });
                    return path;
                },
                circle: function (offset, r) {
                    var x = offset.x;
                    var y = offset.y;
                    var circle = scope.svg.circle(x, y, r);
                    return circle;
                },
                img: function(offset, img, w, h){
                    var x = offset.x;
                    var y = offset.y;
                    var shadow = scope.svg.filter(Snap.filter.shadow(1, 2, 2, '#000', 0.05));
                    var circle = scope.svg.image(img, x, y, w, h).attr({filter: shadow});
                    
                    return circle;
                },
                imgError: function(offset, img, w, h){
                    var x = offset.x - (w / 2);
                    var y = offset.y - 35;
                    var img = scope.svg.image(img, x, y, w, h);
                    return img;
                }
            }

        };
    };

    angular
        .module('mVash')
        .service('$shapes', service);

})();