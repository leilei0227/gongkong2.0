<template>
  <div class="content-container">
    <div class="tree-container">
      <div class="tree-title">设备列表</div>
      <el-tree :data="treeData" node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick" :props="defaultProps"> </el-tree>
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
          <div>
            <el-button v-if="xianchangShow" type="primary">485诊断</el-button>
            <el-button type="primary" @click="dialogTableVisible = true">溯源管理</el-button>
          </div>
        </div>
        <el-form :inline="true" ref="dataForm3" model="temp3">
          <div class="dialog-title">
            <div class="blue-block"></div>
            基本信息
          </div>

          <el-form-item style="margin-left: 35px" label="设备名称:">
            <span v-text="temp3.deviceName"></span>
          </el-form-item>
          <el-form-item style="margin-left: 50px" label="设备种类:"> <span v-text="temp3.deviceTypeName"></span></el-form-item>
          <el-form-item v-if="ITshow" style="margin-left: 50px" label="MAC地址:"> <span v-text="temp3.mac"></span></el-form-item>
          <el-form-item v-if="ITshow" style="margin-left: 50px" label="IP地址："> <span v-text="temp3.ip"></span></el-form-item>
          <el-form-item v-if="ITshow" style="margin-left: 50px" label="上个设备："> <span v-text="temp3.deviceTypeName"></span></el-form-item>
          <el-form-item v-if="ITshow" style="margin-left: 50px" label="是否监控："> <span v-text="temp3.deviceTypeName"></span></el-form-item>
          <el-form-item v-if="ITshow" style="margin-left: 50px" label="白名单 ："> <span v-text="temp3.whiteList"></span></el-form-item>
          <el-form-item v-if="ITshow" style="margin-left: 35px" label="黑名单："> <span v-text="temp3.blackList"></span></el-form-item>

          <div class="dialog-title" v-if="xianchangShow">
            <div class="blue-block"></div>
            仪表回路
          </div>
          <link-chart v-if="xianchangShow" :chart-data="linkData" :chart-line="linkLine"></link-chart>
          <div class="dialog-title" v-if="!xianchangShow">
            <div class="blue-block"></div>
            故障信息
          </div>
          <div style="padding: 10px" v-if="!xianchangShow">
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
        <div class="dialog-title" v-if="xianchangShow">
          <div class="blue-block"></div>
          监控信息
        </div>
        <div style="padding: 10px" v-if="xianchangShow">
          <el-table :data="tableData2" border style="width: 98%">
            <el-table-column prop="name" label="监控项"></el-table-column>
            <el-table-column prop="tags" label="状态"></el-table-column>
            <!-- <el-table-column prop="tagValue" label="PV"></el-table-column>
            <el-table-column prop="tagDesc" label="变量描述"></el-table-column>
            <el-table-column prop="errorDesc" label="故障类型"></el-table-column>
            <el-table-column prop="username" label="确认人员"></el-table-column> -->
            <!-- <el-table-column prop="gztrue" label="确认故障"></el-table-column>
              <el-table-column prop="gzresult" label="结论"></el-table-column>
              <el-table-column prop="gzlianluo" label="故障联络单"></el-table-column> -->
          </el-table>
        </div>
        <div class="dialog-title" v-if="xianchangShow">
          <div class="blue-block"></div>
          智能诊断
        </div>
        <div style="padding: 10px" v-if="xianchangShow">
          <el-table :data="tableDataMon" border style="width: 98%">
            <el-table-column prop="advice" label="初步结论"></el-table-column>
            <el-table-column prop="id" label="指导建议"></el-table-column>

            <!-- <el-table-column prop="tagValue" label="PV"></el-table-column>
              <el-table-column prop="tagDesc" label="变量描述"></el-table-column>
              <el-table-column prop="errorDesc" label="故障类型"></el-table-column>
              <el-table-column prop="username" label="确认人员"></el-table-column> -->
            <!-- <el-table-column prop="gztrue" label="确认故障"></el-table-column>
              <el-table-column prop="gzresult" label="结论"></el-table-column>
              <el-table-column prop="gzlianluo" label="故障联络单"></el-table-column> -->
          </el-table>
        </div>
        <div v-if="ITshow" class="dialog-title">
          <div class="blue-block"></div>
          监控指标
        </div>
        <div class="chart-box" v-if="ITshow" style="padding: 10px">
          <div class="chart-mini">
            <yibiao-chart :chart-data="yibiaoData" width="260px" height="200px"> </yibiao-chart>
          </div>
          <div class="chart-mini"><xline-chart width="260px" height="200px" :chart-data="lineData"></xline-chart></div>
          <div class="chart-mini"><zhuxing-chart width="260px" height="200px" :chart-data="zhuxingData"></zhuxing-chart></div>
        </div>
        <zhexian-chart v-if="ITshow" :chart-data="zhexianData" width="1200px"> </zhexian-chart>
      </el-drawer>
      <el-dialog :visible.sync="dialogTableVisible">
        <el-tabs v-model="activeName">
          <el-tab-pane label="厂商" name="first">
            <el-form model="firm">
              <el-form-item>
                <span class="spanTag">物联标识</span>
                <el-input v-model="firm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">生产厂商</span>
                <el-input v-model="firm.brand"></el-input>
                <span class="spanTag" style="margin-right: 30px"> 序列号</span>
                <el-input v-model="firm.number"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">设备种类</span>
                <el-input v-model="firm.deviceName"></el-input>
                <span class="spanTag">品牌系列</span>
                <el-input v-model="firm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">规格型号</span>
                <el-input v-model="firm.pattern"></el-input>
                <span class="spanTag">技术参数</span>
                <el-input v-model="firm.params"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">出厂日期</span>
                <el-input v-model="firm.createTime"> </el-input>
                <span class="spanTag">质保期限</span>
                <el-input v-model="firm.expiredTime"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">订单编号</span>
                <el-input v-model="firm.orderNo"></el-input>
                <span class="spanTag">联系方式</span>
                <el-input v-model="firm.contact"></el-input>
              </el-form-item>
              <el-form-item> <span class="spanTag" style="margin-right: 40px">地址 </span> <el-input v-model="firm.address"></el-input></el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="集成" name="second">
            <el-form model="integrator">
              <el-form-item>
                <span class="spanTag">物联标识</span>
                <el-input v-model="integrator.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">集成厂商</span>
                <el-input v-model="integrator.name"></el-input>
                <span class="spanTag">项目编号</span>
                <el-input v-model="integrator.projectNo"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">项目名称</span>
                <el-input v-model="integrator.projectName"></el-input>
                <span class="spanTag" style="margin-right: 10px">主配件SN</span>
                <el-input v-model="integrator.snCode"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">机柜编号</span>
                <el-input v-model="integrator.cabinetNo"></el-input>
                <span class="spanTag" style="margin-right: 40px">地址</span>
                <el-input v-model="integrator.address"></el-input>
              </el-form-item>
              <el-form-item> <span class="spanTag">联系方式</span> <el-input v-model="integrator.contact"></el-input></el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="安装" name="third">
            <el-form model="installer">
              <el-form-item>
                <span class="spanTag">物联标识</span>
                <el-input v-model="installer.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">总包单位</span>
                <el-input v-model="installer.packageUnit"></el-input>
                <span class="spanTag">设计单位</span>
                <el-input v-model="installer.designUnit"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">采办单位</span>
                <el-input v-model="installer.purchaseUnit"></el-input>
                <span class="spanTag">施工单位</span>
                <el-input v-model="installer.executeUnit"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">入库时间</span>
                <el-input v-model="installer.entryDate"></el-input>
                <span class="spanTag">安装日期</span>
                <el-input v-model="installer.installDate"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">安装地点</span>
                <el-input v-model="installer.installAddress"></el-input>
                <span class="spanTag">合同编号</span>
                <el-input v-model="installer.contractNo"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">联系方式</span>
                <el-input v-model="installer.contact"></el-input>
                <span class="spanTag" style="margin-right: 40px">地址</span>
                <el-input v-model="installer.address"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="使用" name="fourth">
            <el-form model="owner">
              <el-form-item>
                <span class="spanTag">物联标识</span>
                <el-input v-model="owner.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag" style="margin-left: 30px">业主</span>
                <el-input v-model="owner.name"></el-input>
                <span class="spanTag">物质编号</span>
                <el-input v-model="owner.assetNo"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag" style="margin-left: 30px">部门</span>
                <el-input v-model="owner.department"></el-input>
                <span class="spanTag">设备状态</span>
                <el-input v-model="owner.deviceStatus"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">验收日期</span>
                <el-input v-model="owner.acceptDate"></el-input>
                <span class="spanTag">投产日期</span>
                <el-input v-model="owner.productDate"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">质保期限</span>
                <el-input v-model="owner.expiration"></el-input>
                <span class="spanTag">报废日期</span>
                <el-input v-model="owner.discardDate"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">下次维护</span>
                <el-input v-model="owner.repairDate"></el-input>
                <span class="spanTag">下次检定</span>
                <el-input v-model="owner.checkDate"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">维护记录</span>
                <el-input v-model="owner.repairRecord" style="width: 585px"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">检定记录</span>
                <el-input v-model="owner.checkRecord" style="width: 585px"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag" style="margin-left: 12px">负责人</span>
                <el-input v-model="owner.chargeUser"></el-input>
                <span class="spanTag">联系方式</span>
                <el-input v-model="owner.contact"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag" style="margin-left: 30px">地址</span>
                <el-input v-model="owner.address"></el-input>
              </el-form-item>
              <!-- <el-form-item>
                <span class="spanTag">维护开始时间</span>
                <el-input v-model="owner.name" style="margin-right: 20px"></el-input>
                <span class="spanTag">维护结束时间</span>
                <el-input v-model="owner.name"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="spanTag">检定开始时间</span>
                <el-input v-model="owner.name" style="margin-right: 20px"></el-input>
                <span class="spanTag">检定结束时间</span>
                <el-input v-model="owner.name"></el-input>
              </el-form-item> -->
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="查看轨迹" name="checkrouth">
            <el-form model="form">
              <el-form-item>
                <span class="spanTag">物联标识</span>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <linemap-chart width="800px" height="600px"></linemap-chart>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { errorList, save, confirmError, saveResult, getForm, myErrorList, getUserListT, getUserList, getDevice, getDeviceByLink, recycleList, deviceInfo, estimate } from '@/api/monitor'
