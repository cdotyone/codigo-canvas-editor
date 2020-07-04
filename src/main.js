import Vue from "vue";
import App from "./App.vue";
import CgoCanvasEditor from "./install";

Vue.config.productionTip = false;
Vue.use(CgoCanvasEditor);

new Vue({
  render: h => h(App)
}).$mount("#app");
