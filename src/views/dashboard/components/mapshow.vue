
<template>
  <div class="map-wrap">
    <div id="allmap" ref="allmap"></div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
export default {
  name: 'Map',
  props: {
    listdata: {
      type: Array
    },
    change: {
      type: Number,
      default: 0
    }
  },
  methods: {
    map() {
      let map = new window.BMap.Map(this.$refs.allmap) // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(104.403874, 37.014889), 5) // 初始化地图,设置中心点坐标和地图级别
      map.addControl(
        new window.BMap.MapTypeControl({
          // 添加地图类型控件
          mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP]
        })
      )
      map.addControl(new window.BMap.OverviewMapControl())
      map.addControl(new window.BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }))
      map.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

      // 创建点标记
      /*    var maker = new Array();
      for (var  i =0;i<this.listdata.length;i++){
          maker[i]=
      } */

      var point = new Array() //存放标注点经纬信息的数组
      var marker = new Array() //存放标注点对象的数组
      var info = new Array() //存放提示信息窗口对象的数组
      for (var i = 0; i < this.listdata.length; i++) {
        var p0 = this.listdata[i].lng //
        var p1 = this.listdata[i].lat //按照原数组的point格式将地图点坐标的经纬度分别提出来
        point[i] = new window.BMap.Point(p0, p1) //循环生成新的地图点
        marker[i] = new window.BMap.Marker(point[i]) //按照地图点坐标生成标记
        map.addOverlay(marker[i])
        // marker[i].setAnimation(BMAP_ANIMATION_BOUNCE) //跳动的动画

        var label = new window.BMap.Label(this.listdata[i].name, { offset: new BMap.Size(10, -25) })
        label.setStyle({
          display: 'none',
          color: 'red',
          fontSize: '12px',
          height: '20px',
          lineHeight: '20px',
          fontFamily: '微软雅黑'
        })
        marker[i].setLabel(label)

        marker[i].addEventListener('mouseover', function (e) {
          var label = this.getLabel()
          label.setStyle({ display: 'block' })
        })
        marker[i].addEventListener('mouseout', function (e) {
          var label = this.getLabel()
          label.setStyle({ display: 'none' })
        })

        map.addOverlay(marker[i])
        // var label = new window.BMap.Label(this.listdata[i].name, { offset: new window.BMap.Size(20, -10) })
        // marker[i].setLabel(label)
        // info[i] = new window.BMap.InfoWindow(+this.listdata[i].name) // 创建信息窗口对象
      }

      console.log(this.change)
    }
  },
  watch: {
    change: {
      handler(oldChange, newChange) {
        this.map()
      }
    }
  },
  mounted() {
    this.map()
  }
}
</script>
<style lang="scss" scoped>
.map-wrap {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
#allmap {
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin: 0;
}
</style>