<template>
  <div class="content-container">
    <div class="tree-container">
      <div class="tree-title">设备列表</div>
      <el-tree :data="treeData" show-checkbox node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick" :props="defaultProps"> </el-tree>
    </div>
    <div class="table-container">
      <div class="table-title">
        <el-button type="primary" @click="getErrorList()">与我相关</el-button>
        <div>
          <el-select v-model="listQuery.searchKey" placeholder="请选择" style="width: 180px; margin-right: 10px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <el-input v-model="listQuery.searchValue" style="width: 200px" placeholder="请输入内容"></el-input>
          <el-button type="primary" style="width: 50px; height: 40px; margin-right: 20px" icon="el-icon-search" @click="handleFilter"></el-button>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 98%" :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
        <el-table-column prop="createTime" label="故障时间" width="180" :formatter="parsetime"> </el-table-column>
        <el-table-column prop="deviceName" label="设备名称">
          <!-- <template slot-scope="scope">
            <a @click="drawerEdit(scope.row)" style="color: blue; cursor: pointer">{{ scope.row.deviceName }}</a>
          </template> -->
        </el-table-column>
        <el-table-column prop="deviceTypeName" label="设备类型" width="150"> </el-table-column>
        <el-table-column prop="errorDesc" label="故障类型"> </el-table-column>
        <el-table-column prop="username" label="确认人员" width="120"> </el-table-column>
        <el-table-column prop="result" label="结论"> </el-table-column>
        <el-table-column prop="errorReason" label="故障原因"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="tableConfirm(row)">确认 </el-button>
            <el-button type="text" @click="tableEdit(row)">编辑 </el-button>
            <el-button type="text" @click="errorTableEdit(row)">故障联络单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer :visible.sync="dialogVisibleEdit" title="结论与原因" width="40%">
        <el-form style="margin-right: 10px" ref="dataForm" :model="temp" label-width="80px" label-position="right">
          <el-form-item label="结论">
            <el-input v-model="temp.result"></el-input>
          </el-form-item>
          <el-form-item label="故障原因">
            <el-input v-model="temp.errorReason" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateData()">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <!-- <el-drawer title="我是标题" size="50%" :visible.sync="dialogVisibleTable" :with-header="false">
      <span>我来啦!</span>
    </el-drawer> -->
      <el-drawer size="50%" :visible.sync="dialogVisibleTable" title="故障联络单">
        <el-form style="margin-left: 30px" ref="dataForm2" :model="temp2">
          <el-form-item>
            <span>站名</span>
            <el-input v-model="temp2.station" style="margin-left: 38px; margin-right: 50px"></el-input>
            <span>故障发生时间</span>
            <el-input v-model="temp2.happenTime" style="margin-left: 10px; margin-right: 50px"></el-input>
            <span>汇报时间</span>
            <el-input v-model="temp2.reportTime" style="margin-left: 10px"></el-input>
          </el-form-item>
          <el-form-item>
            <span>故障分类</span>
            <el-input v-model="temp2.errorCategory" style="margin-left: 10px; margin-right: 50px"></el-input>
            <span>设备编号</span>
            <el-input v-model="temp2.deviceNo" style="margin-left: 40px"></el-input>
          </el-form-item>
          <el-form-item>
            <span>值班调度</span>
            <el-input style="margin-left: 10px; margin-right: 50px"></el-input>
            <span>记录人</span>
            <el-input style="margin-left: 55px"></el-input>
          </el-form-item>
          <el-form-item>
            <span>故障现象描述及处理步骤</span>
            <el-input type="textarea" v-model="temp2.errorDesc" style="width: 75%; margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="updateErrorData()" type="primary" style="margin-left: 40%">保存</el-button>
            <el-button type="plain">打印</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <el-drawer size="70%" :visible.sync="dialogPvVisible"
        ><div slot="title" class="dialog-t">
          <span style="text-align: center; display: block; font-size: 20px; line-height: 40px; font-weight: bold" v-text="temp3.deviceName"> </span>
          <el-button type="primary" @click="dialogTableVisible = true">溯源管理</el-button>
        </div>
        <el-form ref="dataForm3" model="temp3">
          <div class="dialog-title">
            <div class="blue-block"></div>
            基本信息
          </div>
          <el-form-item>
             <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 20px" v-text="'设备名称：' + temp3.deviceName"></span>
            <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 40px" v-text="'设备种类：' + temp3.deviceTypeName"></span>
          </el-form-item>
          <!-- <div class="mes-box" style="padding: 10px; height: 80px">
            <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 20px" v-text="'设备名称：' + temp3.deviceName"></span>
            <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 40px" v-text="'设备种类：' + temp3.deviceTypeName"></span>
            <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 20px" v-text="'MAC地址：' + temp3.deviceName"></span>
            <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 40px" v-text="'IP地址：' + temp3.deviceTypeName"></span>
            <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 20px" v-text="'上个设备：' + temp3.deviceName"></span>
            <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 40px" v-text="'是否监控：' + temp3.deviceTypeName"></span>
            <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 20px" v-text="'白名单：' + temp3.deviceName"></span>
            <span style="display: block; margin-top: 20px; margin-right: 30px; margin-left: 40px" v-text="'黑名单' + temp3.deviceTypeName"></span>
             <span style="margin-right: 30px">系统运行时间：3800s</span>
          <span style="margin-right: 30px">系统序列号：xxxxxxxxxxxx</span>
          <span style="margin-right: 30px">软件版本：xxxxxxxxxxx</span>
          <span style="margin-right: 30px">上个设备：服务器3</span>
          <span style="margin-right: 30px">是否监控：是</span> 
          </div> -->
          <div class="dialog-title" v-if="xianchangShow">
            <div class="blue-block"></div>
            仪表回路
          </div>
          <link-chart v-if="xianchangShow" :chart-data="linkData" :chart-line="linkLine"></link-chart>
          <div class="dialog-title">
            <div class="blue-block"></div>
            故障信息
          </div>
          <div style="padding: 10px">
            <el-table :data="tableData1" border style="width: 98%">
              <el-table-column prop="errorTime" label="故障时间" :formatter="dateParse"></el-table-column>
              <el-table-column prop="deviceName" label="变量名"></el-table-column>
              <el-table-column prop="tagValue" label="PV"></el-table-column>
              <el-table-column prop="tagDesc" label="变量描述"></el-table-column>
              <el-table-column prop="errorDesc" label="故障类型"></el-table-column>
              <el-table-column prop="username" label="确认人员"></el-table-column>
              <!-- <el-table-column prop="gztrue" label="确认故障"></el-table-column>
              <el-table-column prop="gzresult" label="结论"></el-table-column>
              <el-table-column prop="gzlianluo" label="故障联络单"></el-table-column> -->
            </el-table>
          </div></el-form
        >

        <!-- <div class="dialog-title">监控指标</div>
        <div class="chart-box" style="padding: 10px">
          <div class="chart-mini">
            <yibiao-chart :chart-data="yibiaodata"> </yibiao-chart>
          </div>
          <div class="chart-mini"><wendu-chart></wendu-chart></div>
          <div class="chart-mini"><xline-chart></xline-chart></div>
        </div> -->
      </el-drawer>
      <el-dialog :visible.sync="dialogTableVisible">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="厂商" name="first">
            <el-form model="form">
              <el-form-item>
                <span>物联标识</span>
                <el-input v-model="form.name" style="margin-right: 105px"></el-input>
                <span>序列号</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>生产厂商</span>
                <el-input v-model="form.name"></el-input>
                <span>品牌系列</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>设备种类</span>
                <el-input v-model="form.name"></el-input>
                <span>技术参数</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>规格型号</span>
                <el-input v-model="form.name"></el-input>
                <span>质保期限</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>出厂日期</span>
                <el-input v-model="form.name"></el-input>
                <span>联系方式</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>订单编号</span>
                <el-input v-model="form.name" style="margin-right: 120px"></el-input>
                <span>地址</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="集成" name="second">
            <el-form model="form">
              <el-form-item>
                <span>物联标识</span>
                <el-input v-model="form.name"></el-input>
                <span>项目编号</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>集成厂商</span>
                <el-input v-model="form.name" style="margin-right: 85px"></el-input>
                <span>主配件SN</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>项目名称</span>
                <el-input v-model="form.name" style="margin-right: 120px"></el-input>
                <span>地址</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>机柜编号</span>
                <el-input v-model="form.name"></el-input>
                <span>联系方式</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="安装" name="third">
            <el-form model="form">
              <el-form-item>
                <span>物联标识</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>总包单位</span>
                <el-input v-model="form.name"></el-input>
                <span>设计单位</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>采办单位</span>
                <el-input v-model="form.name"></el-input>
                <span>施工单位</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>入库时间</span>
                <el-input v-model="form.name"></el-input>
                <span>安装日期</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>安装地点</span>
                <el-input v-model="form.name"></el-input>
                <span>合同编号</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>联系方式</span>
                <el-input v-model="form.name" style="margin-right: 120px"></el-input>
                <span>地址</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="使用" name="fourth">
            <el-form model="form">
              <el-form-item>
                <span>物联标识</span>
                <el-input v-model="form.name" style="margin-right: 80px"></el-input>
                <span>物质编号</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span style="margin-left: 30px">业主</span>
                <el-input v-model="form.name" style="margin-right: 80px"></el-input>
                <span>设备状态</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span style="margin-left: 30px">部门</span>
                <el-input v-model="form.name" style="margin-right: 80px"></el-input>
                <span>投产日期</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>验收日期</span>
                <el-input v-model="form.name" style="margin-right: 80px"></el-input>
                <span>报废日期</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>质保期限</span>
                <el-input v-model="form.name" style="margin-right: 80px"></el-input>
                <span>使用时间</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span style="margin-left: 12px">负责人</span>
                <el-input v-model="form.name"></el-input>
                <span>联系方式</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>地址</span>
                <el-input v-model="form.name" style="width: 600px"></el-input>
              </el-form-item>
              <el-form-item>
                <span>维护开始时间</span>
                <el-input v-model="form.name" style="margin-right: 20px"></el-input>
                <span>维护结束时间</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>检定开始时间</span>
                <el-input v-model="form.name" style="margin-right: 20px"></el-input>
                <span>检定结束时间</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>下次维护时间</span>
                <el-input v-model="form.name" style="margin-right: 20px"></el-input>
                <span>下次检定时间</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span>维护记录</span>
                <el-input v-model="form.name" style="width: 600px"></el-input>
              </el-form-item>
              <el-form-item>
                <span>检定记录</span>
                <el-input v-model="form.name" style="width: 600px"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="查看轨迹" name="checkrouth">
            <el-form model="form">
              <el-form-item>
                <span>物联标识</span>
                <el-input v-model="form.name" style="width: 600px"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { errorList, save, confirmError, saveResult, getForm, myErrorList, getUserListT, getUserList, getDevice, getDeviceByLink, recycleList, deviceInfo } from '@/api/monitor'
