<template>
  <div class="main-contents-wrapper">
    <div class="main-contents-container">
      <!--  상단 필터    -->
      <div class="main-contents-top-filter">
        <div class="w-full blex">

          <div class="blex-left w-full mb-10">

            <div class="mr-15 text-darken text-md font-bold">
              상세 필터
            </div>
            <div
                class="blex text-4xs text-dark-gray cursor-pointer"
                @click="reset"
            >
              <img
                  width="10px"
                  class="mr-6"
                  src="@/assets/images/icon/refresh-filter-icon.png"
                  alt=""
              />
              상세 필터 초기화
            </div>
          </div>
          <qt-filter-category
              :selected-category-index.sync="selectedCategoryIndex"
              :selected-sub-category-index.sync="selectedSubCategoryIndex"
              :selected-radio-index.sync="selectedRadioIndex"
              :default-sub-categories="defaultSubCategories"
              :categories="categories"
          />
        </div>
      </div>

      <!--  하단 테이블/그래프 나오는 섹션    -->

      <div class="main-bottom-section">
<!--   데이터가 없을 때 main-bg 사라짐     -->
        <div
            v-if="localNoneData === false"
            class="main-bg">
        </div>
        <div
            v-else-if="localNoneData === true"
            class="none-data-main-bg">
        </div>
        <!-- 메인 테이블-->
        <investment-list
            class="w-full"
            v-if="selectedCategoryIndex === null"
            :params="params"
            @noneData="noneData"
        />
        <!-------------------------------->
        <!---       투자빈도수         --->
        <!-------------START-------------->

        <!--        투자빈도수 / 날짜 - 연도별       -->
        <f-d-yearly
            v-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 0
            && selectedRadioIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자빈도수 / 날짜 - 월별       -->
        <f-d-monthly
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 0
            && selectedRadioIndex === 1"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자빈도수 / 날짜 - 분기별     -->
        <f-d-quarterly
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 0
            && selectedRadioIndex === 2"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자빈도수 / 날짜        -->
        <frequency-date
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!-------------------------------->
        <!-------------------------------->
        <!-------------------------------->
        <!--        투자빈도수 / 산업 - 투자 단계  -->
        <f-i-investment-funding-type
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 1
            && selectedRadioIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자빈도수 / 산업 - 투자자     -->
        <f-i-investor
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 1
            && selectedRadioIndex === 1"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자빈도수 / 산업     -->
        <frequency-industry
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 1"
            :params="params"
            @noneData="noneData"
        />

        <!--        투자빈도수 / 투자 단계 - 산업       -->
        <f-ift-industry
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 2
            && selectedRadioIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자빈도수 / 투자 단계 - 투자자       -->
        <f-ift-investor
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 2
            && selectedRadioIndex === 1"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자빈도수 / 투자 단계        -->
        <frequency-investment-funding-type
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 2"
            :params="params"
            @noneData="noneData"
        />

        <!--        투자빈도수 / 투자자 - 산업        -->
        <f-in-industry
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 3
            && selectedRadioIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자빈도수 / 투자자 - 투자 단계    -->
        <f-in-investment-funding-type
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 3
            && selectedRadioIndex === 1"
            :params="params"
            @noneData="noneData"
        />

        <!--        투자빈도수 / 투자자        -->
        <frequency-investor
            v-else-if="selectedCategoryIndex === 0
            && selectedSubCategoryIndex === 3"
            :params="params"
            @noneData="noneData"
        />




        <!-------------------------------->
        <!---         투자금액          --->
        <!-------------START-------------->
        <!--        투자금액 / 날짜 - 연도별        -->
        <ia-d-yearly
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 0
            && selectedRadioIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 날짜 - 월별        -->
        <ia-d-monthly
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 0
            && selectedRadioIndex === 1"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 날짜 - 분기별        -->
        <ia-d-quarterly
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 0
            && selectedRadioIndex === 2"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 날짜        -->
        <investment-amount-date
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 산업 - 투자 단계        -->
        <ia-i-investment-funding-type
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 1
            && selectedRadioIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 산업 - 투자자        -->
        <ia-i-investor
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 1
            && selectedRadioIndex === 1"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 산업 - 분기별 탑20 산업 트렌드        -->
        <ia-i-quarterly-top-industry-trends
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 1
            && selectedRadioIndex === 2"
            :params="params"
        />
        <!--        투자금액 / 산업        -->
        <investment-amount-industry
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 1"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 투자 단계 - 산업        -->
        <ia-ift-industry
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 2
            && selectedRadioIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 투자 단계 - 투자자        -->
        <ia-ift-investor
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 2
            && selectedRadioIndex === 1"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 투자 단계        -->
        <investment-amount-investment-funding-type
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 2"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 투자자 - 산업        -->
        <ia-in-industry
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 3
            && selectedRadioIndex === 0"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 투자자 - 투자 단계        -->
        <ia-in-investment-funding-type
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 3
            && selectedRadioIndex === 1"
            :params="params"
            @noneData="noneData"
        />
        <!--        투자금액 / 투자자        -->
        <investment-amount-investor
            v-else-if="selectedCategoryIndex === 1
            && selectedSubCategoryIndex === 3"
            :params="params"
            @noneData="noneData"
        />
        <!-------------END---------------->
        <!---        투자금액           --->
        <!-------------------------------->

        <!--        &lt;!&ndash;        투자 금액         &ndash;&gt;-->

        <!--        &lt;!&ndash;투자금액/날짜 차트&ndash;&gt;-->
        <!--        <investment-money-chart-->
        <!--            v-else-if="selectedCategoryIndex === 1 && selectedSubCategoryIndex === 0"-->
        <!--            secondTableTitle="날짜"-->
        <!--            xTitle="날짜"-->
        <!--            yTitle="투자금액 ($M)"-->
        <!--            :radioValue="radioValue"-->
        <!--            :smallCategory="smallCategory"-->
        <!--            :companies="localCompanies"-->
        <!--            :category="category"-->
        <!--            @checkTableSelectValue="checkTableSelectValue"-->
        <!--            @checkGraphSelectValue="checkGraphSelectValue"-->
        <!--        />-->

        <!--        &lt;!&ndash;                투자금액/산업 차트&ndash;&gt;-->
        <!--        <investment-money-industry-chart-->
        <!--            v-else-if="selectedCategoryIndex === 1 && selectedSubCategoryIndex === 1"-->
        <!--            secondTableTitle="산업"-->
        <!--            xTitle="투자금액 ($M)"-->
        <!--            yTitle="산업"-->
        <!--            :horizontal="true"-->
        <!--            :radioValue="radioValue"-->
        <!--            :smallCategory="smallCategory"-->
        <!--            :investmentStage="investmentStage"-->
        <!--            :investor="investor"-->
        <!--            :companies="localCompanies"-->
        <!--            :category="category"-->
        <!--            @checkTableSelectValue="checkTableSelectValue"-->
        <!--            @checkGraphSelectValue="checkGraphSelectValue"-->
        <!--        />-->

        <!--        &lt;!&ndash;                투자금액/투자단계 차트&ndash;&gt;-->
        <!--        <investment-money-stage-chart-->
        <!--            v-else-if="selectedCategoryIndex === 1 && selectedSubCategoryIndex === 2"-->
        <!--            secondTableTitle="투자단계"-->
        <!--            xTitle="투자금액 ($M)"-->
        <!--            yTitle="투자단계"-->
        <!--            :horizontal="true"-->
        <!--            :radioValue="radioValue"-->
        <!--            :smallCategory="smallCategory"-->
        <!--            :companies="companies"-->
        <!--            :category="category"-->
        <!--            @checkTableSelectValue="checkTableSelectValue"-->
        <!--            @checkGraphSelectValue="checkGraphSelectValue"-->
        <!--        />-->

        <!--        &lt;!&ndash;                투자금액/투자자 차트&ndash;&gt;-->
        <!--        <investment-money-investor-chart-->
        <!--            v-else-if="selectedCategoryIndex === 1 && selectedSubCategoryIndex === 3"-->
        <!--            secondTableTitle="투자자"-->
        <!--            thirdTableTitle="투자사가 참여한 건의 투자금액 ($M)"-->
        <!--            xTitle="투자사가 참여한 건의 투자금액 ($M)"-->
        <!--            yTitle="투자자"-->
        <!--            :horizontal="true"-->
        <!--            :radioValue="radioValue"-->
        <!--            :smallCategory="smallCategory"-->
        <!--            :companies="companies"-->
        <!--            :category="category"-->
        <!--            @checkTableSelectValue="checkTableSelectValue"-->
        <!--            @checkGraphSelectValue="checkGraphSelectValue"-->
        <!--        />-->
      </div>
    </div>
  </div>
