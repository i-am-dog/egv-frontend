export class ChartOptions {
  public static getOptions(): any {
    return {
      colors: ['#DDDF0D', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee',
        '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      title: {text: 'History of recommended Gas Prices in Gwei', style: {color: '#ffffff', fontSize: '24px' }},
      chart: {
        type: 'line',
        height: '600px',

        style: {
          color: '#ffffff'
        },
        backgroundColor: 'rgba(47,44,44,0.9)',
        className: 'dark-container',
        plotBackgroundColor: 'rgba(47,44,44,0.9)'
      },
      xAxis: {
        gridLineColor: '#333333',
        gridLineWidth: 1,
        labels: {
          style: {
            color: '#A0A0A0'
          }
        },
        lineColor: '#A0A0A0',
        tickColor: '#A0A0A0',
        title: {
          style: {
            color: '#CCC',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        gridLineColor: '#333333',
        labels: {
          style: {
            color: '#A0A0A0'
          }
        },
        lineColor: '#A0A0A0',
        minorTickInterval: null,
        tickColor: '#333333',
        tickWidth: 1,
        title: {
          style: {
            color: '#CCC',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
          }
        }
      },

      tooltip: {
        headerFormat: '',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        style: {
          color: '#F0F0F0'
        }
      },

      toolbar: {
        itemStyle: {
          color: 'silver'
        }
      },

      line: {
        dataLabels: {
          enabled: true
        }
      },

      plotOptions: {
        line: {
          dataLabels: {
            color: '#CCC'
          },
          marker: {
            lineColor: '#333'
          }
        },
        spline: {
          marker: {
            lineColor: '#333'
          }
        },
        scatter: {
          marker: {
            lineColor: '#333'
          }
        },
        candlestick: {
          lineColor: 'white'
        }
      },

      labels: {
        style: {
          color: '#CCC'
        }
      },

      navigation: {
        buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
            fill: {
              linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
              stops: [
                [0.4, '#606060'],
                [0.6, '#333333']
              ]
            },
            stroke: '#000000'
          }
        }
      },

      // scroll charts
      rangeSelector: {
        inputEnabled: false,
        buttons: [{
          type: 'hour',
          count: 1,
          text: '1h'
        }, {
          type: 'hour',
          count: 24,
          text: '24h'
        }, {
          type: 'day',
          count: 7,
          text: '1w'
        }, {
          type: 'all',
          text: 'All'
        }],
        buttonTheme: {
          fill: {
            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
            stops: [
              [0.4, '#888'],
              [0.6, '#555']
            ]
          },
          stroke: '#000000',
          style: {
            color: '#CCC',
            fontWeight: 'bold'
          },
          states: {
            hover: {
              fill: {
                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                  [0.4, '#BBB'],
                  [0.6, '#888']
                ]
              },
              stroke: '#000000',
              style: {
                color: 'white'
              }
            },
            select: {
              fill: {
                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                  [0.1, '#000'],
                  [0.3, '#333']
                ]
              },
              stroke: '#000000',
              style: {
                color: 'yellow'
              }
            }
          }
        },
        inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
        },
        labelStyle: {
          color: 'silver'
        }
      },
      navigator: {
        enabled: false,
        adaptToUpdatedData: false,
        handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(16, 16, 16, 0.5)',
        series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
        }
      },
      scrollbar: {
        enabled: false,
        barBackgroundColor: {
          linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
          stops: [
            [0.4, '#888'],
            [0.6, '#555']
          ]
        },
        barBorderColor: '#CCC',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: {
          linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
          stops: [
            [0.4, '#888'],
            [0.6, '#555']
          ]
        },
        buttonBorderColor: '#CCC',
        rifleColor: '#FFF',
        trackBackgroundColor: {
          linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
          stops: [
            [0, '#000'],
            [1, '#333']
          ]
        },
        trackBorderColor: '#666'
      },

      series: [
        {
          name: 'Safe Low',
          color: '#428d23',
          data: [],
          allowPointSelect: true,
        },
        {
          name: 'Average',
          color: '#dddddd',
          data: [],
          allowPointSelect: true,
        },
        {
          name: 'Fast',
          color: '#d65f5f',
          data: [],
          allowPointSelect: true,
        }
      ]
    };
  }

}
