<template>
  <div id="app">
<!--     <div id="nav">
      <router-link to="/midAutumun">midAutumun</router-link> |
      <router-link to="/showPics">showPics</router-link>
    </div> -->
    <div>
      <img src="@/assets/images/mainpageloading.gif" v-if="$route.fullPath=='/'"/>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {

}
</script>

<style>
html,body{padding:0;margin:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}
</style>
