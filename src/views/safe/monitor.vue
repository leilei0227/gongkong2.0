<template>
  <div class="content-container">
    <div class="card-group">
      <div class="card">
        <div class="card-title"><span>设备数量</span></div>
        <div class="card-container">
          <div class="card-num"><span v-text="'8'"></span></div>
          <div class="card-img-1">
            <img src="~@/assets/img/safe/u1583.png" />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title"><span>防火墙</span></div>
        <div class="card-container">
          <div class="card-num"><span v-text="'8'"></span></div>
          <div class="card-img-2">
            <img src="~@/assets/img/safe/u1585.png" />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title"><span>审计设备</span></div>
        <div class="card-container">
          <div class="card-num"><span v-text="'8'"></span></div>
          <div class="card-img-1">
            <img src="~@/assets/img/safe/u1587.png" />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title"><span>安全卫士</span></div>
        <div class="card-container">
          <div class="card-num"><span v-text="'8'"></span></div>
          <div class="card-img-2">
            <img style="padding-top: 18px" src="~@/assets/img/safe/u1590.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="map-box">
        <div class="map-title">
          <span>动态攻击视图</span>
        </div>
        <div class="map-img">
          <el-map></el-map>
        </div>
      </div>
      <div class="pie-box">
        <div class="pie-container">
          <div class="pie-title">
            <span>攻击类型TOP5</span>
            <el-select style="width: 80px; height: 20px" v-model="value" placeholder="不限">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <pie-chart :chart-data="piedata"></pie-chart>
        </div>
        <div class="pie-container">
          <div class="pie-title">
            <span>时间级别TOP5</span>
            <el-select style="width: 80px; height: 20px" v-model="value" placeholder="不限">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <pie-chart :chart-data="piedata"></pie-chart>
        </div>
      </div>
    </div>
    <div class="chart-box">
      <div class="bar-box">
        <div class="pie-title">
          <span>安全事件分布</span>
          <el-select style="width: 80px; height: 20px" v-model="value" placeholder="不限">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <bar-chart :chart-data="bardata"></bar-chart>
      </div>
      <div class="line-box">
        <div class="pie-title">
          <span>安全事件趋势</span>
          <el-select style="width: 80px; height: 20px" v-model="value" placeholder="不限">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <line-chart :chart-data="bardata"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import Map from './components/mappoint'
import PieChart from '@/components/Charts/PieChart'
import BarChart from '@/components/Charts/BarChart'
import LineChart from '@/components/Charts/LineChart'
export default {
  name: 'Safe-monitor',
  components: {
    'el-map': Map,
    PieChart,
    BarChart,
    LineChart
  },
  data() {
    return {
      piedata: [
        { name: '协议分析', value: 30 },
        { name: '木马攻击', value: 20 },
        { name: '拒绝服务攻击', value: 30 },
        { name: 'finger服务攻击', value: 40 },
        { name: '远程服务攻击', value: 20 },
        { name: '其他', value: 10 }
      ],
      bardata: [
        { name: '协议分析', value: 30 },
        { name: '木马攻击', value: 20 },
        { name: '拒绝服务攻击', value: 30 },
        { name: 'finger服务攻击', value: 40 },
        { name: '远程服务攻击', value: 20 },
        { name: '其他', value: 10 },
        { name: '协议分析1', value: 30 },
        { name: '木马攻击1', value: 20 },
        { name: '拒绝服务攻击1', value: 30 },
        { name: 'finger服务攻击1', value: 40 },
        { name: '远程服务攻击1', value: 20 },
        { name: '其他1', value: 10 }
      ],
      options: [
        {
          value: '选项1',
          label: '不限'
        }
      ],
      value: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.content-container {
  .pie-title {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    span {
      font-family: '微软雅黑';
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
    }
  }
  .card-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .card {
      height: 150px;
      width: 24%;
      background-color: #fff;
      .card-title {
        height: 20%;
        width: 100%;
        padding: 5px;
      }
      .card-container {
        width: 100%;
        height: 78%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 30px;
        padding-right: 30px;
        .card-num {
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            font-family: '微软雅黑 Bold', '微软雅黑';
            font-weight: 700;
            font-style: normal;
            font-size: 40px;
            color: #344762;
          }
        }
        .card-img-1 {
          height: 75px;
          width: 75px;
          background-image: url(~@/assets/img/safe/u1582.png);
          img {
            padding: 20px;
          }
        }
        .card-img-2 {
          height: 75px;
          width: 75px;
          background-image: url(~@/assets/img/safe/u1584.png);
          img {
            padding: 20px;
          }
        }
      }
    }
  }
  .chart-container {
    width: 100%;
    display: flex;
    height: 680px;
    justify-content: space-between;
    padding-top: 20px;
    .map-box {
      width: 49.4%;
      background-color: #fff;
      .map-title {
        width: 100%;
        height: 40px;
        padding: 10px;
      }
      .map-img {
        padding: 20px;
        padding-top: 0px;
      }
    }
    .pie-box {
      width: 49.4%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .pie-container {
        background-color: #fff;
        height: 48.5%;
      }
    }
  }
  .chart-box {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    .bar-box {
      width: 49.5%;
      background-color: #fff;
    }
    .line-box {
      width: 49.5%;
      background-color: #fff;
    }
  }
}
</style>
