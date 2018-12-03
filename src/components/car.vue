<template>
  <div class="con">
    <swipeout class="vux-1px-tb">
      <swipeout-item transition-mode="follow" v-for="i in 3" :key="i">
        <div slot="right-menu">
          <swipeout-button type="warn" @click.native="handle(i)">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
          <li>
            <img src="../assets/img/c_blank.png" alt="" class="car_s">
            <img src="../assets/img/list1.png" alt="" class="car_img">
            <div class="car_p">
              <span>安溪铁观音</span>
              <p class="t_d">2018/09/18 绿茶18期</p>
              <div class="t_num">
                <p>￥<span>1399</span>.00</p>
                <div>
                  <p></p>3 <p></p>
                </div>
              </div>
            </div>
         </li>
        </div>
      </swipeout-item>
    </swipeout>
    <div class="yun">
      运费
      <span>顺丰包邮</span>
    </div>
    <div class="blank"></div>
    <!-- 底部 -->
    <div class="footer">
      <img src="../assets/img/c_blank.png" alt="" v-if="!selectAll">
      <img src="../assets/img/c_active.png" alt="" v-else>
      <span>全选</span>
      <div>
        总计:<p>￥<span>1399</span>.00</p>
      </div>
      <p class="goPay">去结算</p>
    </div>
  </div>
</template>

<script>
import {  Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
import {Login} from '../api/api.js'
export default {
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  data () {
    return {
      selectAll :true,
    }
  },
  created(){
    document.title = '购物车'
  },
  methods:{
    handle(i){
      alert('要删除第'+i)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  border-top 1px solid  #E8E8E8
  padding-top l(10)
  height l(666)
  overflow-y scroll
  .demo-content.vux-1px-t
    // padding 0
  ul,.demo-content
    padding 0 4.3%
    background #fff
    li.last
      border-bottom 0
    li
      height l(126) 
      disFlex()
      padding 6% 0
      border-bottom 1px solid #E8E8E8
      .car_s
        display block
        width l(18)
        height l(18)
      .car_img
        display block
        width l(106)
        height l(85)
      .car_p
        width 54%
        height 100%
        text-align left 
        span 
          line-height l(22)
          fz(16)
          color: #333333
          letter-spacing 0.3px
        p.t_d
          line-height l(20)
          fz(14)
          color #666666
          letter-spacing 0.3px
          margin-top l(6)
        div.t_num
          disFlex()
          margin-top l(10)
          p
            color #E63443
            fz(14)
            span 
              fz(18)
              color #E63443
          div
            width l(82)
            height l(23)
            backgroundIcon ('a&r.png')
            disFlex()
            color: #666666;
            letter-spacing: 0.22px;
            p
              width l(25)
              height 100%
  .yun
    margin-top l(10)
    height l(64)
    fz(16)
    color #333
    line-height l(64)
    disFlex()
    padding 0 4.3%
    background #fff
    span 
      color: #E63443;
      fz(14)

  .footer
    background #fff
    width 100%
    display flex
    justify-content flex-start
    align-items center
    height l(44)
    position fixed
    bottom 0
    left 0
    padding-left 4.3%
    img
      display block
      width l(18)
      height l(18)
    span 
      fz(14)
      color: #666666;
      letter-spacing: 0.31px;
      margin-left l(5)
    div
      height 100%
      color: #333333;
      letter-spacing: 0.17px;
      fz(14)
      disFlex()
      line-height l(44)
      margin-left l(30)
      p
        color: #E63443;
        letter-spacing: 0.17px;
        fz(14)
        margin-left l(5)
        span 
          fz(18)
          color: #E63443;
    p.goPay
      height 100%
      width l(117)
      background: #83271F;
      fz(18)
      color: #FFFFFF;
      letter-spacing: 1.12px;
      line-height l(44)
      position absolute
      top 0
      right 0
  .blank
    height l(44)
    margin-top l(20)
</style>
