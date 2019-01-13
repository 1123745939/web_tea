<template>
  <div class="con">
    <div class="o_h">
      <div class="o_state">{{order.status_text}}</div>
      <!-- <div class="o_state" v-if="status==2">已发货，等待收货</div>
      <div class="o_state" v-if="status==3">已完成</div> -->
      <!-- 地址 -->
      <div class="add">
         <!-- 退款信息 -->
        <div class="tui" v-if="order.reject_status!=0">
          <div>
            <span>退款金额</span><span class="money">￥{{order.order_total}}</span>
          </div>
          <div>
            <span>退款原因</span><span>{{order.order_reject_reason}}</span>
          </div>
          <div v-if="order.reject_status==3">
            <span>失败原因</span><span>{{order.order_reject_reason}}</span>
          </div>
        </div>
        <!-- 地址 -->
        <div class="a_bor" v-if="order.reject_status==0">
          <div class="a_t">
          <div class="red"></div>
          <span>收货人信息</span>
          <span>{{address.username}}</span>
          <span>{{address.mobile}}</span>
        </div>
        <p>{{address.addr_content}}{{address.addr_detail}}</p>
        </div>
      </div>
      <!-- 留言 -->
      <div class="word"  v-if="order.reject_status==0">
        <div class="red"></div>
        <span>买家留言</span>
        <p>{{order.order_remark}}</p>
      </div>   
    </div>
    <ul class="o_l">
      <li>
        <div class="li_m">
          <div class="t_img" :style="{background:'url('+ tea.tea_img_link + ')'}">
            <img src="../assets/img/play.png" alt="">
          </div>
          <div class="t_info">
            <p>{{tea.tea_title}}</p>
            <span>{{tea.tea_date}} {{tea.tea_period}}</span>
          </div>
          <div class="in_num">
              <p>￥{{order.order_price}}</p>
              <span>X{{order.order_count}}</span>
            </div>
        </div>
      </li>
    </ul>
    <div class="li">
      <div class="o_tot" style="padding-bottom:0">
          <p>商品总价</p>
          <span>￥<span>{{order.order_total}}
            </span></span>
      </div>
      <div class="o_tot" style="padding-top:0">
        <p>运费</p>
        <span>￥<span>0.</span>00</span>
      </div>
      <div class="o_tot price">
        <p>实付款</p>
        <span>￥<span>{{order.order_total}}</span></span>
      </div>
    </div>
    <!-- 订单创建时间 -->
    <div class="o_time">
     <div>
        <div>
          <p>订单编号</p><span>{{order.order_no}}</span>
        </div>
        <div>
          <p>创建时间</p><span>{{order.created_at}}</span>
        </div>
     </div>
    </div>
    <div class="foot">
      <img src="../assets/img/kefu1.png" alt=""  @click="connectCustom">
      <div  v-if="order.order_status==1 && order.reject_status==0">
        <p @click.stop="applyShouhou">申请售后</p>
      </div>
      <div  v-if="order.order_status==1 && order.reject_status==2">
        <p @click="connectCustom">联系客服</p>
        <p @click.stop="cancelTuiShow=true" >取消退款</p>
      </div>
      <div  v-if="order.order_status==2">
        <p @click.stop="applyShouhou">申请售后</p>
        <p>查看物流</p>
        <p @click="confirm">确认收货</p>
      </div>
      <div v-if="order.order_status==3">
        <p @click="evluate"> 评价</p>
        <p  @click="showHideOnBlur=true">不喜欢</p>
        <p @click="buy">继续喝</p>
      </div>
      <!-- <div  v-if="order.reject_status!=0">
        <p @click="connectCustom">联系客服</p>
      </div> -->
    </div>

    <!-- 不喜欢的弹窗 -->
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <span class="title">不喜欢的原因</span>
          <ul class="no_ul">
            <li v-for="(item,index) in dislikeYL" :key="item.id" @click="selY(index)">
              <img src="../assets/img/c_blank.png" alt="" v-show="!item.active">
              <img src="../assets/img/c_active.png" alt="" v-show="item.active">{{item.txt}}
            </li>
          </ul>
          <textarea type="text" placeholder="请输入" v-model="txt"></textarea>
          <span class="submit" @click="submit">提交</span>
        </div>
        <div @click="showHideOnBlur=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
     <!-- 是否取消退款的弹框 -->
      <div v-transfer-dom>
        <confirm v-model="cancelTuiShow"  @on-confirm="refuseCancel()">
          <p style="text-align:center;">确认要取消退款吗</p>
        </confirm>
      </div>
  </div>
