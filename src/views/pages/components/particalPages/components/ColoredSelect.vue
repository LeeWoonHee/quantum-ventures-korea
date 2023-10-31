<template>
  <select
      v-model="localValue"
      class="colored-select"
  >
    <option
        v-for="(option, index) in options"
        :key="index"
        :value="option[valueKey]"
        :selected="option[valueKey] === localValue"
    >
      {{ option[label] }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'ColoredSelect',
  props: {
    value: {
      type: [Object, String, Number]
    },
    options: {
      type: Array,
      default: () => ([])
    },
    label: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localValue = val
      }
    },
    localValue: {
      deep: true,
      handler (val) {
        this.$emit('input', val)
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
.colored-select::v-deep {
  border: 1px solid #AE0E08;
  box-shadow: 0 0 4px rgba(0, 0, 0, .25);
  color: rgba(174, 14, 8, 100);
  font-size: 11px;
  font-weight: 400;
  font-family: 'suit', sans-serif;
  transition: all .25s ease;

  option {
    padding: 8px 13px;
  }

  &:hover {
    box-shadow: 0 0 4px rgba(174, 14, 8, 1);
  }

  &:focus {
    color: #fff;
    background: #AE0E08;
  }
}

//~@/assets/images/icon/select-icon.svg
//~@/assets/images/icon/select-primary-icon.svg
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
