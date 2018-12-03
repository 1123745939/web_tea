<template>
  <div class="con">
    <scroll ref="scroll"
            :data="newsList"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp">
            
            <swipeout class="vux-1px-tb">
              <swipeout-item transition-mode="follow" v-for="i in 3" :key="i">
                <div slot="right-menu">
                  <swipeout-button type="warn" @click.native="handle(i)">删除</swipeout-button>
                </div>
                <div slot="content" class="demo-content vux-1px-t">
                  <li>
                    <img src="../assets/img/logo2.png" alt="" class="logo">
                    <div class="li_r">
                      <div class="li_mm">
                        <p>通知</p>
                        <span class="t">您奶德碧螺春发货了</span>
                        <span class="ti">3分钟之前</span>
                      </div>
                      <div class="li_img">
                        <img src="../assets/img/list1.png" alt="" class="img1">
                        <img src="../assets/img/play.png" alt="" class="img2">
                      </div>
                    </div>      
                  </li>
                </div>
              </swipeout-item>
            </swipeout>
           
		    <div class="order-list" v-if="newsList.length == 0 && !loading">
		    	<load-more :show-loading="false" tip="暂无数据" background-color="#f0f7f5"></load-more>
		    </div>

    </scroll>
    
  </div>
</template>

<script>
import {  Swipeout, SwipeoutItem, SwipeoutButton, XButton ,LoadMore } from 'vux'
import Scroll from './scroll/scroll'
import {Login} from '../api/api.js'
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
      newsList:[],
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
    document.title = '通知'
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
    handle(i){
      console.log(i)
    },
    //下拉刷新
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and load data')
      setTimeout(() => {
        if (Math.random() > 0.5) {
          this.$refs.scroll.forceUpdate()
          // 如果有新数据
          //this.items.unshift(this.$i18n.t('normalScrollListPage.newDataTxt') + +new Date())
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 2000)
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据

         this.$refs.scroll.forceUpdate()
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1500)
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
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  height l(667)
  overflow-y scroll
  border-top 1px solid  #E8E8E8
  padding-top l(10)
  ul,.demo-content
    padding 0 4.3%
    background #fff
    box-shadow: 0 0 5px 0 #E8E8E8;
    li:last-of-type
      div.li_r
        border-bottom 0
    li
      padding l(10) 0
      display flex
      justify-content flex-start
      align-items center
      img.logo
        display block
        width l(47)
        height l(47)
        border-radius 50%
      div.li_r
        width 84%
        border-bottom 1px solid  #E8E8E8
        disFlex ()
        margin-left l(10)
        .li_mm
          width 70%
          display flex
          flex-direction column
          justify-content space-between
          text-align left 
          p 
            line-height l(28)
            fz(16)
            color: #333333;
            letter-spacing: 0.32px; 
            text-align left  
          span.t 
            fz(14)
            color: #666666;
            letter-spacing: 0.22px;
            line-height l(28)
            text-align left 
          span.ti
            fz(12)
            color: #999999;
            letter-spacing: 0.24px;
            line-height l(28)
            text-align left 
        .li_img
          width l(80)
          height l(60)
          position relative
          .img1
            position absolute
            display block
            width l(80)
            height l(60)
            top 0
            left 0
          .img2
            position absolute
            display block
            width l(22)
            height l(22)
            top 0
            left 0
            bottom 0
            right 0
            margin auto

</style>
