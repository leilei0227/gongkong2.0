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
        <el-table-column prop="id" label="#" width="100"> </el-table-column>
        <el-table-column prop="name" label="设备名称" width="220"> </el-table-column>
        <el-table-column prop="sqid" label="序列号" width="220"> </el-table-column>
        <el-table-column prop="linsec" label="型号" width="220"> </el-table-column>
        <el-table-column prop="address" label="IP地址" width="220"> </el-table-column>
        <el-table-column prop="version" label="设备版本" width="220"> </el-table-column>
        <el-table-column prop="message" label="上传信息" width="220"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini">升级</el-button>
            <el-button size="mini">重启</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Safe-device',
  data() {
    return {
      input: '',
      options: [
        {
          value: '1',
          label: '设备名称'
        }
      ],
      value: '',

      tableData: [
        {
          id: '5',
          name: '防火墙1',
          sqid: 'v30102ba000000060',
          linsec: 'linsec-300',
          address: '192.168.5.3',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
        },
        {
          id: '4',
          name: '防火墙1',
          sqid: 'v30102ba000000060',
          linsec: 'linsec-300',
          address: '192.168.5.3',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
        },
        {
          id: '2',
          name: '防火墙1',
          sqid: 'v30102ba000000060',
          linsec: 'linsec-300',
          address: '192.168.5.3',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
        },
        {
          id: '1',
          name: '防火墙1',
          sqid: 'v30102ba000000060',
          linsec: 'linsec-300',
          address: '192.168.5.3',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
        },
        {
          id: '3',
          name: '防火墙1',
          sqid: 'v30102ba000000060',
          linsec: 'linsec-300',
          address: '192.168.5.3',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
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
