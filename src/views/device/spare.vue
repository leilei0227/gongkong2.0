<template>
  <div class="content-container">
    <div class="box-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="class" label="设备种类" width="200"> </el-table-column>
        <el-table-column prop="totalnum" label="总数" width="130"> </el-table-column>
        <el-table-column prop="yunxing" label="运行" width="130"> </el-table-column>
        <el-table-column prop="beijian" label="备件" width="130"> </el-table-column>
        <el-table-column prop="jianding" label="检定" width="130"> </el-table-column>
        <el-table-column prop="repair" label="维修" width="130"> </el-table-column>
        <el-table-column prop="bad" label="维修" width="130"> </el-table-column>
        <el-table-column prop="bili" label="备用比例" width="150"> </el-table-column>
        <el-table-column prop="downline" label="备件下限" width="150"> </el-table-column>
        <el-table-column prop="address" label="存放地点" width="130"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Device-spare',
  data() {
    return {
      tableData: [
        {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        },
        {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        },
        {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        },
        {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        },
        {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .box-table {
    display: flex;
    padding: 20px;
    ::v-deep .el-table td {
      text-align: center;
    }
    ::v-deep .el-table th {
      text-align: center;
    }
  }
}
</style>
