<template>
  <v-group v-if="loaded" v-on="$listeners" :config="{x: 0,y: 0}">
    <v-path v-for="p in this.paths" v-on="$listeners" :config="getSvgConfig(p)"/>
  </v-group>
</template>

<script>
  import axios from "axios";

  export default {
    name: "cgo-canvas-svg",
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    data:function() {
      return {
        loaded: false,
        failures: 0,
        paths: []
      }
    },
    mounted() {
      this.load();
    },
    methods: {
      parseSvg(data) {
        let list = [];
        let xmlDoc;
        if (window.DOMParser) {
          const parser = new DOMParser();
          xmlDoc = parser.parseFromString(data, "text/xml");
        } else // Internet Explorer
        {
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(data);
        }

        const paths = xmlDoc.getElementsByTagName("path");

        if (paths && paths.length > 0) {
          for (let i = 0; i < paths.length; i++) {
            if (paths[i].attributes[0].name === 'd') {
              list.push(paths[i].attributes[0].value);
            }
          }
        }
        return list;
      },
      getSvgConfig(path) {
        let item = this.config;
        return {
          x: 0,
          y: 0,
          data: path,
          stroke: item.stroke,
          strokeWidth: item.strokeWidth,
          fill: item.fill,
          width: item.width,
          height: item.height
        };
      },
      load() {
        let item = this.config;
        axios.get(item.src).then((r) => {
          this.paths = this.parseSvg(r.data);
          this.loaded = true;
          this.$emit('loaded', this.item);
        }, (e) => {
          console.log('failed to load svg', e);
          if (this.failures > 2) return;
          this.failures++;
          setTimeout(() => {
            this.load();
          }, 500);
        });
      },
    }
  }
</script>
