  
<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '280px'
    },
    color: {
      type: Array,
      default: () => ['#A4DFF6', '#EE6666', '#FAC858', '#91CC75', '#5470C6', '#059278', '#023967']
    },
    gridTop: {
      type: Number,
      default: 40
    },
    typeClass: {
      type: String,
      default: 'line'
    },
    showTitle: { type: Boolean, default: false },
    chartData: {
      type: Array,
      //  default:{}
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(source) {
        this.setOption(source)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      // this.series = this.lineChartDataLoader(Object.keys(this.chartData).length)
      this.setOption(this.chartData)
    },
    setOption(source) {
      this.chart.setOption({
        // textStyle: {
        //   color: '#FFFFFF',
        //   fontStyle: 'normal',
        //   fontFamily: '微软雅黑',
        //   fontSize: 10
        // },
        grid: { left: 10, right: 30, bottom: 8, top: 20, containLabel: true },
        // title: {
        //   show: this.showTitle,
        //   text: '总售气量走势（近半年）',
        //   left: 'center',
        //   top: '10%',
        //   textStyle: {
        //     color: '#FFFFFF',
        //     fontFamily: '微软雅黑',
        //     fontSize: 15
        //   }
        // },
        // tooltip: { trigger: 'axis' },
        dataset: { source },
        xAxis: {
          // axisTick: {
          //   show: false
          // },
          type: 'category'
          // boundaryGap: false,
          // axisLine: {
          //   lineStyle: {
          //     color: this.color[0],
          //     width: 2
          //   }
          // }
        },
        yAxis: {
          //name: '单位：万方'
          // axisTick: {
          //   show: false
          // }
          //type: 'value'
          // boundaryGap: false,
          // splitLine: { show: false },
          // axisLine: {
          //   lineStyle: {
          //     color: this.color[1],
          //     width: 2
          //   }
          // }
        },
        series: this.lineChartDataLoader(Object.keys(this.chartData[0]).length)
        // {
        //   type: this.typeClass,
        //   //  smooth: 0.6,
        //   symbol: 'circle' },
        // itemStyle: {
        //   normal: {
        //     color: this.color[2],
        //     borderColor: this.color[3],
        //     borderWidth: 1
        //   }
        // },
        // symbolSize: 4,
        // lineStyle: {
        //   color: this.color[4],
        //   width: 2
        // },
        // areaStyle: {
        //   color: {
        //     type: 'linear',
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 1,
        //     colorStops: [
        //       {
        //         offset: 0,
        //         color: this.color[5] //0% 处的颜色
        //       },
        //       {
        //         offset: 1,
        //         color: this.color[6] //100% 处的颜色
        //       }
        //     ],
        //     global: false // 缺省为 false
        //   }
        // }
        //data: this.chartData
      })
    },
    lineChartDataLoader(m) {
      let series = []
      let serie = []
      let colorArr = ['#A4DFF6', '#EE6666', '#FAC858', '#91CC75', '#5470C6', '#059278', '#023967']
      // console.log(Object.keys(this.chartData[0]).length)
      if (m) {
        for (let i = 0; i < m - 1; i++) {
          console.log(i)
          {
            var item = {
              //  name: legend[i],
              type: this.typeClass,
              //  symbol: 'circle',
              color: colorArr[i]
              // data: eval(data[i])
            }
            serie.push(item)
          }
        }
      }
      series = serie
      console.log(111111, series, serie)
      return serie
    }
  }
}
</script>