<template>
  <div class="con">
    <div class="content">
      <div class="table">
        <div class="input">
          旧密码
          <input type="password" placeholder="请输入旧密码" v-model="passOld">
        </div>
        <div class="input">
          新密码
          <input type="password" placeholder="请输入新密码" v-model="passNew1">
        </div>
        <div class="input">
          确认密码
          <input type="password"  placeholder="请再次输入新密码"  v-model="passNew2">
        </div>
      </div>
    <div class="sub" @click="submit">保存</div>
    </div>
     <!-- 去登陆的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="show6" :show-cancel-button="false" title="密码修改成功" @on-confirm="$router.push('/login')">
        <p style="text-align:center;">请重新登录</p>
      </confirm>
    </div>
    <footers :index = 2></footers>
  </div>
</template>

<script>
import footers from './footers'
import utils from '../utils/js/style.js'
import {updataPass} from '../api/api.js'
import { Confirm, TransferDomDirective as TransferDom} from 'vux'
import md5 from 'js-md5';
export default {
    directives: {
    TransferDom
  },
   components: {
    Confirm,
    footers
  },
  data () {
    return {
      passOld: '',
      passNew1: '',
      passNew2: '',
      show6:false,
    }
  },
  created(){
    document.title = '更换密码'
  },
  methods:{
    submit(){
      if(!this.passOld){
        this.$vux.toast.text('请填写旧密码','middle')
        return
      }if(!this.passNew1 || this.passNew1.length <6 || this.passNew1.length >20){
        this.$vux.toast.text('请填写6-20位密码','middle')
        return
      }if(this.passNew1 != this.passNew2){
        this.$vux.toast.text('两次密码不一致','middle')
        return
      }
      const options = {
        token : utils.getCookie('token') || '',
        password : md5(this.passNew1),
        password_confirmation :md5(this.passNew2)
      }
      updataPass(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.show6 = true
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  height 100vh
  background  #F7F7F7;
  border-top 1px solid #E8E8E8
  padding-top l(10)
  .content
    height 87vh
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 #E8E8E8;
    .table
      padding l(10) 4.3% 0
      input::placeholder
        fz(14)
        color  #B5B6B7;
      .input:last-of-type
        border-bottom 0
      .input
        width 100%
        height l(60)
        display flex
        justify-content space-between
        align-items center
        fz(14)
        color: #333333;
        letter-spacing: 0.34px;
        padding l(5) 0

        img 
          display block
          width l(14)
          height l(18)
          margin-right l(10)
        input 
          display block
          width 72%
          height l(44)
          line-height l(60)
          fz(14)
          color:  #666
          letter-spacing: 0.34px;
          line-height: 20px;
          margin-left l(20)
          border: 1px solid #E8E8E8;
          border-radius: 6px;
          padding-left l(10)
    .sub
      width l(160)
      height l(44)
      background: #FF5100;
      border-radius: 100px;
      font-size: 18px;
      color: #FFFFFF;
      letter-spacing: 1.12px;
      line-height l(44)
      margin-left 28.8%
      margin-top l(90)
</style>
