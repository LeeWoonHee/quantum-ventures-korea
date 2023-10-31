<template>
  <div id="chart">
    <apexchart
        class="blex border-1 border-gray"
        :type="chartOptions.chart.type"
        height="729"
        :options="chartOptions"
        :series="this.radioValue !== '분기별 탑20 산업 트렌드' ?  series :lineSeries"
        :style="this.radioValue !== '분기별 탑20 산업 트렌드' ? {width:'95%'} : {width:'100%'}"
        ref="chart"
    >
    </apexchart>
  </div>
</template>

<script>
export default {
  name: "QtBarChart",
  watch: {
    chartLength( value ) {
      this.chartLength = value
      this.updateChartData()
    },
    radioValue: {
      immediate: true,
      handler( value ) {
        this.updateCategoryChart()
      }
    },
    companies: {
      deep: true,
      immediate: true,
      handler( value ) {
        this.filterChartData()
      }
    }
  },
  props: {
    chartLength: {
      type: Number,
      default: 10
    },
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
    investmentStage: [
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
    lineSeries: [],
    series: [ {
      data: []
    } ],
    chartOptions: {

      chart: {
        type: 'bar',
        toolbar: {
          show: false
        },

      },
      xaxis: {
        title: {
          text: '',
          style: {
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: 'suit',
            color: '#000000',
          }
        },
        position: 'bottom',
        type: 'numeric'

      },
      group: {
        style: {
          fontSize: '10px',
          fontWeight: 700
        },
        groups: []
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: false
        },
      },
      legend: {
        show: false
      },
      title:
          {
            text: '',
            style: {
              fontSize: '14px',
              fontWeight: 400,
              fontFamily: 'suit',
              color: '#000000'
            }
          },
      stroke: {
        show: true,
        color: "red",
      }
    },
  } ),
  methods: {
    initChartData() {

      if( this.smallCategory === '날짜' ) {

        //
        // let date = []
        // let dateData = []
        //
        // for( let i = 0; i < this.companies.length; i++ ) {
        //     const dateString = this.companies[i].date.toString()
        //     date.push(`${dateString.slice( 0, 4 )}.${dateString.slice(4,6)}.${dateString.slice(6,8)}` )
        // }
        //
        // dateData = date.filter( ( item, index ) => {
        //     return date.indexOf( item ) === index
        // } )
        // //연도별 투자금액 합치기
        //
        // let chartUpdate = dateData.slice( 0, dateData.length ).map( ( item, index ) => {
        //     return {
        //         x: item,
        //         y: this.companies.filter( ( item2, index2 ) => {
        //             const dateString = item2.date.toString()
        //             const date =`${dateString.slice( 0, 4 )}.${dateString.slice(4,6)}.${dateString.slice(6,8)}`
        //             return  date === item
        //         } ).reduce( ( acc, cur ) => {
        //             const checkInvest = this.category === '투자 금액' ? cur.invest_amount :  cur.invest_frequency
        //             return acc + parseInt( checkInvest )
        //         }, 0 )
        //     }
        // } ).sort( ( a, b ) => {
        //     return b.y - a.y
        // } ).slice(0,this.length).map( ( item3, index3 ) => {
        //     return {
        //         x: item3.x,
        //         y: item3.y
        //     }
        // } )
        //
        // this.series = [ {
        //     data: chartUpdate
        // } ]
      } else if( this.smallCategory === '산업' ) {

        // let industry = []
        // let industryData = []
        //
        // for( let i = 0; i < this.companies.length; i++ ) {
        //   for( let j = 0; j < this.companies[ i ].industries.length; j++ ) {
        //     industry.push( this.companies[ i ].industries[ j ].name )
        //   }
        // }
        // industryData = industry.filter( ( item, index ) => {
        //   return industry.indexOf( item ) === index
        // } )
        //
        // let chartUpdate = industryData.slice( 0, industryData.length ).map( ( item, index ) => {
        //   return {
        //     x: item,
        //     y: this.companies
        //         .filter( ( item2, index2 ) => {
        //           const company = item2.industries.map( ( item3 ) => {
        //             return item3.name
        //           } )
        //           return company.indexOf( item ) !== -1
        //         } )
        //         .reduce( ( acc, cur ) => {
        //           return acc + cur.industries
        //               .filter( ( industry ) => industry.name === item )
        //               .reduce( ( total, industry ) => {
        //                 const checkInvest = this.category === '투자 금액' ? industry.invest_amount : industry.invest_frequency
        //                 return total + checkInvest
        //               }, 0 )
        //         }, 0 ),
        //   }
        // } ).sort( ( a, b ) => {
        //   return b.y - a.y
        // } ).slice( 0, this.length ).map( ( item2, index2 ) => {
        //   return {
        //     x: item2.x,
        //     y: item2.y
        //   }
        // } )
        // this.series = [ {
        //   data: chartUpdate
        // } ]

      } else if( this.smallCategory === '투자 단계' ) {
        // const result = this.companies.map( ( item, index ) => {
        //   const fundingTypeSum = item.invest_funding_type.reduce( ( acc, cur ) => {
        //
        //     if( acc.name === 'Seed' ) {
        //       const checkInvest = this.category === '투자 금액' ? acc.invest_amount : acc.invest_frequency
        //       acc[ acc.name ] = checkInvest
        //     }
        //     const checkInvest = this.category === '투자 금액' ? cur.invest_amount : cur.invest_frequency
        //     acc[ cur.name ] = checkInvest
        //     return acc
        //   }, )
        //   return fundingTypeSum
        // } )
        // const total = this.investmentStage.reduce( ( item, index ) => {
        //   const totalAmount = result
        //       .map( item2 => parseInt( item2[ index ] || 0 ) )
        //       .reduce( ( sum, amount ) => sum + amount, 0 )
        //   item[ index ] = totalAmount.toFixed( 1 )
        //   return item
        // }, {} )
        //
        // let chartUpdate = this.investmentStage.slice( 0, this.investmentStage.length ).map( ( item, index ) => {
        //
        //   return {
        //     second: item,
        //     investmentMoney: total[ this.investmentStage[ index ] ]
        //   }
        // } ).sort( ( a, b ) => {
        //   return b.investmentMoney - a.investmentMoney
        // } ).map( ( item, index ) => {
        //
        //   return {
        //     ranking: index + 1,
        //     x: item.second,
        //     y: item.investmentMoney
        //   }
        // } )
        //
        // this.series = [ {
        //   data: chartUpdate
        // } ]

      } else if( this.smallCategory === '투자자' ) {
        let investor = []
        let investorData = []

        for( let i = 0; i < this.companies.length; i++ ) {
          for( let j = 0; j < this.companies[ i ].investors.length; j++ ) {
            investor.push( this.companies[ i ].investors[ j ].name )
          }
        }

        investorData = investor.filter( ( item, index ) => {
          return investor.indexOf( item ) === index
        } )
        let chartUpdate = investorData.slice( 0, investorData.length ).map( ( item, index ) => {
          return {
            second: item,
            investmentMoney: this.companies
                .filter( ( item2, index2 ) => {
                  const company = item2.investors.map( ( item3 ) => {
                    return item3.name
                  } )
                  return company.indexOf( item ) !== -1
                } )
                .reduce( ( acc, cur ) => {
                  return acc + cur.investors
                      .filter( ( investor ) => investor.name === item )
                      .reduce( ( total, investor ) => {
                        const checkInvest = this.category === '투자 금액' ? investor.invest_amount : investor.invest_frequency
                        return total + checkInvest
                      }, 0 )
                }, 0 ),
          }
        } ).sort( ( a, b ) => {
          return b.investmentMoney - a.investmentMoney
        } ).slice( 0, this.length ).map( ( item2, index2 ) => {
          return {
            ranking: index2 + 1,
            x: item2.second,
            y: item2.investmentMoney
          }
        } )
        this.series = [ {
          data: chartUpdate
        } ]

      }

      // if(this.radioValue === '분기별 탑20 산업 트렌드'){
      //     let industry = []
      //     let industryData =[]
      //     for( let i = 0; i < this.companies.length; i++ ) {
      //         for(let j =0 ; j < this.companies[i].industries.length; j++){
      //             industry.push(this.companies[i].industries[j].name)
      //         }
      //     }
      //     industryData = industry.filter( ( item, index ) => {
      //         return industry.indexOf( item ) === index
      //     } )
      //
      //     let quarter =[]
      //     let quarterData= []
      //
      //     this.chartData = []
      //     for( let i = 0; i < this.companies.length; i++ ) {
      //         this.companies[i].quarter = []
      //         const dateString = this.companies[i].date.toString()
      //
      //         if( dateString.slice( 4, 6 ) < '04' ) {
      //             this.companies[i].quarter = `${ dateString.slice( 0, 4 ) }.1Q`
      //             quarterData.push(`${ dateString.slice( 0, 4 ) }.1Q` )
      //         } else if( dateString.slice( 4, 6 ) < '07' ) {
      //             this.companies[i].quarter = `${ dateString.slice( 0, 4 ) }.2Q`
      //             quarterData.push( `${ dateString.slice( 0, 4 ) }.2Q` )
      //         } else if( dateString.slice( 4, 6 ) < '10' ) {
      //             this.companies[i].quarter = `${ dateString.slice( 0, 4 ) }.3Q`
      //             quarterData.push(`${ dateString.slice( 0, 4 ) }.3Q` )
      //         } else if( dateString.slice( 4, 6 ) < '13' ) {
      //             this.companies[i].quarter = `${ dateString.slice( 0, 4 ) }.4Q`
      //             quarterData.push( `${ dateString.slice( 0, 4 ) }.4Q` )
      //         }
      //     }
      //
      //     quarter = quarterData.filter( ( item, index ) => {
      //         return quarterData.indexOf( item ) === index
      //     } )
      //     let chartUpdate = quarter.slice(0, this.tableLength).map((item, index) => {
      //         return {
      //             industry: item,
      //             investmentMoney: this.companies
      //                 .filter((item2, index2) => {
      //                     const quarterString = item2.quarter.toString()
      //                     return quarterString.indexOf(item.toString()) !== -1
      //                 }).map((item3, index3) => {
      //                     return item3.industries.map((item4, index4) => {
      //                         return item4.invest_amount
      //                     })
      //                 })
      //         }
      //     })
      //
      //
      //
      //     // this.lineSeries = [{
      //     //     name: 'Peter',
      //     //     data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9]
      //     // }, {
      //     //     name: 'Johnny',
      //     //     data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null]
      //     // }, {
      //     //     name: 'David',
      //     //     data: [null, null, null, null, 3, 4, 1, 3, 4,  6,  7,  9, 5, null, null, null]
      //     // }]
      //
      // }
    },
    // 라디오 버튼 값 변경시 적용되는 함수

    updateRadioFilterData() {
      this.series = [ {
        data: []
      } ]
      let chartUpdate = []
      chartUpdate = this.chartData.map( ( item, index ) => {

        return {
          x: item.date,
          y: item.investmentMoney
        }
      } )
      this.series = [ {
        data: chartUpdate
      } ]

    },
    updateChartData() {

      //select 값에 따라 변경 되는 함수
      if( this.smallCategory === '날짜' ) {
        // let date = []
        // let dateData = []
        //
        // for( let i = 0; i < this.companies.length; i++ ) {
        //     const dateString = this.companies[i].date.toString()
        //     date.push(`${dateString.slice( 0, 4 )}.${dateString.slice(4,6)}.${dateString.slice(6,8)}` )
        // }
        //
        // dateData = date.filter( ( item, index ) => {
        //     return date.indexOf( item ) === index
        // } )
        // //연도별 투자금액 합치기
        //
        // let chartUpdate = dateData.slice( 0, dateData.length ).map( ( item, index ) => {
        //     return {
        //         x: item,
        //         y: this.companies.filter( ( item2, index2 ) => {
        //             const dateString = item2.date.toString()
        //             const date =`${dateString.slice( 0, 4 )}.${dateString.slice(4,6)}.${dateString.slice(6,8)}`
        //             return  date === item
        //         } ).reduce( ( acc, cur ) => {
        //             const checkInvest= this.category === '투자 금액' ? cur.invest_amount :  cur.invest_frequency
        //             return acc + parseInt( checkInvest )
        //         }, 0 )
        //     }
        // } ).sort( ( a, b ) => {
        //     return b.y - a.y
        // } ).slice(0,this.chartLength).map( ( item3, index3 ) => {
        //     return {
        //         x: item3.x,
        //         y: item3.y
        //     }
        // } )
        // this.series = [ {
        //     data: chartUpdate
        // } ]
      }

      if( this.smallCategory === '산업' ) {

        // let industry = []
        // let industryData = []
        //
        // for( let i = 0; i < this.companies.length; i++ ) {
        //   for( let j = 0; j < this.companies[ i ].industries.length; j++ ) {
        //     industry.push( this.companies[ i ].industries[ j ].name )
        //   }
        // }
        // industryData = industry.filter( ( item, index ) => {
        //   return industry.indexOf( item ) === index
        // } )
        // let chartUpdate = industryData.slice( 0, industryData.length ).map( ( item, index ) => {
        //   return {
        //     x: item,
        //     y: this.companies
        //         .filter( ( item2, index2 ) => {
        //           const company = item2.industries.map( ( item3 ) => {
        //             return item3.name
        //           } )
        //           return company.indexOf( item ) !== -1
        //         } )
        //         .reduce( ( acc, cur ) => {
        //           return acc + cur.industries
        //               .filter( ( industry ) => industry.name === item )
        //               .reduce( ( total, industry ) => {
        //                 const checkInvest = this.category === '투자 금액' ? industry.invest_amount : industry.invest_frequency
        //                 return total + checkInvest
        //               }, 0 )
        //         }, 0 ),
        //   }
        // } ).sort( ( a, b ) => {
        //   return b.y - a.y
        // } ).slice( 0, this.chartLength ).map( ( item2, index2 ) => {
        //   return {
        //     x: item2.x,
        //     y: item2.y
        //   }
        // } )
        // this.series = [ {
        //   data: chartUpdate
        // } ]

      } else if( this.smallCategory === '투자자' ) {
        let investor = []
        let investorData = []

        for( let i = 0; i < this.companies.length; i++ ) {
          for( let j = 0; j < this.companies[ i ].investors.length; j++ ) {
            investor.push( this.companies[ i ].investors[ j ].name )
          }
        }

        investorData = investor.filter( ( item, index ) => {
          return investor.indexOf( item ) === index
        } )
        let chartUpdate = investorData.slice( 0, investorData.length ).map( ( item, index ) => {
          return {
            second: item,
            investmentMoney: this.companies
                .filter( ( item2, index2 ) => {
                  const company = item2.investors.map( ( item3 ) => {
                    return item3.name
                  } )
                  return company.indexOf( item ) !== -1
                } )
                .reduce( ( acc, cur ) => {
                  return acc + cur.investors
                      .filter( ( investor ) => investor.name === item )
                      .reduce( ( total, investor ) => {
                        const checkInvest = this.category === '투자 금액' ? investor.invest_amount : investor.invest_frequency
                        return total + checkInvest
                      }, 0 )
                }, 0 ),
          }
        } ).sort( ( a, b ) => {
          return b.investmentMoney - a.investmentMoney
        } ).slice( 0, this.chartLength ).map( ( item2, index2 ) => {
          return {
            ranking: index2 + 1,
            x: item2.second,
            y: item2.investmentMoney
          }
        } )
        this.series = [ {
          data: chartUpdate
        } ]
      }

    },
    updateCategoryChart() {
      //radio value 에 따라 x 축 텍스트 변경
      if( this.radioValue === '연도별' ) {
        this.$refs.chart.updateOptions( {
          xaxis: {
            title: {
              text: '연도별'
            }
          }
        } )
      } else if( this.radioValue === '월별' ) {
        this.$refs.chart.updateOptions( {
          xaxis: {
            title: {
              text: '월별'
            }
          }
        } )
      } else if( this.radioValue === '분기별' ) {
        this.$refs.chart.updateOptions( {
          xaxis: {
            title: {
              text: '분기별'
            }
          }
        } )
      }
    },
    porpsChartOption() {
      // this.chartOptions.title.text = this.yTitle
      this.chartOptions.title.text = 'y'
      this.chartOptions.xaxis.title.text = this.xTitle
      this.chartOptions.plotOptions.bar.horizontal = true
    },
    filterChartData() {

      if( this.category === '투자 빈도수' ) {
        if(this.smallCategory === '날짜'){
          if(this.radioValue === null){


          }else if( this.radioValue === '연도별' ) {

            this.series = [ {
              data: []
            } ]

            this.chartData = this.companies.map( ( item, index ) => {
              return {
                x: item.year.toString(),
                y: item.count
              }
            } )
            this.series = [ {
              data: this.chartData
            } ]
          } else if( this.radioValue === '월별' ) {
            this.series = [ {
              data: []
            } ]
            this.chartData = this.companies.map( ( item, index ) => {
              return {
                x: `${ item.year }.${ item.month }`,
                y: item.count
              }
            } )
            this.series = [ {
              data: this.chartData
            } ]

          } else {
            //radio value 분기별
            this.series = [ {
              data: []
            } ]
            this.chartData = this.companies.map( ( item, index ) => {
              return {
                x: `${ item.year }.${ item.quarter }Q`,
                y: item.count
              }
            } )
            this.series = [ {
              data: this.chartData
            } ]

          }
        }

      }else if(this.category === '투자 금액'){
        if(this.smallCategory === '날짜') {
          if(this.radioValue === ''){

          }else if(this.radioValue === '연도별'){
            this.series = [ {
              data: []
            } ]

            this.chartData = this.companies.map( ( item, index ) => {
              return {
                x: item.year.toString(),
                y: item.sum
              }
            } )
            this.series = [ {
              data: this.chartData
            } ]
          }else if(this.radioValue === '월별'){
            this.series = [ {
              data: []
            } ]
            this.chartData = this.companies.map( ( item, index ) => {
              return {
                x: `${ item.year }.${ item.month }`,
                y: item.sum
              }
            } )
            this.series = [ {
              data: this.chartData
            } ]
          }else {
            // radio value 분기별
            this.series = [ {
              data: []
            } ]
            this.chartData = this.companies.map( ( item, index ) => {
              return {
                x: `${ item.year }.${ item.quarter }Q`,
                y: item.sum
              }
            } )
            this.series = [ {
              data: this.chartData
            } ]
          }
        }
      }
    }

  },
  created() {
    this.porpsChartOption()
  },
  mounted() {
    this.initChartData()
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
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  justify-items: flex-start;
  width: 100%;
  height: 100%;
  margin-top: 14px;

}

</style>
