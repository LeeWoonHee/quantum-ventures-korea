<template>
    <div id="chart">
        <apexchart
            class="donut-chart"
            type="donut"
            :options="chartOptions"
            :series="series"
        />
    </div>
</template>
<script>

export default {
    name: "QtPieChart",
    watch: {
        radioValue( value ) {
            this.radioValue = value
        },
    },
    props: {
        yTitle: {
            type: String,
            default: ''
        },
        xTitle: {
            type: String,
            default: ''
        },
        horizontal: {
            type: Boolean,
            default: false
        },
        radioValue: {
            type: String,
            default: null
        },
        smallCategory: {
            type: String,
            default: null
        },
        companies: {
            type: Array,
            default: () => []
        },
        category: {
            type: String,
            default: null
        }
    },
    data: () => ( {
        investmentStage : [
            'Seed',
            'PreSeed',
            'SeriesA',
            'SeriesB',
            'PrivateEquity',
            'Angel',
            'SeriesD',
            'SeriesC',
            'SeriesE',
            'SeriesF',
            'SeriesG',
            'SeriesH',
            'SeriesI',
            'SeriesJ',
            'Grant',
            'InitialCoinOffering',
            'SecondaryMarket',
            'PreIPO',
            'ConvertibleNote',
            'VentureSeriesUnknown',
        ],
        length: 10,
        series: [],
        chartOptions: {
            colors:[
                '#df9f9f',
                '#ecc0c0',
                '#e5b6a7',
                '#e4a286',
                '#fdc59b',
                '#e1ae66',
                '#ead28d',
                '#f4d190',
                '#def0a9',
                '#8dc68d',
                '#61aeaa',
                '#8dc9b3',
                '#91b6dd',
                '#bad0e4',
                '#acb9e7',
                '#bac6e4',
                '#a0adda',
                '#8490bd',
                '#505288',
                '#767895'
            ],
            labels: [],
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'left'
                    }
                }
            }],
            plotOptions: {
                pie: {
                    donut: {
                        size:'50%',
                        labels: {
                        },

                    }
                }
            }
        },
    } ),
    methods: {
        frequencyData (){
            // const result = this.companies.map((item, index) => {
            //     const fundingTypeSum = item.invest_funding_type.reduce((acc, cur) => {
            //         if (acc.name === 'Seed') {
            //             const checkInvest= this.category === '투자 금액' ? acc.invest_amount :  acc.invest_frequency
            //             acc[acc.name] = checkInvest
            //         }
            //         const checkInvest= this.category === '투자 금액' ? cur.invest_amount :  cur.invest_frequency
            //         acc[cur.name] = checkInvest
            //         return acc
            //     }, )
            //     return fundingTypeSum
            // })
            // const total = this.investmentStage.reduce((item, index) => {
            //     const totalAmount = result
            //         .map(item2 => parseInt(item2[index] || 0))
            //         .reduce((sum, amount) => sum + amount, 0)
            //     item[index] = totalAmount.toFixed(1)
            //     return item
            // }, {})
            //
            // let data  = this.investmentStage.slice(0, this.investmentStage.length).map( (item,index) => {
            //
            //     return{
            //         second : item,
            //         investmentMoney: total[this.investmentStage[index]]
            //     }
            // }).sort( ( a, b ) => {
            //     return b.investmentMoney - a.investmentMoney
            // } ).map( ( item, index ) => {
            //
            //     return {
            //         ranking: index + 1,
            //         second : item.second,
            //         investmentMoney: item.investmentMoney
            //     }
            // } )
            // let chartLabels = data.map((item ,index) => {
            //     return item.second
            // })
            //
            // let chartSeries = data.map((item ,index) => {
            //     return parseInt(item.investmentMoney)
            // })
            //
            // this.series =chartSeries
            // this.chartOptions.labels = chartLabels

        }
    },
    created() {
        this.frequencyData()
    },
    mounted() {

    }
}
</script>

<style
    scoped
    lang="scss"
>
#chart::v-deep {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    width: 95%;
    height:744px;
    margin-top: 14px;
    border: 1px solid #eaeaea;
    .donut-chart{
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        width:900px;
        height:100%;
        position:relative;
        //&::after{
        //    content:'투자 빈도수';
        //    position:absolute;
        //    top:43%;
        //    right:17%;
        //
        //    font-size: 20px;
        //    font-weight: 400;
        //}
        //&::before{
        //    content:'투자 단계';
        //    position:absolute;
        //    top:50%;
        //    right:18.5%;
        //    font-size: 20px;
        //    font-weight: 400;
        //}
        .apexcharts-canvas{
            //height:100% !important;

            .apexcharts-svg{
                //width:150% !important;
                //height:100%;
                foreignObject{
                    //height:100%;
                }
                .apexcharts-legend-marker{
                    border-radius:0 !important;
                    width:32px !important;
                    height:14px !important;
                    margin-right:20px !important;

                }
            }
        }
        .apexcharts-legend{
            left:0 !important;
            top: 100px !important;
            right:auto !important;
            width:28%;
            .apexcharts-legend-series{
                margin:0 !important;
            }
        }
        .apexcharts-inner{
            transform:translateX(30%);

        }

    }

    .center-label{
        position:absolute;
        left:0;
    }
}
</style>
