<template>
    <div class="investment-frequency-date-chart">
        <div class="left-investment-frequency-table">
            <!--   top 10 ~ 50위 투자빈도수/날짜 데이터 테이블       -->
            <qt-ranking-table
                :secondTableTitle="secondTableTitle"
                :thirdTableTitle="thirdTableTitle"
                :radioValue="radioValue"
                :companies="localCompanies"
                :smallCategory="smallCategory"
                :category="category"
                @checkTableSelectValue="checkTableSelectValue"
            />
        </div>
        <div class="right-investment-frequency-graph">
            <!--   top 10 ~ 50위 투자빈도수/날짜 데이터 그래프       -->
            <qt-ranking-graph
                :xTitle="xTitle"
                :yTitle="yTitle"
                :radioValue="radioValue"
                :companies="companies"
                :smallCategory="smallCategory"
                :category="category"
                @checkGraphSelectValue="checkGraphSelectValue"
            />
        </div>
    </div>

</template>


<script>
import QtRankingTable from "@/components/QtRankingTable.vue"
import QtRankingGraph from "@/components/QtRankingGraph.vue"
export default{
    name : "InvestmentFrequencyDateChart",
    components: {
        QtRankingTable,
        QtRankingGraph
    },
    props:{
        radioValue:{
            type: String,
            default : null
        },
        smallCategory:{
            type: String,
            default : null
        },
        secondTableTitle:{
            type: String,
            default : null
        },
        thirdTableTitle:{
            type: String,
            default : '투자 빈도수'
        },
        xTitle:{
            type: String,
            default : null
        },
        yTitle:{
            type: String,
            default : null
        },
        companies:{
            type: Array,
            default : () => []
        },
        category: {
            type: String,
            default : null
        }

    },
  watch:{
    companies: {
      deep:true,
      immediate: true,
      handler (val) {
        this.localCompanies = val
      }
    },
  },
  data : () => ({
    localCompanies : []
  }),
  methods:{
    checkTableSelectValue(value) {
      this.$emit('checkTableSelectValue', value)
    },
    checkGraphSelectValue(value) {
      this.$emit('checkGraphSelectValue', value)
    }
  }
}



</script>



<style scoped lang="scss">
.investment-frequency-date-chart::v-deep {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: flex-start;
    align-content: center;
    justify-content: space-between;
    justify-items: center;

    .left-investment-frequency-table {
        width: 28%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        align-items: flex-start;
        align-content: flex-start;
        justify-content: center;
        justify-items: center;

        .left-select-box {
            width: 108px;
            height: 28px;
        }
    }

    .right-investment-frequency-graph {
        width: 68%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
        justify-items: flex-start;

        .right-select-box {
            width: 108px;
            height: 28px;
        }
    }
}
</style>
