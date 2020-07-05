<template>
  <div class="cgo-canvas">
    <v-stage class="ce-col" :style="{width:(configKonva.width+8)+'px'}" :config="configKonva" :key="'cgo-canvas'+key">
      <v-layer>
        <v-group v-for="item in items">
          <v-circle v-if="item.type==='circle'" :config="item"></v-circle>
          <v-ring v-if="item.type==='ring'" :config="item"></v-ring>
          <v-text v-if="item.type==='text'" :config="item"/>
          <v-rect v-if="item.type==='rect'" :config="item"/>
          <v-line v-if="item.type==='line'" :config="item"/>
          <v-star v-if="item.type==='star'" :config="item"/>
          <v-image v-if="item.type==='image' && item._loaded" :config="item"/>
          <v-group v-if="item.type==='path' && item._loaded" :config="item">
            <v-path v-for="p in item._paths" :config="getSvgConfig(item,p)"/>
          </v-group>
          <v-ellipse v-if="item.type==='ellipse'" :config="item"></v-ellipse>
        </v-group>
      </v-layer>
    </v-stage>
    <cgo-properties class="ce-col" :style="{width:propWidth+'px'}" :handle-left="true"></cgo-properties>
  </div>
</template>

<script>
  import axios from "axios";
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
          },
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
      this.loadImages();
      this.loadSvgs();
    },
    methods: {
      loadImages() {
        let items = this.items;
        for(let i=0;i<items.length;i++) {
          if(items[i].type==='image') {
            items[i]._loaded = false;
            let imageObj = new Image();
            items[i].image = imageObj;
            imageObj.src = items[i].src;
            imageObj.onload = (function(){
              this.item._loaded = true;
              this.self.key++;
            }).bind({item:items[i],self:this});
          }
        }
      },
      parseSvg(data) {
        let list = [];
        let xmlDoc;
        if (window.DOMParser)
        {
          const parser = new DOMParser();
          xmlDoc = parser.parseFromString(data, "text/xml");
        }
        else // Internet Explorer
        {
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(data);
        }

        const paths = xmlDoc.getElementsByTagName("path");

        if(paths && paths.length>0) {
          for(let i=0;i<paths.length;i++) {
            if(paths[i].attributes[0].name==='d') {
              list.push(paths[i].attributes[0].value);
            }
          }
        }
        return list;
      },
      getSvgConfig(item,path) {
        return {
          x:0,
          y:0,
          data:path,
          stroke:item.stroke,
          strokeWidth:item.strokeWidth,
          fill:item.fill,
          width:item.width,
          height:item.height
        };
      },
      loadSvgs() {
        let items = this.items;
        for(let i=0;i<items.length;i++) {
          if(items[i].type==='path') {
            this.$set(items[i],'_loaded',false);
            axios.get(items[i].src).then((function(r){
              let item=this.item;
              let self=this.self;
              self.$set(item,'_paths',self.parseSvg(r.data));
              item._loaded = true;
              this.key++;
            }).bind({item:items[i],self:this}))
          }
        }
      },
      onResize() {
        let stage=this.$el;
        if(stage && stage.offsetWidth && stage.offsetHeight) {
          this.configKonva.width = stage.offsetWidth - this.propWidth - 8;
          this.configKonva.height = stage.offsetHeight;
        } else {
          setTimeout(()=>{this.onResize()},500);
        }
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
