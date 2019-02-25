<template>
  <div class="con" ref="cons">
     <div class="content" @click.stop="moreShow = moreShow ? !moreShow : moreShow">
        <div class="search" @click="$router.push('/search')">
          <img src="../assets/img/search.png" alt="">
        </div>
        <div class="ul_box" ref="headBox">
          <ul class="tab">
            <li class="tabli" @click="goAll" :class="tabIndex==1?'active':''">推荐</li>
            <!-- <li class="tabli" @click="GOrecommand('','',0);filterId=0" :class="tabIndex==1?'active':''">推荐</li> -->
            <!-- <li class="tabli" @click="token == ''? loginMaskShow=true : GOrecommand('','',0);filterId=0" :class="tabIndex==2?'active':''">热评</li> -->
            <li  class="tabli" @click="GOadvance('','',0);filterId=0" :class="tabIndex==2?'active':''">预告</li>
            <li class="tabli" @click="$router.push('/kinds') " :class="tabIndex==3?'active':''">分类</li>
            <!-- <li  class="tabli" @click.stop="moreShow = !moreShow">
              <img src="../assets/img/tab5.png" alt="">更多 
              <ul class="more" v-if="moreShow">
                <li v-for="i in moreLists" :key="i.id" @click.stop="shilter(i.id)" :class="filterId==i.id ? 'active' :''">{{i.name}}</li>
              </ul>
            </li> -->
          </ul>
        </div>
       
      </div>
    <!-- 列表 -->
  <div class="box" id="boxs">
    <scroll ref="scroll"
        :data="list"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        :listenScroll=true
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp"
        @scroll="getScrollPage"
    >

        <!-- 头部 -->
        <ul class="goodsList" id="lists"> 
          <!-- <li v-for="(item,index) in list" :key="index" @click="$router.push({path:'/goodDetail',query:{id:item.id}})" class="listli">     -->
          <li v-for="(item,index) in list" :key="index" @click="goDetail(item.id)" class="listli">
            <div class="li_top" :style="{background:'url(' + item.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
              <div class="play"><span></span></div>
              <div class="data">
                <div class="d_l">
                  {{item.tea_play_count}}次播放
                </div>
                <ul class="p_r">
                  <li @click.stop="collect(item.id,index)"><img src="../assets/img/star.png" alt="">{{Number(item.tea_collect_count) < Number(10000) ? Number(item.tea_collect_count) : (Number(item.tea_collect_count)/10000).toFixed(2)}}</li>
                  <li @click.stop="thumb(item.id,index)"><img src="../assets/img/xin1.png" alt="">{{Number(item.tea_thumb_count) < Number(10000) ? Number(item.tea_thumb_count) : (Number(item.tea_thumb_count)/10000).toFixed(2)}}</li>
                  <li><img src="../assets/img/talk.png" alt="" class="hua">{{Number(item.tea_comment_count) < Number(10000) ? Number(item.tea_comment_count) : (Number(item.tea_comment_count)/10000).toFixed(2)}}</li>
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
		    <div class="order-list" v-if="list.length == 0 && !loading">
		    	<load-more :show-loading="false" tip="暂无数据" background-color="#f0f7f5"></load-more>
		    </div>
    </scroll>
  </div>
    <footers :index = 1></footers>

    <!-- 提示去登录的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="loginMaskShow" title="您还没有登录" @on-confirm="$router.replace({path:'/login'})">
        <p style="text-align:center;">现在去登录?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import footers from './footers'
