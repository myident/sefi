/* global angular, jsPDF, pdfMake */
(function () {
    var Service = function ($barraHerramientas, $rootScope) {
        return {
            $camelize: function (str) {
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter) {
                    return letter.toLowerCase();
                }).replace(/\s+/g, '_');
            },
            $make: function (obj) {
                var docDefinition = {

                    content: [
                        {
                            table: {
                                widths: [180, '*'],
                                body: [
                                    [
                                        {
                                            image: 'data:image/jpeg;base64,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',
                                            width: 88,
                                            height: 36
                                        },
                                        {
                                            text: 'Information Technology',
                                            alignment: 'right'
                                        }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 0 : 0;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            canvas: [
                                {
                                    type: 'line',
                                    x1: 0,
                                    y1: 30,
                                    x2: 520,
                                    y2: 30,
                                    lineWidth: 1,
                                    lineColor: '#2493C5'
                                }
                            ]
                        },
                        {
                            text: 'MACROPROCESS',
                            style: 'macroProcessLabel'
                        },
                        {
                            columns: [
                                {
                                    width: 100,
                                    text: 'Subscription Managment',
                                    style: 'macroprocess'
                                }
                            ]
                        },
                        {
                            text: 'PROCESS OWNERS',
                            style: 'processOwners'
                        },
                        {
                            text: 'Customer Care'
                        },
                        {
                            text: 'Credit'
                        },
                        {
                            table: {
                                widths: [100, 'auto'],
                                body: [
                                    [
                                        {
                                            text: 'Domain:'
                                        },
                                        {
                                            text: 'CRM - Customer Relationship Management'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Megaprocess:'
                                        },
                                        {
                                            text: 'Subscription Management'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Version:'
                                        },
                                        {
                                            text: '4.0'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Last Update:'
                                        },
                                        {
                                            text: 'April 06, 2015'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Author:'
                                        },
                                        {
                                            text: 'Carolina Hernández'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Reviewer:'
                                        },
                                        {
                                            text: 'Jesús Pasten'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Authorizer:'
                                        },
                                        {
                                            text: 'Pablo Torres / Fernando Valdeón'
                                        }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 0 : 0;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            },
                            style: 'tablePortada'
                        },
                        {
                            text: 'TOTAL OR PARTIAL REPRODUCTION IS FORBIDDEN',
                            bold: true,
                            alignment: 'center',
                            margin: [0, 20, 0, 20],
                            color: '#B3B3B3'
                        },
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
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                    ['Opus', {
                                        text: 'Customer Experience',
                                        alignment: 'left'
                                    }],
                                    ['CRM', {
                                        text: 'Customer Relationship Management',
                                        alignment: 'left'
                                    }],
                                    ['CIM', {
                                        text: 'Customer Interaction Management',
                                        alignment: 'left'
                                    }],
                                    ['ICAS', {
                                        text: 'Credit Policy',
                                        alignment: 'left'
                                    }],
                                    ['CAPM', {
                                        text: 'Payment',
                                        alignment: 'left'
                                    }],
                                    ['SRM', {
                                        text: 'Subscriber Resource Management',
                                        alignment: 'left'
                                    }]
                                ]
                            },
                            style: 'tableTitle',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                widths: [30, 80, '*'],
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
                                    ['1', 'Customer', [
                                            {
                                                text: '- Solicitud de Reemplazo',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['2', 'Mi AT&T / IVR', [
                                            {
                                                text: '- Account Identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Registration: Manages user registration to the platform My AT&T Mobile and Web',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['3', 'Mi AT&T / IVR', [
                                            {
                                                text: '- Account Identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Registration: Manages user registration to the platform My AT&T Mobile and Web',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['4', 'Opus', [
                                            {
                                                text: '- Subscriber identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Official identification',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['5', 'Opus', [
                                            {
                                                text: '- Subscriber identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Official identification',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['6', 'Amdocs CRM', [
                                            {
                                                text: '- Subscriber identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Passcode',
                                                alignment: 'left'
                                            }
                                        ]
                                    ]
                                ]
                            },
                            style: 'tableSubtitleLast',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                widths: [20, '*', '*'],
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
                                    ['1', {
                                        text: 'text',
                                        alignment: 'left'
                                    }, {
                                        text: 'text',
                                        alignment: 'left'
                                    }]
                                ]
                            },
                            style: 'tableSubtitleLast',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                            bold: true
                                        },
                                        {
                                            text: 'Capacity',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'KPI Name',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'KPI Description',
                                            alignment: 'center',
                                            bold: true
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
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                widths: [40, 70, '*', 120],
                                body: [
                                    [
                                        {
                                            text: 'Number',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Name',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Description',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Attached File',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['1', 'File name', {
                                        alignment: 'left',
                                        text: 'File description'
                                    }, {
                                        alignment: 'left',
                                        text: 'Opreport123.doc '
                                    }]
                                ]
                            },
                            style: 'tableSubtitleLast',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                            bold: true
                                        },
                                        {
                                            text: 'Id act',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Project / Initiative / Business requeriment',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Function / Responsability',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['123', '456', {
                                        text: 'Description',
                                        alignment: 'left'
                                    }, {
                                        text: 'Description',
                                        alignment: 'left'
                                    }]
                                ]
                            },
                            style: 'tableTitleLastz',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                            bold: true
                                        },
                                        {
                                            text: 'Name',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Description',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Attached File',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['1', 'File name', {
                                        alignment: 'left',
                                        text: 'File description'
                                    }, {
                                        alignment: 'left',
                                        text: 'Opreport123.doc'
                                    }],
                                    ['2', 'File name', {
                                        alignment: 'left',
                                        text: 'File description'
                                    }, {
                                        alignment: 'left',
                                        text: 'Opreport123.doc'
                                    }]
                                ]
                            },
                            style: 'tableTitleLastz',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
                                }
                            }
                        },
                        {
                            text: obj ? '12. Diagram' : '',
                            style: 'title'
                        },
                        {
                            image: obj ? obj.contenido : null,
                            width: 400,
                            //height: 760,
                            margin: [20, 0, 0, 5],
                            fit: [500, 760]
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
                            margin: [20, 5, 0, 5],
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
                            margin: [20, 5, 20, 5],
                            alignment: 'center',
                            color: '#4E4E4E',
                            fontWeight: 100
                        },
                        tableTitleLast: {
                            fontSize: 10,
                            margin: [20, 5, 20, 5],
                            alignment: 'center',
                            color: '#4E4E4E',
                            fontWeight: 100
                        },
                        tableTitleLastz: {
                            fontSize: 10,
                            margin: [20, 5, 40, 5],
                            alignment: 'center',
                            color: '#4E4E4E',
                            fontWeight: 100
                        },
                        macroProcessLabel: {
                            margin: [0, 60, 0, 0]
                        },
                        macroprocess: {
                            fontSize: 35,
                            margin: [0, 0, 0, 30]
                        },
                        processOwners: {
                            bold: true,
                            fontSize: 12
                        },
                        tablePortada: {
                            margin: [0, 300, 0, 0]
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
            },
            $diagramMake: function (obj) {
                svgAsPngUri(obj, {
                    scale: 1.5
                }, function (uri) {
                    var docDefinition = {
                        content: [
                            {
                                text: 'Macroprocess: ' + $barraHerramientas.nombreMacroproceso,
                                style: 'header'
                            },
                            {
                                text: '1. Diagram',
                                style: 'title'
                            },
                            {
                                image: uri,
                                fit: [500, 700],
                                margin: [20, 0, 0, 0]
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
                            }
                        }
                    };
                    pdfMake.fonts = {
                        Roboto: {
                            normal: 'Roboto-Light.ttf',
                            bold: 'Roboto-Regular.ttf'
                        }
                    };

                    pdfMake.createPdf(docDefinition).download(this.$camelize($barraHerramientas.nombreMacroproceso) + "_diagram.pdf");
                });

            },
            $documentMake: function(){
                var docDefinition = {

                    content: [
                        {
                            table: {
                                widths: [180, '*'],
                                body: [
                                    [
                                        {
                                            image: 'data:image/jpeg;base64,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',
                                            width: 88,
                                            height: 36
                                        },
                                        {
                                            text: 'Information Technology',
                                            alignment: 'right'
                                        }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 0 : 0;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            }
                        },
                        {
                            canvas: [
                                {
                                    type: 'line',
                                    x1: 0,
                                    y1: 30,
                                    x2: 520,
                                    y2: 30,
                                    lineWidth: 1,
                                    lineColor: '#2493C5'
                                }
                            ]
                        },
                        {
                            text: 'MACROPROCESS',
                            style: 'macroProcessLabel'
                        },
                        {
                            columns: [
                                {
                                    width: 100,
                                    text: $barraHerramientas.nombreMacroproceso,
                                    style: 'macroprocess'
                                }
                            ]
                        },
                        {
                            text: 'PROCESS OWNERS',
                            style: 'processOwners'
                        },
                        {
                            text: 'Customer Care'
                        },
                        {
                            text: 'Credit'
                        },
                        {
                            table: {
                                widths: [100, 'auto'],
                                body: [
                                    [
                                        {
                                            text: 'Domain:'
                                        },
                                        {
                                            text: 'CRM - Customer Relationship Management'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Megaprocess:'
                                        },
                                        {
                                            text: 'Subscription Management'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Version:'
                                        },
                                        {
                                            text: '4.0'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Last Update:'
                                        },
                                        {
                                            text: 'April 06, 2015'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Author:'
                                        },
                                        {
                                            text: 'Carolina Hernández'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Reviewer:'
                                        },
                                        {
                                            text: 'Jesús Pasten'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'Authorizer:'
                                        },
                                        {
                                            text: 'Pablo Torres / Fernando Valdeón'
                                        }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 0 : 0;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                }
                            },
                            style: 'tablePortada'
                        },
                        {
                            text: 'TOTAL OR PARTIAL REPRODUCTION IS FORBIDDEN',
                            bold: true,
                            alignment: 'center',
                            margin: [0, 20, 0, 20],
                            color: '#B3B3B3'
                        },
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
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                    ['Opus', {
                                        text: 'Customer Experience',
                                        alignment: 'left'
                                    }],
                                    ['CRM', {
                                        text: 'Customer Relationship Management',
                                        alignment: 'left'
                                    }],
                                    ['CIM', {
                                        text: 'Customer Interaction Management',
                                        alignment: 'left'
                                    }],
                                    ['ICAS', {
                                        text: 'Credit Policy',
                                        alignment: 'left'
                                    }],
                                    ['CAPM', {
                                        text: 'Payment',
                                        alignment: 'left'
                                    }],
                                    ['SRM', {
                                        text: 'Subscriber Resource Management',
                                        alignment: 'left'
                                    }]
                                ]
                            },
                            style: 'tableTitle',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                widths: [30, 80, '*'],
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
                                    ['1', 'Customer', [
                                            {
                                                text: '- Solicitud de Reemplazo',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['2', 'Mi AT&T / IVR', [
                                            {
                                                text: '- Account Identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Registration: Manages user registration to the platform My AT&T Mobile and Web',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['3', 'Mi AT&T / IVR', [
                                            {
                                                text: '- Account Identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Registration: Manages user registration to the platform My AT&T Mobile and Web',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['4', 'Opus', [
                                            {
                                                text: '- Subscriber identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Official identification',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['5', 'Opus', [
                                            {
                                                text: '- Subscriber identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Official identification',
                                                alignment: 'left'
                                            }
                                        ]
                                    ],
                                    ['6', 'Amdocs CRM', [
                                            {
                                                text: '- Subscriber identification',
                                                alignment: 'left'
                                            },
                                            {
                                                text: '- Passcode',
                                                alignment: 'left'
                                            }
                                        ]
                                    ]
                                ]
                            },
                            style: 'tableSubtitleLast',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                widths: [20, '*', '*'],
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
                                    ['1', {
                                        text: 'text',
                                        alignment: 'left'
                                    }, {
                                        text: 'text',
                                        alignment: 'left'
                                    }]
                                ]
                            },
                            style: 'tableSubtitleLast',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                            bold: true
                                        },
                                        {
                                            text: 'Capacity',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'KPI Name',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'KPI Description',
                                            alignment: 'center',
                                            bold: true
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
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                widths: [40, 70, '*', 120],
                                body: [
                                    [
                                        {
                                            text: 'Number',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Name',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Description',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Attached File',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['1', 'File name', {
                                        alignment: 'left',
                                        text: 'File description'
                                    }, {
                                        alignment: 'left',
                                        text: 'Opreport123.doc '
                                    }]
                                ]
                            },
                            style: 'tableSubtitleLast',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                            bold: true
                                        },
                                        {
                                            text: 'Id act',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Project / Initiative / Business requeriment',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Function / Responsability',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['123', '456', {
                                        text: 'Description',
                                        alignment: 'left'
                                    }, {
                                        text: 'Description',
                                        alignment: 'left'
                                    }]
                                ]
                            },
                            style: 'tableTitleLastz',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                                            bold: true
                                        },
                                        {
                                            text: 'Name',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Description',
                                            alignment: 'center',
                                            bold: true
                                        },
                                        {
                                            text: 'Attached File',
                                            alignment: 'center',
                                            bold: true
                                        }
                                    ],
                                    ['1', 'File name', {
                                        alignment: 'left',
                                        text: 'File description'
                                    }, {
                                        alignment: 'left',
                                        text: 'Opreport123.doc'
                                    }],
                                    ['2', 'File name', {
                                        alignment: 'left',
                                        text: 'File description'
                                    }, {
                                        alignment: 'left',
                                        text: 'Opreport123.doc'
                                    }]
                                ]
                            },
                            style: 'tableTitleLastz',
                            layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 1 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? '#979797' : '#979797';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? '#979797' : '#979797';
                                },
                                paddingLeft: function (i, node) {
                                    return 10;
                                },
                                paddingRight: function (i, node) {
                                    return 10;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
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
                            margin: [20, 5, 0, 5],
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
                            margin: [20, 5, 20, 5],
                            alignment: 'center',
                            color: '#4E4E4E',
                            fontWeight: 100
                        },
                        tableTitleLast: {
                            fontSize: 10,
                            margin: [20, 5, 20, 5],
                            alignment: 'center',
                            color: '#4E4E4E',
                            fontWeight: 100
                        },
                        tableTitleLastz: {
                            fontSize: 10,
                            margin: [20, 5, 40, 5],
                            alignment: 'center',
                            color: '#4E4E4E',
                            fontWeight: 100
                        },
                        macroProcessLabel: {
                            margin: [0, 60, 0, 0]
                        },
                        macroprocess: {
                            fontSize: 35,
                            margin: [0, 0, 0, 30]
                        },
                        processOwners: {
                            bold: true,
                            fontSize: 12
                        },
                        tablePortada: {
                            margin: [0, 300, 0, 0]
                        }
                    }
                };
                pdfMake.fonts = {
                    Roboto: {
                        normal: 'Roboto-Light.ttf',
                        bold: 'Roboto-Regular.ttf'
                    }
                };

                pdfMake.createPdf(docDefinition).download(this.$camelize($barraHerramientas.nombreMacroproceso) + "_document.pdf");
                
            },
            $exportDiagram: function(obj){
                saveSvg(obj,this.$camelize($barraHerramientas.nombreMacroproceso) + "_diagram.svg", {scale: 1});
            },
            $appart: function(ancho, alto, svgElement){
                var nuevaAltura;
                var coordinates = [];
                var pagesForWidth = parseInt(ancho / 612) + 1;
                var pagesForHeight = parseInt(alto / 792) + 1;
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
                    svgAsPngUri(svgElement, {
                        scale: 1.5
                    }, function (uri) {
                        var pdf = new jsPDF('p', 'pt', 'letter', true);
                        pdf.setFontSize(10);
                        for (var i in coordinates) {
                            for (var j in coordinates[i]) {
                                if (pagesCounter > 0) {
                                    pdf.addPage();
                                }
                                pagesCounter++;
                                pdf.addImage(uri, 'PNG', coordinates[i][j][0].x, coordinates[i][j][0].y, ancho, alto);
                                pdf.text(590, 30, '' + pagesCounter);
                            }
                        }
                        pdf.save('_protrait.pdf');
                    });
                } else { // alto <= ancho
                    nuevaAltura = ((780 * alto) / ancho);
                    svgAsPngUri(svgElement, {
                        scale: 1.5
                    }, function (uri) {
                        var pdf = new jsPDF('l', 'pt', 'letter');
                        pdf.addImage(uri, 'PNG', 0, 0, 792, nuevaAltura);
                        pdf.save('_capacities.pdf');
                    });
                }
            }
        };
    };
    Service.$inject = ['$barraHerramientas', '$rootScope'];
    angular
        .module('wordService', [])
        .service('$word', Service);
})();