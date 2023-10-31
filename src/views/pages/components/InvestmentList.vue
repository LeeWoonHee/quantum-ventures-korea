<template>
  <div
      class="main-scroll-table"
      ref="mainScrollTable"
      v-if="load && !noneData"
  >
    <!--  excel download button  -->
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
              class="excel-image"
          />
          엑셀 다운로드
        </button>
      </div>
    </div>

    <div
        class="scroller"
        id="investmentListWrapper"
        ref="wrapper"
    >
      <div class="table-headers">
        <div
            class="table-header"
            v-for="(thead,index) in tableHead"
            :key="index"
            :style="{width: thead.width}"
        >
          <sort-by
              v-if="thead.order"
              v-model="sortBy"
              :order="thead.order"
          >
            {{ thead.label }}
          </sort-by>
          <span v-else>
          {{ thead.label }}
        </span>
        </div>
      </div>
      <DynamicScroller
          :items="investments"
          :min-item-size="70"
          class="scroller-table w-full"
          @scroll-end="onFetch"
          key-field="id"
      >
        <template v-slot="{item, index, active}">
          <DynamicScrollerItem
              :item="item"
              class="vs-table-row"
              ref="tableRow"
              :active="active"
              :data-index="index"
          >
            <!--        <td>{{ props.item.date }}</td>-->
            <div class="vs-table-cell w-3/50">{{ `${item.year}-${item.month}-${item.day}` || '-' }}</div>
            <div class="vs-table-cell w-3/50">{{ (item.company || {}).name || '-' }}</div>
            <div class="vs-table-cell w-3/50">{{ ((item.company || {}).continent || {}).name || '-' }}</div>
            <div
                class="vs-table-cell w-3/50 ellipsis-3"
                ref="ellipsis"
                :class="tableIndex === index ? 'is-clicked' : 'ellipsis-3'"
                @click="tableIndex = index"
            >{{ (item.company || {}).locations || '-' }}
            </div>
            <div
                class="vs-table-cell w-3/50"
                v-if="(item.company || {}).company_url"
            >
              <vs-tooltip :text="(item.company || {}).company_url">
                <a
                    target="_blank"
                    style="color: rgba(22,102,246,1);"
                    :href="(item.company || {}).company_url"
                >바로가기</a>
              </vs-tooltip>
            </div>
            <div
                class="vs-table-cell w-3/50"
                v-else
            >
              알 수 없음
            </div>
            <div
                class="vs-table-cell w-3/50 ellipsis-3"
                :class="tableIndex === index ? 'is-clicked' : 'ellipsis-3'"
                @click="tableIndex = index"
                ref="ellipsis"
                :style="item.industries === '-' ? 'display: vs-table-cell' : 'display:-webkit-box'"
            >
              {{ item.industries  | implode(',', {objectKey: 'name'}) || '-' }}
            </div>
            <div class="vs-table-cell w-3/50">{{ (item.funding_type || {}).name || '-' }}</div>
            <div class="vs-table-cell w-3/50">{{ item.invest_amount || '-' }}</div>
            <div class="vs-table-cell w-3/50">{{ item.total_invest_amount || '-' }}</div>
            <div
                class="vs-table-cell w-3/50 ellipsis-3"
                :class="tableIndex === index ? 'is-clicked' : 'ellipsis-3'"
                @click="tableIndex = index"
                ref="ellipsis"
            >
              {{ item.investors | implode(',', {objectKey: 'name'}) || '-' }}
            </div>
            <div class="vs-table-cell w-3/50">{{ item.pre_value || '-' }}</div>
            <div
                class="vs-table-cell w-3/50 ellipsis-3"
                :class="tableIndex === index ? 'is-clicked' : 'ellipsis-3'"
                @click="tableIndex = index"
                ref="ellipsis"
            >
              {{ (item.company || {}).company_info || '-' }}
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
      <!--    <RecycleScroller-->
      <!--        class="scroller-table w-full"-->
      <!--        :items="investments"-->
      <!--        :item-size="70"-->
      <!--        key-field="id"-->
      <!--        :prerender="15"-->
      <!--        v-slot="{ item, index }"-->
      <!--        @scroll-end="onFetch"-->
      <!--        itemTag="div"-->
      <!--        itemClass="vs-table-row"-->
      <!--    >-->
      <!--      &lt;!&ndash;        <td>{{ props.item.date }}</td>&ndash;&gt;-->
      <!--      <div class="vs-table-cell w-3/50">{{ `${item.year}-${item.month}-${item.day}` }}</div>-->
      <!--      <div class="vs-table-cell w-3/50">{{ (item.company || {}).name }}</div>-->
      <!--      <div class="vs-table-cell w-3/50">{{ ((item.company || {}).continent || {}).name }}</div>-->
      <!--      <div class="vs-table-cell w-3/50 ellipsis-3">{{ (item.company || {}).locations }}</div>-->
      <!--      <div class="vs-table-cell w-3/50" v-if="(item.company || {}).company_url">-->
      <!--        <vs-tooltip :text="(item.company || {}).company_url">-->
      <!--          <a target="_blank" style="color: rgba(22,102,246,1);" :href="(item.company || {}).company_url">바로가기</a>-->
      <!--        </vs-tooltip>-->
      <!--      </div>-->
      <!--      <div class="vs-table-cell w-3/50" v-else>-->
      <!--        알 수 없음-->
      <!--      </div>-->
      <!--      <div class="vs-table-cell w-3/50 ellipsis-3"-->
      <!--           :style="item.industries === '-' ? 'display: vs-table-cell' : 'display:-webkit-box'">-->
      <!--        {{ item.industries | implode(',', {objectKey: 'name'}) }}-->
      <!--      </div>-->
      <!--      <div class="vs-table-cell w-3/50">{{ (item.funding_type || {}).name }}</div>-->
      <!--      <div class="vs-table-cell w-3/50">{{ item.invest_amount }}</div>-->
      <!--      <div class="vs-table-cell w-3/50">{{ item.total_invest_amount }}</div>-->
      <!--      <div class="vs-table-cell w-3/50 ellipsis-3">{{ item.investors | implode(',', {objectKey: 'name'}) }}</div>-->
      <!--      <div class="vs-table-cell w-3/50">{{ item.pre_value }}</div>-->
      <!--      <div class="vs-table-cell w-3/50 ellipsis-3">{{ (item.company || {}).company_info }}</div>-->
      <!--    </RecycleScroller>-->
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import SortBy from '../../../components/Jason/SortBy'
import * as XLSX from 'xlsx'

