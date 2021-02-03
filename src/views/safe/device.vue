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
        <el-table-column prop="name" label="设备名称" width="220">
          <template slot-scope="scope">
            <a @click="dialogPvVisible = true" style="color: blue; cursor: pointer">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
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
      <el-dialog width="1200px" :visible.sync="dialogPvVisible">
        <div slot="title" class="dialog-t">
          <span>防火墙1</span>
          <el-button type="primary" @click="dialogTableVisible = true">溯源管理</el-button>
        </div>
        <div class="dialog-title">基本信息</div>
        <div style="padding: 10px">
          <span style="margin-right: 30px">设备名称:防火墙1</span>
          <span style="margin-right: 30px">设备种类：安全设备</span>
          <span style="margin-right: 30px">系统运行时间：3800s</span>
          <span style="margin-right: 30px">系统序列号：xxxxxxxxxxxx</span>
          <span style="margin-right: 30px">软件版本：xxxxxxxxxxx</span>
          <span style="margin-right: 30px">上个设备：服务器3</span>
          <span style="margin-right: 30px">是否监控：是</span>
        </div>
        <div class="dialog-title">故障信息</div>
        <div style="padding: 10px">
          <el-table :data="dialogData" border style="width: 100%">
            <el-table-column prop="gztime" label="故障时间"></el-table-column>
            <el-table-column prop="gzname" label="变量名"></el-table-column>
            <el-table-column prop="pv" label="PV"></el-table-column>
            <el-table-column prop="gzdiscuss" label="变量描述"></el-table-column>
            <el-table-column prop="gzclass" label="故障类型"></el-table-column>
            <el-table-column prop="gzman" label="确认人员"></el-table-column>
            <el-table-column prop="gztrue" label="确认故障"></el-table-column>
            <el-table-column prop="gzresult" label="结论"></el-table-column>
            <el-table-column prop="gzlianluo" label="故障联络单"></el-table-column>
          </el-table>
        </div>
        <div class="dialog-title">监控指标</div>
        <div class="chart-box" style="padding: 10px">
          <div class="chart-mini">
            <yibiao-chart :chart-data="yibiaodata"> </yibiao-chart>
          </div>
          <div class="chart-mini"><wendu-chart></wendu-chart></div>
          <div class="chart-mini"><xline-chart></xline-chart></div>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogTableVisible">
        <el-tabs v-model="activeName" @tab-click="handleClick">
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
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import YibiaoChart from '@/components/Charts/YibiaoChart'
import WenduChart from '@/components/Charts/WenduChart'
import XlineChart from '@/components/Charts/XlineChart'
export default {
  name: 'Safe-device',
  components: {
    YibiaoChart,
    WenduChart,
    XlineChart
  },
  data() {
    return {
      yibiaodata: 40,
      dialogPvVisible: false,
      dialogTableVisible: false,
      activeName: 'second',
      input: '',
      form: { name: '' },
      options: [
        {
          value: '1',
          label: '设备名称'
        }
      ],
      value: '',
      dialogData: [
        {
          gztime: '',
          gzname: '',
          pv: '',
          gzdiscuss: '',
          gzclass: '',
          gzman: '',
          gztrue: '',
          gzresult: '',
          gzlianluo: ''
        },
        {
          gztime: '',
          gzname: '',
          pv: '',
          gzdiscuss: '',
          gzclass: '',
          gzman: '',
          gztrue: '',
          gzresult: '',
          gzlianluo: ''
        },
        {
          gztime: '',
          gzname: '',
          pv: '',
          gzdiscuss: '',
          gzclass: '',
          gzman: '',
          gztrue: '',
          gzresult: '',
          gzlianluo: ''
        }
      ],
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
  .dialog-t {
    width: 98%;
    display: flex;
    justify-content: space-between;
  }
  .el-input {
    width: 300px;
    margin-left: 10px;
    margin-right: 90px;
  }
  .dialog-title {
    padding: 10px;
    background-color: rgb(218, 237, 243);
    font-weight: bold;
  }
  .chart-box {
    display: flex;
    justify-content: space-between;
    .chart-mini {
      width: 33%;
    }
  }
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
