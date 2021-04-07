<template>
  <div class="content-container">
    <div class="content-text">
      <topo-chart></topo-chart>
    </div>
  </div>
</template>

<script>
import topoChart from '@/components/Charts/topoChart'
import TopoChart from '@/components/Charts/topoChart.vue'
export default {
  name: 'Topology',
  components: {
    topoChart
  }
}
</script>

<style lang="scss" scoped>
</style>
