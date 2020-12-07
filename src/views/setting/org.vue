<template>
  <div class="content-container">
    <div class="content-box">
      <div class="content-box-input">
        <el-input v-model="input" style="width: 200px; margin-right: 10px" placeholder="用户名"></el-input>
        <el-select v-model="value" style="width: 200px" placeholder="请选择"></el-select>
      </div>
      <div class="content-box-button">
        <el-button type="primary">添加</el-button>
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <div class="content-table">
      <el-table :data="tableData" border style="width: 100%" :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
        <el-table-column label="#" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织名称" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.discuss }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.panduan }}</span>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.panduan }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值班调度" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.panduan }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班长" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.panduan }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Setting-org'
  // components: { Pagination },
  // data() {
  //   return {
  //     currentPage1: 1,
  //     input: '',
  //     tableData: [
  //       {
  //         id: '1',
  //         name: 'SPD',
  //         discuss: '浪涌报警',
  //         panduan: '条件 故障类型'
  //       },
  //       {
  //         id: '2',
  //         name: 'SPD',
  //         discuss: '浪涌报警',
  //         panduan: '条件 故障类型'
  //       },
  //       {
  //         id: '3',
  //         name: 'SPD',
  //         discuss: '浪涌报警',
  //         panduan: '条件 故障类型'
  //       },
  //       {
  //         id: '4',
  //         name: 'SPD',
  //         discuss: '浪涌报警',
  //         panduan: '条件 故障类型'
  //       }
  //     ]
  //   }
  // },
  // methods: {
  //   handleSizeChange(val) {
  //     console.log(`每页 ${val} 条`)
  //   },
  //   handleCurrentChange(val) {
  //     console.log(`当前页: ${val}`)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
// .content-container {
//   background-color: #fff;
//   .content-box {
//     display: flex;
//     justify-content: space-between;
//     padding: 10px;
//     .content-box-input {
//       display: flex;
//     }
//   }
//   .content-table {
//     padding: 10px;
//   }
// }
</style>
