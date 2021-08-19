<template>
  <div class="content-container">
    <div class="tree-table-container">
      <el-tree :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick" :props="defaultProps"> </el-tree>
      <div class="device-table">
        <div class="device-row">
          <div class="title">设备种类</div>
          <el-input v-model="inputData" style="width: 300px"></el-input>
        </div>
        <div class="device-row" v-show="tagShow">
          <div class="title">TAG类型</div>
          <div class="button-box">
            <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px" @click="handleCreate()"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleUpdate()"></el-button>
            <el-button type="danger" icon="el-icon-close" size="mini" @click="handleDelete()"></el-button>
          </div>
        </div>
        <el-table :data="tagData" style="width: 80%; margin-bottom: 30px" v-show="tagShow" @selection-change="handleSelectionChange">
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
          <div class="title">仪表回路</div>
          <div class="button-box">
            <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px" @click="addYibiaoRow"></el-button>
            <el-button type="primary" icon="el-icon-upload2" size="mini" @click="upTagRowRoute(temp_index, row_temp)"></el-button>
            <el-button type="primary" icon="el-icon-download" size="mini" @click="downTagRowRoute(temp_index, row_temp)"></el-button>
            <el-button type="danger" icon="el-icon-close" size="mini" @click="handleDeleteRoute(temp_index)"></el-button>
          </div>
        </div>
        <el-table :data="yibiaoData" style="width: 80%" ref="multipleTable" v-show="yibiaoShow" :row-class-name="selectRowIndex" @selection-change="handleSelectionRouteChange">
          <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
          <el-table-column v-if="false" type="index"></el-table-column>
          <el-table-column label="设备类型" width="400">
            <template slot-scope="scope">
              <el-input class="tableInput" v-if="scope.row.deviceTypeName !== ''" v-model="scope.row.deviceTypeName"></el-input>
              <el-select v-if="scope.row.deviceTypeName == ''" v-model="scope.row.deviceTypeName" @change="selectChange"> <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.label" style="height: auto"> </el-option></el-select>
            </template>
          </el-table-column>
          <el-table-column label="形状" width="400">
            <template slot-scope="scope">
              <span v-if="scope.row.shape == 1 && scope.row.sorted == 1">圆形</span>
              <span v-if="scope.row.shape == 2 && scope.row.sorted == 1">矩形</span>

              <el-select v-if="scope.row.sorted !== 1" v-model="scope.row.shape">
                <el-option label="圆形" :value="1"></el-option>
                <el-option label="矩形" :value="2"></el-option>
              </el-select>
              <!-- <el-select v-model="scope.row.shape" v-if="scope.row.shape == 2 && scope.row.sorted !== 1" class="form-control">
                <el-option value="圆形">圆形</el-option>
                <el-option value="矩形" selected>矩形</el-option>
              </el-select> -->
            </template>
          </el-table-column>
          <el-table-column label="是否诊断条件">
            <!-- <el-checkbox></el-checkbox> -->
            <template slot-scope="{ row }">
              <el-checkbox v-model="row.isCheck" :true-label="1" :false-label="0"></el-checkbox>
              <!--   <input type="checkbox" :value="scope.row.isCheck" /> -->
              <!-- <el-checkbox v-if="scope.row.isCheck == 1" checked @selection-change="ddd"></el-checkbox> -->
            </template>
          </el-table-column>
        </el-table>
        <el-button style="margin-left: 75%" v-show="yibiaoShow" type="text" @click="saveAndView">保存并预览</el-button>
        <el-drawer size="50%" :visible.sync="dialogVisible" width="40%" title="TAG类型">
          <el-form ref="dataForm" :model="temp" style="margin-left: 20px" label-width="80px" label-position="left">
            <el-form-item label="TAG名" prop="tagConfigName">
              <el-input style="width: 60%" v-model="temp.tagConfigName"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="tagConfigDesc"> <el-input style="width: 60%" v-model="temp.tagConfigDesc"></el-input> </el-form-item>
            <el-form-item label="值类型">
              <el-radio-group v-model="radio">
                <el-radio :label="1">范围</el-radio>
                <el-radio :label="2">枚举</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="判断条件">
              <el-input v-if="radio == 2" style="width: 15%" v-model="temp.enum" placeholder="请输入值"></el-input><el-input v-if="radio == 1" style="width: 15%" v-model="temp.min" placeholder="最小值"></el-input><el-input v-if="radio == 1" v-model="temp.max" style="width: 15%; margin-left: 10px" placeholder="最大值"></el-input
              ><el-input style="width: 40%; margin-left: 10px" v-model="temp.errdesc" placeholder="故障类型，如：开路报警"></el-input>
              <el-button type="text" @click="addTableRow(radio)">添加</el-button>
              <el-table :data="temp.values" style="width: 80%; margin-left: 0px; border: 0px">
                <el-table-column prop="enumValue" label="条件" width="300">
                  <template slot-scope="scope">
                    <span v-if="scope.row.enumValue != null" v-text="'PV=' + scope.row.enumValue"></span>
                    <span v-if="scope.row.enumValue == null && scope.row.maxValue != null && scope.row.minValue != null" v-text="scope.row.minValue + ' < ' + 'PV' + ' ≤ ' + scope.row.maxValue"></span>
                    <span v-if="scope.row.enumValue == null && scope.row.maxValue != null && scope.row.minValue == null" v-text="'PV' + ' ≤ ' + scope.row.maxValue"></span>
                    <span v-if="scope.row.enumValue == null && scope.row.maxValue == null && scope.row.minValue != null" v-text="scope.row.minValue + ' < ' + 'PV'"></span>
                  </template>
                </el-table-column>
                <el-table-column prop="valueDesc" label="故障类型" width="180"> </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button type="primary" icon="el-icon-top" size="small" @click="upTagRow(scope.$index, scope.row)"></el-button>
                      <el-button type="primary" icon="el-icon-bottom" size="small" @click="downTagRow(scope.$index, scope.row)"></el-button>
                      <el-button type="danger" icon="el-icon-close" size="small" @click="deleteTagRow(scope.$index, temp.values)"></el-button> </el-button-group></template
                ></el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left: 30%" @click="dialogStatus === 'create' ? createData() : updateData()">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
        <div class="device-row" v-show="yibiaoShow">
          <div class="title">诊断条件</div>
          <div class="button-box">
            <el-button type="success" icon="el-icon-plus" size="mini" style="margin-left: 0px" @click="handleCreateDig()"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="dialogVisibleUpdate = true"></el-button>
            <el-button type="danger" icon="el-icon-close" size="mini" @click="handleDeleteDig()"></el-button>
          </div>
        </div>
        <el-table :data="this.diagData" style="width: 80%; margin-bottom: 30px" v-show="yibiaoShow">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-for="item in this.diagTableTh" :key="item.id" :prop="item.tagValues" :label="item.deviceTypeName" :formatter="tagValueData"> </el-table-column>
          <el-table-column prop="description" label="初步结论" :formatter="resultData"> </el-table-column>
          <el-table-column prop="advice" label="指导建议"> </el-table-column>
        </el-table>
        <el-drawer :visible.sync="dialogVisibleUpdate">
          <el-form style="margin:10px" :model="temp" ref="dataForm1" label-width="150px">
            <el-form-item v-for="item in this.diagTableTh" :label="item.deviceTypeName">
              <el-select >
                <el-option 
                
                
                
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="初步结论"></el-form-item>
            <el-form-item label="指导建议">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item><el-button>取消</el-button>
    <el-button type="primary" >保存</el-button>
    
  </el-form-item>
          </el-form>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import { subList, list, getTagConfig, getTagConfigs, getRecycleConfig, diagnosisList, addTagType, delTagConfig, diagnosisdel, saveRecycleConfigs } from '@/api/autocontrol'
