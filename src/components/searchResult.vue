<template>
  <div class="con">
    <!-- 搜索到的列表 -->
    <div class="big_box">
    <div class="boxbox" v-if="count!=0">
      <scroll ref="scroll"
          :data="searchResultList"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          :listenScroll=true
          @pullingDown="onPullingDown"
          @pullingUp="onPullingUp"
          @scroll="getScrollPage">

        <ul class="goodsList">    
          <li v-for="(item,index) in searchResultList" :key="index" @click="goDetail(item.id)" class="listli">
            <div class="li_top" :style="{background:'url(' + item.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
              <div class="play"><span></span></div>
              <div class="data">
                <div class="d_l">
                  {{item.tea_play_count}}次播放
                </div>
                <ul class="p_r">
                  <li @click.stop="collect(item.id,index)"><img src="../assets/img/star.png" alt="">{{Number(item.tea_collect_count) < Number(10000) ? Number(item.tea_collect_count) : (Number(item.tea_collect_count)/10000).toFixed(2)}}</li>
                  <li @click.stop="thumb(item.id,index)"><img src="../assets/img/zan.png" alt="">{{Number(item.tea_thumb_count) < Number(10000) ? Number(item.tea_thumb_count) : (Number(item.tea_thumb_count)/10000).toFixed(2)}}</li>
                  <li><img src="../assets/img/talk.png" alt="">{{Number(item.tea_comment_count) < Number(10000) ? Number(item.tea_comment_count) : (Number(item.tea_comment_count)/10000).toFixed(2)}}</li>
                </ul>
              </div>
              <!-- <div class="time" v-if="!item.isAdvance">{{item.tea_date}}</div>
              <div class="time" v-else>预售 {{item.tea_date}}</div> -->
              <div class="new-tea" v-if="item.isAdvance==1">
                <img src="../assets/img/tea_new.png" alt="">
              </div>
            </div>
            <div class="li_mid">
              <!-- <div class="red"></div> -->
              <span class="t_t">{{item.tea_title}}</span> 
              <div class="buy">
                <span v-if="item.tea_count/item.tea_total!=0 && item.isAdvance!=1">马上抢购</span>
                <span v-if="item.isAdvance==1 && item.tea_count/item.tea_total!=0">马上预购</span>
                <span v-if="item.tea_count/item.tea_total==0" @click.stop="$router.push({path:'/teaLike',query:{id:item.id,tea_id:item.tea_type_id}})">查看相似</span>
                <img src="../assets/img/more1.png" alt="">
              </div> 
            </div>
            <!-- <div class="li_bot">
              <div class="lt_l">
                <div class="all">
                  <span :style="{width:item.tea_count/item.tea_total*100+'%'}"></span>
                  <div>仅剩{{item.tea_count}}份</div>
                </div>
                <div>￥<span class="p1">{{item.tea_price}}</span><span class="p2">/{{item.tea_format}}g</span></div>
              </div>
              
              <img src="../assets/img/l1.png" alt="" v-if="item.tea_count/item.tea_total!=0 && item.isAdvance!=1">
              <img src="../assets/img/l2.png" alt="" v-if="item.tea_count/item.tea_total==0" @click.stop="$router.push({path:'/teaLike',query:{id:item.id,tea_id:item.tea_type_id}})">
              <img src="../assets/img/l3.png" alt="" v-if="item.isAdvance==1 && item.tea_count/item.tea_total!=0">
            </div>
            -->
          </li>
        </ul>      
          <div class="order-list" v-if="count == 0 && !loading">
            <load-more :show-loading="false" tip="暂无数据" background-color="#f0f7f5"></load-more>
          </div>

        </scroll>
      </div>
        <!-- 没有数据的话 -->
      <div class="noList" v-else>
        <div class="box">
          <img src="../assets/img/symbols-search.png" alt="">
          <span>暂无数据</span>
        </div>
      </div>
    </div>
    <footers :index = 1></footers>
  </div>
</template>

