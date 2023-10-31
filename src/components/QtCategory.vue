<template>
    <div
        class="blex-left w-full mb-14"
    >
        <div
            class="blex-left w-full mb-11"
            :class="small ? 'border-t-1 border-b-1 border-light-gray text-gray py-11 text-xs' : 'text-dark-gray'"
        >
            <div
                v-if="!small"
                class="category-tab"
                v-for="(item, index) in category"
                :key="index"
            >
                <div
                    class="category"
                    v-model="categoryValue"
                    @click="categoryValue = item , goCategoryValue(item)"
                    :value="item"
                    :class=" item === isActive  ? 'active' : '' "
                >
                    {{ item }}
                </div>

            </div>

            <div
                v-if="small"
                class="small-category-tab"
                v-for="(item, index) in smallCategory"
                :key="index"
            >
                <div
                    class="small-category"
                    ref="smallCategory"
                    v-model="smallCategoryValue"
                    @click="smallCategoryValue = item , goCategoryValue(item)"
                    :value="item"
                    :class=" item === isActive  ? 'active' : '' "
                >
                    {{ item }}
                </div>

            </div>

        </div>

    </div>

</template>

<script>
import QtTopFilterRadio from "@/components/QtTopFilterRadio.vue"

export default {
    name: "QuantumCategory",
    components: {
        QtTopFilterRadio
    },
    watch: {

        defaultActive( value ) {
            if( value !== '' ) {
                this.isActive = '날짜'
                this.smallCategoryValue = '날짜'
                for(let i =0 ; i< this.smallCategory.length ; i++){
                    this.$refs.smallCategory[i].style.pointerEvents = 'auto'
                    this.$refs.smallCategory[i].style.cursor = 'pointer'
                }
            }else{
                this.isActive = ''
                for(let i =0 ; i< this.smallCategory.length ; i++){
                    this.$refs.smallCategory[i].style.pointerEvents = 'none'
                    this.$refs.smallCategory[i].style.cursor = 'default'
                }
            }
        },
        reset( value ) {

                this.categoryValue = ''
                this.smallCategoryValue = ''
                this.isActive = ''
                this.resetSmallValue = null
                this.small ?
                    this.$emit( 'checkSmallCategory', '' )
                    : this.$emit( 'checkCategory', '' )
        },
    },
    props: {
        category: {
            type: Array,
            default: () => []
        },
        smallCategory: {
            type: Array,
            default: () => []
        },
        small: {
            type: Boolean,
            default: false
        },
        defaultActive: {
            type: String,
            default: null
        },
        reset: {
            type: Boolean,
            default: false
        },
    },
    data: () => ( {
        categoryValue: '',
        smallCategoryValue: '',
        isActive: '',
        resetSmallValue: null
    } ),
    methods: {
        goCategoryValue( value ) {
            this.small ?
                this.$emit( 'checkSmallCategory', value ) :
                this.$emit( 'checkCategory', value )
            this.isActive = value
            this.$emit('goReset' , false)
        },


    }
}
</script>

<style
    scoped
    lang="scss"
>
.category-tab::v-deep {
    padding: 0 14px;
    position: relative;
    cursor: pointer;

    .category {
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

.small-category-tab::v-deep {
    padding: 0 14px;
    position: relative;

    .small-category {
        pointer-events : none;
        cursor: default;

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
</style>
