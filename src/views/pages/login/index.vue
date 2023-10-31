<template>
  <div class="login-wrapper">
    <div class="bg-lighten w-8/15 blex h-full">
      <div class="w-full blex h-full">
        <img
            src="@/assets/images/logo/quantum-login-logo.png"
            alt=""
        />
      </div>
    </div>
    <div class="bg-white w-7/15 blex h-full">
      <div class="login-form">
        <div class="blex w-4/5">
          <div class="text-darken blex-left w-full mb-40">
            <div class="blex-left w-full text-2xl mb-8">로그인</div>
            <div>
              환영합니다. 로그인 후 서비스를 이용해주시기 바랍니다.
            </div>
          </div>

          <login-jwt></login-jwt>
          
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import LoginJwt from './components/LoginJWT.vue'
export default {
  name      : "index",
  components: {
    LoginJwt,
  },
}
</script>

<style
    scoped
    lang="scss"
>
.login-wrapper::v-deep {
  height: calc(var(--vh) * 100);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;

  .login-form {
    width: 35.417vw;
    height: 561px;
    box-sizing: border-box;
    border: 1px solid #F4F4F4;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.13), 0 0 6px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;z

    .login-button {
      background: #AE0E08;
      color: #ffffff;
      padding: 17px 0;
      border-radius: 4px;
      width: 100%;
      font-size: 18px;
    }

    .password-button {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      align-content: center;
      justify-content: center;
      justify-items: center;
      color: #979797;
      cursor: pointer;
      border-bottom: 1px solid #979797;
      font-size: 14px;
    }


  }
}
</style>
