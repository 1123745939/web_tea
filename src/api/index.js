import Vue from 'vue'
import axios from 'axios'
//import router from '.././router/index'

// Vue.prototype.axios = axios;
// axios.defaults.withCredentials = true;


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //加载动画
    Vue.$vux.loading.show({text: 'loading'})
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