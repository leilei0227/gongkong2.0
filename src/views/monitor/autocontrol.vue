<template>
  <div class="content-container">
    <div class="tree-box">
      <div class="tree-title">设备列表</div>
      <el-tree :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick" :default-checked-keys="[5]" :props="defaultProps"> </el-tree>
    </div>
    <div class="table-box">
      <div class="table-title">
        <el-button type="primary">与我相关</el-button>
        <div>
          <el-select v-model="value" placeholder="请选择" style="margin-right: 0px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 98%" :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
        <el-table-column prop="createTime" label="故障时间" width="180" :formatter="parsetime"> </el-table-column>
        <el-table-column prop="deviceName" label="设备名称" width="160">
          <!-- <template slot-scope="scope"> -->
          <!-- <a @click="dialogPvVisible = true" style="color: blue; cursor: pointer">{{ scope.row.name }}</a> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column prop="deviceTypeName" label="设备类型" width="100"> </el-table-column>
        <el-table-column prop="errorDesc" label="故障类型" width="100"> </el-table-column>
        <el-table-column prop="username" label="确认人员" width="100"> </el-table-column>
        <el-table-column prop="result" label="结论" width="180"> </el-table-column>
        <el-table-column prop="errorReason" label="故障原因" width="180"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">确认 </el-button>
            <el-button type="text" @click="dialogVisibleEdit = true">编辑 </el-button>
            <el-button type="text" @click="dialogVisibleTable = true">故障联络单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogVisibleEdit" title="结论与原因" width="40%">
        <el-form label-width="80px" label-position="right">
          <el-form-item label="结论"> </el-form-item>
          <el-form-item label="故障原因">
            <el-input type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 30%">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisibleTable" title="故障联络单">
        <el-form>
          <el-form-item>
            <span>站名</span>
            <el-input style="margin-left: 38px; margin-right: 50px"></el-input>
            <span>故障发生时间</span>
            <el-input style="margin-left: 10px; margin-right: 50px"></el-input>
            <span>汇报时间</span>
            <el-input style="margin-left: 10px"></el-input>
          </el-form-item>
          <el-form-item>
            <span>故障分类</span>
            <el-input style="margin-left: 10px; margin-right: 50px"></el-input>
            <span>设备编号</span>
            <el-input style="margin-left: 40px"></el-input>
          </el-form-item>
          <el-form-item>
            <span>值班调度</span>
            <el-input style="margin-left: 10px; margin-right: 50px"></el-input>
            <span>记录人</span>
            <el-input style="margin-left: 55px"></el-input>
          </el-form-item>
          <el-form-item>
            <span>故障现象描述及处理步骤</span>
            <el-input type="textarea" style="width: 75%; margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 40%">保存</el-button>
            <el-button type="plain">打印</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { errorList, confirmError, saveResult, getForm } from '@/api/monitor'
import { parseTime } from '@/utils'
//import { errorList } from '@/api/analysis'
export default {
  name: 'Monitor-autocontrol',
  data() {
    return {
      dialogVisibleEdit: false,
      dialogVisibleTable: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      treeData: [
        {
          id: 1,
          label: '盘台',
          children: [
            {
              id: 11,
              label: '按钮'
            },
            {
              id: 12,
              label: '保险端子'
            },
            {
              id: 13,
              label: '电源冗余模块'
            },
            {
              id: 14,
              label: '浪涌保护器'
            },
            {
              id: 4,
              label: '声光报警器'
            }
          ]
        },
        {
          id: 2,
          label: 'PLC',
          children: [
            {
              id: 5,
              label: '电源模块'
            },
            {
              id: 6,
              label: '模拟量输入模块AIM'
            }
          ]
        },
        {
          id: 3,
          label: '现场设备',
          children: [
            {
              id: 7,
              label: '开关量输入设备'
            },
            {
              id: 8,
              label: '差压变送器'
            }
          ]
        },
        {
          id: 4,
          label: 'IT设备',
          children: [
            {
              id: 5,
              label: '安全设备'
            },
            {
              id: 6,
              label: '服务器'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [
        /* {
          id: '2021-01-01 20:20:20',
          name: '防火墙1',
          sqid: '类型1',
          linsec: 'CPU超限',
          address: '管理员',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
        },
        {
          id: '2021-01-01 20:20:20',
          name: '防火墙1',
          sqid: '类型1',
          linsec: 'CPU超限',
          address: '管理员',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
        },
        {
          id: '2021-01-01 20:20:20',
          name: '防火墙1',
          sqid: '类型1',
          linsec: 'CPU超限',
          address: '管理员',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
        },
        {
          id: '2021-01-01 20:20:20',
          name: '防火墙1',
          sqid: '类型1',
          linsec: 'CPU超限',
          address: '管理员',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
        },
        {
          id: '2021-01-01 20:20:20',
          name: '防火墙1',
          sqid: '类型1',
          linsec: 'CPU超限',
          address: '管理员',
          version: 'V1.1.0.6.15',
          message: '上次未升级'
        } */
      ]
    }
  },
  created() {
    this.errorList()
  },
  methods: {
    async errorList() {
      const res = await errorList()
      this.tableData = res.data
      // var time = res.data.createTime

      console.log(parseTime(res.data[0].createTime))
    },
    parsetime(row, column) {
      var date = row[column.property]
      return parseTime(date)
    },
    handleNodeClick(data) {}
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .tree-box {
    width: 15%;
    margin: 10px;
    margin-right: 5px;
    border: 1px solid #dcdfe6;
    .tree-title {
      text-align: center;
      background-color: rgb(219, 227, 235);
      line-height: 28px;
    }
  }
  .table-box {
    width: 83%;
    .table-title {
      display: flex;
      justify-content: space-between;
      .el-button,
      .el-select {
        margin: 10px;
        margin-right: 20px;
      }
    }
    .el-table {
      margin: 10px;
    }
  }
  .el-input {
    width: 20%;
  }
}
</style>