import { subList } from '@/api/mautocontrol'
import LinkChart from '@/components/Charts/LinkChart'
import { parseTime } from '@/utils'
//import { errorList } from '@/api/analysis'
export default {
  name: 'Monitor-autocontrol',
  components: { LinkChart },
  data() {
    return {
      treeAllData: [],
      linkData: [],
      linkLine: [],
      treeData: [],
      dialogVisibleEdit: false,
      dialogVisibleTable: false,
      dialogPvVisible: false,
      dialogTableVisible: false,
      xianchangShow: false,
      options: [
        {
          value: 'deviceName',
          label: '设备'
        },
        {
          value: 'deviceTypeName',
          label: '设备类型'
        },
        {
          value: 'errorDesc',
          label: '故障类型'
        },
        {
          value: 'username',
          label: '确认人员'
        },
        {
          value: 'result',
          label: '结论'
        },
        {
          value: 'errorReason',
          label: '故障原因'
        }
      ],
      value: '',
      data1: {},
      data2: {},
      data3: {},
      listQuery: {
        // 查询条件
        pageNum: 1,
        //pageSize: 10,
        status: undefined,
        searchValue: '',
        //roleId: undefined,
        //orgId: undefined,
        totalPageNum: 1,
        // count: 10,
        searchKey: '',
        deviceId: ''
      },
      temp: {
        errorId: undefined,
        result: '',
        errorReason: '',
        station: '',
        happenTime: undefined,
        reportTime: undefined,
        errorCategory: '',
        deviceNo: '',
        errorDesc: ''
      },
      temp2: {
        errorId: undefined,
        result: '',
        errorReason: '',
        station: '',
        happenTime: undefined,
        reportTime: undefined,
        errorCategory: '',
        deviceNo: '',
        errorDesc: ''
      },
      temp3: {
        errorTime: '',
        tagValue: '',
        tagDesc: '',
        errorDesc: '',
        deviceName: '',
        deviceTypeName: '',
        username: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      tableData1: [],
      activeName: 'second',
      input: '',
      form: { name: '' }
    }
  },
  created() {
    this.getList()
    this.getTreeList()
  },
  methods: {
    async getTreeList() {
      const res = await subList(1)
      const res2 = await subList(2)
      const res3 = await subList(3)
      res.data.forEach((item, array) => {
        this.treeAllData.push(item)
      })
      res2.data.forEach((item, array) => {
        this.treeAllData.push(item)
      })
      res3.data.forEach((item, array) => {
        this.treeAllData.push(item)
      })
      // this.treeAllData.push(res.data, res2.data, res3.data)
      this.treeData = this.getTree(this.treeAllData, 0)
      //console.log(11111111, this.treeAllData)
    },
    getList() {
      this.listLoading = true
      errorList(this.listQuery).then((response) => {
        this.tableData = response.data
        this.listLoading = false
      })
    },

    getErrorList() {
      this.listLoading = true
      myErrorList(this.listQuery).then((response) => {
        this.tableData = response.data
        console.log(123, this.tableData)
        this.listLoading = false
      })
      // this.tableData = []
      // const res = await myErrorList()
      // this.tableData = res.data
      // // var time = res.data.createTime

      // console.log(parseTime(res.data[0].createTime))
    },
    parsetime(row, column) {
      var date = row[column.property]
      return parseTime(date)
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    tableConfirm(row) {
      confirmError(row.id, row.status)
    },
    tableEdit(row) {
      this.temp = Object.assign({}, row)
      this.temp.errorId = row.id
      this.dialogVisibleEdit = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })

      // this.dialogVisibleEdit = false
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        console.log(this.temp)
        if (valid) {
          saveResult(this.temp.errorId, this.temp.result, this.temp.errorReason).then(() => {
            this.dialogVisibleEdit = false
            // this.$message.success('更改成功')
            this.getList()
          })
        }
      })
    },
    async errorTableEdit(row) {
      this.temp2.errorId = row.id
      const res = await getForm(this.temp2.errorId)
      console.log(6767, row)
      this.temp2.station = res.data.station
      this.temp2.errorDesc = res.data.errorDesc
      this.temp2.happenTime = res.data.happenTime
      this.temp2.reportTime = res.data.reportTime
      this.temp2.errorCategory = res.data.errorCategory
      this.temp2.deviceNo = res.data.deviceNo
      this.dialogVisibleTable = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm2'].clearValidate()
      // })
    },
    updateErrorData() {
      this.$refs['dataForm2'].validate((valid) => {
        if (valid) {
          // save(this.temp.errorId).then(() => {
          this.dialogVisibleTable = false
          // this.$message.success('更改成功')
          // this.getList()
          // })
        }
      })
    },
    async drawerEdit(id, pid) {
      console.log(898, id)
      this.xianchangShow = false
      this.linkData = []
      this.linkLine = []
      const res = await getDevice(id)
      console.log(1111, res.data)
      this.temp3.deviceName = res.data.name
      this.temp3.deviceTypeName = res.data.typeName

      const res1 = await errorList(id)
      this.tableData1 = res1.data
      if (pid == 3) {
        const res2 = await recycleList(id)
        let arr = []
        let link = []
        res2.data.forEach((item, index) => {
          let name = item.deviceName
          let len = res2.data.length
          let color_
          if (item.status == 1) {
            color_ = 'rgb(84 195 96)'
          } else if (item.status == 0) {
            color_ = '#ff0000'
          }
          let normal = {
            borderWidth: 4,
            shadowBlur: 10,
            shadowColor: '#5C7AD4',
            color: color_
          }

          let itemStyle = { normal }
          let x = 300 + 100 * index
          let y = 160
          let emphasis = { itemStyle }
          let source
          let target
          if (index < len - 1) {
            source = item.sorted - 1
            target = item.sorted
            link.push({ source, target })
          }
          let symbol
          if (item.shape == 1) {
            symbol = 'circle'
          } else if (item.shape == 2) {
            symbol = 'rect'
          }
          // let shape = item.shape
          let sorted = item.sorted
          arr.push({ name, symbol, emphasis, itemStyle, x, y })
        })
        this.linkData = arr
        this.linkLine = link
        this.xianchangShow = true
        console.log(12234444, this.linkData)
      }
      this.dialogPvVisible = true
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
    handleNodeClick(data) {
      if (data.pid == 1) {
        console.log('IT')
      } else if (data.pid == 2) {
        console.log('盘台', data.id)
      } else if (data.pid == 3) {
        console.log('现场设备')
      } else if (data.pid == 0) {
        console.log('112')
      }
      this.drawerEdit(data.id, data.pid)
    },
    dateParse(row) {
      return parseTime(row.errorTime, '{y}-{m}-{d}')
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  justify-content: space-between;
  // height: 100%;
  background-color: #fff;
  .table-container {
    width: 85%;
    .table-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-button,
      .el-select {
        margin: 10px;
      }
    }
    .el-table {
      width: 100%;
      margin-left: 10px;
      padding-bottom: 20px;
    }

    .el-input {
      width: 20%;
    }
    .dialog-t {
      width: 98%;
      display: flex;
      justify-content: space-between;
    }
    .mes-box {
      display: flex;
    }
    .dialog-title {
      padding: 10px;
      display: flex;
      .blue-block {
        width: 0.5%;
        // height: 38px;
        margin-right: 1%;
        background-color: #409eff;
      }
      //background-color: rgb(218, 237, 243);
      //font-weight: bold;
    }
  }
  .tree-container {
    width: 15%;
    margin: 10px;
    margin-right: 0px;
    border: 1px solid #edf0f5;
    //width: 20%;
    //background-color: #fff;
    .tree-title {
      height: 30px;
      text-align: center;
      padding-top: 5px;
      background-color: #edf0f5;
    }
  }
}
</style>
