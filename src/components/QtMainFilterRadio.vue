<template>
  <div class="radio-box">
    <div
        class="radio"
        v-for="(item,index) in options"
        :key="index"
    >
      <label class="flex flex-wrap justify-center items-center cursor-pointer text-2xs">
        <input
            class="radio-button"
            type="radio"
            v-model="localValue"
            :value="item[valueLabel]"
        />
        {{ item[label] }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuantumRadio',
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    label: {
      type: String,
      default: 'name'
    },
    valueLabel: {
      type: String,
      default: 'value'
    },
    value: {
      type: [Object, Number, String, Boolean],
      default: null
    }
  },
  watch: {
    localValue: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    },
    value: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localValue = val
      }
    }
  },
  data: () => ({
    localValue: null
  })
}
</script>

<style
    scoped
    lang="scss"
>
.radio-box::v-deep {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: center;
  align-content: center;
  justify-items: flex-start;
  justify-content: space-between;
  cursor: pointer;

  .radio {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    justify-items: flex-start;
    font-size: 14px;
    color: #6c6c6c;
    padding: 0 13px;
    position: relative;

    &::after {
      content: "";
      display: block;
      width: 1px;
      height: 14px;
      background: #eaeaea;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }


    .radio-button {
      width: 15px;
      height: 15px;
      margin-right: 4px;
      box-sizing: border-box;
      cursor: pointer;
      appearance: none;
      border: 1px solid #cacaca;
      border-radius: 50%;

      &:checked {
        border-color: #AE0E08;
        background-color: #AE0E08;
        background-image: url(~@/assets/images/icon/radioCheckIcon.png);
        background-size: 80%;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;

      }

      &:focus-visible {
        border-color: #AE0E08;
        background-color: #AE0E08;
        background-image: url(~@/assets/images/icon/radioCheckIcon.png);
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
      }
    }
  }
}
</style>
