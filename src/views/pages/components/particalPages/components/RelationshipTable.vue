<template>
  <div
      class="full-table"
  >
    <div
        class="unit"
        :class="isVisible ? 'visible' : ''"
    >(단위 : $M)
    </div>
    <table
        class="r-table"
        ref="table"
        :style="isXScroll ? 'min-width: 1600px;' : null"
    >


      <thead class="r-table-thead"
             :style="yData.length > 10 ? 'padding-right: 5px' : null"
      >
      <tr class="r-table-top-header-wrapper">
        <th class="r-table-top-header-margin-cell">&nbsp;</th>
        <th
            class="r-table-top-header"
            :colspan="xData.length"
        >
          {{ xAxis }}
        </th>
      </tr>

      <tr class="r-table-header-wrapper">
        <th class="r-table-header">
          {{ yAxis }}
        </th>
        <th
            class="r-table-header"
            v-for="(header, index) in xData"
            :style="`width:${reactiveWidth}`"
        >
          <vs-tooltip :text="typeof xAxisKey === 'string' ? header[xAxisKey] : xAxisKey(header, index)">
            {{ typeof xAxisKey === 'string' ? header[ xAxisKey ] : xAxisKey( header, index ) }}
          </vs-tooltip>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(row, index) in yData"
          CLASS="r-table-row"
      >
        <td
            class="r-table-row-margin-cell"
        >
          <vs-tooltip :text="typeof yAxisKey === 'string' ? row[yAxisKey] : yAxisKey(row, index)">
            {{ typeof yAxisKey === 'string' ? row[ yAxisKey ] : yAxisKey( row, index ) }}
          </vs-tooltip>
        </td>
        <td
            class="r-table-cell"
            v-for="(cell, rowIndex) in xData"
            :style="`width:${reactiveWidth}`"
        >
          {{ findCell( cell.id, row.id ) }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'RelationshipTable',
  props: {
    xAxis: {
      type: String
    },
    xAxisKey: {
      type: [ String, Function ],
      default: 'name'
    },
    yAxis: {
      type: String
    },
    yAxisKey: {
      type: [ String, Function ],
      default: 'name'
    },
    xData: {
      type: Array,
      default: () => ( [] )
    },
    yData: {
      type: Array,
      default: () => ( [] )
    },
    matrix: {
      type: Array,
      default: () => ( [] )
    },
    dataLabel: {
      type: String
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    noneData: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    xData: {
      deep:true,
      immediate: true,
      handler( val ) {
        this.reactiveWidth = `${ 90 / val.length }%`
        val.length > 10 ? this.isXScroll = true : this.isXScroll = false
      }
    },
  },
  data: () => ( {
    reactiveWidth: '9%',
    isXScroll: false,
  } ),
  methods: {
    findCell( xKey, yKey ) {
      return ( this.matrix.find( ( tuple ) => {
        return tuple.left_id === yKey && tuple.top_id === xKey
      } ) || {} )[ this.dataLabel ] || '-'
    },
  },
}
</script>

<style
    scoped
    lang="scss"
>
.full-table::v-deep {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height:7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(47, 53, 66, 0.5);
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    box-shadow: inset 0 0 3px white;
  }
  .unit {
    font-size: 10px;
    font-weight: 500;
    color: #979797;
    position: absolute;
    right: 0;
    top: -5px;
    visibility: hidden;
  }

  .visible {
    visibility: visible;
  }

  .r-table {
    padding-top: 13px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;

.r-table-thead{
  width:100%;
  .r-table-top-header-wrapper {
    width: 100%;
    height: 35px;
    border-top: 1px solid #6c6c6c;
    border-bottom: 1px solid #eaeaea;
    background: #f2f3f9;
    font-size: 10px;
    display: flex;
    box-sizing: border-box;
    align-items: stretch;

    .r-table-top-header-margin-cell {
      width: 10%;
      box-sizing: border-box;
      border-right: 1px solid #cacaca;
      display: flex;
      justify-content: center;
      align-items: center;

    }

    .r-table-top-header {
      width: 90%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: 500;
      height: 35px;
      text-align:center;
    }
  }

}

    .r-table-header-wrapper {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      box-sizing: border-box;
      justify-content: center;
      align-items: stretch;
      position: relative;
      height: 40px;
      border-bottom: 1px solid #cacaca;



        .r-table-header {
          display: block;
          line-height: 40px;
          text-align: center;
          font-size: 10px;
          background: #F8F9FF;
          height: 40px;
          padding: 0 10px;
          border-bottom: 1px solid #cacaca;
          font-weight:400;
          &:first-child{
            width:10% !important;
            border-right: 1px solid #cacaca;
            background-color:#f2f3f9;
          }

          .con-vs-tooltip {
            width: 100%;
            overflow: hidden !important;
            white-space: nowrap !important;
            text-overflow: ellipsis !important;
            word-break: break-all !important;
          }
      }
    }

    tbody{
      width:100%;
      overflow: auto;
      max-height:400px;
      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(47, 53, 66, 0.5);
        border-radius: 10px;
        background-clip: padding-box;
        border: 1px solid transparent;
      }

      &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        box-shadow: inset 0 0 3px white;
      }

      .r-table-row{
        width:100%;
        display:flex;
        flex-wrap:nowrap;
        .r-table-row-margin-cell {
          width: 10%;
          font-size: 8px;
          height: 40px;
          background: #f8f9ff;
          line-height: 40px;
          box-sizing: border-box;
          border-right: 1px solid #cacaca;
          padding: 0 10px;
          text-align: center;
          .con-vs-tooltip {
            width: 100%;
            overflow: hidden !important;
            white-space: nowrap !important;
            text-overflow: ellipsis !important;
            word-break: break-all !important;
          }
        }
        .r-table-cell{
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 8px;
          height: 40px;
          border-bottom: 1px solid #EAEAEA;
          padding: 0 10px;
          text-align: center;
          width:9%;
        }
      }
    }

  }
}
</style>
