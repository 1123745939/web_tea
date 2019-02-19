<template>
  <div class="content">
    <ul class="navBox"> 
      <li @click="selectaddress(0)" :class="[nav==0?'active':'']">提反馈</li>
      <li @click="selectaddress(1)" :class="[nav==1?'active':'']">我的反馈</li>
    </ul>
    <div class="feedbox" v-if="nav==0">
      <textarea name="" class="feeds" v-model="feed" placeholder="对我们的产品有什么建议？或者觉得我们的网站有什么需要改进的？请一定全部告诉我们~~" resize='none'></textarea>
      <span class="num">{{wordNum}}/200</span>
      <p class="title">联系方式</p>
      <input type="text" class="phone" placeholder="电话或者邮箱，请选择留下~~" v-model="phone">
      <p class="custom">客服电话: 400-103-3887</p>
      <div class="btn" @click="putFeed">提交</div>
    </div>
    <div class="feedlist" v-else-if="nav==1">
      <div class="items" v-for="(item) in feedList" :key="item.id">
        <div class="itemsDesc">
          <div class="left">
            <img :src="users.img_link" alt="">
          </div>
          <div class="right">
            <p class="names">
              <span class="name">{{users.username}}</span>
              <span class="time">{{item.created_at}}</span>
            </p>
            <p class="desc">{{item.content}}</p>
          </div>
        </div>
        <div class="itemsBtn">
          <p @click="del(item.id)"><img src="../assets/img/symbols-shanchu.png" alt="">删除</p>
          <p @click="huifu(item.id)"><img src="../assets/img/symbols-chakantiezihuifu.png" alt="">客服回复</p>
          
        </div>
      </div>
    </div>
    <!-- 客服回复 -->
    <div class="toastBg" v-if='toastRange'  @click="closeToast">
      <div class="toastBox">
        <div class="toastTitle">
          <div class="titleText">提示</div>
        </div>
        <div class="toastContent">
          <div class="contText">
            <p>{{contentText1}}</p>
            <p>{{contentText2}}</p>
          </div>
        </div>
        <div class="toastBtns">
          <button class="tobtn toconfirm" @click.stop="closeToast">确定</button>
        </div>
      </div>
    </div>
    <footers :index = 4></footers>
  </div>
