import Vue from 'vue'
import App from './App.vue'
// import '@babel/polyfill'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui';
import TMapAPI from '@/utils/TMapAPI';
import {TMapAppLib} from '@/utils/TMapAppLib';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'
import './permission'

Vue.use(ElementUI)
Vue.config.productionTip = false
window.TMapAPI = TMapAPI;
window.TMapAppLib = TMapAppLib;
Vue.prototype.echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
