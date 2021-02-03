<template>
  <div class="content-container">
    <div class="content-title">
      <div class="blue-box"></div>
      物联标识
    </div>
    <div class="line-box"></div>
    <el-form :model="form" ref="form" label-width="200px" :rules="ruleform" style="padding: 10px; padding-top: 20px">
      <el-form-item label="二维码前缀（服务器地址）" prop="address">
        <el-input v-model="form.address" placeholder="例如：http://127.0.0.1:8080" style="width: 1000px"></el-input>
      </el-form-item>
      <el-form-item label="企业或组织前缀" prop="fname">
        <el-input v-model="form.fname" style="width: 1000px"></el-input>
      </el-form-item>
      <el-form-item label="企业或组织编码" prop="lname">
        <el-input v-model="form.lname" style="width: 1000px"></el-input>
      </el-form-item>
      <div class="content-title">
        <div class="blue-box"></div>
        设备管理
      </div>
      <div class="line-box" style="margin-bottom: 20px"></div>
      <el-form-item label="到期提醒（提前）" prop="time">
        <el-input v-model="form.time" placeholder="例如：30，表示提前30天提醒" style="width: 1000px"></el-input>
      </el-form-item>
      <el-form-item label="设备维护周期" prop="repair">
        <el-input v-model="form.repair" placeholder="例如：30，表示30天为一周期进行维护" style="width: 1000px"></el-input>
      </el-form-item>
      <el-form-item label="设备检定周期" prop="check">
        <el-input v-model="form.check" placeholder="例如：30，表示30天为一周期进行检定" style="width: 1000px"></el-input>
      </el-form-item>
      <el-form-item style="padding-left: 40%">
        <el-button type="primary" @click="saveForm('form')">保存</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Setting-other',
  data() {
    return {
      form: { address: '', fname: '', lname: '', time: '', repair: '', check: '' },
      ruleform: {
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        fname: [
          { required: true, message: '请输入前缀', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        lname: [
          { required: true, message: '请输入后缀', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请输入到期提醒', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        repair: [
          { required: true, message: '请输入设备维护周期', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        check: [
          { required: true, message: '请输入设备检定周期', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  background-color: #fff;
  .content-title {
    padding: 10px;
    padding-left: 30px;
    display: flex;
  }
  .line-box {
    height: 0.1px;
    margin-left: 30px;
    margin-right: 10px;
    border: 0.05px solid rgb(226, 226, 226);
  }
  .blue-box {
    height: 16px;
    width: 5px;
    background-color: rgb(103, 155, 235);
    margin-right: 10px;
  }
}
</style>
