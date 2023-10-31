<template>
  <div
      class="main-table"
      ref="mainTable"
  >


    <div class="excel-download">
      <div class="blex-right">
        <button
            type="button"
            class="excel-button"
            @click="excelDownload"
        >
          <img
              src="@/assets/images/icon/download-icon.png"
              alt=""
          />
          엑셀 다운로드
        </button>
      </div>
    </div>
    <div>
      <main-recycle-table :companies="companies" @fetch="localFetch"/>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import MainRecycleTable from '@/views/pages/components/MainDataTable/MainRecycleTable.vue'

export default {
  name: 'MainDataTable',
  components: {MainRecycleTable},
  props: {
    companies: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
    companies: {
      deep: true,
      immediate: true,
      handler (val) {
      }
    },
    page: {
      immediate: true,
      handler (val) {
        this.$emit('update:page', val)
      }
    }
  },
  data: () => ({
    page: 0,
    tableData: []
  }),
  methods: {
    localFetch (val) {

      this.$emit('fetch', val)
    },
    excelDownload () {
      const excelData = XLSX.utils.table_to_sheet(document.getElementById('mainTable')) // table id를 넣어주면된다
      const workBook = XLSX.utils.book_new() // 새 시트 생성
      XLSX.utils.book_append_sheet(workBook, excelData, '')  // 시트 명명, 데이터 지정
      XLSX.writeFile(workBook, 'account_statistics.xlsx') // 엑셀파일 만듬
    }

  }
}
</script>

<style
    scoped
    lang="scss"
>
.main-table::v-deep {
  opacity: 0.99 !important;
  padding-top: 22px;

  &::-webkit-scrollbar {
    background: #eaeaea;
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #979797;
  }

  .scroller {

    //overflow-x: scroll;

    //height: 100%;
    &::-webkit-scrollbar {
      background: #eaeaea;
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #979797;
    }

    .table {
      height: 100%;
      width: 100%;
      margin-top: 8px;

      th {
        text-align: center;
      }

      th {
        text-align: center;
      }

      td {
        text-align: center;
      }


      .tableItem {
        height: 32%;
        padding: 0 12px;
        align-items: center;
      }

    }
  }


  .excel-download {
    width: 100%;
    margin: 0 auto;

    .excel-button {
      position: absolute;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #2f7bed;
      color: #fff;
      padding: 9px 14px;
      border-radius: 3px;
      margin-bottom: 8px;
      font-size: 12px;
    }
  }


  //&::after{
  //  content:"";
  //  background:url(~@/assets/images/logo/table-logo.png) no-re`peat center center;
  //  position:absolute !important;
  //  z-index:-1;
  //  top:0;
  //  left:0;
  //  width:100%;
  //  height:100%;
  //}
  //
  //      &::-webkit-scrollbar{
  //          background:#eaeaea;
  //          width:4px;
  //          height:4px;
  //      }
  //      &::-webkit-scrollbar-thumb{
  //          background:#979797;
  //      }

}


</style>
