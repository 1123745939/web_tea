import axios from 'axios'

// import domain from './domain.js'
let baseUrl = 'http://fef9efe1dbfd5199.natapp.cc'+'/v1'
const jsonToQuery = function (JSON, isEncode) {
  var _fdata = function (data, isEncode) {
    data = data == null ? '' : data;
    data = trim(data.toString());
    if (isEncode) {
      return encodeURIComponent(data);
    }
    return data;
  };
  let _Qstring = [];
  if (typeof JSON === 'object') {
    for (var k in JSON) {
      if (k === '$nullName') {
        _Qstring = _Qstring.concat(JSON[k]);
        continue;
      }
      if (JSON[k] instanceof Array) {
        for (var i = 0, len = JSON[k].length; i < len; i++) {
          _Qstring.push(k + '=' + _fdata(JSON[k][i], isEncode));
        }
      } else {
        if (typeof JSON[k] !== 'function') {
          _Qstring.push(k + '=' + _fdata(JSON[k], isEncode));
        }
      }
    }
  }
  if (_Qstring.length) {
    return _Qstring.join('&');
  }
  return '';
}
const trim = function (str) {
  if (typeof str !== 'string') {
    throw 'trim need a string as parameter';
  }
  let len = str.length;
  let s = 0;
  let reg = /(\u3000|\s|\t|\u00A0)/;
  while (s < len) {
    if (!reg.test(str.charAt(s))) {
      break;
    }
    s += 1;
  }
  while (len > s) {
    if (!reg.test(str.charAt(len - 1))) {
      break;
    }
    len -= 1;
  }
  return str.slice(s, len);
}
// 登录相关
export const Login = function (params) {
  return axios.post(`${baseUrl}`+"/auth/login", jsonToQuery(params));
}
export const sendCode = function (params) {
  return axios.post(`${baseUrl}`+"/sms/send", jsonToQuery(params));
}
export const smsCkeck = function (params) {
  return axios.post(`${baseUrl}`+"/sms/check", jsonToQuery(params));
}
export const regist = function (params) {
  return axios.post(`${baseUrl}`+"/auth/register", jsonToQuery(params));
}
export const forget = function (params) {
  return axios.post(`${baseUrl}`+"/auth/forget", jsonToQuery(params));
}
export const loginOut = function (params) {
  return axios.post(`${baseUrl}`+"/auth/logout", jsonToQuery(params));
}
//我的相关
    //地址相关
export const getAddress = function (params) {
  return axios.get(`${baseUrl}`+"/my/address", {params});
}
export const createAddress = function (params) {
  return axios.post(`${baseUrl}`+"/my/address/create", jsonToQuery(params));
}
export const editAddress = function (params) {
  return axios.post(`${baseUrl}`+"/my/address/edit", jsonToQuery(params));
}
export const deleteAddress = function (params) {
  return axios.post(`${baseUrl}`+"/my/address/delete", jsonToQuery(params));
}
export const defaultAddress = function (params) {
  return axios.post(`${baseUrl}`+"/my/address/default", jsonToQuery(params));
}
export const addressInfo = function (params) {
  return axios.get(`${baseUrl}`+"/my/address/data", {params});
}
     //个人信息
export const getMyInfo = function (params) {
  return axios.get(`${baseUrl}`+"/my/info", {params});
}
    //修改头像
export const updataPhoto = function (params) {
  return axios.post(`${baseUrl}`+"/my/info/photo", jsonToQuery(params));
}
    //修改昵称
export const updataName = function (params) {
  return axios.post(`${baseUrl}`+"/my/info/nickname", jsonToQuery(params));
}
   //修改性别
export const updataSex = function (params) {
  return axios.post(`${baseUrl}`+"/my/info/sex", jsonToQuery(params));
}
   //修改住址
export const updataAddress = function (params) {
  return axios.post(`${baseUrl}`+"/my/info/address", jsonToQuery(params));
}
    //修改手机号
export const updataPhone = function (params) {
  return axios.post(`${baseUrl}`+"/my/info/mobile", jsonToQuery(params));
}
    //修改密码
export const updataPass = function (params) {
  return axios.post(`${baseUrl}`+"/auth/reset", jsonToQuery(params));
}
    //我的收藏
export const myCollect = function (params) {
  return axios.post(`${baseUrl}`+"/index/tea/collect", jsonToQuery(params));
}
    //预告
export const getAdvance = function (params) {
  return axios.post(`${baseUrl}`+"/index/tea/advance", jsonToQuery(params));
}
    //推荐
export const getRecommand = function (params) {
  return axios.post(`${baseUrl}`+"/index/tea/recommand", jsonToQuery(params));
}
    //搜索界面数据
export const getSearchDate = function (params) {
  return axios.get(`${baseUrl}`+"/index/search", {params});
}    
    //历史记录


//商品相关
      //获取历史记录
export const getHistory = function (params) {
  return axios.get(`${baseUrl}`+"/index/search/history", {params});
}
      //删除历史记录
export const delHistory = function (params) {
  return axios.get(`${baseUrl}`+"/index/search/delete", {params});
}
//////搜索页
export const getFilter = function (params) {
  return axios.get(`${baseUrl}`+"/index/data/filter", {params});
}
//////商品详情
export const getGoodDetail = function (params) {
  return axios.get(`${baseUrl}`+"/index/tea/detail", {params});
}
