<template>
  <div class="content-container">
    <div class="tree-table-container">
      <el-tree :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick" :default-checked-keys="[5]" :props="defaultProps"> </el-tree>
      <div class="device-table">
        <div class="device-row">
          <div class="title">设备种类</div>
          <el-input v-model="inputData" style="width: 300px"></el-input>
        </div>
        <div class="device-row">
          <div class="title">信号类型</div>
          <el-input style="width: 300px"></el-input>
        </div>
        <div class="device-row">
          <div class="title">仪表回路</div>
          <div class="button-box">
            <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px"></el-button>
            <el-button type="primary" icon="el-icon-upload2" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-download" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-close" size="mini"></el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 80%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="设备类型" width="400"> </el-table-column>
          <el-table-column prop="name" label="形状" width="400"> </el-table-column>
          <el-table-column prop="address" label="是否诊断条件"> </el-table-column>
        </el-table>
        <div class="device-row">
          <div class="title">TAG类型</div>
          <div class="button-box">
            <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px" @click="dialogVisible = true"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-close" size="mini"></el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 80%; margin-bottom: 30px">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="date" label="TAG名" width="400"> </el-table-column>
          <el-table-column prop="name" label="TAG描述" width="400"> </el-table-column>
          <el-table-column prop="address" label="判断条件"> </el-table-column>
        </el-table>
        <div class="device-row">
          <div class="title">诊断条件</div>
          <div class="button-box">
            <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px" @click="dialogVisible1 = true"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-close" size="mini"></el-button>
          </div>
        </div>
        <el-table :data="tableData" style="width: 80%; margin-bottom: 30px">
          <el-table-column prop="date" label="日期" width="180"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogVisible" width="40%" title="TAG类型">
          <el-form style="margin-left: 20px" label-width="80px" label-position="left">
            <el-form-item label="TAG名">
              <el-input style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="描述"> <el-input style="width: 60%"></el-input> </el-form-item>
            <el-form-item label="值类型">
              <el-radio-group>
                <el-radio label="范围"></el-radio>
                <el-radio label="枚举"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="判断条件">
              <el-input style="width: 15%" placeholder="最小值"></el-input><el-input style="width: 15%; margin-left: 10px" placeholder="最大值"></el-input><el-input style="width: 40%; margin-left: 10px" placeholder="故障类型，如：开路报警"></el-input> <el-button type="text">添加</el-button>
              <el-table style="width: 80%; margin-left: 0px; border: 0px">
                <el-table-column label="条件" width="180"></el-table-column>
                <el-table-column prop="name" label="故障类型" width="180"> </el-table-column>
                <el-table-column prop="name" label="操作"> </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left: 30%">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible1" title="诊断条件" width="40%">
          <el-form label-width="180px" label-position="right">
            <el-form-item label="test_type">
              <el-select placeholder="请选择活动区域">
                <el-option label="报警" value="baojing"></el-option>
                <el-option label="正常" value="zhengchang"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="协议转换器">
              <el-select placeholder="请选择活动区域">
                <el-option label="报警" value="baojing"></el-option>
                <el-option label="正常" value="zhengchang"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模拟量输入输出模块AIM">
              <el-select placeholder="请选择活动区域">
                <el-option label="报警" value="baojing"></el-option>
                <el-option label="正常" value="zhengchang"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开关量输入输出模块DOM">
              <el-select placeholder="请选择活动区域">
                <el-option label="报警" value="baojing"></el-option>
                <el-option label="正常" value="zhengchang"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="初步结论">
              <div class="button-box">
                <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px"></el-button>
                <el-button type="primary" icon="el-icon-upload2" size="mini"></el-button>
                <el-button type="primary" icon="el-icon-download" size="mini"></el-button>
                <el-button type="danger" icon="el-icon-close" size="mini"></el-button>
              </div>
              <el-table style="width: 80%; margin-left: 0px; border: 0px; padding-top: 10px; padding-bottom: 0px">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="描述"> </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item label="指导建议">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" style="width: 80%"> </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"> 保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting-technology',
  data() {
    return {
      tData: {},
      inputData: '',
      dialogVisible: false,
      dialogVisible1: false,
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
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      this.tData = data
      this.inputData = this.tData.label
      console.log(this.inputData)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
}
.tree-table-container {
  display: flex;
  justify-content: space-between;
  .el-tree {
    width: 20%;
    margin: 10px;
    border: 1px solid rgb(226, 225, 225);
  }
  .device-table {
    width: 80%;

    .device-row {
      display: flex;
      margin: 10px;
      align-items: center;
      //text-align: center;
      // justify-content: space-between;
      .el-input {
        ::v-deep .el-input__inner {
          border: 0px solid #fff;
        }
      }
      .title {
        text-align: left;
        //line-height: 32px;
        font: 14px arial, 'Hiragino Sans GB', 'Microsoft Yahei', '宋体', Tahoma, Arial, Helvetica, STHeiti;
        font-weight: bold;
        margin-left: 30px;
        margin-right: 10px;
      }

      .button-box {
        .el-button {
          font-size: 16px;
          margin-left: 5px;
          padding: 4px 8px;
        }
      }
    }
    .el-table {
      border: 1px solid rgb(226, 225, 225);
      margin-left: 40px;
    }
  }
}
</style>
