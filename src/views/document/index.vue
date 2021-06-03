<template>
  <div class="content-container">
    <div class="tree-container">
      <div class="tree-title">文档类型</div>
      <el-tree :data="treeData" show-checkbox node-key="id" @node-click="handleNodeClick"> </el-tree>
    </div>
    <div class="table-container">
      <div class="button-container">
        <div class="input-container">
          <el-input style="margin-right: 10px"></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
        </div>
        <el-upload class="upload-demo" action="http://localhost:9528/api/doc/upload.json" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove">
          <el-button type="primary">上传文件</el-button>
        </el-upload>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="docName" label="文件名"></el-table-column>
        <el-table-column prop="updateTime" label="上传日期" :formatter="dateFormat"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" @click="handleDownload()">下载</el-button>
            <el-button size="mini" @click="handledelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { typeList, docList, docDelete, docUpload } from '@/api/document'
import { parseTime } from '@/utils'
export default {
  name: 'Document',
  data() {
    return {
      treeData: [],
      treeAllData: [],
      tableData: [],
      data_id: undefined
    }
  },
  created() {
    this.typeList()
  },
  methods: {
    async typeList() {
      const res = await typeList()
      // console.log(111, res.data)
      this.treeAllData = res.data
      this.treeData = this.getTree(this.treeAllData)
    },
    getTree(treeData) {
      var treeArr = []
      for (var i = 0; i < treeData.length; i++) {
        var node = treeData[i]

        var newNode = { id: node.id, label: node.typeName }
        treeArr.push(newNode)
      }
      // console.log(treeArr)
      return treeArr
    },
    handleNodeClick(data) {
      this.data_id = data.id
      this.docList1()
      // console.log(222, this.data_id)
    },
    async docList1() {
      const res = await docList(1, this.data_id)
      this.tableData = res.data
    },
    dateFormat(row, column) {
      let timeTemp = row.updateTime
      // console.log(222222, row.updateTime)
      // console.log(timeTemp)
      let result = parseTime(timeTemp, '{y}-{m}-{d}')
      return result
    },
    handledelete(row) {
      console.log(this.data_id)
      this.$confirm(`你确定要删除吗?`, '提示', {
        type: 'warning'
      })

        .then(() => {
          docDelete(row.id).then((response) => {
            this.$message.success('删除成功')
            this.docList1()
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleDownload() {
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
    handleRemove(file) {
      console.log(file)
    },
    handlePreview(file) {
      console.log(file)
    },
    // handleExceed(files, fileList) {
    //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    // },
    beforeRemove(file) {
      return this.$confirm(`确定移除？`)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .tree-container {
    margin: 10px;
    border: 1px solid #edf0f5;
    width: 20%;
    //background-color: #fff;
    .tree-title {
      height: 30px;
      text-align: center;
      padding-top: 5px;
      background-color: #edf0f5;
    }
    //margin: 10px;
    // border: 1px solid rgb(226, 225, 225);
  }
  .table-container {
    width: 80%;
    //background-color: #fff;
    .button-container {
      margin: 10px;
      margin-left: 0;
      height: 40px;
      display: flex;
      justify-content: space-between;
      .input-container {
        display: flex;
        //justify-content: space-between;
      }
      // .el-button {
      //   float: right;
      // }
    }
    .el-table {
      margin: 10px;
      margin-left: 0;
      border: 1px solid #edf0f5;
    }
  }
}
</style>
