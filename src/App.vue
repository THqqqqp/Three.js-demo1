<script setup>

import Header from "@/components/Header.vue";
</script>

<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  router-view {
    flex: 1;
  }
}


</style>
