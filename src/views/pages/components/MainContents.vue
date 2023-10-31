<template>
  <div class="main-contents-wrapper">
    <div class="main-contents-container">
      <!--  상단 필터    -->
      <div class="main-contents-top-filter">
        <div class="w-full blex">

          <div class="blex-left w-full mb-20">
            <div class="mr-25 text-darken text-xl">
              상세 필터
            </div>
            <div
                class="blex text-3xs text-dark-gray cursor-pointer"
                @click="reset = true"
            >
              <img
                  class="mr-6"
                  src="@/assets/images/icon/refresh-filter-icon.png"
                  alt=""
              />
              상세 필터 초기화
            </div>
          </div>
          <qt-category
              :category="['투자 빈도수', '투자 금액']"
              :reset="reset"
              @goReset="goReset"
              @checkCategory="checkCategory"
          />
          <qt-category
              :smallCategory="['날짜', '산업', '투자 단계', '투자자']"
              :small="true"
              :defaultActive="defaultActive"
              :reset="reset"
              @goReset="goReset"
              @checkSmallCategory="checkSmallCategory"
          />
          <qt-top-filter-radio
              v-show="category === '투자 금액' || category ==='투자 빈도수' "
              :radio="smallCategory === '날짜' ? DateRadio : this.category === '투자 금액' && smallCategory === '산업' ? industryRadio : this.category === '투자 빈도수' && smallCategory === '산업' ? frequencyIndustryRadio : smallCategory === '투자 단계' ? investmentStepRadio : smallCategory === '투자자' ? investorRadio : null"
              style="margin-bottom: 14px"
              @goRadioValue="goRadioValue"
              :smallCategory="smallCategory"
              :resetValue="radioValue"
          />

        </div>

      </div>

      <!--  하단 테이블/그래프 나오는 섹션    -->

      <div class="main-bottom-section">
        <div
            v-if="category !== ''"
            class="main-bg">
        </div>
        <!-- 메인 테이블-->
        <main-data-table
            v-if="category === ''"
            :companies="companies"
            @update:page="checkPage"
        />


        <!--투자금액/날짜 차트-->
        <investment-money-chart
            v-else-if="category === '투자 금액' && smallCategory === '날짜'"
            secondTableTitle="날짜"
            xTitle="날짜"
            yTitle="투자금액 ($M)"
            :radioValue="radioValue"
            :smallCategory="smallCategory"
            :companies="localCompanies"
            :category="category"
            @checkTableSelectValue="checkTableSelectValue"
            @checkGraphSelectValue="checkGraphSelectValue"
        />

        <!--                투자금액/산업 차트-->
        <investment-money-industry-chart
            v-else-if="category === '투자 금액' && smallCategory === '산업'"
            secondTableTitle="산업"
            xTitle="투자금액 ($M)"
            yTitle="산업"
            :horizontal="true"
            :radioValue="radioValue"
            :smallCategory="smallCategory"
            :investmentStage="investmentStage"
            :investor="investor"
            :companies="localCompanies"
            :category="category"
            @checkTableSelectValue="checkTableSelectValue"
            @checkGraphSelectValue="checkGraphSelectValue"
        />

        <!--                투자금액/투자단계 차트-->
        <investment-money-stage-chart
            v-else-if="category === '투자 금액' && smallCategory === '투자 단계'"
            secondTableTitle="투자단계"
            xTitle="투자금액 ($M)"
            yTitle="투자단계"
            :horizontal="true"
            :radioValue="radioValue"
            :smallCategory="smallCategory"
            :companies="companies"
            :category="category"
            @checkTableSelectValue="checkTableSelectValue"
            @checkGraphSelectValue="checkGraphSelectValue"
        />


        <!--                투자금액/투자자 차트-->
        <investment-money-investor-chart
            v-else-if="category === '투자 금액' && smallCategory === '투자자'"
            secondTableTitle="투자자"
            thirdTableTitle="투자사가 참여한 건의 투자금액 ($M)"
            xTitle="투자사가 참여한 건의 투자금액 ($M)"
            yTitle="투자자"
            :horizontal="true"
            :radioValue="radioValue"
            :smallCategory="smallCategory"
            :companies="companies"
            :category="category"
            @checkTableSelectValue="checkTableSelectValue"
            @checkGraphSelectValue="checkGraphSelectValue"
        />


        <!--        투자빈도수         -->

        <!--        투자빈도수 / 날짜        -->
        <investment-frequency-date-chart
            v-else-if="category === '투자 빈도수' && smallCategory === '날짜'"
            secondTableTitle="날짜"
            xTitle="날짜"
            yTitle="투자빈도수"
            :radioValue="radioValue"
            :smallCategory="smallCategory"
            :companies="localCompanies"
            :category="category"
            @checkTableSelectValue="checkTableSelectValue"
            @checkGraphSelectValue="checkGraphSelectValue"
        />
        <!--      투자빈도수/산업          -->
        <investment-frequency-industry-chart
            v-else-if="category === '투자 빈도수' && smallCategory === '산업'"
            secondTableTitle="산업"
            xTitle="투자빈도수"
            yTitle="산업"
            :horizontal="true"
            :radioValue="radioValue"
            :smallCategory="smallCategory"
            :investmentStage="investmentStage"
            :investor="investor"
            :companies="localCompanies"
            :category="category"
            @checkTableSelectValue="checkTableSelectValue"
            @checkGraphSelectValue="checkGraphSelectValue"
        />

        <!--      투자빈도수/투자단계          -->
        <investment-frequency-stage-chart
            v-else-if="category === '투자 빈도수' && smallCategory === '투자 단계'"
            secondTableTitle="투자단계"
            xTitle="투자빈도수"
            yTitle="투자단계"
            :horizontal="true"
            :radioValue="radioValue"
            :smallCategory="smallCategory"
            :companies="localCompanies"
            :category="category"
        />
        <!--      투자빈도수/투자자          -->
        <investment-frequency-investor-chart
            v-else-if="category === '투자 빈도수' && smallCategory === '투자자'"
            secondTableTitle="투자자"
            thirdTableTitle="투자사가 참여한 건의 투자금액 ($M)"
            xTitle="투자사가 참여한 건의 투자금액 ($M)"
            yTitle="투자자"
            :horizontal="true"
            :radioValue="radioValue"
            :smallCategory="smallCategory"
            :companies="companies"
            :category="category"
            @checkTableSelectValue="checkTableSelectValue"
            @checkGraphSelectValue="checkGraphSelectValue"
        />
      </div>

    </div>

  </div>
