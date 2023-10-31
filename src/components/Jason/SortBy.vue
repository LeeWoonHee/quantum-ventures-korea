<template>
  <div class="sort-by-wrapper" @click="onClick">
    <slot></slot>
    <div
        class="sort-by items"
        :class="localValue.order !== order ? 'items-stretch' : 'items-center'"
    >
      <div
          class="sort-by-up"
          v-show="localValue.order !== order || localValue.orderBy === 'asc'"
      ></div>
      <div
          class="sort-by-down"
          v-show="localValue.order !== order || localValue.orderBy === 'desc'"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortBy',
  props: {
    value: {
      type: Object,
      default: () => ({
        order: 'created_at',
        orderBy: 'desc'
      })
    },
    order: {
      type: String
    }
  },
  data: () => ({
    localValue: {
      order: 'created_at',
      orderBy: 'desc'
    }
  }),
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localValue = val
      }
    },
    localValue: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onClick () {
      if (this.localValue.order === this.order) {
        if (this.localValue.orderBy === 'desc') {
          this.localValue.orderBy = 'asc'
        } else {
          this.localValue.orderBy = 'desc'
        }
      } else {
        this.localValue.order = this.order
        this.localValue.orderBy = 'desc'
      }
    }
  }
}
</script>

<style
    scoped
    lang="scss"
>
.sort-by-wrapper::v-deep {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .sort-by {
    margin: 0 3px;
    height: 10px;
    width: 6px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    transition: all .2s linear;

    .sort-by-up {
      width: 6px;
      height: 4px;
      border-bottom: solid 4px #6C6C6C;
      border-left: solid 4px transparent;
      border-right: solid 4px transparent;
    }

    .sort-by-down {
      width: 6px;
      height: 4px;
      border-top: solid 4px #6C6C6C;
      border-left: solid 4px transparent;
      border-right: solid 4px transparent;
    }
  }
}
</style>
