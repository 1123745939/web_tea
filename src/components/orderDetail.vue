<template>
  <div class="con">
    <div class="o_h">
      <div class="o_state" v-if="status==1">等待付款</div>
      <div class="o_state" v-if="status==2">已发货，等待收货</div>
      <div class="o_state" v-if="status==3">已完成</div>
      <!-- 地址 -->
      <div class="add">
        <div class="a_bor">
          <div class="a_t">
          <div class="red"></div>
          <span>收货人信息</span>
          <span>刘湘燕</span>
          <span>15966622119</span>
        </div>
        <p>山东省济南市玉兰广场5号楼23层</p>
        </div>
      </div>
      <!-- 留言 -->
      <div class="word">
        <div class="red"></div>
        <span>买家留言</span>
        <p>请尽快发货</p>
      </div>
    </div>
    <ul class="o_l">
      <li>
        <div class="li_m">
          <div class="t_img">
            <img src="../assets/img/play.png" alt="">
          </div>
          <div class="t_info">
            <p>个人基因检测标准版个人基因检测标准版</p>
            <span>2018/09/18 绿茶28期</span>
          </div>
          <div class="in_num">
              <p>￥1800.00</p>
              <span>X1</span>
            </div>
        </div>
      </li>
    </ul>
    <div class="li">
      <div class="o_tot" style="padding-bottom:0">
          <p>商品总价</p>
          <span>￥<span>1800.</span>00</span>
      </div>
      <div class="o_tot" style="padding-top:0">
        <p>运费</p>
        <span>￥<span>0.</span>00</span>
      </div>
      <div class="o_tot price">
        <p>实付款</p>
        <span>￥<span>1800.</span>00</span>
      </div>
    </div>
    <!-- 订单创建时间 -->
    <div class="o_time">
     <div>
        <div>
          <p>订单编号</p><span>5187985621232511</span>
        </div>
        <div>
          <p>创建时间</p><span>2018-10-15 14:58</span>
        </div>
     </div>
    </div>
    <div class="foot">
      <img src="../assets/img/kefu1.png" alt="">
      <div  v-if="status==1">
        <p>取消订单</p>
        <p>立即支付</p>
      </div>
      <div  v-if="status==2">
        <p>申请售后</p>
        <p>查看物流</p>
        <p>确认收货</p>
      </div>
      <div  v-if="status==3">
        <p>再次评价</p>
        <p  @click="showHideOnBlur=true">不喜欢</p>
        <p>继续喝</p>
      </div>
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
  </div>
</template>

<script>
import { XDialog,TransferDomDirective as TransferDom } from 'vux'
import {orderUnlike} from '../api/api.js'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog, 
  },
  data () {
    return {
      token:sessionStorage.token || '',
      id:'',
      tea_id:'',
      txt:'',
      status: 3,
      showHideOnBlur:false,
      dislikeYL:[{id:1,txt:'太苦了',active:false},{id:2,txt:'口味不好',active:false},{id:3,txt:'冲泡次数太少',active:false},{id:4,txt:'其他',active:false}]
    }
  },
  created(){
    document.title = '订单详情'
    this.tea_id = this.$route.query.tea_id
    this.id = this.$route.query.id
  },
  methods:{
    selY(index){
      this.dislikeYL.forEach((element,i) => {
        if(index==i){
          element.active = !element.active
        }
      });
    },
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
  ul
    padding 0 4.3%
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
