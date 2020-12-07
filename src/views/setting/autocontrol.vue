<template>
  <div class="content-container">
    <!-- <div class="content-button">
      <div class="p-button">
        <el-button type="primary" plain @click="pageindex = 1">设备种类</el-button>
        <el-button type="primary" plain @click="pageindex = 2">诊断条件</el-button>
        <el-button type="primary" plain @click="pageindex = 3">设备配置</el-button>
      </div>
      <el-button class="but-plus" type="primary" icon="el-icon-plus">添加</el-button>
    </div>
    <div class="content-box">
      <div class="content-device-1" v-show="pageindex === 1">
        <p>设备类型</p>
        <el-tree node-key="id" :data="treedata" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true" :render-content="renderContent"></el-tree>
      </div>
      <div class="content-table-1" v-show="pageindex === 1">
        <el-table :data="tableData" border style="width: 100%" :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
          <el-table-column label="#" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="TAG名" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="TAG描述" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.discuss }}</span>
            </template>
          </el-table-column>
          <el-table-column label="判断条件" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.panduan }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="content-device-1" v-show="pageindex === 2">
        <p>设备类型</p>
        <el-tree node-key="id" :data="treedata2" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true" :render-content="renderContent"></el-tree>
      </div>
      <div class="content-table-1" v-show="pageindex === 2">
        <el-table :data="tableData2" border style="width: 100%" :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
          <el-table-column label="#" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="差压变送器" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="初步结论" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.discuss }}</span>
            </template>
          </el-table-column>
          <el-table-column label="指导建议" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.panduan }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="content-device-1" v-show="pageindex === 3">
        <p>设备列表</p>
        <el-tree node-key="id" :data="treedata3" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true" :render-content="renderContent"></el-tree>
      </div>
      <div class="content-table-3" v-show="pageindex === 3">
        <div class="content-table-title">
          <div class="span-box"><span>设备名</span></div>
          <el-input v-model="input" placeholder="请输入内容" style="width: 300px"></el-input>
        </div>
        <div class="content-table-title">
          <div class="span-box"><span>设备种类</span></div>
          <el-input v-model="input" placeholder="请输入内容" style="width: 300px"></el-input>
        </div>

        <el-table :data="tableData" border style="width: 100%" :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
          <el-table-column label="#" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="TAG名" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="TAG描述" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.discuss }}</span>
            </template>
          </el-table-column>
          <el-table-column label="判断条件" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.panduan }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="dialogPvVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="TAG名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="值类型" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="范围"></el-radio>
            <el-radio label="枚举"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="判断条件" prop="name">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="date1">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-input v-model="ruleForm.name"></el-input>
            <el-button>添加</el-button>
          </el-col>
        </el-form-item>

        <el-table>
          <el-table-column prop="date" label="日期" width="180"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<script>
