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
      <div class="box-but">
        <el-button type="primary" icon="el-icon-search" @click="addDevice">添加</el-button>
        <el-button type="primary">上传</el-button>
        <el-button type="primary">下载</el-button>
        <el-button type="primary" plain>打印</el-button>
        <el-button type="danger" plain>删除</el-button>
      </div>
    </div>
    <div class="content-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="设备名称" width="150"> </el-table-column>
        <el-table-column prop="class" label="设备种类" width="130"> </el-table-column>
        <el-table-column prop="producer" label="生产厂商" width="130"> </el-table-column>
        <el-table-column prop="brand" label="品牌系列" width="150"> </el-table-column>
        <el-table-column prop="isoid" label="规格型号" width="150"> </el-table-column>
        <el-table-column prop="sqid" label="序列号" width="150"> </el-table-column>
        <el-table-column prop="dateuse" label="投产时间" width="150"> </el-table-column>
        <el-table-column prop="datein" label="质保期限" width="150"> </el-table-column>
        <el-table-column prop="datebad" label="报废时间" width="150"> </el-table-column>
        <el-table-column prop="lifespan" label="使用时间" width="150"> </el-table-column>
        <el-table-column label="操作" width="150">
          <template>
            <el-button size="mini" @click="handelEdit">编辑</el-button>
            <el-button size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogVisible" width="1500px" :title="titleMap[dialogStatus]">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Device-list',
  data() {
    return {
      dialogVisible: false,
      titleMap: {
        add: '添加',
        edit: '编辑'
      },
      //新增和编辑弹框标题
      dialogStatus: '',
      input: '',
      form: {
        name: ''
      },
      options: [
        {
          value: '1',
          label: '事件名称'
        }
      ],
      value: '',
      tableData: [
        {
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          dateuse: '2002-02-21',
          datein: '2020-02-21',
          datebad: '2050-02-01',
          lifespan: '2年1月10天'
        },
        {
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          dateuse: '2002-02-21',
          datein: '2020-02-21',
          datebad: '2050-02-01',
          lifespan: '2年1月10天'
        },
        {
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          dateuse: '2002-02-21',
          datein: '2020-02-21',
          datebad: '2050-02-01',
          lifespan: '2年1月10天'
        },
        {
          name: '硬盘录像机',
          class: '设备1',
          producer: 'xx厂商',
          brand: 'HP-1',
          isoid: 'HP-1-001',
          sqid: '05846234610',
          dateuse: '2002-02-21',
          datein: '2020-02-21',
          datebad: '2050-02-01',
          lifespan: '2年1月10天'
        }
      ]
    }
  },
  methods: {
    addDevice() {
      //显示弹框
      this.dialogVisible = true
      //新增弹框标题
      this.dialogStatus = 'add'
    },
    //编辑
    handelEdit() {
      //显示弹框
      this.dialogVisible = true
      //编辑弹框标题
      this.dialogStatus = 'edit'
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .el-input {
    width: 500px;
    margin-left: 20px;
    margin-right: 100px;
  }
  .dialog-title {
    padding: 10px;
    background-color: rgb(218, 237, 243);
    font-weight: bold;
  }
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
