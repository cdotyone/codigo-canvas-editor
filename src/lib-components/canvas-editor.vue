<template>
  <div class="cgo-canvas">
    <v-stage class="ce-col" :style="{width:(configKonva.width)+'px'}" :config="configKonva" :key="'cgo-canvas'+key"
             @mousedown="onStageMouseDown"
             @touchstart="onStageMouseDown">
      <v-layer>
        <codigo-canvas-item v-for="(item, index) in drawItems" :item="item" :key="'c-item'+index" @transformend="onTransformEnd"></codigo-canvas-item>
        <v-transformer ref="transformer" />
      </v-layer>
    </v-stage>
    <cgo-properties class="ce-col" :style="{width:propWidth+'px'}" :handle-left="true"></cgo-properties>
  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';
  import CgoProperties from "./cgo-properties.vue";
  import CodigoCanvasItem from "./canvas-item.vue";

  export default {
    name: "codigo-canvas-editor",
    components: {CodigoCanvasItem, CgoProperties},
    data() {
      return {
        key:0,
        configKonva: {
          width: 200,
          height: 200
        },
        items: [
          {
            type: 'path',
            x: 300,
            y: 100,
            src: require('@fortawesome/fontawesome-free/svgs/brands/vuejs.svg'),
            width: 500,
            height: 500,
            fill: 'green',
            stroke: 'green',
            strokeWidth: 1
          },
          {
            type:'circle',
            x: 100,
            y: 100,
            radius: 70,
            fill: "red",
            stroke: "black",
            strokeWidth: 4
          },
          {
            type:'star',
            x: 400,
            y: 400,
            numPoints: 5,
            innerRadius: 30,
            outerRadius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
          },
          {
            type:'ring',
            innerRadius: 40,
            outerRadius: 80,
            x: 250,
            y: 250,
            radius: 70,
            fill: "red",
            stroke: "black",
            strokeWidth: 4
          },
          {
            type:'circle',
            x: 200,
            y: 200,
            radius: 70,
            fill: "red",
            stroke: "black",
            strokeWidth: 4
          },
          {
            type:'line',
            x: 20,
            y: 200,
            points: [0, 0, 100, 0, 100, 100],
            tension: 0.5,
            closed: true,
            stroke: 'black',
            fillLinearGradientStartPoint: { x: -50, y: -50 },
            fillLinearGradientEndPoint: { x: 50, y: 50 },
            fillLinearGradientColorStops: [0, 'red', 1, 'yellow']
          },
          {
            type:'rect',
            x: 20,
            y: 50,
            width: 100,
            height: 100,
            fill: 'red',
            shadowBlur: 10
          },
          {
            type:'ellipse',
            radius : {
              x : 50,
              y : 70
            },
            x: 300,
            y: 300,
            fill: 'blue'
          },
          {type:'text',text: 'Pen is broken', fontSize: 15},
          {
            type: 'image',
            x: 200,
            y: 100,
            src: require('../assets/logo.png'),
            width: 100,
            height: 100
          }
        ],
        propWidth:200,
        selected: undefined
      };
    },
    created() {
      window.addEventListener("resize", ()=>{this.onResize();});
    },
    mounted() {
      this.$nextTick(()=>{this.onResize()});
    },
    methods: {
      onResize() {
        let stage=this.$el;
        if(stage && stage.offsetWidth && stage.offsetHeight) {
          console.log(stage.offsetWidth);
          this.configKonva.width = stage.offsetWidth - this.propWidth - 2;
          this.configKonva.height = stage.offsetHeight;
        } else {
          setTimeout(()=>{this.onResize()},500);
        }
      },

      onTransformEnd(e) {
        const rect = this.items.find(r => r.name === this.selected);
        // update the state
        rect.x = e.target.x();
        rect.y = e.target.y();
        rect.rotation = e.target.rotation();
        rect.scaleX = e.target.scaleX();
        rect.scaleY = e.target.scaleY();
      },
      onStageMouseDown(e) {
        if (e.target === e.target.getStage()) {
          this.selected = '';
          this.updateTransformer();
          return;
        }

        // clicked on transformer - do nothing
        const clickedOnTransformer =
          e.target.getParent().className === 'Transformer';
        if (clickedOnTransformer) {
          return;
        }

        // find clicked rect by its name
        let name = e.target.name();
        let node = e.target;
        while((name==='' || name===undefined) && node.parent && node!==e.target.getStage()) {
          node=node.parent;
          name = node.name();
        }
        const rect = this.items.find(r => r.name === name);
        if (rect) {
          this.selected = name;
        } else {
          this.selected = '';
        }
        this.updateTransformer();
      },
      updateTransformer() {
        // here we need to manually attach or detach Transformer node
        const transformerNode = this.$refs.transformer.getNode();
        const stage = transformerNode.getStage();
        const { selected } = this;

        const selectedNode = stage.findOne('.' + selected);
        // do nothing if selected node is already attached
        if (selectedNode === transformerNode.node()) {
          return;
        }

        if (selectedNode) {
          // attach to another node
          transformerNode.nodes([selectedNode]);
        } else {
          // remove transformer
          transformerNode.detach();
        }
        transformerNode.getLayer().batchDraw();
      },
      onClickItem(item) {

      }
    },
    computed: {
      drawItems() {
        let items = this.items;
        for(let i=0;i<items.length;i++){
          if(!items[i].name) {
            items[i].name = uuidv4();
          }
          items[i].draggable = true;
        }
        return items;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .cgo-canvas {
    width: 100%;
    height: 100%;

    .ce-col {
      display: inline-block;
      float: left;
    }
  }
</style>
