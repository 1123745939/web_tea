<template>
  <div class="con">
    <div class="table">
      <div class="input">
        <img src="../assets/img/tel.png" alt="" class="img1">
        <x-input placeholder="请输入手机号" :show-clear="true"  v-model="tel"></x-input>
      </div>
      <div class="input">
        <img src="../assets/img/yanzhengma@1x.png" alt="" class="img2">
        <input type="text" placeholder="请输入验证码" v-model="code">
        <p @click="getCode">{{cored}}</p>
      </div>
      <div class="input">
        <img src="../assets/img/shezhi@1x.png" alt="">
        <input type="password" placeholder="请设置6-20位密码" v-model="pass1" class="input1">
      </div>
      <div class="input">
        <img src="../assets/img/genghuanmima@1x.png" alt="">
        <input type="password"  placeholder="确认密码"  v-model="pass2" class="input1">
      </div>
    </div>
    <div class="agree" @click="ifAgree = !ifAgree">
      <img src="../assets/img/c_blank.png" alt="" v-show="!ifAgree">
      <img src="../assets/img/c_active.png" alt="" v-show="ifAgree">
      同意注册协议
    </div>
    <div class="sub" @click="checkCode">完成</div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import {sendCode,smsCkeck,regist} from '../api/api.js'
import { XInput } from 'vux'
import md5 from 'js-md5';
export default {
   components: {
    XInput
  },
  data () {
    return {
      tel: '',
      code:'',
      pass1: '',
      pass2: '',
      ifAgree:false,
      flag:false,
      cored:'获取验证码',
    }
  },
  created(){
    document.title = '注册'
  },
  methods:{
    getCode(){
      if(!utils.regPhone(this.tel)){
         this.$vux.toast.text('请输入正确手机号', 'middle')
        return
      }
      this.reqGetCode()
    },
    //改变文字
    changeCored(){
      if(!this.flag){
        this.flag = true;
          let ff = 60;
          let that = this
          let time = setInterval(()=>{
            this.cored = ff-- + "s后重新发送";
              if(ff<=0){
                this.flag = false
                  clearInterval(time)
                  this.cored ='获取验证码'
              }
          },1000)
      }else{
        this.$vux.toast.text('请稍后再操作', 'middle')
        return;
      }
    },
    //请求发送验证码
    reqGetCode(){
      if(!this.flag){
        const options = {
          mobile :this.tel,
          smsType:'register '
        }
        sendCode(options).then(res=>{
          console.log(res)
          if(res.data.code == 200 && !res.data.error_code){
              this.changeCored()
              sessionStorage.sign = res.data.data.sign
              this.$vux.toast.text(`验证码已发送至${this.tel}`, 'middle')
            }else{
              this.$vux.toast.text(res.data.error_message||res.data.message)
          }       
        })
      }
    },
    //校验验证码
    checkCode(){
      const options = {
        mobile :this.tel,
        smsType:'register',
        code: this.code,
        sign : sessionStorage.sign
      }
      smsCkeck(options).then(res=>{
        console.log(res,111)
        if(res.data.code == 200 && !res.data.error_code){
          this.checkAll()
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    checkAll(){
      if(!this.tel || !utils.regPhone(this.tel)){
        this.$vux.toast.text('请填写正确手机号','middle')
        return
      }if(!this.code){
        this.$vux.toast.text('请填写验证码','middle')
        return
      }if(this.pass1.length<6 || this.pass1.length >20){
        this.$vux.toast.text('请填写6-20位密码','middle')
        return
      }if(this.pass1 != this.pass2){
        this.$vux.toast.text('两次密码不一致','middle')
        return
      }if(!this.ifAgree){
        this.$vux.toast.text('请同意用户协议','middle')
        return
      }
      var options = {}

    
      if(localStorage.oid){
        options = {
          mobile :this.tel,
          code:this.code,
          smsType:'register',
          password :md5(this.pass1),
          password_confirmation :md5(this.pass2),
          sign :sessionStorage.sign,
          openid:localStorage.oid
        }
      }else if (localStorage.qid) {
        options = {
          mobile :this.tel,
          code:this.code,
          smsType:'register',
          password :md5(this.pass1),
          password_confirmation :md5(this.pass2),
          sign :sessionStorage.sign,
          qid:localStorage.qid
        }
      }else{
        options = {
          mobile :this.tel,
          code:this.code,
          smsType:'register',
          password :md5(this.pass1),
          password_confirmation :md5(this.pass2),
          sign :sessionStorage.sign
        }
      }   
      regist(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('注册成功','middle')      
          localStorage.token = res.data.data.access_token
          setTimeout(()=>{
            this.$router.push('/')
          },1000)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
     

    },
   

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  height l(667)
  background  #F7F7F7;
  border-top 1px solid #E8E8E8
  padding-top l(10)
  .table
    padding 0 4.3%
    height l(243)
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 #E8E8E8;
    img.img1
      width l(14)
    img.img2
      width l(16)
    img 
      display block
      width l(16)
      height l(16)
      margin-right l(10)
    input::placeholder
      fz(16)
    .input:last-of-type
      border-bottom 0
    .input
      width 100%
      height l(60)
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #E8E8E8
      .input1
        width 90%
      input::placeholder
        color: #B5B6B7;
        FZ(12)
      input 
        display block
        width 60%
        height 100%
        line-height l(60)
        fz(12)
        color:#666
        letter-spacing: 0.3px;
        line-height: 20px;
      p 
        width l(100)
        background: #E8E8E8;
        border-radius: 6px;
        font-size: 12px;
        color: #ff5100;
        letter-spacing: 0.2px;
        padding 0 l(5)
        height l(32)
        line-height l(32)
  .agree
    width 100%
    display flex
    justify-content flex-start
    align-items center
    fz(14)
    color #ff5100
    line-height l(20)
    margin l(15) 0
    padding 0 4.3%
    img   
      display block
      width l(18)
      height l(18)
      margin-right l(10)
  .sub
    width l(160)
    height l(44)
    background: #ff5100
    border-radius: 100px;
    fz(16)
    color: #FFFFFF;
    letter-spacing: 1.12px;
    line-height l(44)
    margin-left 28.8%
    margin-top l(100)
</style>
