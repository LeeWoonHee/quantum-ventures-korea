<template>
  <table-with-chart
      v-if="load && !noneData"
      x-axis="분기별"
      :x-axis-key="(row) => `${row.year}.Q${row.quarter}`"
      y-axis="투자 금액($M)"
      y-axis-key="sum"
      :chart-data="chartData"
      :table-data="tableData"
  >
  </table-with-chart>
</template>
<script>

import TableWithChart from "@/views/pages/components/particalPages/components/TableWithChart.vue";

export default {
  name: "Quarterly",
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  components: {TableWithChart},
  data: () => ({
    tableData: [],
    chartData: [],
    noneData: false,
    load : false
  }),
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler () {
        this.fetchTable()
        this.fetchChart()
      }
    },
    tablePerPage: {
      handler () {
        this.fetchTable()
      }
    },
    chartPerPage: {
      handler () {
        this.fetchChart()
      }
    },
    noneData : {
      immediate:true,
      handler (val) {
        this.$emit('noneData' ,val)
      }
    }
  },
  methods: {
    fetchTable () {
      this.$vs.loading()
      this.$http.get('/investment-amount/date/quarterly', {
        params: {
          ...this.params
        }
      }).then((res) => {
        this.tableData = res.data

        res.data.length > 0 ? this.noneData = false : this.noneData = true
        this.load =true
      }).finally(() => {
        if(this.load) this.$vs.loading.close()
      })
    },
    fetchChart () {
      this.$vs.loading()
      this.$http.get('/investment-amount/date/quarterly', {
        params: {
          ...this.params,
          orderBy: 'asc'
        }
      }).then((res) => {
        this.chartData = res.data
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