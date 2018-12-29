<template>
  <div class="con">
    <!-- 头部 -->
     <div class="content">
      <div class="car" @click="connectCustom"></div>
      <div class="tab">
        <div class="tab_top">
          <img :src="infoObj.img_link" alt="" @click="$router.push('/personalInfo')">
          <p>{{infoObj.username}}</p>
        </div>
        <ul class="leb">
          <li @click="$router.push('/collection')"><p>{{count.collect_count}}</p>收藏</li>
          <li @click="$router.push('/thumbs')"><p>{{count.thumb_count}}</p>点赞</li>
          <li @click="$router.push('/slots')"><p>{{count.slot_count}}</p>足迹</li>
        </ul>
      </div>
    </div>
    <!-- 通知 -->
    <div class="order" v-if="notifies.length">
      <div class="o_h"  @click="$router.push('/infos')">
        <div class="oh_l">
          <img src="../assets/img/logo.png" alt="">通知
        </div>
        <img src="../assets/img/more2.png" alt="">
      </div>
      <ul class="tips">
        <li v-for="item in notifies" :key="item.notify_target_id">
          <span></span>{{item.notify_content}}
        </li>
      </ul>
    </div>
    <!-- 订单 -->
    <div class="order" v-if="orders.length">
      <div class="o_h"  @click="$router.push('/orders')">
        <div class="oh_l">
          <img src="../assets/img/order.png" alt="">订单
        </div>
        <img src="../assets/img/more2.png" alt="">
      </div>
      <ul class="o_l">
        <li v-for="item in orders" :key="item.id"  @click="$router.push({path:'/orderDetail',query:{id:item.id}})">
          <div class="li_h">
            <p class="time">{{item.created_at}}</p>
            <p>{{item.status_text}}</p>
          </div>
          <div class="li_m" >
            <div class="t_img">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>{{item.tea_title}}</p>
              <span>{{item.tea_date}} {{item.tea_period}}</span>
              <div class="in_num">
                <p>￥<span>{{item.tea_price}}</span>.00</p>
                <span>X{{item.order_count}}</span>
              </div>
            </div>
            <div class="red">去评价</div>
          </div>
            
        </li>
      </ul>
    </div>
    <!-- 爱好 -->
    <div class="order hobby">
      <div class="o_h"  @click="$router.push('/hobby')">
        <div class="oh_l">
          <img src="../assets/img/hobby.png" alt="">爱好
        </div>
        <img src="../assets/img/more2.png" alt="" >
      </div>
       <ul class="o_l">
        <li class="li_f">
          <div class="li_m"  @click="$router.push('/orderDetail')">
            <div class="t_img">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>安溪铁观音</p>
              <span class="t_f">3个共同茶朋友</span>
            </div>
            <div class="red">我要买</div>
          </div>            
        </li>
        <li class="li_f">
          <div class="li_m"  @click="$router.push('/orderDetail')">
            <div class="t_img">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>安溪铁观音</p>
              <span class="t_f">3个共同茶朋友</span>
            </div>
            <div class="red">我要买</div>
          </div>
            
        </li>
      </ul>
      <!-- <img src="../assets/img/hobbym.png" alt="" class="hobbym"> -->
    </div>
    <!-- 热评 -->
    <div class="order hot" v-if="comments.length">
      <div class="o_h"  @click="$router.push('/evaluate')">
        <div class="oh_l">
          <img src="../assets/img/hot.png" alt="">热评
        </div>
        <img src="../assets/img/edit.png" alt="">
      </div>
      <ul class="h_d">
        <li @click="$router.push({path:'/hotDiscuss',query:{id:item.id}})" v-for="item in comments" :key="item.id">
          <div class="li_top">
            <div></div>
            <span>{{item.created_at}}</span>
          </div>
          <p>{{item.content}}.</p>
          <span class="li_u">有用{{item.thumb_count}}&nbsp;&nbsp;&nbsp;评价{{item.comment_count}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RCS from '../custom/sobot/cs.js'
import { myData , custom } from '../api/api.js'
export default {
  data () {
    return {
      token:sessionStorage.token,
      infoObj:{},
      comments:[],
      count:{},
      notifies:[],
      orders:[]
    }
  },
  created(){
    document.title = '茶急送'
    this.init()
  },
  methods:{
    init(){
      //个人信息
      myData({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.infoObj = res.data.data.info
          this.comments = res.data.data.comments
          this.count = res.data.data.count
          this.notifies = res.data.data.notifies
          this.orders = res.data.data.orders

          console.log(res,'res')  
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //链接客服
    connectCustom(){
      custom({token:'aKbhzqzFPoUIQRL4oiZa956TTHXNZWtM'}).then(res=>{
        console.log(res)
        RCS.init({
        appKey: "e0x9wycfe4eoq",
        token: res.data.data,
        target: document.getElementsByClassName('con'),
        customerServiceId: "KEFU154276502494257", // 客服Id
        userIcon: 'http://xianwei-image.oss-cn-beijing.aliyuncs.com/psb.jpeg',//用户默认头像，在用户没有头像的时候显示
        csIcon: 'http://fsprodrcx.cn.ronghub.com/UQRxDVEHcD6_gHENUQRxDUs9XOZRBH25PGECfjBjFA/base64.png',//客服默认头像，在客服没有头像的时候显示,建议线上地址
        showButton: false,
        //是否需要按钮主动发起，设为false的时候，init()方法直接唤起聊天窗口,需客户自己编写按钮，点击之后调用init(),templates中的button模板不可用;设为true的时候，init()首先唤起客服咨询按钮，点击之后才连接客服，唤起聊天窗口，在进入页面之后就需调用init()方法。此参数是为了方便客户在点击客服按钮后自行获取token，在获取到token之后，执行init()即可。
        connectingCallback: function(){
            console.log('连接中');
        },//连接中的执行的方法，例如显示加载页面,可不传
        connectedCallback: function(){},//连接成功之后的方法，例如关闭加载页面,可不传
        disconnectedCallback: function(){
            alert('连接断开');
        },//断开连接之后的操作,可不传
        templates: {
            button: [
                '<div class="rongcloud-consult">',
                '   <button onclick="RCS.showCommon()"><span>客服咨询</span></button>',
                '</div>',
                '<div class="customer-service" style="display: none;"></div>'].join(''),//"templates/button.html",
            // chat: "{{route('chat')}}",
            // closebefore: 'templates/closebefore.html',
            // conversation: 'templates/conversation.html',
            // endconversation: 'templates/endconversation.html',
            // evaluate: 'templates/evaluate.html',
             imageView: 'templates/imageview.html',
            // leaveword: 'templates/leaveword.html',
            // main: 'templates/main.html',
            // message: 'templates/message.html',
            // messageTemplate: 'templates/messageTemplate.html',
            // userInfo: 'templates/userInfo.html',
        }
    });
      })
    }
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
  .content
    width l(375)
    height l(230)
    backgroundIcon ('mybg.png')
    position relative
    margin-bottom l(80)
    .car
      width l(21)
      height l(21)
      position absolute
      right 5.6%
      top 4.8%
      backgroundIcon ('kefu1.png')
      z-index 3
    .tab
      width l(343)
      height l(187)
      position absolute
      top 50%
      left 4.3%
      background: #FFFFFF;
      box-shadow: 0 0 2px 0 #F2F2F2;
      border-radius: 18px;
      backgroundIcon ('bg.png')
      .tab_top
        width 100%
        position absolute
        top -20%
        display flex
        flex-direction column
        justify-content center
        align-items center
        img 
          display block
          width l(94)
          height l(94)
          border-radius 50%
        p  
          font-size: 18px;
          color: #333333;
          letter-spacing: 1.12px;
          line-height l(40)
      ul  
        position absolute
        bottom 14%
        left 0
        width 100%  
        disFlex()
        li
          width 33%
          font-size: 14px;
          color: #666666;
          letter-spacing: 0.32px;
          line-height l(20)
          p
            font-size: 16px;
            color: #333333;
            letter-spacing: 0.37px;
            line-height l(22)
            font-weight bold
// 订单
  .order.hobby
    padding-bottom l(15)
  .order
    width 100%
    background #ffffff
    padding 0 4.3%
    margin-bottom l(10)
    .o_h
      width 100%
      disFlex ()
      padding l(15) 0 l(10)
      border-bottom 1px solid #E8E8E8
      img 
        display block
        width l(17)
        height l(17)
      .oh_l
        disFlex ()
        font-size: 16px;
        color: #000000;
        letter-spacing: 0.37px;
        font-weight bold
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
              color: #E63443;
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
            border 1px solid #83271F
            color #83271F
            border-radius l(100)
//热评的ul
  .order.hot
    padding l(15) 4.3% 0
    margin-bottom 0
    .o_h
      
    .h_d  
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
</style>
