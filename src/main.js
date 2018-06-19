// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueMap from 'vue-amap';
import store from './stores/store'
import GLOBAL from './utils/global'
import popBtn from './components/popBtn.vue'
import popForm from './components/popForm.vue'
import yyTable from './components/yyTable.vue'
import yyForm from './components/yyForm.vue'
import axios from './service'
import App from './App'
import observer from './observer.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(GLOBAL)
// Vue.use(VueMap)
Vue.component('pop-btn',popBtn)
Vue.component('pop-form',popForm)
Vue.component('yy-table',yyTable)
Vue.component('pop-form',popForm)
// axios
Vue.prototype.$http = axios
Vue.prototype.$observer = observer

//  // 初始化vue-amap
// VueMap.initAMapApiLoader({
//   // 申请的高德key
//   key: '63978296d871c4802ddacc979d52a37d',
//   // 插件集合
//   plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor']
// }); 


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
