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
      default: '400px'
    },
    chartData: {
      type: Array,
      default: () => []
    },
    mainColor: {
      type: String,
      default: '#FFFFFF'
    },
    textColor: {
      type: String,
      default: '#FFFFFF'
    },
    color: {
      type: Array
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
      this.chart = echarts.init(this.$el, 'macarons') //'macarons'
      this.setOption(this.chartData)
    },
    setOption(source) {
      this.chart.setOption({
        legend: {
          itemWidth: 9,
          itemHeight: 9,
          data: ['NPP_DataSet']
        },
        grid: { left: 20, right: 10, bottom: 20, containLabel: true },

        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },

          splitLine: {
            show: false
          }
        },
        yAxis: {
          name: '%',

          axisTick: {
            show: false
          },
          axisLabel: {}
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 1000
          },
          {
            start: 0,
            end: 20,
            handleSize: '100%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            name: 'NPP_DataSet',
            type: 'scatter',
            itemStyle: {
              color: '#3E9FFF'
            },
            symbolSize: 12,
            data: [
              ['2020/10/1', 9.04],
              ['2020/10/2', 6.95],
              ['2020/10/3', 7.58],
              ['2020/10/4', 9.81],
              ['2020/10/5', 8.33],
              ['2020/10/6', 9.96],
              ['2020/10/7', 0.24],
              ['2020/10/8', 4.26],
              ['2020/10/9', 10.84],
              ['2020/10/10', 4.82],
              ['2020/10/11', 5.68]
            ]
          }
          // {
          //   name: '2019溢价率',
          //   type: 'scatter',
          //   itemStyle: {
          //     color: '#F7B500'
          //   },
          //   symbolSize: 12,
          //   data: [
          //     ['2020/10/1', 9.04],
          //     ['2020/10/2', 8.95],
          //     ['2020/10/3', 7.58],
          //     ['2020/10/4', 8.81],
          //     ['2020/10/5', 9.33],
          //     ['2020/10/6', 9.96],
          //     ['2020/10/7', 7.24],
          //     ['2020/10/8', 4.26],
          //     ['2020/10/9', 10.84],
          //     ['2020/10/10', 4.82],
          //     ['2020/10/11', 5.68]
          //   ]
          // }
        ]
      })
    }
  }
}
</script>