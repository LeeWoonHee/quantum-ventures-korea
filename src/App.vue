<template>
  <div ref="app" id="app">
    <the-nav
        ref="nav"
        v-if="$route.name !== 'login'"
    />
    <router-view
        @router-mounted="load"/>
  </div>
</template>

<script>
import TheNav from '@/components/TheNav.vue'


export default {
  components: {
    TheNav
  },
  data: () => ({
    isNavLoaded: false
  }),
  methods: {
    load () {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      document.documentElement.style.setProperty('--vh-raw', `${vh}`)
    },
    handleWindowResize () {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
      document.documentElement.style.setProperty('--vh-raw', `${window.innerHeight * 0.01}`)
    }
  },
  async created () {
    const dir = this.$vs.rtl ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    window.addEventListener('resize', this.handleWindowResize)
  },
  mounted () {
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    document.documentElement.style.setProperty('--vh-raw', `${vh}`)
  },
  updated () {
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    document.documentElement.style.setProperty('--vh-raw', `${vh}`)
  }
}
</script>

<style lang="scss">
#app {
  background: #F3F3F3;
}
</style>
