<template>
  <div id="app">

    <Topbar></Topbar>
    <router-view></router-view>
    
  </div>
</template>

<script>
import Topbar from '@/components/Topbar'

export default {
  name: 'app',
  data() {
    return {
    };
  },
  methods: {
   
  },
  components:{ Topbar }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
}

#app {
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