export default {
  name: 'InvestmentList',
  components: {SortBy},
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
        this.page = 1
        this.last_page = 2
        this.investments = []
        this.fetch(this)
      }
    },
    sortBy: {
      deep: true,
      handler () {
        this.page = 1
        this.last_page = 2
        this.investments = []
        this.fetch(this)
      }
    },
    noneData: {
      handler (val) {
        this.$emit('noneData', val)
      }
    }
  },
  data: () => ({
    load: false,
    tableIndex: null,
    page: 1,
    count: 0,
    last_page: 2,
    per_page: 0,
    investments: [],
    tableHead: [
      {
        label: '날짜',
        width: '6%',
        order: 'created_at'
      },
      {
        label: '기업명',
        width: '8%'
      },
      {
        label: '대륙',
        width: '6%'
      },
      {
        label: '위치',
        width: '8%'
      },
      {
        label: '기업 웹사이트',
        width: '8%'
      },
      {
        label: '산업',
        width: '8%'
      },
      {
        label: '투자 단계',
        width: '8%'
      },
      {
        label: '투자금액 ($M)',
        width: '8%',
        order: 'invest_amount'
      },
      {
        label: '총 투자금액 ($M)',
        order: 'total_invest_amount',
        width: '8%'
      },
      {
        label: '투자자',
        width: '8%'
      },
      {
        label: 'Pre 벨류 ($M)',
        order: 'pre_value',
        width: '8%'
      },
      {
        label: '기업정보',
        width: '14%'
      }
    ],
    sortBy: {
      order: 'created_at',
      orderBy: 'desc'
    },
    noneData: false
  }),
  computed: {
    hasNextPage () {
      return this.load === false || this.page <= this.last_page
    }
  },

  methods: {
    s2ab (s) {
      let buf = new ArrayBuffer(s.length)
      let view = new Uint8Array(buf)
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
      return buf
    },
    excelDownload () {
      this.$http.get('/investments/export', {
        responseType: 'blob',
        params: {
          ...this.params,
          ...this.sortBy
        }
      }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data], {type: res.headers['content-type']}))
        const a = document.createElement('a')
        a.href = url
        const filename = `file.xlsx`
        a.setAttribute('download', filename)
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
    },
    onFetch () {
      this.fetch(this)
    },
    fetch: _.debounce((vm) => {
      if (vm.hasNextPage) {
        vm.$vs.loading()
        vm.$http.get('/investments', {
          params: {
            ...vm.params,
            ...vm.sortBy,
            page: vm.page
          }
        }).then((res) => {
          const {
            data,
            last_page,
            per_page
          } = res.data
          vm.last_page = last_page
          vm.per_page = per_page
          vm.investments = [...vm.investments, ...data]
          vm.page++
          res.data.data.length > 0 ? vm.noneData = false : vm.noneData = true
          vm.load = true
        }).catch(() => {
          vm.$vs.loading.close()
        }).finally(() => {
          if (vm.load) {
            vm.$vs.loading.close()
          }
        })
      }
    }, 200)
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
.main-scroll-table::v-deep {
  .excel-download {
    width: 100%;
    margin: 0 auto;

    .excel-button {
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #2f7bed;
      color: #fff;
      //padding: 9px 14px;
      border-radius: 3px;
      margin-bottom: 8px;
      font-size: 10px;
      font-weight: 400;
      width: 90px;
      height: 30px;

      .excel-image {
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }
    }
  }

  .scroller {
    width: 100%;
    border-top: 1px solid #6c6c6c;
    height: calc(var(--vh) * 100 - 210px);

    .table-headers {
      height: 45px;
      background: #f2f3f9;
      border-bottom: 1px solid #cacaca;
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .table-header {
        display: flex;
        flex: 1;
        font-size: 10px;
        font-weight: 600;
        align-items: center;
        justify-content: center;
      }
    }

    .scroller-table {
      height: calc(var(--vh) * 100 - 300px);

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(47, 53, 66, 0.5);
        border-radius: 10px;
        background-clip: padding-box;
        border: 1px solid transparent;
      }

      &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        box-shadow: inset 0 0 3px white;
      }
    }

    .vs-table-row {
      min-height: 70px;
      border-bottom: 1px solid #eaeaea;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      word-break: break-all;
      align-items: center;

      .vs-table-cell {
        flex: 1;
        font-size: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 100%;
        text-align: center;
        word-break: break-word;

        &.ellipsis-3 {
          display: -webkit-box;
          word-wrap: break-word;
          -webkit-line-clamp: 3;
          line-height: 20px;
          height: auto;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          align-self: center;
        }

        &.is-clicked {
          display: block !important;
          height: auto !important;
        }
      }
    }
  }
}
</style>
