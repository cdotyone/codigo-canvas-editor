import konva from "konva";
import VueKonva from 'vue-konva';
import CgoCanvasEditor from "./lib-components/canvas-editor.vue";
import CgoCanvasSvg from "./lib-components/canvas-svg.vue";
import CgoCanvasImage from "./lib-components/canvas-image.vue";
import canvasItem from "./lib-components/canvas-item.vue";

export default {
  install: function (Vue) {
    if(konva) {
      Vue.use(VueKonva);
      const vGroup = Vue.component('vGroup');

      let xCgoCanvasSvg = vGroup.extend(CgoCanvasSvg);
      Vue.component('codigo-canvas-svg',xCgoCanvasSvg);

      let xCgoCanvasImage = vGroup.extend(CgoCanvasImage);
      Vue.component('codigo-canvas-image',xCgoCanvasImage);

      let xCanvasItem = vGroup.extend(canvasItem);
      Vue.component('codigo-canvas-item',xCanvasItem);

      Vue.component('codigo-canvas-editor',CgoCanvasEditor);
    }
  }
}
