<template>
  <div class="content-container">
    <div class="container-card">
      <div class="card">
        <div class="box-img-1">
          <img src="~@/assets/img/login/u176.png" />
        </div>
        <div class="box-text">
          <div class="box-num"><span v-text="this.siteNum" /></div>
          <div class="box-title"><span v-text="'组织数量'" /></div>
        </div>
      </div>
      <div class="card">
        <div class="box-img-2">
          <img src="~@/assets/img/login/u173.png" />
        </div>
        <div class="box-text">
          <div class="box-num"><span v-text="this.deviceNum" /></div>
          <div class="box-title"><span v-text="'设备数量'" /></div>
        </div>
      </div>
      <div class="card">
        <div class="box-img-3">
          <img src="~@/assets/img/login/u171.png" />
        </div>
        <div class="box-text">
          <div class="box-num"><span v-text="this.errorNum" /></div>
          <div class="box-title"><span v-text="'故障数量'" /></div>
        </div>
      </div>
    </div>
    <div class="container-ml">
      <div class="c-map">
        <div class="con-title">
          <span>场站分布</span>
          <el-button type="primary" icon="el-icon-refresh" style="height: 25px; width: 95px; padding: 0px" @click="mapsize()">最初大小</el-button>
        </div>
        <div class="map-box">
          <el-map :change="this.Mapsize" :listdata="this.listData" v-if="this.listData.length"></el-map>
        </div>
      </div>
      <div class="c-list">
        <div class="con-title">
          <span>分布列表</span>
        </div>
        <div class="table-box">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="areaUnitName" label="区域公司名" width="180"> </el-table-column>
            <el-table-column prop="projectUnitNum" label="项目公司数" width="180"> </el-table-column>
            <el-table-column prop="siteUnitNum" label="运维场站数"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from './components/mapshow'
import { fetchList } from '@/api/deviceType'
import { subList, statistics, getAuth } from '@/api/dashboard'

export default {
  name: 'Dashboard',
  components: {
    'el-map': Map
  },
  data() {
    return {
      zoomSize: 0,
      deviceNum: 0,
      siteNum: 0,
      errorNum: 0,
      Mapsize: 0,
      tableData: [],
      listData: [],
      dialogVisible: false
    }
  },
  created() {
    this.getAuth()
    this.subList()
    this.statistics()
  },
  methods: {
    async getAuth() {
      const res = await getAuth()
      console.log(res)
    },
    async subList() {
      const res = await subList()
      this.listData = res.data
    },
    async statistics() {
      const res = await statistics()
      this.deviceNum = res.data.deviceNum
      this.siteNum = res.data.siteNum
      this.errorNum = res.data.errorNum
      this.tableData = res.data.unitStat
      // console.log(typeof this.tableData)
    },
    mapsize() {
      this.Mapsize = this.Mapsize + 1
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
