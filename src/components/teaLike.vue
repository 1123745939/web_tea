<template>
  <div class="con" ref="cons">
    <div class="content" v-show="list.length>0" id="boxs">

        <scroll ref="scroll"
            :data="list"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp">

                <div class="demo-content vux-1px-t"> 
                  <li class="h_li" v-for="i in list" :key="i.id" @click="$router.push({path:'/goodDetail',query:{id:i.id}})">
                    <div class="left" :style="{background:'url(' + i.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
                      <img src="../assets/img/play.png" alt="">
                      <span class="time">{{i.tea_date}}</span>
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
                          ￥<p>{{i.tea_price}}</p><span>/{{i.tea_format}}g</span>
                        </div>
                        <div class="pri_r" @click.stop="$router.push({path:'/pay',query:{id:i.id,tsype:'buy'}})">马上抢</div>
                      </div>
                    </div>
                  </li>
                </div>
             
      </scroll>
      
    </div>
    <div class="noList" v-show="list.length==0">
      <div class="box">
        <img src="../assets/img/symbols-order.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import {teaLike, thumbsList} from '../api/api.js'
import Scroll from './scroll/scroll'
export default {
  components: {
    Scroll,
   
  },
  data () {
    return {
      token : utils.getCookie('token') || '',
      list:[],
      page:1,
      loading :true,
      id:'',
      tea_type_id:'',
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
    document.title = '相似的茶'
    this.id = this.$route.query.id
    this.tea_type_id = this.$route.query.tea_id
    this.init(this.page)
  },
  mounted(){
    this.$el.querySelector('#boxs').style.height=this.$refs.cons.offsetHeight +'px'
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
        // token: this.token,
        id:this.id,
        type_id:this.tea_type_id,
        page:page,
        rows:10,
      }
      teaLike(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.count = res.data.data.length
          if(page==1){
            this.list = res.data.data
            console.log(this.list)
            this.page=1
            return
          }
          this.list = this.list.concat(res.data.data)
          this.is_ref = false
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
      this.init(1)
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      if(this.count>this.page*10){
        this.page ++
        this.init(this.page)
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
  border-top 1px solid  #E8E8E8
  padding  l(10) 0 0
  height 100vh
  position relative
  .content
    width 100%
    height l(656)
    background #F7F7F7
    overflow-y scroll
    box-shadow: 0 0 5px 0 #E8E8E8;
    position fixed
    top 0
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
          width 50%
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
            text-overflow: ellipsis;
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
