<template>
  <div class="con">
    <!-- 有地址 -->
    <div class="add" v-if="address.id != ''">
      <span class="add_l">收货地址</span>
      <div class="add_r"  @click="$router.push({path:'/address'})">
        <span>{{address.username}}&nbsp;{{address.mobile}}</span>
        <p>{{address.addr_content || address.addr_province+address.addr_city+address.addr_distinct}}{{address.addr_detail}}</p>
      </div>
      <img src="../assets/img/more1.png" alt="" class="add_m" @click="$router.push({path:'/address'})">
    </div>
    <div class="addNo" @click="$router.push('/address')" v-else>
      无收货地址，去添加<img src="../assets/img/more1.png" alt="">
    </div>
    <ul class="list">
      <li v-for="item in arr" :key="item.id">
        <img :src="item.tea_img_link" alt="" class="car_img">
        <div class="car_p">
          <span class="titlt">{{item.tea_title}}</span>
          <p class="t_d">{{item.tea_date}} {{item.tea_period}}</p>
          <div class="t_num">
            <p>￥<span>{{item.tea_price}}</span></p>
            <div>
              <p></p>X{{item.tea_count ? item.tea_count : 1}}<p></p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="yun">
      运费
      <span>顺丰包邮</span>
    </div>
    <!-- 留言 -->
    <div class="word">
      <div>
        <span>买家留言</span>
        <input type="text" placeholder="请输入" v-model="txt">
      </div>
    </div>
    <!-- 微信支付 -->
    <div class="wx">
      <div class="wx1">
          <div class="wx2">
            <span>付款方式</span>
            <img src="../assets/img/wx.png" alt="">
            微信支付
          </div>
          <img src="../assets/img/c_active.png" alt="">
      </div> 
    </div>
    <!-- 合计 -->
    <div class="total">
      <span>共{{totalNum}}件商品</span>
      <div>合计：￥<span>{{totalP}}</span></div>
    </div>
    <div class="blank"></div>
    <!-- 底部 -->
    <div class="footer" @click="pay">去付款</div>
    <!-- 提示库存不足的弹框  并且调回上一页 -->
     <div v-transfer-dom>
      <alert v-model="show" title="您购买的产品库存不足"  @on-hide="onHide">{{alertTxt}}</alert>
    </div>
    <!-- 用h5支付完之后 显示的弹框 假如支付成功就去订单页，假如失败就去支付前的上一个页面 -->
    <div class="mask" v-show="showIfSuccess">
      <div class="mask_b">
        <p>已经支付成功了吗</p>
        <ul class="mask_ul">
          <li @click="onConfirm1">是的,查看订单</li>
          <li @click="onCancel1">没有,继续逛逛</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {  Alert, TransferDomDirective as TransferDom ,Confirm, } from 'vux'
