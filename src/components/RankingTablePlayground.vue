<template>
  <div class="qt-ranking-table">
    <qt-select-box
        :small="true"
        class="select-box"
        :options="options"
        title="순위선택"
        @checkSelectValue="checkSelectValue"
        :style="radioValue || smallCategory === '투자 단계' ? {'display' : 'none'} : {'display' : 'block'}"
    />
    <ve-table
        v-if="load"
        :columns="smallCategory === '산업' && radioValue === '투자단계' ? industryInvestmentFundingTypesColumns
                : smallCategory === '산업'  && radioValue === '투자자' ? industryInvestorColumns
                    : smallCategory === '투자 단계' && radioValue === '산업' ? investmentFundingTypesIndustryColumns
                        : smallCategory === '투자 단계' && radioValue === '투자자' ? investmentFundingTypesInvestorColumns
                            :smallCategory === '투자자' && radioValue === '산업' ? investorIndustryColumns
                                :smallCategory === '투자자' && radioValue === '투자단계' ? investorInvestmentFundingTypesColumns : columns"
        :key="tableKey"
        class="table"
        :table-data="tableData"
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
  name: "RankingTablePlayground",
  components: {
    QtSelectBox
  },
  watch: {
    radioValue : {
      immediate:true,
      handler(val){
        this.initColumnsData()
        // this.filterTableData()
      }
    },
    companies: {
      deep: true,
      immediate: true,
      handler( val ) {
        this.localCompanies = []
        this.localCompanies = val
      }
    },
    localCompanies: {
      immediate: true,
      handler(val) {
        this.filterTableData()
      }
    }
  },
  props: {
    smallCategory: {
      type: String,
      default: null
    },
    secondTableTitle: {
      type: String,
      default: null
    },
    thirdTableTitle: {
      type: String,
      default: null
    },
    radioValue: {
      type: String,
      default: null
    },
    companies: {
      type: Array,
      default: () => ([])
    },
    category: {
      type: String,
      default: null
    }
  },
  data: () => ( {
    localCompanies : [],
    load: false,
    tableKey: 0,
    options: [ 'TOP 10', 'TOP 20', 'TOP 30', 'TOP 40', 'TOP 50' ],
    tableLength: 10,
    industryInvestmentFundingTypesColumns: [
      {
        title: "",
        fixed: 'left',
        children: [
          {
            field: "industry",
            key: "z",
            title: "산업",
            width: '9%',
            align: "center",
          }
        ]
      },
      {
        title: "투자단계",
        children: []
      },

    ],
    industryInvestorColumns: [
      {
        title: "",
        fixed: 'left',
        children: [
          {
            field: "industry",
            key: "z",
            title: "산업",
            width: '9%',
            align: "center",
          }
        ]
      },
      {
        title: "투자자",
        children: []
      },

    ],
    investmentFundingTypesIndustryColumns: [
      {
        title: "",
        fixed: 'left',
        children: [
          {
            field: "investmentFundingTypes",
            key: "stage",
            title: "투자단계",
            width: '9%',
            align: "center",
          }
        ]
      },
      {
        title: "산업",
        children: []
      },

    ],
    investmentFundingTypesInvestorColumns: [
      {
        title: "",
        fixed: 'left',
        children: [
          {
            field: "investmentFundingTypes",
            key: "stage",
            title: "투자단계",
            width: '9%',
            align: "center",
          }
        ]
      },
      {
        title: "투자자",
        children: []
      },

    ],
    investorIndustryColumns: [
      {
        title: "",
        fixed: 'left',
        children: [
          {
            field: "investors",
            key: "investors",
            title: "투자자",
            width: '9%',
            align: "center",
          }
        ]
      },
      {
        title: "산업",
        children: []
      },

    ],
    investorInvestmentFundingTypesColumns: [
      {
        title: "",
        fixed: 'left',
        children: [
          {
            field: "investors",
            key: "investors",
            title: "투자자",
            width: '9%',
            align: "center",
          }
        ]
      },
      {
        title: "투자단계",
        children: []
      },

    ],
    columns: [
      {
        field: "ranking",
        key: "index",
        title: "순서",
        width: '20%',
        align: "center",
      },
      {
        field: "secondColumn",
        width: '40%',
        key: "a",
        title: "",
        align: "center",
      },
      {
        field: "thirdColumn",
        key: "b",
        width: '40%',
        title: "",
        align: "center",
      },
    ],
    propsValue: "",
    tableData: [],
  } ),
  methods: {

    // 기존코드  (운희 코드)

    // checkSelectValue( value ) {
    //     this.selectValue = value
    //     this.selectValue === 'TOP 10' ? this.tableLength = 10
    //         : this.selectValue ==='TOP 20' ? this.tableLength = 20
    //             : this.selectValue ==='TOP 30' ? this.tableLength = 30
    //                 : this.selectValue ==='TOP 40' ? this.tableLength = 40
    //                     : this.selectValue ==='TOP 50' ? this.tableLength = 50 : this.tableLength = 10
    //
    //     if( this.selectValue === `TOP ${ this.tableLength }` ) {
    //         this.tableData = []
    //         for( let i = 0; i < this.tableLength; i++ ) {
    //             this.tableData.push( {
    //                 date: `${ this.data[ i ].date.slice( 0, 4 ) }.${ this.data[ i ].date.slice( 4, 6 ) }`,
    //                 ranking: i + 1,
    //                 investmentMoney: this.data[ i ].investmentMoney
    //             } )
    //         }
    //     }else {
    //         this.tableData = []
    //         for( let i = 0; i < 10; i++ ) {
    //             this.tableData.push( {
    //                 date: `${ this.data[ i ].date.slice( 0, 4 ) }.${ this.data[ i ].date.slice( 4, 6 ) }`,
    //                 ranking: i + 1,
    //                 investmentMoney: this.data[ i ].investmentMoney
    //             } )
    //         }
    //     }
    // },

    // top10 init data
    // initTableData() {
    //     if(this.smallCategory === '날짜'  ){
    //
    //     let date = []
    //     let dateChartData = []
    //
    //     //월별 합치기
    //     for( let i = 0; i < this.companies.length; i++ ) {
    //         const dateString = this.companies[i].date.toString()
    //         date.push( `${dateString.slice(0,4)}.${dateString.slice(4,6)}.${dateString.slice(6,8)}` )
    //     }
    //
    //     //중복 제거
    //     dateChartData = date.filter( ( item, index ) => {
    //         return date.indexOf( item ) === index
    //     } )
    //
    //     //테이블에 데이터 넣기
    // this.tableData = dateChartData.slice( 0, dateChartData.length ).map( ( item, index ) => {
    //     return {
    //         second: item,
    //         investmentMoney: this.companies.filter( ( item2, index2 ) => {
    //             const dateString = item2.date.toString()
    //             const date = `${dateString.slice(0, 4)}.${dateString.slice(4, 6)}.${dateString.slice(6,8)}`
    //             return date === item
    //         } ).reduce( ( acc, cur ) => {
    //             const checkInvest = this.category === '투자 금액' ? cur.invest_amount :  cur.invest_frequency
    //             return acc + parseInt( checkInvest )
    //         }, 0 )
    //     }
    // } ).sort( ( a, b ) => {
    //     return b.investmentMoney - a.investmentMoney
    // } ).slice(0,this.tableLength).map( ( item, index ) => {
    //     return {
    //        ranking: index + 1,
    //         second: item.second,
    //         investmentMoney: item.investmentMoney || '-'
    //     }
    // } )

    // }else if(this.smallCategory === '산업'){
    // let industry = []
    // let industryData =[]
    //
    // for( let i = 0; i < this.companies.length; i++ ) {
    //     for(let j =0 ; j < this.companies[i].industries.length; j++){
    //         industry.push(this.companies[i].industries[j].name)
    //     }
    // }
    // industryData = industry.filter( ( item, index ) => {
    //     return industry.indexOf( item ) === index
    // } )
    //
    //
    // this.tableData = industryData.slice(0, industryData.length).map((item, index) => {
    //     return {
    //         second: item,
    //         investmentMoney: this.companies
    //             .filter((item2, index2) => {
    //                 const company = item2.industries.map((item3) => {
    //                     return item3.name
    //                 })
    //                 return company.indexOf(item) !== -1
    //             })
    //             .reduce((acc, cur) => {
    //                 return acc + cur.industries
    //                     .filter((industry) => industry.name === item)
    //                     .reduce((total, industry) => {
    //                         const checkInvest = this.category === '투자 금액' ? industry.invest_amount :  industry.invest_frequency
    //                         return total + checkInvest
    //                     }, 0)
    //             }, 0),
    //     }
    // }).sort((a,b)=> {
    //    return b.investmentMoney - a.investmentMoney
    // }).slice(0,this.tableLength).map((item2,index2) => {
    //     return {
    //         ranking: index2 + 1,
    //         second: item2.second,
    //         investmentMoney: item2.investmentMoney
    //     }
    // })

    // } else if(this.smallCategory === '투자 단계'){
    //
    // const result = this.companies.map((item, index) => {
    //     const fundingTypeSum = item.invest_funding_type.reduce((acc, cur) => {
    //         if (acc.name === 'Seed') {
    //             const checkInvest= this.category === '투자 금액' ? acc.invest_amount :  acc.invest_frequency
    //             acc[acc.name] = checkInvest
    //         }
    //         const checkInvest= this.category === '투자 금액' ? cur.invest_amount :  cur.invest_frequency
    //             acc[cur.name] = checkInvest
    //         return acc
    //     }, )
    //     return fundingTypeSum
    // })
    // const total = this.investmentStage.reduce((item, index) => {
    //     const totalAmount = result
    //         .map(item2 => parseInt(item2[index] || 0))
    //         .reduce((sum, amount) => sum + amount, 0)
    //     item[index] = totalAmount.toFixed(1)
    //     return item
    //  }, {})
    //
    //   this.tableData  = this.investmentStage.slice(0, this.investmentStage.length).map( (item,index) => {
    //
    //     return{
    //         second : item,
    //         investmentMoney: total[this.investmentStage[index]]
    //     }
    // }).sort( ( a, b ) => {
    //         return b.investmentMoney - a.investmentMoney
    //     } ).map( ( item, index ) => {
    //
    //           return {
    //               ranking: index + 1,
    //               second : item.second,
    //               investmentMoney: item.investmentMoney
    //           }
    //       } )
    // } else if (this.smallCategory === '투자자') {
    //     let investor = []
    //     let investorData =[]
    //
    //     for( let i = 0; i < this.companies.length; i++ ) {
    //         for(let j =0 ; j < this.companies[i].investors.length; j++){
    //             investor.push(this.companies[i].investors[j].name)
    //         }
    //     }
    //
    //     investorData = investor.filter( ( item, index ) => {
    //       console.log(investor.indexOf( item ))
    //       console.log(index)
    //         return investor.indexOf( item ) === index
    //     } )
    //
    //
    //     this.tableData = investorData.slice(0, investorData.length).map((item, index) => {
    //         return {
    //             second: item,
    //             investmentMoney: this.companies
    //                 .filter((item2, index2) => {
    //                     const company = item2.investors.map((item3) => {
    //                         return item3.name
    //                     })
    //                     return company.indexOf(item) !== -1
    //                 })
    //                 .reduce((acc, cur) => {
    //                     return acc + cur.investors
    //                         .filter((investor) => investor.name === item)
    //                         .reduce((total, investor) => {
    //                             const checkInvest= this.category === '투자 금액' ? investor.invest_amount :  investor.invest_frequency
    //                             return total + checkInvest
    //                         }, 0)
    //                 }, 0),
    //         }
    //     }).sort((a,b)=> {
    //         return b.investmentMoney - a.investmentMoney
    //     }).slice(0,this.tableLength).map((item2,index2) => {
    //         return {
    //             ranking: index2 + 1,
    //             second: item2.second,
    //             investmentMoney: item2.investmentMoney
    //         }
    //     })
    //
    //     }



    // },
    // selectbox(TOP 순위) 값 변경시 적용되는 함수
    checkSelectValue( value ) {
      this.$emit( 'checkTableSelectValue', value )
      //     let date = []
      //     let dateChartData = []
      //     //월별 합치기
      //     for( let i = 0; i < this.companies.length; i++ ) {
      //         const dateString = this.companies[i].date.toString()
      //         date.push( `${dateString.slice(0,4)}.${dateString.slice(4,6)}.${dateString.slice(6,8)}` )
      //     }
      // //중복 제거
      //     dateChartData = date.filter( ( item, index ) => {
      //         return date.indexOf( item ) === index
      //     } )


      // this.tableLength = parseInt( value.split( ' ' )[ 1 ] )
      // this.tableData = dateChartData.slice( 0, dateChartData.length ).map( ( item, index ) => {
      //     return {
      //         second:item,
      //         investmentMoney:  this.companies.filter( ( item2, index2 ) => {
      //             const dateString = item2.date.toString()
      //             const date = `${dateString.slice(0, 4)}.${dateString.slice(4, 6)}.${dateString.slice(6,8)}`
      //             return date === item
      //         } ).reduce( ( acc, cur ) => {
      //             const checkInvest= this.category === '투자 금액' ? cur.invest_amount :  cur.invest_frequency
      //             return acc + parseInt( checkInvest )
      //         }, 0 )
      //     }
      // } ).sort( ( a, b ) => {
      //     return b.investmentMoney - a.investmentMoney
      // } ).slice(0,this.tableLength).map( ( item, index ) => {
      //     return {
      //         ranking: index + 1,
      //         second: item.second,
      //         investmentMoney: item.investmentMoney || '-'
      //     }
      // } )


      // if(this.smallCategory === '산업'){

      // let industry = []
      // let industryData =[]
      //
      // for( let i = 0; i < this.companies.length; i++ ) {
      //     for(let j =0 ; j < this.companies[i].industries.length; j++){
      //         industry.push(this.companies[i].industries[j].name)
      //     }
      // }
      // industryData = industry.filter( ( item, index ) => {
      //     return industry.indexOf( item ) === index
      // } )
      // this.tableLength = parseInt( value.split( ' ' )[ 1 ] )
      // this.tableData = industryData.slice(0, industryData.length).map((item, index) => {
      //     return {
      //         second: item,
      //         investmentMoney: this.companies
      //             .filter((item2, index2) => {
      //                 const company = item2.industries.map((item3) => {
      //                     return item3.name
      //                 })
      //               console.log(item)
      //                 return company.indexOf(item) !== -1
      //             })
      //             .reduce((acc, cur) => {
      //                 return acc + cur.industries
      //                     .filter((industry) => industry.name === item)
      //                     .reduce((total, industry) => {
      //                         const checkInvest= this.category === '투자 금액' ? industry.invest_amount :  industry.invest_frequency
      //                         return total + checkInvest
      //                     }, 0)
      //             }, 0),
      //     }
      // }).sort((a,b) => {
      //     return b.investmentMoney - a.investmentMoney
      // }).slice(0, this.tableLength).map((item2,index2) => {
      //     return {
      //         ranking: index2 + 1,
      //         second: item2.second,
      //         investmentMoney: item2.investmentMoney
      //     }
      // })
      // }else if (this.smallCategory === '투자자') {
      //     let investor = []
      //     let investorData =[]
      //
      //     for( let i = 0; i < this.companies.length; i++ ) {
      //         for(let j =0 ; j < this.companies[i].investors.length; j++){
      //             investor.push(this.companies[i].investors[j].name)
      //         }
      //     }
      //
      //     investorData = investor.filter( ( item, index ) => {
      //         return investor.indexOf( item ) === index
      //     } )
      //
      //     this.tableLength = parseInt( value.split( ' ' )[ 1 ] )
      //
      //     this.tableData = investorData.slice(0, investorData.length).map((item, index) => {
      //         return {
      //             second: item,
      //             investmentMoney: this.companies
      //                 .filter((item2, index2) => {
      //                     const company = item2.investors.map((item3) => {
      //                         return item3.name
      //                     })
      //                     return company.indexOf(item) !== -1
      //                 })
      //                 .reduce((acc, cur) => {
      //                     return acc + cur.investors
      //                         .filter((investor) => investor.name === item)
      //                         .reduce((total, investor) => {
      //                             const checkInvest= this.category === '투자 금액' ? investor.invest_amount :  investor.invest_frequency
      //                             return total + checkInvest
      //                         }, 0)
      //                 }, 0),
      //         }
      //     }).sort((a,b)=> {
      //         return b.investmentMoney - a.investmentMoney
      //     }).slice(0, this.tableLength).map((item2,index2) => {
      //         return {
      //             ranking: index2 + 1,
      //             second: item2.second,
      //             investmentMoney: item2.investmentMoney
      //         }
      //     })
      //
      // }


    },

    // 데이터가 들어오면 적용되는 함수

    filterTableData() {
      //====================
      //투자금액
      //====================
      if(this.category === '투자 금액'){

        if(this.smallCategory === '날짜') {
          if(this.radioValue === '연도별'){
            this.tableData =[]
            this.tableData = this.localCompanies.map((item,index) => {
              return {
                ranking : index +1,
                secondColumn : item.year,
                thirdColumn : item.sum
              }
            })
            this.load =true
          }else if(this.radioValue === '월별'){
            this.tableData = this.localCompanies.map((item,index) => {
              return {
                ranking : index +1,
                secondColumn : `${item.year}.${item.month}`,
                thirdColumn : item.sum
              }
            })
            this.load = true

          }else if(this.radioValue === '분기별'){
            this.tableData = this.localCompanies.map((item,index) => {
              return {
                ranking : index +1,
                secondColumn : `${item.year}.${item.quarter}Q`,
                thirdColumn : item.sum
              }
            })
            this.load =true
          }
        }else if(this.smallCategory === '산업'){
          if(this.radioValue === '투자단계'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.industryInvestmentFundingTypesColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftIndustry = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  industry: item2.name,
                }
              })
            })

            this.tableData = []
            leftIndustry.map(item => {
              return item.forEach((item2) => {
                const { industry, leftId } = item2
                const industryData = {
                  industry: industry,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    industryData[field] = match.sum
                  }else {
                    industryData[field] = '-'
                  }
                })
                this.tableData.push(industryData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }else if(this.radioValue === '투자자'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.industryInvestorColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftIndustry = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  industry: item2.name,
                }
              })
            })

            this.tableData = []
            leftIndustry.map(item => {
              return item.forEach((item2) => {
                const { industry, leftId } = item2
                const industryData = {
                  industry: industry,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    industryData[field] = match.sum
                  }else {
                    industryData[field] = '-'
                  }
                })
                this.tableData.push(industryData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }else {
            // radioValue === 분기별 탑20 산업 트렌드
          }

        }else if(this.smallCategory === '투자 단계'){
          if(this.radioValue === '산업'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.investmentFundingTypesIndustryColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftInvestmentFundingTypes = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  investmentFundingTypes: item2.name,
                }
              })
            })

            this.tableData = []
            leftInvestmentFundingTypes.map(item => {
              return item.forEach((item2) => {
                const { investmentFundingTypes, leftId } = item2
                const investmentFundingTypesData = {
                  investmentFundingTypes: investmentFundingTypes,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    investmentFundingTypesData[field] = match.sum
                  }else {
                    investmentFundingTypesData[field] = '-'
                  }
                })
                this.tableData.push(investmentFundingTypesData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }else {
            // radioValue === '투자자'
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.investmentFundingTypesInvestorColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftInvestmentFundingTypes = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  investmentFundingTypes: item2.name,
                }
              })
            })

            this.tableData = []
            leftInvestmentFundingTypes.map(item => {
              return item.forEach((item2) => {
                const { investmentFundingTypes, leftId } = item2
                const investmentFundingTypesData = {
                  investmentFundingTypes: investmentFundingTypes,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    investmentFundingTypesData[field] = match.sum
                  }else {
                    investmentFundingTypesData[field] = '-'
                  }
                })
                this.tableData.push(investmentFundingTypesData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }
        }else if(this.smallCategory === '투자자'){
          if(this.radioValue === '산업'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.investorIndustryColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftInvestors = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  investors: item2.name,
                }
              })
            })

            this.tableData = []
            leftInvestors.map(item => {
              return item.forEach((item2) => {
                const { investors, leftId } = item2
                const investorsData = {
                  investors: investors,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    investorsData[field] = match.sum
                  }else {
                    investorsData[field] = '-'
                  }
                })
                this.tableData.push(investorsData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }else {
            //radioValue === '투자단계
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.investorInvestmentFundingTypesColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftInvestors = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  investors: item2.name,
                }
              })
            })

            this.tableData = []
            leftInvestors.map(item => {
              return item.forEach((item2) => {
                const { investors, leftId } = item2
                const investorsData = {
                  investors: investors,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    investorsData[field] = match.sum
                  }else {
                    investorsData[field] = '-'
                  }
                })
                this.tableData.push(investorsData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }
        }
      }else if(this.category === '투자 빈도수'){
        if(this.smallCategory === '날짜') {
          if(this.radioValue === '연도별'){
            this.tableData = this.localCompanies.map((item,index) => {
              return {
                ranking : index +1,
                secondColumn : item.year,
                thirdColumn : item.count
              }
            })
            this.load =true
          }else if(this.radioValue === '월별'){
            this.tableData = this.localCompanies.map((item,index) => {
              return {
                ranking : index +1,
                secondColumn : `${item.year}.${item.month}`,
                thirdColumn : item.count
              }
            })
            this.load =true
          }else if(this.radioValue === '분기별'){
            this.tableData = this.localCompanies.map((item,index) => {
              return {
                ranking : index +1,
                secondColumn : `${item.year}.${item.quarter}Q`,
                thirdColumn : item.count
              }
            })
            this.load =true
          }
        }else if(this.smallCategory === '산업'){
          if(this.radioValue === '투자단계'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.industryInvestmentFundingTypesColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftIndustry = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  industry: item2.name,
                }
              })
            })

            this.tableData = []
            leftIndustry.map(item => {
              return item.forEach((item2) => {
                const { industry, leftId } = item2
                const industryData = {
                  industry: industry,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    industryData[field] = match.count
                  }else {
                    industryData[field] = '-'
                  }
                })
                this.tableData.push(industryData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }else if(this.radioValue === '투자자'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.industryInvestorColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftIndustry = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  industry: item2.name,
                }
              })
            })

            this.tableData = []
            leftIndustry.map(item => {
              return item.forEach((item2) => {
                const { industry, leftId } = item2
                const industryData = {
                  industry: industry,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    industryData[field] = match.count
                  }else {
                    industryData[field] = '-'
                  }
                })
                this.tableData.push(industryData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }
        }else if(this.smallCategory === '투자 단계'){
          if(this.radioValue === '산업'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.investmentFundingTypesIndustryColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftInvestmentFundingTypes = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  investmentFundingTypes: item2.name,
                }
              })
            })

            this.tableData = []
            leftInvestmentFundingTypes.map(item => {
              return item.forEach((item2) => {
                const { investmentFundingTypes, leftId } = item2
                const investmentFundingTypesData = {
                  investmentFundingTypes: investmentFundingTypes,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    investmentFundingTypesData[field] = match.count
                  }else {
                    investmentFundingTypesData[field] = '-'
                  }
                })
                this.tableData.push(investmentFundingTypesData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }else if(this.radioValue === '투자자'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.investmentFundingTypesInvestorColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftInvestmentFundingTypes = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  investmentFundingTypes: item2.name,
                }
              })
            })

            this.tableData = []
            leftInvestmentFundingTypes.map(item => {
              return item.forEach((item2) => {
                const { investmentFundingTypes, leftId } = item2
                const investmentFundingTypesData = {
                  investmentFundingTypes: investmentFundingTypes,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    investmentFundingTypesData[field] = match.count
                  }else {
                    investmentFundingTypesData[field] = '-'
                  }
                })
                this.tableData.push(investmentFundingTypesData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }
        }else if(this.smallCategory === '투자자'){
          if(this.radioValue === '산업'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.investorIndustryColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftInvestors = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  investors: item2.name,
                }
              })
            })

            this.tableData = []
            leftInvestors.map(item => {
              return item.forEach((item2) => {
                const { investors, leftId } = item2
                const investorsData = {
                  investors: investors,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    investorsData[field] = match.count
                  }else {
                    investorsData[field] = '-'
                  }
                })
                this.tableData.push(investorsData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }else if(this.radioValue === '투자단계'){
            //================================================================================================
            //상위 columns 생성
            //================================================================================================
            const columns = this.localCompanies.map((item,index)=> {
              return item.topColumns.map(item2 => {
                return{
                  topId: item2.id,
                  field: item2.name,
                  title: item2.name,
                  key: item2.name,
                  width: '10%',
                }
              })
            })
            this.investorInvestmentFundingTypesColumns[1].children = columns[0]


            //================================================================================================
            //왼쪽 열 생성
            //================================================================================================
            const leftInvestors = this.localCompanies.map(item => {
              return item.leftColumns.map(item2 => {
                return {
                  leftId: item2.id,
                  investors: item2.name,
                }
              })
            })

            this.tableData = []
            leftInvestors.map(item => {
              return item.forEach((item2) => {
                const { investors, leftId } = item2
                const investorsData = {
                  investors: investors,
                }
                columns[0].forEach((column) => {
                  const { field, topId } = column
                  const match = this.localCompanies[0].matrix.find((entry) => entry.left_id === leftId && entry.top_id === topId)
                  if (match) {
                    investorsData[field] = match.count
                  }else {
                    investorsData[field] = '-'
                  }
                })
                this.tableData.push(investorsData)
              })
            })

            //데이터 전체 로드 시 페이지 로드
            this.localCompanies.length > 0 && this.tableData ? this.load = true : this.load = false
          }
        }
      }

    },

    initColumnsData() {
      this.columns[ 1 ].title = this.secondTableTitle
      this.columns[ 2 ].title = this.thirdTableTitle


      if(this.radioValue === '연도별'){
        this.columns[ 1 ].title = '연도'
        this.tableKey++
      }else if(this.radioValue === '월별'){
        this.columns[ 1 ].title = '월'
        this.tableKey++
      } else if(this.radioValue === '분기별'){
        this.columns[ 1 ].title = '분기'
        this.tableKey++
      }else if(this.radioValue === ''){
        this.columns[ 1 ].title = '날짜'
        this.tableKey++
      }
    },
    // fetchCompanyData() {
    //   this.$axios.get('/api/v1/companies')
    //     .then((res) => {
    //       this.companies = res.data
    //       this.initTableData()
    //     })
    // },
  },

  created() {
    this.initColumnsData()
    // this.fetchCompanyData()
  },
  mounted() {
    //테이블에 데이터 입력
    // this.initTableData()

  }
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