</template>

<script>
import { XDialog,TransferDomDirective as TransferDom ,Confirm} from 'vux'
import {orderUnlike , orderDetail ,orderCancel ,orderConfirm , orderRefundCancel} from '../api/api.js'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog, 
    Confirm
  },
  data () {
    return {
      token:sessionStorage.token || '',
      id:'',
      tea_id:'',
      txt:'',
      status: 3,
      tea:{},
      order:{},
      address:{},
      cancelTuiShow:false,
      showHideOnBlur:false,
      dislikeYL:[{id:1,txt:'太苦了',active:false},{id:2,txt:'口味不好',active:false},{id:3,txt:'冲泡次数太少',active:false},{id:4,txt:'其他',active:false}]
    }
  },
  created(){
    document.title = '订单详情'
    this.tea_id = this.$route.query.tea_id
    this.id = this.$route.query.id
    this.init()
  },
  methods:{
    init(){
      const options = {
        id : this.id,
        // tea_id:this.tea_id,
        token : this.token,
      }
      orderDetail(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          console.log(res.data.data)
          this.order = res.data.data.order
          this.address = res.data.data.order.address
          this.tea = res.data.data.tea
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    selY(index){
      this.dislikeYL.forEach((element,i) => {
        if(index==i){
          element.active = !element.active
        }
      });
    },
    //不喜欢 提交
    submit(){
      console.log(this.dislikeYL)
      var arr = []
      this.dislikeYL.forEach(item=>{
        if(item.active == true){
          var obj = {}
          obj.reason = item.txt
          arr.push(JSON.stringify(obj))
        }
      })
      if(!arr.length && !this.txt){
        this.$vux.toast.text('请勾选原因或者写入原因')
        return
      }
      const options = {
        token:this.token,
        tea_id:this.tea_id,
        reason:arr,
        order_id:this.id,
        user_reason:this.txt
      }
      orderUnlike(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('提交成功')
          this.showHideOnBlur = false
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //去评价
    evluate(){
      this.tea.tea_id = this.tea_id
      sessionStorage.orderComment = JSON.stringify(this.tea)
      this.$router.push('/evaluate');

     
    },
    //继续喝 跳转至下单页面
    buy(){
      this.$router.push({path:'/pay',query:{id:this.tea_id,type:'buy'}})   
    },
    //申请售后
    applyShouhou(){
      this.$router.push({path:'/applySale',query:{id:this.order.id}})
    },
    //取消订单
    cancel(){
      const options = {
        token :this.token,
        id:this.id
      }
      orderCancel(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('订单已取消成功')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //确认收货
    confirm(){
       const options = {
        token :this.token,
        id:this.id
      }
      orderConfirm(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('已经确认收货')
          this.selectIndex = 3
          sessionStorage.selectIndex = 3
          setTimeout(()=>{
            this.$router.push('/orders')
          },1000)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //取消退款
    refuseCancel(){
      const options = {
        token :this.token,
        id:this.id
      }
      orderRefundCancel(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('已经申请取消退款')
          this.selectIndex = 0
          sessionStorage.selectIndex = 0
          this.init(1,0)
          this.$forceUpdate()
          //this.scroll.scrollTo(0, 0, 500)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //联系客服
    connectCustom(){
      window.location.href = `http://uat.api.chajisong.com/v1/custom?token=${this.token}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  height l(666)
  overflow-y scroll
  .o_h
    width 100%
    .o_state
      width 100%
      background: #F6AF15;
      box-shadow: 0 0 5px 0 #F3F3F3;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.19px;
      line-height l(35)
  .add
    width 100%   
    padding l(10) 4.3%
    text-align left 
    background #fff
    .a_bor
      border-bottom 1px solid #E8E8E8;
      padding l(10) 0 
      .a_t
        overflow hidden
        .red
          width l(4)
          height l(18)
          float left
          background: #83271F;
          margin-right l(10)
        span
          font-size: 14px;
          color: #333333;
          letter-spacing: 0.16px;
          line-height l(20)
          margin-right l(20)
      p
        padding-left 31%
        font-size: 14px;
        color: #2A2A2A;
        letter-spacing: 0.3px;
        line-height: l(20)
  .word
    background #ffffff
    padding l(10) 4.3%
    overflow hidden
    margin-bottom l(10)
    .red
      width l(4)
      height l(18)
      float left
      background: #83271F;
      margin-right l(10)
    span
      font-size: 14px;
      color: #333333;
      letter-spacing: 0.16px;
      line-height l(20)
      margin-right l(33)  
      float left
    p
      fz(14)
      color: #666666;
      letter-spacing: 0.3px;
      line-height: 20px;
      float left
  .tui
    background #fff
    padding 0 4.3%
    div:last-of-type
      border-bottom 0
      margin-bottom l(10)
    div
      width 100%
      height l(60)
      border-bottom 1px solid #e8e8e8
      display flex
      justify-content flex-start
      align-items center
      span:first-of-type
        width 20%
      span:last-of-type
        width 60%
        margin-left l(10)
        color #7b7a7a
      span.money
        text-align right 
        color #E63443 
      span 
        display block
        text-align left 
        font-size: l(14)
        color: #333333;
      
  ul
    padding 0 4.3%
    margin-top l(10)
    li
      width 100%
      background #fff
      padding l(5) 2.3%
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
            fz(14)
            color: #333333;
            letter-spacing: 0.23px;
            line-height: 20px;
            text-align left 
            display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
            overflow: hidden;
          span 
            fz(12)
            color: #999999;
            letter-spacing: 0.23px;
            line-height l(17)
            text-align left 
        .in_num
          height l(70)
          fz(12)
          color: #333333;
          letter-spacing: 0.17px;
          display flex
          flex-direction column
          justify-content flex-start
          line-height l(20)
          span 
            color #999
            text-align right 
            margin-top l(5)
  .li
    padding 0 4.3%

    .o_tot
      padding l(5) 2.3% 
      disFlex()
      background #fff
      p
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.3px;
        line-height l(20)
      span 
        font-size: 12px;
        color: #333333;
        letter-spacing: 0.17px;
        line-height l(14)
        span 
          font-size: 14px;
          color: #151515;
          letter-spacing: 0.17px;
          line-height: 14px;
    .o_tot.price
      border-bottom 1px solid  #E8E8E8
      border-top 1px solid  #E8E8E8
      padding l(10) 2.3%
      line-height l(40)
      p
        font-size: 14px;
        color: #333333;
        font-weight 700
      span 
        color #E63443 
        span 
          color #E63443 
  .o_time 
    padding 0 4.3% 
    div
      padding l(10) 0
      background #fff
      div
        disFlex()
        background #fff
        padding l(5) 2%
        p
          font-size: 14px;
          color: #666666;
          letter-spacing: 0.3px;    
        span
          font-size: 12px;
          color: #666666;
          letter-spacing: 0.3px;    
  .foot   
    width 100%
    background #fff
    height l(44)
    position fixed
    bottom 0
    left 0
    display flex
    align-items center
    justify-content space-between
    padding 0 4.3%
    box-shadow: 0 0 5px 0 #F3F3F3;
    img 
      display block
      width l(23)
      height l(23) 
    div
      width 79.6%
      display flex
      justify-content flex-end
      align-items center
      p:last-of-type
        border 1px solid #83271F
        color #83271F
        margin-left l(15)
      p
        width l(90)
        height l(30)
        border-radius l(100)
        line-height l(30)
        margin-left l(10)
        border 1px solid #D4D4D4
        color: #666666;
        fz(14)

    // 遮罩样式
.weui-dialog
  width l(250)
  .img-box
    width 100%
    height l(262)
    border-radius: 6px;
    padding l(20)
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    span.title
      font-size: 14px;
      color: #333333;
      letter-spacing: 0.3px;
      line-height l(20)
    ul.no_ul 
      display flex
      justify-content flex-start
      flex-wrap wrap
      li:nth-of-type(1),li:nth-of-type(3)
        width l(160)
      li:nth-of-type(2),li:nth-of-type(4)
        width l(100)
      li:nth-of-type(3),li:nth-of-type(4)
        margin-bottom 0
      li
        margin-bottom l(25)
        display flex
        justify-content flex-start
        align-items center
        img 
          display block
          width l(18)
          height l(18)
          margin-right l(5)
    textarea::placeholder
      fz(13)
      color #999
    textarea 
      display block
      width 100%
      height l(60)
      background #f7f7f7
      padding l(5) l(10)
      resize no 
      outline none 
      border none
    span.submit
      background: #83271F;
      border-radius: 100px;
      padding 0 l(30)
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.3px;
      line-height l(30)
</style>
