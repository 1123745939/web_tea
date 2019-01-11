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
        <p @click="$router.push('/forgetPass')">忘记密码？</p>
        <div class="login"  @click="GoLogin">登录</div>
      </div>
      <div class="registe" @click="$router.push('/register')"> 没有账号？马上注册<img src="../assets/img/more1.png" alt=""></div>
    </div>
    
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import {Login} from '../api/api.js'
import md5 from 'js-md5';
export default {
  data () {
    return {
      tel: '',
      pass: '',
      redirect:''
    }
  },
  
  created(){
    document.title = '登录'
  },
  methods:{
    GoLogin(){
      if(!utils.regPhone(this.tel)){
        this.$vux.toast.text('请输入正确手机号!', 'middle')
        return
      }
      var options = {}
      if(sessionStorage.iod){
          options = {
          mobile : this.tel,
          password : md5(this.pass),
          openid:sessionStorage.iod
        }
      }else{
        options = {
          mobile : this.tel,
          password : md5(this.pass)
        }
      }   
      Login(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          sessionStorage.token = res.data.data.access_token
          sessionStorage.img_link = res.data.data.img_link
          sessionStorage.username = res.data.data.username
          let redirect = this.$route.query.type
          if(redirect !='goodDetail'){
            this.$router.push('/')
          }else {
            this.$router.push('/goodDetail')
          }
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      }) 
    },
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
    padding-bottom l(20)
    .blank
      width 100%
      height l(180)
    .box
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      padding 0 12.5%
      height l(350)
      .tel
        width 100%
        height l(64)
        display flex
        justify-content flex-start
        align-items center
        border-bottom 2px solid rgba(255,255,255,0.40)
        padding l(50) 0 l(30)
        img 
          display block
          width l(18)
          height l(18)
          margin-right l(15)
        input 
          outline none 
          border none 
          background-color transparent!important
          display block
          height l(30)
          width 90%
          line-height l(30)
          fz(16)
          letter-spacing: 0.2px;
          color rgba(255,255,255,0.70)
          padding-left l(5)
        input::placeholder
          fz(16)
          color: rgba(255,255,255,0.70);
          letter-spacing: 0.2px;
          line-height l(30)
      p
        width 100%
        font-size: 12px;
        color: #95514C;
        letter-spacing: 0.2px;
        line-height l(17)
        text-align right 
        padding-top l(10)
      .login
        width l(280)
        height l(44)
        background: #83271F;
        border-radius: l(100)
        fz(18)
        color: #FFFFFF;
        letter-spacing: 0.2px;
        line-height l(44)
        margin-top l(55)
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
</style>
