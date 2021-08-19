<template>
  <div class="toolbar">
    <router-link class="logo" to="/">
      <img :src="logoSrc" class="logo-img" />
      <h1 class="logo-title">{{ title }}</h1>
    </router-link>
    <div style="display: flex; width: 15%; justify-content: space-between">
      <div>
        <span v-text="this.unitName" style="color: #fff; font-size: 14px"></span>
        <el-button type="text" @click="changeUnitFirst">[组织切换]</el-button>
      </div>
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="logoSrc2" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> Home </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <!-- <el-dropdown-item @click="logout1()">
            <span style="display: block">Log Out</span>
          </el-dropdown-item> -->
            <a target="_blank" href="http://localhost:9528/gongkong-new">
              <el-dropdown-item>Log Out</el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- <el-dialog id="dia" style="display: flex; height: 300px; top: 50px" title="更改场站" v-model="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog> -->
    <el-dialog title="更改场站" :visible.sync="dialogVisible" width="600px">
      <select style="margin-right: 10px" v-model="selectFirst">
        <option value="1" label="昆仑总部"></option>
      </select>
      <select style="margin-right: 10px" v-model="value1" @change="getUnits(value1, 2)">
        <option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
      <select style="margin-right: 10px" v-if="selectThreeShow" v-model="value2" @change="getUnits(value2, 3)">
        <option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
      <select v-if="selectFourShow" v-model="value3">
        <option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id"></option>
      </select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitChange">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { title } from '@/settings'
import logoSrc from '@/assets/img/logo.png'
import logoSrc2 from '@/assets/dashboard/logo.png'
import { logout } from '@/api/logout'
import { getAuth, getUnit, getUnits, changeUnit } from '@/api/dashboard'
export default {
  name: 'Toolbar',
  data() {
    return {
      title,
      logoSrc,
      logoSrc2,
      unitName: '昆仑总部',
      unitId: 1,
      changeUnitId: 1,
      dialogVisible: false,
      selectThreeShow: false,
      selectFourShow: false,
      selectFirst: 1,
      options: [],
      options1: [],
      options2: [],
      value1: '',
      value2: '',
      value3: ''
      // z: 4
    }
  },
  created() {
    this.getAuth()
    this.getUnit()
  },

  methods: {
    async getAuth() {
      const res = await getAuth()
      this.unitName = res.data.locateUnitName
      //this.unitId = res.data.UnitId
      // console.log(8777, res.data)
    },
    async getUnit() {
      const res = await getUnit(1)
      const res1 = await getUnits(1)
      this.options = res1.data
    },
    async getUnits(id, time) {
      this.changeUnitId = id
      const res = await getUnits(id)
      if (time == 2) {
        this.options2 = []
        this.options1 = []
        this.selectFourShow = false
        this.selectThreeShow = false
        if (res.data.length) {
          this.options1 = res.data
          this.selectThreeShow = true
        }
      } else if (time == 3) {
        //  console.log(99999, res.data == null)
        if (res.data.length) {
          this.options2 = res.data
          this.selectFourShow = true
        }
      }

      // console.log(4545, this.options)
    },
    // async logout1() {
    //   const res = await logout()
    // }
    logout1() {
      // console.log(11)
      this.$$router.replace('/')
    },
    changeUnitFirst() {
      this.options2 = []
      this.options1 = []
      this.selectFourShow = false
      this.selectThreeShow = false
      this.dialogVisible = true
    },
    async submitChange() {
      this.dialogVisible = false
      if (this.value3) {
        await changeUnit(this.value3)
      } else if (this.value2) {
        await changeUnit(this.value2)
      } else if (this.value1) {
        await changeUnit(this.value1)
      } else {
        await changeUnit(1)
      }
      this.getAuth()
      location.reload()
      // console.log(this.unitName)
    }
    // dialogChange() {
    //   this.dialogVisible = true
    //   // var dia = document.getElementById('dia')
    //   // // console.log(5656)
    //   // dia.style.zIndex = 2
    // }
    // dialogYincang() {
    //   this.dialogVisible = false
    //   var dia = document.getElementById('dia')
    //   // console.log(5656)
    //   dia.style.zIndex = 0
    // }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  background-color: rgba(52, 71, 98, 1);
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  // .el-dialog {
  // }
  .logo {
    // width: 32px;
    // height: 32px;
    vertical-align: middle;
    // margin-right: 12px;
    .logo-img {
      width: 30px;
    }
    .logo-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  .right-menu {
    // float: right;
    // height: 100%;
    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>