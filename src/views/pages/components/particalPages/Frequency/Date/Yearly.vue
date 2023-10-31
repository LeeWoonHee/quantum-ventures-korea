<template>
  <table-with-chart
      v-if="load && !noneData"
      x-axis="연도별"
      x-axis-key="year"
      y-axis="투자 빈도수"
      y-axis-key="count"
      :chart-data="chartData"
      :table-data="tableData"
  >
  </table-with-chart>
</template>

<script>
import TableWithChart from '../../components/TableWithChart'

export default {
  name: 'Yearly',
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
    noneData  :false,
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
      immediate: true,
      handler (val) {
        this.$emit('noneData', val)
      }
    }
  },
  methods: {
    fetchTable () {
      this.$vs.loading()
      this.$http.get('/frequency/date/yearly', {
        params: {
          ...this.params
        }
      }).then((res) => {
        this.tableData = res.data
        res.data.length > 0 ? this.noneData = false : this.noneData = true

        this.load = true
      }).finally(()=> {
        if(this.load){
          this.$vs.loading.close()
        }
      })
    },
    fetchChart () {
      this.$http.get('/frequency/date/yearly', {
        params: {
          ...this.params,
          orderBy: 'asc'
        }
      }).then((res) => {
        this.chartData = res.data
        this.load = true
      }).finally(()=> {
        if(this.load) this.$vs.loading.close()

      })
    }
  }
}
</script>

<style scoped>

</style>
