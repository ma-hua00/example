// import { MessageBox} from 'element-ui'
export default {
  //地址参数 对象合成 加密 list 传参对象  boolen 如果不存在或者为真就加密  boolen false解密
  httprequestencode(list,boolen){
    let params = [];

    boolen=boolen==false?boolen:true;

    for(let i in list){
      let item =boolen?window.btoa(unescape(encodeURIComponent(list[i]))):decodeURIComponent(escape(window.atob(list[i])));
      params.push(i + "=" + item);
    }
    return params.length>0 ? '?' + params.join("&") : '';
  },

  btoa(str,boolen){
    boolen=boolen==false?boolen:true;
    return boolen?window.btoa(unescape(encodeURIComponent(str))):decodeURIComponent(escape(window.atob(str)));
  },

  // 弹窗
  // confirm:function(op){
  //   let ops = op?op:{};
  //   return new Promise((resolve) => {
  //     MessageBox.confirm(ops.text || "内容", ops.title || "提示", {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: ops.type || 'warning'
  //     }).then((action )=>{
  //       resolve(action)
  //     }).catch(()=>{})
  //   })
  // },
}


Date.prototype.format = function (fmt) { //author: meizz 
  var cNumber = ["日", "一", "二", "三", "四", "五", "六"];
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒
    'w+': cNumber[this.getUTCDay()], //星期
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}