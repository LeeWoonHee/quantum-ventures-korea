<template>
  <relationship-table
      v-if="load && !noneData"
      x-axis="투자 단계"
      y-axis="투자자"
      :x-data="xData"
      :y-data="yData"
      dataLabel="sum"
      :matrix="matrix"
      :isVisivle="true"
  />
</template>
<script>
import RelationshipTable from "@/views/pages/components/particalPages/components/RelationshipTable.vue";

export default  {
  name: "InvestmentFundingType",
  components: { RelationshipTable },
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    params: {
      deep: true,
      immediate: true,
      handler () {
        this.fetch()
      }
    },
    noneData: {
      immediate:true,
      handler(val){
        this.$emit('noneData', val)
      }
    }
  },
  data: () => ({
    yData: [],
    xData: [],
    matrix: [],
    noneData: false,
    load:false
  }),
  methods: {
    fetch () {
      this.$vs.loading()
      this.$http.get('investment-amount/investors/investment-funding-types', {
        params: this.params
      }).then((res) => {
        this.yData = res.data.leftColumns
        this.xData = res.data.topColumns
        this.matrix = res.data.matrix

        res.data.leftColumns.length === 0 || res.data.topColumns.length === 0 || res.data.matrix.length === 0  ? this.noneData = true : this.noneData = false
        this.load = true
      }).finally(() => {
        if(this.load) this.$vs.loading.close()
      })
    }
  },
  mounted () {
    // this.fetch()
  }
}
</script>
<style
    scoped
    lang="scss"
>

</style>
