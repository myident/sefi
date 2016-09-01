/* global angular, jsPDF */
(function () {
    var Service = function () {
        return {
            $print: function () {
                var pdf = new jsPDF('p', 'pt', 'letter');

                var size = {
                    title: 16,
                    subtitulo: 14,
                    content: 12
                };

                // Carátula

                pdf.setFontSize(16);
                pdf.setTextColor(45, 45, 45);
                pdf.text(399, 58, "Information Technology");

                pdf.setDrawColor(36, 147, 197);
                pdf.line(42, 92, 578, 92);


                pdf.setFontSize(15);
                pdf.text(70, 150, "MACROPROCESS");

                pdf.setFontSize(30);
                var splitTitle = pdf.splitTextToSize("Subscription Management", 180);
                pdf.text(70, 179, splitTitle);

                pdf.setFontSize(12);
                pdf.text(70, 609, "Domain:");
                pdf.text(152, 609, "CRM - Customer Relationship Management");
                pdf.text(70, 629, "Version:");
                pdf.text(152, 629, "4.0");
                pdf.text(70, 649, "Last Update:");
                pdf.text(152, 649, "April 06, 2015");
                pdf.text(70, 669, "Author:");
                pdf.text(152, 669, "Carolina Hernándex");
                pdf.text(70, 689, "Reviewer:");
                pdf.text(152, 689, "Jesús Pasten");
                pdf.text(70, 709, "Authorizer:");
                pdf.text(152, 709, "Pablo Torres / Fernando Valedón");

                pdf.setFontStyle('bold');
                pdf.setTextColor(179, 179, 179);
                pdf.text(150, 755, "TOTAL OR PARTIAL REPRODUCTION IS FORBIDDEN");

                pdf.addPage();

                // Procesos
                pdf.setFontStyle('normal');
                pdf.setFontSize(size.subtitle);
                pdf.setTextColor(45, 45, 45);
                pdf.text(22, 32, 'Macroprocess: Subscription Management');

                pdf.setFontSize(size.content);
                pdf.text(42, 68, '1. Version Control');

                var columns = [
                    {
                        title: "Date",
                        dataKey: "date"
                    },
                    {
                        title: "Author",
                        dataKey: "author"
                    },
                    {
                        title: "Version",
                        dataKey: "version"
                    },
                    {
                        title: "Description",
                        dataKey: "description"
                    }
                ];
                var rows = [
                    {
                        "date": '04/06/2016',
                        "author": "Carolina Hernández",
                        "version": "1.0",
                        "description": "Document Creation"
                    },
                    {
                        "date": '06/28/2016',
                        "author": "Eder Martínez",
                        "version": "1.1",
                        "description": "Update Flows Level 1, 2 and 3"
                    }
                ];

                pdf.autoTable(columns, rows, {
                    theme: 'plain', 
                    margin: {
                        top: 80
                    }
                });
                
                pdf.text(42, 168, '2. Process Owner');
                
                

                pdf.save('word_capacities.pdf');
            }
        };
    };
    angular
        .module('wordService', [])
        .service('$word', Service);
})();