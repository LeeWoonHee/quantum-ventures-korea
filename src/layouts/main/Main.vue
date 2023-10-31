<template>
  <div
      id="wrapper"
      class="content-wrapper"
  >
    <router-view
        :key="$route.fullPath"
        @router-mounted="routerMounted"
    />
  </div>
</template>


<script>

export default {
  name: 'Main',
  data () {
    return {
      load: false,
      isRouterMounted: false
    }
  },
  mounted () {
    this.load = true
  },
  methods: {
    routerMounted () {
      if (this.load) {
        this.$emit('router-mounted')
      } else {
        this.isRouterMounted = true
      }
    }
  }
}

</script>
<style
    scoped
    lang="scss"
>
.content-wrapper::v-deep {
  height: calc(var(--vh) * 100 - 63px);
  margin: 4px 4px 0 4px;
}
</style>
