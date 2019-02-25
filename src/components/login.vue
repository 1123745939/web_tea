<template>
  <div class="con">
    <div class="content">
      <div class="blank"></div>
      <div class="box">
        <div class="tel">
          <img src="../assets/img/login1.png" alt="">
          <input type="tel" placeholder="请输入手机号" v-model="tel">
        </div>
        <div class="tel">
          <img src="../assets/img/suo.png" alt="">
          <input type="password" placeholder="请输入密码" v-model="pass">
        </div>
        <div class="pass">
          <p @click="$router.push('/forgetPass')">忘记密码？</p>
          <p @click="$router.push('/register')" class="reguister">立即注册</p>
          
        </div>
        <div class="login"  @click="GoLogin">登录</div>
      </div>
      <div class="bot">
        <div class="three">
          <img src="../assets/img/login3.png" alt="">
        </div>
        <div class="wx">
          <img src="../assets/img/QQ@23x.png" alt="" @click="goQQ">
          <img src="../assets/img/WEIXIN@2x.png" alt=""  @click="goWX" class="wximg" v-if="is_wx"> 
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import domain from '../api/domain.js'
import utils from '../utils/js/style.js'
import {Login} from '../api/api.js'
import md5 from 'js-md5';
export default {
  data () {
    return {
      tel: '',
      pass: '',
      redirect:'',
      is_wx:false,
    }
  },
  
  created(){
    this.init()
    document.title = '登录'
  },
  methods:{
    //判断是不是微信浏览器  如果是 则不显示微信登录图标 如果不是 那就显示微信图标
    init(){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        this.is_wx = true
      }else{
        this.is_wx = false
      }
    },
    GoLogin(){
      if(!utils.regPhone(this.tel)){
        this.$vux.toast.text('请输入正确手机号!', 'middle')
        return
      }
      var options = {}
      if(localStorage.oid){
          options = {
          mobile : this.tel,
          password : md5(this.pass),
          openid:localStorage.oid

        }
      }else{
        options = {
          mobile : this.tel,
          password : md5(this.pass)
        }
      }   
      Login(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          localStorage.token = res.data.data.access_token
          let firstTime = new Date().getTime()
          console.log(firstTime)
          localStorage.firstTime = firstTime
          //utils.setCookie('token',res.data.data.access_token,90)
          this.$router.replace('/')
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      }) 
    },
    //跳转qq
    goQQ(){
      window.location.href = domain.domain + `/v1/qq`
    },
    //去微信
    goWX(){
      window.location.href = domain.domain + `/v1/jsapi/redirect`
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  height 100vh
  backgroundIcon ('loginbg.png')
  background-size 100% 100%
  .content
    width 100%
    height 100%
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    padding-bottom l(50)
    .blank
      width 100%
      height l(150)
    .box
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      padding 0 12.5%
      height l(300)
      .tel
        width 100%
        height l(54)
        display flex
        justify-content flex-start
        align-items center
        border-bottom 2px solid rgba(255,255,255,0.15)
        padding l(40) 0 l(30)
        img 
          display block
          width l(16)
          height l(16)
          margin-right l(15)
        input 
          outline none 
          border none 
          background-color transparent!important
          display block
          height l(30)
          width 90%
          line-height l(30)
          fz(14)
          letter-spacing: 0.2px;
          color rgba(255,255,255,0.70)
          padding-left l(5)
        input::placeholder
          fz(14)
          color: rgba(255,255,255,0.60);
          letter-spacing: 0.2px;
          line-height l(30)
      .pass
        disFlex()
        width 100%
        p.reguister 
          color: rgba(255,81,0,0.60);
        p
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.2px;
          line-height l(17)
          text-align right 
          padding-top l(10)
      .login
        width l(280)
        height l(44)
        background: #ff5100
        opacity 0.8
        border-radius: l(100)
        fz(16)
        color: #FFFFFF;
        letter-spacing: 0.2px;
        line-height l(44)
        margin-top l(70)
        font-family: PingFangSCM;
    .registe
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.23px;
      line-height l(20)
      width 100%
      display flex
      justify-content center
      align-items center
      img 
        display block
        width l(8)
        height l(13)
        margin-left l(10)
  .bot
    .three
      width 100%
      display flex
      justify-content center
      align-items center
      img 
        display block
        width 70%
        height l(12)
    .wx
      height l(35)
      padding 0 28.8%
      display flex
      justify-content center
      align-items center
      margin-top l(10)
      img.wximg
        margin-left l(30)
      img 
        display block
        width l(35)
        height l(35)
</style>
