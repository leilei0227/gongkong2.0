<template>
  <div class="content-container">
    <div class="content-box">
      <div class="content-box-input">
        <el-select v-model="listQuery.searchKey" style="width: 200px; margin-right: 10px" placeholder="请选择">
          <el-option v-for="item in optionList" :key="item.key" :label="item.optionName" :value="item.key" />
        </el-select>
        <el-input v-model="listQuery.searchValue" style="width: 200px"></el-input>
        <el-button type="primary" style="margin-left: 10px" @click="handleFilter">搜索</el-button>
      </div>
      <div class="content-box-button">
        <el-button type="primary" @click="handleCreate()">添加</el-button>
        <el-button type="primary" @click="handleDownload()">导出</el-button>
      </div>
    </div>
    <div class="content-table">
      <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="组织名称" prop="unitName" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="真实姓名" prop="realName" />
        <el-table-column label="角色" prop="roleName" />
        <el-table-column label="值班调度">
          <template slot-scope="scope">
            <span v-if="scope.row.dutyStatus == 1">是</span>
            <span v-if="scope.row.dutyStatus == 0">否</span>
          </template>
        </el-table-column>
        <el-table-column label="站长">
          <template slot-scope="scope">
            <span v-if="scope.row.userType == 1">是</span>
            <span v-if="scope.row.userType == 0">否</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination :total="total" />
    <el-drawer size="30%" :visible.sync="dialogFormVisible" width="1600px">
      <el-form style="margin: 10px" ref="dataForm" :model="temp" label-position="right" label-width="80px">
        <!--      <el-form-item label="组织名称" prop="orgName">
          <el-select v-model="temp.orgName" filterable class="w-100">
            <el-option v-for="item in orgList" :key="item.id" :label="item.orgName" :value="item.id" />
          </el-select> -->
        <!-- </el-form-item> -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" :disabled="dialogStatus === 'update'" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="temp.realName" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="temp.roleName" class="w-100">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="值班调度" prop="dutyStatus">
          <el-select v-model="temp.dutyStatus" class="w-100">
            <el-option v-for="item in dutyList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="站长" prop="userType">
          <el-select v-model="temp.userType" class="w-100">
            <el-option v-for="item in monitorList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { fetchList, createUser, updateUser, deleteUser } from '@/api/user'
// import { fetchList as fetchOrgList } from '@/api/org'
// import { fetchList as fetchRoleList } from '@/api/role'
import { parseTime, deleteNullParam } from '@/utils'
import { userStatusTypeOptions } from '@/utils/options'

