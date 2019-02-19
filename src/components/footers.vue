<template>
  <div class="convv" ref="cons"> 
    <div class="no_use"></div> 
    <div class="footer">
      <ul class="f_r">
         <li  @click="$router.push('/') " :class="index==1?'active':''">
          <img src="../assets/img/1s.png" alt="" v-if="index==1">
          <img src="../assets/img/1.png" alt="" v-else>
          首页
        </li>
        <li  @click="token == ''? loginMaskShow=true : $router.push('/my') " :class="index==2?'active':''">
          <img src="../assets/img/2s.png" alt="" v-if="index==2">
          <img src="../assets/img/2.png" alt="" v-else>
          所爱
        </li>
         <li @click="token == ''? loginMaskShow=true : $router.push('/orders')" :class="index==3?'active':''">
          <img src="../assets/img/3s.png" alt="" v-if="index==3">
          <img src="../assets/img/3.png" alt="" v-else>
          订单
        </li>
         <li @click="$router.push('/more')" :class="index==4?'active':''">
          <img src="../assets/img/4s.png" alt=""  v-if="index==4" class="tea">
          <img src="../assets/img/4.png" alt=""  v-else class="tea">
          更多
        </li>
      </ul>
    </div>

    <!-- 提示去登录的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="loginMaskShow" title="您还没有登录" @on-confirm="$router.replace({path:'/login'})">
        <p style="text-align:center;">现在去登录?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import { Confirm,TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm,
  },
  data () {
    return {
      token : localStorage.token || '',
      img_link : '',
      loginMaskShow:false,
    }  
  },
  props: {
    index:{
      type:Number
    }
  },
  created(){
    console.log(this.index)
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
  .no_use
    height l(70)
  .footer
    position fixed
    bottom 0
    left 0
    height l(75)
    display flex
    justify-content space-between
    width 100%
    background #f7f7f7
    padding-top l(2)
    .f_l
      width 26.1%
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      fz(10)
      color: #666666;
      background #ffffff
      img 
        display block
        width l(41)
        height l(41)
        border-radius 50%
    .f_r  
      display flex
      justify-content space-between
      width 100%
      background #fff
      padding l(8) 0 l(14)
      li.active
        color #FF5100
      li  
        width 33%
        display flex
        flex-direction column
        justify-content space-around
        align-items center
        fz(10)
        color #666
        letter-spacing: 1px;
        font-family: PingFangSC-Medium;
        img.tae
          width l(25)
          height l(23)
        img
          width l(22)
          height l(22)
          display block


</style>
