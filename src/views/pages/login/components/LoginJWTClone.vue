<template>
  <div class="w-full blex">
    <vs-input
        v-validate="'required|email|min:3'"
        data-vv-validate-on="blur"
        name="email"
        label="이메일"
        placeholder="이메일을 입력해 주세요"
        v-model="email"
        class="w-full"
    />
    <span class="w-full blex-left text-danger text-sm">{{ errors.first( 'email' ) }}</span>

    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:15'"
        type="password"
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해 주세요"
        v-model="password"
        class="w-full mt-6"
    />
    <span class="w-full blex-left text-danger text-sm">{{ errors.first( 'password' ) }}</span>

    <div class="flex flex-wrap justify-end mt-8 w-full">
      <vs-button
          color="primary"
          class="w-full py-10 my-10"
          :disabled="!validateForm"
          @click="loginJWT"
      >로그인
      </vs-button>
    </div>
  </div>
</template>

<script>
import authAxios from '../../../../modules/auth/authAxios'
import axios from '../../../../axios'
import store from '../../../../store/store'
import router from '../../../../router'

export default {
  data() {
    return {
      email: null,
      password: null,
      checkbox_remember_me: false
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {
    checkLogin() {
      // 로그인을 한적이 없으면 null로 나오고 , 한적이 있으면 token이 나온다.

      //로그인을 했으면 로그인 시도 됐다고 알려준다
      if( this.$store.state.auth.isUserLoggedIn() ) {
        this.$vs.notify( {
          title: '로그인 시도',
          text: '이미 로그인 되어 있습니다.',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
        return false
      }
      return true
    },
    loginJWT(){
      // this.checkLogin  로그인을 했으면 fase /  안했으면 true
      if(!this.checkLogin()){
        //로그인을 했을 때
        this.$router.push('/').catch(() => {})
      } else {
        //로그인을 안했을 때
        this.$vs.loading()

        // const payload = {
        //   email: this.email,
        //   password: this.password
        // }

        this.$vueAuth.login(this.email , this.password)
            .then(() => {
              this.$vs.notify({
                title: '성공',
                text: '로그인 되었습니다.',
                iconPack: 'feather',
                icon: 'icon-check',
                color: 'success',
                position: 'top-right'
              })
            })
            .catch(() => {
                this.$vs.notify({
                  title: '오류',
                  text: '아이디 또는 비밀번호가 일치하지 않습니다',
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger',
                  position: 'top-right'
                })
            })
            .finally(() => {
              this.$vs.loading.close()
            })
      }
    },
  },
  mounted() {

  }
}
</script>

