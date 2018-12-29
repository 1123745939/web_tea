<template>
  <div class="con">
    <div class="content">
      <div class="c_h">
        <div class="photo">
          <img :src="user.img_link" alt="">
          {{user.username}}
        </div>
        <span class="time">{{comment.created_at}}</span>
      </div>
      <p class="te">{{comment.content}}</p>
      <!-- 评论的图片 -->
      <ul class="d_ul" v-show="commentObj.images">
        <li v-for="(item,index) in commentObj.images" :key="index">
          <img :src="item.image_link" alt="" class="d_img">
        </li>
      </ul>
      <!-- 评论的视频 -->
      <div class="vi" v-if="commentObj.vidio" v-for="item in commentObj.vidio">
        <video :src="item.vidio_link" controls ></video>
      </div>
      <!-- 商品 -->
     <div class="d">
      <div class="li_top" :style="{background:'url(' + tea.tea_img_link +')'}">
        <div class="play"><span></span></div>
        <div class="data">
          <div class="d_l">
           {{tea.tea_play_count}}次播放
          </div>
          <ul class="p_r">
            <li><img src="../assets/img/star.png" alt="">{{tea.tea_collect_count}}</li>
            <li><img src="../assets/img/zan.png" alt="">{{tea.tea_thumb_count}}</li>
          </ul>
        </div>
      </div>
      <div class="li_mid">
        <div class="red"></div>
        <span class="t_t">{{tea.tea_title}}</span>
      </div>    
    </div>
    <!-- 有用 & 我也要买 -->
      <ul class="use">
        <li @click="comThumb"  v-if="comment.is_thumb ==1">
          <img src="../assets/img/zan1_active.png" alt="">有用
        </li>
        <li @click="comThumb" v-else>
          <img src="../assets/img/zan1_active.png" alt="">有用
        </li>
        <li @click="addCar()">
          <img src="../assets/img/car.png" alt="">我也要买
        </li>
      </ul>
      <!-- 点赞的人 -->
      <ul class="have_zan" v-show="commentObj.thumbs">
        <li v-for="(item,index) in commentObj.thumbs" :key="index">
          <img :src="item.img_link" alt="">
        </li>
      </ul>
      <!-- 收藏 & 分享 -->
      <div class="sha">
        <div>
          <img src="../assets/img/starb.png" alt="">收藏
          <img src="../assets/img/share.png" alt="">分享
        </div>
      </div>
      <!-- 点赞内容 -->
      <div class="liuyan">
        <span>留言：{{len>99 ? '99+' : len}}</span>
        <img src="../assets/img/edit.png" alt="" @click="show5 = true">
      </div>
      <ul class="liu_list">
        <li v-for="(item,index) in commentObj.replies" :key="item.id">
          <div class="top" @click="show5 = true;replyId = item.id">
            <img :src="item.user.img_link" alt="">{{item.user.username}}
          </div>
          <p  @click="show5 = true;replyId = item.id">{{item.content}}=={{item.id}}</p>
          <div class="bot">
            <span>{{item.created_at}}</span>
            <div>
              <img src="../assets/img/zan1.png" alt="" @click="zan(item.id)" v-if="item.is_thumb==0">
              <img src="../assets/img/zan1_active.png" alt="" @click="zan(item.id)" v-else>
              {{item.thumb_count}}             
              <img src="../assets/img/talk1.png" alt="" @click="getZhuiList(item.id,index)">
              {{item.reply_count}}
            </div>
          </div>
          <!-- 追评的人 -->
          <ul class="zhui" v-show="item.zhuiList">
            <li v-for="i in item.zhuiList" :key="i.user_id">
              <div>
                {{i.user.username}}<img :src="i.user.img_link" alt="">
              </div>
              <p class="zhuiP">{{i.content}}</p>
              <span>{{i.created_at}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 点击写评论出来的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="show5" show-input ref="confirm5" title="请输入内容" @on-confirm="onConfirm5"></confirm>
    </div>
  </div>
</template>

<script>
import { Confirm, TransferDomDirective as TransferDom } from 'vux'
import {commentDetail ,commentThumb ,commentReply ,commentReplyThumb,commentReplyReply ,commentReplyList ,addShop} from '../api/api.js'
export default {
   directives: {
    TransferDom
  },
   components: {
    Confirm,
  },
  data () {
    return {
      token:sessionStorage.token || '',
      commentObj:'',
      comment :{},
      tea:{},
      user:{},
      len :'',//评论的个数
      show5 :false,
      content:'',
      replyId:''
    }
  },
  created(){
    document.title = '热评详情'
    
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      var id = this.$route.query.id
      const options = {
        token :this.token,
        id:id
      }
      commentDetail(options).then(res=>{
         if(res.data.code == 200 && !res.data.error_code){
          this.commentObj = res.data.data
          this.comment = res.data.data.comment
          this.user = res.data.data.comment.user
          this.tea = res.data.data.tea
          this.len = res.data.data.replies.length
          console.log(res,'res')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //热评点赞
    comThumb(){
      const options = {
        token :this.token,
        id:this.comment.id,
        tea_id:this.comment.tea_id
      }
      commentThumb(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('点赞成功')
          this.init()
        }else{  
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    onConfirm5 (value) {
      this.$refs.confirm5.setInputValue('')
      this.content = value
      if(this.replyId){
        this.reply()
      }else{
        this.comReply()
      }
     
    },
    //热评回复
    comReply(){
      if(!this.content){
        this.$vux.toast.text('请输入内容')
        return
      }
      const options = {
        token :this.token,
        id:this.comment.id,
        content:this.content
      }
      commentReply(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('评论成功')
          this.init()
          this.content = ''
        }else{  
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //回复点赞
    zan(id){
      const options = {
        token :this.token,
        id:id,
        tea_id:this.comment.tea_id
      }
      commentReplyThumb(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('点赞成功')
          this.init()
        }else{  
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //回复回复
    reply(){
      if(!this.content){
        this.$vux.toast.text('请输入内容')
        return
      }
       const options = {
        token :this.token,
        id:this.replyId,
        content:this.content
      }
      commentReplyReply(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('留言回复成功')
          this.init()
          this.replyId = ''
        }else{  
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //获取追加留言的列表
    getZhuiList(id,index){
       const options = {
        token :this.token,
        id:id
      }
      commentReplyList(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          console.log(res)
          this.commentObj.replies[index].zhuiList = res.data.data
          this.$forceUpdate()
        }else{  
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //加入购物车
    addCar(){
      const options = {
        token :this.token,
        id:this.tea.id
      }
      addShop(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('加入购物车成功')
        }else{  
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  border-top 1px solid  #E8E8E8
  padding-top l(10)
  padding-bottom l(20)
  .content
    box-shadow: 0 0 5px 0 #E8E8E8;
    .c_h
      disFlex()
      background #fff
      padding l(20) 4.3% l(0)
      .photo
        display flex
        justify-content flex-start
        align-items center
        line-height l(20)
        fz(14)
        color: #333333;
        letter-spacing: 0.3px;
        img 
          display block
          width l(47)
          height l(47)
          margin-right l(5)
      span 
        fz(12)
        color: #999999;
        letter-spacing: 0.26px;
        line-height l(17)
    p.te
      width 100%
      padding l(15) 4.3%
      background #fff
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0.3px;
      line-height: 20px;
      text-align left 
    ul.d_ul
      background #fff
      padding 0 10%
      li:last-of-type
        margin-bottom 0
      li
        height l(180)
        margin-bottom l(10)
        img.d_img
          display block
          width 100%
          height l(180)
    .vi
      width 100%
      padding 0 10%
      video 
        height 100%
        object-fit fill 
    .d  
      background #fff 
      padding l(10) 0 l(20)
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
        backgroundIcon('list1.png')
        position relative
        border-radius 3% 0 3% 0
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
          padding 0 4.3%
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
              img 
                display block
                width l(15)
                height l(15)
                margin-right 5px
      .li_mid
          // height l(97)
          position relative
          font-family: PingFangSC-Medium;
          fz(16)
          color: #333333;
          letter-spacing: 0.28px;
          line-height l(22)
          text-align left 
          padding l(10) 4.3%
          background: #F7F7F7;
          .red
            width l(4)
            height l(16)
            background: #83271F;
            position absolute
            left 0
            top l(10)
          span.t_t
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          
          .t_re
            span 
              fz(12)
              color: #666666;
              letter-spacing: l(0.31)
              line-height l(18)
    ul.use
      disFlex ()
      padding l(20) 20.5% l(10)
      background #fff
      li
        width l(95)
        height l(30)
        border: 1px solid #E0C8C6;
        border-radius: 100px;
        fz(14)
        color: #83271F;
        letter-spacing: 0.23px;
        display flex
        justify-content center
        align-items center
        img 
          display block
          width l(15)
          height l(15)
          margin-right l(10)
    ul.have_zan
      padding l(20) 4.3%
      display flex
      justify-content flex-start
      align-items center
      background #fff
      li:last-of-type
        margin-right 0
      li
        margin-right l(10)
        img 
          display block
          width l(35)
          height l(35)
          border-radius 50%
    .sha  
      background: #FFFFFF;
      box-shadow: 0 0 5px 0 #F3F3F3;
      padding 0 4.3%
      div
        padding l(10) 0 l(15)
        border-top 1px solid #E8E8E8 
        fz(12)
        color: #666666;
        letter-spacing: 0.26px;  
        display flex
        justify-content flex-end
        align-items center
        img 
          display block
          width l(22)
          height l(22)
          margin 0 l(5) 0 l(15)
    .liuyan
      padding l(20) 4.3% 0
      disFlex ()
      fz(14)
      color: #666666;
      letter-spacing: 0.36px;  
      line-height l(20) 
      background #fff 
      img 
        display block
        width l(17)
        height l(17)  
    ul.liu_list
      background #fff
      padding 0 4.3%
      li
        padding l(5) 0 l(15)
        .top
          fz(14)
          color: #000;
          letter-spacing: 0.3px;
          line-height l(20)
          display flex
          justify-content flex-start
          align-items center
          img 
            display block
            width l(31)
            height l(31)
            margin-right l(5)
        p
          fz(14)
          color: #333333;
          letter-spacing: 0.3px;
          line-height: l(20);
          padding  l(5) 0 l(5) l(35)
          text-align left 
        .bot
          padding-left l(35)
          disFlex ()
          font-size: 12px;
          color: #999999;
          letter-spacing: 0.26px;
          line-height l(17)
          padding-top l(5)
          div 
            display flex
            justify-content flex-end
            align-items center
            img 
              display block
              width l(15)
              height l(15)
              margin 0 l(5) 0 l(15)
          span 
            font-size: 12px;
            color: #999999;
            letter-spacing: 0.26px;
            line-height l(17)
        ul.zhui  
            background: #F7F7F7;
            border-radius: 6px;  
            padding 0 2.7%
            margin-top l(5)
          li:last-of-type
            border-bottom none
          li
            text-align right 
            border-bottom 2px solid #E8E8E8
            div
              display flex
              justify-content flex-end
              align-items center
              padding l(5) 0
              color #666
              letter-spacing: 0.28px;
              img 
                display block
                width l(31)
                height l(31)
                margin-left l(5)
            p
              font-size: 14px;
              color: #666666;
              letter-spacing: 0.3px;
              line-height: l(20)
              padding l(5) 0
              text-align right 
            span 
              fz(12)
              color: #999999;
              letter-spacing: 0.26px;
              line-height l(17)             
          
</style>