let id = 1000
export default {
  name: 'Setting-autocontrol',
  data() {
    return {
      dialogPvVisible: true,
      pageindex: 1,
      treedata: [
        {
          id: 1,
          label: '盘台',
          children: [
            { id: 4, label: '按钮' },
            { id: 5, label: '保险端子' },
            {
              id: 6,
              label: '电源冗余模块'
            },
            {
              id: 7,
              label: '浪涌保护器'
            },
            {
              id: 8,
              label: '声光报警器'
            },

            {
              id: 9,
              label: '直流稳压电源'
            }
          ]
        },
        {
          id: 2,
          label: '现场设备',
          children: [
            { id: 10, label: '差压变送器' },
            {
              id: 11,
              label: '开关量输出设备DO'
            },
            {
              id: 12,
              label: '开关量输入设备DI'
            },

            {
              id: 13,
              label: '可燃气体报警器'
            },

            {
              id: 14,
              label: '流量计'
            },
            {
              id: 15,
              label: '模拟量输出设备AO'
            },
            {
              id: 16,
              label: '模拟量输出设备AI'
            },

            {
              id: 17,
              label: '通讯设备'
            },
            {
              id: 18,
              label: '温度变送器'
            },
            {
              id: 19,
              label: '压力变送器'
            }
          ]
        },
        {
          id: 3,
          label: 'IT设备',
          children: [
            { id: 20, label: '服务器' },
            { id: 21, label: '工作站' },
            {
              id: 22,
              label: '路由器'
            },
            {
              id: 23,
              label: '千兆交换机'
            }
          ]
        }
      ],
      treedata2: [
        {
          id: 2,
          label: '现场设备',
          children: [
            { id: 10, label: '差压变送器' },
            {
              id: 11,
              label: '开关量输出设备DO'
            },
            {
              id: 12,
              label: '开关量输入设备DI'
            },

            {
              id: 13,
              label: '可燃气体报警器'
            },

            {
              id: 14,
              label: '流量计'
            },
            {
              id: 15,
              label: '模拟量输出设备AO'
            },
            {
              id: 16,
              label: '模拟量输出设备AI'
            },

            {
              id: 17,
              label: '通讯设备'
            },
            {
              id: 18,
              label: '温度变送器'
            },
            {
              id: 19,
              label: '压力变送器'
            }
          ]
        }
      ],
      treedata3: [
        {
          id: 1,
          label: '盘台',
          children: [
            { id: 4, label: 'AI1' },
            { id: 5, label: 'CPU' },
            {
              id: 6,
              label: 'SPD-1,2'
            },
            {
              id: 7,
              label: 'TD1'
            },
            {
              id: 8,
              label: 'TXT-1,2'
            }
          ]
        },
        {
          id: 2,
          label: '现场设备',
          children: [
            { id: 10, label: '温度变送器' },
            {
              id: 11,
              label: 'test_equip'
            }
          ]
        },
        {
          id: 3,
          label: 'IT设备',
          children: [
            { id: 20, label: '服务器1' },
            { id: 21, label: '服务器2' },
            {
              id: 22,
              label: '服务器3'
            },
            {
              id: 23,
              label: '服务器4'
            },
            { id: 24, label: '笔记本1' },
            { id: 25, label: '电脑1' },
            { id: 26, label: '交换机' }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [
        {
          id: '1',
          name: 'SPD',
          discuss: '浪涌报警',
          panduan: '条件 故障类型'
        },
        {
          id: '2',
          name: 'SPD',
          discuss: '浪涌报警',
          panduan: '条件 故障类型'
        },
        {
          id: '3',
          name: 'SPD',
          discuss: '浪涌报警',
          panduan: '条件 故障类型'
        },
        {
          id: '4',
          name: 'SPD',
          discuss: '浪涌报警',
          panduan: '条件 故障类型'
        }
      ],
      tableData2: [
        {
          id: '1',
          name: 'SPD',
          discuss: '浪涌报警',
          panduan: '条件 故障类型'
        },
        {
          id: '2',
          name: 'SPD',
          discuss: '浪涌报警',
          panduan: '条件 故障类型'
        },
        {
          id: '3',
          name: 'SPD',
          discuss: '浪涌报警',
          panduan: '条件 故障类型'
        },
        {
          id: '4',
          name: 'SPD',
          discuss: '浪涌报警',
          panduan: '条件 故障类型'
        }
      ],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    append(data) {
      const newChild = { id: id++, label: write(), children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    write() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>
              添加
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>
              删除
            </el-button>
          </span>
        </span>
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;

  .content-button {
    width: 100%;
    padding: 20px;
    padding-bottom: 0px;
    display: flex;
    justify-content: space-between;
  }
  .content-box {
    display: flex;
    justify-content: space-between;
    .content-device-1 {
      width: 20%;
      margin: 20px;
      padding: 15px;
      border: rgba(215, 215, 215, 1) solid 1px;

      // ::v-deep .custom-tree-node {
      //   display: flex;
      //   justify-content: space-between;
      //   flex: 1;
      //   font-size: 14px;
      //   padding-right: 8px;
      //   align-items: center;
      // }
    }
    .content-table-1 {
      margin: 20px;
      margin-left: 0px;
      width: 75%;
      border: rgba(215, 215, 215, 1) solid 1px;
    }
    .content-table-3 {
      margin: 20px;
      margin-left: 0px;
      width: 75%;
      border: rgba(215, 215, 215, 1) solid 1px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content-table-title {
        display: flex;
        .span-box {
          width: 100px;
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            color: #606266;
            padding-left: 10px;
          }
        }
        padding: 5px;

        .el-input {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
