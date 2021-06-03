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
    iconData: {
      type: String,
      default: 'circle'
    },
    height: {
      type: String,
      default: '280px'
    },
    chartData: {
      type: Array,
      default: () => []
    },
    chartLine: {
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
    },
    showTitle: { type: Boolean, default: false },
    gridTop: {
      type: Number,
      default: 40
    },
    gridLeft: {
      type: Number,
      default: 10
    },
    gridRight: {
      type: Number,
      default: 20
    },
    gridBottom: {
      type: Number,
      default: 10
    },
    labelRotate: {
      type: Number,
      default: 0
    },
    showY: {
      type: Boolean,
      default: false
    },
    yColor: {
      type: String,
      default: '#3488CD'
    },
    xColor: {
      type: String,
      default: '#007DC1'
    },
    showLine: {
      type: Boolean,
      default: true
    },
    labelMargin: {
      type: Number,
      default: 8
    },
    legendTop: {
      type: String,
      default: '2%'
    },
    iconHeight: {
      type: Number,
      default: 10
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
      this.chart.setOption({
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            // symbol: 'path://M19.300,3.300 L253.300,3.300 C262.136,3.300 269.300,10.463 269.300,19.300 L269.300,21.300 C269.300,30.137 262.136,37.300 253.300,37.300 L19.300,37.300 C10.463,37.300 3.300,30.137 3.300,21.300 L3.300,19.300 C3.300,10.463 10.463,3.300 19.300,3.300 Z',
            type: 'graph',
            layout: 'none',
            symbolSize: 100,
            roam: false,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: this.chartData,
            // data: [
            //   {
            //     name: 'CRM中心',
            //     //symbolSize: 70,
            //     symbol: 'circle',
            //     itemStyle: {
            //       normal: {
            //         borderWidth: 4,
            //         shadowBlur: 10,
            //         shadowColor: '#5C7AD4',
            //         color: '#5C7AD4'
            //       }
            //     },
            //     x: 300,
            //     y: 160
            //   },
            //   {
            //     name: '订单中心',
            //     symbolSize: 70,
            //     itemStyle: {
            //       normal: {
            //         borderWidth: 4,
            //         shadowBlur: 10,
            //         shadowColor: '#09bcb7',
            //         color: '#09bcb7'
            //       }
            //     },
            //     x: 400,
            //     y: 160
            //   },
            //   {
            //     name: '客户中心',
            //     symbolSize: 70,
            //     itemStyle: {
            //       normal: {
            //         borderWidth: 4,
            //         shadowBlur: 10,
            //         shadowColor: '#5C7AD4',
            //         color: '#5C7AD4'
            //       }
            //     },
            //     x: 500,
            //     y: 160
            //   },
            //   {
            //     name: '资源中心',
            //     symbolSize: 70,
            //     itemStyle: {
            //       normal: {
            //         borderWidth: 4,
            //         shadowBlur: 10,
            //         shadowColor: '#5C7AD4',
            //         color: '#5C7AD4'
            //       }
            //     },
            //     x: 600,
            //     y: 160
            //   },
            //   {
            //     name: '宽带中心',
            //     symbolSize: 70,
            //     itemStyle: {
            //       normal: {
            //         borderWidth: 4,
            //         shadowBlur: 10,
            //         shadowColor: '#5C7AD4',
            //         color: '#5C7AD4'
            //       }
            //     },
            //     x: 700,
            //     y: 160
            //   }
            // ],
            links: this.chartLine,
            // links: [
            //   {
            //     source: 'CRM中心',
            //     target: '订单中心'
            //   },
            //   {
            //     source: '订单中心',
            //     target: '客户中心'
            //   },
            //   {
            //     source: '客户中心',
            //     target: '资源中心'
            //   },
            //   {
            //     source: '资源中心',
            //     target: '宽带中心'
            //   }
            // ],
            lineStyle: {
              opacity: 0.6,
              width: 4,
              color: '#C8CFDF',
              curveness: 0
            }
          }
        ]
      })
    }
  }
}
</script>