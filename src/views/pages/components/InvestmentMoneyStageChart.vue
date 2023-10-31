<template>
    <div class="investment-money-stage-chart">
        <div
            class="left-investment-money-table"
            :style="radioValue === '산업' || radioValue === '투자자' ? 'width: 100%' : 'width: 28%'"
        >
            <!--   총 투자금액/투자단계 데이터 테이블       -->
            <qt-ranking-table
                :secondTableTitle="secondTableTitle"
                :thirdTableTitle="thirdTableTitle"
                :radioValue="radioValue"
                :companies="localCompanies"
                :smallCategory="smallCategory"
                :category="category"
            />
        </div>

        <div
            class="right-investment-money-graph"
            v-if="radioValue === ''"
        >
            <!--   총 투자금액/투자단계 데이터 그래프       -->
            <qt-ranking-graph
                :xTitle="xTitle"
                :yTitle="yTitle"
                :horizontal="horizontal"
                :radioValue="radioValue"
                :companies="companies"
                :smallCategory="smallCategory"
                :category="category"
            />
        </div>
    </div>
</template>

<script>
import QtRankingTable from "@/components/QtRankingTable.vue"
import QtRankingGraph from "@/components/QtRankingGraph.vue"

export default {
    name: "InvestmentMoneyIndustryChart",
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
            default : null
        },
        companies: {
            type: Array,
            default: () => []
        },
        smallCategory: {
            type: String,
            default: null
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
}
</script>

<style
    scoped
    lang="scss"
>
.investment-money-stage-chart::v-deep {
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
    .investmentStageTable{
        opacity: 0.99 !important;
        width: 100%;

        .vue-table-root {
            margin: 0 auto;

            .ve-table {
                border: 1px solid #6c6c6c;
                border-left: none;
                border-right: none;



                &::after {
                    content: "";
                    background: url(~@/assets/images/logo/table-logo.png) no-repeat center center;
                    position: absolute;
                    z-index: -1;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .ve-table-container {
                    position: relative;

                    .ve-table-header-tr {
                        &:first-child {
                            .ve-table-header-th {
                                &:first-child {
                                    border-right: 1px solid #cacaca;
                                }
                            }
                        }

                        &:last-child {
                            .ve-table-header-th {
                                background-color: #f8f9ff !important;

                                &:first-child {
                                    border-right: 1px solid #cacaca;
                                    background-color: #f2f3f9 !important;
                                }
                            }
                        }
                    }

                    .ve-table-body {
                        opacity: 0.95 !important;

                        .ve-table-body-tr {
                            .ve-table-body-td {
                                &:first-child {
                                    background-color: #f8f9ff !important;
                                    border-right: 1px solid #cacaca;
                                }
                            }

                        }
                    }


                    &::-webkit-scrollbar {
                        background: #eaeaea;
                        width: 4px;
                        height: 4px;
                    }

                    &::-webkit-scrollbar-thumb {
                        background: #979797;
                    }

                    &::-webkit-scrollbar-corner {

                    }

                    .ve-table-header-th {
                        background: #f2f3f9 !important;
                    }

                    .ve-table-body {
                        background: rgba(0, 0, 0, 0.1) !important;

                    }

                }
            }

        }
    }
}
</style>

