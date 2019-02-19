<template>
  <div class="con"  ref="cons">
        <!-- 列表 -->
  <div class="box" id="boxs">
    <scroll ref="scroll"
        :data="hobbies"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        :listenScroll=true
        @pullingUp="onPullingUp"
        @scroll="getScrollPage"
    >

      <!-- 头部 -->
     <div class="content"  ref="navs">
      <div class="tab_top">
        <img :src="infoObj.img_link" alt="" @click="$router.push('/personalInfo')" v-if="infoObj.img_link!=''">
        <img src="../assets/img/photo-no.png" alt="" @click="$router.push('/personalInfo')" v-else>
      </div>
      <div class="tab_right">
        <div class="name">
          <p>{{infoObj.username}}</p>
          <div class="infoss">
            <div class="car" @click="connectCustom"></div>
            <div class="infos" @click="$router.push('/infos')"></div>
          </div>
        </div>
        <ul class="leb">
          <li @click="$router.push('/collection')"><p>{{count.collect_count}}</p>收藏</li>
          <li @click="$router.push('/thumbs')"><p>{{count.thumb_count}}</p>点赞</li>
          <li @click="$router.push('/slots')"><p>{{count.slot_count}}</p>足迹</li>
        </ul>
      </div>
    </div>
		  <!--列表  -->
    <div class="order hobby" >
      <div class="o_h"  @click="$router.push('/hobby')">
        <div class="oh_l">
          爱好
        </div>
        <img src="../assets/img/more1.png" alt="" >
      </div>
       <ul class="o_l"  v-show="hobbies.length>0">
        <li class="li_f" v-for="item in hobbies" :key="item.id">
          <div class="li_m">
            <div class="t_img" :style="{background:'url(' + item.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>{{item.tea_title}}</p>
              <span class="t_f" @click.stop="$router.push({path:'/teaFriendsList'})">{{item.friend_count}}个共同茶朋友</span>
            </div>
            <div class="red" @click="$router.push({path:'/goodDetail',query:{id:item.tea_id}})">我要买</div>
          </div>            
        </li>ss
      </ul>
      <div class="noList" v-show="hobbies.length==0">
      <div class="box">
        <img src="../assets/img/data-n.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>
    </div>
    </scroll>
    <footers :index = 2></footers>
  </div>
   
   
  </div>
</template>

<script>
import footers from './footers'
import domain from '../api/domain.js'
import utils from '../utils/js/style.js'
import { myData , custom ,hobbiesList} from '../api/api.js'
import Scroll from './scroll/scroll'
export default {
  data () {
    return {
      token : localStorage.token || '',
      infoObj:{},
      comments:[],
      count:{},
      notifies:[],
      orders:[],
      hobbies:[],

      pullUpLoadThreshold: 0,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 40,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '数据加载中',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      startY: localStorage.getItem('scrollY')||0,
      scrollToTime: 700,
      copyBtn: null,
      scrollYPages:0,
      urls:domain.domain+'/#/goodDetail?id=',
      
    }
  },
   components: {
    Scroll,
    footers
  },
  created(){
    document.title = '茶急送'
    this.init()
  },
  // mounted(){
  //   this.$el.querySelector('#boxs').style.height=this.$refs.cons.offsetHeight-this.$refs.navs.offsetHeight+'px'
  // },
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
    getScrollPage(pos){
      this.scrollYPages=pos.y;
    },
    init(){
      //个人信息
      myData({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.infoObj = res.data.data.info
          this.count = res.data.data.count
          console.log(res,'res')  
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      }),
      hobbiesList({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.hobbies = res.data.data
          console.log(this.hobbies,'this.hobbies')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //去评价
    evluate(item){
      this.$router.push('/evaluate');
      sessionStorage.orderComment = JSON.stringify(item)
    },
    //联系客服
    connectCustom(){
      window.location.href = domain.domain + `/v1/custom?token=${this.token}`
    },
       //下拉刷新
    onPullingDown() {
      // 模拟更新数据is_ref
     
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
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
    },
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
  height 100vh
  position relative
  .box
    width 100%
    height 100vh
  .content
    width 100%
    height l(110)
    padding 0 4.3%
    background #fff
    margin-bottom l(10)
    disFlex()
    .car
      width l(21)
      height l(21)
      backgroundIcon ('kefu3.png')
      z-index 3
    .tab_top
      width 18.7%
      display flex
      flex-direction column
      justify-content center
      align-items center
      img 
        display block
        width l(70)
        height l(70)
        border-radius 50%
      p  
        font-size: 18px;
        color: #333333;
        letter-spacing: 1.12px;
        line-height l(40)
    .tab_right
      width 75%
      height 100%
      padding l(10) 0
      .name
        height 50%
        disFlex()
        fz(16)
        color: #282828;
        letter-spacing: 1px;
        font-weight bold
        disFlex()
        .infoss
          width 25%
          height 100%
          disFlex()
          .infos
            width l(21)
            height l(21)
            backgroundIcon ('xiaoxi.png')
            z-index 3 
      ul  
        width 90%  
        disFlex()
        li
          // width 33%
          fz(12)
          color:  #B5B6B7;
          letter-spacing: 0.32px;
          line-height l(20)
          p
            fz(14)
            color: #666;
            letter-spacing: 0.37px;
            line-height l(22)
            // font-weight bold
// 订单
  .order.hobby
    padding-bottom l(15)
    height l(500)
  .order
    width 100%
    background #ffffff
    padding 0 4.3%
    margin-bottom l(10)
    .o_h
      width 100%
      disFlex ()
      padding l(15) 0 l(10)
      img 
        display block
        width l(6)
        height l(10)
      .oh_l
        disFlex ()
        fz(14)
        color: #666;
        letter-spacing: 0.37px;
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
              color:  #FF5100;
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
            border 1px solid #FFBD9E
            color #FFBD9E
            border-radius l(100)
//热评的ul
  .order.hot
    padding l(15) 4.3% 0
    margin-bottom 0
    .o_h
      
    .h_d  
      li:last-of-type
        border-bottom 0
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
  .noList
    width l(175)
    height l(200)
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    div.box
      width l(175)
      height l(200)
      position absolute
      top 0
      left 0
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      img 
        display block
        width l(150)
        height l(147)
      span 
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #BABABA;
        letter-spacing: 1px;
      p
        width l(160)
        height l(44)
        background: #83271F;
        border-radius: 100px;
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 1.12px;
        line-height l(44)
</style>