import g from 'file-saver'
import { Button, Divider } from 'element-ui'
export default {
  name: 'Setting-technology',
  data() {
    return {
      tData: {},
      radio: 1,
      value: '',
      options: [],
      checked: true,
      sigShow: false,
      yibiaoShow: false,
      tagShow: false,
      inputData: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisibleUpdate: false,
      dialogVisibleEdit: false,
      listData: [],
      treeAllData: [],
      treePantaiData: [],
      tagData: [],
      yibiaoData: [],
      yibiaoDataAll: [],
      tableIndex: [],
      diagData: [],
      yibiaoDeviceId: undefined,
      diagTableTh: [],
      diagTableData: [],
      treeData: [],
      // radio: 1,
      textMap: {
        create: '新建',
        update: '编辑'
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      mineStatusValue: '',
      dialogStatus: '',
      multipleSelection: [],
      multipleSelectionRoute: [],
      temp_val: 0,
      row_temp: {},
      temp_index: 0,
      devive_val: 0,
      tempId: 0,
      deviceRouteId: 0,
      temp: {
        id: undefined,
        deviceTypeId: undefined,
        tagConfigName: '',
        tagConfigDesc: '',
        values: [],
        errdesc: undefined,
        min: undefined,
        max: undefined,
        enum: undefined
        // type: 1
      }
      // tempDig: {}
    }
  },
  created() {
    //this.subList()
    this.list()
  },
  computed: {},
  methods: {
    aaa(selection, row) {
      console.log(selection, row)
      // if (row.isCheck == 1) {
      // }
    },
    async handleNodeClick(data) {
      this.tData = data
      this.inputData = this.tData.label
      const res = await subList(data.id)
      this.tempId = data.id
      if (data.pid == 1 || data.pid == 40) {
        this.tagShow = false
        this.yibiaoShow = false
        this.sigShow = false
      } else {
        const res = await getTagConfigs(data.id)
        this.tagData = res.data
        if (data.pid == 3) {
          const res = await getRecycleConfig(data.id)
          const diagres = await diagnosisList(data.id)
          this.diagData = diagres.data
          this.yibiaoDeviceId = data.id
          this.yibiaoData = res.data
          // console.log(789, this.yibiaoData)
          this.getTableTh()
          this.getDevice()
        } else {
          this.getPantai()
        }
      }
    },
    async subList() {
      const res = await subList()
    },
    async list() {
      const res = await list()
      this.treeAllData = res.data
      this.treeData = this.getTree(this.treeAllData, 0)
      this.treePantaiData = this.getTree(this.treeAllData, 2)
      this.options = this.treePantaiData
      //console.log(111)
      //console.log(this.treeData)
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
    //getParent(id) {},
    getPantai() {
      this.tagShow = true
      this.yibiaoShow = false
      this.sigShow = false
    },
    // getIT() {},
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
    selectRowIndex(row) {
      this.row_temp = row
      row.row.index = row.rowIndex
    },
    selectable(row) {
      // console.log(row)
      if (row.sorted == 1) {
        return false
      } else {
        return true
      }
    },
    addTableRow(x) {
      if (x == 1) {
        if (this.temp.max && this.temp.min && this.temp.errdesc) {
          //   console.log(999, this.temp)
          this.temp.values.push({
            maxValue: parseInt(this.temp.max),
            minValue: parseInt(this.temp.min),
            valueDesc: this.temp.errdesc,
            type: this.radio
          })
        } else if (this.temp.max && this.temp.errdesc) {
          this.temp.values.push({
            maxValue: parseInt(this.temp.max),
            minValue: null,
            valueDesc: this.temp.errdesc,
            type: this.temp.radio
          })
        } else if (this.temp.min && this.temp.errdesc) {
          this.temp.values.push({
            maxValue: null,
            minValue: parseInt(this.temp.min),
            valueDesc: this.temp.errdesc,
            type: this.temp.radio
          })
        } else {
          alert('最小值与最大值不可同时为空')
        }
      } else {
        if (this.temp.enum && this.temp.errdesc) {
          this.temp.values.push({
            // maxValue: null,
            enumValue: parseInt(this.temp.enum),
            valueDesc: this.temp.errdesc,
            type: this.temp.radio
          })
        } else {
          alert('请输入值')
        }
      }
    },
    addYibiaoRow() {
      this.yibiaoData.push({
        deviceTypeName: '',
        deviceTypeId: this.deviceRouteId,
        shape: 1,
        isCheck: 0,
        sorted: 1
      })
    },
    handleTree(data) {
      // console.log(data)
      this.mineStatusValue = data.label
      // this.value_ = this.mineStatusValue
      // console.log(66666, this.yibiaoData)
      // console.log(this.mineStatusValue)
    },
    selectChange(val) {
      if (val) {
        let obj = {}
        obj = this.options.find((item) => {
          return item.label == val
        })
        this.deviceRouteId = obj.id
        // console.log(obj)
      }

      // console.log(22222, this.deviceRouteId)
      // this.$forceUpdate()
      // this.$refs.tree.setCheckedNodes(e.label)
      // console.log(7777, b)
    },
    saveAndView() {
      let addRoutedata = {
        deviceTypeId: this.tempId
      }
      this.yibiaoData.forEach((item, index) => {
        addRoutedata['recycleConfigs[' + index + '].deviceTypeId'] = item.deviceTypeId
        addRoutedata['recycleConfigs[' + index + '].shape'] = item.shape
        addRoutedata['recycleConfigs[' + index + '].isCheck'] = item.isCheck
        addRoutedata['recycleConfigs[' + index + '].sorted'] = item.sorted
      })

      saveRecycleConfigs(addRoutedata)
    },
    upTagRowRoute(index, row) {
      // console.log(index)
      var that = this
      if (index > 1) {
        let upDate = that.yibiaoData[index - 1]
        that.yibiaoData.splice(index - 1, 1)
        that.yibiaoData.splice(index, 0, upDate)
      } else {
        alert('第一条数据无法上移')
      }
      this.$refs.multipleTable.clearSelection()
    },
    downTagRowRoute(index, row) {
      var that = this
      if (index + 1 === that.yibiaoData.length) {
        alert('最后一条数据无法下移')
      } else {
        let downDate = that.yibiaoData[index + 1]
        that.yibiaoData.splice(index + 1, 1)
        that.yibiaoData.splice(index, 0, downDate)
      }
      this.$refs.multipleTable.clearSelection()
    },
    upTagRow(index, row) {
      var that = this
      if (index > 0) {
        let upDate = that.temp.values[index - 1]
        that.temp.values.splice(index - 1, 1)
        that.temp.values.splice(index, 0, upDate)
      } else {
        alert('第一条数据无法上移')
      }
    },
    downTagRow(index, row) {
      var that = this
      if (index + 1 === that.temp.values.length) {
        alert('最后一条数据无法下移')
      } else {
        let downDate = that.temp.values[index + 1]
        that.temp.values.splice(index + 1, 1)
        that.temp.values.splice(index, 0, downDate)
      }
    },
    handleDeleteRoute(index) {
      this.yibiaoData.splice(index, 1)
    },
    deleteTagRow(index, rows) {
      rows.splice(index, 1)
    },
    tagValueData(row, column) {
      var tagList = row.tagValues
      var ix = this.tableIndex.indexOf(column.label)
      //console.log(ix)
      if (ix == -1 || ix >= tagList.length) return
      return tagList[ix].errorDesc == null ? '正常' : tagList[ix].errorDesc
    },
    handleSelectionChange(val) {
      this.temp_val = 0
      this.devive_val = 0
      this.multipleSelection = val
      if (this.multipleSelection.length) {
        this.temp_val = this.multipleSelection[0].id
        // this.temp_val = temp[0].tagConfigId
        this.devive_val = this.multipleSelection[0].deviceTypeId
      }
      // console.log(55555, this.multipleSelection)
    },
    handleSelectionRouteChange(val) {
      if (Array.isArray(val)) {
        this.temp_index = val[0].index
        // console.log(666, val)
      } else {
        this.temp_index = val.row.index
        // console.log(888, val)
      }
      // this.temp_index = 3
      // console.log(8989, this.temp_index)
      // this.temp_route= 0
      // this.devive_val = 0
      // this.multipleSelectionRoute = val
      // if (this.multipleSelectionRoute.length) {
      //   this.temp_val = this.multipleSelectionRoute[0].id
      //   // this.temp_val = temp[0].tagConfigId
      //   this.devive_val = this.multipleSelectionRoute[0].deviceTypeId
      // }
      // console.log(55555, this.multipleSelectionRoute)
    },
    resetTemp() {
      this.temp = {
        id: this.temp_val,
        deviceTypeId: this.tempId,
        tagConfigName: '',
        tagConfigDesc: '',
        values: []
      }
    },

    handleFetchTagList(deviceId) {
      getTagConfigs(deviceId).then((response) => {
        this.tagData = response.data
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let data = {
            id: this.temp.id,
            deviceTypeId: this.temp.deviceTypeId,
            tagConfigName: this.temp.tagConfigName,
            tagConfigDesc: this.temp.tagConfigDesc
          }
          this.temp.values.forEach((item, index) => {
            data['values[' + index + '].type'] = item.type
            data['values[' + index + '].valueDesc'] = item.valueDesc

            if (item.minValue && item.maxValue) {
              data['values[' + index + '].minValue'] = item.minValue
              data['values[' + index + '].maxValue'] = item.maxValue
            } else if (item.minValue) {
              data['values[' + index + '].minValue'] = item.minValue
            } else if (item.maxValue) {
              data['values[' + index + '].maxValue'] = item.maxValue
            } else if (item.enumValue) {
              data['values[' + index + '].enumValue'] = item.enumValue
            }
          })
          addTagType(data).then(() => {
            this.dialogVisible = false
            this.$message.success('创建成功')
            this.handleFetchTagList(this.temp.deviceTypeId)
          })
        }
      })
    },

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const res = getTagConfig(this.temp_val)

          let addTagdata = {
            id: this.temp.id,
            deviceTypeId: this.temp.deviceTypeId,
            tagConfigName: this.temp.tagConfigName,
            tagConfigDesc: this.temp.tagConfigDesc
          }

          this.temp.values.forEach((item, index) => {
            addTagdata['values[' + index + '].type'] = item.type
            addTagdata['values[' + index + '].valueDesc'] = item.valueDesc

            if (item.minValue && item.maxValue) {
              addTagdata['values[' + index + '].minValue'] = item.minValue
              addTagdata['values[' + index + '].maxValue'] = item.maxValue
            } else if (item.minValue) {
              addTagdata['values[' + index + '].minValue'] = item.minValue
            } else if (item.maxValue) {
              addTagdata['values[' + index + '].maxValue'] = item.maxValue
            } else if (item.enumValue) {
              addTagdata['values[' + index + '].enumValue'] = item.enumValue
            }
          })
          addTagType(addTagdata).then(() => {
            this.dialogVisible = false
            this.$message.success('更改成功')
            this.handleFetchTagList(this.temp.deviceTypeId)
          })
        }
      })
    },

    handleUpdate() {
      this.temp = this.multipleSelection[0]
      this.dialogStatus = 'update'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    handleDelete() {
      this.$confirm(`你确定要删除吗?`, '提示', {
        type: 'warning'
      })
        .then(() => {
          delTagConfig(this.temp_val).then((response) => {
            this.$message.success('删除成功')
            this.handleFetchTagList(this.devive_val)
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleCreateDig(){
      this.dialogVisibleUpdate = true
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
      .el-input {
        ::v-deep .el-input__inner {
          border: 0px solid #fff;
        }
      }
      .title {
        text-align: left;
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
    .yibiaoCon {
      display: flex;
      justify-content: space-between;
      width: 300px;
    }
    .tableInput {
      ::v-deep .el-input__inner {
        border: 0px solid #fff;
      }
    }
  }
}
</style>
