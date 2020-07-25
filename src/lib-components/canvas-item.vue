<template>
  <v-group v-on="$listeners">
    <v-circle v-if="item.type==='circle'" v-on="$listeners" :config="item"></v-circle>
    <v-ring v-if="item.type==='ring'" v-on="$listeners" :config="item"></v-ring>
    <v-text v-if="item.type==='text'" v-on="$listeners" :config="item"/>
    <v-rect v-if="item.type==='rect'" v-on="$listeners" :config="item"/>
    <v-line v-if="item.type==='line'" v-on="$listeners" :config="item"/>
    <v-star v-if="item.type==='star'" v-on="$listeners" :config="item"/>
    <codigo-canvas-svg v-if="item.type==='path'" v-on="$listeners" :config="item"></codigo-canvas-svg>
    <codigo-canvas-image v-if="item.type==='image'" v-on="$listeners" :config="item"></codigo-canvas-image>
    <v-ellipse v-if="item.type==='ellipse'" v-on="$listeners" :config="item"></v-ellipse>
  </v-group>
</template>

<script>
  export default {
    name: "codigo-canvas-item",
    props: {
      item:{
        type: Object,
        required:true
      }
    }
  }
</script>

