<template>
    <div class="con-select-example">

        <vs-select
            multiple
            class="selectExample"
            label="Multiple"
            v-model="select2"
        >
            <div :key="index" v-for="item,index in options2">
                <vs-select-group :title="item.title" v-if="item.group">
                    <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in item.group"/>
                </vs-select-group>
            </div>
        </vs-select>

    </div>
</template>

<script>
export default {
    name: "VsSelectBox",
    data : () => ({

            select2:[6],

            options2:[
                {
                    title:'Figures',
                    group:[
                        {text: 'Romboid', value: 4},
                        {text: 'Trapeze', value: 5},
                        {text: 'Triangle', value: 6},
                        {text: 'Polygon', value: 7},
                    ]
                },
                {
                    title:'Colors',
                    group:[
                        {text: 'Red', value: 'red'},
                        {text: 'Green', value: 'green'},
                        {text: 'Blue', value: 'blue'},
                        {text: 'Purple', value: 'purple'},
                    ]
                }
            ],

    }),
}

</script>

<style scoped lang="scss">
.con-select-example{
    .con-select{
        .input-select-con{
          .vs-select--input{
              font-size:12px !important;
          }
        }
    }
}

</style>