<script>
import footers from './footers'
import Vue from 'vue'
import Scroll from './scroll/scroll'
import {getHistory,delHistory,getSearchDate,getFilter,getSearch} from '../api/api.js'
import utils from '../utils/js/style.js'
export default {
  components: {
    Scroll,
    footers,
  },
  data () {
    return {
      token:localStorage.token || '',
      searchResultList:[],//搜索到的列表
      tea_type_id:'',
      key:'',
      value:'',
      page:1,
      selectLi:'',
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
      itemIndex: 0,
      startY: localStorage.getItem('scrollYSearch')||0,
      scrollYPages:0,
      loading :true,
    }
  },
  created(){
    document.title = '搜索'
    if(this.$route.query.word){//关键字搜索
      console.log(this.$route.query.word)
      this.searchCon(1,1,this.$route.query.word,'',0,'','')
    }else if(this.$route.query.id){
      this.tea_type_id = this.$route.query.id
      this.searchCon(1,2,'',this.$route.query.id,0,'','')
    }

    //上次浏览的位置定位
    if(localStorage.scrollYSearch){
      this.startY=localStorage.scrollYSearch;
      setTimeout(()=>{
        localStorage.scrollYSearch=0;
      })
    }else{
      this.startY=0
    }
  },
  mounted() {
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
    //点击每个li，根据类型搜索
    // searchIdCon(id){
    //   this.tea_type_id = id;
    //   console.log(this.tea_type_id)
    //   this.searchCon(1,2,'',this.tea_type_id,0,'','')
    // },
     // 获得滚动坐标
    getScrollPage(pos){
      this.scrollYPages=pos.y;
    },
    goDetail(id){
      console.log(this.scrollYPages,222222)
      localStorage.setItem('scrollYSearch',this.scrollYPages);
      if(this.page!=1){
        sessionStorage.list = JSON.stringify(this.searchResultList)
        sessionStorage.page = this.page
      }
      setTimeout(()=>{
         this.$router.push({name:'goodDetail',query:{id:id}})
      })
     
    },
    searchCon(page,search_type,tea_desc,tea_type_id,type,key,value){
      const options = {
        token:this.token,
        page:page,
        rows:10,
        search_type:search_type,//检索时 类型和关键词是否参与检索 取值 0 1 2    0 都有 1 仅关键词 2 仅类型
        tea_title:tea_desc,//检索关键词 若search_type 为0 1时必传
        tea_type_id:tea_type_id,//检索类型id 若search_type 为0 2 时必传
        type:type,//筛选类型  0 无需筛选 1 排序 2 筛选
        key:key,//筛选的key 当type=1,2时必传  tea_period(期数)/tea_price(价格)/tea_place_id(产地id)/tea_make(制茶方法)/tea_year(年份)
        value:value//	筛选的key对应的值 当type=1,2时必传
      }
      console.log(options)
      getSearch(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          console.log(res)
          this.count = res.data.data.count
          if(page==1){
            this.searchResultList = res.data.data.tea
            this.page=1
            return
          }
          this.searchResultList = this.searchResultList.concat(res.data.data.tea)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        } 
      })
    },
    //下拉刷新
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and load data')
    
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      if(this.count>this.page*10){
        this.page++
        if(this.$route.query.word){//关键字搜索
          console.log(this.$route.query.word)
          this.searchCon(this.page,1,this.$route.query.word,'',0,'','')
        }else if(this.$route.query.id){
          this.searchCon(this.page,2,'',this.$route.query.id,0,'','')
        }
      }
      // this.searchCon(this.page,2,'',this.tea_type_id,0,'','')

      this.$refs.scroll.forceUpdate()
    },
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  },
  watch:{
    searchTxt(oldV,newV){
      if(oldV =='' || newV == ''){
      }
    },
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
  height l(667)
  overflow-y scroll
  .big_box
    height 100vh
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
  .content
    padding l(20) 4.3%
    background #F7F7F7
    // margin-bottom l(20)
    // 头部
    .his
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      background #fff
      box-shadow: 0 0 5px 0 #F3F3F3;
      border-radius: 5px;
      padding l(20) l(10)
      .his_t
        width 100%
        disFlex()
        fz(14)
        color: #999999;
        letter-spacing: 0.2px;
        padding-bottom l(10)
        img 
          display block
          width l(18)
          height l(20)
      .his_word
        width 100%
        display flex
        justify-content flex-start
        flex-wrap wrap
        li
          width 25%
          line-height l(30)
          fz(14)
          color: #333333;
          letter-spacing: 0.2px;    
      img 
        display block
        width l(25)
        height l(5)
        margin-top l(10)
    .kinds
      margin-top l(10)
      li.k_t  
        display flex
        flex-direction column
        justify-content flex-start
        align-items center
        background #fff
        box-shadow: 0 0 5px 0 #F3F3F3;
        border-radius: 5px;
        padding l(20) l(10)
        margin-bottom l(10)
        .his_t
          width 100%
          display flex
          justify-content flex-start
          align-items center
          fz(14)
          color: #999999;
          letter-spacing: 0.2px;
          padding-bottom l(10)
          img 
            display block
            width l(20)
            height l(16)
            margin-right l(8)
        .his_word
          width 100%
          display flex
          justify-content flex-start
          flex-wrap wrap
          li
            width l(72)
            height l(30)
            background: #FFFFFF;
            border: 1px solid #DFC8C6;
            border-radius: l(100)
            line-height l(30)
            margin-bottom l(10)
            fz(14)
            color: #83271F;
            letter-spacing: 0.2px;
            margin-right l(10) 
          li:nth-of-type(4n)
            margin-right 0
        img.more 
          display block
          width l(25)
          height l(5)
          margin-top l(10) 
  .big_box
    
    // tab
    .tab
      width l(375)
      background #ffffff
      padding 0 4.3%
      disFlex ()
      li.tab_li.active
        color #83271f
      li.tab_li:last-of-type
        color: #666666;
        position relative
        ul.more
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
        position relative
        ul.liMore
          width l(60)
          position absolute
          top 1rem
          right -0.5rem
          z-index 88
          fz(12)
          color: #FFFFFF;
          letter-spacing: 0.28px;
          padding-top l(3)
          background rgba(0,0,0,0.5)
          border-radius 3px
          li
            line-height l(26)
        img 
          display block
          width l(13)
          height l(8)
          margin-left l(3)
        img.more 
          display block
          width l(18)   
          height l(18) 
    .boxbox
      height 98vh
      position relative
      //列表
      .goodsList
        width l(375)
        background #F7F7F7
        margin-top l(10)
        li.listli
          width 100%
          min-height l(250)
          background #ffffff
          padding l(20) 4.3% l(10)
          margin-bottom l(10)
          //position relative
          .li_top
            width 100%
            height l(190)
            // backgroundIcon('list1.png')
            position relative
            border-radius l(15)
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
              border-radius 0 0 l(15) l(15)
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
              // width l(123)
              height l(17)
              position absolute
              top l(5)   
              right l(8)  
              text-align right
            .new-tea
              width l(50)
              height l(50)
              position absolute
              top 0
              left 0
              img
                display block
                width 100%
                height 100%
          .li_mid
            min-height l(50)
            position relative
            fz(18)
            color: #333333;
            letter-spacing: 1px;
            line-height: 23px;
            text-align left
            overflow hidden
            padding-top l(15) 
            // disFlex()
            //padding-bottom l(5)
            .red
              width l(4)
              height l(16)
              background: #83271F;
              position absolute
              left 0
              top l(10)
            span.t_t
              display block
              // width 100%
              height 100%
              // display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              line-height l(24)
              float left
              font-family: PingFangSC-Medium;
            .buy
              float right 
              disFlex()
              // margin-top l(2)
              span
                fz(14)
                color: #FF5100;
                letter-spacing: l(1)
              img
                display block
                width l(6)
                height l(10)
                margin-left l(5)
            .flower
              width 100%
              disFlex()
              height l(20)
              //margin-top l(5)
              ul
                overflow hidden
                li
                  width l(20)
                  height l(16)
                  float left
                  margin-right l(5)
                  backgroundIcon ('tea.png')
              input 
                display block
                width 0
                height 0
              img 
                display block
                width l(16)
                height l(16)
                margin 0 l(10)
              // position absolute
              // right 2.7%
              // bottom 20%
              // margin-left 90%
              // margin-bottom l(5)
              // margin-top l(5)
          .li_bot
            min-height l(50)
            display flex
            justify-content space-between
            align-items center
            //padding-bottom 1.9%
            margin 0 l(10)
            .lt_l
              height 100%
              // padding-top l(15)
              .all
                width l(104)
                height l(17)
                background: rgba(230,52,67,0.30);
                border-radius: 4px;
                position relative
                margin-bottom l(5)
                span 
                  display block
                  height 100%
                  position absolute
                  width 70%
                  background: #E63443;
                  border-radius: 4px 0 0 4px;  
                  left 0
                  top 0             
                div
                  position absolute
                  left 0
                  top 0
                  color #fff 
                  line-height l(17)
                  fz(10)
              div
                color: #E63443;
                fz(14)
                letter-spacing: 0.31px;
                //line-height l(24)
                text-align left
                .p1
                  fz(18)
                .p2
                  color: #3F3F3F;
                  fz(14)

            img 
              display block
              width l(92)
              height l(34)
  //没有数据
  .noList
    width l(175)
    height l(200)
    position absolute  
    // bottom -10rem
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
