<template>
  <div class="content-container">
    <div class="tree-table-container">
      <el-tree :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick" :props="defaultProps"> </el-tree>
      <div class="device-table">
        <div class="device-row">
          <div class="title">设备种类</div>
          <el-input v-model="inputData" style="width: 300px"></el-input>
        </div>
        <div class="device-row" v-show="sigShow">
          <div class="title">信号类型</div>
          <el-input style="width: 300px"></el-input>
        </div>
        <div class="device-row" v-show="yibiaoShow">
          <div class="title">仪表回路</div>
          <div class="button-box">
            <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px"></el-button>
            <el-button type="primary" icon="el-icon-upload2" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-download" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-close" size="mini"></el-button>
          </div>
        </div>
        <el-table :data="yibiaoData" style="width: 80%" v-show="yibiaoShow">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="deviceTypeName" label="设备类型" width="400"> </el-table-column>
          <el-table-column label="形状" width="400">
            <template slot-scope="scope">
              <select v-if="scope.row.shape == 1" class="form-control">
                <option value="圆形" selected>圆形</option>
                <option value="矩形">矩形</option>
              </select>
              <select v-if="scope.row.shape == 2" class="form-control">
                <option value="圆形">圆形</option>
                <option value="矩形" selected>矩形</option>
              </select>
              <!-- </el-select> -->
            </template>
          </el-table-column>
          <el-table-column label="是否诊断条件">
            <template slot-scope="scope">
              <el-checkbox v-if="scope.row.isCheck == 0"></el-checkbox>
              <el-checkbox v-if="scope.row.isCheck == 1" v-model="checked"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <div class="device-row" v-show="tagShow">
          <div class="title">TAG类型</div>
          <div class="button-box">
            <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px" @click="dialogVisible = true"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-close" size="mini"></el-button>
          </div>
        </div>
        <el-table :data="tagData" style="width: 80%; margin-bottom: 30px" v-show="tagShow">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="tagConfigName" label="TAG名" width="200"> </el-table-column>
          <el-table-column prop="tagConfigDesc" label="TAG描述" width="200"> </el-table-column>
          <el-table-column label="判断条件">
            <template slot-scope="scope">
              <el-table :data="scope.row.values" style="width: 100%; border: 0px; margin: 0">
                <el-table-column prop="enumValue" label="条件" width="300">
                  <template slot-scope="scope">
                    <span v-if="scope.row.enumValue != null" v-text="'PV=' + scope.row.enumValue"></span>
                    <span v-if="scope.row.enumValue == null && scope.row.maxValue != null && scope.row.minValue != null" v-text="scope.row.minValue + ' < ' + 'PV' + ' ≤ ' + scope.row.maxValue"></span>
                    <span v-if="scope.row.enumValue == null && scope.row.maxValue != null && scope.row.minValue == null" v-text="'PV' + ' ≤ ' + scope.row.maxValue"></span>
                    <span v-if="scope.row.enumValue == null && scope.row.maxValue == null && scope.row.minValue != null" v-text="scope.row.minValue + ' < ' + 'PV'"></span>
                  </template>
                </el-table-column>
                <el-table-column prop="valueDesc" label="故障类型"> </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
        <div class="device-row" v-show="yibiaoShow">
          <div class="title">诊断条件</div>
          <div class="button-box">
            <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px" @click="dialogVisible1 = true"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-close" size="mini"></el-button>
          </div>
        </div>
        <el-table :data="this.diagData" style="width: 80%; margin-bottom: 30px" v-show="yibiaoShow">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-for="item in this.diagTableTh" :key="item.id" :prop="item.tagValues" :label="item.deviceTypeName" :formatter="tagValueData"> </el-table-column>
          <el-table-column prop="description" label="初步结论" :formatter="resultData"> </el-table-column>
          <el-table-column prop="advice" label="指导建议"> </el-table-column>
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
import { subList, list, getTagConfig, getRecycleConfig, diagnosisList } from '@/api/autocontrol'
export default {
  name: 'Setting-technology',
  data() {
    return {
      tData: {},

      checked: true,
      sigShow: false,
      yibiaoShow: false,
      tagShow: false,
      inputData: '',
      dialogVisible: false,
      dialogVisible1: false,
      listData: [],
      treeAllData: [],
      tagData: [],
      yibiaoData: [],
      yibiaoDataAll: [],
      tableIndex: [],
      diagData: [],
      diagTableTh: [],
      diagTableData: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    //this.subList()
    this.list()
  },
  computed: {},
  methods: {
    async handleNodeClick(data) {
      this.tData = data
      this.inputData = this.tData.label
      const res = await subList(data.id)
      if (data.pid == 1) {
        this.tagShow = false
        this.yibiaoShow = false
        this.sigShow = false
      }
      if (data.pid == 2 || data.pid == 3) {
        const res = await getTagConfig(data.id)
        this.tagData = res.data
        if (data.pid == 2) {
          this.getPantai()
        }
      }
      if (data.pid == 3) {
        const res = await getRecycleConfig(data.id)
        const diagres = await diagnosisList(data.id)
        this.diagData = diagres.data

        this.yibiaoData = res.data

        this.getTableTh()
        this.getDevice()
      } else this.getParent(data.pid)
    },
    async subList() {
      const res = await subList()
      //this.listData = res.data
    },
    async list() {
      const res = await list()
      this.treeAllData = res.data
      this.treeData = this.getTree(this.treeAllData, 0)
      console.log(111)
      console.log(this.treeData)
    },

    getTree(treeData, parentId) {
      var treeArr = []
      for (var i = 0; i < treeData.length; i++) {
        var node = treeData[i]
        if (node.pid == parentId) {
          var newNode = { id: node.id, label: node.name, children: this.getTree(treeData, node.id), pid: node.pid, isRemind: node.isRemind, relatedId: node.relatedId }
          treeArr.push(newNode)
        }
      }
      // console.log(treeArr)
      return treeArr
    },
    getParent(id) {},
    getPantai() {
      this.tagShow = true
      this.yibiaoShow = false
      this.sigShow = false
    },
    getIT() {},
    getDevice() {
      this.yibiaoShow = true
      this.sigShow = true
      this.tagShow = true
    },
    getTableTh() {
      if (this.yibiaoData.length == 0) {
        this.diagTableTh = []
        this.tableIndex = []
      } else {
        this.diagTableTh = []
        this.tableIndex = []
        for (var i = 0; i < this.yibiaoData.length; i++) {
          if (this.yibiaoData[i].isCheck == 1) {
            this.diagTableTh.push(this.yibiaoData[i])
            this.tableIndex.push(this.yibiaoData[i].deviceTypeName)
          }
        }
      }
      // console.log(this.diagTableTh)
    },
    getTableData() {
      for (var i = 0; i < this.diagTableData.length; i++) {}
      this.diagTableData
    },

    resultData(row) {
      let arr = []
      row.results.forEach((item, index) => {
        return arr.push(item.description)
      })

      return arr.join(',')
    },
    tagValueData(row, column) {
      var tagList = row.tagValues

      var ix = this.tableIndex.indexOf(column.label)
      console.log(ix)
      if (ix == -1 || ix >= tagList.length) return
      return tagList[ix].errorDesc == null ? '正常' : tagList[ix].errorDesc
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
}
.form-control {
  display: block;
  width: 60%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
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
