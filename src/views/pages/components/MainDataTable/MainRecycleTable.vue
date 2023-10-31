<template>
  <div class="scroller">
    <virtual-scroller
        ref="scroller"
        :items="tableData"
        :item-height="90"
        content-tag="table"
        page-mode
        prerender="10"
        emit-update
        @update="fetch"
    >
      <!--    page-mode-->
      <!--    prerender="10"-->

      <template slot-scope="props">
        <thead v-if="props.itemIndex === 0">
        <th v-for="(thead,index) in tableHead">
        <td>{{ thead }}</td>
        </th>
        </thead>

        <tr :key="props.itemKey">
          <!--        <td>{{ props.item.date }}</td>-->
          <td>{{ props.itemIndex + 1 }}</td>
          <td>{{ props.item.company }}</td>
          <td>{{ props.item.continent }}</td>
          <td>{{ props.item.location }}</td>
          <td>{{ props.item.website }}</td>
          <td :style="props.item.industries === '-' ? 'display: table-cell' : 'display:-webkit-box'">
            {{ props.item.industries }}
          </td>
          <td>{{ props.item.investFundingTypes }}</td>
          <td>{{ props.item.investAmount }}</td>
          <td>{{ props.item.totalInvestAmount }}</td>
          <td>{{ props.item.investors }}</td>
          <td>{{ props.item.preValue }}</td>
          <td>{{ props.item.companyData }}</td>
        </tr>
      </template>
    </virtual-scroller>
  </div>
  <!--  <virtual-scroller :items="tableData" item-height="25" content-tag="table" page-mode>-->
  <!--    <template slot-scope="props">-->
  <!--      <thead v-if="props.itemIndex === 0">-->
  <!--      <tr>-->
  <!--        <td>Age</td>-->
  <!--        <td>Name</td>-->
  <!--        <td>Company</td>-->
  <!--      </tr>-->
  <!--      </thead>-->

  <!--      <tr :key="props.itemKey">-->
  <!--        <td>{{props.itemIndex}}</td>-->
  <!--        <td>{{props.item.date}}</td>-->
  <!--        <td>{{props.item.company}}</td>-->
  <!--      </tr>-->
  <!--    </template>-->
  <!--  </virtual-scroller>-->
</template>
<script>

export default {
  name: 'MainRecycleTable',
  props: {
    companies: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {},
  data: () => ({
    itemHeight: 0,
    page: 1,
    tableData: [],
    tableHead: [
      '날짜',
      '기업명',
      '대륙',
      '위치',
      '기업 웹사이트',
      '산업',
      '투자 단계',
      '투자금액 ($M)',
      '총 투자금액 ($M)',
      '투자자',
      'Pre 벨류 ($M)',
      '기업정보'
    ]
  }),
  methods: {
    initData () {
      this.tableData = this.companies.map((item, index) => {
        const date = `${item.created_at.slice(0, 4)}.${item.created_at.slice(5, 7)}.${item.created_at.slice(8, 10)}`
        return {
          index: index,
          date: date || '-',
          company: item.company.name || '-',
          continent: item.continent || '-',
          location: item.locations || '-',
          website: item.company.company_url || '-',
          industries: item.industries || '-',
          investFundingTypes: item.investFundingTypes || '-',
          investAmount: item.invest_amount || '-',
          totalInvestAmount: item.company.current_total_invest_amount || '-',
          investors: item.investors.map((item2) =>
              item2.name
          ) || '-',
          preValue: item.pre_value || '-',
          companyData: item.company.company_info || '-'
        }
      })
    },
    fetch () {
    }
  },
  mounted () {
  }
}
</script>
<style
    scoped
    lang="scss"
>
.scroller {
  border-top: 1px solid #6c6c6c;
  margin-top: 22px;
  overflow-x: scroll;
  height: calc(100vh - 310px);

  .item-container {
    .items {

      thead {
        height: 62px;
        background: #f2f3f9;
        border-bottom: 1px solid #cacaca;

        th {
          font-size: 14px;
          display: contents;
          text-align: center !important;

          td {
            padding: 6px 10px;
          }
        }
      }

      tr {
        height: 76px;
        border-bottom: 1px solid #eaeaea;

        td {
          padding: 6px 10px;
          font-size: 12px;
          text-align: center;
          //overflow: hidden;
          //text-overflow: ellipsis;
          //white-space: nowrap;
          //-webkit-line-clamp: 3;
          //-webkit-box-orient: vertical;
          &:nth-child(6) {

            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal !important;

          }

          &:nth-child(10) {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal !important;
            line-height: 2;
          }

          &:last-child {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal !important;
            line-height: 2;
          }
        }
      }
    }
  }
}
</style>
