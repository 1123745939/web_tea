<template>
  <div class="con"  ref="cons">
    <!-- 评价 -->
    <div class="pre"  ref="navs">
      <ul class="pr_m">
        <li :class="tabIndex ==1 ?'active':'' "  @click="hot('',1)">全部<br>{{total.total_count}}</li>
        <li :class="tabIndex ==2 ?'active':'' " @click="hot('is_hot',0)">热评<br>{{total.hot_count}}</li>
        <li :class="tabIndex ==3 ?'active':'' " @click="hot('is_vidio',0)">视频<br>{{total.vidio_count}}</li>
        <li :class="tabIndex ==4 ?'active':'' " @click="hot('is_image',0)">有图<br>{{total.image_count}}</li>
        <li :class="tabIndex ==5 ?'active':'' " @click="hot('is_append',0)">追加<br>{{total.append_count}}</li>
      </ul>
      <div class="blank"></div>
      <div class="booo" v-show="result.length" id="boxs">
        <scroll ref="scroll"
          :data="result"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pullingDown="onPullingDown"
          @pullingUp="onPullingUp">

          <ul class="pr_list">
            <li class="pr_li" v-for="(item,index) in result" :key="item.id">
              <div class="li_t">
                <img :src="item.user.img_link" alt="">&nbsp;
                {{item.user.username}}
              </div>
              <p>{{item.content}}</p>
              <div class="imBox">
                <ul class="d_img" v-show="item.image">
                  <li class="d_li" v-for="(img,index) in item.image" :key="index">
                    <img :src="img.image_link" alt="">
                  </li>
                </ul>
                <div class="vi" v-if="item.vidio!=null">
                  <video :src="item.vidio.vidio_link" v-if="item.vidio!=null"></video>
                </div>
              </div>
              <div class="li_bt">
                <span>{{item.created_at}}</span>
                <span @click="zan(item.id,index)"><img src="../assets/img/zanbb.png" alt="" v-if="item.is_thumb==0">
                <img src="../assets/img/zan1_active.png" alt="" v-else>
                &nbsp;&nbsp;{{item.thumb_count}}</span>
              </div>
              <!-- 追评 -->
              <div class="zhui" v-show="item.append">
                <div class="li_t zhui">用户追评</div>
                <li class="pr_li" v-for="(i,index1) in item.append" :key="i.id">             
                  <div class="li_t">
                    <img :src="i.user.img_link" alt="">&nbsp;
                    {{i.user.username}}
                  </div>
                  <p>{{i.content}}</p>
                  <div class="imBox">
                    <ul class="d_img zhui" v-show="i.image">
                      <li class="d_li" v-for="(img,index) in i.image" :key="index">
                        <img :src="img.image_link" alt="">
                      </li>
                    </ul>
                    <div class="vi" v-show="i.vidio!=null">
                      <video :src="i.vidio.vidio_link" v-if="i.vidio!=null"></video>
                    </div>
                  </div>
                  <div class="li_bt">
                    <span>{{i.created_at}}</span>
                    <span @click="zan1(i.id,index,index1)">
                      <img src="../assets/img/zanbb.png" alt="" v-if="i.is_thumb==0">
                     <img src="../assets/img/zan1_active.png" alt="" v-else>
                    &nbsp;&nbsp;{{i.thumb_count}}</span>
                  </div>
                </li>
              </div>
            </li>
          </ul>
          <div class="order-list" v-if="len == 0 && !loading">
            <load-more :show-loading="false" tip="暂无数据" background-color="#f0f7f5"></load-more>
          </div>
        </scroll>
      </div>
    <div class="noList" v-show="result.length==0">
      <div class="box">
        <img src="../assets/img/symbols-order.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>

    </div>
    <!-- the tip to login -->
    <div v-transfer-dom>
      <confirm v-model="loginMaskShow" title="您还没有登录" @on-confirm="$router.push({path:'/login'})">
        <p style="text-align:center;">现在去登录?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import { Confirm,TransferDomDirective as TransferDom } from 'vux'
