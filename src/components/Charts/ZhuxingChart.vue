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
    // zhuxingData: {
    //   type: Array,
    //   default: () => []
    // },
    height: {
      type: String,
      default: '280px'
    },
    chartData: {
      type: Array,
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
      this.chart = echarts.init(this.$el) //'macarons'
      this.setOption(this.chartData)
    },
    setOption(source) {
      var data = this.chartData
      this.chart.setOption({
        //  backgroundColor: '#000E1B',
        //百分比

        //backgroundColor: '#0e202d',
        tooltip: {
          trigger: 'none'
        },
        xAxis: {
          data: ['百分比'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#e54035'
            }
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [
          {
            name: '最上层立体圆',
            type: 'pictorialBar',
            symbolSize: [100, 15],
            symbolOffset: [0, -10],
            z: 12,
            itemStyle: {
              normal: {
                color: '#36405E',
                opacity: 0.5
              }
            },
            data: [
              {
                value: 100,
                symbolPosition: 'end'
              }
            ]
          },
          {
            name: '中间立体圆',
            type: 'pictorialBar',
            symbolSize: [100, 15],
            symbolOffset: [0, -10],
            z: 12,
            itemStyle: {
              normal: {
                color: '#36405E',
                opacity: 0.5
              }
            },
            data: [
              {
                value: data,
                symbolPosition: 'end'
              }
            ]
          },
          {
            name: '最底部立体圆',
            type: 'pictorialBar',
            symbolSize: [100, 15],
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              normal: {
                color: '#01CC04'
              }
            },
            data: [100 - data]
          },
          {
            //底部立体柱
            stack: '1',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#01CC04',
                opacity: 0.5
              }
            },
            label: {
              show: true,
              position: 'bottom',
              distance: 25,
              color: '#000',
              fontSize: 20,
              formatter: '{c}' + '%'
            },

            silent: true,
            barWidth: 100,
            barGap: '-100%', // Make series be overlap
            data: [data]
          },
          {
            //上部立体柱
            stack: '1',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#36405E',
                opacity: 0.3
              }
            },
            silent: true,
            barWidth: 100,
            barGap: '-100%', // Make series be overlap
            data: [100 - data]
          }
        ]
      })
    }
  }
}
</script>