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
      default: '300px'
    },
    chartData: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: '#4FA1FD'
    },
    chartName: {
      type: String
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
      this.setOption(this.chartData)
    },
    setOption() {
      this.chart.setOption({
        // grid: {
        //   left: 45,
        //   right: 20,
        //   top: 35
        // },
        title: {
          text: '网络状况(bytes/sec)',
          textStyle: {
            align: 'center',
            color: '#000',
            fontSize: 16
          },
          top: 5,
          left: 'center'
        },
        tooltip: {},
        legend: {
          top: 15,
          name: '',
          right: 120,
          show: true,
          icon: 'circle',
          itemHeight: 15
        },
        dataset: {
          dimensions: ['time', 'downUsage', 'upUsage'],
          source: this.chartData
        },

        xAxis: {
          type: 'category',
          splitLine: { show: false },
          axisTick: {
            show: false
          },
          data: this.xAxisData,
          axisLabel: {
            color: '#797474',
            rotate: 60
          },
          axisLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgb(192, 196, 204)'
            }
          }
        },
        yAxis: {
          name: '速率(B)',
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgb(192, 196, 204)'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              // type: 'dashed',
              color: 'rgb(192, 196, 204)'
            }
          },
          axisLabel: {
            color: '#797474'
          }
        },

        series: [
          {
            name: '接收速率',
            // smooth: true,
            color: '#0075C2',
            type: 'line'
            // //type: 'line',
            // symbol: 'circle',
            // symbolSize: 8,
            // data: this.yAxisData2
          },
          {
            // name: this.chartName,
            // smooth: true,
            color: '#1AAF5D',
            name: '发送速率',
            type: 'line'
            //type: 'line',
            // symbol: 'circle',
            // symbolSize: 8,
            // data: this.yAxisData1
          }
        ]
      })
    }
  }
}
</script>
