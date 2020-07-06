<template>
  <v-image v-if="loaded"  v-on="$listeners" :config="getImageConfig()"></v-image>
</template>

<script>
  export default {
    name: "cgo-canvas-svg",
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    data: function () {
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
      getImageConfig() {
        let item = this.config;
        return {
          x: 0,
          y: 0,
          image: item.image,
          width: item.width,
          height: item.height
        }
      },
      load() {
        let item = this.config;
        item._loaded = false;
        let imageObj = new Image();
        item.image = imageObj;
        imageObj.src = item.src;
        imageObj.onload = () => {
          this.loaded = true;
          this.$emit('loaded', this.item);
        };
      }
    }
  }
</script>
