<template>
  <div class="content-container">
    <div class="content-but">
      <div class="box-select">
        <el-select v-model="listQuery.searchKey" placeholder="请选择" style="width: 180px; margin-right: 10px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-input v-model="listQuery.searchValue" style="width: 200px; margin-right: 10px" placeholder="请输入内容"></el-input>
        <el-button type="primary" style="width: 50px; height: 40px" icon="el-icon-search" @click="handleFilter"></el-button>
      </div>
      <div class="box-but">
        <el-button type="primary" icon="el-icon-search" @click="handleCreate">添加</el-button>
        <el-button type="primary" @click="uploadDialogVisible = true">上传</el-button>
        <el-button type="primary" @click="handleDownload()">下载</el-button>
        <el-button type="primary" @click="printDialogVisible = true" plain>打印</el-button>
        <!-- <el-button type="danger" plain>删除</el-button> -->
      </div>
    </div>
    <div class="content-table">
      <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="deviceName" label="设备名称" width="150"> </el-table-column>
        <el-table-column prop="firm.deviceName" label="设备种类" width="130"> </el-table-column>
        <el-table-column prop="firm.name" label="生产厂商" width="130"> </el-table-column>
        <el-table-column prop="firm.brand" label="品牌系列" width="150"> </el-table-column>
        <el-table-column prop="firm.pattern" label="规格型号"> </el-table-column>
        <el-table-column prop="firm.number" label="序列号"> </el-table-column>
        <el-table-column prop="firm.createTime" label="投产时间" :formatter="dateFormat"> </el-table-column>
        <el-table-column prop="firm.expiredTime" label="质保期限" :formatter="dateFormat"> </el-table-column>
        <!-- <el-table-column prop="datebad" label="报废时间" width="150"> </el-table-column>
        <el-table-column prop="lifespan" label="使用时间" width="150"> </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" @click="handleUpdate(row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNum" layout="prev, pager, next" @pagination="getList" />
      <el-drawer size="80%" :visible.sync="dialogVisible" :title="titleMap[dialogStatus]">
        <div class="dialog-title">厂商</div>
        <el-form ref="dataForm" :model="temp">
          <el-form-item>
            <span style="width: 190px; margin-right: 20px">*设备种类</span>
            <!-- <el-select v-model="temp.firm.deviceName" placeholder="设备种类" multiple collapse-tags @change="selectChange">
              <el-option :value="mineStatusValue" style="height: auto">
                <el-tree :data="treeData" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps" @check-change="handleNodeClick"></el-tree>
              </el-option>
            </el-select> -->

            <span style="margin-left: 20px">系统设备名</span>
            <el-input v-model="temp.firm.t" style="width: 190px; margin-right: 192px"></el-input>
            <span>物联标识</span>
            <el-input v-model="temp.firm.name" style="margin-right: 20px"></el-input>
          </el-form-item>
          <el-form-item>
            <span>*生产厂商</span>
            <el-input v-model="temp.firm.brand" style="margin-right: 198px"></el-input>
            <span>*序列号</span>
            <el-input v-model="temp.firm.number"></el-input>
          </el-form-item>
          <el-form-item>
            <span>品牌系列</span>
            <el-input v-model="temp.firm.name" style="margin-right: 195px"></el-input>
            <span>规格型号</span>
            <el-input v-model="temp.firm.pattern"></el-input>
          </el-form-item>
          <el-form-item>
            <span>技术参数</span>
            <el-input v-model="temp.firm.params" style="margin-right: 195px"></el-input>
            <span>出厂日期</span>
            <el-input v-model="temp.firm.createTime"></el-input>
          </el-form-item>
          <el-form-item>
            <span>质保期限</span>
            <el-input v-model="temp.firm.expiredTime" style="margin-right: 195px"></el-input>
            <span>订单编号</span>
            <el-input v-model="temp.firm.orderNo"></el-input>
          </el-form-item>
          <el-form-item>
            <span>联系方式</span>
            <el-input v-model="temp.firm.contact" style="margin-right: 218px"></el-input>
            <span>*地址</span>
            <el-input v-model="temp.firm.address"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-title">集成</div>
        <el-form ref="dataForm" :model="temp">
          <el-form-item>
            <span>集成厂商</span>
            <el-input v-model="temp.installer.name" style="margin-right: 195px"></el-input>
            <span>项目编号</span>
            <el-input v-model="temp.installer.projectNo"></el-input>
          </el-form-item>
          <el-form-item>
            <span>项目名称</span>
            <el-input v-model="temp.installer.projectName" style="margin-right: 190px"></el-input>
            <span>主配件SN</span>
            <el-input v-model="temp.installer.snCode"></el-input>
          </el-form-item>
          <el-form-item>
            <span>机柜编号</span>
            <el-input v-model="temp.installer.cabinetNo" style="margin-right: 218px"></el-input>
            <span>*地址</span>
            <el-input v-model="temp.installer.address"></el-input>
          </el-form-item>
          <el-form-item>
            <span>联系方式</span>
            <el-input v-model="temp.installer.contact" style="margin-right: 195px"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-title">安装</div>
        <el-form ref="dataForm" :model="temp">
          <el-form-item>
            <span>总包单位</span>
            <el-input v-model="temp.integrator.packageUnit" style="margin-right: 195px"></el-input>
            <span>设计单位</span>
            <el-input v-model="temp.integrator.designUnit"></el-input>
          </el-form-item>
          <el-form-item>
            <span>采办单位</span>
            <el-input v-model="temp.integrator.purchaseUnit" style="margin-right: 195px"></el-input>
            <span>施工单位</span>
            <el-input v-model="temp.integrator.executeUnit"></el-input>
          </el-form-item>
          <el-form-item>
            <span>入库时间</span>
            <el-input v-model="temp.integrator.entryDate" style="margin-right: 195px"></el-input>
            <span>安装日期</span>
            <el-input v-model="temp.integrator.installDate"></el-input>
          </el-form-item>
          <el-form-item>
            <span>安装地点</span>
            <el-input v-model="temp.integrator.installAddress" style="margin-right: 195px"></el-input>
            <span>合同编号</span>
            <el-input v-model="temp.integrator.contractNo"></el-input>
          </el-form-item>

          <el-form-item>
            <span>联系方式</span>
            <el-input v-model="temp.integrator.contact" style="margin-right: 218px"></el-input>
            <span>*地址</span>
            <el-input v-model="temp.integrator.address"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-title">使用</div>
        <el-form ref="dataForm" :model="temp">
          <el-form-item>
            <span>业主</span>
            <el-input v-model="temp.owner.name" style="margin-left: 50px; margin-right: 195px"></el-input>
            <span>物质编号</span>
            <el-input v-model="temp.owner.assetNo"></el-input>
          </el-form-item>
          <el-form-item>
            <span>部门</span>
            <el-input v-model="temp.owner.department" style="margin-left: 50px; margin-right: 195px"></el-input>
            <span>设备状态</span>
            <el-input v-model="temp.owner.deviceStatus"></el-input>
          </el-form-item>
          <el-form-item>
            <span>验收日期</span>
            <el-input v-model="temp.owner.acceptDate" style="margin-right: 195px"></el-input>
            <span>投产日期</span>
            <el-input v-model="temp.owner.productDate"></el-input>
          </el-form-item>
          <el-form-item>
            <span>质保期限</span>
            <el-input v-model="temp.owner.expiration" style="margin-right: 195px"></el-input>
            <span>报废日期</span>
            <el-input v-model="temp.owner.discardDate"></el-input>
          </el-form-item>
          <el-form-item>
            <span>下次维护</span>
            <el-input v-model="temp.owner.repairDate" style="margin-right: 195px"></el-input>
            <span>下次检定</span>
            <el-input v-model="temp.owner.checkDate"></el-input>
          </el-form-item>
          <el-form-item>
            <span>维护记录</span>
            <el-input v-model="temp.owner.repairRecord" style="width: 86%"></el-input>
          </el-form-item>
          <el-form-item>
            <span>检定记录</span>
            <el-input v-model="temp.owner.checkRecord" style="width: 86%"></el-input>
          </el-form-item>
          <el-form-item>
            <span>负责人</span>
            <el-input v-model="temp.owner.chargeUser" style="margin-left: 35px; margin-right: 192px"></el-input>
            <span>使用时间</span>
            <el-input v-model="temp.owner.t"></el-input>
          </el-form-item>
          <el-form-item>
            <span>联系方式</span>
            <el-input v-model="temp.owner.contact" style="margin-right: 218px"></el-input>
            <span>*地址</span>
            <el-input v-model="temp.owner.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 40%" @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogStatus === 'add' ? createData() : updateData()">确定</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <el-dialog width="30%" title="打印二维码" :visible.sync="printDialogVisible">
        <el-form label-position="right" label-width="90px">
          <el-form-item label="标识类型">
            <el-select v-model="typePrint">
              <el-option label="物联标识" value="1"></el-option>
              <el-option label="序列号" value="2"></el-option>
              <el-option label="物资编号" value="3"></el-option> </el-select
          ></el-form-item>
          <el-form-item label="二维码大小"
            ><el-select v-model="sizePrint">
              <el-option label="100" value="100"></el-option>
              <el-option label="150" value="150"></el-option>
              <el-option label="200" value="200"></el-option>
              <el-option label="250" value="250"></el-option>
              <el-option label="300" value="300"></el-option>
              <el-option label="350" value="350"></el-option>
              <el-option label="400" value="400"></el-option>
            </el-select>
            <!-- <el-button style="margin-left: 10px" type="primary">自定义</el-button> -->
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="printQrcode">打印</el-button>
        </span>
      </el-dialog>

      <el-dialog title="上传excel文件" :visible.sync="uploadDialogVisible" width="30%" id="uploadModal">
        <form id="uploadForm" method="post" enctype="multipart/form-data">
          <div class="modal-body">
            <div class="row"><div class="col-lg-offset-2 col-lg-8 hint msg"></div></div>
            <div class="row">
              <div class="col-lg-12">
                <p style="height: 0; overflow: hidden"><input type="text" name="type" /></p>
                <p><input type="file" id="fileName" name="file" /></p>
              </div>
            </div>
          </div>
          <!--模态框主要内容--end-->
          <!--模态框底部--start-->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary save-btn" style="width: 100%">上 传</button>
          </div>
        </form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'
import { fetchList, deleteDevice, saveDevice, getQrCode } from '@/api/device'
import { list } from '@/api/autocontrol'
import { parseTime } from '@/utils'
import qs from 'qs'
import QRCode from 'qrcodejs2'
import { subList as getLimit } from '@/api/other'
export default {
  name: 'Device-list',
  components: { Pagination },
  data() {
    return {
      dialogVisible: false,
      printDialogVisible: false,
      uploadDialogVisible: false,
      treeData: [],
      //device: '',
      treeAllData: [],
      mineStatusValue: [],
      typePrint: '1',
      sizePrint: '100',
      idList: '',
      idListAll: '',
      titleMap: {
        add: '添加',
        edit: '编辑'
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      aaaa: 0,
      //新增和编辑弹框标题
      dialogStatus: '',
      input: '',
      form: {
        device: '',
        name: ''
      },
      listLoading: true, // 加载动画
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
        searchKey: ''
      },
      total: 0,
      options: [
        {
          value: 'firm.number',
          label: '序列号'
        },
        {
          value: 'firm.pattern',
          label: '规格型号'
        },
        { value: 'firm.name', label: '生产厂商' },
        { value: 'firm.brand', label: '品牌系列' },
        //  { value: '5', label: '规格型号' },
        { value: 'firm.deviceName', label: '设备种类' }
      ],
      value: '',
      temp: {
        // 表单字段
        // 表单字段
        id: undefined,
        nnn: '',
        typeId: 0,
        //userId: undefined,
        firm: {
          name: '',
          number: '',
          deviceName: '',
          lng: 0,
          lat: 0,
          t: ''
        },
        installer: {
          lng: 0,
          lat: 0,
          t: ''
        },
        integrator: {
          lng: 0,
          lat: 0,
          t: ''
        },
        owner: {
          lng: 0,
          lat: 0,
          t: ''
        }

        // username: '',
        //monitor: undefined,
        // realName: '',
        // status: 0,
        //orgName: undefined,
        //role: undefined,
        // unitId: 1,
        //phone: 0,
        // dutyStatus: undefined,
        // userType: undefined
      },
      tableAllData: [],
      tableData: [
        /*  {
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          dateuse: '2002-02-21',
          datein: '2020-02-21',
          datebad: '2050-02-01',
          lifespan: '2年1月10天'
        },
        {
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          dateuse: '2002-02-21',
          datein: '2020-02-21',
          datebad: '2050-02-01',
          lifespan: '2年1月10天'
        },
        {
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          dateuse: '2002-02-21',
          datein: '2020-02-21',
          datebad: '2050-02-01',
          lifespan: '2年1月10天'
        },
        {
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          dateuse: '2002-02-21',
          datein: '2020-02-21',
          datebad: '2050-02-01',
          lifespan: '2年1月10天'
        } */
      ],
      prefix: '',
      prefixType: ''
    }
  },
  created() {
    this.getList()
    // this.list()
    this.getLimit()
  },
  mounted() {
    $('body').delegate('#uploadModal .save-btn', 'click', function (e) {
      if ($('#fileName').val()) {
        $.ajax({
          url: 'http://47.104.26.21/gongkong3/source/upload.json',
          type: 'POST',
          cache: false,
          data: new FormData($('#uploadForm')[0]),
          processData: false,
          contentType: false,
          success: function (response, stutas, xhr) {
            var retCode = response.retCode
            if (retCode == 200) {
              this.listQuery.pageNum = 1
              this.getList()

              // m_data.pageNum = 1
              // deviceList()
              // $('#uploadModal').modal('hide')
              this.uploadDialogVisible = false
            } else {
              // $('#alertModal .modal-body').html(response.retDesc)
              // $('#alertModal').modal('show')
              // this.uploadDialogVisible = false
              this.$message.error(response.retDesc)
            }
          }
        })
      } else {
        $('#alertModal .modal-body').html('请选择一个文件')
        $('#alertModal').modal('show')
      }
    })
  },
  methods: {
    async getLimit() {
      const res = await getLimit()
      this.prefix = res.data.prefix
      this.prefixType = res.data.prefixType
    },
    getIotId() {
      var temp = this.prefixType === 1 ? this.firm.number : this.owner != null ? this.owner.assetNo : ''
      return this.prefix + temp
    },

    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then((response) => {
        this.tableData = response.data
        this.tableData.forEach((item) => {
          this.idListAll += item.id + ','
          this.idList = this.idListAll
        })
        this.listLoading = false
        this.total = response.pageDto.count
      })
      // console.log(this.tableAllData.deviceName)
      // this.tableData.push(this.tableAllData.deviceName, this.tableAllData.firm)
      // console.log(res.data[0].firm)
    },
    // async list() {
    //   const res = await list()
    //   this.treeAllData = res.data
    //   this.treeData = this.getTree(this.treeAllData, 0)
    //   //console.log(111)
    //   //console.log(this.treeData)
    // },

    // getTree(treeData, parentId) {
    //   var treeArr = []
    //   for (var i = 0; i < treeData.length; i++) {
    //     var node = treeData[i]
    //     if (node.pid == parentId) {
    //       var newNode = { id: node.id, label: node.name, children: this.getTree(treeData, node.id), pid: node.pid, isRemind: node.isRemind, relatedId: node.relatedId }
    //       treeArr.push(newNode)
    //     }
    //   }
    //   // console.log(treeArr)
    //   return treeArr
    // },
    getClass(row, column) {
      var type = row.firm
      return firm.typeName
    },
    dateFormat(row, column) {
      let timeTemp
      if (column.property == 'firm.createTime') {
        timeTemp = row.firm.createTime
      } else if (column.property == 'firm.expiredTime') {
        timeTemp = row.firm.expiredTime
      }
      // console.log(timeTemp)
      let result = parseTime(timeTemp, '{y}-{m}-{d}')
      return result
    },
    resetTemp() {
      console.log(22)
      this.temp = {
        // 表单字段
        // 表单字段
        id: undefined,
        nnn: '',
        // typeId: this.aaaa,
        //userId: undefined,
        firm: {
          name: '',
          number: '',
          deviceName: '',
          // name: 'aaa',
          // number: 'ad',
          // deviceName: '保险端子',
          lng: 0,
          lat: 0,
          t: ''
        },
        installer: {
          lng: 0,
          lat: 0,
          t: ''
        },
        integrator: {
          lng: 0,
          lat: 0,
          t: ''
        },
        owner: {
          lng: 0,
          lat: 0,
          t: ''
        }

        // username: '',
        //monitor: undefined,
        // realName: '',
        // status: 0,
        //orgName: undefined,
        //role: undefined,
        // unitId: 1,
        //phone: 0,
        // dutyStatus: undefined,
        // userType: undefined
      }
      // console.log(33)
    },
    handleCreate() {
      //显示弹框
      this.dialogVisible = true
      //新增弹框标题
      this.dialogStatus = 'add'
      this.resetTemp()
      // this.dialogStatus = 'create'
      //this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        //console.log(44)
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // console.log(11, this.aaaa)
          this.temp.typeId = this.aaaa
          saveDevice(this.temp.typeId, this.temp.firm, this.temp.installer, this.temp.integrator, this.temp.owner).then(() => {
            //console.log(88888)
            this.dialogVisible = false
            this.$message.success('创建成功')
            this.getList()
          })
        }
      })
    },
    //搜索
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    //编辑
    // handelEdit() {
    //   //显示弹框
    //   this.dialogVisible = true
    //   //编辑弹框标题
    //   this.dialogStatus = 'edit'
    // },

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        console.log(this.temp)
        if (valid) {
          saveDevice(this.temp.typeId, this.temp.firm, this.temp.installer, this.temp.integrator, this.temp.owner).then(() => {
            this.dialogVisible = false
            this.$message.success('更改成功')
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      //显示弹框
      this.dialogVisible = true
      //编辑弹框标题
      this.dialogStatus = 'edit'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.$confirm(`你确定要删除吗?`, '提示', {
        type: 'warning'
      })
        .then(() => {
          deleteDevice(row.id).then((response) => {
            this.$message.success('删除成功')
            this.handleFilter()
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    //打印
    handleDownload() {
      window.open('http://47.104.26.21/gongkong3/source/download.json', '_blank')

      // this.downloadLoading = true
      // import('@/vendor/Export2Excel').then((excel) => {
      //   const tHeader = ['系统设备名', '设备种类', '生产厂商', '品牌系列', '规格型号', '序列号', '质保期限', '出厂日期']
      //   const filterVal = ['deviceName', 'firm.deviceName', 'firm.name', 'firm.brand', 'firm.pattern', 'firm.number', 'firm.createTime', 'firm.expiredTime']
      //   const data = this.formatJson(filterVal)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: `设备列表(${parseTime(new Date(), '{y}-{m}-{d} {h}h{i}m{s}s')})`
      //   })
      //   this.downloadLoading = false
      // })
    },
    // selectChange(e) {
    //   var arrNew = []
    //   var dataLength = this.mineStatusValue.length
    //   var eleng = e.length
    //   for (let i = 0; i < dataLength; i++) {
    //     for (let j = 0; j < eleng; j++) {
    //       if (e[j] === this.mineStatusValue[i].label) {
    //         arrNew.push(this.mineStatusValue[i])
    //       }
    //     }
    //   }
    //   this.$refs.tree.setCheckedNodes(arrNew) //设置勾选的值
    // },
    // handleNodeClick() {
    //   let res = this.$refs.tree.getCheckedNodes(true, true) //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
    //   let arrLabel = []
    //   let tagArr = []
    //   let arr = []
    //   res.forEach((item) => {
    //     arrLabel.push(item.label)
    //     arr.push(item)
    //   })
    //   if (arr) {
    //     arr.forEach((item) => {
    //       //const res = getTagConfigs(item.id)
    //       tagArr.push(item.id)
    //     })
    //     this.idString = tagArr.join(',')
    //   }
    //   this.mineStatusValue = arr
    //   this.temp.firm.deviceName = arrLabel
    //   //console.log('arr:' + JSON.stringify(arr))
    //   //  console.log('arrLabel:' + arrLabel)

    //   this.aaaa = tagArr[0]
    //   // console.log(444, arrLabel, this.temp.firm.deviceName)
    // },
    formatJson(filterVal) {
      return this.tableData.map((obj) =>
        filterVal.map((key) => {
          const value = obj[key]
          if (key === 'status') {
            return array2Object(userStatusTypeOptions)[value]
          } else {
            return obj[key]
          }
        })
      )
    },
    handleSelectionChange(val) {
      this.idList = ''
      if (val.length) {
        val.forEach((item) => {
          this.idList += item.id + ','
        })
      } else {
        this.idList = this.idListAll
      }
      //console.log(val,this.idList, 999)
    },
    printQrcode() {
      // const res = await getQrCode(543, 1, 100)
      // console.log(this.tableData, 111)
      this.printDialogVisible = false
      console.log(this.idList)
      window.open('http://localhost:9528/api/source/getQrCode.json?deviceIds=' + this.idList + '&type=' + this.typePrint + '&size=' + this.sizePrint + '')
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .el-input {
    width: 500px;
    margin-left: 20px;
    margin-right: 100px;
  }
  .dialog-title {
    padding: 10px 20px;
    background-color: rgb(218, 237, 243);
    font-weight: bold;
  }
  .el-form {
    padding: 20px 20px 0px 20px;
  }
  .content-but {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  ::v-deep .el-drawer {
    overflow: scroll;
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
