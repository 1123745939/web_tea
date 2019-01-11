<template>
  <div class="con">
     <div class="content" v-if="newsList.length>0">
      <scroll ref="scroll"
        :data="newsList"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp">
        
        <swipeout class="vux-1px-tb">
          <swipeout-item transition-mode="follow" v-for="(item,index) in newsList" :key="item.id">
            <div slot="right-menu">
              <swipeout-button type="warn" @click.native="handle(item.id,index)">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <li @click="linker(item.target_type,item.notify_target_id,item.sender_id)">         
                <img :src="item.user.img_link" alt="" class="logo" v-if="item.target_type =='friend'">
                <img src="../assets/img/logo2.png" alt="" class="logo" v-else>
                <div class="li_r">
                  <div class="li_mm">
                    <p  v-if="item.target_type == 'product '">通知</p>
                    <p  v-if="item.target_type == 'order'">订单</p>
                    <p  v-if="item.target_type == 'friend'">{{item.user.username}}</p>
                    <span class="t">{{item.notify_content}}</span>
                    <span class="ti">{{item.created_at}}</span>
                  </div>
                  <div class="li_img" v-if="item.target_type !='friend'">
                    <img :src="item.tea_img_link" alt="" class="img1">
                    <img src="../assets/img/play.png" alt="" class="img2">
                  </div>
                </div>      
              </li>
            </div>
          </swipeout-item>
        </swipeout>
           
		    <!-- <div class="order-list" v-if="newsList.length == 0 && !loading">
		    	<load-more :show-loading="false" tip="暂无数据" background-color="#f0f7f5"></load-more>
		    </div> -->

    </scroll>

    <div class="del" @click="loginMaskShow = true" v-show="len">
      <img src="../assets/img/quanbushanchu@2x.png" alt="">
    </div>
     <!-- 提示是否全部删除的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="loginMaskShow"  @on-confirm="delAll">
        <p style="text-align:center;">确定要全部删除吗</p>
      </confirm>
    </div>
  </div>
    <div class="noList" v-else>
      <div class="box">
        <img src="../assets/img/symbols-info.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import {  Swipeout, SwipeoutItem, SwipeoutButton, XButton ,LoadMore ,Confirm,TransferDomDirective as TransferDom ,} from 'vux'
import Scroll from './scroll/scroll'
import {infos,infosDelOne,infosDelAll} from '../api/api.js'
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
      token:sessionStorage.token || '',
      newsList:[],
      len:'',
      loading :false,
      page:1,
      is_pull :false,
      loginMaskShow:false,
      
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
    this.init(1)
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
        token :this.token,
        page :page,
        rows:10,
      }
      infos(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
         if(page==1){
            this.newsList = res.data.data.result
            this.page=1
            console.log(this.newsList)
            return
          }
          this.newsList = this.newsList.concat(res.data.data.result)
          console.log(this.newsList)
          this.len = res.data.data.count
          if(this.len == this.newsList.length){
            this.pullUpLoadMoreTxt = '没有更多数据了'
          }
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //单个删除
    handle(id,index){
      const options = {
        token :this.token,
        id:id
      }
      infosDelOne(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('删除成功')
          this.newsList.splice(index,1)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //全部删除
    delAll(){
      infosDelAll({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('删除成功')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //跳转至订单详情或者产品详情
    linker(type,id,Fid){
      if(type=='friend'){
        this.$router.push({path:"/teaFriend",query:{id:Fid}})
      }else if(type=='order'){
        this.$router.push({path:"/orderDetail",query:{id:id}})
      }else if(type=='product'){
        this.$router.push({path:"/goodDetail",query:{id:id}})
      }
    },  
    //下拉刷新
    onPullingDown() {
      this.page =1
      this.init(this.page)
    },
     //上拉加载
    onPullingUp() {
      this.page ++ 
      this.init(this.page)
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
  height l(667)
  overflow-y scroll
  border-top 1px solid  #E8E8E8
  padding-top l(10)
  .del
    width l(44)
    height l(44)
    position fixed
    right l(16)
    bottom l(40)
    img 
      display block
      width 100%
      height 100%
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
