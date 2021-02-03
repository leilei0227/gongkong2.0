<template>
  <div class="content-container">
    <div class="tree-box">
      <div class="tree-title">昆仑总部</div>
      <el-tree :data="treeData" node-key="id" :default-expanded-keys="[1, 2, 3, 4]" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>

    <div class="input-box">
      <div class="row-box">
        <div class="row-title">设备名</div>
        <el-input v-model="inputData"></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">设备种类</div>
        <el-input></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">MAC地址</div>
        <el-input></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">IP地址</div>
        <el-input></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">上个设备</div>
        <el-input></el-input>
      </div>
      <div class="row-box">
        <div class="row-title">是否监控</div>
        <el-input></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting-org',
  data() {
    return {
      inputData: '',
      tData: {},
      treeData: [
        {
          id: 1,
          label: '海南分公司',
          children: [
            {
              id: 4,
              label: '深南公司',
              children: [
                {
                  label: '爱华西加气站'
                },
                {
                  label: '爱华西加气站'
                },
                {
                  label: '爱华西加气站'
                },
                {
                  label: '爱华西加气站'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '山东分公司',
          children: [
            {
              label: '济宁',
              children: [
                {
                  label: '嘉祥'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          label: '黑龙江分公司'
        },
        {
          id: 3,
          label: '上海分公司',

          children: [
            {
              label: '白鹤公司'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      this.tData = data
      this.inputData = this.tData.label
      console.log(this.inputData)
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
