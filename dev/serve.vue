<template>
  <div id="app">
    <codigo-canvas-editor></codigo-canvas-editor>
  </div>
</template>

<script>

import Vue from 'vue';
import CodigoCanvasEditor from '@/install';
Vue.use(CodigoCanvasEditor)
console.log(CodigoCanvasEditor);

export default Vue.extend({
  name: 'ServeDev'
});
</script>


<style>
  html {height: 100%;}
  body {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  #app {height: 100%}
</style>
