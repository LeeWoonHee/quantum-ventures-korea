<template>
  <div id="chart">
    <apexchart
        class="line-chart"
        type="line"
        :options="chartOptions"
        :series="series"
    />
  </div>
</template>
<script>
export default {
  name:'QtLineChart',
  watch: {
    radioValue( value ) {
      this.radioValue = value
    },
  },
  props: {
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
    length: 20,
    series: [{
      name: 'Peter',
      data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
    }, {
      name: 'Johnny',
      data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
    }, {
      name: 'David',
      data: [1,2,3,4,null,5,6],
    }],
    chartOptions: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
        animations: {
          enabled: false
        },
        toolbar:{
          show: false
        }
      },
      stroke: {
        width: [5,5,4],
        curve: 'straight'
      },
      labels: [],
      legend: {
        show: false
      },
      xaxis:{
        type:'category',
      },
      yaxis: {
        seriesName:'ranking'
      }
    }
  }),
  methods: {
    topTrendData () {
      let quarter =[]
      let quarterData = []
       // 탑20 트렌드 쿼터 데이터 과거 부터 오늘 순으로 정렬 및 분기로 변환
      let date = this.companies.map((item)=>{
        return item.date
      }).sort((a,b)=>{
        return a-b
      })

      for( let i = 0; i < this.companies.length; i++ ) {
        this.companies[i].quarter = []
        const dateString = this.companies[i].date.toString()
        if( dateString.slice( 4, 6 ) < '04' ) {
          this.companies[i].quarter = `${ dateString.slice( 0, 4 ) }.1Q`
          quarterData.push(`${ dateString.slice( 0, 4 ) }.1Q` )
        } else if( dateString.slice( 4, 6 ) < '07' ) {
          this.companies[i].quarter = `${ dateString.slice( 0, 4 ) }.2Q`
          quarterData.push( `${ dateString.slice( 0, 4 ) }.2Q` )
        } else if( dateString.slice( 4, 6 ) < '10' ) {
          this.companies[i].quarter = `${ dateString.slice( 0, 4 ) }.3Q`
          quarterData.push(`${ dateString.slice( 0, 4 ) }.3Q` )
        } else if( dateString.slice( 4, 6 ) < '13' ) {
          this.companies[i].quarter = `${ dateString.slice( 0, 4 ) }.4Q`
          quarterData.push( `${ dateString.slice( 0, 4 ) }.4Q` )
        }

      }
      quarter = quarterData.filter( ( item, index ) => {
        return quarterData.indexOf( item ) === index
      } )
      this.chartOptions.labels = quarter

      let industry = []
      let industryData =[]

      for( let i = 0; i < this.companies.length; i++ ) {
        for(let j =0 ; j < this.companies[i].industries.length; j++){
          industry.push(this.companies[i].industries[j].name)
        }
      }
      industryData = industry.filter( ( item, index ) => {
        return industry.indexOf( item ) === index
      } )

      // this.chartData = quarter.slice( 0, this.companies.length ).map( ( item, index ) => {
      //   return {
      //     date: item,
      //     investmentMoney: this.companies.filter( ( item2, index2 ) => {
      //       return item2.quarter === item
      //     } ).reduce( ( acc, cur ) => {
      //       const checkInvest = this.category === '투자 금액' ? cur.invest_amount :  cur.invest_frequency
      //       return parseInt( acc ) + parseInt( checkInvest )
      //     }, 0 )
      //   }
      // } ).sort( ( a, b ) => {
      //   return b.investmentMoney - a.investmentMoney
      // } ).map( ( item3, index3 ) => {
      //   return {
      //     date: item3.date,
      //     investmentMoney: item3.investmentMoney
      //   }
      // } )

     let qData = this.companies.map((item,index) => {
       return{
         industry : industryData[index],
         quarter : quarter,
         invest_amount : item.industries.filter((item2,index2)=> {
           return item2.name === industryData[index]
         })
         // invest_amount : item.invest_amount,
         // quarter : item.quarter
       }
     })
    }
  },
  created() {
    this.topTrendData()
  }
}
</script>

<style
    scoped
    lang="scss"
>
#chart::v-deep {

}
</style>