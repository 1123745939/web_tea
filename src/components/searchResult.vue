<template>
  <div class="con">
    <!-- 頭部 -->
    <div class="s_h">
      <input type="text" placeholder="关键词搜索" value="小金花">
      <img src="../assets/img/search.png" alt="">
    </div>
    <div class="big_box">
        <!-- tab选项 -->
      <ul class="tab">
        <li class="tab_li">期数<img src="../assets/img/jian_up.png" alt=""></li>
        <li  class="tab_li">产地</li>
        <li  class="tab_li">制茶方法</li>
        <li  class="tab_li">价格<img src="../assets/img/jian_up.png" alt=""></li>
        <li  class="tab_li">年份</li>
        <li class="tab_li" @click="moreShow = !moreShow">
          <img src="../assets/img/tab5.png" alt="" class="more">
          <ul class="more" v-if="moreShow">
            <li>播放量最高</li>
            <li>收藏最多</li>
            <li>点赞最多</li>
            </ul>
        </li>
      </ul>
      <!-- 搜索列表 -->
      <ul class="goodsList">
        <li>
          <div class="li_top">
            <div class="play"><span></span></div>
            <div class="data">
              <div class="d_l">
                5万次播放
              </div>
              <ul class="p_r">
                <li><img src="../assets/img/star.png" alt="">300</li>
                <li><img src="../assets/img/zan.png" alt="">260</li>
                <li><img src="../assets/img/talk.png" alt="">30</li>
              </ul>
            </div>
          </div>
          <div class="li_mid">
            <div class="red"></div>
            <span>这道大红袍如此浓郁的花果香锐不可挡，你一定没喝过！</span>
            <img src="../assets/img/share.png" alt="">
          </div>
          <div class="li_bot">
            <div class="lt_l">
              <div class="all">
                <span>仅剩18分</span>
              </div>
              <div>￥<span class="p1">1800</span>.00 <span class="p2">/50g</span></div>
            </div>
            <img src="../assets/img/l1.png" alt="">
          </div>
        </li>
        <li>
          <div class="li_top">
            <div class="play"><span></span></div>
            <div class="data">
              <div class="d_l">
                5万次播放
              </div>
              <ul class="p_r">
                <li><img src="../assets/img/star.png" alt="">300</li>
                <li><img src="../assets/img/zan.png" alt="">260</li>
                <li><img src="../assets/img/talk.png" alt="">30</li>
              </ul>
            </div>
          </div>
          <div class="li_mid">
            <div class="red"></div>
            <span>这道大红袍如此浓郁的花果香锐不可挡，你一定没喝过！</span>
            <img src="../assets/img/share.png" alt="">
          </div>
          <div class="li_bot">
            <div class="lt_l">
              <div class="all">
                <span style="width:100%;border-radius: 4px ">已抢光</span>
              </div>
              <div>￥<span class="p1">1800</span>.00 <span class="p2">/50g</span></div>
            </div>
            <img src="../assets/img/l2.png" alt="">
          </div>
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
    document.title = '搜索'
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
  height l(667)
  overflow-y scroll
  padding-bottom l(20)
  .s_h
    disFlex ()
    padding l(10) 4.3%
    background #fff
    input 
      display block
      width l(308)
      height l(32)
      background: #F2F2F2;
      border-radius: 6px;
      border none
      outline none
      padding-left l(10)
    input::placeholder
      fz(14)
      color: #999999;
      letter-spacing: 0.2px;
    img 
      display block
      width l(23)
      height l(23)
  .big_box

    // tab
    .tab
      width l(375)
      background #ffffff
      padding 0 4.3%
      disFlex ()
      li.tab_li:last-of-type
        color: #666666;
        position relative
        ul
          width l(80)
          height l(95)
          position absolute
          backgroundIcon ('btd.png')
          bottom -2.5rem
          right 0rem
          z-index 88
          fz(12)
          color: #FFFFFF;
          letter-spacing: 0.28px;
          padding-top l(3)
          li:last-of-type
            border-bottom 0
          li
            height l(30)
            line-height l(30)
            border-bottom 1px solid rgba(255,255,255,0.20)
      li.tab_li
        padding l(10) 0
        disFlex()
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.3px;
        line-height l(20)
        img 
          display block
          width l(13)
          height l(8)
          margin-left l(3)
        img.more 
          display block
          width l(18)   
          height l(18) 
    //列表
    ul.goodsList
      width l(375)
      background #F7F7F7
      margin-top l(10)
      li
        width 100%
        height l(387)
        background #ffffff
        padding l(10) 4.3%
        margin-bottom l(10)
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
            .d_l
              padding 0 5px
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
          background: #F7F7F7;
          height l(97)
          position relative
          font-family: PingFangSC-Medium;
          fz(16)
          color: #333333;
          letter-spacing: 0.28px;
          line-height l(22)
          padding 0.9% 0 0 2.4%
          text-align left 
          padding-top l(10)
          .red
            width l(4)
            height l(16)
            background: #83271F;
            position absolute
            left 0
            top l(10)
          img 
            display block
            width l(22)
            height l(22)
            position absolute
            right 2.7%
            bottom 20%
        .li_bot
          width 100%
          height l(100)
          display flex
          justify-content space-between
          align-items center
          padding-bottom 1.9%
          img 
            display block
            width l(95)
            height l(40)
          .lt_l
            height 100%
            padding-top l(20)
            .all
              width l(104)
              height l(17)
              background: rgba(230,52,67,0.30);
              border-radius: 4px;
              position relative
              margin-bottom l(10)
              span 
                display block
                height 100%
                position absolute
                width 70%
                background: #E63443;
                border-radius: 4px 0 0 4px;  
                left 0
                top 0
                fz(10)
                color #fff 
                line-height l(17)
            div
              color: #E63443;
              fz(14)
              letter-spacing: 0.31px;
              line-height l(30)
              .p1
                fz(18)
              .p2
                color: #3F3F3F;
                fz(14)

</style>
