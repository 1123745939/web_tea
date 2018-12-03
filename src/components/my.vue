<template>
  <div class="con">
    <!-- 头部 -->
     <div class="content">
      <div class="car"></div>
      <div class="tab">
        <div class="tab_top">
          <img src="../assets/img/photo-no.png" alt="" @click="$router.push('/personalInfo')">
          <p>您还没有昵称哦</p>
        </div>
        <ul class="leb">
          <li @click="$router.push('/address')"><p>97</p>收藏</li>
          <li><p>10</p>点赞</li>
          <li><p>30</p>足迹</li>
        </ul>
      </div>
    </div>
    <!-- 通知 -->
    <div class="order">
      <div class="o_h">
        <div class="oh_l">
          <img src="../assets/img/logo.png" alt="">通知
        </div>
        <img src="../assets/img/more2.png" alt="" @click="$router.push('/infos')">
      </div>
      <ul class="tips">
        <li>
          <span></span>您买过的碧螺春来新货啦
        </li>
        <li>
          <span></span>您买过的碧螺春来新货啦
        </li>
      </ul>
    </div>
    <!-- 订单 -->
    <div class="order">
      <div class="o_h">
        <div class="oh_l">
          <img src="../assets/img/order.png" alt="">订单
        </div>
        <img src="../assets/img/more2.png" alt="" @click="$router.push('/orders')">
      </div>
      <ul class="o_l">
        <li>
          <div class="li_h">
            <p class="time">2018/10/16 14:18</p>
            <p>等待付款</p>
          </div>
          <div class="li_m"  @click="$router.push('/orderDetail')">
            <div class="t_img">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>安溪铁观音</p>
              <span>2018/09/18 绿茶28期</span>
              <div class="in_num">
                <p>￥<span>1800</span>.00</p>
                <span>X1</span>
              </div>
            </div>
            <div class="red">去评价</div>
          </div>
            
        </li>
        <li style="border-bottom:0">
          <div class="li_h">
            <p class="time">2018/10/16 14:18</p>
            <p>等待付款</p>
          </div>
          <div class="li_m"  @click="$router.push('/orderDetail')">
            <div class="t_img">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>个人基因检测标准版</p>
              <span>2018/09/18 绿茶28期</span>
              <div class="in_num">
                <p>￥<span>1800</span>.00</p>
                <span>X1</span>
              </div>
            </div>
            <div class="red">去评价</div>
          </div>
            
        </li>
      </ul>
    </div>
    <!-- 爱好 -->
    <div class="order hobby">
      <div class="o_h">
        <div class="oh_l">
          <img src="../assets/img/hobby.png" alt="">爱好
        </div>
        <img src="../assets/img/edit.png" alt=""  @click="$router.push('/myInfo')">
      </div>
       <ul class="o_l">
        <li class="li_f">
          <div class="li_m"  @click="$router.push('/orderDetail')">
            <div class="t_img">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>安溪铁观音</p>
              <span class="t_f">3个共同茶朋友</span>
            </div>
            <div class="red">我要买</div>
          </div>            
        </li>
        <li class="li_f">
          <div class="li_m"  @click="$router.push('/orderDetail')">
            <div class="t_img">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>安溪铁观音</p>
              <span class="t_f">3个共同茶朋友</span>
            </div>
            <div class="red">我要买</div>
          </div>
            
        </li>
      </ul>
      <img src="../assets/img/hobbym.png" alt="" class="hobbym">
    </div>
    <!-- 热评 -->
    <div class="order hot">
      <div class="o_h">
        <div class="oh_l">
          <img src="../assets/img/hot.png" alt="">热评
        </div>
        <img src="../assets/img/edit.png" alt="" @click="$router.push('/evaluate')">
      </div>
      <ul class="h_d">
        <li @click="$router.push('/hotDiscuss')">
          <div class="li_top">
            <div></div>
            <span>2018/08/28  09:20:09</span>
          </div>
          <p>安溪铁观音安溪铁观音安溪铁观音安溪铁观音还付钱回去了空雾峰就完了放得开好伐啦回复看擦刻录机佛.</p>
          <span class="li_u">有用180&nbsp;&nbsp;&nbsp;评价99</span>
        </li>
         <li style="border-bottom:0">
          <div class="li_top">
            <div></div>
            <span>2018/08/28  09:20:09</span>
          </div>
          <p>安溪铁观音安溪铁观音安溪铁观音安溪铁观音还付钱回去了空雾峰就完了放得开好伐啦回复看擦刻录机佛.</p>
          <span class="li_u">有用180&nbsp;&nbsp;&nbsp;评价99</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Login} from '../api/api.js'
