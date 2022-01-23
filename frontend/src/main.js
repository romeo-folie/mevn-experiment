import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueToastr from "vue-toastr";

Vue.use(VueToastr);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
  mounted() {
    this.$toastr.defaultTimeout = 3000;
  },
}).$mount("#app");
