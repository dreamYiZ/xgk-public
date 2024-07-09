const { mergeSub } = require('./mergeSub')

describe('mergeSub', () => {
  it('should correctly merge box arrays', () => {
    const preBoxArr = [
      {
        "boxid": "06c4a2dc-642d-4f83-83f7-ce75a2c84971",
        "sub": {
          "type": "text",
          "fontSize": "25px",
          "fontWeight": 900,
          "content": "Hello, woEEErld",
          "color": "#FFFFFF"
        }
      },
      {
        "boxid": "e04078ca-4b7f-4da5-ab8a-e54a607127ea",
        "sub": {
          "type": "bar_chart",
          "xAxis": [
            {
              "scaleType": "band",
              "data": [
                "2",
                "e",
                "f"
              ]
            }
          ],
          "series": [
            {
              "data": [
                4,
                3,
                5
              ],
              "color": "#000000"
            },
            {
              "data": [
                1,
                6,
                3
              ],
              "color": "#5d1d1d"
            },
            {
              "data": [
                2,
                5,
                6
              ],
              "color": "#131010"
            }
          ],
          "width": 500,
          "height": 300
        }
      },
      {
        "boxid": "71aa47dd-745d-401a-833c-337b6fb58df2",
        "sub": {
          "type": "pie_chart",
          "series": [
            {
              "data": [
                {
                  "id": 0,
                  "value": 10,
                  "label": "series A"
                },
                {
                  "id": 1,
                  "value": 15,
                  "label": "series B"
                },
                {
                  "id": 2,
                  "value": 20,
                  "label": "series C"
                }
              ],
              "innerRadius": 30,
              "outerRadius": 100,
              "paddingAngle": 5,
              "cornerRadius": 5,
              "startAngle": -90,
              "endAngle": 180,
              "cx": 150,
              "cy": 150
            }
          ],
          "width": 500,
          "height": 300,
          "color": [
            "#c72929",
            "#15b921",
            "#1d1fa3"
          ]
        }
      },
      {
        "boxid": "78db5628-8bc1-49ee-a939-05a6da22ea5f",
        "sub": {
          "type": "bar_chart",
          "xAxis": [
            {
              "scaleType": "band",
              "data": [
                "BBB",
                "EEE",
                "DDD"
              ]
            }
          ],
          "series": [
            {
              "data": [
                5,
                5,
                3
              ],
              "color": "#982323"
            },
            {
              "data": [
                1,
                3,
                3
              ],
              "color": "#279f45"
            },
            {
              "data": [
                2,
                3,
                6
              ],
              "color": "#4f1fc4"
            }
          ],
          "width": 500,
          "height": "",
          "color": [
            "#844242",
            "#49ca61",
            "#981884",
            "#57796d"
          ]
        }
      },
      {
        "boxid": "d4442322-5ff5-4c14-abec-62ed5c816c2a",
        "sub": {
          "type": "line_chart",
          "xAxis": [
            {
              "data": [
                1,
                2,
                3,
                5,
                8,
                10,
                "15"
              ]
            }
          ],
          "series": [
            {
              "data": [
                2,
                5.5,
                2,
                3,
                1.5,
                5
              ],
              "color": "#57bb22"
            }
          ],
          "width": 500,
          "height": 300
        }
      }
    ]

    const newBoxArr = [
      {
        "boxid": "d4442322-5ff5-4c14-abec-62ed5c816c2a",
        "sub": {
          "xAxis": [
            {
              "data": [
                3,
                4,
                5,
                6,
                7,
                8,
                9
              ]
            }
          ],
          "series": [
            {
              "data": [
                32,
                52.5,
                23,
                34,
                15.5,
                56
              ],
            }
          ],
        }
      }
    ]


    const expected = [
      {
        "boxid": "06c4a2dc-642d-4f83-83f7-ce75a2c84971",
        "sub": {
          "type": "text",
          "fontSize": "25px",
          "fontWeight": 900,
          "content": "Hello, woEEErld",
          "color": "#FFFFFF"
        }
      },
      {
        "boxid": "e04078ca-4b7f-4da5-ab8a-e54a607127ea",
        "sub": {
          "type": "bar_chart",
          "xAxis": [
            {
              "scaleType": "band",
              "data": [
                "2",
                "e",
                "f"
              ]
            }
          ],
          "series": [
            {
              "data": [
                4,
                3,
                5
              ],
              "color": "#000000"
            },
            {
              "data": [
                1,
                6,
                3
              ],
              "color": "#5d1d1d"
            },
            {
              "data": [
                2,
                5,
                6
              ],
              "color": "#131010"
            }
          ],
          "width": 500,
          "height": 300
        }
      },
      {
        "boxid": "71aa47dd-745d-401a-833c-337b6fb58df2",
        "sub": {
          "type": "pie_chart",
          "series": [
            {
              "data": [
                {
                  "id": 0,
                  "value": 10,
                  "label": "series A"
                },
                {
                  "id": 1,
                  "value": 15,
                  "label": "series B"
                },
                {
                  "id": 2,
                  "value": 20,
                  "label": "series C"
                }
              ],
              "innerRadius": 30,
              "outerRadius": 100,
              "paddingAngle": 5,
              "cornerRadius": 5,
              "startAngle": -90,
              "endAngle": 180,
              "cx": 150,
              "cy": 150
            }
          ],
          "width": 500,
          "height": 300,
          "color": [
            "#c72929",
            "#15b921",
            "#1d1fa3"
          ]
        }
      },
      {
        "boxid": "78db5628-8bc1-49ee-a939-05a6da22ea5f",
        "sub": {
          "type": "bar_chart",
          "xAxis": [
            {
              "scaleType": "band",
              "data": [
                "BBB",
                "EEE",
                "DDD"
              ]
            }
          ],
          "series": [
            {
              "data": [
                5,
                5,
                3
              ],
              "color": "#982323"
            },
            {
              "data": [
                1,
                3,
                3
              ],
              "color": "#279f45"
            },
            {
              "data": [
                2,
                3,
                6
              ],
              "color": "#4f1fc4"
            }
          ],
          "width": 500,
          "height": "",
          "color": [
            "#844242",
            "#49ca61",
            "#981884",
            "#57796d"
          ]
        }
      },
      {
        "boxid": "d4442322-5ff5-4c14-abec-62ed5c816c2a",
        "sub": {
          "type": "line_chart",
          "xAxis": [
            {
              "data": [
                3,
                4,
                5,
                6,
                7,
                8,
                9
              ]
            }
          ],
          "series": [
            {
              "data": [
                32,
                52.5,
                23,
                34,
                15.5,
                56
              ],
              "color": "#57bb22"
            }
          ],
          "width": 500,
          "height": 300
        }
      }
    ];

    const result = mergeSub(preBoxArr, newBoxArr);

    expect(result).toEqual(expected);
  });
});









