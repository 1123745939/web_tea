<template>
  <div class="con">
    <div class="o_h">
      <tab :scroll-threshold="6" bar-active-color="#F6AF15" active-color="#83271F" :line-width=4>
        <tab-item :selected="index == selectIndex ? true:false" @on-item-click="onItemClick(item.id,index)" v-for="(item,index) in tabs" :key="item.id">{{item.name}}</tab-item>
      </tab>
    </div>
    <ul class="o_l" v-if="orderList.length">
      <li>
        <div class="li_h">
          <p class="time">2018/10/16 14:18</p>
          <p v-if="status == 1">等待付款</p>
          <p v-if="status == 2">买家已付款</p>
          <p v-if="status == 3">卖家已发货</p>
          <p v-if="status == 4 || status == 5">交易成功</p>
          <p v-if="status == 6">退款中</p>
          <p v-if="status == 7">退款成功</p>
          <p v-if="status == 8">退款失败</p>
        </div>
        <div class="li_m"  @click="$router.push('/orderDetail')">
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
        <div class="heji">
          <span>共1件商品</span>
          <p>合计：￥<span>1800</span>.00</p>
        </div>
        <div class="b_b" v-if="status == 1">
          <p>取消订单</p>
          <p>立即支付</p>
        </div>
        <div class="b_b" v-if="status == 2">
          <p>取消订单</p>
        </div>
         <div class="b_b" v-if="status == 3">
          <p>查看物流</p>
          <p>确认收货</p>
        </div>
         <div class="b_b" v-if="status == 4">
          <p>删除订单</p>
          <p>评价</p>
          <p>再次购买</p>
        </div>
        <div class="b_b" v-if="status == 5">
          <p>删除订单</p>
          <p>再次评价</p>
          <p>再次购买</p>
        </div>
        <div class="b_b" v-if="status == 6">
          <p>查看详情</p>
          <p>取消退款</p>
        </div>
        <div class="b_b" v-if="status == 7">
          <p>查看详情</p>
        </div>
        <div class="b_b" v-if="status == 8">
          <p>查看详情</p>
        </div>
      </li>
    </ul>
    <div class="noList" v-else>
    <div class="box">
      <img src="../assets/img/symbols-order.png" alt="">
      <span>暂无订单</span>
    </div>
  </div>
  </div>
</template>

<script>
import { Tab, TabItem , XButton } from 'vux'
import {Login} from '../api/api.js'
export default {
  components: {
    Tab,
    TabItem,
    XButton
  },
  data () {
    return {
      status:1,
      selectIndex:0,
      tabs:[{id:1,name:'全部'},{id:2,name:'待付款'},{id:3,name:'待发货'},{id:4,name:'待收货'},{id:5,name:'待评价'},{id:6,name:'售后'}],
      orderList:[]
    }
  },
  created(){
    document.title = '我的订单'
    this.selectIndex = 3
  },
  methods:{
    onItemClick(id,index){
      this.selectIndex = index
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
    margin-bottom l(10)
    padding 0 4.3%
    background #fff
  ul
   
    li
      width 100%
      margin-bottom l(10)
      background #fff
      padding l(20) 4.3% l(10)
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
      .heji
        display flex
        justify-content flex-end
        align-items center
        font-size: 12px;
        color: #333333;
        letter-spacing: 0.17px;
        margin-top l(10)
        span 
          font-size: 12px;
          color: #333333;
          letter-spacing: 0.23px;
        p 
          display flex
          justify-content space-between
          align-items center
          margin-left l(10)
          span 
            font-size: 18px;
            color: #151515;
            letter-spacing: 0.17px;
      .b_b
        display flex
        justify-content flex-end
        align-items center
        margin-top l(10)
        p:last-of-type
          border 1px solid #83271F
          color #83271F
          margin-left l(15)
        p
          width l(73)
          height l(23)
          border-radius l(100)
          line-height l(23)
          color #666666
          border 1px solid #D4D4D4
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
        width l(176)
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
