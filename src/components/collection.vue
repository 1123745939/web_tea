<template>
  <div class="con">
    <div class="content" v-if="list.length>0">
      <scroll ref="scroll"
        :data="list"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp">
        
        <swipeout class="vux-1px-tb">
          <swipeout-item transition-mode="follow" v-for="(i,index) in list" :key="i.id">
            <div slot="right-menu">
              <swipeout-button type="warn" @click.native="id = i.id; Index1 = index;loginMaskShow = true">取消收藏</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <li class="h_li" @click.stop="$router.push({path:'/goodDetail',query:{id:i.id}})">
                <div class="left" :style="{background:'url(' + i.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
                  <img src="../assets/img/play.png" alt="">
                  <span class="time">{{i.tea_date}} {{i.tea_period}}</span>
                  <span class="p_n">{{i.tea_play_count}}次播放</span>
                </div>
                <div class="right">
                  <p class="name">{{i.tea_title}}</p>
                  <p class="intro">介绍:{{i.tea_desc}}</p>
                  <div class="mark">
                    评分:
                    <ul class="tea">
                      <li class="img" v-for="x in i.tea_score" :key="x">
                        <img src="../assets/img/tea.png" alt="">
                      </li>
                    </ul>
                  </div>
                  <div class="rest_n">
                    <div class="num_n">仅剩{{i.tea_count}}份</div>
                    <div class="rest_box" :style="{width:i.tea_count/i.tea_total*100+'%'}"></div>
                  </div>
                  <div class="pri">
                    <div class="pri_l">
                      ￥<span class="preice">{{i.tea_price}}</span> <span>/{{i.tea_format}}g</span>
                    </div>
                    <div class="pri_r" @click.stop="$router.push({path:'/pay',query:{id:i.id,type:'buy'}})" v-if="i.tea_count!=0">马上抢</div>
                    <div class="pri_r" @click.stop="$router.push({path:'/teaLike',query:{id:i.id}})" v-else>查看相似</div>
                  </div>
                </div>
              </li>
            </div>
          </swipeout-item>
        </swipeout>
      </scroll>   
    </div>

    <div class="noList" v-else>
      <div class="box">
        <img src="../assets/img/symbols-info.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>
    <!-- 取消收藏的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="loginMaskShow" @on-confirm="handle">
        <p style="text-align:center;">确定要取消收藏吗?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import {collectList ,collectCancel} from '../api/api.js'
import {  Swipeout, SwipeoutItem, SwipeoutButton, XButton ,LoadMore ,Confirm,TransferDomDirective as TransferDom} from 'vux'
import Scroll from './scroll/scroll'
export default {
   directives: {
    TransferDom
  },
  components: {
    Scroll,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton ,
    LoadMore,
    Confirm,
  },
  data () {
    return {
      token : utils.getCookie('token') || '',
      list:[],
      page:1,
      loading :true,
      id:'',
      Index1:'',
      loginMaskShow:false,
      count:'',

      
      pullUpLoadThreshold: 0,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '数据加载中',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      startY: 0,
      scrollToTime: 700,
      items: [],
      itemIndex: 0
    }
  },
  created(){
    document.title = '我的收藏'
    this.init(this.page)
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
    init(page){
      const options = {
        token: this.token,
        page:page,
        rows:10,
      }
      collectList(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.count = res.data.data.count
          if(page==1){
            this.list = res.data.data.result
            this.page=1       
          }else{
            this.list = this.list.concat(res.data.data.result)
            
          }
          console.log(this.list)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //取消收藏
    handle(){
      const options = {
        token :this.token,
        id:this.id
      }
      collectCancel(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('取消收藏成功')
          this.list.splice(this.Index1,1)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //下拉刷新
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and load data')
      this.init(1)
      this.$refs.scroll.forceUpdate()
     },
     //上拉加载
    async onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      if(this.count>this.page*10){
        this.page ++
        await this.init(this.page)
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
  background #f7f7f7
  border-top l(1) solid  #E8E8E8
  padding  l(10) 0 0 
  position relative
  height 100vh
  .content
    height 100vh - l(10)
    background #F7F7F7
    overflow-y scroll
    box-shadow: 0 0 5px 0 #E8E8E8;
    position relative
    
    // position relative
    ul.h_list,.demo-content
      
      .h_li
        padding l(25) 4.3% l(15)
        margin-top 0px l(15)
        disFlex ()
        background #fff
        margin-bottom l(10)
        box-shadow: 0 0 5px 0 #F3F3F3;
        .left
          width l(162)
          height l(110)
          position relative
          backgroundIcon ('list1.png')
          img
            display block
            width l(35)
            height l(35)
            position absolute
            left 0
            right 0
            bottom 0
            top 0
            margin auto
          .time
            background rgba(0,0,0,0.2)
            padding 0 l(3)
            font-size: 10px;
            color: #95514C;
            letter-spacing: 0.23px;
            line-height l(14)
            position absolute
            top 0
            right 0
          .p_n
            fz(10)
            color: #FFFFFF;
            letter-spacing: 0.23px;
            line-height l(14)
            position absolute
            left 0
            bottom 0
            padding 0 l(5)
        .right
          width 51%
          height l(110)
          padding-left l(5)
          p.name
            font-size: 14px;
            color: #333333;
            letter-spacing: 0.24px;
            line-height: l(23);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width l(170)
            text-align left 
          p.intro
            font-size: 12px;
            color: #666666;
            letter-spacing: 0.21px;
            line-height: 23px;
            text-align left 
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          div.mark
            display flex
            justify-content flex-start
            align-items center
            font-size: 12px;
            color: #666666;
            letter-spacing: 0.21px;
            margin l(5) 0
            ul
              display flex
              justify-content flex-start
              align-items center
              margin-left l(5)
              li.img
                width l(15)
                height l(12)
                margin-right l(3)
                img 
                  display block
                  width l(15)
                  height l(12)
          .rest_n
            width l(80)
            height l(17)
            background: rgba(230,52,67,0.30);
            border-radius: 4px;  
            position relative 
            margin l(5) 0
            font-size: 10px;
            color: #FFFFFF;
            letter-spacing: 0.21px;
            line-height l(17)
            text-align center
            .num_n
              position absolute
              height 100%
              left 0
              top 0
              z-index 99
              padding-left 5px
            .rest_box
              position absolute
              left 0
              top 0px
              width 80%
              height 100%
              background: #E63443;
              border-radius: 4px 0 0 4px;
          div.pri
            disFlex ()
            .pri_l
              display flex
              justify-content flex-start
              align-items center
              fz(12)
              color:  #E63443;
              letter-spacing: 0.31px;
              span.preice
                fz(14)
                color: #e63443;
              span 
                font-size: 12px;
                color: #3F3F3F;
                letter-spacing: 0.31px;
            .pri_r
              width l(70)
              height l(23)
              background: #FFFFFF;
              border: 1px solid #F6AEAE;
              border-radius: 100px;
              fz(14)
              color: #E63443;
              letter-spacing: 0.23px;
              line-height l(23)
  .noList
    width l(175)
    height l(200)
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    div
      width 100%
      height 100%
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