import utils from '../utils/js/style.js'
import domain from '../api/domain.js'
import { Confirm,TransferDomDirective as TransferDom ,Swipeout, SwipeoutItem, SwipeoutButton, XButton ,LoadMore } from 'vux'
import Scroll from './scroll/scroll'
import {getAlltop, getAll, getRecommand, getAdvance, vidioThumb, vidioCollect, carList, myData} from '../api/api.js'
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
    footers
  },
  data () {
    return {
      token : '',
      img_link : '',
      loginMaskShow:false,
      moreShow : false,//更多那个按钮是否显示
      list:[],
      page:1,
      loading :true,
      advanceCount:'',
      recommendCount:'',
      moreLists:[{id:1,name:'播放量最高'},{id:2,name:'收藏最多'},{id:3,name:'点赞最高'}],
      filterId:'',
      order:'',
      is_order : 0,
      topArr:[],//置顶和预售的数组
      carNum:'',
      is_ref:false,
      tabIndex:1,

      
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
  created(){
    //上次浏览的位置定位
    if(localStorage.scrollY){
      this.startY=localStorage.scrollY;
      setTimeout(()=>{
        localStorage.scrollY=0;
      })
    }else{
      this.startY=0
    }
    //token存90天
    if(localStorage.firstTime){
      let firstTime = localStorage.firstTime
      let nowTime = new Date().getTime()
      //算时间差
      let cha = Number(nowTime) - Number(firstTime)
      if(cha/1000/60/60/24 < Number(90)){
        this.token = localStorage.token
      }else{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('firstTime')
        this.token = ''
      }
    }else{
      this.token = ''
    }

    if(sessionStorage.page){
      if(sessionStorage.page!=1){
        this.page = sessionStorage.page
         this.list = JSON.parse(sessionStorage.list)
      }else{
        if(this.tabIndex == 1){
          this.goAll()
          //this.GOrecommand('','',0)
        }else if(this.tabIndex == 2){
           //this.GOrecommand('','',0)
        this.GOadvance('','',0)
        }else if(this.tabIndex == 3){
          //this.GOadvance('','',0)
        }
      }
      
    }else{
       if(this.tabIndex == 1){
        this.goAll()
        //this.GOrecommand('','',0)
      }else if(this.tabIndex == 2){
        //this.GOrecommand('','',0)
        this.GOadvance('','',0)
      }else if(this.tabIndex == 3){
        //this.GOadvance('','',0)
      }
    }
   
    if(this.$route.query.oid){
      //utils.setCookie('oid',this.$route.query.oid,90)
      localStorage.oid = this.$route.query.oid
    }
    document.title = '茶急送'
    // this.init()
    if(!sessionStorage.tabIndex){
      this.tabIndex = 1
    }else{
      this.tabIndex = sessionStorage.tabIndex
    }
     
   
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
  mounted() {
    // this.$nextTick(() => {
    //   setTimeout(()=>{
    //     this.copyBtn = new this.clipboard(this.$refs.copy[0]);
    //   },10)
    // })
    this.$el.querySelector('#boxs').style.height=this.$refs.cons.offsetHeight-this.$refs.headBox.offsetHeight - 70 +'px'
  },
  methods:{
   
    // 获得滚动坐标
    getScrollPage(pos){
      this.scrollYPages=pos.y;
    },
     // 去详情
    goDetail(id){
      console.log(this.scrollYPages,222222)
      localStorage.setItem('scrollY',this.scrollYPages);
      if(this.page!=1){
        sessionStorage.list = JSON.stringify(this.list)
        sessionStorage.page = this.page
      }
      setTimeout(()=>{
         this.$router.push({name:'goodDetail',query:{id:id}})
      })
     
    },
    //购物车数量
    init(){
      if(!this.token){return}
      carList({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.carNum = res.data.data.count
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
      myData({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.img_link = res.data.data.info.img_link
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //分享
    // share(id,index) {
     
    //   this.copyBtn = new this.clipboard(this.$refs.copy[index]);
    //   let _this = this;
    //   let clipboard = this.copyBtn;
    //   console.log(clipboard,'clipboard')
    //   clipboard.on('success', function() {
    //      _this.$vux.toast.text('复制成功，可直接粘贴给好友！')
    //   });
    //   clipboard.on('error', function() {
    //       _this.$vux.toast.text('复制失败，请重新复制！')
    //   });
    // },
    //收藏
    collect(id,index){
      if(!this.token){
        this.$vux.toast.text('请登录后再操作')
        return
      }
      console.log(id)
      const options = {
        token :this.token,
        id:id
      }
      vidioCollect(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('+1') 
          this.list[index].tea_collect_count+=1
          }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //点赞
    thumb(id,index){
      if(!this.token){
        this.$vux.toast.text('请登录后再操作')
        return
      }
      const options = {
        token :this.token,
        id:id
      }
      vidioThumb(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('+1') 
          this.list[index].tea_thumb_count+=1
          }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    goAll(){
      // this.filterId =0
      this.tabIndex = 1
      this.indexActive = this.tabIndex
      this.list = []
      this.page = 1
      this.allData(1)
    },
    topData(){
      getAlltop().then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          console.log(res,'res')
          if(res.data.data.advance){
            res.data.data.advance.forEach(item=>{
              item.isAdvance = true
            })
          }
          this.topArr = res.data.data.advance.concat(res.data.data.top)
            console.log(this.topArr,'预售+置顶')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    async allData(page){
      const options = {
        page:page,
        rows:10,
      }
      await this.topData()
      setTimeout(()=>{
        getAll(options).then(res=>{      
          if(res.data.code == 200 && !res.data.error_code){
            this.allCount = res.data.data.count
            if(this.page==1){
              // this.list = this.list.concat(res.data.data.tea)
              // this.list = this.topArr.concat(this.list)
              console.log(this.topArr)
              this.list = this.topArr.concat(res.data.data.tea)
              console.log(this.list,'所有的1')
            }else{
              this.list = this.list.concat(res.data.data.tea)
              console.log(this.list,'所有的不是1')
            }
            // console.log(this.list,'所有的')
            }else{
            this.$vux.toast.text(res.data.error_message||res.data.message)
          }
        
        })
      },300)
      
    },
    GOrecommand(key,order,is_order){
      // this.tabIndex = 2
      // this.indexActive = this.tabIndex
      // this.list = []
      // this.page = 1
      // this.recommand(1,key,order,is_order)
      this.tabIndex = 1
      this.indexActive = this.tabIndex
      this.list = []
      this.page = 1
      this.recommand(1,key,order,is_order)
    },
    //推荐
    recommand(page,key,order,is_order){    
      if(key==1){
        key = 'tea_play_count '
      }else if(key==2){
        key='tea_collect_count'
      }else if(key==3){
        key = 'tea_thumb_count'
      }else{
        key = ''
      }
      const options = {
        key:key,
        page:page,
        rows:10,
        order:order,
        is_order:is_order,
      }
      getRecommand(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.recommendCount = res.data.data.count
          if(page==1){
            this.list = res.data.data.result
            return
          } 
          if(res.data.data.result.length){
            this.list = this.list.concat(res.data.data.result)
             console.log(this.list,111111)
          }          
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    GOadvance(key,order,is_order){
      //this.filterId =0
      this.tabIndex = 2
      this.indexActive = this.tabIndex
      this.list = []
      this.page = 1
      this.advance(1,key,order,is_order)
    },
    //预告
    advance(page,key,order,is_order){
      if(key==1){
        key = 'tea_play_count '
      }else if(key==2){
        key='tea_collect_count'
      }else if(key==3){
        key = 'tea_thumb_count'
      }else{
        key = ''
      }
      const options = {
        key:key,
        page:page,
        rows:10,
        order:order,
        is_order:is_order
      }
      getAdvance(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
            this.advanceCount = res.data.data.count
           if(page==1){
            this.list = res.data.data.result
            this.page=1    
          }else{
            this.list = this.list.concat(res.data.data.result)
            console.log(this.list)
          }
          this.list.forEach(item=>{
              item.isAdvance = true
            })
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //排序
    shilter(id){  
      if(this.tabIndex==1){
        
      }else if(this.tabIndex==2){
        this.list = []
        this.filterId = id
        this.order = 'desc'
        this.is_order = 1
        this.GOrecommand(id,this.order,this.is_order)
      }else if(this.tabIndex==3){
        this.list = []
        this.filterId = id
        this.order = 'desc'
        this.is_order = 1
        this.GOadvance(id,this.order,this.is_order)
      }
      this.moreShow = false
    },
       //下拉刷新
    onPullingDown() {
      // 模拟更新数据is_ref
      this.is_ref = true
      if(this.tabIndex==1){
        this.goAll()
      }else if(this.tabIndex == 2){
        this.GOadvance('','',0)
      }
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      //  filterId:'',
      // order:'',
      // is_order : 0,
      if(this.filterId && this.order){
        this.is_order = 1
      }else{
        this.is_order =0
      }
      if(this.tabIndex==1){
        if(this.allCount>this.page*10){
          this.page++
          this.allData(this.page,this.filterId,this.order,this.is_order)
        }       
      }else if(this.tabIndex == 2){
        if(this.recommendCount>this.page*10){
          this.page++
          this.advance(this.page,this.filterId,this.order,this.is_order)
          // this.recommand(this.page,this.filterId,this.order,this.is_order)
        }   
      }
      // else if(this.tabIndex == 3){
      //   if(this.advanceCount>this.page*10){
      //     this.page++
      //     this.advance(this.page,this.filterId,this.order,this.is_order)
      //   }   
      // }
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
      tabIndex(oldV,neWV){
        sessionStorage.tabIndex = oldV
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  height 100vh
  position relative
  .content
    width 100%
    height l(50)
    background #fff
    padding 0 4.3%
    // backgroundIcon ('banner.png')
    position relative
    overflow-x scroll
    .search
      width 16.2%
      height 100%
      position absolute
      left 0
      top 0
      padding-left l(10)
      display flex
      justify-content center
      align-items center
      img
        display block
        width l(18)
        height l(18)
    .ul_box::-webkit-scrollbar {
        display: none;
    }
    .ul_box
      width 83.7%
      overflow scroll
      position absolute 
      right 0 
      top 0
      ul.tab
        width 111%
        height l(50)
        disFlex()
        background: #FFFFFF;
        padding  0 l(50) 
        // padding-right l(25)
        // position absolute
        // top 72%
        // left 4.3%
        // box-shadow: 0 0 2px 0 #F2F2F2;
        // border-radius: 18px;
        // li.tabli:last-of-type
        //   color: #666666;
        //   position relative
        //   fz(11)
          // ul
          //   width l(80)
          //   height l(95)
          //   position absolute
          //   backgroundIcon ('btd.png')
          //   bottom -2.5rem
          //   right 0.7rem
          //   z-index 88
          //   fz(12)
          //   color: #FFFFFF;
          //   letter-spacing: 0.28px;
          //   padding-top l(3)
          //   li.active
          //     color  #282828
          //   li:last-of-type
          //     border-bottom 0
          //   li
          //     height l(30)
          //     line-height l(30)
          //     border-bottom 1px solid rgba(255,255,255,0.20)
        li.tabli.active
          color #282828
          font-family: PingFangSC-Medium;
        li.tabli
          // width 50%
          height 100%
          text-align center
          font-family: PingFangSC-Regular;
          fz(16)
          color: #666666;
          letter-spacing l(1)
          display flex
          flex-direction column
          justify-content space-around
          align-items center
          img 
            display block
            width l(24)
            height l(24)
  .box
    width 100%
    height 80vh
    position fixed
    top l(60)
    left 0
    ul.goodsList
      width 100%
      background #F7F7F7
      margin-top l(20)
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
                img.hua
                  height l(12)
                img 
                  display block
                  width l(14)
                  height l(13)
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
              font-family:PingFangSCM
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
        
  .no_use
    height l(70)
  .footer
    position fixed
    bottom 0
    left 0
    height l(75)
    display flex
    justify-content space-between
    width 100%
    background #f7f7f7
    padding-top l(5)
    .f_l
      width 26.1%
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      fz(10)
      color: #666666;
      background #ffffff
      img 
        display block
        width l(41)
        height l(41)
        border-radius 50%
    .f_r  
      display flex
      justify-content space-between
      width 100%
      background #fff
      padding l(5) 0 l(17)
      li.active
        color #FF5100
      li  
        width 33%
        display flex
        flex-direction column
        justify-content space-around
        align-items center
        fz(10)
        color #666
        letter-spacing: 1px;
        img
          width l(26)
          height l(22)
          display block


</style>
