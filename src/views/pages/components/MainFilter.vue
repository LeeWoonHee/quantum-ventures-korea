<template>
  <div class="filter-wrapper">
    <div class="filter">
      <!--            filter title top -->
      <div class="w-full blex border-b-1 border-border-gray py-20 px-10">
        <div class="w-9/10 blex justify-between">
          <div class="text-normal font-bold">
            메인 필터
          </div>
          <div
              class="blex text-4xs text-dark-gray cursor-pointer"
              @click="mainFilterReset"
          >
            <img
                class="mr-6"
                width="10px"
                src="@/assets/images/icon/refresh-filter-icon.png"
                alt=""
            />
            메인 필터 초기화
          </div>
        </div>
      </div>
      <!--          day filter  -->
      <filter-date
          :years.sync="localYears"
          :months.sync="localMonths"
          :quarters.sync="localQuarters"
      />
      <!--  industry filter  -->
      <filter-industries
          :industries.sync="localIndustries"
          :isUnion.sync="localIndustriesIsUnion"
      />
      <!--funding types filter-->
      <filter-invest-funding-types
          :investFundingTypes.sync="localInvestFundingTypes"
      />
      <!--investors filter-->
      <filter-investors
          :investors.sync="localInvestors"
          :isUnion.sync="localInvestorsIsUnion"
      />
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import QtSelectBox from '@/components/QtSelectBox.vue'
import QtMainFilterRadio from '@/components/QtMainFilterRadio.vue'
import FilterIndustries from './MainFilters/FilterIndustries'
import FilterInvestFundingTypes from '@/views/pages/components/MainFilters/FilterInvestFundingTypes.vue'
import FilterInvestors from '@/views/pages/components/MainFilters/FilterInvestors.vue'
import FilterDate from '@/views/pages/components/MainFilters/FilterDate.vue'

export default {
  name: 'MainFilter',
  components: {
    FilterDate,
    FilterInvestors,
    FilterInvestFundingTypes,
    QtMainFilterRadio,
    QtSelectBox,
    vSelect,
    FilterIndustries
  },
  props: {
    //start for date props data
    years: {
      type: Array,
      default: () => ([])
    },
    months: {
      type: Array,
      default: () => ([])
    },
    quarters: {
      type: Array,
      default: () => ([])
    },
    // end for date
    //start for industries props data
    industries: {
      type: Array,
      default: () => ([])
    },
    industriesIsUnion: {
      type: Boolean,
      default: false
    },
    // end for industries
    //start for invest funding types props data
    investFundingTypes: {
      type: Array,
      default: () => ([])
    },
    // end for invest funding types
    // start for investors props data
    investors: {
      type: Array,
      default: () => ([])
    },
    investorsIsUnion: {
      type: Boolean,
      default: false
    }
    // end for investors
  },
  watch: {
    //start for date watch data
    years: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localYears = val
      }
    },
    months: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localMonths = val
      }
    },
    quarters: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localQuarters = val
      }
    },
    localYears: {
      immediate: true,
      handler (val) {
        this.$emit('update:years', val)
      }
    },
    localMonths: {
      immediate: true,
      handler (val) {
        this.$emit('update:months', val)
      }
    },
    localQuarters: {
      immediate: true,
      handler (val) {
        this.$emit('update:quarters', val)
      }
    },
    // end for date


    // Start for industries watch data
    industries: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localIndustries = val
      }
    },
    industriesIsUnion: {
      immediate: true,
      handler (val) {
        this.localIndustriesIsUnion = val
      }
    },
    // for industries in local
    localIndustries: {
      deep: true,
      handler (val) {
        this.$emit('update:industries', val)
      }
    },
    localIndustriesIsUnion: {
      handler (val) {
        this.$emit('update:industriesIsUnion', val)
      }
    },
    // End for industries

    //  start for invest-funding-types watch data
    investFundingTypes: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localInvestFundingTypes = val
      }
    },
    localInvestFundingTypes: {
      deep: true,
      handler (val) {
        this.$emit('update:investFundingTypes', val)
      }
    },
    // end for invest-funding-types

    // start for investors watch data
    investors: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localInvestors = val
      }
    },
    investorsIsUnion: {
      immediate: true,
      handler (val) {
        this.localInvestorsIsUnion = val
      }
    },
    localInvestors: {
      deep: true,
      handler (val) {
        this.$emit('update:investors', val)
      }
    },
    localInvestorsIsUnion: {
      handler (val) {
        this.$emit('update:investorsIsUnion', val)
      }
    }
    // End for investors
  },
  data: () => ({
    // start for date local data
    localYears: [],
    localMonths: [],
    localQuarters: [],
    // End for date

    // start for investors local data
    localInvestors: [],
    localInvestorsIsUnion: false,
    // End for investors


    // start for invest-funding-types local data
    localInvestFundingTypes: [],
    // End for invest-funding-types

    // start for industries local data
    localIndustries: [],
    localIndustriesIsUnion: false
    // End for industries
  }),
  methods: {
    mainFilterReset () {
      //메인 필터 초기화
      this.localYears = []
      this.localMonths = []
      this.localQuarters = []
      this.localIndustries = []
      this.localIndustriesIsUnion = false
      this.localInvestFundingTypes = []
      this.localInvestors = []
      this.localInvestorsIsUnion = false
    }
  }
}
</script>

<style
    scoped
    lang="scss"
>
.filter-wrapper::v-deep {
  width: 15.5%;
  height: calc(var(--vh) * 100 - 63px);
  background: #FFFFFF;

  border: 1px solid #F4F4F4;
  border-bottom: none;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: center;
  justify-items: center;
  overflow-y: auto;
    &::-webkit-scrollbar {
      background: #eaeaea;
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #979797;
    }


  //&:hover {
  //  overflow-y: scroll;
  //
  //  &::-webkit-scrollbar {
  //    background: #eaeaea;
  //    width: 4px;
  //    height: 4px;
  //  }
  //
  //  &::-webkit-scrollbar-thumb {
  //    background: #979797;
  //  }
  //}


  //&:hover {
  //  &::-webkit-scrollbar {
  //    background: #eaeaea;
  //    width: 4px;
  //    height: 4px;
  //  }
  //
  //  &::-webkit-scrollbar-thumb {
  //    background: #979797;
  //  }
  //}


  .filter {
    width: 100%;
    @media screen and (max-height: 1020px) {

    }
    height: 100%;
    //border-bottom:none;
    .select-box {
      width: 90%;

    }

    .multiple-select {
      color: #979797;

      .filter-wrapper {
        height: 30px !important;
      }

      .vs__dropdown-toggle {
        border-radius: 0;

        .vs__search {
          font-size: 10px !important;
        }
      }
    }
  }
}
</style>
