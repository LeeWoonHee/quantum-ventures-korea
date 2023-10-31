<template>
    <div class="qt-ranking-graph">
        <qt-select-box
            class="select-box"
            :small="true"
            :options="options"
            title="순위선택"
            @checkSelectValue="checkSelectValue"
            :style="radioValue || this.smallCategory === '투자 단계' ? {'display' : 'none'} : {'display' : 'block'}"
        />

        <qt-bar-chart
            :chartLength="chartLength"
            :xTitle="xTitle"
            :yTitle="yTitle"
            :horizontal="horizontal"
            :radioValue="radioValue"
            :smallCategory="smallCategory"
            :companies="companies"
            :category="category"
        />
    </div>
</template>

<script>
import QtSelectBox from "@/components/QtSelectBox.vue"
import QtBarChart from "@/components/QtBarChart.vue"

export default {
    name: "QtRankingGraph",
    components: {
        QtBarChart,
        QtSelectBox
    },
    watch: {
      companies: {
        deep:true,
        immediate: true,
        handler(val) {
        }
      }
    },
    props: {
        xTitle: {
            type: String,
            default: ''
        },
        yTitle: {
            type: String,
            default: ''
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
            default : () => []
        },
        category:{
            type: String,
            default: null
        }
    },
    data: () => ( {
        options: [ 'TOP 10', 'TOP 20', 'TOP 30', ],
        chartLength: 10,
        chartData: [],
    } ),
    methods: {
      // Select Box의 값이 변경되었을 때 해당 값의 숫자들만 추출하여 값을 저장하는 함수
        checkSelectValue( value ) {
          this.$emit('checkGraphSelectValue' ,value)
            this.chartLength = parseInt( value.split( ' ' )[ 1 ] )
            this.chartData = this.companies.slice( 0, this.chartLength ).map( ( item, index ) => {
                const dateString = item.date.toString()
                return {

                    date: dateString,
                    investmentMoney: item.current_total_invest_amount
                }
            } )
        },

    },

}
</script>

<style
    scoped
    lang="scss"
>
.qt-ranking-graph::v-deep {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
    justify-items: flex-start;

    .select-box {

        width: 108px;
        height: 28px;
    }
}
</style>
