<template>
  <table-with-chart
      v-if="load && !noneData"
      x-axis="산업"
      x-axis-key="name"
      y-axis="투자 빈도수"
      y-axis-key="investments_count"
      :chart-data="chartData"
      :table-data="tableData"
      :is-horizontal="true"
  >
    <colored-select class="mb-10" slot="table-top" :options="tablePerPageOptions" v-model="tablePerPage"/>
    <colored-select class="mb-10" slot="chart-top" :options="chartPerPageOptions" v-model="chartPerPage"/>
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
    tablePerPage: 10,
    tablePerPageOptions: [
      {
        label: 'TOP 10',
        value: 10
      },
      {
        label: 'TOP 20',
        value: 20
      },
      {
        label: 'TOP 30',
        value: 30
      },
      {
        label: 'TOP 40',
        value: 40
      },
      {
        label: 'TOP 50',
        value: 50
      }
    ],
    chartData: [],
    chartPerPage: 10,
    chartPerPageOptions: [
      {
        label: 'TOP 10',
        value: 10
      },
      {
        label: 'TOP 20',
        value: 20
      },
      {
        label: 'TOP 30',
        value: 30
      }
    ],
    load: false,
    noneData: false
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
        this.$vs.loading()
        this.fetchTable().finally(() => {
          this.$vs.loading.close()
        })
      }
    },
    chartPerPage: {
      handler () {
        this.$vs.loading()
        this.fetchChart().finally(() => {
          this.$vs.loading.close()
        })
      }
    },
    noneData : {
      immediate: true,
      handler(val){
        this.$emit('noneData', val)
      }
    }
  },
  methods: {
    fetchTable () {
      return new Promise((resolve, reject) => {
        this.$vs.loading()
        this.$http.get('/frequency/industries', {
          params: {
            ...this.params,
            per_page: this.tablePerPage
          }
        }).then((res) => {
          this.tableData = res.data
          resolve(res)
          res.data.length > 0 ? this.noneData = false : this.noneData = true
          this.load = true
        }).catch((err) => {
          reject(err)
        }).finally(() => {
          if(this.load) this.$vs.loading.close()
        })
      })
    },
    fetchChart () {
      return new Promise((resolve, reject) => {
        this.$vs.loading()
        this.$http.get('/frequency/industries', {
          params: {
            ...this.params,
            per_page: this.chartPerPage,
            orderBy: 'asc'
          }
        }).then((res) => {
          this.chartData = res.data
          this.load = true
        }).catch((err) => {
          reject(err)
        }).finally(() => {
          if(this.load) this.$vs.loading.close()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
