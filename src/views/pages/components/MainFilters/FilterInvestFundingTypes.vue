<template>
  <div class="w-full blex border-b-1 border-border-gray py-20 px-10">
    <div class="w-9/10 blex justify-between mb-13">
      <div class="text-2xs text-semi-black font-bold">
        투자단계
      </div>
      <div
          class="blex text-4xs text-dark-gray underline cursor-pointer"
          @click="localInvestFundingTypes = []"
      >
        초기화
      </div>
    </div>
    <div class="w-9/10 blex justify-between mb-18">
      <div class="w-full">

        <v-select
            class="multiple-select"
            multiple
            placeholder="투자 단계를 검색해주세요."
            :closeOnSelect="false"
            :options="localOptionInvestFundingTypes"
            :deselectFromDropdown="true"
            label="name"
            v-model="localInvestFundingTypes"
            :reduce="(item) => item.id"
            ref="select"
        >
          <div slot="no-options">죄송합니다. 일치하는 항목이 없습니다.</div>
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  name: 'FilterInvestFundingTypes',
  components: {
    vSelect
  },
  props: {
    investFundingTypes: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
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
    }
  },
  data: () => ({
    localOptionInvestFundingTypes: [],
    localInvestFundingTypes: []
  }),
  methods: {
    fetch () {
      return new Promise((resolve, reject) => {
        this.$http.get('/investment-funding-types')
            .then((res) => {
              this.localOptionInvestFundingTypes = res.data
              resolve()
            })
            .catch((e) => {
              reject(e)
            })
      })
    },
  },
  mounted () {
    this.fetch()
  }
}
</script>

<style scoped lang="scss">
.v-select::v-deep {
  font-size: 12px !important;
  --vs-dropdown-option--active-bg: #ffeeed;
  --vs-dropdown-option--active-color: #3a3a3a;
  --vs-dropdown-option-color: #cacaca;
  .vs__dropdown-toggle {
    padding : 0 !important;
    max-height:108px !important;
    overflow-y:auto !important;

    &::-webkit-scrollbar-track{
      border-radius: 10px;
      margin: 7px  0!important;
      background-color: #eaeaea;
      background-clip: padding-box;
      border: 3px solid white;
    }
    &::-webkit-scrollbar {
      background-color: white;
      width: 10px;
      height:5px;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 10px;
      background-color: #979797;
      background-clip: padding-box;
      border-right: 3px solid white;
      border-left: 3px solid white;
      border-top:3px solid rgba(0,0,0,0);
      border-bottom:3px solid rgba(0,0,0,0);
    }
  }
  ul{
    &::-webkit-scrollbar-track{
      margin: 5px  0!important;
      background-color: #eaeaea;
      background-clip: padding-box;
      border: 3px solid white;
    }
    &::-webkit-scrollbar {
      background-color: white;
      width: 10px;
      height:5px;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 10px;
      background-color: #979797;
      background-clip: padding-box;
      border-right: 3px solid white;
      border-left: 3px solid white;
      border-top:3px solid rgba(0,0,0,0);
      border-bottom:3px solid rgba(0,0,0,0);
    }
  }
  .vs__selected{
    margin: 2px;
  }

  .vs__dropdown-option--selected{
    position:relative;
    background-color:#ffeeed;
    color:#3a3a3a;
    &::after{
      content:'';
      position:absolute;
      top:0;
      right:14px;
      width:20px;
      height:20px;
      background: url(~@/assets/images/icon/filter-check-icon.png) no-repeat center center;
    }
  }
  input {
    height:32px;

  }


  .loader {
    padding: 5px 20px !important;
  }
}

</style>
