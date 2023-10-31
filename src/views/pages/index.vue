<template>
  <div
      class="main"
      ref="main"
  >
    <!-- 화면 좌측 1차 필터    -->
    <main-filter
        :years.sync="localYears"
        :months.sync="localMonths"
        :quarters.sync="localQuarters"
        :industries.sync="localIndustries"
        :investFundingTypes.sync="localInvestFundingTypes"
        :investors.sync="localInvestors"
        :industriesIsUnion.sync="localIndustriesIsUnion"
        :investorsIsUnion.sync="localInvestorsIsUnion"
    />

    <!-- 화면 우측 컨텐츠    -->
    <main-contents :params.sync="params"/>
  </div>
</template>

<script>
import MainFilter from '@/views/pages/components/MainFilter'
import MainContents from '@/views/pages/components/Jason/MainContents'

export default {
  name: 'home',
  components: {
    MainFilter,
    MainContents
  },
  watch: {
    // START filter watch
    localYears: {
      immediate: true,
      handler (val) {
        this.params.years = val
      }
    },
    localMonths: {
      immediate: true,
      handler (val) {
        this.params.months = val
      }
    },
    localQuarters: {
      immediate: true,
      handler (val) {
        this.params.quarters = val
      }
    },
    localIndustries: {
      immediate: true,
      handler (val) {
        //industries filter에서 보내는 value 값을 id 값으로 변환 해준다.
        this.params.industries = val.map(item => item.id)
      }
    },
    localInvestFundingTypes: {
      immediate: true,
      handler (val) {
        this.params.investFundingTypes = val
      }
    },
    localInvestors: {
      immediate: true,
      handler (val) {
        //investors filter에서 보내는 value 값을 id 값으로 변환 해준다.
        this.params.investors = val.map(item => item.id)
      }
    },
    localIndustriesIsUnion: {
      immediate: true,
      handler (val) {
        this.params.industriesIsUnion = val
      }
    },
    localInvestorsIsUnion: {
      immediate: true,
      handler( val ) {
        this.params.investorsIsUnion = val
      },
    },
    // end filter watch
  },
  data: () => ({
    // START filter data
    // -- START -- Local Data
    localYears: [],
    localMonths: [],
    localQuarters: [],
    localIndustries: [],
    localInvestFundingTypes: [],
    localInvestors: [],
    localIndustriesIsUnion: false,
    localInvestorsIsUnion: false,
    // -- END -- Local Data
    // -- START -- Parameters Data
    params: {
      years: [],
      months: [],
      quarters: [],
      industries: [],
      investFundingTypes: [],
      investors: [],
      industriesIsUnion: false,
      investorsIsUnion: false
    }
    // -- END -- Parameters Data
    // END filter data
  }),
  mounted () {
    this.$emit('router-mounted')
  }
}
</script>
<style
    scoped
    lang="scss"
>
.main::v-deep {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