import {getAddress,orderSettle,orderCheck,orderPay,orderBuy,orderBuyCheck,jsapiUnion,jsapiBuy} from '../api/api.js'
export default {
  directives: {
    TransferDom
  },
  components: {
    Alert,
    Confirm
  },
  data () {
    return {
      hasAddress:false,
      token:sessionStorage.token || '',
      arr:[],
      address:{},
      txt:'',
      type:'',
      show:false,
      alertTxt:'',
      totalNum:0,
      totalP:0,
      showIfSuccess:false
    }
  },
  created(){
    document.title = '结算'  
    this.getData()
    if(sessionStorage.showIfSuccess){
      this.showIfSuccess = true
    }
  },
  methods:{
    //判断浏览器
    is_weixn(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
          return true;
      } else {
          return false;
      }
    },

    //获取数据
    getData(){
      var arr = []
      var id = ''
      var type = ''
      if(this.$route.query.type){
        if(this.$route.query.ids){
          console.log('ids')
          var ids = this.$route.query.ids
          arr = this.$route.query.ids.split(',')
          var type = this.$route.query.type
          this.type = type
          sessionStorage.ids = JSON.stringify(arr)
          sessionStorage.type = type
        }else if(this.$route.query.id){
          console.log('id')

          id =  this.$route.query.id
          type = this.$route.query.type
          this.type = type
          sessionStorage.id = id
          sessionStorage.type = type
        }
      }else{
         type = sessionStorage.type 
         this.type = type
        if(sessionStorage.ids){
          arr = JSON.parse(sessionStorage.ids)
        }
        id = sessionStorage.id     
      }
      
      var options = {}
      if(type == 'buy'){
        this.alertTxt = '请重新选择产品'
        options = {
          token : this.token,
          type : 'buy',
          id:id
        }
      }else{
        this.alertTxt = '请重新从购物车选择下单产品'
        options = {
          token : this.token,
          type : 'shop',
          ids:JSON.stringify(arr)
        }
      }
    
      orderSettle(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.arr = res.data.data.result
          if(this.type=='buy'){
            this.totalNum =1
            this.totalP = this.arr[0].tea_price
          }else{
            this.arr.forEach(item=>{
            this.totalNum += item.tea_count
            this.totalP += item.tea_count*item.tea_price
          })
          }
         
          
          this.address = res.data.data.address
          if(sessionStorage.is_from_addlist){
            this.txt = sessionStorage.input
            this.address =  JSON.parse(sessionStorage.address)
          }
          console.log(res,'res')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //点击付款
    pay(){
      if(!this.address.id){
        this.$vux.toast.text('地址不能为空')
        return
      }else if(!this.txt){
        this.$vux.toast.text('留言不能为空')
        return
      } 
      if(this.type=='shop'){
        this.check()
      }else if(this.type=='buy'){
        this.checkBuy()
      }
      
    },
    //购物车购买  校验库存 然后根据浏览器的类型选择下单方式   ,
    check(arr,ids){
      var arr = []
      this.arr.forEach(item=>{
        var obj = {}
        obj.id = item.id
        obj.count = item.tea_count
        arr.push(obj)
      })
      const options = {
        token :this.token,
        ids :JSON.stringify(arr)
      }
      orderCheck(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          if(this.is_weixn()){
            this.weChatUnion()
          }else{
            sessionStorage.sessionStorage=true
            // this.showIfSuccess = true
            this.orderOrder()
          }
        }else{
          //this.$vux.toast.text(res.data.error_message||res.data.message)
          this.show = true
        }
      })
    },
    //直接购买 校验库存 然后根据浏览器的类型选择下单方式
    checkBuy(){
      const options = {
        token :this.token,
        id : this.arr[0].id,
        count :1,
      }
      orderBuyCheck(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          if(this.is_weixn()){
            this.weChatBuy()
          }else{
            // this.showIfSuccess = true
            sessionStorage.sessionStorage=true
            this.orderOrderBuy()
          }    
        }else{
          // this.$vux.toast.text(res.data.error_message||res.data.message)
          this.show = true
        }
      })
    },
    //h5 购物车下单接口
    orderOrder(){
      var arr = []
      var totalMoney = 0
      this.arr.forEach(item=>{
        var obj = {}
        obj.id = item.id
        obj.price = item.tea_price
        obj.count = item.tea_count
        obj.total = item.tea_price*item.tea_count
        arr.push(obj)
        totalMoney += obj.total
      })
      var targetObj = {}
      targetObj.total = totalMoney
      targetObj.products  = arr
      console.log(targetObj)
      const options = {
          token :this.token,
          data : JSON.stringify(targetObj),
          o_username:this.address.username,
          o_mobile:this.address.mobile,
          o_addr_id:this.address.id,
          o_remark :this.txt
      }
      console.log(options)
      orderPay(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          window.location.href = res.data.data.mweb_url   
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })

    },
    //h5直接购买 下单
    orderOrderBuy(){
      const options = {
        token :this.token,
        id : this.arr[0].id,
        o_price :this.arr[0].tea_price,
        o_count:1,
        o_total :this.arr[0].tea_price,
        o_username:this.address.username,
        o_mobile:this.address.mobile,
        o_addr_id:this.address.id,
        o_remark :this.txt
      }
      orderBuy(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          window.location.href = res.data.data.mweb_url   
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })

    },
    //公众号直接购买  
    weChatBuy(){
      const options = {
        token :this.token,
        id : this.arr[0].id,
        o_price :this.arr[0].tea_price,
        o_count:1,
        o_total :this.arr[0].tea_price,
        o_username:this.address.username,
        o_mobile:this.address.mobile,
        o_addr_id:this.address.id,
        o_remark :this.txt
      }
      try {
      jsapiBuy(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          }else{
            this.onBridgeReady(res.data.data);
          } 
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
      
      } catch (e) {
        alert(JSON.stringify(e))
      }
    },
    //公众号购物车下单
    weChatUnion(){
      var arr = []
      var totalMoney = 0
      this.arr.forEach(item=>{
        var obj = {}
        obj.id = item.id
        obj.price = item.tea_price
        obj.count = item.tea_count
        obj.total = item.tea_price*item.tea_count
        arr.push(obj)
        totalMoney += obj.total
      })
      var targetObj = {}
      targetObj.total = totalMoney
      targetObj.products  = arr
      const options = {
          token :this.token,
          data : JSON.stringify(targetObj),
          o_username:this.address.username,
          o_mobile:this.address.mobile,
          o_addr_id:this.address.id,
          o_remark :this.txt
      }
      jsapiUnion(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          }else{
            this.onBridgeReady(res.data.data);
          } 
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //调起微信支付
    onBridgeReady(data) {     
      let params = {
          'appId' : data.appId,
          'timeStamp' : data.timeStamp,
          'nonceStr' : data.nonceStr,
          'package' : data.package,
          'signType' : data.signType,
          'paySign' : data.paySign
      };
      let method = 'getBrandWCPayRequest';
      var that = this
      WeixinJSBridge.invoke(
          method, params, function (res) {
              if (res.err_msg == 'get_brand_wcpay_request:ok') { // 支付成功
                  that.$vux.toast.text('支付成功')
                  window.location.href = 'http://uat.chajisong.com/#/orders';
              } else {
                that.$vux.toast.text('支付失败')
              }
          }
      )       
    },
    //没库存时候
    onHide () {
      console.log(this.type)
      if(this.type=='shop'){
        this.$router.push('/car')
      }else if(this.type=='buy'){
        this.$router.push({path:'/goodDetail',query:{id:this.arr[0].id}})
      }
    },
    //h5支付完之后 的弹框 失败的话 就去主页 成功就去订单页
    onCancel1 () {//去主页
      this.$router.push('/')
    },
    onConfirm1 () {//去订单页
      sessionStorage.selectIndex = 0
      this.$router.push('/orders ')
    }
  },
  
  beforeRouteLeave(to, from, next){
    sessionStorage.removeItem('is_from_addlist')
    sessionStorage.input = this.txt
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  border-top 1px solid  #E8E8E8
  padding-top l(10)
  height 100vh
  overflow-y scroll
  .addNo
    display flex
    justify-content center
    align-items center
    font-size: 14px;
    color: #333333;
    letter-spacing: 0.3px;
    line-height: 24px;
    background #ffffff
    padding l(20) 0
    margin-bottom l(10)
    img 
      display block
      width l(8)
      height l(13)
      margin-left l(20)
  .add
    padding l(10) 4.3%
    width 100%
    disFlex ()
    background #fff
    margin-bottom l(10)
    .add_l
      fz(16)
      color: #333333;
      letter-spacing: 0.27px;
      line-height l(22)
      width l(66)
    .add_r
      width l(238)
      text-align left 
      span 
        font-size: 14px;
        color: #666666;
        letter-spacing: 0.3px;
        line-height: l(24)
      p
        font-size: 14px;
        color: #666666;
        letter-spacing: 0.3px;
        line-height: 23px;
    img.add_m
      display block
      width l(8)
      height l(13)
  ul.list
    padding 0 4.3%
    background #fff
    li:last-of-type
      border-bottom none
    li
      height l(126) 
      disFlex()
      padding 6% 0
      border-bottom 1px solid #E8E8E8
      .car_s
        display block
        width l(18)
        height l(18)
      .car_img
        display block
        width l(106)
        height l(85)
      .car_p
        width 64%
        height 100%
        text-align left 
        span.titlt
          line-height l(22)
          fz(16)
          color: #333333
          letter-spacing 0.3px
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          display block
          width 100%
        p.t_d
          line-height l(20)
          fz(14)
          color #666666
          letter-spacing 0.3px
          margin-top l(6)
        div.t_num
          disFlex()
          margin-top l(10)
          p
            color #E63443
            fz(14)
            span 
              fz(18)
              color #E63443
          div
            fz(14)
            color: #666666;
            letter-spacing: l(0.3)
            p
              width l(25)
              height 100%
  .yun
    margin-top l(10)
    height l(64)
    fz(16)
    color #333
    line-height l(64)
    disFlex()
    padding 0 4.3%
    background #fff
    span 
      color: #E63443;
      fz(14)
//留言
  .word
    padding 0 4.3%
    background #fff
    height l(64)
    div
      border: 1px solid #E8E8E8;
      border-left 0
      border-right 0
      height 100%
      display flex
      justify-content flex-start
      align-items center
      span 
        fz(16)
        color: #333333;
        letter-spacing: l(0.36)
        margin-right l(10)
      input 
        fz(14)
        color: #666;
        letter-spacing: 0.31px;
        border none 
        outline none
      
      input::placeholder
        color: #999999;
        fz(12)
        line-height l(20)
//微信支付
  .wx
    width 100%
    height l(64)
    padding 0 4.3%
    background #fff
    .wx1
      disFlex()
      width 100%
      height 100%
      border-bottom 1px solid #E8E8E8
      .wx2
        width 55%
        disFlex ()
        color: #666666;
        letter-spacing: 0.31px;
        fz(14)
        span 
          fz(16)
          color: #333333;
          letter-spacing: l(0.36)
        img 
          display block
          width l(30)
          height l(24)
      img 
        display block
        width l(18)
        height l(18)
//合计
  .total
    height l(64)
    display flex
    justify-content flex-end
    align-items center
    padding 0 4.3%
    background #fff
    span 
      color: #666666;
      letter-spacing: 0.31px;
      fz(14)
    div
      color: #E63443;
      fz(14)
      margin-left l(20)
      span 
        fz(18)
        color: #E63443;
//底部
  .footer
    width 100%
    line-height l(44)
    fz(18)
    color: #FFFFFF;
    letter-spacing: 1.12px;
    background: #83271F;
    position fixed
    bottom 0
    left 0
  .blank
    height l(44)
    margin-top l(10)
  //提示去看订单的弹框
  .mask
    width 100%
    height 100vh
    background rgba(0,0,0,0.3)
    z-index 999
    position fixed
    top 0
    left 0
    .mask_b
      width l(300)
      height l(135)
      position absolute
      top 0px
      bottom 0
      left 0
      right 0
      margin auto
      background #fff
      border-radius l(5)
      p
        height l(85)
        line-height l(85)
        text-align center
        font-family: PingFangSC-Regular;
        fz(16)
        color: #666666;
        letter-spacing: 0.3px;
      ul.mask_ul
        width 100%
        height l(50)
        overflow hidden
        border-top l(1) solid #e8e8e8
        li:last-of-type 
          color: red;
          border-left l(1) solid #e8e8e8
        li
          width 50%
          height 100%
          float left
          text-align center
          line-height l(50)
          fz(16)
          color: #353535;
          letter-spacing: 0.3px;

</style>