</template>

<script>
import MainDataTable from '@/views/pages/components/MainDataTable.vue'
import QtFilterCategory from '../../../../components/Jason/QtFilterCategory'
import InvestmentList from '../InvestmentList'
// frequency --start
// - date
import FrequencyDate from '../particalPages/Frequency/Date'
import FDYearly from '../particalPages/Frequency/Date/Yearly'
import FDMonthly from '../particalPages/Frequency/Date/Monthly'
import FDQuarterly from '../particalPages/Frequency/Date/Quarterly'
// - industry
import FrequencyIndustry from '../particalPages/Frequency/Industry'
import FIInvestor from '@/views/pages/components/particalPages/Frequency/Industry/Investor'
import FIInvestmentFundingType from '../particalPages/Frequency/Industry/InvestmentFundingType'
// - investment funding type
import FrequencyInvestmentFundingType from '../particalPages/Frequency/InvestmentFundingType'
import FIftIndustry from '@/views/pages/components/particalPages/Frequency/InvestmentFundingType/Industry'
import FIftInvestor from '@/views/pages/components/particalPages/Frequency/InvestmentFundingType/Investor'
// - investor
import FrequencyInvestor from '../particalPages/Frequency/Investor'
import FInIndustry from '@/views/pages/components/particalPages/Frequency/Investor/Industry'
import FInInvestmentFundingType from '@/views/pages/components/particalPages/Frequency/Investor/InvestmentFundingType'
// frequency --end

