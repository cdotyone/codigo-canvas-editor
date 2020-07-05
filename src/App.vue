<template>
  <div id="app">
    <cgo-canvas-editor></cgo-canvas-editor>
  </div>
</template>

<script>
import CgoCanvasEditor from "./cgo-canvas-editor";

export default {
  name: "App",
  components: {
    CgoCanvasEditor
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin:0;
}
</style>
