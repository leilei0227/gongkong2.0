<template>
  <div class="content-container">
    <div class="content-but">
      <div class="box-select">
        <el-select v-model="value" placeholder="请选择" style="width: 180px; margin-right: 10px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-input v-model="input" style="width: 200px; margin-right: 10px" placeholder="请输入内容"></el-input>
        <el-button type="primary" style="width: 50px; height: 40px" icon="el-icon-search"></el-button>
      </div>
    </div>
    <div class="content-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="#" width="150"> </el-table-column>
        <el-table-column prop="name" label="系统设备名" width="150">
          <template slot-scope="scope">
            <a @click="dialogTableVisible = true" style="color: #409eff; cursor: pointer">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="class" label="设备种类" width="130"> </el-table-column>
        <el-table-column prop="producer" label="生产厂商" width="130"> </el-table-column>
        <el-table-column prop="brand" label="品牌系列" width="150"> </el-table-column>
        <el-table-column prop="isoid" label="规格型号" width="150"> </el-table-column>
        <el-table-column prop="sqid" label="序列号" width="150"> </el-table-column>
        <el-table-column prop="datestart" label="维护开始时间" width="150"> </el-table-column>
        <el-table-column prop="dateend" label="维护结束时间" width="150"> </el-table-column>
        <el-table-column prop="datenext" label="下次维护时间" width="150"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template>
            <el-button type="text" plain @click="dialogVisible = true">设备维护</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogTableVisible" width="1500px">
        <div class="dialog-title">厂商</div>
        <el-form ref="form" style="padding-top: 10px; padding-bottom: 10px">
          <el-form-item>
            <span>设备种类</span>
            <el-input v-model="form.name" style="width: 300px"></el-input>
            <span>系统设备名</span>
            <el-input v-model="form.name" style="width: 300px"></el-input>
            <span>物联标识</span>
            <el-input v-model="form.name" style="width: 300px; margin-right: 20px"></el-input>
          </el-form-item>
          <el-form-item>
            <span>生产厂商</span>
            <el-input v-model="form.name" style="margin-right: 210px"></el-input>
            <span>序列号</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>品牌系列</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>规格型号</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>技术参数</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>出厂日期</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>质保期限</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>订单编号</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>联系方式</span>
            <el-input v-model="form.name" style="margin-right: 225px"></el-input>
            <span>地址</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-title">集成</div>
        <el-form ref="form" style="padding-top: 10px; padding-bottom: 10px">
          <el-form-item>
            <span>集成厂商</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>项目编号</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>项目名称</span>
            <el-input v-model="form.name" style="margin-right: 190px"></el-input>
            <span>主配件SN</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>机柜编号</span>
            <el-input v-model="form.name" style="margin-right: 225px"></el-input>
            <span>地址</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>联系方式</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-title">安装</div>
        <el-form ref="form" style="padding-top: 10px; padding-bottom: 10px">
          <el-form-item>
            <span>总包单位</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>设计单位</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>采办单位</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>施工单位</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>入库时间</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>安装日期</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>安装地点</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>合同编号</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item>
            <span>联系方式</span>
            <el-input v-model="form.name" style="margin-right: 225px"></el-input>
            <span>地址</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-title">使用</div>
        <el-form ref="form" style="padding-top: 10px; padding-bottom: 10px">
          <el-form-item>
            <span>业主</span>
            <el-input v-model="form.name" style="margin-left: 50px; margin-right: 195px"></el-input>
            <span>物质编号</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>部门</span>
            <el-input v-model="form.name" style="margin-left: 50px; margin-right: 195px"></el-input>
            <span>设备状态</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>验收日期</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>投产日期</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>质保期限</span>
            <el-input v-model="form.name" style="margin-right: 195px"></el-input>
            <span>报废日期</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>负责人</span>
            <el-input v-model="form.name" style="margin-left: 35px; margin-right: 195px"></el-input>
            <span>使用时间</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <span>联系方式</span>
            <el-input v-model="form.name" style="margin-right: 225px"></el-input>
            <span>地址</span>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 40%" @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogStatus === 'add' ? createData() : updateData()">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible" width="800px">
        <el-form ref="form" label-width="100px">
          <el-form-item label="维护开始时间">
            <el-input v-model="form.startTime"></el-input>
          </el-form-item>
          <el-form-item label="维护结束时间">
            <el-input v-model="form.endTime"></el-input>
          </el-form-item>
          <el-form-item label="维护记录">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { alarmList } from '@/api/device'
export default {
  name: 'Device-list',
  data() {
    return {
      input: '',
      dialogVisible: false,
      dialogTableVisible: false,
      form: { startTime: '', endTime: '', desc: '' },
      options: [
        {
          value: '1',
          label: '事件名称'
        }
      ],
      value: '',
      tableData: [
        /*  {
          id: '1',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        },
        {
          id: '2',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        },
        {
          id: '3',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        },
        {
          id: '4',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        },
        {
          id: '5',
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          datestart: '2002-02-21',
          dateend: '2020-02-21',
          datenext: '2050-02-01'
        } */
      ]
    }
  },

  created() {
    this.alarmList()
  },
  methods: {
    async alarmList() {
      const res = await alarmList(3)
      this.tableData = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .content-but {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
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
