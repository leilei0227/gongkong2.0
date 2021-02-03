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
      default: '260px'
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
    chartData() {
      this.setOption()
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
      this.chart = echarts.init(this.$el, 'macarons') //''
      // this.chart = echarts.init(document.getElementById(this.id))
      this.setOption()
    },
    setOption() {
      this.chart.setOption({
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            center: ['50%', '70%'],
            detail: {
              //   formatter: '{value}℃ 舒适',
              //   color: '#222222'
              fontSize: 20,
              color: '#333'
            },
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 14,
                color: [
                  [0.5, '#2e95f7'],
                  [0.75, '#5abf39'],
                  [1, '#f6aa3f']
                ]
              },
              show: true
            },
            axisTick: {
              show: false,
              splitNumber: 4
            },
            axisLabel: {
              show: true,
              distance: 2
            },
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: 'auto'
              }
            },
            pointer: {
              show: true,
              length: '70%',
              width: '3'
            },
            itemStyle: {
              color: '#17324d'
            },
            radius: '100%',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            animation: true,
            data: [this.chartData]
          },
          {
            name: '小圆形',
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            tooltip: {
              show: false
            },
            center: ['50%', '70%'],
            radius: ['3%'],
            z: 20,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            animation: false,
            data: [
              {
                value: 0,
                name: '1',
                itemStyle: {
                  normal: {
                    color: 'red'
                  }
                }
              },
              {
                value: 100,
                name: '2',
                itemStyle: {
                  normal: {
                    color: '#17324d'
                  }
                }
              }
            ]
          }
        ]
      })
    }
  }
}
</script>