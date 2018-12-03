<template>
  <div class="con">
    <!-- 头部的banner -->
    <div class="banner">
      <div class="bt">同一批茶</div>
      <div class="t_b">
        <ul>
          <li>
            <img src="../assets/img/list1.png" alt="" class="goodimg">
            <img src="../assets/img/play.png" alt="" class="play">
          </li>
          <li>
            <img src="../assets/img/list1.png" alt="" class="goodimg">
            <img src="../assets/img/play.png" alt="" class="play">
          </li>
          <li>
            <img src="../assets/img/list1.png" alt="" class="goodimg">
            <img src="../assets/img/play.png" alt="" class="play">
          </li>
          <li>
            <img src="../assets/img/list1.png" alt="" class="goodimg">
          </li>
          <li>
            <img src="../assets/img/list1.png" alt="" class="goodimg">
            <img src="../assets/img/play.png" alt="" class="play">
          </li>
        </ul>
      </div>
    </div>
    <!-- 详情 -->

    <div class="d">
      <span class="d_t">{{detailObj.tea_date}} {{detailObj.tea_period}}</span>
      <div class="li_top" @click="$router.push('/videoPlay')">
        <div class="play"><span></span></div>
        <div class="data">
          <div class="d_l" v-if="detailObj.vidio">
            {{detailObj.vidio.tea_play_count}}次播放
          </div>
          <ul class="p_r">
            <li><img src="../assets/img/star.png" alt="">300</li>
            <li><img src="../assets/img/zan.png" alt="">260</li>
          </ul>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="../assets/img/photo.jpg" alt="">小灰灰11&nbsp;购买了这个茶叶
              </div>
              <div class="swiper-slide">
                <img src="../assets/img/logo.png" alt="">大灰灰22&nbsp;购买了这个茶叶
              </div>
              <div class="swiper-slide">
                <img src="../assets/img/hot.png" alt="">超灰灰33&nbsp;购买了这个茶叶
              </div>
            </div>
          </div>
      </div>
      <div class="li_mid">
        <div class="red"></div>
        <span class="t_t">{{detailObj.tea_title}}</span>
        <div class="t_star">
          <div>￥<span class="p1">{{detailObj.tea_price}}</span>.00 <span class="p2">/{{detailObj.tea_format}}g</span></div>
          <ul>
            <li v-for="i in detailObj.tea_score" :key="i"></li>
          </ul>
        </div>
        <div class="t_re">
          <img src="../assets/img/fire.png" alt="">
          <span>推荐理由：{{detailObj.tea_reason}}</span>
        </div>
      </div>    
    </div>
    <!-- 评价 -->
    <div class="pre">
      <div class="pr_m">
        <span>评论：45</span>
        <span class="pr_ms" @click="$router.push('/discussAll')">更多&nbsp;&nbsp;<img src="../assets/img/more.png" alt=""></span>
      </div>
      <ul class="pr_list">
        <li class="pr_li">
          <div class="li_t">
            <img src="../assets/img/photo.jpg" alt="">&nbsp;
            微微一笑
          </div>
          <p>有没有关于果糖不耐的基因分析？有没有关于果糖不耐的基因分析？</p>
          <div class="li_bt">
            <span>2018/09/08  14:20</span>
            <span><img src="../assets/img/zanb.png" alt="">&nbsp;&nbsp;50</span>
          </div>
        </li>
        <li class="pr_li">
          <div class="li_t">
            <img src="../assets/img/photo.jpg" alt="">&nbsp;
            微微一笑
          </div>
          <p>有没有关于果糖不耐的基因分析？有没有关于果糖不耐的基因分析？</p>
          <ul class="d_img">
            <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
          </ul>
          <div class="li_bt">
            <span>2018/09/08  14:20</span>
            <span><img src="../assets/img/zanb.png" alt="">&nbsp;&nbsp;50</span>
          </div>
        </li>
         <li class="pr_li">
          <div class="li_t">
            <img src="../assets/img/photo.jpg" alt="">&nbsp;
            微微一笑
          </div>
          <p>有没有关于果糖不耐的基因分析？有没有关于果糖不耐的基因分析？</p>
          <ul class="d_img">
            <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
          </ul>
          <div class="li_bt">
            <span>2018/09/08  14:20</span>
            <span><img src="../assets/img/zanb.png" alt="">&nbsp;&nbsp;50</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 同一款茶 -->
    <div class="one_t">
      <div class="ont_tt">
        同一款茶<img src="../assets/img/more.png" alt="">                                                 
      </div>
      <ul style="border-bottom:1px solid #ccc">
        <li>
          <div>
            <img src="../assets/img/play.png" alt="">
            <span>2018/09/18 绿茶28期</span>
          </div>
            <p>2018年特级都匀毛尖</p>         
        </li>
         <li>
          <div>
            <img src="../assets/img/play.png" alt="">
            <span>2018/09/18 绿茶28期</span>
          </div>
            <p>2018年特级都匀毛尖</p>         
        </li>
      </ul>
    </div>
    <!-- 相似的茶 -->
    <div class="one_t">
      <div class="ont_tt">
        相似的茶<img src="../assets/img/more.png" alt="">                                                 
      </div>
      <ul>
        <li>
          <div>
            <img src="../assets/img/play.png" alt="">
            <span>2018/09/18 绿茶28期</span>
          </div>
            <p>2018年特级都匀毛尖</p>         
        </li>
         <li>
          <div>
            <img src="../assets/img/play.png" alt="">
            <span>2018/09/18 绿茶28期</span>
          </div>
            <p>2018年特级都匀毛尖</p>         
        </li>
      </ul>
    </div>
    <!-- 底部 -->
    <div class="blank"></div>
    <div class="foot">
      <div class="f1">
        <img src="../assets/img/kefu1.png" alt="">
        客服
      </div>
      <div  class="f1" @click="$router.push('/car')">
        <img src="../assets/img/car.png" alt="">
        购物车
        <span>6</span>
      </div>
      <div class="buy_box">
        <p>加入购物车</p>
        <p class="buy" @click="$router.push('/pay')">我要购买</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper' 
