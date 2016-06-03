/* global angular */

(function () {

    var service = function ($vash, $paint, $shapes) {

        var self = this;

        self.config = null;
        self.paper = null;
        self.source = null;

        return {
            // set the main configuration to work
            setConfiguration: function (config, paper, source) {
                self.config = config;
                self.paper = paper;
                self.source = source;
            },
            create: [
                // Create the Layout Initial
                function (configuration, group) {
                    // Make the group
                    self.config.layouts.initial = [];
                    group = self.paper.group();
                    for (var i in self.source) {
                        self.config.layouts.initial[i] = {};
                        self.config.layouts.initial[i].offset = JSON.parse(JSON.stringify(configuration.offset));

                        // Change Offset in X
                        configuration.offset.x += configuration.width;
                    }
                },
                //Create the Areas Layout
                function (configuration, group) {
                    // Make the group
                    group = self.paper.group();
                    $shapes.svg(self.paper);

                    for (var i in self.config.layouts.vertical) {

                        var line, g, offsetCopy;

                        // Line
                        line = $shapes.factory.line({
                            x: configuration.offset.x + (configuration.width / 2),
                            y: configuration.offset.y - (configuration.height / 2)
                        }, {
                            x: configuration.offset.x + (configuration.width / 2),
                            y: 100000
                        });
//                        line = $paint.lineApplication(line);

                        // Group
                        g = self.paper.group(line);
                        group.append(g);

                        // Offset
                        offsetCopy = JSON.parse(JSON.stringify(configuration.offset));
                        self.config.layouts.vertical[i].offset = offsetCopy;

                        //Change Offset in X
                        configuration.offset.x += configuration.width;
                    }
                },
                // Create the Applications Layout
                function (configuration, group) {
                    group = self.paper.group();
                    $shapes.svg(self.paper);
                    // Make the group
                    

                    for (var i in self.config.layouts.horizontal) {
                        var line, g, offsetCopy;
                        line = $shapes.factory.line({
                            x: configuration.offset.x + (configuration.width / 2),
                            y: 0
                        }, {
                            x: configuration.offset.x + (configuration.width / 2),
                            y: 100000
                        });
//                        line = $paint.lineApplication(line);

                        // Group
                        g = self.paper.group(line);
                        group.append(g);
                        
                        offsetCopy = JSON.parse(JSON.stringify(configuration.offset));
                        self.config.layouts.horizontal[i].offset = offsetCopy;

                        // Change offset in Y
                        configuration.offset.x += configuration.width;
                    }
                }
            ]
        };
    };


    angular
        .module('mVash')
        .service('$layout', service);

})();