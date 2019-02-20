<template>
  <div class="con">
    <!-- 顶部的tab栏 -->
    <ul class="tab">
      <li v-for="(item,index) in navlist" :key="index" :class="index == tabIndex ? 'active' :''"   @click="clicknav(index)">{{item}}</li>
    </ul>
    <!-- 头部的banner -->
    <!--  -->
    <div class="banner" v-show="batch.length>0">
      <div class="t_b">
        <ul>
          <li v-for="(i,index) in batch" :key="index"  @click="$router.push({path:'/goodDetail',query:{id:i.id}})">
            <img :src="i.tea_img_link" alt="" class="goodimg">
            <img src="../assets/img/play.png" alt="" class="play">
          </li>
        </ul>
      </div>
    </div>
    <!-- 详情 -->
    <div class="d">
      <div class="li_top">
        <div  class="prism-player" id="J_prismPlayer" style="height:100%"></div>
        <div class="data">
          <div class="d_l">
            {{detailObj.tea_play_count}}次播放
          </div>
          <ul class="p_r">
            <li @click="cangV()">
              <img src="../assets/img/xing2x.png" alt="" v-if="is_collect==0">
              <img src="../assets/img/star_active.png" alt="" v-else>
              {{detailObj.tea_collect_count}}
            </li>
            <li @click="zanV()">
              <img src="../assets/img/xin2x.png" alt="" v-if="is_thumb==0" class="xin">
              <img src="../assets/img/xin-active.png" alt="" v-else class="xin">
              {{detailObj.tea_thumb_count}}
            </li>
          </ul>
        </div>
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide><img src="../assets/img/photo.jpg" alt="">小灰灰11&nbsp;购买了这个茶叶</swiper-slide>
            <swiper-slide><img src="../assets/img/logo.png" alt="">大灰灰22&nbsp;购买了这个茶叶</swiper-slide>
            <swiper-slide><img src="../assets/img/hot.png" alt="">超灰灰33&nbsp;购买了这个茶叶</swiper-slide>
            <swiper-slide><img src="../assets/img/2.jpg" alt="">喜洋洋&nbsp;购买了这个茶叶</swiper-slide>
          </swiper>
      </div>
      <div class="li_mid">
        <!-- <div class="red"></div> -->
        <span class="t_t">{{detailObj.tea_title}}</span>
        <div class="t_star">
          <div>￥<span class="p1">{{detailObj.tea_price}}</span>.00 <span class="p2">/{{detailObj.tea_format}}g</span></div>
          <!-- <ul>
            <li v-for="i in detailObj.tea_score" :key="i"></li>
          </ul> -->
        </div>
        <div class="t_re">
          <img src="../assets/img/fire.png" alt="">
          <span>推荐理由：{{detailObj.tea_reason}}</span>
        </div>
      </div>   
    </div>
     <!-- 参数 -->
      <ul class="newData">
        <li>{{detailObj.tea_short_name}}</li>
        <li>{{detailObj.ingredients_name}}</li>
        <li>{{detailObj.place_name}}</li>
        <li>{{detailObj.tea_make}}</li>
        <li>{{detailObj.tea_format}}</li>
        <li>{{detailObj.storage_name}}</li>
        <li>{{detailObj.tea_quality}}</li>
        <li>{{detailObj.producted_at}}</li>
      </ul>
    <!-- 评价 -->
    <div class="pre" ref="m2">
      <div class="pr_m">
        <span>评论：{{comment.length || 0}}</span>
        <span class="pr_ms" @click="$router.push({path:'/discussAll',query:{id:id}})">更多&nbsp;&nbsp;<img src="../assets/img/more1.png" alt=""></span>
      </div>
      <ul class="pr_list">
        <li class="pr_li" v-for="(i,index) in comment" :key="i.id">
          <div class="li_t">
            <img :src="i.user.img_link" alt="">&nbsp;
            {{i.user.username}}
          </div>
          <p>{{i.content}}</p>
          <div class="a_b">
            <ul class="d_img" v-show="i.image">
              <li class="d_li" v-for="(item,index) in i.image" :key="index">
                <img :src="item.image_link" alt="">
              </li>
             </ul>
             <div class="vi" v-if="i.vidio">
               <video :src="i.vidio.vidio_link"></video>
             </div>
          </div>
          <div class="li_bt">
            <span>{{i.created_at}}</span>
            <span @click="zan(i.id,i.is_thumb,index)"><img src="../assets/img/xin2x.png" alt="" v-if="i.is_thumb==0">
            <img src="../assets/img/xin-active.png" alt="" v-else>
            &nbsp;&nbsp;{{i.thumb_count}}</span>
          </div>
          <!-- 追评 -->
              <div class="zhui" v-show="i.append">
                <div class="li_t zhui">用户追评</div>
                <li class="pr_li" style="padding-top:0" v-for="item in i.append" :key="item.id">             
                  <div class="li_t">
                    <img :src="item.user.img_link" alt="">&nbsp;
                    {{item.user.username}}
                  </div>
                  <p>{{item.content}}</p>
                  <div class="imBox">
                    <ul class="d_img" v-show="item.image">
                      <li class="d_li" v-for="(img,index) in item.image" :key="index">
                        <img :src="item.image_link" alt="">
                      </li>
                    </ul>
                    <div class="vi" v-if="item.vidio!=null">
                      <video :src="item.vidio.vidio_link"></video>
                    </div>
                  </div>
                  <div class="li_bt">
                    <span>{{item.created_at}}</span>
                    <span>
                      <img src="../assets/img/zanbb.png" alt="" v-if="item.is_thumb==1">
                      <img src="../assets/img/zan1_active.png" alt="" v-else>
                       &nbsp;&nbsp;{{item.thumb_count}}
                    </span>
                  </div>
                </li>
              </div>
        </li>
      </ul>
    </div>   
    <!--图文详情  -->
    <div class="intro" ref="m3">
      <div v-html="intro" ></div>
    </div>
    <!-- 同一款茶 -->
    <div class="one_t" ref="m4">
      <div class="ont_tt" @click="goSame">
        同一款茶<img src="../assets/img/more1.png" alt="">                                                 
      </div>
      <ul style="border-bottom:1px solid #E8E8E8">
        <li v-for="item in sameList" :key="item.tea_title" @click="$router.push({path:'/goodDetail',query:{id:item.id}})">
          <div :style="{background:'url(' + item.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
            <img src="../assets/img/play.png" alt="">
            <span>{{item.tea_date}}</span>
          </div>
            <p>{{item.tea_title}}</p>         
        </li>
      </ul>
    </div>
    <!-- 相似的茶 -->
    <div class="one_t" >
      <div class="ont_tt" @click="goLike">
        相似的茶<img src="../assets/img/more1.png" alt="">                                                 
      </div>
      <ul>
        <li v-for="item in likeList" :key="item.tea_title" @click="$router.push({path:'/goodDetail',query:{id:item.id}})">
          <div :style="{background:'url(' + item.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
            <img src="../assets/img/play.png" alt="">
            <span>{{item.tea_date}}</span>
          </div>
            <p>{{item.tea_title}}</p>         
        </li>
      </ul>
    </div>
    <!-- 底部 -->
    <div class="blank"></div>
    <div class="foot">
      <div class="f1" @click="token? connectCustom():loginMaskShow = true">
        <img src="../assets/img/kefu1.png" alt="">
        客服
      </div>
      <div  class="f1" @click="token? $router.push('/car'):loginMaskShow = true">
        <img src="../assets/img/car.png" alt="">
        购物车
        <span v-show="token">{{carNum}}</span>
      </div>
      <div class="buy_box">
        <p @click="token? addCar():loginMaskShow = true">加入购物车</p>
        <p class="buy" @click="token == ''? loginMaskShow=true : $router.push({path:'/pay',query:{id:id,type:'buy'}})">购买</p>
      </div>
    </div>
    <!-- 提示去登录的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="loginMaskShow" title="您还没有登录" @on-confirm="$router.push({path:'/login'})">
        <p style="text-align:center;">现在去登录?</p>
      </confirm>
    </div>
    <!-- 图片放大之后的展示 -->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
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
import domain from '../api/domain.js'
import 'swiper/dist/css/swiper.css'
import utils from '../utils/js/style.js'
// import '../utils/js/aliplay.js'
// import '../utils/css/aliplay.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Confirm,Previewer,TransferDomDirective as TransferDom } from 'vux'
import 'swiper/dist/css/swiper.min.css'
import { getGoodDetail , carList , addShop , commentThumb ,vidioCollect ,vidioThumb ,vidioPlayCount } from '../api/api.js'
export default {
    directives: {
    TransferDom
  },
  components: {
    Confirm,
    Previewer,
    swiper,
    swiperSlide
  },
  data () {
    return {
      token:localStorage.token || '',
      detailObj:{},
      sameList:[],
      likeList:[],
      comment:[],
      batch:[],
      loginMaskShow:false,
      carNum:'',
      topArr:[],
      list:[],
      idd:'',
      is_thumb:0,
      is_collect:0,
      intro:'',
      navlist:['商品','评价','详情','推荐'],
      tabIndex:'',
      h1:0,
      h2:0,
      h3:0,
      scroll:'',
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      },
      //轮播
      swiperOption:{
        slidesPerView :'auto',
        loop :true,
        autoplay: {
　　　　 delay: 2000,
      　　disableOnInteraction: true
      　},
        direction:'vertical',
        grabCursor:true,
        autoplayDisableOnInteraction:false,
        mousewheelControl:true,
        autoHeight:true,
        speed:500,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
　　    observeParents:true,//修改swiper的父元素时，自动初始化swiper 
      }

    }
  },
  created(){
    document.title = '详情'

        
  },
  mounted(){
    var id  = this.$route.query.id
    this.id = id
    this.init(id)
    this.$forceUpdate()
    this.getcarNum()
    this.swiper.slideTo(4, 1000, false)
    this.$nextTick(()=>{
      setTimeout(()=>{
        console.log(this.$refs.m2,'this.$refs.m2')
        console.log(this.$refs.m3,'this.$refs.m3')
        console.log(this.$refs.m4,'this.$refs.m4')
        this.h1 = this.$refs.m2.offsetTop
        console.log(this.h1,'this.h1')
        this.h2 = this.$refs.m3.offsetTop
        console.log(this.h2,'this.h2')
        this.h3 = this.$refs.m4.offsetTop
        console.log(this.h3,'this.h3')
      },500)
      })
    window.addEventListener('scroll', this.handleScroll)
    
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  updated(){

  },
  methods:{
    init(id){
      getGoodDetail({id:id,token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          console.log(res.data.data,'res.data.data')
          this.is_thumb = res.data.data.isthumb
          this.is_collect= res.data.data.isCollect
          this.detailObj = res.data.data.detail
          this.intro = res.data.data.detail.tea_detail
          this.sameList = res.data.data.same
          this.likeList = res.data.data.like 
          this.comment = res.data.data.comments
          this.batch = res.data.data.batch
          this.topArr = res.data.data.detail.images.concat(res.data.data.detail.vidio)
          if(res.data.data.detail.images.length){
            res.data.data.detail.images.forEach(item=>{
              var obj = {}
              obj.src = item.image_url
              obj.msrc = item.image_url
              obj.h = 1200
              obj.w = 900
              this.list.push(obj)
            })
          }

              var player = new Aliplayer({
              id: 'J_prismPlayer',
              width: '100%',
              preload:false,
              autoplay: false,
              cover: this.detailObj.tea_img_link,
              //支持播放地址播放,此播放优先级最高
              source : this.detailObj.tea_vidio_link,
             
              },function(player){
                  console.log('播放器创建好了。')
              });

              player.on('ready',()=>{
                this.playVideo()
              });
              
         
         
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    // 点击导航
    clicknav (index){
      this.tabIndex = index;
      var h2 = JSON.parse(this.h1+this.h2);
      if(index == 0){
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } else if(index == 1){
        document.documentElement.scrollTop = this.h1 - 40;
        document.body.scrollTop = this.h1 - 40;
      } else if(index == 2){
        document.documentElement.scrollTop = this.h2 - 40;
        document.body.scrollTop = this.h2 - 40;
      } else if(index == 3){
        document.documentElement.scrollTop = this.h3 - 40;
        document.body.scrollTop = this.h3 - 40;
      }
      
    },
    handleScroll (e) {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      console.log(this.scroll)
      if(this.scroll>0&&this.scroll<JSON.parse(this.h1)){
        this.tabIndex =0
      } else if(this.scroll>JSON.parse(this.h1)&this.scroll<this.h2){
        this.tabIndex =1
      } else if(this.scroll>this.h2&this.scroll<this.h3){
        this.tabIndex =2
      }else if(this.scroll>this.h3&this.scroll<this.h4){
        this.tabIndex =4
      }
    },
    //购物车的数量
    getcarNum(){
      if(!this.token){return}
      carList({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.carNum = res.data.data.count
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //加入购物车
    addCar(){
      const options = {
        token :this.token,
        id:this.detailObj.id
      }
      addShop(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('加入购物车成功')
          this.getcarNum()
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //点赞评论
    zan(id,is_thumb,index){
      if(!this.token){
        this.loginMaskShow = true
        return
      }
      if(is_thumb==1){
        this.$vux.toast.text('已经点赞过了哦')
        return
      }else{
        const options = {
          token:this.token,
          id:id,
          tea_id :this.id
        }
        commentThumb(options).then(res=>{
          if(res.data.code == 200 && !res.data.error_code){
            this.comment[index].is_thumb=1
            this.comment[index].thumb_count+=1
          }else{
            this.$vux.toast.text(res.data.error_message||res.data.message)
          }
        })
      }
    },
    //收藏视频
    cangV(){
       if(!this.token){
        this.loginMaskShow = true
        return
      }
      const options = {
        token :this.token,
        id:this.id
      }
      vidioCollect(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.is_collect =1
          this.detailObj.tea_collect_count+=1
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //点赞视频
    zanV(){
     if(!this.token){
        this.loginMaskShow = true
        return
      }
      const options = {
        token :this.token,
        id:this.id
      }
      vidioThumb(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.is_thumb =1
          this.detailObj.tea_thumb_count+=1
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    logIndexChange (arg) {
      console.log(arg)
    },
    //去同款茶列表
    goSame(){
      this.$router.push({path:'/teaSame',query:{id:this.detailObj.id,tea_no_same:this.detailObj.tea_no_same}})
    },
    //去相似茶列表
    goLike(){
      this.$router.push({path:'/teaLike',query:{id:this.detailObj.id,tea_id:this.detailObj.tea_type_id}})
    },
    //联系客服
    connectCustom(){
      window.location.href = domain.domain+`/v1/custom?token=${this.token}`
    },
    //视频播放增加次数
    playVideo(){
    //  var  video1 = document.getElementById("video");  
    //    if(video1.paused) { 
    //         video.play()
    //       }else{
    //         video1.pause()
    //       } 
      const options = {
        id : this.id,
        vidio_id:'',
        type:1,
      } 
      vidioPlayCount(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          
          }else{
          // this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
        if (to.name === 'goodDetail') {
                console.log(to.query.id)     // 在此调用函数
                this.init(to.query.id)
        }
      }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  .tab
    position fixed
    top 0
    left 0
    disFlex()
    width 100%
    z-index 9999
    padding 0 20%
    background #F7F7F7;
    border-bottom 1px solid #d4d4d4
    li.active
      color  #FF5100;
      border-bottom 2px solid #FF5100;
    li
      width 25%
      font-family: PingFangSC-Medium;
      fz(12)
      color: #282828;
      letter-spacing: 0.26px; 
      line-height l(40)
      border-bottom 2px solid #fff;
  .banner
    width 100%
    height l(60)
    margin-bottom l(10)
    background #fff
    // padding-bottom l(10)
    div.bt
      width 20%
      fz(12)
      color #333
      text-align center
      line-height l(60)
      float left
    div.t_b
      float left
      width 100%
      height 100%
      overflow-x scroll
      padding-left l(10)
      ul
        height 100%
        padding 1.4% 0
        float left
        display flex
        justify-content flex-start
        li
          width l(60)
          height l(48)
          margin-right l(10)
          position relative
          border-radius 10px
          video     
            width 100%
            height 100%
            object-fit: fill;
          img.goodimg
            display block
            width 100%
            height 100%
          img.play
            display block
            width l(22)
            height l(22)
            position absolute
            top 0
            left 0
            bottom 0
            right 0
            margin auto
  .d  
    background #fff 
    margin-bottom l(10) 
    padding-bottom l(10)  
    span.d_t
      display block
      fz(12)
      color: #999999;
      letter-spacing: 0.23px;   
      line-height l(30)
      text-align left 
      padding-left 4.3%
    .li_top
      width 100%
      height l(190)
      // backgroundIcon('list1.png')
      position relative
      // border-radius 3% 0 3% 0
      #video
        width 100%
        height 100%
      #J_prismPlayer
        width 100%
        height 100%
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
        background #f3f3f3
        display flex
        justify-content space-between
        position absolute
        bottom -30px
        left 0
        font-family: PingFangSC-Regular;
        fz(12)
        color:  #B5B6B7;
        letter-spacing: 0.28px;
        padding 0 4.3%
        z-index 99
        .d_l
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
            img.xin
              width l(14)
              height l(13)
            img 
              display block
              width l(14)
              height l(13)
              margin-right 5px
      .swiper-container 
        width: l(180)
        height: l(30)
        border-radius: 4px;
        background rgba(0,0,0,0.4)
        position absolute
        top l(10)
        left l(30)
        .swiper-wrapper
          height l(30)
          width 100%
          .swiper-slide
            width 100% 
            height l(30)!important          
            color #fff
            display flex
            justify-content flex-start
            align-items center
            padding-left l(5)
            // border-radius: 4px;
            img 
              display block
              width l(22)
              height l(22)
              border-radius 50%
              margin-right l(5)
    .li_mid
        // height l(97)
        position relative
        font-family: PingFangSC-Medium;
        fz(16)
        color: #333333;
        letter-spacing: 0.28px;
        line-height l(22)
        padding 0.9% 0 0 2.4%
        text-align left 
        padding l(35) 4.3% l(20)
        .red
          width l(4)
          height l(16)
          background: #83271F;
          position absolute
          left 0
          top l(35)
        span.t_t
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height l(24)
          padding-top l(10)
          fz(18)
          color: #282828;
          letter-spacing: 0.31px;
        div.t_star
          width 100%
          display flex
          justify-content space-between
          align-items center
          margin-top l(10)
          div
            color: #F5430B;
            fz(14)
            letter-spacing: 0.31px;
            line-height l(30)
            .p1
              fz(18)
            .p2
              color: #3F3F3F;
              fz(14)
          ul
            overflow hidden
            li
              width l(20)
              height l(16)
              float left
              margin-right l(5)
              backgroundIcon ('tea.png')
        .t_re
          display flex
          justify-content flex-start
          align-items center
          margin  l(10) 0 0
          img 
            display block
            width l(13)
            height l(15)
            margin-right l(5)
          span 
            fz(12)
            color: #666666;
            letter-spacing: l(0.31)
            line-height l(18)
        hr
          margin l(20) 0
          border: l(0.5) solid #E8E8E8;
  ul.newData
    overflow hidden
    background #fff
    padding l(10) 4.3% l(10)
    //margin-bottom l(10)
    li
      background: #FFFFFF;
      border: 1px solid #E8E8E8;
      border-radius: l(100)
      font-family: PingFangSC-Regular;
      fz(14)
      color: #666666;
      letter-spacing: 0.2px;
      float left
      padding l(5) l(10)
      margin-right l(13)
      margin-bottom l(10)
  .intro
    padding l(10) 0
    div
      background #fff
      padding l(15) 4.3%
  // 评论列表
  .pre
    background #fff
    width 100%
    padding 0 4.3% 
    margin-bottom l(20)
    div.pr_m
      display flex
      justify-content space-between
      padding-top l(15)
      span
        line-height l(20)
        color: #666666;
        letter-spacing: 0.36px;
        fz(14)
      span.pr_ms
        color: #B5B6B7;
        fz(12)
        display flex
        justify-content space-between
        align-items center
        img
          display block
          width l(6)
          height l(10)
    ul.pr_list
      li.pr_li:last-of-type
        border-bottom 0
      li.pr_li
        border-bottom l(1) solid #E8E8E8
        padding l(20) 0 l(10)
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
          padding 0 10%
        div.a_b
          overflow hidden
          padding 0 10%
          ul.d_img
            margin-top l(5)
            //padding 0 10%
            //width 100%
            display flex
            justify-content flex-start
            flex-wrap wrap
            float left
            li.d_li:nth-of-type(3n)
              margin-right 0
            li.d_li 
              width l(85)
              height l(65)
              margin-right l(9)
              img 
                display block
                width 100%
                height 100%
          .vi
            width l(85)
            height l(65)
            float left 
            video 
              width 100%
              height 100%
        .li_bt
          padding l(10) 0 l(10) 10%
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
              width l(14)
              height l(13)
        div.zhui
            padding 0 l(30)
  // 同一款茶
  .one_t
    padding l(10) 4.3% 0
    background #fff
    .ont_tt
      disFlex()
      line-height l(30)
      fz(14)
      color: #333333;
      letter-spacing: 0.36px;
      img 
        display block
        width l(6)
        height l(10)
    ul
      disFlex ()
      padding l(5) 0
      li
        width l(162)
        div
          width l(162)
          height l(110)
          backgroundIcon ('list1.png')
          position relative
          img 
            display block
            width l(35)
            height l(35)
            position absolute
            top 0
            bottom 0px
            left 0
            right 0
            margin auto
          span
            background colorB(9)
            color: #95514C;
            letter-spacing: 0.23px;
            fz(10)
            position absolute
            top 0
            right 0
            line-height l(14)
        p
          color: #333333;
          letter-spacing: l(0.28)
          line-height l(26)
          text-align left 
          width 100%
          height l(18)
          text-overflow:ellipsis;
          white-space: nowrap;
          overflow: hidden;
  // 底部
  .foot
    width 100%
    disFlex ()
    height l(44)
    position fixed
    bottom 0
    left 0
    background #fff
    padding-left 4.3%
    p
      height 100%
      width l(111)
      background: #FFA442;
      fz(18)
      color: #ffffff;
      letter-spacing: 0.26px;
      line-height l(44)
    p.buy
      background: #FF5100;
      color: #FFFFFF;
    div.f1
      width 20%
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      color #666
      fz(10)
      position relative
      span 
        display block
        width l(13)
        height l(13)
        border-radius 50%
        position absolute
        top -1%
        right 27%
        background #F5430B
        line-height l(15)
        color #ffffff
        fz(10)
      img 
        display block
        width l(24)
        height l(22) 
        margin-bottom l(5)
    div.buy_box
      width l(222)
      height 100%
      display flex
      justify-content space-between
      align-items center
  .blank
    width 100%
    height l(44) 
    margin-top l(20)
vidio
  object-fit: fill;

</style>
