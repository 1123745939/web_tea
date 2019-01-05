<template>
  <div class="con">
    <!-- 头部的banner -->
    <div class="banner">
      <div class="bt">同一批茶</div>
      <div class="t_b">
        <ul>
          <li v-for="(i,index) in topArr" :key="index">
            <img :src="i.image_url" alt="" class="goodimg previewer-demo-img"  v-if="!i.tea_play_count" @click="show(index)">
            <video :src="i.vidio_url" v-else></video>
            <!-- <img src="../assets/img/play.png" alt="" class="play" v-show="i.tea_play_count"> -->
          </li>
        </ul>
      </div>
    </div>
    <!-- 详情 -->

    <div class="d">
      <span class="d_t">{{detailObj.tea_date}} {{detailObj.tea_period}}</span>
      <div class="li_top" @click="$router.push({path:'/videoPlay',query:{id:id}})">
        <div class="play"><span></span></div>
        <div class="data">
          <div class="d_l">
            {{detailObj.tea_play_count}}次播放
          </div>
          <ul class="p_r">
            <li><img src="../assets/img/star.png" alt="">{{detailObj.tea_collect_count}}</li>
            <li><img src="../assets/img/zan.png" alt="">{{detailObj.tea_thumb_count}}</li>
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
    <div class="pre" v-show="comment">
      <div class="pr_m">
        <span>评论：{{comment.length || 0}}</span>
        <span class="pr_ms" @click="$router.push({path:'/discussAll',query:{id:id}})">更多&nbsp;&nbsp;<img src="../assets/img/more.png" alt=""></span>
      </div>
      <ul class="pr_list">
        <li class="pr_li" v-for="i in comment" :key="i.id">
          <div class="li_t">
            <img :src="i.user.img_link" alt="">&nbsp;
            {{i.user.username}}
          </div>
          <p>{{i.content}}</p>
          <div class="a_b">
            <ul class="d_img" v-show="i.image">
              <li class="d_li" v-for="(item,index) in i.image" :key="index">
                <img :src="item.image_link" alt="">
              </li>
             </ul>
             <div class="vi" v-if="i.vidio">
               <video :src="i.vidio.vidio_link"></video>
             </div>
          </div>
          <div class="li_bt">
            <span>{{i.created_at}}</span>
            <span><img src="../assets/img/zanb.png" alt="" v-if="i.is_thumb==0">
            <img src="../assets/img/zan1_active.png" alt="" v-else>
            &nbsp;&nbsp;{{i.thumb_count}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 同一款茶 -->
    <div class="one_t" v-if="sameList.length">
      <div class="ont_tt" @click="goSame">
        同一款茶<img src="../assets/img/more.png" alt="">                                                 
      </div>
      <ul style="border-bottom:1px solid #ccc">
        <li v-for="item in sameList" :key="item.tea_title" @click="$router.push({path:'/goodDetail',query:{id:item.id}})">
          <div :style="{background:'url('+item.tea_img_link+')'}">
            <img src="../assets/img/play.png" alt="">
            <span>{{item.tea_date}} {{item.tea_period}}</span>
          </div>
            <p>{{item.tea_title}}</p>         
        </li>
      </ul>
    </div>
    <!-- 相似的茶 -->
    <div class="one_t" v-if="likeList.length">
      <div class="ont_tt" @click="goLike">
        相似的茶<img src="../assets/img/more.png" alt="">                                                 
      </div>
      <ul>
        <li v-for="item in likeList" :key="item.tea_title" @click="$router.push({path:'/goodDetail',query:{id:item.id}})">
          <div :style="{background:'url('+item.tea_img_link+')'}">
            <img src="../assets/img/play.png" alt="">
            <span>{{item.tea_date}} {{item.tea_period}}</span>
          </div>
            <p>{{item.tea_title}}</p>         
        </li>
      </ul>
    </div>
    <!-- 底部 -->
    <div class="blank"></div>
    <div class="foot">
      <div class="f1" @click="token? connectCustom():loginMaskShow = true">
        <img src="../assets/img/kefu1.png" alt="">
        客服
      </div>
      <div  class="f1" @click="token? $router.push('/car'):loginMaskShow = true">
        <img src="../assets/img/car.png" alt="">
        购物车
        <span v-show="token">{{carNum}}</span>
      </div>
      <div class="buy_box">
        <p @click="token? addCar():loginMaskShow = true">加入购物车</p>
        <p class="buy" @click="token == ''? loginMaskShow=true : $router.push({path:'/pay',query:{id:id,type:'buy'}})">我要购买</p>
      </div>
    </div>
    <!-- 提示去登录的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="loginMaskShow" title="您还没有登录" @on-confirm="$router.push({path:'/login'})">
        <p style="text-align:center;">现在去登录?</p>
      </confirm>
    </div>
    <!-- 图片放大之后的展示 -->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
    </div>
  </div>
</template>

<script>
import { Confirm,Previewer,TransferDomDirective as TransferDom } from 'vux'
import Swiper from 'swiper' 
import 'swiper/dist/css/swiper.min.css'
import {getGoodDetail,carList,addShop} from '../api/api.js'
export default {
    directives: {
    TransferDom
  },
  components: {
    Confirm,
    Previewer
  },
  data () {
    return {
      token : sessionStorage.token || '',
      detailObj:{},
      sameList:[],
      likeList:[],
      comment:[],
      loginMaskShow:false,
      carNum:'',
      topArr:[],
      list:[],
      idd:'',

      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      },

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
    this.id = id
    this.init(id)
    this.$forceUpdate()
    this.getcarNum()
  },
  methods:{
    init(id){
      getGoodDetail({id:id}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          console.log(res.data.data)
          this.detailObj = res.data.data.detail
          this.sameList = res.data.data.same
          this.likeList = res.data.data.like 
          this.comment = res.data.data.comments
          this.topArr = res.data.data.detail.images.concat(res.data.data.detail.vidio)
          if(res.data.data.detail.images.length){
            res.data.data.detail.images.forEach(item=>{
              var obj = {}
              obj.src = item.image_url
              obj.msrc = item.image_url
              obj.h = 1200
              obj.w = 900
              this.list.push(obj)
            })
          }
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //购物车的数量
    getcarNum(){
      if(!this.token){return}
      carList({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.carNum = res.data.data.count
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //加入购物车
    addCar(){
      const options = {
        token :this.token,
        id:this.detailObj.id
      }
      addShop(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('加入购物车成功')
          this.getcarNum()
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    logIndexChange (arg) {
      console.log(arg)
    },
    //去同款茶列表
    goSame(){
      this.$router.push({path:'/teaSame',query:{id:this.detailObj.id,tea_id:this.detailObj.tea_type_id}})
    },
    //去相似茶列表
    goLike(){
      this.$router.push({path:'/teaLike',query:{id:this.detailObj.id,tea_id:this.detailObj.tea_type_id}})
    },
    //联系客服
    connectCustom(){
      window.location.href = `http://uat.api.chajisong.com/v1/custom?token=${this.token}`
    }
  },
  watch: {
    '$route' (to, from) {
        if (to.name === 'goodDetail') {
                console.log(to.query.id)     // 在此调用函数
                this.init(to.query.id)
        }
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
          video     
            width 100%
            height 100%
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
            border-radius 50%
        p
          fz(14)
          color: #333333;
          letter-spacing: 0.3px;
          line-height l(20)
          text-align left 
          padding 0 10%
        div.a_b
          overflow hidden
          ul.d_img
            display flex
            justify-content flex-start
            flex-wrap wrap
            float left
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
          .vi
            width l(85)
            height l(65)
            float left 
            video 
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
        right 27%
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
