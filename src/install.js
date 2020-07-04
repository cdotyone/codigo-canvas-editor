import konva from "konva";
import VueKonva from 'vue-konva';
import CgoCanvasEditor from "./canvas-editor";

export default {
  install: function (Vue) {
    if(konva) {
      Vue.use(VueKonva);
      Vue.component('cgo-canvas-editor',CgoCanvasEditor);
    }
  }
}
