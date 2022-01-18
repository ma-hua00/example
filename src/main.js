import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {setCookie,getCookie,checkCookie,clearCookie} from "@src/utils/cookie.js"
import validator from "@src/utils/validator.js";
import config from "@src/utils/config.js"

Vue.config.productionTip = false

Vue.prototype.$config = config;
Vue.prototype.$validator = validator;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$checkCookie = checkCookie;
Vue.prototype.$clearCookie = clearCookie;

/**
 * 页面跳转
 *    如果设置data-url 使用路由地址跳转 （this.$route.query接受参数，地址栏上可见参数）
 *     params 是可以
 * */
Vue.prototype.$skip = (e,params)=>{
  var dataset = e.target.dataset;
  var url = dataset.url;
  if(!url)return;
  app.$router.push({path:url,query:params?params:''});
}

Vue.prototype.$replace = (e,params)=>{
  var dataset = e.target.dataset;
  var url = dataset.url;
  if(!url)return;
  app.$router.replace({path:url,query:params?params:''});
}

Vue.prototype.$back = ()=>{
  app.$router.go(-1);
}

var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app