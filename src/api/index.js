import Vue from 'vue'
import axios from 'axios'
import encrypt from './encrypt'
//import router from '.././router/index'

// Vue.prototype.axios = axios;
// axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //加载动画
    Vue.$vux.loading.show({text: 'loading'})
    
    // 添加签名
    let sign = encrypt.encrypt(config.url)
    if(config.data){
      const dataStr=config.data.replace(/=|&/g,'')
      sign=dataStr.substr(0,3)+sign+dataStr.substr(-3,3)
    }
    //sign = encrypt.encrypt(sign)
    // "pagnv+3yX57wgtZ53GVABPBWYWrW2hRvXI+G5HOB3t6d4+ZtGcrPY9TdyK6Qn4ipPZamtyHywsp46RetEfJ+UnBTakitAshfR5x6P8oe2qt/+1ltGzSa/OJT4qDw/tybAGfU+0Uq9icR3sE8prQZsqHzHkICp3vagTc9WEyDgClWFE=s10"
    config.headers['X-type']=3
    //config.headers['X-Sign']=sign
    console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    //加载动画
    Vue.$vux.loading.hide() 
    return response;
}, function (error) {
    // Do something with response error
    
    // if(error.response.status == 401){
    //   alert('401')
    //   this.$vux.toast.text('token已过期，请重新登录')
    //   setTimeout(()=>{
    //     this.$router.push('/login')
    //   },2000)
    // }

    Vue.$vux.loading.hide()
    return Promise.reject(error);
});
export default axios;