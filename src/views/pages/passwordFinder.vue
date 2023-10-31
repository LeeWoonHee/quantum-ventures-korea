<template>
  <div class="password-finder-wrapper">
    <div class="bg-lighten w-full blex h-full">
      <div class="password-finder-form">
        <div class="blex w-4/5">
          <div class="text-darken blex-left w-full mb-40">
            <div class="blex-left w-full text-2xl mb-8">비밀번호 찾기</div>

            <div>
              가입시 등록한 이메일로 비밀번호를 찾아보세요
            </div>
          </div>

          <!--                    password finder form-->
          <vs-input
              v-validate="'required|email|min:3'"
              data-vv-validate-on="blur"
              name="email"
              label="이메일"
              placeholder="가입시 등록한 입력해 주세요"
              v-model="email"
              class="w-full"/>
          <span class="w-full blex-left text-danger text-sm">{{ errors.first('email') }}</span>

          <!--                    password finder button-->
          <div class="blex w-full mb-22">
            <div class="w-full">
              <button
                  class="password-link-button"
                  type="button"
                  @click="send"
              >
                비밀번호 재설정 링크 발송
              </button>
              <router-link
                  tag="button"
                  to="/login"
                  class="password-link-button outline"
                  type="button"
              >
                로그인하러 가기
              </router-link>

            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import QuantumInput from "@/components/QtInput.vue";

export default {
  name      : "passwordFinder",
  components: {
    QuantumInput
  },
  data() {
    return {
      email: null,
    }
  },
}
</script>

<style scoped lang="scss">
.password-finder-wrapper::v-deep {
  height: calc(var(--vh) * 100);
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;

  .password-finder-form {
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
    justify-items: center;
    background: #fff;

    .password-link-button {
      background: #AE0E08;
      color: #ffffff;
      padding: 12px 0;
      border-radius: 4px;
      width: 100%;
      font-size: 16px;
      margin-top: 12px;

      &.outline {
        background: #fff;
        color: #AE0E08;
        border: 1px solid #AE0E08;
      }
    }

    .password-finder-button {
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