describe('mergeSub 2', () => {
  it('should correctly merge box arrays', () => {
    const preBoxArr = [
      {
        "boxid": "06c4a2dc-642d-4f83-83f7-ce75a2c84971",
        "sub": {
          "type": "text",
          "fontSize": "25px",
          "fontWeight": 900,
          "content": "Hello, woEEErld",
          "color": "#FFFFFF"
        }
      },
      {
        "boxid": "e04078ca-4b7f-4da5-ab8a-e54a607127ea",
        "sub": {
          "type": "bar_chart",
          "xAxis": [
            {
              "scaleType": "band",
              "data": [
                "2",
                "e",
                "f"
              ]
            }
          ],
          "series": [
            {
              "data": [
                4,
                3,
                5
              ],
              "color": "#000000"
            },
            {
              "data": [
                1,
                6,
                3
              ],
              "color": "#5d1d1d"
            },
            {
              "data": [
                2,
                5,
                6
              ],
              "color": "#131010"
            }
          ],
          "width": 500,
          "height": 300
        }
      },
      {
        "boxid": "71aa47dd-745d-401a-833c-337b6fb58df2",
        "sub": {
          "type": "pie_chart",
          "series": [
            {
              "data": [
                {
                  "id": 0,
                  "value": 10,
                  "label": "series A"
                },
                {
                  "id": 1,
                  "value": 15,
                  "label": "series B"
                },
                {
                  "id": 2,
                  "value": 20,
                  "label": "series C"
                }
              ],
              "innerRadius": 30,
              "outerRadius": 100,
              "paddingAngle": 5,
              "cornerRadius": 5,
              "startAngle": -90,
              "endAngle": 180,
              "cx": 150,
              "cy": 150
            }
          ],
          "width": 500,
          "height": 300,
          "color": [
            "#c72929",
            "#15b921",
            "#1d1fa3"
          ]
        }
      },
      {
        "boxid": "78db5628-8bc1-49ee-a939-05a6da22ea5f",
        "sub": {
          "type": "bar_chart",
          "xAxis": [
            {
              "scaleType": "band",
              "data": [
                "BBB",
                "EEE",
                "DDD"
              ]
            }
          ],
          "series": [
            {
              "data": [
                5,
                5,
                3
              ],
              "color": "#982323"
            },
            {
              "data": [
                1,
                3,
                3
              ],
              "color": "#279f45"
            },
            {
              "data": [
                2,
                3,
                6
              ],
              "color": "#4f1fc4"
            }
          ],
          "width": 500,
          "height": "",
          "color": [
            "#844242",
            "#49ca61",
            "#981884",
            "#57796d"
          ]
        }
      },
      {
        "boxid": "d4442322-5ff5-4c14-abec-62ed5c816c2a",
        "sub": {
          "type": "line_chart",
          "xAxis": [
            {
              "data": [
                1,
                2,
                3,
                5,
                8,
                10,
                "15"
              ]
            }
          ],
          "series": [
            {
              "data": [
                2,
                5.5,
                2,
                3,
                1.5,
                5
              ],
              "color": "#57bb22"
            }
          ],
          "width": 500,
          "height": 300
        }
      }
    ]

    const newBoxArr = [
      {
        "boxid": "71aa47dd-745d-401a-833c-337b6fb58df2",
        "sub": {
          "series": [
            {
              "data": [
                {
                  "id": 0,
                  "value": 13,
                  "label": "series A13"
                },
                {
                  "id": 1,
                  "value": 165,
                  "label": "series B165"
                },
                {
                  "id": 2,
                  "value": 20,
                  "label": "series C"
                }
              ],

            }
          ],
        }
      },
    ]


    const expected = [
      {
        "boxid": "06c4a2dc-642d-4f83-83f7-ce75a2c84971",
        "sub": {
          "type": "text",
          "fontSize": "25px",
          "fontWeight": 900,
          "content": "Hello, woEEErld",
          "color": "#FFFFFF"
        }
      },
      {
        "boxid": "e04078ca-4b7f-4da5-ab8a-e54a607127ea",
        "sub": {
          "type": "bar_chart",
          "xAxis": [
            {
              "scaleType": "band",
              "data": [
                "2",
                "e",
                "f"
              ]
            }
          ],
          "series": [
            {
              "data": [
                4,
                3,
                5
              ],
              "color": "#000000"
            },
            {
              "data": [
                1,
                6,
                3
              ],
              "color": "#5d1d1d"
            },
            {
              "data": [
                2,
                5,
                6
              ],
              "color": "#131010"
            }
          ],
          "width": 500,
          "height": 300
        }
      },
      {
        "boxid": "71aa47dd-745d-401a-833c-337b6fb58df2",
        "sub": {
          "type": "pie_chart",
          "series": [
            {
              "data": [
                {
                  "id": 0,
                  "value": 13,
                  "label": "series A13"
                },
                {
                  "id": 1,
                  "value": 165,
                  "label": "series B165"
                },
                {
                  "id": 2,
                  "value": 20,
                  "label": "series C"
                }
              ],
              "innerRadius": 30,
              "outerRadius": 100,
              "paddingAngle": 5,
              "cornerRadius": 5,
              "startAngle": -90,
              "endAngle": 180,
              "cx": 150,
              "cy": 150
            }
          ],
          "width": 500,
          "height": 300,
          "color": [
            "#c72929",
            "#15b921",
            "#1d1fa3"
          ]
        }
      },
      {
        "boxid": "78db5628-8bc1-49ee-a939-05a6da22ea5f",
        "sub": {
          "type": "bar_chart",
          "xAxis": [
            {
              "scaleType": "band",
              "data": [
                "BBB",
                "EEE",
                "DDD"
              ]
            }
          ],
          "series": [
            {
              "data": [
                5,
                5,
                3
              ],
              "color": "#982323"
            },
            {
              "data": [
                1,
                3,
                3
              ],
              "color": "#279f45"
            },
            {
              "data": [
                2,
                3,
                6
              ],
              "color": "#4f1fc4"
            }
          ],
          "width": 500,
          "height": "",
          "color": [
            "#844242",
            "#49ca61",
            "#981884",
            "#57796d"
          ]
        }
      },
      {
        "boxid": "d4442322-5ff5-4c14-abec-62ed5c816c2a",
        "sub": {
          "type": "line_chart",
          "xAxis": [
            {
              "data": [
                1,
                2,
                3,
                5,
                8,
                10,
                "15"
              ]
            }
          ],
          "series": [
            {
              "data": [
                2,
                5.5,
                2,
                3,
                1.5,
                5
              ],
              "color": "#57bb22"
            }
          ],
          "width": 500,
          "height": 300
        }
      }
    ]


    const result = mergeSub(preBoxArr, newBoxArr);

    expect(result).toEqual(expected);
  });
});




describe('mergeSub 3', () => {
  it('should correctly merge box arrays', () => {
    const preBoxArr = [

    ]

    const newBoxArr = [
      {
        "boxid": "71aa47dd-745d-401a-833c-337b6fb58df2",
        "sub": {
          "series": [
            {
              "data": [
                {
                  "id": 0,
                  "value": 13,
                  "label": "series A13"
                },
                {
                  "id": 1,
                  "value": 165,
                  "label": "series B165"
                },
                {
                  "id": 2,
                  "value": 20,
                  "label": "series C"
                }
              ],

            }
          ],
        }
      },
    ]


    const expected = [

    ]


    const result = mergeSub(preBoxArr, newBoxArr);

    expect(result).toEqual(expected);
  });
});
