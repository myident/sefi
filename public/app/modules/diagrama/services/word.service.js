/* global angular, jsPDF, pdfMake */
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
            },
            $make: function () {
                var docDefinition = {

                    content: [
                        {
                            text: 'Macroprocess: Subscription Management',
                            style: 'header'
                        },
                        {
                            text: '1. Version Control',
                            style: 'title'
                        },
                        {
                            table: {
                                // headers are automatically repeated if the table spans over multiple pages
                                // you can declare how many rows should be treated as headers
                                headerRows: 1,
                                widths: [60, 140, 50, '*'],
                                body: [
                                    [
                                        {
                                            text: 'Date',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Author',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Version',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Description',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['04/06/2016', 'Carolina Hernández', '1.0', 'Document Creation'],
                                    ['06/28/2016', 'Eder Martínez', '1.1', 'Update Flows Level 1, 2 and 3']
                                ]
                            },
                            style: 'tableTitle',
                            layout: {
                                hLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1: 1;
                                },
                                vLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            text: '2. Process Owner',
                            style: 'title'
                        },
                        {
                            ul: [
                                'Customer Care',
                                'Credit'
                            ],
                            style: 'listTitle'
                        },
                        {
                            text: '3. Macroprocess Objective',
                            style: 'title'
                        },
                        {
                            text: '3.1 Description',
                            style: 'subtitle'
                        },
                        {
                            text: 'This process describes a set of steps aimed at initiating a change in their account to level contract. This document describes the Sunscription Management Process',
                            style: 'contentSubtitle'
                        },
                        {
                            text: '3.2 Associated Business Purpose',
                            style: 'subtitle'
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: [80, '*'],
                                body: [
                                    [
                                        {
                                            text: 'Area',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Purpose',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Customer Care'
                                        },
                                        {
                                            text: 'Customer Experience'
                                        }
                                    ],
                                    ['Credit', 'Review and analize all sales and identifies and prevet frauds']
                                ]
                            },
                            style: 'tableSubtitle',
                            layout: {
                                hLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1: 1;
                                },
                                vLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            text: '4. Scope',
                            style: 'title'
                        },
                        {
                            text: 'This document describes the steps and buisness rules, the process of Subscription MAnagement, from customer registration, business rules for the selection of commercial offer, the parameters of functions for change rate plan, change number, suspension, resume, disconecction, reestablish and port in and out.',
                            style: 'contentTitle'
                        },
                        {
                            text: '5. Assumptions',
                            style: 'title'
                        },
                        {
                            text: 'No assumptions',
                            style: 'contentTitle'
                        },
                        {
                            text: '6. Term Glossary',
                            style: 'title'
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: [80, '*'],
                                body: [
                                    [
                                        {
                                            text: 'Term',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Meaning',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['Opus', 'Customer Experience'],
                                    ['Opus', 'Customer Experience'],
                                    ['Opus', 'Customer Experience'],
                                    ['Opus', 'Customer Experience']
                                ]
                            },
                            style: 'tableTitle',
                            layout: {
                                hLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1: 1;
                                },
                                vLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            text: '7. Development Process',
                            style: 'title'
                        },
                        {
                            text: '7.1 Description',
                            style: 'subtitle'
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: [50, 110, '*'],
                                body: [
                                    [
                                        {
                                            text: 'Activity',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'System',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Function / Responsability',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['1', 'Customer', 'Solicitud de Reemplazo']
                                ]
                            },
                            style: 'tableSubtitle',
                            layout: {
                                hLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1: 1;
                                },
                                vLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            text: '8. Non functional requirements',
                            style: 'title'
                        },
                        {
                            ul: [
                                'Performance',
                                'Availability',
                                'Security',
                                'Accesibility',
                                'Concurrence'
                            ],
                            style: 'listTitle'
                        },
                        {
                            text: '8.1 SLA',
                            style: 'subtitle'
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: [20, 100, '*'],
                                body: [
                                    [
                                        {
                                            text: '',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Description',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'SLA',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['1', 'text', 'text']
                                ]
                            },
                            style: 'tableSubtitleLast',
                            layout: {
                                hLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1: 1;
                                },
                                vLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            text: '8.2 Security',
                            style: 'subtitle'
                        },
                        {
                            text: 'Security text in paragraph format',
                            style: 'contentSubtitle'
                        },
                        {
                            text: '8.3 Others',
                            style: 'subtitle'
                        },
                        {
                            text: '',
                            style: 'contentSubtitle'
                        },
                        {
                            text: '9. Reports',
                            style: 'title'
                        },
                        {
                            text: '9.1 KPI',
                            style: 'subtitle'
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: [70, 70, 70, '*'],
                                body: [
                                    [
                                        {
                                            text: 'Process',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Capacity',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'KPI Name',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'KPI Description',
                                            alignment: 'center',
                                            bold:true
                                        }
                                    ],
                                    ['Process name', 'Capacity name', 'KPI name', {
                                        text: 'KPI Description',
                                        alignment: 'left'
                                    }]
                                ]
                            },
                            style: 'tableSubtitleLast',
                            layout: {
                                hLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1: 1;
                                },
                                vLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            text: '9.2 Operative Reports',
                            style: 'subtitle'
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: [40, '*', '*', '*'],
                                body: [
                                    [
                                        {
                                            text: 'Number',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Name',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Description',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Attached File',
                                            alignment: 'center',
                                            bold:true
                                        }
                                    ],
                                    ['1', 'File name', 'File description', 'Opreport123.doc ']
                                ]
                            },
                            style: 'tableSubtitleLast',
                            layout: {
                                hLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1: 1;
                                },
                                vLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            text: '9.3 Operation System Report',
                            style: 'subtitle'
                        },
                        {
                            text: 'Security text in paragraph format',
                            style: 'contentSubtitle'
                        },
                        {
                            text: '10. Process changes',
                            style: 'title'
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: [50, 50, '*', 120],
                                body: [
                                    [
                                        {
                                            text: 'Id change',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Id act',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Project / Initiative / Business requeriment',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Function / Responsability',
                                            alignment: 'center',
                                            bold:true
                                        }
                                    ],
                                    ['123', '456', 'Description', 'Description']
                                ]
                            },
                            style: 'tableTitleLast',
                            layout: {
                                hLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1: 1;
                                },
                                vLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            text: '11. Attachments',
                            style: 'title'
                        },
                        {
                            table: {
                                headerRows: 1,
                                widths: [40, 70, '*', 120],
                                body: [
                                    [
                                        {
                                            text: 'Number',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Name',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Description',
                                            alignment: 'center',
                                            bold:true
                                        },
                                        {
                                            text: 'Attached File',
                                            alignment: 'center',
                                            bold:true
                                        }
                                    ],
                                    ['1', 'File name', 'File description', 'Opreport123.doc'],
                                    ['2', 'File name', 'File description', 'Opreport123.doc']
                                ]
                            },
                            style: 'tableTitleLast',
                            layout: {
                                hLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? 1: 1;
                                },
                                vLineWidth: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function(i, node) {
                                        return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        }

                    ],
                    styles: {
                        header: {
                            fontSize: 12,
                            bold: true,
                            margin: [5, 0, 0, 5],
                            color: '#4E4E4E',
                            font: 'Roboto'
                        },
                        title: {
                            fontSize: 10,
                            margin: [20, 20, 0, 5],
                            color: '#4E4E4E',
                            bold: true
                        },
                        tableTitle: {
                            fontSize: 10,
                            margin: [20, 5, 0, 5],
                            alignment: 'center',
                            color: '#4E4E4E'
                        },
                        listTitle: {
                            fontSize: 10,
                            margin: [30, 5, 0, 5],
                            color: '#4E4E4E'
                        },
                        contentTitle: {
                            fontSize: 10,
                            margin: [30, 0, 0, 5],
                            color: '#4E4E4E',
                        },
                        subtitle: {
                            fontSize: 10,
                            margin: [40, 10, 0, 5],
                            color: '#4E4E4E',
                            bold: true
                        },
                        tableSubtitle: {
                            fontSize: 10,
                            margin: [40, 5, 0, 5],
                            alignment: 'center',
                            color: '#4E4E4E',
                            fontWeight: 100
                        },
                        listSubtitle: {
                            fontSize: 10,
                            margin: [50, 5, 0, 5],
                            color: '#4E4E4E',
                        },
                        contentSubtitle: {
                            fontSize: 10,
                            margin: [50, 0, 0, 5],
                            color: '#4E4E4E',
                        },
                        tableSubtitleLast: {
                            fontSize: 10,
                            margin: [40, 5, 20, 5],
                            alignment: 'center',
                            color: '#4E4E4E',
                            fontWeight: 100
                        },
                        tableTitleLast: {
                            fontSize: 10,
                            margin: [40, 5, 20, 5],
                            alignment: 'center',
                            color: '#4E4E4E',
                            fontWeight: 100
                        }
                    }
                };
                pdfMake.fonts = {
                    Roboto: {
                        normal: 'Roboto-Light.ttf',
                        bold: 'Roboto-Regular.ttf'
                    }
                };

                pdfMake.createPdf(docDefinition).open();
            }
        };
    };
    angular
        .module('wordService', [])
        .service('$word', Service);
})();