export default {
  name: 'User',
  components: { Pagination },
  directives: { waves },
  filters: {
    userStatusTypeFilter(type) {
      return array2Object(userStatusTypeOptions)[type]
    }
  },
  data() {
    return {
      inputkey: '',
      value: '',
      total: 10,
      tableData: [
        /*  {
          userId: '1',
          orgName: '昆仑公司',
          username: '146789620@qq.com',
          realName: '张三',
          roleName: '系统管理员',
          onduty: '是',
          monitor: '是'
        },
        {
          userId: '2',
          orgName: '昆仑公司',
          username: '146789620@qq.com',
          realName: '李四',
          roleName: '普通用户',
          onduty: '是',
          monitor: '是'
        } */
      ], // 表格数据
      totalCount: 0, // 总条数
      optionList: [
        { key: 'username', optionName: '用户名' },
        { key: 'realName', optionName: '真实姓名' }
        // { id: 3, optionName: '角色' }
      ],
      roleList: [
        { id: 1, roleName: '系统管理员' },
        { id: 2, roleName: '普通用户' }
      ], // 角色列表
      orgList: [
        { id: 1, orgName: '昆仑公司' },
        { id: 2, orgName: '昆仑总部' },
        { id: 3, orgName: '衡水公司' }
      ], // 组织列表
      dutyList: [
        { id: 1, name: '是' },
        { id: 0, name: '否' }
      ],
      monitorList: [
        { id: 1, name: '是' },
        { id: 0, name: '否' }
      ],
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
      userStatusTypeOptions, // 用户状态类型
      dialogFormVisible: false, // dialog 的显示与隐藏
      dialogStatus: '', // create 还是 update。新建还是编辑
      textMap: {
        create: '新建用户',
        update: '编辑用户'
      },
      temp: {
        // 表单字段
        // 表单字段
        id: undefined,
        //userId: undefined,
        username: '',
        //monitor: undefined,
        realName: '',
        // status: 0,
        //orgName: undefined,
        role: undefined,
        unitId: 1,
        phone: 0,
        dutyStatus: undefined,
        userType: undefined
      },
      rules: {
        // 表单规则
        username: [{ required: true, message: '登录账号必填', trigger: 'blur' }],
        realName: [{ required: true, message: '真实姓名必填', trigger: 'blur' }],
        roleId: [{ required: true, message: '角色必填', trigger: 'change' }],
        orgId: [{ required: true, message: '所属组织必填', trigger: 'change' }]
      },
      downloadLoading: false // 下载动画
    }
  },
  created() {
    this.getList()
    // this.getOrgList()
    // this.getRoleList()
    //this.userList()
  },
  methods: {
    //获取列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then((response) => {
        this.tableData = response.data
        //this.totalCount = response.totalCount
        this.listLoading = false
      })
    },
    // // 获取组织列表
    // getOrgList() {
    //   fetchOrgList({
    //     pageNum: 1,
    //     pageSize: 1000
    //   }).then((response) => {
    //     this.orgList = response.data
    //   })
    // },
    // // 获取角色列表
    // getRoleList() {
    //   fetchRoleList({
    //     pageNum: 1,
    //     pageSize: 1000
    //   }).then((response) => {
    //     this.roleList = response.data
    //   })
    // },
    // 搜索
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        // 表单字段
        id: undefined,
        username: '',
        realName: '',
        role: 3,
        unitId: 1,
        phone: 0,
        dutyStatus: undefined,
        userType: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(11, this.temp)
          createUser(this.temp.unitId, this.temp.username, this.temp.role, this.temp.realName, this.temp.phone, this.temp.dutyStatus, this.temp.userType).then(() => {
            this.dialogFormVisible = false
            this.$message.success('创建成功')
            this.getList()
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        console.log(this.temp)
        if (valid) {
          updateUser(this.temp.unitId, this.temp.username, this.temp.role, this.temp.realName, this.temp.phone, this.temp.dutyStatus, this.temp.userType, this.temp.id).then(() => {
            this.dialogFormVisible = false
            this.$message.success('更改成功')
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // handlePasswordReset(row) {
    //   this.$confirm(`你确定要重置【${row.realName}】的密码吗?`, '提示', {
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       passwordReset({ userId: row.id }).then((response) => {
    //         this.$message.success('成功将用户密码重置为123456')
    //       })
    //     })
    //     .catch(() => {
    //       this.$message.info('已取消操作')
    //     })
    // },
    handleDelete(row) {
      this.$confirm(`你确定要删除【${row.realName}】吗?`, '提示', {
        type: 'warning'
      })
        .then(() => {
          deleteUser(row.id).then((response) => {
            this.$message.success('删除成功')
            this.handleFilter()
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = ['登录账号', '真实姓名', '角色', '所属组织']
        const filterVal = ['username', 'realName', 'roleName', 'unitName']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `用户列表(${parseTime(new Date(), '{y}-{m}-{d} {h}h{i}m{s}s')})`
        })
        this.downloadLoading = false
      })
    },
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
    }
  }
}
</script>
<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .content-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .content-box-input {
      display: flex;
    }
  }
  .content-table {
    padding: 10px;
    ::v-deep .el-table td {
      text-align: center;
    }
    ::v-deep .el-table th {
      text-align: center;
    }
  }
}
</style>

