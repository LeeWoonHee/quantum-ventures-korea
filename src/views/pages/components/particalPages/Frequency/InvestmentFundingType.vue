<template>
  <table-with-chart
      v-if="load && !noneData"
      x-axis="투자 단계"
      x-axis-key="name"
      y-axis="투자 빈도수"
      y-axis-key="investments_count"
      :chart-data="chartData"
      :table-data="tableData"
      :is-pie="true"
  >
  </table-with-chart>
</template>

<script>
import TableWithChart from '../components/TableWithChart'
import ColoredSelect from '../components/ColoredSelect'

export default {
  name: 'Industry',
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  components: {ColoredSelect, TableWithChart},
  data: () => ({
    tableData: [],
    chartData: [],
    load: false,
    noneData: false
  }),
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler () {
        this.fetch()
      }
    },
    noneData : {
      immediate: true,
      handler(val) {
        this.$emit('noneData' , val)
      }
    }
  },
  methods: {
    fetch () {
      this.$vs.loading()
      this.$http.get('/frequency/investment-funding-types', {
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

<style scoped>

</style>
