import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import "bulma/css/bulma.min.css";
import "./servers/firebase";

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
