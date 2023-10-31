<template>
  <div class="nav-bar">
    <div class="w-93 blex-left py-16">
      <router-link to="/" tag="a" @click.native="$router.go()">
        <img
            class="navbar-logo"
            src="@/assets/images/logo/quantumLogo2.png"
            alt=""
        />
      </router-link>
      <div @click="$vueAuth.logout" class="absolute right-0 pr-50 text-4xs text-dark cursor-pointer"
           v-if="$store.state.auth.isUserLoggedIn()">
        로그아웃
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNav',
  methods: {
    // logout () {
    //   this.$store.dispatch('auth/logout').then(() => {
    //     this.$router.push('/login')
    //   })
    // }
  }
}
</script>

<style scoped lang="scss">
.nav-bar {
  background-color: #FFFFFF;
  width: calc(100% - 8px);
  margin: 0 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.13);
  height: 55px;

  .navbar-logo {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    justify-items: flex-start;
    width: 97px;
    height: 28px;
  }
}
</style>
