<template>
  <div class="topbar">
		<el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'topbar',
  data() {
    return {
      activeIndex: '1',
    }
  },
  mounted() {
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子

    // this.loadCityList();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .topbar{
    position: relative;
    /*width: 1088px;*/
    margin: 0 auto;
    background-color: #eef1f6;
  }
</style>
