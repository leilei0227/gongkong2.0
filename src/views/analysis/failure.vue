<template>
  <div class="content-container">
    <div class="box-select">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备种类">
          <el-select v-model="formInline.device" placeholder="设备种类" multiple collapse-tags @change="selectChange">
            <el-option :value="mineStatusValue" style="height: auto">
              <el-tree :data="treeData" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps" @check-change="handleNodeClick"></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="故障类型" style="margin-left: 0px">
          <el-select v-model="formInline.lifespan" placeholder="时间间隔" style="width: 120px">
            <el-option v-for="item in TimeList" :key="item.key" :label="item.optionName" :value="item.key"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="图表类型" style="margin-left: 20px">
          <el-select v-model="formInline.repair" placeholder="图表类型">
            <el-option v-for="item in tableList" :key="item.key" :label="item.optionName" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间区间" style="margin-left: 20px">
          <el-col :span="11">
            <el-date-picker type="year" placeholder="开始时间" v-model="formInline.date1" style="width: 98%"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11">
            <el-date-picker type="year" placeholder="结束时间" v-model="formInline.date2" style="width: 98%"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-form-item label="时间间隔" style="margin-left: 0px">
            <el-select v-model="formInline.lifespan" placeholder="时间间隔">
              <el-option v-for="item in TimeList" :key="item.key" :label="item.optionName" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="getPicture()">查看统计结果</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-chart">
      <div class="title">
        <span>图形展示</span>
      </div>

      <div class="chart-box"><line-chart :chart-data="linedata" :typeClass="typeC" width="800px"></line-chart></div>
    </div>
    <div class="table-chart">
      <div class="title">
        <span>表格展示</span>
      </div>
      <div class="table-box">
        <el-table :data="linedata" border style="width: 80%">
          <el-table-column prop="name" label="日期"> </el-table-column>
          <el-table-column v-for="(item, index) in this.tagHeader" :prop="item" :label="item" :key="index"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="box-button">
      <el-button type="primary" @click="PrintPage">打印结果</el-button>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/autocontrol'
import LineChart from '@/components/Charts/LineChart'
import { parseTime } from '@/utils'
import { errorList, statistics } from '@/api/analysis'
import { getTagConfigs } from '@/api/autocontrol'

export default {
  name: 'Analysis-device',
  components: {
    LineChart
  },
  data() {
    return {
      idString: '',
      typeC: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // tableHeadName: '',
      treeAllData: [],
      treeData: [],
      mineStatus: '',
      mineStatusValue: [],
      createTim: '',
      linedata: [],
      tableData: [],
      tagHeader: [],
      //category: [],
      formInline: {
        device: '',
        repair: '',
        lifespan: '',
        date1: '',
        date2: ''
      },
      //tableData: [],
      tableList: [
        { key: '1', optionName: '折线图' },
        { key: '2', optionName: '柱形图' }
      ],
      TimeList: [
        { key: '1', optionName: '月' },
        { key: '2', optionName: '季度' },
        { key: '3', optionName: '年' }
      ]
    }
  },
  created() {
    // this.errorList()
    this.list()
  },
  methods: {
    async list() {
      const res = await list()
      this.treeAllData = res.data
      this.treeData = this.getTree(this.treeAllData, 0)
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
    selectChange(e) {
      var arrNew = []
      var dataLength = this.mineStatusValue.length
      var eleng = e.length
      for (let i = 0; i < dataLength; i++) {
        for (let j = 0; j < eleng; j++) {
          if (e[j] === this.mineStatusValue[i].label) {
            arrNew.push(this.mineStatusValue[i])
          }
        }
      }
      this.$refs.tree.setCheckedNodes(arrNew) //设置勾选的值
    },
    handleNodeClick() {
      let res = this.$refs.tree.getCheckedNodes(true, true) //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let arrLabel = []
      let tagArr = []
      let arr = []
      res.forEach((item) => {
        arrLabel.push(item.label)
        arr.push(item)
      })
      if (arr) {
        arr.forEach((item) => {
          //const res = getTagConfigs(item.id)
          tagArr.push(item.id)
        })
        this.idString = tagArr.join(',')
      }
      this.mineStatusValue = arr
      this.formInline.device = arrLabel
      //console.log('arr:' + JSON.stringify(arr))
      //  console.log('arrLabel:' + arrLabel)
      //console.log(tagArr)
    },
    async getPicture() {
      this.linedata = []
      let linedata1 = {}
      const res = await statistics(this.idString, this.formInline.date1.getFullYear(), this.formInline.date2.getFullYear(), this.formInline.lifespan)
      let cateArr = res.data.category
      let nameArr = []
      let tagA = []
      let tagB = []
      cateArr.forEach((item) => {
        nameArr.push(item.label)
      })
      let i = res.data.dataset.length
      // if (i == 1) {
      //   var valueArr = []
      // } else if (i > 1) {
      var valueArr = new Array()
      for (let j = 0; j < i; j++) {
        valueArr[j] = new Array()
      }
      // }

      if (res.data.dataset) {
        for (let m = 0; m < i; m++) {
          let line = res.data.dataset[m].data
          for (let n = 0; n < line.length; n++) {
            // if (i == 1) {
            //  valueArr[n] = parseInt(line[n].value)
            // } else {
            valueArr[m][n] = parseInt(line[n].value)
            // }
            //  console.log(666, valueArr[m][n])
          }

          tagA[m] = res.data.dataset[m].seriesname
          this.tagHeader = tagA
          tagB[m] = valueArr[m]
          // console.log(11, nameArr, 22, tagA, 33, tagB)
          // this.linedata[0] =
          //this.linedata[m + 1] = valueArr[m]
          //this.linedata.name = nameArr
          // this.linedata.push({name:nameArr[m],tagA[m]:tagB[m],})
        }
        // let result = []
        var result = new Array()
        // for (let j = 0; j < nameArr.length; j++) {
        //   result[j] = new Array()
        // }
        // for (let index in cateArr) {
        //   result.push({ name: cateArr[index], value1: valueArr[index] })
        // }
        // console.log(888, cateArr, valueArr, result)
        linedata1.name = nameArr
        for (let k = 0; k < tagA.length; k++) {
          //let tag = tagA[k]
          linedata1[tagA[k]] = tagB[k]
          //this.linedata1.tagA[k] = tagB[k]
          //console.log(tag, tagB[k])
        }
        for (let m = 0; m < nameArr.length; m++) {
          let temp = {}
          for (var obj in linedata1) {
            temp[obj] = linedata1[obj][m]
            //console.log(temp)
          }
          result.push(temp)
        }
        this.linedata = result
        //console.log(999, result)
        // this.linedata = linedata1
      }

      if (this.formInline.repair == 1) {
        this.typeC = 'line'
      } else if (this.formInline.repair == 2) {
        this.typeC = 'bar'
      }

      //this.category = res.data.category
    },
    PrintPage() {
      window.print()
      return
    }
    //async errorList() {
    //  const res = await errorList()
    // this.tableData = res.data
    // },
    //dataChange(row) {
    //return parseTime(new Date(row.createTime), '{y}-{m}-{d} {h}:{i}:{s}')
    // var rdata = row
    // console.log(rdata)
    //}
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
