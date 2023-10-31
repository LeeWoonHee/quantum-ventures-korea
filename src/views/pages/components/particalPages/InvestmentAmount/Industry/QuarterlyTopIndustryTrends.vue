<template>
  <apexchart
      class="blex border-1 border-gray mt-13"
      height="400"
      :options="chartOptions"
      :series="refinedRankData"
      ref="chart"
  >
  </apexchart>
</template>
<script>
export default {
  name    : 'QuarterlyTopIndustryTrends',
  props   : {
    params: {
      type   : Object,
      default: () => ({})
    }
  },
  watch   : {
    params: {
      deep     : true,
      immediate: true,
      handler(val) {
        this.fetch()
      }
    }
  },
  computed: {
    labels() {
      const temp = []
      this.rankData.forEach((row) => {
        if (temp.findIndex((x) => x === `${ row.year }.${ row.quarter }Q`) === -1) {
          temp.push(`${ row.year }.${ row.quarter }Q`)
        }
      })

      return temp
    },
    refinedRankData() {
      // x axis
      const quarters = this.labels
      // y axis
      const industries = []
      this.rankData.forEach((row) => {
        const industryIndex = industries.findIndex((x) => x === row.name)
        if (industryIndex === -1) {
          industries.push({
                            name: row.name,
                            data: []
                          })
        }
      })

      quarters.forEach((quarter) => {
        industries.forEach((industry, industryIndex) => {
          const dataIndex = this.rankData.findIndex((data) => `${ data.year }.${ data.quarter }Q` === quarter && data.name === industry.name)
          if (dataIndex === -1) {
            industries[industryIndex].data.push(null)
          }
          else {
            industries[industryIndex].data.push(this.rankData[dataIndex].rank)
          }
        })
      })
      return industries
    },
    chartOptions() {
      return {
        chart      : {
          height : '100%',
          type   : 'line',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false,
          }
        },
        dataLabels : {
          enabled: false,
          show   : false
        },
        plotOptions: {},
        legend     : {
          show: false
        },
        title      : {
          style: {
            fontSize  : '12px',
            fontWeight: 400,
            fontFamily: 'suit',
            color     : '#000'
          }
        },
        animations : {
          enabled: false
        },
        stroke     : {
          width:  2 ,
          curve: 'straight',
          colors: [
            '#D00000',
            '#DA5736',
            '#EFAEAB',
            '#FF9900',
            '#E19D0E',
            '#EAD940',
            '#ABE10F',
            '#38D81F',
            '#00A124',
            '#00D3A1',
            '#76D3EF',
            '#3097F6',
            '#4D7CF5',
            '#040DE9',
            '#505288',
            '#612FB4',
            '#890CD6',
            '#D60CC1',
            '#E9346A',
            '#9B0054',
          ]
        },
        labels     : this.labels,
        yaxis      : {
          tickAmount : 19,
          reversed: true,
          min     : 1,
          max     : 20,
        },
        markers    : {
          size : 3,
          strokeWidth: 2,
          colors: [
            '#D00000',
            '#DA5736',
            '#EFAEAB',
            '#FF9900',
            '#E19D0E',
            '#EAD940',
            '#ABE10F',
            '#38D81F',
            '#00A124',
            '#00D3A1',
            '#76D3EF',
            '#3097F6',
            '#4D7CF5',
            '#040DE9',
            '#505288',
            '#612FB4',
            '#890CD6',
            '#D60CC1',
            '#E9346A',
            '#9B0054',
          ],
          hover: {
            size      : 5,
            sizeOffset: 3
          }
        },
        tooltip    : {
          shared: false,
          intersect:true,
          y: {
            formatter: function (val) {
              return ''
            },
            title    : {
              formatter: function (seriesName) {
                return seriesName
              }
            }
          },
          x: {
            show: true,
            formatter: function(){
              return '산업'
            },
          },
        },

      }
    }
  },
  data    : () => ({
    rankData: []
  }),
  methods : {
    fetch() {
      this.$vs.loading()
      this.$http.get('/investment-amount/industries/quarter-trends', {
        // params: this.params
        params:{
          years: this.params.years,
          quarters: this.params.quarters,
          months: this.params.months,
        }

      }).then((res) => {
        this.rankData = res.data
      }).finally(() => {
        this.$vs.loading.close()
      })
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep{
  .apexcharts-xaxistooltip {
    display:none !important;
  }
}


</style>
