<template>
  <div class="twc mt-10">
    <div class="twc-table-wrapper">
      <div class="twc-table-top-wrapper">
        <slot name="table-top"></slot>
      </div>
      <div
          class="twc-table-scroll"
          :style="tableData.length > 10 ? 'overflow-y: auto;' : 'overflow-y: hidden;'"
      >
        <table class="twc-table">
          <tr class="twc-table-headers">
            <th class="twc-table-header">
              순서
            </th>
            <th class="twc-table-header">
              {{ xAxis }}
            </th>
            <th class="twc-table-header">
              {{ yAxis }}
            </th>
          </tr>
          <tr
              class="twc-table-row"
              v-for="(row, index) in tableData"
          >
            <td class="twc-table-cell">
              {{ index + 1 }}
            </td>
            <td class="twc-table-cell">
              {{ typeof xAxisKey === 'string' ? row[ xAxisKey ] : xAxisKey( row, index ) }}
            </td>
            <td class="twc-table-cell">
              {{ ( typeof yAxisKey === 'string' ? row[ yAxisKey ] : yAxisKey( row, index ) ) || '-' }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="twc-chart-wrapper">
      <div class="twc-chart-top-wrapper">
        <slot name="chart-top"></slot>
      </div>
      <div style="height: 446px;">
        <apexchart
            class="blex border-1 border-gray"
            :options="chartOptions"
            :series="refinedCharData"
            ref="chart"
            height="100%"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableWithChart',
  props: {
    tableData: {
      type: Array,
      default: () => ( [] )
    },
    chartData: {
      type: Array,
      default: () => ( [] )
    },
    xAxis: {
      type: String,
      required: true
    },
    xAxisKey: {
      type: [ String, Function ],
      default: 'name'
    },
    yAxis: {
      type: String,
      required: true
    },
    yAxisKey: {
      type: [ String, Function ],
      default: 'value'
    },
    isPie: {
      type: Boolean,
      default: false
    },
    isHorizontal: {
      type: Boolean,
      default: false
    },
    tickPlacement: {
      type: Boolean,
      default: true
    }
  },
  data: () => ( {} ),
  computed: {
    refinedCharData() {
      if( this.isPie ) {

        return this.chartData.map( ( item, index ) => {
          return typeof this.yAxisKey === 'string' ? ( item[ this.yAxisKey ] || 0 ) : ( this.yAxisKey( item, index ) || 0 )
        } )

      } else {

        return [
          {
            name: this.yAxis,
            data: this.chartData.map( ( item, index ) => ( {
              x: typeof this.xAxisKey === 'string' ? ( item[ this.xAxisKey ] || 0 ) : ( this.xAxisKey( item, index ) || 0 ),
              y: typeof this.yAxisKey === 'string' ? ( item[ this.yAxisKey ] || 0 ) : ( this.yAxisKey( item, index ) || 0 )
            } ) )
          }
        ]
      }
    },
    chartOptions() {
      return {
        ...( this.isPie ? {
          labels: this.chartData.map( ( item, index ) => {
            return typeof this.xAxisKey === 'string' ? item[ this.xAxisKey ] : this.xAxisKey( item, index )
          } )
        } : {} ),
        colors:
            this.isPie ?
                [
                  '#df9f9f',
                  '#ecc0c0',
                  '#e5b6a7',
                  '#e4a286',
                  '#fdc59b',
                  '#e1ae66',
                  '#ead28d',
                  '#f4d190',
                  '#def0a9',
                  '#8dc68d',
                  '#61aeaa',
                  '#8dc9b3',
                  '#91b6dd',
                  '#bad0e4',
                  '#acb9e7',
                  '#bac6e4',
                  '#a0adda',
                  '#8490bd',
                  '#505288',
                  '#767895'
                ] : [],
        chart: {
          type: this.isPie ? 'donut' : 'bar',
          toolbar: {
            show: false
          },
        },
        dataLabels: {
          style: {
            fontSize: this.isPie ? '15px' : '9px',
          }
        },
        xaxis: {
          tickPlacement: this.tickPlacement,
          title: {
            text: this.isHorizontal ? this.yAxis : this.xAxis,
            style: {
              fontSize: '10px',
              fontWeight: 400,
              fontFamily: 'suit',
              color: '#000'
            }
          },
          position: 'bottom',
          type: 'string',
          labels: {
            style: {
              fontSize: '8px',
              fontWeight: 400,
              fontFamily: 'suit',
              color: '#000'
            }
          }

        },
        yaxis: {
          labels: {
            style: {
              fontSize: '8px',
              fontWeight: 400,
              fontFamily: 'suit',
              color: '#000'
            },
            offsetX: 10
          }
        },
        plotOptions: {
          bar: {
            distributed: true,
            horizontal: this.isHorizontal
          },
          pie: {
            donut: {
              size: '60%',
              labels: {
                show: true,
                total: {
                  show: true,
                  fontSize: '20px',
                  fontFamily: 'suit',
                  fontWeight: 400,
                  color: '#000',
                  formatter: () => {
                    return this.xAxis
                  },
                  showAlways: true,
                  label: this.yAxis

                }
              }
            }
          }
        },
        legend: {
          show: this.isPie ? true : false,
          position: 'left',
        },
        title: {
          text: this.isPie ? '' : this.isHorizontal ? this.xAxis : this.yAxis,
          style: {
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: 'suit',
            color: '#000'
          }
        },
        stroke: {
          show: true,
          color: 'red'
        }
      }
    }
  }
}
</script>

<style
    scoped
    lang="scss"
>
.twc::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: calc(var(--vh) * 100 - 220px);

  .twc-table-wrapper {
    width: 32%;
    max-height: 100%;

    .twc-table-top-wrapper {
      height: 33px;
    }

    .twc-table-scroll {
      overflow-y: auto;
      max-height: 446px;

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

      .twc-table {
        width: 100%;
        max-height: 100%;
        overflow: auto;
        position: relative;

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

        .twc-table-headers {

          background: #f2f3f9;
          border-top: 1px solid #6c6c6c;
          border-bottom: 1px solid #cacaca;
          display: flex;
          position: sticky;
          top: 0;
          flex-wrap: wrap;
          width: 100%;

          .twc-table-header {
            height: 36px;
            width: 42.5%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            font-size: 11px !important;
            font-weight: 500;

            &:nth-child(1) {
              width: 15%;
              border-right: 1px solid #cacaca;
              font-weight: 400;
            }

            &:nth-child(2) {
              border-right: 1px solid #eaeaea;
            }
          }
        }

        .twc-table-row {
          display: flex;
          flex-wrap: wrap;
          border-bottom: 1px solid #eaeaea;

          .twc-table-cell {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 42.5%;
            height: 40px;
            font-size: 9px;
            padding: 0 10px;
            text-align: center;

            &:nth-child(1) {
              width: 15%;
              border-right: 1px solid #cacaca;


            }

            &:nth-child(2) {
              border-right: 1px solid #eaeaea;

            }
          }
        }
      }
    }
  }

  .twc-chart-wrapper {

    width: 64%;

    .twc-chart-top-wrapper {
      height: 33px;
    }

    .apexcharts-legend {
      left: 3% !important;
      top: 25px !important;
      width: 28%;

      .apexcharts-legend-series {
        margin: 0 !important;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;

        .apexcharts-legend-text {
          font-size: 10px !important;
        }
      }

      .apexcharts-legend-marker {
        border-radius: 0 !important;
        width: 26px !important;
        height: 14px !important;
        margin-right: 20px !important;

      }
    }
  }
}
</style>
