import konva from "konva";
import VueKonva from 'vue-konva';
import CgoCanvasEditor from "./cgo-canvas-editor";
import CgoCanvasSvg from "./cgo-canvas-svg";
import CgoCanvasImage from "./cgo-canvas-image";
import canvasItem from "./cgo-canvas-item";

export default {
  install: function (Vue) {
    if(konva) {
      Vue.use(VueKonva);
      const vGroup = Vue.component('vGroup');

      let xCgoCanvasSvg = vGroup.extend(CgoCanvasSvg);
      Vue.component('cgo-canvas-svg',xCgoCanvasSvg);

      let xCgoCanvasImage = vGroup.extend(CgoCanvasImage);
      Vue.component('cgo-canvas-image',xCgoCanvasImage);

      let xCanvasItem = vGroup.extend(canvasItem);
      Vue.component('cgo-canvas-item',xCanvasItem);

      Vue.component('cgo-canvas-editor',CgoCanvasEditor);
    }
  }
}