</template>

<script>
import QtCategory from '@/components/QtCategory.vue'
import QtTopFilterRadio from '@/components/QtTopFilterRadio.vue'
import MainDataTable from '@/views/pages/components/MainDataTable.vue'
import InvestmentMoneyChart from '@/views/pages/components/InvestmentMoneyChart.vue'
import InvestmentMoneyIndustryChart from '@/views/pages/components/InvestmentMoneyIndustryChart.vue'
import InvestmentMoneyStageChart from '@/views/pages/components/InvestmentMoneyStageChart.vue'
import InvestmentMoneyInvestorChart from '@/views/pages/components/InvestmentMoneyInvestorChart.vue'
import InvestmentFrequencyDateChart from '@/views/pages/components/InvestmentFrequencyDateChart.vue'
import InvestmentFrequencyIndustryChart from '@/views/pages/components/InvestmentFrequencyIndustryChart.vue'
import InvestmentFrequencyStageChart from '@/views/pages/components/InvestmentFrequencyStageChart.vue'
import InvestmentFrequencyInvestorChart from '@/views/pages/components/InvestmentFrequencyInvestorChart.vue'

export default {
  name: 'MainContents',
  components: {
    QtCategory,
    QtTopFilterRadio,
    MainDataTable,
    InvestmentMoneyStageChart,
    InvestmentMoneyIndustryChart,
    InvestmentMoneyChart,
    InvestmentMoneyInvestorChart,
    InvestmentFrequencyDateChart,
    InvestmentFrequencyIndustryChart,
    InvestmentFrequencyStageChart,
    InvestmentFrequencyInvestorChart
  },
  watch: {
    category: {
      deep: true,
      immediate: true,
      handler (val) {
        if (this.category === '투자 금액' || '투자 빈도수') {
          this.defaultActive = this.category
          this.smallCategory = '날짜'
        } else {
          this.smallCategory = ''
        }
      },
    },
    smallCategory: {
      deep: true,
      immediate: true,
      handler (val) {
        this.radioValue = ''
      }
    },
    companies: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localCompanies = val
      }
    },
    page: {
      immediate: true,
      handler (val) {
        this.$emit('update:page', val)
      }
    },
    localFetch: {
      immediate: true,
      handler (val) {
        this.$emit('update:fetch', val)
      }
    }
  },
  props: {
    companies: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    localFetch: null,
    localCompanies: [],
    reset: false,
    DateRadio: [
      '연도별',
      '월별',
      '분기별'
    ],
    frequencyIndustryRadio: [
      '투자단계', '투자자'
    ],
    industryRadio: [
      '투자단계', '투자자', '분기별 탑20 산업 트렌드'
    ],
    investmentStepRadio: [
      '산업', '투자자'
    ],
    investorRadio: [
      '산업', '투자단계'
    ],
    category: '',
    smallCategory: '',
    defaultActive: null,
    radioValue: '',
    investmentStage: [
      'Pre-Seed',
      'Seed',
      'Angel',
      'Series A',
      'Series B',
      'Series C',
      'Series D',
      'Series E',
      'Series F',
      'Series G',
      'Series H',
      'Series I',
      'Series J',
      'Private Equity',
      'Initial Coin Offering',
      'Secondary Market',
      'Pre IPO',
      'Convertible Note',
      'Venture - Series Unknown',
      'Grant'
    ],
    investor: [
      'Norfund',
      'Animoca Brands',
      'Engage',
      'Amar Shah',
      'Hillhouse Capital',
      'Finmirai',
      'Lemniscap',
      'Linda Ye',
      'Distinction Capital',
      'toss'
    ],
    page: 0
  }),
  methods: {
    checkPage (val) {
      this.page = val
    },
    checkSmallCategory (value) {
      this.smallCategory = value
      this.radioValue = ''
      this.$emit('checkSmallCategory', value)
    },
    checkCategory (value) {
      this.category = value
      this.$emit('checkCategory', value)
      this.$emit('checkSmallCategory', '날짜')
      this.radioValue = ''
    },
    goReset (value) {
      this.reset = value
      this.$emit('checkMainContentsReset', value)
    },
    goRadioValue (value) {
      this.radioValue = value
      this.$emit('checkMainContentsRaioValue', value)
    },
    checkTableSelectValue (value) {
      this.$emit('checkTableSelectValue', value)
    },
    checkGraphSelectValue (value) {
      this.$emit('checkGraphSelectValue', value)
    },
    fetch () {
      this.$emit('update:fetch')
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
.main-contents-wrapper::v-deep {
  width: 83%;
  background: #FFFFFF;
  border: 1px solid #F4F4F4;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13);
  border-bottom: none;
  padding-top: 26px;
  overflow-y: auto;

  &:hover {
    &::-webkit-  scrollbar {
      background: #eaeaea;
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #979797;
    }
  }

  &::-webkit-scrollbar {
    background: #eaeaea;
    width: 0;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #979797;
  }

  .main-contents-container {
    width: 93.333333%;
    margin: 0 auto;

    .main-contents-top-filter {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      align-items: center;
      align-content: center;
      justify-content: center;
      justify-items: center;
      width: 100%;
    }

    .main-bottom-section {
      position: relative;
      opacity: 0.99;

      .main-bg {
        background: url(~@/assets/images/logo/table-logo.png) no-repeat center center;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        opacity: 0.05;
      }
    }

  }

}
</style>