export default {
  data () {
    return {
      msg: ''
    }
  },
  created(){
    document.title = '茶急送'
  },
  methods:{
    goDetail(){
      this.$router.push('/goodDetail')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
  .content
    width l(375)
    height l(230)
    backgroundIcon ('mybg.png')
    position relative
    margin-bottom l(80)
    .car
      width l(21)
      height l(21)
      position absolute
      right 5.6%
      top 4.8%
      backgroundIcon ('kefu1.png')
      z-index 3
    .tab
      width l(343)
      height l(187)
      position absolute
      top 50%
      left 4.3%
      background: #FFFFFF;
      box-shadow: 0 0 2px 0 #F2F2F2;
      border-radius: 18px;
      backgroundIcon ('bg.png')
      .tab_top
        width 100%
        position absolute
        top -22%
        display flex
        flex-direction column
        justify-content center
        align-items center
        img 
          display block
          width l(94)
          height l(94)
          border-radius 50%
        p  
          font-size: 18px;
          color: #333333;
          letter-spacing: 1.12px;
          line-height l(40)
      ul  
        position absolute
        bottom 14%
        left 0
        width 100%  
        disFlex()
        li
          width 33%
          font-size: 14px;
          color: #666666;
          letter-spacing: 0.32px;
          line-height l(20)
          p
            font-size: 16px;
            color: #333333;
            letter-spacing: 0.37px;
            line-height l(22)
            font-weight bold
// 订单
  .order.hobby
    padding-bottom l(15)
  .order
    width 100%
    background #ffffff
    padding 0 4.3%
    margin-bottom l(10)
    .o_h
      width 100%
      disFlex ()
      padding l(15) 0 l(10)
      border-bottom 1px solid #E8E8E8
      img 
        display block
        width l(17)
        height l(17)
      .oh_l
        disFlex ()
        font-size: 16px;
        color: #000000;
        letter-spacing: 0.37px;
        font-weight bold
        img 
          display block
          width l(29)
          height l(29)
          margin-right l(5)
    .hobbym
      display block
      width l(25)
      height l(5)
      margin-left 44%
//通知的ul
    ul.tips
      width 100%
      padding l(5) 0 l(10)
      li
        display flex
        justify-content flex-start
        align-items center
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.32px;
        line-height l(20)
        padding l(5) 0
        span 
          display block
          width l(8)
          height l(8)
          background: #B8837F;
          border-radius 50%
          margin-right l(10)
//订单的ul
    ul.o_l  
      margin-bottom l(15) 
      li.li_f
        padding 0
      li:last-of-type
        border-bottom 0
      li
        width 100%
        border-bottom 1px solid #E8E8E8;
        background #fff
        padding l(20) 0 l(10)
        .li_h
          disFlex ()
          color: #E63443;
          letter-spacing: 0.23px;
          line-height l(20)
          fz(14)
          .time
            color #666
        .li_m
          disFlex()
          padding l(10) 0
          .t_img
            width l(94)
            height l(70)
            backgroundIcon ('list1.png')
            position relative
            img 
              display block
              width l(30)
              height l(30)
              position absolute
              left 0
              right 0
              bottom 0
              top 0
              margin auto
          .t_info
            width l(157)
            height l(70)
            display flex
            flex-direction column
            justify-content space-between
            p
              fz(16)
              color: #151515;
              letter-spacing: 0.23px;
              line-height: l(20)
              text-align left 
            span 
              fz(12)
              color: #999;
              letter-spacing: 0.23px;
              line-height l(17)
              text-align left 
            span.t_f
              color: #E63443;
            .in_num
              fz(12)
              color: #333333;
              letter-spacing: 0.17px;
              display flex
              justify-content flex-start
              p
                fz(12)
                span 
                  fz(14)
                  color: #151515;
                  text-align right 
                  line-height 20px
              span 
                  fz(14)
                  color: #999;
                  text-align right 
                  line-height l(20)
                  margin-left l(8)
          .red
            width l(70)
            height l(24)
            line-height l(24)
            border 1px solid #83271F
            color #83271F
            border-radius l(100)
//热评的ul
  .order.hot
    padding l(15) 4.3% 0
    margin-bottom 0
    .o_h
      
    .h_d  
      li
        padding l(10) 0
        border-bottom  1px solid #E8E8E8
        .li_top
          display flex
          justify-content flex-start
          align-items center
          position relative
          div
            width l(4)
            height l(16)
            background: #83271F;
            margin-right l(15)
            position absolute
            left -5%
            top 0
          span 
            fz(12)
            color: #999999;
            letter-spacing: 0.26px;
            line-height l(17)
        p
          font-size: 16px;
          color: #333333;
          letter-spacing: 0.23px;
          line-height: l(30)
          text-overflow ellipsis
          white-space: nowrap;
          overflow hidden
          text-align left 
        span.li_u
          display block
          width 100%
          fz(12)
          color: #999999;
          letter-spacing: 0.26px;
          line-height l(17)
          text-align right
</style>
