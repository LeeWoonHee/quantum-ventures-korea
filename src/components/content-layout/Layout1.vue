<template>
  <div class="layout1">
    <div class="layout1-table">
      <qt-select-box
          :small="true"
          class="select-box"
          :options="options"
          title="순위선택"
      />
      <ve-table
          class="table"
          :table-data="tableData"
          :columns="columns"
          :max-height="744"
          :fixed-header="true"
          style="width:100%"
      />
    </div>

    <div class="layout1-graph">
      <!--   top 10 ~ 50위 투자금액 / 날짜 데이터 그래프       -->
        <qt-select-box
            class="select-box"
            :small="true"
            :options="options"
            title="순위선택"
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
    </div>
</template>

<script>
import QtRankingGraph from "@/components/QtRankingGraph.vue";
import QtRankingTable from "@/components/QtRankingTable.vue";
import QtSelectBox from "@/components/QtSelectBox.vue";
import QtBarChart from "@/components/QtBarChart.vue";

export default {
  name: 'Layout1',
  components: { QtBarChart, QtSelectBox, QtRankingTable, QtRankingGraph },
  data: () => ({
    options:['Top10' , 'Top20' , 'Top30' , 'Top40' , 'Top50'],
    tableData:[
      {
        rank: 1,
        secondColumn : 2023.02,
        thirdColumn: 145
     },
      {
        rank: 2,
        secondColumn :2022.12,
        thirdColumn: 145
      },
      {
        rank: 3,
        secondColumn : 2022.10,
        thirdColumn: 145
      },
      {
        rank: 4,
        secondColumn : 2022.09,
        thirdColumn: 145
      },
      {
        rank: 5,
        secondColumn : 2022.08,
        thirdColumn: 145
      },
      {
        rank: 6,
        secondColumn : 2022.07,
        thirdColumn: 145
      },
      {
        rank: 7,
        secondColumn :2022.06,
        thirdColumn: 145
      },
      {
        rank: 8,
        secondColumn : 2022.05,
        thirdColumn: 145
      },
      {
        rank: 9,
        secondColumn :2022.04,
        thirdColumn: 145
      },
      {
        rank: 10,
        secondColumn :2022.03,
        thirdColumn: 145
      }
    ],
    columns:[
      {
        field: "rank",
        key: "index",
        title: "순서",
        width: '20%',
        align: "center",
      },
      {
        field: "secondColumn",
        width: '40%',
        key: "a",
        title: "날짜",
        align: "center",
      },
      {
        field: "thirdColumn",
        key: "b",
        width: '40%',
        title: "투자빈도수",
        align: "center",
      },
    ]
  })
}
</script>

<style scoped lang="scss">
.layout1{
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: flex-start;
  align-content: center;
  justify-content: space-between;
  justify-items: center;

  .layout1-table{
    width: 28%;
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
    .table {
      margin-top: 14px;
      border-top: 1px solid #6c6c6c;




    .ve-table-border-around {
      border-right: none;
      border-left: none;

      .ve-table-container {
        &::-webkit-scrollbar {
          background: #eaeaea;
          width: 4px;
          height: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background: #979797;
        }
        .ve-table-header{
        .ve-table-header-tr{
          .ve-table-header-th {
            background: #f2f3f9 !important;
            &:first-child{
              border-right: 1px solid #cacaca !important;
            }
          }
        }
        }

        .ve-table-body-tr {
          height: 70px !important;

          .ve-table-body-td {
            background: rgba(0, 0, 0, 0) !important;
            &:first-child{
              border-right: 1px solid #cacaca !important;
            }
          }
        }
      }
    }
    }

  }

  .layout1-graph{
    width: 68%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    justify-items: flex-start;
  }
}
</style>
