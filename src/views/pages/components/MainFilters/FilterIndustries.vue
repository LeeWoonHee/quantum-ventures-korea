<template>
  <div
      class="w-full blex border-b-1 border-border-gray py-20 px-10"
      ref="container"
  >
    <div class="w-9/10 blex justify-between mb-13">
      <div class="text-xs font-bold text-semi-black">
        산업
      </div>
      <div
          class="blex text-4xs cursor-pointer text-dark-gray underline"
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
            placeholder="산업명을 검색해주세요."
            :closeOnSelect="false"
            ref="select"
            :options="localOptionIndustries"
            label="name"
            @open="onOpen"
            @close="onClose"
            v-model="localIndustries"
            @search="onSearch"
            :deselectFromDropdown="true"
            :reduce="(item) => item"
        >
          <div slot="no-options">죄송합니다. 일치하는 항목이 없습니다.</div>
          <template #spinner="{ loading }">
            <div
                v-if="loading"
                style="border-left-color: rgba(88, 151, 251, 0.71)"
                class="vs__spinner"
            >
              항목을 불러오는 중..
            </div>
          </template>
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
  name: 'FilterIndustries',
  components: {
    QtMainFilterRadio,
    vSelect
  },
  props: {
    industries: {
      type: Array,
      default: () => ( [] )
    },
    isUnion: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    industries: {
      deep: true,
      immediate: true,
      handler( val ) {

        this.localIndustries = val
      }
    },
    isUnion: {
      immediate: true,
      handler( val ) {
        this.localIsUnion = val
      }
    },
    localIndustries: {
      handler( val ) {
        this.$emit( 'update:industries', val )
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
    localOptionIndustries: [],
    localIndustries: [],
    localIsUnion: false,
    load: false,
    page: 1,
    last_page: 1,
    query: null,
    observer: null
  } ),
  methods: {
    reset() {
      this.localIndustries = []
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
      vm.localOptionIndustries = []
      vm.fetch().finally( () => {
        loading( false )
      } )
    }, 300 ),
    fetch() {
      return new Promise( ( resolve, reject ) => {
        this.$http.get( '/industries', {
          params: {
            page: this.page,
            q: this.query
          }
        } )
            .then( ( res ) => {
              this.localOptionIndustries = [ ...this.localOptionIndustries, ...res.data.data ]
              this.last_page = res.data.last_page
              this.load = true
              resolve()
            } )
            .catch( ( e ) => {
              reject( e )
            } )
      } )
    },
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
      border-radius: 10px;
    }

    &::-webkit-scrollbar {
      background-color: white;
      width: 10px;
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #979797;
      background-clip: padding-box;
      border-right: 3px solid white;
      border-left: 3px solid white;
      border-top:3px solid rgba(0,0,0,0);
      border-bottom:3px solid rgba(0,0,0,0);
    }
  }

  ul {
    &::-webkit-scrollbar-track {
      margin: 5px 0 !important;
      background-color: #eaeaea;
      background-clip: padding-box;
      border-radius: 10px;
      border: 3px solid white;
    }

    &::-webkit-scrollbar {
      background-color: white;
      width: 10px;
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #979797;
      background-clip: padding-box;
      border-top:3px solid rgba(0,0,0,0);
      border-bottom:3px solid rgba(0,0,0,0);
      border-right: 3px solid white;
      border-left: 3px solid white;
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