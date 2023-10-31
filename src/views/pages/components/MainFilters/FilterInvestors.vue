<template>
  <div class="w-full blex py-20 px-10">
    <div class="w-9/10 blex justify-between mb-13">
      <div class="text-2xs text-semi-black font-bold">
        투자자
      </div>
      <div
          class="blex text-4xs text-dark-gray underline cursor-pointer"
          @click="reset"
      >
        초기화
      </div>
    </div>
    <div class="w-9/10 blex justify-between mb-18">
      <div class="w-full">
        <v-select
            class="multiple-select"
            multiple
            placeholder="투자자 명을 검색해주세요."
            :closeOnSelect="false"
            :options="localOptionInvestors"
            :filterable="false"
            @open="onOpen"
            @close="onClose"
            v-model="localInvestors"
            label="name"
            @search="onSearch"
            :deselectFromDropdown="true"
        >
          <div slot="no-options">죄송합니다. 일치하는 항목이 없습니다.</div>
          <template #list-footer>
            <li
                v-show="hasNextPage"
                ref="load"
                class="loader"
            >
              --- 마지막 항목 ---
            </li>
          </template>
        </v-select>
      </div>
    </div>
    <div class="w-9/10 blex-left mb-13">
      <qt-main-filter-radio
          :options="[{name: '교집합', value: false}, {name: '합집합', value: true}]"
          v-model="localIsUnion"
      />
    </div>
  </div>
</template>
<script>
import QtMainFilterRadio from '@/components/QtMainFilterRadio.vue'
import vSelect from 'vue-select'
import _ from 'lodash'

export default {
  name: 'FilterInvestors',
  components: {
    QtMainFilterRadio,
    vSelect
  },
  props: {
    investors: {
      type: Array,
      default: () => ( [] )
    },
    isUnion: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    investors: {
      deep: true,
      immediate: true,
      handler( val ) {
        this.localInvestors = val
      }
    },
    isUnion: {
      immediate: true,
      handler( val ) {
        this.localIsUnion = val
      }
    },
    localInvestors: {
      deep: true,
      handler( val ) {
        this.$emit( 'update:investors', val )
      }
    },
    localIsUnion: {
      handler( val ) {
        this.$emit( 'update:isUnion', val )
      }
    }
  },
  computed: {
    hasNextPage() {
      return this.load === false || this.page < this.last_page
    }
  },
  data: () => ( {
    localOptionInvestors: [],
    localInvestors: [],
    localIsUnion: false,
    load: false,
    page: 1,
    last_page: 1,
    query: null,
    observer: null,
  } ),
  methods: {
    reset() {
      this.localInvestors = []
      this.localIsUnion = false
    },
    onSearch( search, loading ) {
      if( search.length ) {
        this.query = search
        loading( true )
        this.search( loading, search, this )
      }
    },
    search: _.debounce( ( loading, search, vm ) => {
      vm.page = 1
      vm.last_page = 1
      vm.localOptionInvestors = []
      vm.fetch().finally( () => {
        loading( false )
      } )
    }, 300 ),
    fetch() {
      return new Promise( ( resolve, reject ) => {
        this.$http.get( '/investors', {
          params: {
            page: this.page,
            q: this.query
          }
        } ).then( ( res ) => {
          this.localOptionInvestors = [ ...this.localOptionInvestors, ...res.data.data ]
          this.last_page = res.data.last_page
          this.load = true
          resolve()
        } ).catch( ( e ) => {
          reject( e )
        } )
      } )
    },
    // select가 Open되었을 때 함수
    async onOpen() {
      if( this.hasNextPage ) {
        await this.$nextTick()
        this.observer.observe( this.$refs.load )
      }
    },
    onClose() {
      this.observer.disconnect()
    },
    checkIsUnion( val ) {
      this.localIsUnion = val
    },
    async infiniteScroll( [ { isIntersecting, target } ] ) {
      if( isIntersecting ) {
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        this.fetch()
            .then( () => {
              this.page++
              ul.scrollTop = scrollTop
            } )
      }
    }
  },
  mounted() {
    this.observer = new IntersectionObserver( this.infiniteScroll )
  }
}
</script>
<style
    scoped
    lang="scss"
>
.v-select::v-deep {
  font-size: 12px !important;
  --vs-dropdown-option--active-bg: #ffeeed;
  --vs-dropdown-option--active-color: #3a3a3a;
  --vs-dropdown-option-color: #cacaca;

  .vs__dropdown-toggle {
    padding: 0 !important;
    max-height: 108px !important;
    overflow-y: auto !important;

    &::-webkit-scrollbar-track {
      margin: 7px 0 !important;
      background-color: #eaeaea;
      background-clip: padding-box;
      border: 3px solid white;
      border-radius:10px;
    }

    &::-webkit-scrollbar {
      background-color: white;
      width: 10px;
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #979797;
      background-clip: padding-box;
      border-right: 3px solid white;
      border-left: 3px solid white;
      border-radius:10px;
      border-top: 3px solid rgba(0,0,0,0);
      border-bottom: 3px solid rgba(0,0,0,0);
    }
  }

  ul {
    &::-webkit-scrollbar-track {
      margin: 5px 0 !important;
      background-color: #eaeaea;
      background-clip: padding-box;
      border: 3px solid white;
      border-radius:10px;
    }

    &::-webkit-scrollbar {
      background-color: white;
      width: 10px;
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #979797;
      background-clip: padding-box;
      border-right: 3px solid white;
      border-left: 3px solid white;
      border-top: 3px solid rgba(0,0,0,0);
      border-bottom: 3px solid rgba(0,0,0,0);
      border-radius:10px;
    }
  }

  .vs__selected {
    margin: 2px;
  }

  .vs__dropdown-option--selected {
    position: relative;
    background-color: #ffeeed;
    color: #3a3a3a;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 14px;
      width: 20px;
      height: 20px;
      background: url(~@/assets/images/icon/filter-check-icon.png) no-repeat center center;
    }
  }

  input {
    height: 32px;

  }


  .loader {
    padding: 5px 20px !important;
  }
}

</style>
