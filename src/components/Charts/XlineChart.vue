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
      this.chart.setOption({
        //  backgroundColor: '#000E1B',

        tooltip: {
          show: false,
          formatter: '{b} <br> {c}%'
        },
        legend: {
          // icon: 'circle',
          // bottom: '43%',
          // left: '10%',
          // itemWidth: 7,
          // itemHeight: 7,
          // itemGap: 40,
          // textStyle: {
          //   color: '#89A7AF'
          // },
          // data: ''
        },
        xAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            //type: 'category',
            data: [''],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: 16,

            label: {
              normal: {
                borderWidth: 10,
                distance: 20,
                //   align: 'center',
                verticalAlign: 'middle',
                borderRadius: 1,
                borderColor: '#E8A61F',
                backgroundColor: '#E8A61F',
                show: true,
                position: 'top',
                formatter: '{c}%',
                color: '#000'
              }
            },
            itemStyle: {
              color: '#E8A61F'
            },
            data: [
              {
                value: 19,
                itemStyle: {
                  normal: {
                    color: {
                      type: 'bar',
                      colorStops: [
                        {
                          offset: 0.5,
                          color: '#62B58F' // 100% 处的颜色
                        },
                        {
                          offset: 0.5,
                          color: '#FFC533' // 0% 处的颜色
                        },
                        {
                          offset: 0.75,
                          color: '#FFC533' // 100% 处的颜色
                        },
                        {
                          offset: 0.75,
                          color: '#F2726F' // 100% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#F2726F' // 0% 处的颜色
                        }
                      ]
                      //  globalCoord: false // 缺省为 false
                    }
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