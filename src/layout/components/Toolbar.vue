<template>
  <div class="toolbar">
    <router-link class="logo" to="/">
      <img :src="logoSrc" class="logo-img" />
      <h1 class="logo-title">{{ title }}</h1>
    </router-link>
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
</template>

<script>
import { title } from '@/settings'
import logoSrc from '@/assets/img/logo.png'
import logoSrc2 from '@/assets/dashboard/logo.png'
import { logout } from '@/api/logout'
export default {
  name: 'Toolbar',
  data() {
    return {
      title,
      logoSrc,
      logoSrc2
    }
  },
  methods: {
    // async logout1() {
    //   const res = await logout()
    // }
    logout1() {
      console.log(11)
      this.$$router.replace('/')
    }
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