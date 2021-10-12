<template>
  <div class="content-container">
    <div class="content-head">
      <div class="box-select">
        <el-select v-model="value" placeholder="维护范围">
          <el-option key="1" label="调控中心" value="1" />
          <el-option key="2" label="场站" value="2" />
          <el-option key="3" label="阀室" value="3" />
      </el-select>
      <el-select v-model="value" placeholder="维护周期" @change="getOpData">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-date-picker v-model="value_select" :type="selectType" placeholder="选择日期" @change="getOpData"> </el-date-picker>
      <el-select v-if="value === 3" v-model="checkType">
        <el-option v-for="item in checkOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="getType">
        <el-option v-for="item in getTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary">获取</el-button>
      </div>
      <div class="box-but">
        <el-button type="primary">确认并上传</el-button>
      <el-button type="primary" plain>打印表单</el-button>
      </div>
      
    </div>
    <div class="content-table">
      <el-table :data="tableData" style="width: 98%; margin-left: 1%">
        <el-table-column
          ><template #header> <span v-text="'站场名称：' + value1"></span></template>
          <el-table-column>
            <template #header> <span v-text="'检察人员：' + value3"></span></template><el-table-column align="center" label="序号" width="100" prop="value" type="index"></el-table-column> <el-table-column width="250" align="center" prop="projectName" label="检查项目"></el-table-column>
            <el-table-column align="center" prop="itemDesc" label="检查内容"></el-table-column></el-table-column
        ></el-table-column>
        <el-table-column
          ><template #header> <span v-text="'维护周期：' + label"></span></template>
          <el-table-column
            ><template #header> <span v-text="'检查日期：' + checkDate"></span></template>
            <el-table-column align="center" v-if="value === 1 || value === 2" width="200" label="检查值" prop="value"></el-table-column>
            <el-table-column align="center" v-if="value === 1 || value === 2" width="300" label="参考范围" prop="suggestion"></el-table-column>
            <el-table-column align="center" label="检查结果" prop="value">
              <template>
                <el-radio v-model="radio" label="1">正常</el-radio>
                <el-radio v-model="radio" label="2">异常</el-radio>
              </template>
            </el-table-column></el-table-column
          ></el-table-column
        >
      </el-table>
      
    </div>
  </div>
</template>

<script>
import { getOpData, getUnit, getOpData2, getOpData3, getCommittedData3, getCommittedData2, getCommittedData } from '@/api/patrol'
import { parseTime, parseDate, parseMonth, parseYear } from '@/utils'
export default {
  name: 'Monitor-autocontrol',
  data() {
    return {
      options: [
        {
          value: 1,
          label: '1天'
        },
        {
          value: 2,
          label: '1月'
        },
        {
          value: 3,
          label: '6月'
        },
        {
          value: 4,
          label: '36月'
        }
      ],
      checkOptions: [
        {
          value: 1,
          label: '春检'
        },
        {
          value: 2,
          label: '秋检'
        }
      ],
      getTypeOptions: [
        {
          value: 1,
          label: '当前数据'
        },
        {
          value: 2,
          label: '已上传数据'
        }
      ],
      value: 1,
      checkType: 1,
      getType: 1,
      value_select: new Date(),
      tableData: [],
      value1: '',
      value2: '',
      value3: '管理员',
      value4: '',
      radio: ''
    }
  },
  created() {
    this.getOpData()
    this.getUnit()
  },
  computed: {
    label: function () {
      if (this.value == 1) {
        return '1天'
      } else if (this.value == 2) {
        return '1月'
      } else if (this.value == 3) {
        return '6月'
      } else if (this.value == 4) {
        return '36月'
      }
    },
    selectType: function () {
      if (this.value == 1) {
        return 'date'
      } else if (this.value == 2) {
        return 'month'
      } else if (this.value == 3) {
        return 'year'
      } else if (this.value == 4) {
        return 'year'
      }
    },
    checkDate: function () {
      if (this.value == 1) {
        return parseDate(this.value_select)
      } else if (this.value == 2) {
        return parseMonth(this.value_select)
      } else if (this.value == 3) {
        let str = parseYear(this.value_select)
        if (this.checkType == 1) {
          return str + '春检'
        } else if (this.checkType == 2) {
          return str + '秋检'
        }
      } else if (this.value == 4) {
        let start = parseYear(this.value_select)
        let end = parseInt(start) + 3
        return start + '  -  ' + end
      }
    }
  },
  methods: {
    async getOpData() {
      if (this.value == 1) {
        const res = await getOpData(1, parseDate(this.value_select), 1)
        this.tableData = res.data
      } else if (this.value == 2) {
        const res = await getOpData3(2, this.value_select.getFullYear() + '-' + (this.value_select.getMonth() + 1), 1)
        this.tableData = res.data
      } else if (this.value == 3) {
        const res = await getOpData3(3, this.value_select.getFullYear() + '-' + (this.value_select.getMonth() + 1), 1)
        this.tableData = res.data
      } else if (this.value == 4) {
        const res = await getOpData2(4, this.value_select.getFullYear(), 1)
        this.tableData = res.data
      }

      //console.log(111, this.tableData)
    },
    async getUnit() {
      const res = await getUnit(1)
      this.value1 = res.data.name
      this.value2 = res.data.siteType
      // this.value3 = res.data.name
      this.value4 = parseTime(new Date())
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  padding: 0px 0px 15px 0px;
  .content-head {
    padding: 15px;
    height: 15%;
    display: flex;
    justify-content: space-between;
    .el-select {
      margin-right: 10px;
    }
    .el-input {
      margin-right: 10px;
    }
  }
  
  .content-table {
    ::v-deep .el-table td > .cell {
      text-align: center;
    }
  }
}
</style>
