<template>
  <div class="con">
    <!-- 头部 -->
     <div class="content">
      <div class="search" @click="$router.push('/search')"></div>
      <div class="car" @click="token == ''? loginMaskShow=true : $router.push('/car')"><span class="carNum">8</span></div>
      <ul class="tab">
        <li  class="tabli" @click="goAll()">
          <img src="../assets/img/tab1_active.png" alt="" v-if="tabIndex==1">
          <img src="../assets/img/tab1.png" alt="" v-else>全部
        </li>
         <li  class="tabli" @click="GOrecommand()">
          <img src="../assets/img/tab2_active.png" alt="" v-if="tabIndex==2">
          <img src="../assets/img/tab2.png" alt="" v-else>推荐
        </li>
         <li  class="tabli" @click="GOadvance()" >
          <img src="../assets/img/tab3_active.png" alt="" v-if="tabIndex==3">
          <img src="../assets/img/tab3.png" alt="" v-else>预告
        </li>
        <li class="tabli" @click="token == ''? loginMaskShow=true : $router.push('/collection') ">
          <img src="../assets/img/tab4.png" alt="">收藏
        </li>
         <li  class="tabli" @click="moreShow = !moreShow">
          <img src="../assets/img/tab5.png" alt="">更多 
          <ul class="more" v-if="moreShow">
            <li>播放量最高</li>
            <li>收藏最多</li>
            <li>点赞最多</li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 列表 -->
  <div class="box">
    <scroll ref="scroll"
        :data="list"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp">
        <ul class="goodsList">     
          <li v-for="(item,index) in list" :key="index" @click="$router.push({path:'/goodDetail',query:{id:item.id}})">
            <div class="li_top">
              <div class="play"><span></span></div>
              <div class="data">
                <div class="d_l">
                  5次播放
                </div>
                <ul class="p_r" v-if="item.count">
                  <li><img src="../assets/img/star.png" alt="">{{item.count.tea_collect_count}}</li>
                  <li><img src="../assets/img/zan.png" alt="">{{item.count.tea_thumb_count}}</li>
                  <li><img src="../assets/img/talk.png" alt="">{{item.count.tea_comment_count}}</li>
                </ul>
              </div>
              <div class="time">{{item.tea_date}} {{item.tea_period}}</div>
            </div>
            <div class="li_mid">
              <div class="red"></div>
              <span class="t_t">{{item.tea_title}}</span>
              <img src="../assets/img/share.png" alt="">
            </div>
            <div class="li_bot">
              <div class="lt_l">
                <div class="all">
                  <span>仅剩{{item.tea_count}}份</span>
                </div>
                <div>￥<span class="p1">{{item.tea_price}}</span>.00 <span class="p2">/{{item.tea_format}}g</span></div>
              </div>
              <img src="../assets/img/l1.png" alt="">
            </div>
          </li>
        </ul>
		    <div class="order-list" v-if="list.length == 0 && !loading">
		    	<load-more :show-loading="false" tip="暂无数据" background-color="#f0f7f5"></load-more>
		    </div>
    </scroll>
  </div>
    <div class="no_use"></div>
    <!-- 底部 -->
    <div class="footer">
      <div class="f_l"  @click="token == ''? loginMaskShow=true : $router.push('/my') ">
        <img src="../assets/img/photo.jpg" alt="">
        似水流年
      </div>
      <ul class="f_r">
        <li  @click="token == ''? loginMaskShow=true : $router.push('/infos') ">
          <img src="../assets/img/foot3.png" alt="">
          通知
        </li>
         <li @click="token == ''? loginMaskShow=true : $router.push('/orders')">
          <img src="../assets/img/foot2.png" alt="">
          订单
        </li>
         <li @click="token == ''? loginMaskShow=true : $router.push('/hobby')">
          <img src="../assets/img/foot1.png" alt="">
          爱好
        </li>
      </ul>
    </div>

    <!-- 提示去登录的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="loginMaskShow" title="您还没有登录" @on-confirm="$router.push({path:'/login'})">
        <p style="text-align:center;">现在去登录?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Confirm,TransferDomDirective as TransferDom ,Swipeout, SwipeoutItem, SwipeoutButton, XButton ,LoadMore } from 'vux'
