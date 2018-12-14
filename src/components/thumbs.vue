<template>
  <div class="con">
    <div class="content" v-if="list.length">
      <ul class="h_list">
        <scroll ref="scroll"
              :data="list"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(startY)"
              @pullingDown="onPullingDown"
              @pullingUp="onPullingUp">
          
                <li class="h_li">
                  <div class="left">
                    <img src="../assets/img/play.png" alt="">
                    <span class="time">{{i.tea_date}} {{i.tea_period}}</span>
                    <span class="p_n">{{i.tea_play_count}}次播放</span>
                  </div>
                  <div class="right">
                    <p class="name">{{i.tea_title}}</p>
                    <p class="intro">介绍：{{i.tea_desc}}</p>
                    <div class="mark">
                      评分
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
                        ￥<p>{{i.tea_price}}.</p>00 <span>/{{i.tea_format}}g</span>
                      </div>
                      <div class="pri_r">马上抢</div>
                    </div>
                  </div>
                </li>
           
          <div class="order-list" v-if="list.length == 0 && !loading">
            <load-more :show-loading="false" tip="暂无数据" background-color="#f0f7f5"></load-more>
          </div>

        </scroll>
      </ul>
    </div>
    <div class="noList" v-else>
      <div class="box">
        <img src="../assets/img/symbols-order.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import {thumbsList} from '../api/api.js'
import {  Swipeout, SwipeoutItem, SwipeoutButton, XButton ,LoadMore } from 'vux'
import Scroll from './scroll/scroll'
export default {
  components: {
    Scroll,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton ,
    LoadMore,
  },
  data () {
    return {
      token :sessionStorage.token,
      list:[],
      page:1,
      loading :true,

      
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
    document.title = '我的点赞'
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
      thumbsList(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.list = this.list.concat(res.data.data.result)
          console.log(this.list)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //取消收藏
    handle(i){

    },
    //下拉刷新
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and load data')
      this.init(1)
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      this.page ++
      this.init(this.page)

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
  border-top 1px solid  #E8E8E8
  padding  l(10) 0 0
  .content
    height l(656)
    background #F7F7F7
    overflow-y scroll
    box-shadow: 0 0 5px 0 #E8E8E8;
    ul.h_list,.demo-content
      
      .h_li
        padding l(25) 4.3% l(15)
        margin-bottom l(15)
        disFlex ()
        background #fff
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
              p
                fz(14)
              span 
                font-size: 12px;
                color: #3F3F3F;
                letter-spacing: 0.31px;
            .pri_r
              width l(60)
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
        width l(176)
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