import Scroll from './scroll/scroll'
import {commentAll , commentThumb ,commentReplyThumb } from '../api/api.js'
export default {
   directives: {
    TransferDom
  },
  components: {
    Scroll,
    Confirm,
  },
  data () {
    return {
      token : utils.getCookie('token') || '',
      id:'',
      total:{},
      comments:{},
      result:[],
      key:'',
      first:1,
      page:1,
      len:'',
      tabIndex:1,
      count:'',
      loginMaskShow:false,

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
      loading :true,
    }
  },
  created(){
    document.title = '全部评论'
    this.id = this.$route.query.id
    this.init('',1,1)
  },
  mounted(){
    this.$el.querySelector('#boxs').style.height=this.$refs.cons.offsetHeight-this.$refs.navs.offsetHeight+'px'
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
    init(key,first,page){
      const options = {
        token :this.token,
        id:this.id,
        key:key,
        first:first,
        page:page,
        rows:10
      }
      commentAll(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.count = res.data.data.comments.count
          console.log(res,'res')
          if(res.data.data.total!=null){
            this.total = res.data.data.total
            console.log(this.total)
          }
          this.comments =   res.data.data.comments
          console.log(this.comments)
          this.result = this.result.concat(res.data.data.comments.result)
          this.len = res.data.data.comments.result.length
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //hot
    hot(key,first){
      if(key==''){
        this.tabIndex =1
      }else if(key=='is_hot'){
        this.tabIndex =2
      }else if(key=='is_vidio'){
        this.tabIndex =3
      }else if(key=='is_image'){
        this.tabIndex =4
      }else if(key=='is_append'){
        this.tabIndex =5
      }
      this.key = key
      this.first = first
      this.result = []
      this.init(this.key,this.first,1)
    },
    //点赞某一条评论
    zan(id,index){
       if(!this.token){
        this.loginMaskShow = true
        return
      }
      const options = {
        token :this.token,
        id:id,
        tea_id:this.id,
      }
      commentThumb(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.result[index].thumb_count+=1
          this.result[index].is_thumb=1
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //点赞追评
    zan1(id,index,index1){
      console.log(id)
      if(!this.token){
        this.loginMaskShow = true
        return
      }
      const options = {
        id:id,
        tea_id:this.id,
        token :this.token
      }
      commentThumb(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
           this.result[index].append[index1].is_thumb=1
           this.result[index].append[index1].thumb_count+=1
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    onPullingDown() {
      // 模拟更新数据
      this.result = []
      this.init(this.key,this.first,1)
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      if(this.count>this.page*10){
        this.page ++ ;
         this.init(this.ket,0,this.page)
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
  box-shadow: 0 0 5px 0 #F3F3F3;
  height 100vh
  // 评论列表
  .pre
    background #F7F7F7
    width 100%
    ul.pr_m
      width 100%
      display flex
      justify-content space-between
      background #fff
      padding l(10) 4.3% 
      position fixed
      top 0
      left 0
      li.active
        color #83271F
      li
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.3px;
        line-height l(26)
    .blank
      width 100%
      height l(80)
    .booo
      height l(587)
      position fixed
      top l(80)
      width 100%
      ul.pr_list
        background #fff
        padding 0 4.3% 
        margin-top l(5)
        li.pr_li:last-of-type
          border-bottom 0
        li.pr_li
          border-bottom 1px solid #E8E8E8
          padding l(20)  l(10) 0
          div.li_t.zhui
            font-size: 14px;
            color: #83271F;
            letter-spacing: 0.3px;
            padding l(10) 0
            line-height l(26)
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
            padding 0 10% l(5)
          div.imBox
            overflow hidden
            padding  0 l(30)
            ul.d_img.zhui
              padding l(10) 0
              li.d_li:nth-of-type(3n)
                margin-right 0
              li.d_li 
                width l(55)
                height l(45)
                margin-right l(5)
            ul.d_img
              // width 100%
              display flex
              justify-content flex-start
              flex-wrap wrap
              //padding l(10) 10%
              float left
              li.d_li:nth-of-type(3n)
                margin-right 0
              li.d_li 
                width l(80)
                height l(65)
                margin-right l(9)
                img 
                  display block
                  width 100%
                  height 100%
            div.vi  
              width l(80)
              height l(65)
              float left
              video 
                width l(85)
                height l(65)
                margin-top l(5)
                margin-left l(20)
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
          div.zhui
            padding 0 l(30)
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
        height l(167)
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
