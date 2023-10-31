<template>
    <div class="radio-box">
        <div
            class="radio"
            v-for="(item,index) in radio"
            :key="index"
        >
            <input
                class="radio-button"
                type="radio"
                v-model="radioValue"
                @click=" changeRadioValue(item)"
                :value="item"
            />
            {{ item }}
        </div>
    </div>
</template>

<script>
export default {
    name: "QtTopFilterRadio",
    watch: {
        radioValue(value) {
            this.radioValue = value
        },
        resetValue(value) {
            this.radioValue=value
        },
    },
    props: {
        radio: {
            type: Array,
            default: () => []
        },
        resetValue: {
            type: String,
            default: null
        }
    },
    data: () => ( {
        radioValue: '',
    } ),
    methods: {
        radioClick() {
            this.$emit( 'radioClick', this.radioValue )
        },
        changeRadioValue( value ) {
          this.$emit('goRadioValue', value)
        }
    },
}
</script>

<style
    scoped
    lang="scss"
>
.radio-box::v-deep {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    justify-items: flex-start;


    .radio {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
        justify-items: flex-start;
        font-size: 12px;
        color: #979797;
        padding: 0 20px;
        position: relative;

        &:first-child {
            padding-left: 0;
        }


        .radio-button {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            cursor: pointer;
            appearance: none;
            border: 1px solid #cacaca;
            border-radius: 50%;

            &:checked {
                border-color: #AE0E08;
                background-color: #AE0E08;
                background-image: url(~@/assets/images/icon/radioCheckIcon.png);
                background-repeat: no-repeat;
                background-position-x: 45%;
                background-position-y: center;

            }

            &:focus-visible {
                border-color: #AE0E08;
                background-color: #AE0E08;
                background-image: url(~@/assets/images/icon/radioCheckIcon.png);
                background-repeat: no-repeat;
                background-position-x: 45%;
                background-position-y: center;
            }
        }
    }
}
</style>