</template>
<script>
import footers from './footers'
import { feedbackCreated , feedbackList , delFeed , replies} from '../api/api.js'
import  md5 from 'js-md5'
export default {
  name:'feedback',
  data(){
    return{
      nav:0,
      phone:'',
      feed:'',
      token:localStorage.getItem('token')||'',
      feedList:[],
      users:{},
      toastRange:false,
      contentText1:'',
      contentText2:'',
      wordNum:0,
    }
  },
  created(){
    document.title="反馈建议"
  },
  components:{
    footers
  },
  methods:{
    
    // 关闭弹框
    closeToast(){
      this.toastRange = false;
    },
    selectaddress(data){
      this.nav=data;
      if(data==1){
        feedbackList({
          token:this.token,
          page:'1',
          rows:'50',
        }).then(res=>{
          if(res.data.code==200&&!res.data.error_code){
            console.log(res.data.data)
            this.feedList=res.data.data.results.feedbacks
            this.users=res.data.data.results.user
          }else{
            this.$vux.toast.text(res.data.error_message||res.data.message)
          }
        })
      }
    },
    del(id){
      delFeed({token:this.token,id:id}).then(res=>{
        if(res.data.code==200&&!res.data.error_code){
          this.$vux.toast.text('删除成功！')
          this.selectaddress(1)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    huifu(id){
      replies({token:this.token,id:id}).then(res=>{
        if(res.data.code==200&&!res.data.error_code){
          if(res.data.data.results.length){
            let content=res.data.data.results[0].content;
            let time=res.data.data.results[0].created_at;
            this.toastRange = true;
            this.contentText1='内容：'+content
            this.contentText2='时间：'+time;
          }else{
            this.$vux.toast.text('暂无回复，请耐心等待')
          }
         
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
     
    },
    putFeed(){
      if(this.feed.length==0&&this.feed.length>200){
        this.$vux.toast.text('建议在200字以内')
        return;
      } else if(this.phone.length==0){
        this.$vux.toast.text('电话或邮箱不能为空')
        return;
      }else{
        console.log(this.phone,this.feed)
        feedbackCreated({
          token:this.token,
          content:this.feed,
          contact:this.phone
        }).then(res=>{
          if(res.data.code==200 && !res.data.error_code){
            this.feed='';
            this.phone='';
            this.wordNum = 0
            this.selectaddress(1)
            this.$vux.toast.text('感谢您提出的反馈，我们会及时处理，谢谢！');
          }else{
            this.$vux.toast.text(res.data.error_message||res.data.message)
          }
        })
      }
    }
  },
  watch :{
    feed(oldv,newv){
      if(oldv != newv){
        this.wordNum = this.feed.length
      }
    }
  }

}
</script>
<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.content
  height 100vh
  .navBox
    overflow hidden
    background: #FFFFFF;
    box-shadow: 0 0 l(5) 0 #E8E8E8;
    li
      width 50%
      float left
      text-align center
      fz(14)
      color: #666;
      letter-spacing: 0.3px;
      line-height l(50)
    .active
      color: #FF5100;
      position relative
    .active:after
        position absolute
        content ''
        width l(26)
        height l(4)
        background #FF5100
        bottom 0
        left l(81)
  .feedbox
    background: #FFFFFF;
    box-shadow: 0 0 l(5) 0 #E8E8E8; 
    margin-top l(10) 
    padding-top l(22)
    height 80vh
    padding-bottom l(40)
    .feeds
      display block
      margin l(0) l(16) 0
      border: 1px solid #E8E8E8;
      border-radius l(4)
      width l(343)
      line-height l(20)
      min-height l(180)
      padding l(10)
      fz(13)
    .feeds::-webkit-input-placeholder
      fz(13)
    .num
      position absolute
      top l(240)
      right l(23)
      color #ccc
    .title 
      fz(14)
      color: #333333;
      letter-spacing: 0.16px; 
      line-height l(20)
      font-weight 600
      margin l(15) 0 l(15) l(16)
      text-align left 
    .phone
      border: l(1) solid #E8E8E8;  
      border-radius: l(4)
      margin 0 l(16)
      display block
      width l(323)
      line-height l(24)
      padding l(10)
      fz(13)
    .phone::-webkit-input-placeholder
      fz(13)
  .custom
    fz(12)
    color: #333333;
    letter-spacing: 0.16px; 
    line-height l(17)
    margin-top l(120)
  .btn
    width l(160)
    background: #FF5100;
    border-radius: 100px;
    line-height l(44)
    fz(18)
    color: #FFFFFF;
    letter-spacing: 1.12px;
    margin l(20) l(110)
  .feedlist
    .items
      background: #FFFFFF;
      box-shadow: 0 0 l(5) 0 #E8E8E8;
      border-radius: l(6)
      margin l(10) l(16) 0
    
    .itemsDesc
      padding l(22) 0 l(7)
      margin 0 l(10)
      border-bottom: l(1) solid #E8E8E8;
      overflow hidden
      .left
        float left
        img 
          display block
          width l(40)
          height l(40)
          border-radius 100%
          background #000
      .right
        float right
        width l(273)
        .names
          overflow hidden
          width 100%
          .name
            float left
            fz(14)
            color: #333333;
            letter-spacing: 0.3px;
            line-height l(20)
            margin-top l(10)
            font-weight 600
          .time
            fz(12)
            color: #B5B6B7;
            letter-spacing: 0.3px;
            line-height l(20)
            float right
            margin-top l(10)
        .desc
          text-align left 
          fz(14)
          color: #2A2A2A;
          letter-spacing: 0.3px;
          line-height l(22)
          margin-top l(10)
    .itemsBtn
      overflow hidden 
      margin 0 l(10)
      p 
        float right 
        fz(14)
        line-height l(14)
        color: #666666;
        letter-spacing: 0.3px;
        position relative
        text-indent l(25)
        margin-left l(20)
        padding l(22) 0 l(22)
        img
          position absolute
          display block
          width l(14)
          height l(14)
.toastBg{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.5);
  }
  .toastBox{
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 85%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
  }
  .toastTitle{
    padding: 15px 0 0
  }
  .titleText{
    text-align: center;
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
  .toastContent{
    padding: 10px 20px 15px;
    border-bottom: 1px solid #ddd;
    min-height: 36px;
    position: relative;
  }
  .contText{
    color: #999;
    margin: 0;
    text-align: left;
    line-height: 36px;
  }
  .toastBtns{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 40px;
    line-height: 40px;
  }
  .tobtn{
    line-height: 35px;
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;
    border: 0;
  }
  .tocancel{
    width: 50%;
    border-right: 1px solid #ddd;
  }
  .toconfirm{
    color: #26a2ff;
    width: 50%;
  }        
</style>
