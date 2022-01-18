/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import {getCookie,clearCookie} from './cookie';
// import {Message } from 'element-ui'
import app from '@src/main.js'

// 环境的切换
const BASEURL = process.env.VUE_APP_URL;

console.log(BASEURL)

var service = axios.create({
  baseURL:BASEURL,
  timeout: 15000,
  withCredentials:true
});



// 请求拦截器
service.interceptors.request.use(

  config => {
    const token = getCookie('USER_MESSAGE');
    token && (config.headers.Authorization = token);
    // 在请求之前做些什么，后台需要的参数如（Token，userId）
    return config;
  },
  error => {
    return Promise.error(error);
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    // 对响应数据做些什么
    let data = res.data;
    if (data.code === 200) {
      return Promise.resolve(res.data);
    } else {
      handle(data);
      return Promise.reject(res);
    }
  },
  // 服务器状态码不是200的情况    
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 401: 未登录                             
        case 401:
          break;
          // 403 token过期                            
        case 403:
          break;
          // 404请求不存在                
        case 404:
          break;
          // 其他错误，直接抛出错误提示                
        default:
          
      }
      return Promise.reject(error.response);
    }
  }
);

//错误统一处理
function handle(data){
  // data.code == '-500'
  if(data.code == '10106'){
    clearCookie('USER_MESSAGE')
    app.$router.push({path:"/login"});
  }
  alert('网络出错了,请稍后再试')
  // Message({ message: data.message?data.message:'网络出错了,请稍后再试',type: 'warning'})
}

export default service;

 
