
<template>
  <div class="map-wrap">
    <div id="allmap" ref="allmap"></div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
export default {
  name: 'Map',
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
      //var marker1 = new window.BMapGL.Marker(new window.BMapGL.Point(116.404, 39.925))
      // console.log(marker1)
      // 在地图上添加点标记
      // map.addOverlay(marker1)
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