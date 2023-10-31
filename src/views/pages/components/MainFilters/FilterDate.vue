<template>
  <div class="w-full blex border-b-1 border-border-gray py-20 px-10">
    <div class="w-9/10 blex justify-between mb-13">
      <div class="text-xs text-semi-black font-bold">
        날짜
      </div>
      <div
          class="blex text-4xs text-dark-gray underline cursor-pointer"
          @click="reset"
      >
        초기화
      </div>
    </div>

    <!--연도별-->

    <filter-years
        :years.sync="localYears"
    />

    <!--월별-->

    <filter-months
        :months.sync="localMonths"
        :quarters="localQuarters"
        :years="localYears"
    />

    <!--분기별-->

    <filter-quarters
        :quarters.sync="localQuarters"
        :months="localMonths"
        :years="localYears"
    />

  </div>
</template>
<script>
import FilterYears from '@/views/pages/components/MainFilters/FilterYears.vue'
import FilterMonths from '@/views/pages/components/MainFilters/FilterMonths.vue'
import FilterQuarters from '@/views/pages/components/MainFilters/FilterQuarters.vue'

export default {
  name: 'FilterDate',
  components: {
    FilterQuarters,
    FilterMonths,
    FilterYears
  },
  props: {
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
      immediate: true,
      handler (val) {
        this.$emit('update:years', val)
      }
    },
    months: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localMonths = val
      }
    },
    localMonths: {
      deep: true,
      immediate: true,
      handler (val) {
        this.$emit('update:months', val)
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
      immediate: true,
      handler (val) {
        this.$emit('update:quarters', val)
      }
    }
  },
  data: () => ({
    localYears: [],
    localMonths: [],
    localQuarters: []
  }),
  methods: {
    reset () {
      this.localQuarters = []
      this.localMonths = []
      this.localYears = []
    }
  }
}
</script>
<style
    scoped
    lang="scss"
>

</style>
