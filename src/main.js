import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client'
import router from './router'
import '@mdi/font/css/materialdesignicons.css';

const socket = io('http://172.16.98.151:18000');

Vue.use(VueSocketIOExt, socket);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
