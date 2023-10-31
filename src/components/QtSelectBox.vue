<template>
  <div class="select-box">
    <select
        v-model="selectValue"
        :class="small ? selectValue ==='' ? 'small-select py-0' : 'small-selected py-0 border-primary text-primary' : selectValue === '' ? 'select'  : 'selected border-primary text-primary' "
    >
      <option
          value=""
          disabled
          hidden
          selected
      >{{ title }}
      </option>
      <option
          v-for="(option, index) in options"
          :key="index"
          :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'QtSelectBox',
  watch: {
    value (val) {
      this.selectValue = val

    },
    selectValue (val) {
      this.$emit('checkSelectValue', val)
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: null
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    selectValue: ''
  }),
  mounted () {
    // this.small === true && this.selectValue === '' ? this.selectValue = 'TOP 10' : this.selectValue = ''
  }
}
</script>

<style
    scoped
    lang="scss"
>
.select-box::v-deep {
  .select {
    background-image: url(~@/assets/images/icon/select-icon.svg);
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 50%;
    border: 1px solid #cacaca;
    width: 100%;
    height: 100%;
    margin-bottom: 7px;
    padding: 14px 10px;
    font-size: 12px;
    color: #979797;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .selected {
    background-image: url(~@/assets/images/icon/select-primary-icon.svg);
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 50%;
    border: 1px solid #cacaca;
    width: 100%;
    height: 100%;
    margin-bottom: 7px;
    padding: 14px 10px;
    font-size: 12px;
    color: #979797;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .small-select {
    background-image: url(~@/assets/images/icon/select-icon.svg);
    //background-image: url(~@/assets/images/icon/select-primary-icon.svg);
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 50%;
    border: 1px solid #cacaca;
    width: 100%;
    height: 100%;
    margin-bottom: 7px;
    padding: 14px 10px;
    font-size: 12px;
    color: #979797;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .small-selected {
    background-image: url(~@/assets/images/icon/select-primary-icon.svg);
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 50%;
    border: 1px solid #cacaca;
    width: 100%;
    height: 100%;
    margin-bottom: 7px;
    padding: 14px 10px;
    font-size: 12px;
    color: #979797;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
}

</style>
