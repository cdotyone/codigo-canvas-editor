<template>
  <div class="cgo-canvas">
    <v-stage class="ce-col" :style="{width:(configKonva.width)+'px'}" :config="configKonva" :key="'cgo-canvas'+key">
      <v-layer>
        <cgo-canvas-item v-for="item in items" :item="item" @click="onClickItem(item)"></cgo-canvas-item>
      </v-layer>
    </v-stage>
    <cgo-properties class="ce-col" :style="{width:propWidth+'px'}" :handle-left="true"></cgo-properties>
  </div>
</template>

<script>
  import CgoProperties from "./cgo-properties";

  export default {
    name: "cgo-canvas-editor",
    components: {CgoProperties},
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
            width: 100,
            height: 100,
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
          {type:'text',text: 'Some text on canvas', fontSize: 15},
          {
            type: 'image',
            x: 200,
            y: 100,
            src: require('./assets/logo.png'),
            width: 100,
            height: 100
          }
        ],
        propWidth:200
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
      onClickItem(item) {

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
