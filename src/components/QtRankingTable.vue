<template>
    <div class="qt-ranking-table">
        <qt-select-box
            :small="true"
            class="select-box"
            :options="options"
            title="순위선택"
        />
        <ve-table
            class="table"
            :max-height="744"
            :fixed-header="true"
            style="width:100%"
            :virtual-scroll-option="{enabled:true}"
        />
    </div>
</template>

<script>
import QtSelectBox from "@/components/QtSelectBox.vue"

export default {
    name: "QtRankingTable",
    components: {
        QtSelectBox
    },
  data: () => ({
    options:['Top10' , 'Top20' , 'Top30' , 'Top40' , 'Top50'],
    columns:[]
  })
}
</script>

<style
    scoped
    lang="scss"
>
.qt-ranking-table::v-deep {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
    justify-items: flex-start;

    .table {
        margin-top: 14px;
        border-top: 1px solid #6c6c6c;
    }

    .select-box {
        width: 108px;
        height: 28px;
    }

    .ve-table-border-around {
        border-right: none;
        border-left: none;

        .ve-table-container {
            &::-webkit-scrollbar {
                background: #eaeaea;
                width: 4px;
                height: 4px;
            }

            &::-webkit-scrollbar-thumb {
                background: #979797;
            }
            .ve-table-header-tr{
                .ve-table-header-th {
                    background: #f2f3f9 !important;
                    &:first-child{
                        border-right: 1px solid #cacaca !important;
                    }
                }
            }


            .ve-table-body-tr {
                height: 70px !important;

                .ve-table-body-td {
                    background: rgba(0, 0, 0, 0) !important;
                    &:first-child{
                        border-right: 1px solid #cacaca !important;
                    }
                }
            }
        }
    }

}
</style>
