<template>
    <div class="password-reset-wrapper">
        <div class="bg-lighten w-full blex h-full">
            <div class="password-reset-form">
                <div class="blex w-4/5">
                    <div class="text-darken blex-left w-full mb-40">
                        <div class="blex-left w-full text-2xl mb-8">비밀번호 재설정</div>

                        <div>
                            새로운 비밀번호를 입력해주세요
                        </div>
                    </div>

                    <!--                    password finder form-->

                    <quantum-input
                        mb="mb-38"
                        borderRadius="4px"
                        inputTitle="새 비밀번호"
                        placeholder="새로운 비밀번호를 입력해주세요."
                    />


                    <!--                    password finder button-->
                    <div class="blex w-full mb-22">
                        <div class="w-full">
                            <button
                                class="password-link-button"
                                type="button"
                            >
                                설정 완료
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import QuantumInput from "@/js/components/QtInput.vue";
export default {
    name: "passwordReset",
    components: {
        QuantumInput
    },
}
</script>

<style scoped lang="scss">
.password-reset-wrapper::v-deep {
    height:calc(var(--vh) * 100);
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    .password-reset-form {
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
        background:#fff;

        .password-link-button{
            background:#AE0E08;
            color:#ffffff;
            padding: 17px 0;
            border-radius: 4px;
            width:100%;
            font-size:18px;
        }
    }
}
</style>