import Scroll from './scroll/scroll'
import {getRecommand,getAdvance} from '../api/api.js'
export default {
   directives: {
    TransferDom
  },
  components: {
    Confirm,
    Scroll,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton ,
    LoadMore,
  },
  data () {
    return {
      token : sessionStorage.token || '',
      loginMaskShow:false,
      moreShow : false,//更多那个按钮是否显示
      list:[],
      page:1,
      tabIndex:1,
      loading :true,
      advanceCount:'',
      recommendCount:'',

      
      pullUpLoadThreshold: 0,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 40,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '数据加载中',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      startY: 0,
      scrollToTime: 700,
    }
    
  },
  created(){
    document.title = '茶急送'
  },
  computed:{
    pullDownRefreshObj: function () {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop)
      } : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
      } : false
    }
  },
  methods:{
    goAll(){
      this.tabIndex = 1
      this.indexActive = this.tabIndex
    },
    GOrecommand(){
      this.tabIndex = 2
      this.indexActive = this.tabIndex
      this.list = []
      this.page = 1
      this.recommand(1)
    },
    //推荐
    recommand(page){     
      const options = {
        token: this.token,
        page:page,
        rows:10,
      }
      getRecommand(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.recommendCount = res.data.data.count
          if(res.data.data.result.length){
            this.list = this.list.concat(res.data.data.result)
             console.log(this.list,111111)
          }          
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    GOadvance(){
      this.tabIndex = 3
      this.indexActive = this.tabIndex
      this.list = []
      this.page = 1
      this.advance(1)
    },
    //预告
    advance(page){
      const options = {
        token: this.token,
        page:page,
        rows:10,
      }
      getAdvance(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.advanceCount = res.data.data.count
          if(res.data.data.result.length){
            this.list = this.list.concat(res.data.data.result)
            console.log(this.list,222222)
          }        
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
       //下拉刷新
    onPullingDown() {
      // 模拟更新数据
      if(this.tabIndex == 2){
        this.recommand(1)
      }else if(this.tabIndex == 3){
        this.advance(1)
      }
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')

      this.page ++
      if(this.tabIndex == 2){
        this.recommand(this.page)
      }else if(this.tabIndex == 3){
        this.advance(this.page)
      }
      this.$refs.scroll.forceUpdate()
    },
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  },
  watch: {
      scrollbarObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      pullDownRefreshObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      pullUpLoadObj: {
        handler() {
          this.rebuildScroll()
        },
        deep: true
      },
      startY() {
        this.rebuildScroll()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  .content
    width l(375)
    height l(230)
    backgroundIcon ('banner.png')
    position relative
    margin-bottom l(20)
    .search
      width l(21)
      height l(21)
      position absolute
      left 5.6%
      top 4.8%
      backgroundIcon ('search.png')
    .car
      width l(21)
      height l(21)
      position absolute
      right 5.6%
      top 4.8%
      backgroundIcon ('car.png')
      z-index 3
      span.carNum  
        background #E63443 
        width l(15)
        height l(15)
        position absolute
        top -25%
        right -30%
        border-radius 50%
        text-align center
        line-height l(15)
        color #fff
        fz(12)
    ul.tab
      width l(343)
      height l(74)
      disFlex()
      position absolute
      top 72%
      left 4.3%
      background: #FFFFFF;
      box-shadow: 0 0 2px 0 #F2F2F2;
      border-radius: 18px;
      li.tabli:last-of-type
        color: #666666;
        position relative
        ul
          width l(80)
          height l(95)
          position absolute
          backgroundIcon ('btd.png')
          bottom -2.5rem
          right 0.7rem
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
        fz(11)
      li.tabli
        width 50%
        height 100%
        text-align center
        font-family: PingFangSC-Regular;
        fz(13)
        color: #83271F;
        letter-spacing: 0.21px;
        display flex
        flex-direction column
        justify-content space-around
        align-items center
        img 
          display block
          width l(24)
          height l(24)
  .box
    position relative
    height l(350)
    ul.goodsList
      width l(375)
      background #F7F7F7
      margin-top l(20)
      li
        width 100%
        height l(387)
        background #ffffff
        padding 1.7% 4.3%
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
          .time
            font-size: 12px;
            color: #95514C;
            letter-spacing: 0.23px;  
            line-height l(17)
            width l(123)
            height l(17)
            position absolute
            top l(5)   
            right l(8)  
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
          span.t_t
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          img 
            display block
            width l(22)
            height l(22)
            position absolute
            right 2.7%
            bottom 20%
        .li_bot
          height l(90)
          display flex
          justify-content space-between
          align-items center
          padding-bottom 1.9%
          .lt_l
            height 100%
            padding-top l(15)
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

          img 
            display block
            width l(95)
            height l(40)
  .no_use
    height l(64)
  .footer
    position fixed
    bottom 0
    left 0
    height l(64)
    display flex
    justify-content space-between
    width 100%
    background #fff
    .f_l
      width 26.1%
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      fz(10)
      color: #666666;
      img 
        display block
        width l(41)
        height l(41)
    .f_r  
      display flex
      justify-content space-between
      width 85.3%
      li  
        width 33%
        display flex
        flex-direction column
        justify-content space-around
        align-items center
        fz(10)
        color: #83271F;
        letter-spacing: 1px;


</style>
