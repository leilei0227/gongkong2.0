<template>
  <div class="content-container">
    <div class="select-box">
      <el-select v-model="value" placeholder="请选择" style="width: 180px; margin-right: 10px">
        <el-option v-for="item in options" :key="item" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-input v-model="input" style="width: 200px; margin-right: 10px" placeholder="请输入内容"></el-input>
      <el-button type="primary" style="width: 50px; height: 40px" icon="el-icon-search"></el-button>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="事件日期" width="220"> </el-table-column>
        <el-table-column prop="name" label="事件名称" width="220"> </el-table-column>
        <el-table-column prop="class" label="事件类型" width="220"> </el-table-column>
        <el-table-column prop="grade" label="事件级别" width="220"> </el-table-column>
        <el-table-column prop="feature" label="事件特征" width="220"> </el-table-column>
        <el-table-column prop="discuss" label="事件描述" width="220"> </el-table-column>
        <el-table-column prop="time" label="发生次数"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Safe-event',
  data() {
    return {
      input: '',

      options: [
        {
          value: '1',
          label: '事件名称'
        },
        {
          value: '2',
          label: '设备SN号'
        }
      ],
      value: '',

      tableData: [
        {
          date: '2016-05-02',
          name: '紧急',
          class: '',
          grade: '',
          feature: '',
          discuss: '',
          time: ''
        },
        {
          date: '2016-05-04',
          name: '一般',
          class: '',
          grade: '',
          feature: '',
          discuss: '',
          time: ''
        },
        {
          date: '2016-05-06',
          name: '',
          class: '',
          grade: '',
          feature: '',
          discuss: '',
          time: ''
        },
        {
          date: '2016-05-07',
          name: '',
          class: '',
          grade: '',
          feature: '',
          discuss: '',
          time: ''
        },
        {
          date: '2016-05-08',
          name: '',
          class: '',
          grade: '',
          feature: '',
          discuss: '',
          time: ''
        },
        {
          date: '2016-05-09',
          name: '',
          class: '',
          grade: '',
          feature: '',
          discuss: '',
          time: ''
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .select-box {
    display: flex;
    width: 100%;
    height: 100px;
    padding: 20px;
  }
  .table-box {
    width: 100%;
    padding: 20px;
    padding-top: 0px;
    ::v-deep .el-table td {
      text-align: center;
    }
    ::v-deep .el-table th {
      text-align: center;
    }
  }
}
</style>
