function highChart(data) {
    console.log(data);
    $('#container').highcharts({
        chart: {
            backgroundColor: '#EEEFDF',
            type: 'line',
            style: {
                font: '12pt News Cycle, serif',
                color: '#0f1c13'
            },
        },
        title: {
            text: 'Market Feelz And your moneys',
            style: {
                font: '20pt News Cycle, serif',
                color: '#0F1C13'
            },
        },
        subtitle: {
            text: 'watch the emo secs',
            style: {
                font: '14pt News Cycle, serif',
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                hour: '%l:%M %p',
                ///day: '%a',
                //month: '%e1 %b',
                //year: '%b'
            },
            title: {
                text: 'The Last 24 Hours'
            },
            max: Date.now(),
            min: Date.now() - 86400000,
        },
        yAxis: [{ //sentiment axis
            labels: {
                style: {
                    color: '#7F8FC3'
                }
            },
            title: {
                text: 'Tweet Sentiment',
                style: {
                    color: '#3C528B',
                }
            },
            min: -1,
            max: 1,
            opposite: true,
        }, { //Price Axis
            labels: {
                style: {
                    color: '#BD872D'
                }
            },
            title: {
                text: 'Price',
                style: {
                    color: '#BD872D'
                }
            }
        }],

        series: [{

            name: 'Tweet Sentiment',
            data: data.tweets,
            id: 'primary',
            type: 'scatter',
            color: '#7F8FC3',
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%l:%M %p}: {point.y:.4f}',
            },
        }, {
            name: 'Price',
            data: data.prices,
            shadow: true,
            yAxis: 1,
            color: '#BD872D',
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%l:%M %p}: ${point.y:.2f}',
            },

        }, {
            connectNulls: true,
            shadow: true,
            name: 'Average Tweet Sentiment',
            linkedTo: 'primary',
            showInLegend: true,
            type: 'trendline',
            algorithm: 'EMA',
            periods: 50,
            color: '#3C528B',
            tooltip: {
                headerFormat: '<b>Average Sentiment</b><br>',
                pointFormat: '{point.y:.4f}',
            },
        }],
        plotOptions: {
            scatter: {
                marker: {
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: '#3C528B'
                        }
                    }
                }
            }
        },
        legend: {
            itemStyle: {
                font: '12pt News Cycle, serif',
                color: '#0F1C13',
            }
        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        }
        // {
        //     name: 'Volume',
        //     data: data.volume,
        //     type: 'column'
        // }]
    });
}

$(document).ready(function() {
    var chart, volume, prices, tweetSentiment, articleSentiment, stockData;


    $.post('/chart_data', function(response) {
        stockData = response;
        highChart(stockData);
        console.log(stockData.tweets)
    }, 'json');

    // $.post('/chart_data', function(response) {
    //     stockData = response;
    //     stockChart(stockData);
    // }, 'json');


    // $.post('/box_data', function(response) {
    //     boxData = response;
    //     populateBoxes(boxData);
    // }, 'json');

});