// investment amount --start
// - date
import InvestmentAmountDate from '@/views/pages/components/particalPages/InvestmentAmount/Date'
import IaDYearly from '@/views/pages/components/particalPages/InvestmentAmount/Date/Yearly'
import IaDMonthly from '@/views/pages/components/particalPages/InvestmentAmount/Date/Monthly'
import IaDQuarterly from '@/views/pages/components/particalPages/InvestmentAmount/Date/Quarterly'
// - industry
import InvestmentAmountIndustry from '@/views/pages/components/particalPages/InvestmentAmount/Industry'
import IaIInvestmentFundingType from '@/views/pages/components/particalPages/InvestmentAmount/Industry/InvestmentFundingType'
import IaIInvestor from '@/views/pages/components/particalPages/InvestmentAmount/Industry/Investor'
import IaIQuarterlyTopIndustryTrends from '@/views/pages/components/particalPages/InvestmentAmount/Industry/QuarterlyTopIndustryTrends'
// - investment funding type
import InvestmentAmountInvestmentFundingType from '@/views/pages/components/particalPages/InvestmentAmount/InvestmentFundingType'
import IaIftIndustry from '@/views/pages/components/particalPages/InvestmentAmount/InvestmentFundingType/Industry'
import IaIftInvestor from '@/views/pages/components/particalPages/InvestmentAmount/InvestmentFundingType/Investor'
// - investor
import InvestmentAmountInvestor from '@/views/pages/components/particalPages/InvestmentAmount/Investor'
import IaInIndustry from '@/views/pages/components/particalPages/InvestmentAmount/Investor/Industry'
import IaInInvestmentFundingType from '@/views/pages/components/particalPages/InvestmentAmount/Investor/InvestmentFundingType'
// investment amount --end
export default {
  name: 'MainContents',
  components: {
    InvestmentList,
    QtFilterCategory,
    MainDataTable,
    // frequency --start
    // - date
    FrequencyDate,
    FDYearly,
    FDMonthly,
    FDQuarterly,
    // - industry
    FrequencyIndustry,
    FIInvestor,
    FIInvestmentFundingType,
    // - investment funding type
    FrequencyInvestmentFundingType,
    FIftIndustry,
    FIftInvestor,
    // - investor
    FrequencyInvestor,
    FInIndustry,
    FInInvestmentFundingType,
    // frequency --end
    //----------------------------------
    // investment amount --start
    // - date
    InvestmentAmountDate,
    IaDYearly,
    IaDMonthly,
    IaDQuarterly,
    // - industry
    InvestmentAmountIndustry,
    IaIInvestmentFundingType,
    IaIInvestor,
    IaIQuarterlyTopIndustryTrends,
    // - investment funding type
    InvestmentAmountInvestmentFundingType,
    IaIftIndustry,
    IaIftInvestor,
    // - investor
    InvestmentAmountInvestor,
    IaInIndustry,
    IaInInvestmentFundingType
    // investment amount --end
  },
  watch: {
    localNoneData: {
      handler (val) {
      }
    }
  },
  props: {
    params: {
      type: Object,
      default: () => ({
        years: [],
        months: [],
        quarters: [],
        industries: [],
        investFundingTypes: [],
        investors: [],
        industriesIsUnion: false,
        investorsIsUnion: false
      })
    }
  },
  data: () => ({
    defaultSubCategories: [
      {
        name: '날짜'
      },
      {
        name: '산업'
      },
      {
        name: '투자 단계'
      },
      {
        name: '투자자'
      }
    ],
    categories: [
      {
        name: '투자 빈도수',
        url: 'frequency',
        subCategories: [
          {
            name: '날짜',
            url: 'date',
            radios: [
              {
                name: '연도별',
                url: 'yearly'
              },
              {
                name: '월별',
                url: 'monthly'
              },
              {
                name: '분기별',
                url: 'quarterly'
              }
            ]
          },
          {
            name: '산업',
            url: 'industries',
            radios: [
              {
                name: '투자 단계',
                url: 'investment-funding-types'
              },
              {
                name: '투자자',
                url: 'investors'
              }
            ]
          },
          {
            name: '투자 단계',
            url: 'investment-funding-types',
            radios: [
              {
                name: '산업',
                url: 'industries'
              },
              {
                name: '투자자',
                url: 'investors'
              }
            ]
          },
          {
            name: '투자자',
            url: 'investors',
            radios: [
              {
                name: '산업',
                url: 'industries'
              },
              {
                name: '투자 단계',
                url: 'investment-funding-types'
              }
            ]
          }
        ]
      },
      {
        name: '투자 금액',
        url: 'investment-amount',
        subCategories: [
          {
            name: '날짜',
            url: 'date',
            radios: [
              {
                name: '연도별',
                url: 'yearly'
              },
              {
                name: '월별',
                url: 'monthly'
              },
              {
                name: '분기별',
                url: 'quarterly'
              }
            ]
          },
          {
            name: '산업',
            url: 'industries',
            radios: [
              {
                name: '투자 단계',
                url: 'investment-funding-types'
              },
              {
                name: '투자자',
                url: 'investors'
              },
              {
                name: '분기별 탑20 산업 트렌드',
                url: 'trend-per-quarter-20'
              }
            ]
          },
          {
            name: '투자 단계',
            url: 'investment-funding-types',
            radios: [
              {
                name: '산업',
                url: 'industries'
              },
              {
                name: '투자자',
                url: 'investors'
              }
            ]
          },
          {
            name: '투자자',
            url: 'investors',
            radios: [
              {
                name: '산업',
                url: 'industries'
              },
              {
                name: '투자 단계',
                url: 'investment-funding-types'
              }
            ]
          }
        ]
      }
    ],
    selectedCategoryIndex: null,
    selectedSubCategoryIndex: null,
    selectedRadioIndex: null,
    localNoneData: false,
  }),
  methods: {
    reset () {
      this.selectedCategoryIndex = null
      this.selectedSubCategoryIndex = null
      this.selectedRadioIndex = null
    },
    noneData(val){
      //자식 컴포넌트 데이터가 있는지 없는지 판단 후 localNoneData에 할당
      //localNoneData === false 이면 데이터가 있고
      //localNoneData === true 이면 데이터가 없음
      this.localNoneData = val
    }
  }
}
</script>

<style
    scoped
    lang="scss"
>
.main-contents-wrapper::v-deep {
  width: calc(84.5% - 4px);
  height: calc(var(--vh) * 100 - 63px);
  margin-left: 4px;
  background: #FFFFFF;
  //border: 1px solid #F4F4F4;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.13);
  border-bottom: none;
  padding-top: 20px;
  overflow-y: hidden;

  .main-contents-container {
    width: 95%;
    margin: 0 auto;
    height: 100%;

    .main-contents-top-filter {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      align-items: center;
      align-content: center;
      justify-content: center;
      justify-items: center;
      width: 100%;
      height: 122px;
    }

    .main-bottom-section {
      position: relative;
      opacity: 0.99;
      height: calc(100% - 122px);
      padding-bottom: 10px;

      .main-bg {
        background: url(~@/assets/images/logo/table-logo.png) no-repeat center center;
        background-size: 70%;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        opacity: 0.05;
      }
      .none-data-main-bg {
        background: url(~@/assets/images/logo/none-data-logo.svg) no-repeat center center;
        background-size: 25%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0 auto;
      }
    }

  }

}
</style>
