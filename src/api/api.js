import axios from './index'

// import domain from './domain.js'
let baseUrl = 'http://uat.api.chajisong.com'+'/v1'     //  http://fef9efe1dbfd5199.natapp.cc
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
    //我的页面   相关数据
export const myData = function (params) {
  return axios.get(`${baseUrl}`+"/my", {params});
}    
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
  //爱好调查问卷
export const HobbyList = function (params) {
  return axios.get(`${baseUrl}`+"/my/hobby", {params});
} 
  //提交调查问卷
export const saveQuestion = function (params) {
  return axios.post(`${baseUrl}`+"/my/hobby/create", jsonToQuery(params));
}      
  //我的收藏
export const collectList = function (params) {
  return axios.get(`${baseUrl}`+"/my/data/collects", {params});
} 
   //我的点赞
export const thumbsList = function (params) {
  return axios.get(`${baseUrl}`+"/my/data/thumbs", {params});
} 
   //我的足迹
export const slotsList = function (params) {
  return axios.get(`${baseUrl}`+"/my/data/slots", {params});
} 
    //通知列表
export const infos = function (params) {
  return axios.post(`${baseUrl}`+"/notify", jsonToQuery(params));
} 
    //单条删除/notify/delete
export const infosDelOne = function (params) {
  return axios.post(`${baseUrl}`+"/notify/read", jsonToQuery(params));
} 
    //单条删除
export const infosDelAll = function (params) {
  return axios.post(`${baseUrl}`+"/notify/delete", jsonToQuery(params));
} 



//首页数据
  //全部
    //全部中的置顶和预售
export const getAlltop= function (params) {
  return axios.post(`${baseUrl}`+"/index/data", jsonToQuery(params));
}
    //全部中 除了置顶和预售之外的数据
export const getAll = function (params) {
  return axios.post(`${baseUrl}`+"/index/tea/all", jsonToQuery(params));
}
    //预告
export const getAdvance = function (params) {
  return axios.post(`${baseUrl}`+"/index/tea/advance", jsonToQuery(params));
}
    //推荐
export const getRecommand = function (params) {
  return axios.post(`${baseUrl}`+"/index/tea/recommand", jsonToQuery(params));
}
    //我的收藏(主页)
export const myCollect = function (params) {
  return axios.post(`${baseUrl}`+"/index/tea/collect", jsonToQuery(params));
}
    //点赞
export const vidioThumb = function (params) {
  return axios.post(`${baseUrl}`+"/index/vidio/thumb", jsonToQuery(params));
}    
    //收藏
export const vidioCollect = function (params) {
  return axios.post(`${baseUrl}`+"/index/vidio/collect", jsonToQuery(params));
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
//////搜索结果
export const getSearch = function (params) {
  return axios.post(`${baseUrl}`+"/index/data/result", jsonToQuery(params));
}
//////商品详情
export const getGoodDetail = function (params) {
  return axios.get(`${baseUrl}`+"/index/tea/detail", {params});
}
     //全部评价
export const commentAll = function (params) {
  return axios.post(`${baseUrl}`+"/comment", jsonToQuery(params));
}

//购物车相关
      //购物车列表
export const carList = function (params) {
  return axios.get(`${baseUrl}`+"/shop", {params});
}
      //加入购物车
export const addShop = function (params) {
  return axios.post(`${baseUrl}`+"/shop/create", jsonToQuery(params));
}
      //删除购物车
export const delShop = function (params) {
  return axios.post(`${baseUrl}`+"/shop/delete", jsonToQuery(params));
}
      //保存购物车的数量
export const SaveShop = function (params) {
  return axios.post(`${baseUrl}`+"/shop/count", jsonToQuery(params));
}
    //购物车结算时 校验库存
export const orderCheck = function (params) {
  return axios.post(`${baseUrl}`+"/order/settle/check", jsonToQuery(params));
} 
    //直接购买时 校验库存
export const orderBuyCheck = function (params) {
  return axios.post(`${baseUrl}`+"/order/buy/check", jsonToQuery(params));
} 
      //购物车下单
export const orderPay = function (params) {
  return axios.post(`${baseUrl}`+"/order/order", jsonToQuery(params));
}
    //直接下单
export const orderBuy = function (params) {
  return axios.post(`${baseUrl}`+"/order/buy", jsonToQuery(params));
}

//订单相关
      //订单详情
export const orderDetail= function (params) {
  return axios.get(`${baseUrl}`+"/order/detail", {params});
}
      //订单列表
export const orderList = function (params) {
  return axios.post(`${baseUrl}`+"/order", jsonToQuery(params));
}
      //取消订单
export const orderCancel = function (params) {
  return axios.get(`${baseUrl}`+"/order/cancel", {params});
}
     //确认收货
export const orderConfirm = function (params) {
  return axios.get(`${baseUrl}`+"/order/confirm", {params});
}
     //删除订单
export const orderDel = function (params) {
  return axios.get(`${baseUrl}`+"/order/delete", {params});
}
    //不喜欢/order/unlike/create
export const orderUnlike = function (params) {
  return axios.post(`${baseUrl}`+"/order/unlike/create", jsonToQuery(params));
}
      //评论上传图片
export const orderUploadImg = function (params) {
  return axios.post(`${baseUrl}`+"/order/comment/image", jsonToQuery(params));
}
      //评论上传视频
export const orderUploadVidio = function (params) {
  return axios.post(`${baseUrl}`+"/order/comment/vidio", jsonToQuery(params));
}
      //删除上传的图片或者视频
export const orderDelComment = function (params) {
  return axios.post(`${baseUrl}`+"/order/comment/delete", jsonToQuery(params));
}
     //发表评论
export const orderAddComment = function (params) {
  return axios.post(`${baseUrl}`+"/order/comment/create", jsonToQuery(params));
}
     //可评价订单
export const orderCanComment = function (params) {
  return axios.post(`${baseUrl}`+"/order/comments", jsonToQuery(params));
}
    //申请售后
export const orderApply = function (params) {
  return axios.post(`${baseUrl}`+"/order/apply", jsonToQuery(params));
}

//热评
      //热评详情
export const commentDetail = function (params) {
  return axios.get(`${baseUrl}`+"/comment/detail", {params});
}
     //点赞当前热评/comment/reply/thumb
export const commentThumb = function (params) {
  return axios.post(`${baseUrl}`+"/comment/thumb", jsonToQuery(params));
}
     //回复当前热评
export const commentReply = function (params) {
  return axios.post(`${baseUrl}`+"/comment/reply", jsonToQuery(params));
}
     //点赞留言
export const commentReplyThumb = function (params) {
  return axios.post(`${baseUrl}`+"/comment/reply/thumb", jsonToQuery(params));
}
     //留言回复
export const commentReplyReply = function (params) {
  return axios.post(`${baseUrl}`+"/comment/reply/reply", jsonToQuery(params));
}  
     //回复的回复列表
export const commentReplyList = function (params) {
  return axios.post(`${baseUrl}`+"/comment/reply/list", jsonToQuery(params));
}   

   //去支付页面 验证库存
export const orderSettle = function (params) {
  return axios.post(`${baseUrl}`+"/order/settle", jsonToQuery(params));
} 


    //客服/custom
export const custom = function (params) {
  return axios.get(`${baseUrl}`+"/custom", {params});
}