import 'swiper/dist/css/swiper.min.css'
import {getGoodDetail} from '../api/api.js'
export default {
  data () {
    return {
      token : sessionStorage.token || '',
      detailObj:{}
    }
  },
  created(){
    document.title = '详情'
    
  },
  mounted(){
    var mySwiper = new Swiper('.swiper-container', {
            slidesPerView :'auto',
            loop :true,
            autoplay:true,
            direction:'vertical',
            grabCursor:true,
            autoplayDisableOnInteraction:false,
            mousewheelControl:true,
            autoHeight:true,
            speed:500
        })
    var id  = this.$route.query.id
    this.init(id)
  },
  methods:{
    init(id){
      getGoodDetail({id:id}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.detailObj = res.data.data[0]
          console.log(this.detailObj)  
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
  background #F7F7F7
  .banner
    width 100%
    height l(60)
    background: #E8E8E8;
    div.bt
      width 20%
      fz(12)
      color #333
      text-align center
      line-height l(60)
      float left
    div.t_b
      float left
      width 80%
      height 100%
      overflow-x scroll
      ul
        height 100%
        padding 1.4% 0
        float left
        display flex
        justify-content flex-start
        li
          width l(60)
          height l(48)
          margin-right l(10)
          position relative
          img.goodimg
            display block
            width 100%
            height 100%
          img.play
            display block
            width l(22)
            height l(22)
            position absolute
            top 0
            left 0
            bottom 0
            right 0
            margin auto
  .d  
    background #fff 
    margin-bottom l(10) 
    padding-bottom l(10)  
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
      .swiper-container 
        width: l(180)
        height: l(30)
        border-radius: 4px;
        background rgba(0,0,0,0.1)
        position absolute
        top l(20)
        left l(20)
        .swiper-wrapper
          height l(30)
          width 100%
          .swiper-slide
            width 100% 
            height l(30)!important          
            color #333
            display flex
            justify-content flex-start
            align-items center
            padding-left l(5)
            // border-radius: 4px;
            img 
              display block
              width l(22)
              height l(22)
              border-radius 50%
              margin-right l(5)
    .li_mid
        // height l(97)
        position relative
        font-family: PingFangSC-Medium;
        fz(16)
        color: #333333;
        letter-spacing: 0.28px;
        line-height l(22)
        padding 0.9% 0 0 2.4%
        text-align left 
        padding l(10) 4.3% 0
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
        div.t_star
          width 100%
          display flex
          justify-content space-between
          align-items center
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
          ul
            overflow hidden
            li
              width l(20)
              height l(16)
              float left
              margin-right l(5)
              backgroundIcon ('tea.png')
        .t_re
          span 
            fz(12)
            color: #666666;
            letter-spacing: l(0.31)
            line-height l(18)
  // 评论列表
  .pre
    background #fff
    width 100%
    padding 0 4.3% 
    margin-bottom l(20)
    div.pr_m
      display flex
      justify-content space-between
      padding-top l(15)
      span
        line-height l(20)
        color: #666666;
        letter-spacing: 0.36px;
        fz(14)
      span.pr_ms
        color: #95514C;
        fz(12)
        display flex
        justify-content space-between
        align-items center
    ul.pr_list
      li.pr_li:last-of-type
        border-bottom 0
      li.pr_li
        border-bottom 1px solid #cccccc
        padding l(20) 0 l(10)
        div.li_t
          display flex
          justify-content flex-start
          align-items center
          color #333333 
          letter-spacing 0.28px
          fz(13)
          img 
            display block
            width l(31)
            height l(31)
        p
          fz(14)
          color: #333333;
          letter-spacing: 0.3px;
          line-height l(20)
          text-align left 
          padding 0 10%
        ul.d_img
          width 100%
          display flex
          justify-content flex-start
          flex-wrap wrap
          padding l(10) 10%
          li.d_li:nth-of-type(3n)
            margin-right 0
          li.d_li 
            width l(85)
            height l(65)
            margin-right l(9)
            img 
              display block
              width 100%
              height 100%
        .li_bt
          padding l(10) 10%
          display flex
          justify-content space-between
          align-items center
          span 
            line-height l(17)
            color: #999999;
            letter-spacing: 0.26px;
            display flex
            justify-content space-between
            align-items center
            fz(12)
            img 
              display block
              width l(15)
              height l(15)
  // 同一款茶
  .one_t
    padding l(10) 4.3% 0
    background #fff
    .ont_tt
      disFlex()
      line-height l(30)
      fz(14)
      color: #333333;
      letter-spacing: 0.36px;
      img 
        display block
        width l(16)
        height l(13)
    ul
      disFlex ()
      padding l(5) 0
      li
        div
          width l(162)
          height l(110)
          backgroundIcon ('list1.png')
          position relative
          img 
            display block
            width l(35)
            height l(35)
            position absolute
            top 0
            bottom 0px
            left 0
            right 0
            margin auto
          span
            background colorB(9)
            color: #95514C;
            letter-spacing: 0.23px;
            fz(10)
            position absolute
            top 0
            right 0
            line-height l(14)
        p
          color: #333333;
          letter-spacing: l(0.28)
          line-height l(26)
          text-align left 
  // 底部
  .foot
    width 100%
    disFlex ()
    height l(44)
    position fixed
    bottom 0
    left 0
    background #fff
    padding-left 4.3%
    p
      height 100%
      width l(111)
      background: #D4D4D4;
      fz(18)
      color: #83271F;
      letter-spacing: 0.26px;
      line-height l(44)
    p.buy
      background: #83271F;
      color: #FFFFFF;
    div.f1
      width 20%
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      color #666
      fz(10)
      position relative
      span 
        display block
        width l(13)
        height l(13)
        border-radius 50%
        position absolute
        top -1%
        right 30%
        background #E63443;
        line-height l(14)
        color #ffffff
        fz(10)
      img 
        display block
        width l(24)
        height l(22) 
        margin-bottom l(5)
    div.buy_box
      width l(222)
      height 100%
      display flex
      justify-content space-between
      align-items center
  .blank
    width 100%
    height l(44) 
    margin-top l(20)
</style>
