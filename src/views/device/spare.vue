<template>
  <div class="content-container">
    <div class="box-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="typeName" label="设备种类" width="200"> </el-table-column>
        <el-table-column prop="1" label="总数" width="130"> </el-table-column>
        <el-table-column prop="yunxing" label="运行" width="130"> </el-table-column>
        <el-table-column prop="1" label="备件" width="130"> </el-table-column>
        <el-table-column prop="jianding" label="检定" width="130"> </el-table-column>
        <el-table-column prop="repair" label="维修" width="130"> </el-table-column>
        <el-table-column prop="bad" label="维修" width="130"> </el-table-column>
        <el-table-column prop="bili" label="备用比例" width="150"> </el-table-column>
        <el-table-column prop="count" label="备件下限" width="150"> </el-table-column>
        <el-table-column prop="location" label="存放地点" width="130"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" @click="handleEdit(row)">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer :visible.sync="dialogVisible" width="800px">
        <el-form style="margin-right: 30px" ref="form" label-width="100px" :model="temp">
          <el-form-item label="备件下限">
            <el-input v-model="temp.count"></el-input>
          </el-form-item>
          <el-form-item label="存放地点">
            <el-input v-model="temp.location"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateData()">保存</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { storageLimit, saveStorageLimit } from '@/api/device'
export default {
  name: 'Device-spare',

  data() {
    return {
      dialogVisible: false,
      temp: {
        id: 0,
        count: '',
        location: ''
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
      tableData: [
        /*    {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        },
        {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        },
        {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        },
        {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        },
        {
          class: '服务器',
          totalnum: '7',
          yunxing: '0',
          beijian: '7',
          jianding: '0',
          repair: '0',
          bad: '0',
          bili: '100%',
          downline: '-',
          address: '501'
        } */
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    resetTemp() {
      //console.log(22)
      this.temp = {
        location: '',
        count: '',
        typeID: 0
      }
    },
    updateData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(44444)
          saveStorageLimit(this.temp.typeId, this.temp.count, this.temp.location).then(() => {
            this.dialogVisible = false
            console.log(989898)
            this.$message.success('更改成功')
            this.getList()
          })
        }
      })
    },
    handleEdit(row) {
      this.temp = Object.assign({}, row)
      console.log(222, this.temp)
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    getList() {
      this.listLoading = true
      storageLimit(this.listQuery).then((response) => {
        this.tableData = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .box-table {
    display: flex;
    padding: 20px;
    ::v-deep .el-table td {
      text-align: center;
    }
    ::v-deep .el-table th {
      text-align: center;
    }
  }
}
</style>
