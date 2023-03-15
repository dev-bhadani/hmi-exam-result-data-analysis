<template>

  <div id="nav">
    <!-- <router-link to="/">
     
    </router-link>
     <router-link to="addfile"> -->
     <About></About>
    <!-- </router-link>
    <router-link to="about">
 
    </router-link>
  </div>
  <router-view /> -->
  </div>

  
</template>

<script>
import About from './views/about.vue';
export default {
    name: "AppBlog",
    components: { About }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}

</style>
