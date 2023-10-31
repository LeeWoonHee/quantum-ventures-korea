<template>
    <div
        class="blex w-full"
        :class="mb"
    >
        <div class="text-dark blex-left w-full text-xs mb-6">
            {{ inputTitle }}
        </div>
        <div class="w-full">
            <input
                class="input"
                :style="{'border-radius' : borderRadius}"
                type="text"
                :placeholder="placeholder"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "Input",
    props: {
        inputTitle: {
            type: String,
            default: '이메일'
        },
        borderRadius: {
            type: String,
            default: '0px'
        },
        placeholder: {
            type: String,
            default: '입력해주세요.'
        },
        mb: {
            type: String,
            default: 'mb-0'
        }
    },
    data:()=> ({
    })
}
</script>

<style
    scoped
    lang="scss"
>
.input {
    padding: 13px 19px;
    border: 1px solid #CACACA;
    width: 100%;

    &::placeholder {
        color: #CACACA;
    }
}
</style>
