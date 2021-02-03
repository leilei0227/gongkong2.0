<template>
  <div class="content-container">
    <div class="container-card">
      <div class="card">
        <div class="box-img-1">
          <img src="~@/assets/img/login/u176.png" />
        </div>
        <div class="box-text">
          <div class="box-num"><span v-text="'233'" /></div>
          <div class="box-title"><span v-text="'组织数量'" /></div>
        </div>
      </div>
      <div class="card">
        <div class="box-img-2">
          <img src="~@/assets/img/login/u173.png" />
        </div>
        <div class="box-text">
          <div class="box-num"><span v-text="'233'" /></div>
          <div class="box-title"><span v-text="'设备数量'" /></div>
        </div>
      </div>
      <div class="card">
        <div class="box-img-3">
          <img src="~@/assets/img/login/u171.png" />
        </div>
        <div class="box-text">
          <div class="box-num"><span v-text="'16'" /></div>
          <div class="box-title"><span v-text="'故障数量'" /></div>
        </div>
      </div>
    </div>
    <div class="container-ml">
      <div class="c-map">
        <div class="con-title">
          <span>场站分布</span>
          <el-button type="primary" icon="el-icon-refresh" style="height: 25px; width: 95px; padding: 0px">最初大小</el-button>
        </div>
        <div class="map-box">
          <el-map></el-map>
        </div>
      </div>
      <div class="c-list">
        <div class="con-title">
          <span>分布列表</span>
        </div>
        <div class="table-box">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="company" label="区域公司名" width="180"> </el-table-column>
            <el-table-column prop="project" label="项目公司数" width="180"> </el-table-column>
            <el-table-column prop="fix" label="运维场站数"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from './components/mapshow'
import { fetchList } from '@/api/deviceType'
export default {
  name: 'Dashboard',
  components: {
    'el-map': Map
  },
  data() {
    return {
      tableData: [
        {
          company: '海南分公司',
          project: '1106',
          fix: '1064'
        },
        {
          company: '上海分公司',
          project: '50',
          fix: '50'
        },
        {
          company: '黑龙江分公司',
          project: '43',
          fix: '35'
        },
        {
          company: '山东分公司',
          project: '33',
          fix: '27'
        },
        {
          company: '试验平台',
          project: '32',
          fix: '28'
        }
      ]
    }
  },
  created() {
    // this.fetchList()
  },
  methods: {
    async fetchList() {
      const res = await fetchList()
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  .con-title {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    span {
      padding-top: 5px;
      font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
      font-weight: 700;
      font-style: normal;
      font-size: 16px;
      color: #495057;
    }
  }
  .container-card {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .card {
      height: 160px;
      width: 32.5%;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding-left: 30px;
      padding-right: 30px;
      align-items: center;
      .box-img-1 {
        height: 80px;
        width: 80px;
        background-image: url(~@/assets/img/login/u175.png);
        img {
          padding-top: 22px;
          padding-bottom: 22px;
        }
      }
      .box-img-2 {
        height: 80px;
        width: 80px;
        background-image: url(~@/assets/img/login/u172.png);
        img {
          padding-top: 20.5px;
          padding-bottom: 20.5px;
        }
      }
      .box-img-3 {
        height: 80px;
        width: 80px;
        background-image: url(~@/assets/img/login/u170.png);
        img {
          padding-top: 19.5px;
          padding-bottom: 19.5px;
        }
      }
      img {
        padding-left: 18px;
        padding-right: 18px;
      }
      .box-text {
        .box-num {
          font-family: 'Arial Normal', 'Arial';
          font-weight: 400;
          font-style: normal;
          font-size: 48px;
          color: #495057;
          text-align: right;
        }
        .box-title {
          font-family: '微软雅黑';
          font-weight: 400;
          font-style: normal;
          font-size: 16px;
          color: #495057;
          text-align: right;
        }
      }
    }
  }
  .container-ml {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    height: 720px;
    width: 100%;
    .c-map {
      width: 66.2%;
      background-color: #fff;
      .map-box {
        padding: 20px;
        padding-top: 0px;
      }
    }
    .c-list {
      width: 32.5%;
      background-color: #fff;
      .table-box {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }
}
</style>
