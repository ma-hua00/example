// 其他复杂校验规则
let otherRule = {
  IdCard:function (number){
    number=number.toLowerCase();
    var date, Ai;
    var verify = "10x98765432";
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var area = ['','','','','','','','','','','','北京','天津','河北','山西','内蒙古','','','','','','辽宁','吉林','黑龙江','','','','','','','','上海','江苏','浙江','安微','福建','江西','山东','','','','河南','湖北','湖南','广东','广西','海南','','','','重庆','四川','贵州','云南','西藏','','','','','','','陕西','甘肃','青海','宁夏','新疆','','','','','','台湾','','','','','','','','','','香港','澳门','','','','','','','','','国外'];
    var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
    if(re == null) return false;
    if(re[1] >= area.length || area[re[1]] == "") return false;
    if(re[2].length == 12){
      Ai = number.substr(0, 17);
      date = [re[9], re[10], re[11]].join("-");
    }
    else{
      Ai = number.substr(0, 6) + "19" + number.substr(6);
      date = ["19" + re[4], re[5], re[6]].join("-");
    }
    if(!this.IsDate(date, "ymd")) return false;
    var sum = 0;
    for(var i = 0;i<=16;i++){
      sum += Ai.charAt(i) * Wi[i];
    }
    Ai +=  verify.charAt(sum%11);
    return (number.length ==15 || number.length == 18 && number == Ai);
  },
  
  IsDate:function(op, formatString){
    formatString = formatString || "ymd";
    var m, year, month, day;
    switch(formatString){
      case "ymd" :
        m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
        if(m == null ) return false;
        day = m[6];
        month = m[5]*1;
        year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
        break;
      case "dmy" :
        m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
        if(m == null ) return false;
        day = m[1];
        month = m[3]*1;
        year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
        break;
      default :
        break;
    }
    if(!parseInt(month)) return false;
    month = month==0 ?12:month;
    var date = new Date(year, month-1, day);
    return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth()+1) && day == date.getDate());
    function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
  } 
}


// 手机号
export function checkPhone(rule, value, callback) {
  const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
  if (!value) {
    return callback(new Error('请填写手机号'))
  } else if (!reg.test(value)) {
    return callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

// 身份证
export function checkIdCard(rule, value, callback) {
  if (!value) {
    return callback(new Error('请填写身份证号'))
  } else if (!otherRule.IdCard(value)) {
    return callback(new Error('请填写正确的身份证号'))
  } else {
    callback()
  }
}


// 邮箱
export function checkEmail(rule, value, callback) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('请输正确的邮箱'))
  } else {
    callback()
  }
}

export default {
  phone: [
    {required: true, message: '请填写手机号', trigger: 'blur'},
    {type: 'string',validator:checkPhone,trigger: 'blur' },
  ],
  idCard: [
    {required: true, message: '请填写身份证号', trigger: 'blur'},
    {type: 'string',validator:checkIdCard,trigger: 'blur' },
  ],
  Email:[
    {required: true, message: '请填写邮箱', trigger: 'blur'},
    {type: 'string',validator:checkEmail,trigger: 'blur' },
  ]
}