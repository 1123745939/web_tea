<template>
  <div class="con">
    <div class="content">
      <div class="c_h">
        <div class="photo">
          <img src="../assets/img/photo.jpg" alt="">
          豆小丫
        </div>
        <span class="time">2018/09/08  14:20</span>
      </div>
      <p class="te">大家好，我在这个平台买的西湖龙井，色香味俱全，超级好喝。推荐大家购买~~</p>
      <ul class="d_ul">
        <li>
          <img src="../assets/img/list1.png" alt="" class="d_img">
        </li>
        <li>
          <img src="../assets/img/list1.png" alt=""  class="d_img">
        </li>
        <li>
          <img src="../assets/img/list1.png" alt=""  class="d_img">
        </li>
      </ul>
      <!-- 商品的视频 -->
     <div class="d">
      <div class="li_top">
        <div class="play"><span></span></div>
        <div class="data">
          <div class="d_l">
            5万次播放
          </div>
          <ul class="p_r">
            <li><img src="../assets/img/star.png" alt="">300</li>
            <li><img src="../assets/img/zan.png" alt="">260</li>
          </ul>
        </div>
      </div>
      <div class="li_mid">
        <div class="red"></div>
        <span class="t_t">这道大红袍如此浓郁的花果香锐不可挡，你一定没喝过！</span>
      </div>    
    </div>
      <ul class="use">
        <li>
          <img src="../assets/img/zan1.png" alt="">有用
        </li>
        <li>
          <img src="../assets/img/car.png" alt="">我也要买
        </li>
      </ul>
      <!-- 点赞的人 -->
      <ul class="have_zan">
        <li>
          <img src="../assets/img/photo.jpg" alt="">
        </li>
        <li>
          <img src="../assets/img/photo.jpg" alt="">
        </li>
      </ul>
      <!-- 收藏 & 分享 -->
      <div class="sha">
        <div>
          <img src="../assets/img/starb.png" alt="">收藏
          <img src="../assets/img/share.png" alt="">分享
        </div>
      </div>
      <!-- 点赞内容 -->
      <div class="liuyan">
        <span>留言：99+</span>
        <img src="../assets/img/edit.png" alt="">
      </div>
      <ul class="liu_list">
        <li>
          <div class="top">
            <img src="../assets/img/photo.jpg" alt="">微微一笑
          </div>
          <p>看着不错哦，包装如何，打算买来送人。包装如何，打算买来送人。</p>
          <div class="bot">
            <span>三分钟前</span>
            <div>
              <img src="../assets/img/zan1.png" alt="">50              
              <img src="../assets/img/talk1.png" alt="">50
            </div>
          </div>
          <!-- 追评的人 -->
          <ul class="zhui">
            <li>
              <div>
                晨曦<img src="../assets/img/photo.jpg" alt="">
              </div>
              <p class="zhuiP">我也买了，包装很好，茶很好喝</p>
              <span>3分钟之前</span>
            </li>
            <li>
              <div>
                晨曦<img src="../assets/img/photo.jpg" alt="">
              </div>
              <p class="zhuiP">我也买了，包装很好，茶很好喝,包装如何，打算买来送人</p>
              <span>3分钟之前</span>
            </li>
          </ul>
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
     
    }
  },
  created(){
    document.title = '热评详情'
  },
  methods:{
   
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
  padding-bottom l(20)
  .content
    box-shadow: 0 0 5px 0 #E8E8E8;
    .c_h
      disFlex()
      background #fff
      padding l(20) 4.3% l(0)
      .photo
        display flex
        justify-content flex-start
        align-items center
        line-height l(20)
        fz(14)
        color: #333333;
        letter-spacing: 0.3px;
        img 
          display block
          width l(47)
          height l(47)
          margin-right l(5)
      span 
        fz(12)
        color: #999999;
        letter-spacing: 0.26px;
        line-height l(17)
    p.te
      width 100%
      padding l(15) 4.3%
      background #fff
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0.3px;
      line-height: 20px;
      text-align left 
    ul.d_ul
      background #fff
      padding 0 10%
      li:last-of-type
        margin-bottom 0
      li
        height l(180)
        margin-bottom l(10)
        img.d_img
          display block
          width 100%
          height l(180)
    .d  
      background #fff 
      padding l(10) 0 l(20)
      span.d_t
        display block
        fz(12)
        color: #999999;
        letter-spacing: 0.23px;   
        line-height l(30)
        text-align left 
        padding-left 4.3%
      .li_top
        width 100%
        height l(190)
        backgroundIcon('list1.png')
        position relative
        border-radius 3% 0 3% 0
        .play
          opacity: 0.3;
          backgroundIcon('play.png')
          width l(44)
          height l(44)
          border-radius 50%
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          margin auto
        .data
          width 100%
          height l(25)
          background colorB(30)
          display flex
          justify-content space-between
          position absolute
          bottom 0
          left 0
          font-family: PingFangSC-Regular;
          fz(12)
          color: #FFFFFF;
          letter-spacing: 0.28px;
          padding 0 4.3%
          .d_l
            line-height l(25)
          ul 
            display flex
            justify-content space-between
            li
              height 100%
              display flex
              justify-content space-between
              align-items center
              padding 0 5px
              background colorB(0)
              img 
                display block
                width l(15)
                height l(15)
                margin-right 5px
      .li_mid
          // height l(97)
          position relative
          font-family: PingFangSC-Medium;
          fz(16)
          color: #333333;
          letter-spacing: 0.28px;
          line-height l(22)
          text-align left 
          padding l(10) 4.3%
          background: #F7F7F7;
          .red
            width l(4)
            height l(16)
            background: #83271F;
            position absolute
            left 0
            top l(10)
          span.t_t
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          
          .t_re
            span 
              fz(12)
              color: #666666;
              letter-spacing: l(0.31)
              line-height l(18)
    ul.use
      disFlex ()
      padding l(20) 20.5% l(10)
      background #fff
      li
        width l(95)
        height l(30)
        border: 1px solid #E0C8C6;
        border-radius: 100px;
        fz(14)
        color: #83271F;
        letter-spacing: 0.23px;
        display flex
        justify-content center
        align-items center
        img 
          display block
          width l(15)
          height l(15)
          margin-right l(10)
    ul.have_zan
      padding l(20) 4.3%
      display flex
      justify-content flex-start
      align-items center
      background #fff
      li:last-of-type
        margin-right 0
      li
        margin-right l(10)
        img 
          display block
          width l(35)
          height l(35)
    .sha  
      background: #FFFFFF;
      box-shadow: 0 0 5px 0 #F3F3F3;
      padding 0 4.3%
      div
        padding l(10) 0 l(15)
        border-top 1px solid #E8E8E8 
        fz(12)
        color: #666666;
        letter-spacing: 0.26px;  
        display flex
        justify-content flex-end
        align-items center
        img 
          display block
          width l(22)
          height l(22)
          margin 0 l(5) 0 l(15)
    .liuyan
      padding l(20) 4.3% 0
      disFlex ()
      fz(14)
      color: #666666;
      letter-spacing: 0.36px;  
      line-height l(20) 
      background #fff 
      img 
        display block
        width l(17)
        height l(17)  
    ul.liu_list
      background #fff
      padding 0 4.3%
      li
        padding l(5) 0 l(15)
        .top
          fz(14)
          color: #000;
          letter-spacing: 0.3px;
          line-height l(20)
          display flex
          justify-content flex-start
          align-items center
          img 
            display block
            width l(31)
            height l(31)
            margin-right l(5)
        p
          fz(14)
          color: #333333;
          letter-spacing: 0.3px;
          line-height: l(20);
          padding  l(5) 0 l(5) l(35)
          text-align left 
        .bot
          padding-left l(35)
          disFlex ()
          font-size: 12px;
          color: #999999;
          letter-spacing: 0.26px;
          line-height l(17)
          padding-top l(5)
          div 
            display flex
            justify-content flex-end
            align-items center
            img 
              display block
              width l(15)
              height l(15)
              margin 0 l(5) 0 l(15)
          span 
            font-size: 12px;
            color: #999999;
            letter-spacing: 0.26px;
            line-height l(17)
        ul.zhui  
            background: #F7F7F7;
            border-radius: 6px;  
            padding 0 2.7%
            margin-top l(5)
          li:last-of-type
            border-bottom none
          li
            text-align right 
            border-bottom 2px solid #E8E8E8
            div
              display flex
              justify-content flex-end
              align-items center
              padding l(5) 0
              color #666
              letter-spacing: 0.28px;
              img 
                display block
                width l(31)
                height l(31)
                margin-left l(5)
            p
              font-size: 14px;
              color: #666666;
              letter-spacing: 0.3px;
              line-height: l(20)
              padding l(5) 0
              text-align right 
            span 
              fz(12)
              color: #999999;
              letter-spacing: 0.26px;
              line-height l(17)             
          
</style>
