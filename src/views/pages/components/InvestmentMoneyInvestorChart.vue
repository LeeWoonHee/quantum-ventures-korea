<template>
    <div class="investment-money-investor-chart">
        <div
            class="left-investment-money-table"
            :style="radioValue === '산업' || radioValue === '투자단계' ? 'width: 100%' : 'width: 28%'"
        >
            <!--   top 10 ~ 50위 투자금액/투자자 데이터 테이블       -->
            <qt-ranking-table
                :secondTableTitle="secondTableTitle"
                :thirdTableTitle="thirdTableTitle"
                :radioValue="radioValue"
                :smallCategory="smallCategory"
                :companies="localCompanies"
                :category="category"
                @checkTableSelectValue="checkTableSelectValue"
            />
        </div>

        <div
            class="right-investment-money-graph"
            v-if="radioValue === ''"

        >
            <!--   top 10 ~ 50위 투자금액/투자자 데이터 그래프       -->
            <qt-ranking-graph
                :xTitle="xTitle"
                :yTitle="yTitle"
                :horizontal="horizontal"
                :radioValue="radioValue"
                :smallCategory="smallCategory"
                :companies="companies"
                :category="category"
                @checkGraphSelectValue="checkGraphSelectValue"
            />
        </div>

    </div>
</template>

<script>
import QtRankingTable from "@/components/QtRankingTable.vue"
import QtRankingGraph from "@/components/QtRankingGraph.vue"

export default {
    name: "InvestmentMoneyInvestorChart",
    components: {
        QtRankingTable,
        QtRankingGraph
    },
    props: {
        secondTableTitle: {
            type: String,
            default: null
        },
        thirdTableTitle: {
          type: String,
            default: '투자금액'
        },
        xTitle: {
            type: String,
            default: null
        },
        yTitle: {
            type: String,
            default: null
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

<style
    scoped
    lang="scss"
>
.investment-money-investor-chart::v-deep {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: flex-start;
    align-content: center;
    justify-content: space-between;
    justify-items: center;

    .left-investment-money-table {
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

    .right-investment-money-graph {
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

