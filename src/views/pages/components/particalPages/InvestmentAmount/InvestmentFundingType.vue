<template>
  <table-with-chart
      v-if="load && !noneData"
      x-axis="투자 단계"
      x-axis-key="name"
      y-axis="투자 금액($M)"
      y-axis-key="investments_sum_invest_amount"
      :chart-data="chartData"
      :table-data="tableData"
      :is-horizontal="true"
  >
  </table-with-chart>
</template>
<script>

import TableWithChart from "@/views/pages/components/particalPages/components/TableWithChart.vue";

export default{
  name: "InvestmentFundingType",
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  components: { TableWithChart },
  data: () => ({
    tableData: [],
    chartData: [],
    noneData : false,
    load : false
  }),
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler () {
        this.fetch()
      }
    },
    noneData: {
      immediate: true,
      handler(val){
        this.$emit('noneData', val)
      }
    }
  },
  methods: {
    fetch () {
      this.$vs.loading()
      this.$http.get('/investment-amount/investment-funding-types', {
        params: {
          ...this.params
        }
      }).then((res) => {
        this.tableData = res.data
        this.chartData = res.data

        res.data.length > 0 ? this.noneData = false : this.noneData = true
        this.load = true
      }).finally(() => {
        if(this.load) this.$vs.loading.close()
      })
    }
  }
}
</script>
<style
    scoped
    lang="scss"
>

</style>