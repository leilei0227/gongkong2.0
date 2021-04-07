<template>
  <div class="content-container">
    <div class="tree-box">
      <div class="tree-title">昆仑总部</div>
      <el-tree :data="treeData" node-key="id" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>

    <div class="input-box">
      <div class="row-box">
        <div class="row-title">组织名称</div>
        <el-input v-model="inputData"></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">组织编码</div>
        <el-input v-model="tagPrefix"></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">组织层级</div>
        <el-input v-model="unitType"></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">维护范围</div>
        <el-input v-model="tiaokong"></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">位置</div>
        <el-input v-model="address"></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">设备查询</div>
        <el-input v-model="openFlag"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { subList } from '@/api/org'
export default {
  name: 'Setting-org',
  data() {
    return {
      inputData: '',
      address: '',
      tagPrefix: '',
      unitType: '',
      openFlag: '',
      tiaokong: '',
      tData: {},
      treeData: [],
      treeAllData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.subList()
  },
  methods: {
    handleNodeClick(data) {
      this.tData = data
      this.tiaokong = '调控中心'
      this.inputData = this.tData.label
      this.address = this.tData.lng + ' , ' + this.tData.lat
      this.tagPrefix = this.tData.tagPrefix
      if (this.tData.openFlag == 0) {
        this.openFlag = '允许'
      } else this.openFlag = '拒绝'

      if (this.tData.unitType == 1) {
        this.unitType = this.tData.label
      } else if (this.tData.unitType == 2) {
        this.unitType = '区域公司'
      } else if (this.tData.unitType == 3) {
        this.unitType = '项目公司'
      } else if (this.tData.unitType == 4) {
        this.unitType = '场站'
      }
    },
    async subList() {
      const res = await subList()
      this.treeAllData = res.data

      this.treeData = this.getTree(this.treeAllData, 0)
      console.log(this.treeData)
      //this.listData = res.data
    },
    getTree(treeData, parentId) {
      var treeArr = []
      for (var i = 0; i < treeData.length; i++) {
        var node = treeData[i]
        if (node.parentId == parentId) {
          var newNode = { id: node.id, label: node.name, tagPrefix: node.tagPrefix, openFlag: node.openFlag, unitType: node.unitType, lng: node.lng, lat: node.lat, children: this.getTree(treeData, node.id), pid: node.parentId }
          treeArr.push(newNode)
        }
      }
      // console.log(treeArr)
      return treeArr
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .tree-box {
    width: 25%;
    margin: 10px;
    border: 1px solid #dcdfe6;
    .tree-title {
      text-align: center;
      background-color: rgb(219, 227, 235);
      line-height: 28px;
    }
    .el-tree {
    }
  }
  .input-box {
    width: 75%;
    margin: 10px;
    margin-left: 40px;
    .row-box {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .row-title {
        width: 6%;
        text-align: right;
        margin-right: 10px;
      }
      .el-input {
        width: 50%;
      }
    }
  }
}
</style>
