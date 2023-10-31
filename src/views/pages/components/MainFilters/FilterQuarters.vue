<template>
  <div class="filter-wrapper w-9/10 blex justify-between mb-5">
    <div class="w-full">
      <v-select
          class="multiple-select"
          multiple
          placeholder="분기별"
          :disabled="months.length > 0 ? true : false"
          :closeOnSelect="false"
          :options="localOptionQuarters"
          v-model="localQuarters"
          :reduce="(item) => item.quarter"
          label="quarter"
          :deselectFromDropdown="true"
      >
        <template v-slot:selected-option="option">
          {{ option.quarter }}분기
        </template>
        <template v-slot:option="option">
          {{ option.quarter }}분기
        </template>
        <div slot="no-options">죄송합니다. 일치하는 항목이 없습니다.</div>
      </v-select>
    </div>
  </div>
</template>
<script>

import vSelect from 'vue-select'

export default {
  name: 'FilterQuarters',
  components: {
    vSelect
  },
  props: {
    years: {
      type: Array,
      default: () => ([])
    },
    quarters: {
      type: Array,
      default: () => ([])
    },
    months: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
    years: {
      deep: true,
      immediate: true,
      handler () {
        this.fetch()
      }
    },
    quarters: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localQuarters = val
      }
    },
    localQuarters: {
      deep: true,
      handler (val) {
        this.$emit('update:quarters', val)
      }
    }
  },
  data: () => ({
    localOptionQuarters: [],
    localQuarters: []
  }),
  methods: {
    fetch () {
      return new Promise((resolve, reject) => {
        this.$vs.loading()
        this.$http.get('/quarters', {
          params: {
            years: this.years,
          }
        }).then((res) => {
          this.localOptionQuarters = res.data
          resolve()
        }).catch((e) => {
          reject(e)
        }).finally(() => {
          this.$vs.loading.close(this.$refs.container)
        })
      })
    }
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
      margin: 7px  0!important;
      background-color: #eaeaea;
      background-clip: padding-box;
      border: 3px solid white;
      border-radius: 10px;
    }
    &::-webkit-scrollbar {
      background-color: white;
      width: 10px;
      height:5px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #979797;
      background-clip: padding-box;
      border-right: 3px solid white;
      border-left: 3px solid white;
      border-top:3px solid rgba(0,0,0,0);
      border-bottom:3px solid rgba(0,0,0,0);
      border-radius: 10px;
    }
  }
  ul{
    &::-webkit-scrollbar-track{
      margin: 5px  0!important;
      background-color: #eaeaea;
      background-clip: padding-box;
      border: 3px solid white;
      border-radius: 10px;
    }
    &::-webkit-scrollbar {
      background-color: white;
      width: 10px;
      height:5px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #979797;
      background-clip: padding-box;
      border-right: 3px solid white;
      border-left: 3px solid white;
      border-top:3px solid rgba(0,0,0,0);
      border-bottom:3px solid rgba(0,0,0,0);
      border-radius: 10px;
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
