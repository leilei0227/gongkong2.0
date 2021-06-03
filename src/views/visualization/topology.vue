<template>
  <div class="content-container">
    <div class="content-text">
      <div class="title">
        <el-button type="primary" @click="getChart(1)">工控设备</el-button>
        <el-button type="primary" @click="getChart(2)">IT设备</el-button>
      </div>
      <topo-chart :chart-data="pData"></topo-chart>
    </div>
  </div>
</template>

<script>
import topoChart from '@/components/Charts/topoChart'
//import TopoChart from '@/components/Charts/topoChart.vue'
import { getNewTopology, getTopology } from '@/api/topo'
export default {
  name: 'Topology',
  components: {
    topoChart
  },
  created() {
    this.getList(1)
  },
  data() {
    return {
      pData: {}
    }
  },
  methods: {
    async getList() {
      const res = await getNewTopology()
      this.pData = res.data
      //console.log(1111, res.data)
    },
    async getList2() {
      const res = await getTopology()
      this.pData = res.data
      // console.log(1111, res.data)
    },
    getChart(i) {
      if (i == 1) {
        this.getList()
      } else if (i == 2) {
        this.getList2()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .content-text {
    margin: 5px;
  }
  // .title {

  // }
}
</style>
