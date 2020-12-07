<template>
  <div class="content-container">
    <div class="content-but">
      <div class="box-select">
        <el-select v-model="value" placeholder="请选择" style="width: 180px; margin-right: 10px">
          <el-option v-for="item in options" :key="item" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-input v-model="input" style="width: 200px; margin-right: 10px" placeholder="请输入内容"></el-input>
        <el-button type="primary" style="width: 50px; height: 40px" icon="el-icon-search"></el-button>
      </div>
    </div>
    <div class="content-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="#" width="150"> </el-table-column>
        <el-table-column prop="name" label="系统设备名" width="150"> </el-table-column>
        <el-table-column prop="class" label="设备种类" width="130"> </el-table-column>
        <el-table-column prop="producer" label="生产厂商" width="130"> </el-table-column>
        <el-table-column prop="brand" label="品牌系列" width="150"> </el-table-column>
        <el-table-column prop="isoid" label="规格型号" width="150"> </el-table-column>
        <el-table-column prop="sqid" label="序列号" width="150"> </el-table-column>
        <el-table-column prop="datestart" label="检定开始时间" width="150"> </el-table-column>
        <el-table-column prop="dateend" label="检定结束时间" width="150"> </el-table-column>
        <el-table-column prop="datenext" label="下次检定时间" width="150"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template>
            <el-button type="text" plain>设备检定</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Device-list',
  data() {
    return {
      input: '',
      options: [
        {
          value: '1',
          label: '事件名称'
        }
      ],
      value: '',
      tableData: [
        {
          id: '1',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        },
        {
          id: '2',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        },
        {
          id: '3',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        },
        {
          id: '4',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        },
        {
          id: '5',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .content-but {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  .content-table {
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
