<template>
  <div class="filter-wrapper w-9/10 blex justify-between mb-5">
    <div
        class="w-full h-full"
    >
      <v-select
          class="multiple-select"
          multiple
          placeholder="연도별"
          :closeOnSelect="false"
          :options="localOptionYears"
          v-model="localYears"
          :reduce="(item) => item.year"
          :deselectFromDropdown="true"
          label="year"
      >
        <template v-slot:selected-option="option">
          {{ option.year }}년
        </template>
        <template v-slot:option="option">
          {{ option.year }}년
        </template>
        <div slot="no-options">죄송합니다. 일치하는 항목이 없습니다.</div>
      </v-select>
    </div>
  </div>
</template>
<script>
import vSelect from 'vue-select'

export default {
  name: 'FilterYears',
  components: {
    vSelect
  },
  props: {
    years: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
    years: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localYears = val
      }
    },
    localYears: {
      deep: true,
      handler (val) {
        this.$emit('update:years', val)
      }
    }
  },
  computed: {
    hasNextPage () {
      if (this.page === 1) return true
      else if (this.page < this.last_page) return true
      else return false
    }
  },
  data: () => ({
    localOptionYears: [],
    localYears: [],
    localIsReset: false,
    page: 1,
    query: null,
    observer: null
  }),
  methods: {
    fetch () {
      return new Promise((resolve, reject) => {
        this.$http.get('/years', {
          params: {
            page: this.page,
            query: this.query
          }
        })
            .then((res) => {
              this.localOptionYears = res.data
              resolve()
            })
            .catch((e) => {
              reject(e)
            })
      })
    }
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
      margin: 7px  0!important;
      background-color: #eaeaea;
      background-clip: padding-box;
      border: 3px solid white;
      border-radius:10px;
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
      border-radius:10px;
    }
  }
  ul{
    &::-webkit-scrollbar-track{
      margin: 5px  0!important;
      background-color: #eaeaea;
      background-clip: padding-box;
      border: 3px solid white;
      border-radius:10px;
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
      border-radius:10px;
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
