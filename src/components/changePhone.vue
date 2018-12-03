<template>
  <div class="con">
    <div class="table">
      <div class="input">
        <img src="../assets/img/shouji@1x.png" alt="">
        <x-input placeholder="请输入新手机号" :show-clear="true"  v-model="tel"></x-input>
      </div>
      <div class="input">
        <img src="../assets/img/yanzhengma@1x.png" alt="">
        <input type="text" placeholder="请输入验证码" v-model="code">
        <p @click="getCode">{{cored}}</p>
      </div> 
    <div class="sub" @click="checkCode">保存</div>
    </div>
    <!-- 去登陆的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="show6" :show-cancel-button="false" title="手机号更改成功" @on-confirm="$router.push('/login')">
        <p style="text-align:center;">请重新登录</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import {sendCode,smsCkeck,updataPhone} from '../api/api.js'
import { XInput ,Confirm, TransferDomDirective as TransferDom  } from 'vux'
export default {
   directives: {
    TransferDom
  },
   components: {
    XInput,
    Confirm,
  },
  data () {
    return {
      token: sessionStorage.token,
      tel: '',
      code:'',
      cored:'获取验证码',
      show6:false,
    }
  },
  created(){
    document.title = '更换手机号'
  },
  methods:{
    getCode(){
      if(!utils.regPhone(this.tel)){
         this.$vux.toast.text('请输入正确手机号', 'middle')
        return
      }
      this.reqGetCode()
    },
    reqGetCode(){
      if(!this.flag){
        const options = {
          mobile :this.tel,
          smsType:'mobile '
        }
        sendCode(options).then(res=>{
          console.log(res)
          if(res.data.code == 200 && !res.data.error_code){
             console.log(res.data.data.sign)
              sessionStorage.sign2 = res.data.data.sign
              console.log(sessionStorage.sign2)
              this.changeCored()
              this.$vux.toast.text(`验证码已发送至${this.tel}`, 'middle')
            }else{
              this.$vux.toast.text(res.data.error_message||res.data.message)
          }       
        })
      }
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
    //验证验证码
    checkCode(){
       console.log(sessionStorage.sign2)
      const options = {
        mobile :this.tel,
        smsType:'mobile',
        code: this.code,
        sign : sessionStorage.sign2
      }
      smsCkeck(options).then(res=>{
        console.log(res,111)
        if(res.data.code == 200 && !res.data.error_code){
          this.changeTel()
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //更改手机号
    changeTel(){
      if(!this.tel || !utils.regPhone(this.tel)){
        this.$vux.toast.text('请填写正确手机号','middle')
        return
      }if(!this.code){
        this.$vux.toast.text('请填写验证码','middle')
        return
      }
      const options = {
        token : this.token,
        mobile : this.tel,
        code:this.code,
        sign:sessionStorage.sign2
      }
      updataPhone(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.show6 = true
          sessionStorage.removeItem('sign2')
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
    height l(120)
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 #E8E8E8;
    input::placeholder
      fz(16)
    div.input:nth-of-type(2)
      border-bottom 0
    .input
      width 100%
      height l(60)
      display flex
      justify-content flex-start
      align-items center
      border-bottom 1px solid #E8E8E8
      img 
        display block
        width l(17)
        height l(18)
        margin-right l(10)
      input 
        display block
        width 70%
        height 100%
        line-height l(60)
        font-size: 16px;
        color: #333333;
        letter-spacing: 0.34px;
        line-height: 20px;
      p 
        background: #E8E8E8;
        border-radius: 6px;
        font-size: 12px;
        color: #95514C;
        letter-spacing: 0.2px;
        width l(100)
        height l(32)
        line-height l(32)
  .agree
    width 100%
    display flex
    justify-content flex-start
    align-items center
    fz(14)
    color #83271F
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
    background: #83271F;
    border-radius: 100px;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 1.12px;
    line-height l(44)
    margin-left 28.8%
    margin-top l(100)
</style>
