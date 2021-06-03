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
      default: '800px'
    },
    chartData: {
      type: Object,
      default: () => {}
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
      var colors = ['rgb(84, 195, 96)', 'rgb(204, 204, 204)', 'rgb(255, 0, 0)']
      //console.log(999, this.chartData)
      var arr = []
      arr.push(this.chartData)
      var getdata = function getData() {
        // let data = {
        //   name: '根节点1',
        //   value: 0,
        //   children: []
        // }
        // for (let i = 1; i <= 5; i++) {
        //   let obj = {
        //     name: '节点' + i,
        //     value: i,
        //     children: []
        //   }
        //   for (let j = 1; j <= 5; j++) {
        //     let obj2 = {
        //       name: `节点1-${i}-${j}`,
        //       value: 1 + '-' + i + '-' + j
        //     }
        //     if (j % 2 == 1) {
        //       obj2.children = []
        //       for (let k = 1; k <= 3; k++) {
        //         let obj3 = {
        //           name: `节点1-${i}-${j}-${k}`,
        //           value: 1 + '-' + i + '-' + j + '-' + k
        //         }
        //         obj2.children.push(obj3)
        //       }
        //     }

        //     obj.children.push(obj2)
        //   }

        //   data.children.push(obj)
        // }
        //let arr = []
        // console.log(66666, 1)
        //  arr.push(this.chartData)

        arr = handle(arr, 0)
        //console.log(89, arr)
        return arr
      }

      var handle = function handleData(data, index, color = '#FFA12F') {
        //index标识第几层
        return data.map((item, index2) => {
          //计算出颜色
          console.log(999, item)
          if (item.isCheck == 1) {
            color = colors[1]
          } else if (item.whiteList) {
            if (item.whiteList.length != 0 || item.connectStatus) {
              color = colors[2]
            } else {
              color = colors[0]
            }
          } else {
            color = colors[0]
          }
          // 设置节点大小
          if (index === 0 || index === 1) {
            item.label = {
              // position: 'inside'
              //   rotate: 0,
              //   borderRadius: "50%",
            }
          }
          // 设置label大小
          item.symbolSize = 30
          // 设置线条颜色
          if (item.connectStatus) {
            item.lineStyle = { color: colors[2] }
          } else {
            item.lineStyle = { color: colors[0] }
          }

          if (item.children) {
            //   //存在子节点
            item.itemStyle = {
              borderColor: color,
              color: color
            }
            item.children = handle(item.children, index + 1, color)
          } else {
            //不存在
            item.itemStyle = {
              //color: 'transparent',
              borderColor: color,
              color: color
            }
          }
          return item
        })
      }

      this.chart.setOption({
        type: 'tree',
        //  backgroundColor: '#000',
        toolbox: {
          //工具栏
          show: true,
          iconStyle: {
            borderColor: '#000'
          },
          feature: {
            restore: {}
          }
        },
        tooltip: {
          //提示框
          trigger: 'item',
          triggerOn: 'mousemove',
          backgroundColor: 'rgba(1,70,86,1)',
          borderColor: 'rgba(0,246,255,1)',
          borderWidth: 0.5,
          textStyle: {
            fontSize: 10
          }
        },
        series: [
          {
            type: 'tree',
            hoverAnimation: true, //hover样式
            data: getdata(),
            top: 40,
            bottom: 40,
            left: 20,
            right: 20,
            layout: 'orthogonal',
            symbol: 'circle',
            orient: 'TB',
            symbolSize: 20,
            nodePadding: 20,
            animationDurationUpdate: 750,
            expandAndCollapse: true, //子树折叠和展开的交互，默认打开
            initialTreeDepth: 20,
            roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
            focusNodeAdjacency: true,
            itemStyle: {
              borderWidth: 1
            },
            label: {
              //标签样式
              color: '#000',
              fontSize: 10,
              fontFamily: 'SourceHanSansCN',
              position: 'outside',
              rotate: 0
            },
            lineStyle: {
              width: 1,
              curveness: 0.5
            }
          }
        ]
      })
    }
  }
}
</script>
