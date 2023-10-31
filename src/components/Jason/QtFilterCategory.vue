<template>
  <div class="qt-filter-category w-full">
    <!--  START Categories  -->
    <div
        class="blex-left w-full mb-5"
    >
      <div
          class="blex-left w-full mb-5 text-dark-gray"
      >
        <div
            class="category-tab"
            v-for="(item, index) in categories"
            :key="index"
        >
          <div
              class="category text-xs"
              @click="clickCategory(index)"
              :class="index === selectedCategoryIndex  ? 'active' : ''"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!--  END Categories  -->
    <!--  START Sub Categories  -->
    <div
        class="blex-left w-full"
    >
      <div
          class="blex-left w-full mb-11 border-t-1 border-b-1 border-light-gray text-gray py-5 text-2xs"
          v-if="selectedCategoryIndex !== null"
      >
        <div
            class="small-category-tab"
            v-for="(item, index) in categories[selectedCategoryIndex].subCategories"
            :key="index"
        >
          <div
              class="small-category"
              ref="smallCategory"
              @click="clickSubCategory(index)"
              :class="{'active cursor-pointer' : index === selectedSubCategoryIndex, 'cursor-not-allowed': selectedCategoryIndex === null, 'cursor-pointer': selectedCategoryIndex !== null && index !== selectedSubCategoryIndex}"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
          class="blex-left w-full mb-11 border-t-1 border-b-1 border-light-gray text-gray py-11 text-xs"
          v-else
      >
        <div
            class="small-category-tab"
            v-for="(item, index) in defaultSubCategories"
            :key="index"
        >
          <div class="small-category cursor-not-allowed">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!--  END Sub Categories  -->
    <!--  START Radio  -->
    <transition-group
        tag="div"
        name="list"
        class="radio-box" v-if="selectedCategoryIndex !== null && selectedSubCategoryIndex !== null">
      <div
          class="radio"
          v-for="(item,index) in categories[selectedCategoryIndex].subCategories[selectedSubCategoryIndex].radios"
          :key="`${selectedSubCategoryIndex}-${item.url}`"
      >
        <input
            class="radio-button"
            :id="`category-radio-${index}`"
            type="radio"
            v-model="localSelectedRadioIndex"
            :value="index"
        />
        <label class="cursor-pointer" :for="`category-radio-${index}`">{{ item.name }}</label>
      </div>
    </transition-group>
    <!--  END Radio  -->
  </div>
  <!--    -->
</template>

<script>
export default {
  name: 'QtFilterCategory',
  props: {
    selectedCategoryIndex: {
      type: Number,
      default: null
    },
    selectedSubCategoryIndex: {
      type: Number,
      default: null
    },
    selectedRadioIndex: {
      type: Number,
      default: null
    },
    categories: {
      type: Array,
      default: () => ([])
    },
    defaultSubCategories: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    localSelectedCategoryIndex: null,
    localSelectedSubCategoryIndex: null,
    localSelectedRadioIndex: null
  }),
  watch: {
    selectedCategoryIndex: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localSelectedCategoryIndex = val
      }
    },
    selectedSubCategoryIndex: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localSelectedSubCategoryIndex = val
      }
    },
    selectedRadioIndex: {
      deep: true,
      immediate: true,
      handler (val) {
        this.localSelectedRadioIndex = val
      }
    },
    localSelectedCategoryIndex: {
      deep: true,
      handler (val) {
        this.$emit('update:selectedCategoryIndex', val)
      }
    },
    localSelectedSubCategoryIndex: {
      deep: true,
      handler (val) {
        this.$emit('update:selectedSubCategoryIndex', val)
      }
    },
    localSelectedRadioIndex: {
      deep: true,
      handler (val) {
        this.$emit('update:selectedRadioIndex', val)
      }
    }
  },
  methods: {
    clickCategory (index) {
      this.localSelectedCategoryIndex = index
      if (this.localSelectedSubCategoryIndex === null) {
        this.localSelectedSubCategoryIndex = 0
      }
    },
    clickSubCategory (index) {
      if (this.localSelectedCategoryIndex !== null) {
        this.localSelectedSubCategoryIndex = index
        this.localSelectedRadioIndex = null
      }
    },
  }
}
</script>

<style
    scoped
    lang="scss"
>
.qt-filter-category::v-deep {
  .category-tab {
    padding: 0 10px;
    position: relative;
    cursor: pointer;

    .category {
      transition: color .25s linear;

      &.active {
        color: #ae0e08;
      }
    }


    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }

    &::after {
      content: "";
      display: block;
      width: 1px;
      height: 60%;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      background: #cacaca;
    }
  }

  .small-category-tab {
    padding: 0 14px;
    position: relative;

    .small-category {
      transition: color .25s linear;

      &.active {
        color: #ae0e08;
      }
    }


    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }

    &::after {
      content: "";
      display: block;
      width: 1px;
      height: 60%;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      background: #cacaca;
    }
  }


  .radio-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    justify-items: flex-start;

    .list-move, /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
      transition: all .05s ease;
    }

    .list-leave-to {
      opacity: 0;
      position: absolute;
      transform: translateX(-100%);
    }

    .list-enter-from {
      opacity: 1;
      position: absolute;
      transform: translateX(100%);
    }

    /* ensure leaving items are taken out of layout flow so that moving
       animations can be calculated correctly. */
    .list-leave-active, .list-enter-active {
      position: absolute;
    }

    .radio {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      align-items: center;
      align-content: center;
      justify-content: flex-start;
      justify-items: flex-start;
      font-size: 8px;
      color: #979797;
      padding: 0 20px;
      position: relative;
      transition: all .25s linear;

      &:first-child {
        padding-left: 0;
      }


      .radio-button {
        width: 12px;
        height: 12px;
        margin-right: 4px;
        cursor: pointer;
        appearance: none;
        border: 1px solid #cacaca;
        border-radius: 50%;

        &:checked {
          border-color: #AE0E08;
          background-color: #AE0E08;
          background-image: url(~@/assets/images/icon/radioCheckIcon.png);
          background-repeat: no-repeat;
          background-position-x: 44%;
          background-position-y: center;
          background-size: 80%;

          & + label {
            font-weight: bolder;
          }
        }

        &:focus-visible {
          background-size: 80%;
          border-color: #AE0E08;
          background-color: #AE0E08;
          background-image: url(~@/assets/images/icon/radioCheckIcon.png);
          background-repeat: no-repeat;
          background-position-x: 44%;
          background-position-y: center;
        }
      }
    }
  }
}
</style>
