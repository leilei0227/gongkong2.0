<template>
  <div class="content-container">
    <div class="box-select">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备种类">
          <el-select v-model="formInline.device" placeholder="设备种类">
            <el-option label="硬盘录像机" value="yingpan"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故障类型" style="margin-left: 20px">
          <el-select v-model="formInline.repair" placeholder="故障类型">
            <el-option label="超流程报警" value="baojing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间区间" style="margin-left: 20px; width: 510px">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始时间" v-model="formInline.date1" style="width: 98%"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="结束时间" v-model="formInline.date2" style="width: 98%"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-form-item label="时间间隔" style="margin-left: 0px">
            <el-select v-model="formInline.lifespan" placeholder="时间间隔">
              <el-option label="超流程报警" value="sbaojing"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary">查看统计结果</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-chart">
      <div class="title">
        <span>图形展示</span>
      </div>
      <div class="chart-box"><line-chart :chart-data="linedata" width="800px"></line-chart></div>
    </div>
    <div class="table-chart">
      <div class="title">
        <span>表格展示</span>
      </div>
      <div class="table-box">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="createTime" label="故障时间" width="200" :formatter="dataChange"> </el-table-column>
          <el-table-column prop="deviceTypeName" label="设备类型" width="200"> </el-table-column>
          <el-table-column prop="deviceName" label="设备" width="120"> </el-table-column>

          <el-table-column prop="tagDesc" label="故障类型" width="200"> </el-table-column>
          <el-table-column prop="username" label="确认人员" width="150"> </el-table-column>
          <el-table-column prop="result" label="结论" width="150"> </el-table-column>
          <el-table-column prop="errorReason" label="故障原因" width="200"> </el-table-column>

          <el-table-column label="操作">
            <template>
              <el-button size="mini">确认</el-button>
              <el-button size="mini">删除</el-button>
              <el-button size="mini">故障联络单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="box-button">
      <el-button type="primary">打印结果</el-button>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Charts/LineChart'
import { parseTime } from '@/utils'
import { errorList } from '@/api/analysis'
export default {
  name: 'Analysis-device',
  components: {
    LineChart
  },
  data() {
    return {
      createTim: '',
      linedata: [
        { name: '协议分析', value: 30 },
        { name: '木马攻击', value: 20 },
        { name: '拒绝服务攻击', value: 30 },
        { name: 'finger服务攻击', value: 40 },
        { name: '远程服务攻击', value: 20 },
        { name: '其他', value: 10 },
        { name: '协议分析1', value: 30 },
        { name: '木马攻击1', value: 20 },
        { name: '拒绝服务攻击1', value: 30 },
        { name: 'finger服务攻击1', value: 40 },
        { name: '远程服务攻击1', value: 20 },
        { name: '其他1', value: 10 }
      ],
      formInline: {
        device: '',
        repair: '',
        lifespan: '',
        date1: '',
        date2: ''
      },
      tableData: []
    }
  },
  created() {
    this.errorList()
  },
  methods: {
    async errorList() {
      const res = await errorList()
      this.tableData = res.data
    },
    dataChange(row) {
      return parseTime(new Date(row.createTime), '{y}-{m}-{d} {h}:{i}:{s}')
      // var rdata = row
      // console.log(rdata)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .box-select {
    width: 100%;
    padding: 20px;
  }
  .box-chart {
    width: 100%;
    padding: 20px;
    padding-top: 0px;
    .chart-box {
      height: 300px;
      margin-left: 200px;
      margin-right: 200px;
    }
  }
  .table-chart {
    width: 100%;
    padding: 20px;
    padding-top: 0px;
    .table-box {
      padding-top: 10px;
      ::v-deep .el-table td {
        text-align: center;
      }
      ::v-deep .el-table th {
        text-align: center;
      }
    }
  }
  .box-button {
    padding: 20px;
    padding-top: 0px;
    .el-button {
      margin-left: 45%;
    }
  }
}
</style>
