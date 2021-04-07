<template>
  <div class="content-container">
    <div class="content-title">
      <div class="blue-box"></div>
      物联标识
    </div>
    <div class="line-box"></div>
    <el-form :model="formData" ref="formData" label-width="200px" :rules="ruleform" style="padding: 10px; padding-top: 20px">
      <el-form-item label="二维码前缀（服务器地址）" prop="serverUrl">
        <el-input v-model="formData.serverUrl" placeholder="例如：http://127.0.0.1:8080" style="width: 1000px"></el-input>
      </el-form-item>
      <el-form-item label="企业或组织前缀" prop="prefix">
        <el-input v-model="formData.prefix" style="width: 1000px"></el-input>
      </el-form-item>
      <el-form-item label="企业或组织编码" prop="prefixType">
        <el-input v-model="formData.prefixType" style="width: 1000px"></el-input>
      </el-form-item>
      <div class="content-title">
        <div class="blue-box"></div>
        设备管理
      </div>
      <div class="line-box" style="margin-bottom: 20px"></div>
      <el-form-item label="到期提醒（提前）" prop="deadLine">
        <el-input v-model="formData.deadLine" placeholder="例如：30，表示提前30天提醒" style="width: 1000px"></el-input>
      </el-form-item>
      <!--   <el-form-item label="设备维护周期" prop="repair">
        <el-input v-model="form.repair" placeholder="例如：30，表示30天为一周期进行维护" style="width: 1000px"></el-input>
      </el-form-item>
      <el-form-item label="设备检定周期" prop="check">
        <el-input v-model="form.check" placeholder="例如：30，表示30天为一周期进行检定" style="width: 1000px"></el-input>
      </el-form-item> -->
      <el-form-item style="padding-left: 40%">
        <el-button type="primary" @click="saveForm('formData')">保存</el-button>
        <el-button @click="resetForm('formData')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { subList } from '@/api/other'
export default {
  name: 'Setting-other',
  data() {
    return {
      formData: { serverUrl: '', prefix: '', prefixType: '', deadLine: '' },
      // formData: {},
      ruleform: {
        serverUrl: [
          { required: true, message: '请输入地址', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        prefix: [
          { required: true, message: '请输入前缀', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        prefixType: [
          { required: true, message: '请输入后缀', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        deadLine: [
          { required: true, message: '请输入到期提醒', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
        /*  repair: [
          { required: true, message: '请输入设备维护周期', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        check: [
          { required: true, message: '请输入设备检定周期', trigger: 'blur' }
          //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ] */
      }
    }
  },
  created() {
    this.subList()
  },
  methods: {
    async subList() {
      const res = await subList()
      this.formData.serverUrl = res.data.serverUrl
      this.formData.prefix = res.data.prefix
      this.formData.prefixType = res.data.prefixType
      this.formData.deadLine = res.data.deadLine
    },
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