import { subList } from '@/api/mautocontrol'
import { getNewTopology } from '@/api/topo'
import LinkChart from '@/components/Charts/LinkChart'
import YibiaoChart from '@/components/Charts/YibiaoChart'
import ZhuxingChart from '@/components/Charts/ZhuxingChart'
import XlineChart from '@/components/Charts/XlineChart'
import ZhexianChart from '@/components/Charts/ZhexianChart'
import LinemapChart from '@/components/Charts/LinemapChart'
import { parseTime } from '@/utils'
import { toThousandFilter } from '@/filters'
//import { errorList } from '@/api/analysis'
export default {
  name: 'Monitor-autocontrol',
  components: { LinkChart, YibiaoChart, ZhuxingChart, XlineChart, ZhexianChart, LinemapChart },
  data() {
    return {
      treeAllData: [],
      linkData: [],
      linkLine: [],
      treeData: [],
      zhexianData: [],
      yibiaoData: 0,
      lineData: 0,
      zhuxingData: 0,
      dialogVisibleEdit: false,
      dialogVisibleTable: false,
      dialogPvVisible: false,
      dialogTableVisible: false,
      xianchangShow: false,
      ITshow: false,
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
        mac: '',
        ip: '',
        blackList: '',
        whiteList: '',
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
      tableData2: [],
      tableDataMon: [],
      activeName: 'second',
      input: '',
      form: { name: '' },
      firm: { address: '', brand: '', contact: '', createTime: undefined, deviceId: undefined, deviceName: '', expiredTime: undefined, id: undefined, lat: '', lng: '', name: '', number: '', orderNo: '', params: '', pattern: '' },
      installer: { address: '', contact: '', contractNo: '', designUnit: '', deviceId: undefined, entryDate: undefined, executeUnit: '', id: undefined, installAddress: '', installDate: undefined, lat: '', lng: '', packageUnit: '', purchaseUnit: '' },
      integrator: { address: '', cabinetNo: '', contact: '', deviceId: undefined, id: undefined, lat: '', name: '', projectName: '', projectNo: '', snCode: '' },
      owner: { acceptDate: undefined, address: '', assetNo: '', chargeUser: '', checkDate: undefined, checkRecord: '', contact: '', department: '', deviceId: undefined, deviceStatus: undefined, discardDate: undefined, expiration: undefined, id: undefined, lat: '', lng: '', name: '', productDate: undefined, repairDate: undefined, repairRecord: '' },
      firmTemp: { address: '', brand: '', contact: '', createTime: undefined, deviceId: undefined, deviceName: '', expiredTime: undefined, id: undefined, lat: '', lng: '', name: '', number: '', orderNo: '', params: '', pattern: '' },
      installerTemp: { address: '', contact: '', contractNo: '', designUnit: '', deviceId: undefined, entryDate: undefined, executeUnit: '', id: undefined, installAddress: '', installDate: undefined, lat: '', lng: '', packageUnit: '', purchaseUnit: '' },
      integratorTemp: { address: '', cabinetNo: '', contact: '', deviceId: undefined, id: undefined, lat: '', name: '', projectName: '', projectNo: '', snCode: '' },
      ownerTemp: {
        acceptDate: undefined,
        address: '',
        assetNo: '',
        chargeUser: '',
        checkDate: undefined,
        checkRecord: '',
        contact: '',
        department: '',
        deviceId: undefined,
        deviceStatus: undefined,
        discardDate: undefined,
        expiration: undefined,
        id: undefined,
        lat: '',
        lng: '',
        name: '',
        productDate: undefined,
        repairDate: undefined,
        repairRecord: ''
      }
    }
  },
  created() {
    this.getList()
    this.getTreeList()
    this.getNewTopology()
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
      //  console.log(6767, row)
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
    async getNewTopology() {
      const res = await getNewTopology()
      let temp_data = res.data
      if (temp_data.children) {
        this.tableData2 = temp_data.children
      }
      console.log(888888888888, this.tableData2)
    },
    async drawerEdit(id, pid) {
      // this.getNewTopology()
      // console.log(898, id,pid)
      this.xianchangShow = false
      this.tableData1 = []
      this.ITshow = false
      this.linkData = []
      this.linkLine = []
      this.zhexianData = []
      const res = await getDevice(id)
      // console.log(1111, res.data)
      this.temp3.deviceName = res.data.name
      this.temp3.deviceTypeName = res.data.typeName
      this.temp3.mac = res.data.uuid
      this.temp3.ip = res.data.extra
      this.yibiaoData = 0
      this.lineData = 0
      this.zhuxingData = 0
      const res5 = await getDeviceByLink(id)
      if (res5.data) {
        this.firm = res5.data.firm
        this.firm.createTime = parseTime(this.firm.createTime, '{y}-{m}-{d}')
        this.firm.expiredTime = parseTime(this.firm.expiredTime, '{y}-{m}-{d}')
        this.installer = res5.data.installer
        this.installer.installDate = parseTime(this.installer.installDate, '{y}-{m}-{d}')
        this.installer.entryDate = parseTime(this.installer.entryDate, '{y}-{m}-{d}')
        this.integrator = res5.data.integrator
        this.owner = res5.data.owner
        this.owner.acceptDate = parseTime(this.owner.acceptDate, '{y}-{m}-{d}')
        this.owner.checkDate = parseTime(this.owner.checkDate, '{y}-{m}-{d}')
        this.owner.discardDate = parseTime(this.owner.discardDate, '{y}-{m}-{d}')
        this.owner.repairDate = parseTime(this.owner.repairDate, '{y}-{m}-{d}')
        this.owner.expiration = parseTime(this.owner.expiration, '{y}-{m}-{d}')
        this.owner.productDate = parseTime(this.owner.productDate, '{y}-{m}-{d}')
      } else {
        this.firm = this.firmTemp

        this.installer = this.installerTemp
        this.integrator = this.integratorTemp
        this.owner = this.ownerTemp
        // console.log(8989, this.ownerTemp, this.owner)
      }
      // let list = res.data.deviceExtend
      // this.temp3.whiteList = list.whiteList
      // this.temp3.blackList = list.blackList
      // console.log(88888, list.whiteList)
      let data1 = { deviceId: id }
      const res1 = await errorList(data1)
      this.tableData1 = res1.data
      // console.log(88888888, this.tableData1)
      if (pid == 3) {
        const res2 = await recycleList(id)
        const res8 = await estimate(id)
        this.tableDataMon = res8.data
        console.log(90, this.tableDataMon)

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
        // console.log(12234444, this.linkData)
      }
      if (pid == 1) {
        this.ITshow = true
        let list = res.data.deviceExtend
        this.temp3.whiteList = list.whiteList
        this.temp3.blackList = list.blackList
        // console.log(999, this.temp3.mac)
        let vvv = this.temp3.mac
        const res4 = await deviceInfo(vvv)
        // console.log(45, res4.data)

        if (res4.data == null) {
          this.yibiaoData = 0
          this.lineData = 0
          this.zhuxingData = 0
          this.zhexianData = []
        } else {
          this.yibiaoData = this.getNum(res4.data.cpuUsage)
          this.lineData = this.getNum(res4.data.memUsage)
          this.zhuxingData = this.getNum(res4.data.diskUsage)
          const arr = res4.data.netUsages
          arr.forEach((item) => {
            let time = parseTime(item.time)
            let up = parseInt(item.upUsage.split('B')[0]) / 1000
            let upUsage = up.toFixed(2)
            let down = parseInt(item.downUsage.split('B')[0]) / 1000
            let downUsage = down.toFixed(2)
            this.zhexianData.push({ time, upUsage, downUsage })
          })
          console.log(100, this.zhexianData)
        }

        // console.log(444, res5)
        //  console.log(676, this.yibiaoData)

        // console.log(999, this.yibiaoData)
      }
      this.dialogPvVisible = true
    },
    getNum(str) {
      var str_ = str.replace('%', '')
      // str_ = str_ * 100
      return parseFloat(str_)
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
        // console.log('盘台', data.id)
      } else if (data.pid == 3) {
        // console.log('现场设备')
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
    .chart-box {
      display: flex;
      justify-content: space-around;
      .chart-mini {
        width: 260px;
        height: 200px;
        border: 1px solid #ebeef5;
      }
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
    .el-dialog {
      .spanTag {
        display: inline-block;
        margin-right: 15px;
        //  color: #409eff;
      }
      .el-input {
        margin-right: 150px;
      }
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
  ::v-deep .el-drawer {
    //-webkit-box-sizing: border-box;
    overflow: scroll;
  }
}
</style>
