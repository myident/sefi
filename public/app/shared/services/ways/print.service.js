/* global angular, svgAsPngUri, jsPDF */
(function () {
    var service = function ($rootScope) {
        var self = this;
        this.pdf = function (ancho, alto, header, body, nombre, proporcion, escala) {
            var coordinates = [];
            var pagesForWidth = parseInt(ancho / 612) + 1;
            var pagesForHeight = parseInt(alto / 792) + 1;
            var headerHeight = (30 / proporcion) + 5;
            var pagesCounter = 0;
            for (var i = 0; i < pagesForWidth; i++) {
                coordinates.push([]);
                for (var j = 0; j < pagesForHeight; j++) {
                    coordinates[i].push([{
                        x: 612 * i * (i > 0 ? -1 : 1),
                        y: 792 * j * (j > 0 ? -1 : 1)
                                    }]);
                }
            }

            if (alto > ancho) {

                svgAsPngUri(body, {
                    scale: escala
                }, function (uri) {
                    svgAsPngUri(header, {
                        scale: escala
                    }, function (uriHeader) {
                        var pdf = new jsPDF('p', 'pt', 'letter', true);
                        pdf.setFontSize(10);
                        for (var i in coordinates) {
                            for (var j in coordinates[i]) {
                                if (pagesCounter > 0) {
                                    pdf.addPage();
                                }
                                if (j == 0) {
                                    pdf.addImage(uriHeader, 'PNG', coordinates[i][j][0].x, coordinates[i][j][0].y, ancho, 30 / proporcion);
                                }
                                pagesCounter++;
                                pdf.addImage(uri, 'PNG', coordinates[i][j][0].x, coordinates[i][j][0].y + headerHeight, ancho, alto);
                                pdf.text(590, 30, '' + pagesCounter);
                            }
                        }

                        $rootScope.spin = false;
                        pdf.save(nombre + '_protrait.pdf');
                    });

                });

            } else { // alto <= ancho

                
            }
        };
        return self;
    };

    angular
        .module('mPrint', [])
        .service('$print', service);
})();