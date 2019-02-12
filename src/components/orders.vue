<template>
  <div class="con"  ref="cons">
    <!-- <div class="blank"></div> -->
    <div class="o_h"  ref="navs">
      <tab :scroll-threshold="6" bar-active-color="#F6AF15" active-color="#83271F" :line-width=4>
        <tab-item :selected="index == selectIndex ? true:false" @on-item-click="onItemClick(item.id,index)" v-for="(item,index) in tabs" :key="item.id">{{item.name}}</tab-item>
      </tab>
    </div>
    
    <div class="box" v-show="orderList.length" id="boxs">
      <scroll ref="scroll"
        :data="orderList"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp">

        <div class="o_l">
          <li v-for="(item,index) in orderList" :key="item.id">
            <div class="li_h">
              <p class="time">{{item.created_at}}</p>
              <p>{{item.status_text}}</p>
            </div>
            <div class="li_m"  @click="$router.push({path:'/orderDetail',query:{id:item.id,tea_id:item.tea_id}})">
              <div class="t_img" :style="{background:'url(' + item.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
                <img src="../assets/img/play.png" alt="">
              </div>
              <div class="t_info">
                <p>{{item.tea_title}}</p>
                <span>{{item.tea_date}}</span>
                <span v-show="item.is_advance==1" style="color:#e63443;">预售时间：{{item.advance_date}}</span>
              </div>
              <div class="in_num">
                  <p>￥{{item.order_price}}</p>
                  <span>X{{item.order_count}}</span>
                </div>
            </div>
            <div class="heji">
              <span>共{{item.order_count}}件商品</span>
              <p>合计：￥<span>{{item.order_total}}</span></p>
            </div>
            <!-- <div class="b_b" v-if="item.order_status == 0">
              <p @click="cancelShow = true;id=item.id">取消订单</p>
              <p>立即支付</p>
            </div> -->
            <div class="b_b" v-if="item.order_status == 1 && item.reject_status==0">
              <p @click="$router.push({path:'/applySale',query:{id:item.id}})">申请售后</p>
            </div>
             <div class="b_b" v-if="item.order_status == 1 && item.reject_status==2">
               <p  @click="$router.push({path:'/orderDetail',query:{id:item.id,tea_id:item.tea_id}})">查看详情</p>
              <p @click="cancelTuiShow = true;id=item.id">取消退款</p>
            </div>
             <div class="b_b" v-if="item.order_status == 2 && item.reject_status==2">
               <p  @click="$router.push({path:'/orderDetail',query:{id:item.id,tea_id:item.tea_id}})">查看详情</p>
              <p @click="cancelTuiShow = true;id=item.id">取消退款</p>
            </div>
            <div class="b_b" v-if="item.order_status == 2 && item.reject_status==0">
              <p>查看物流</p>
              <p @click="$router.push({path:'/applySale',query:{id:item.id}})">申请售后</p>
              <p @click="confirmShow = true;id=item.id">确认收货</p>
            </div>
            <div class="b_b" v-if="item.order_status == 3">
              <p @click="delShow = true;id=item.id;indexindex = index">删除订单</p>
              <p @click="goEvluate(item)">评价</p>
              <p @click="$router.push({path:'/pay',query:{id:item.tea_id,type:'buy'}})">再次购买</p>
            </div>
            <div class="b_b" v-if="item.order_status == 4 && item.reject_status==0">
              <p  @click="$router.push({path:'/orderDetail',query:{id:item.id,tea_id:item.tea_id}})">查看详情</p>
            </div>
            <div class="b_b" v-if="item.order_status == 5">
              <p  @click="$router.push({path:'/orderDetail',query:{id:item.id,tea_id:item.tea_id}})">查看详情</p>
            </div>
                <!-- 是否删除的弹框 -->
                <div v-transfer-dom>
                  <confirm v-model="delShow"  @on-confirm="del()">
                    <p style="text-align:center;">确认要删除吗</p>
                  </confirm>
                </div>
                <!-- 是否取消订单的弹框 -->
                <div v-transfer-dom>
                  <confirm v-model="cancelShow"  @on-confirm="cancel(index)">
                    <p style="text-align:center;">确认要取消订单吗</p>
                  </confirm>
                </div>
                <!-- 是否取消退款的弹框 -->
                <div v-transfer-dom>
                  <confirm v-model="cancelTuiShow"  @on-confirm="refuseCancel()">
                    <p style="text-align:center;">确认要取消退款吗</p>
                  </confirm>
                </div>
                <!-- 是否确认收货的弹框 -->
                <div v-transfer-dom>
                  <confirm v-model="confirmShow"  @on-confirm="confirm()">
                    <p style="text-align:center;">要确认收货吗</p>
                  </confirm>
                </div>
          </li>
       </div>
    </scroll>

    </div>

    
    <div class="noList" v-show="orderList.length==0">
      <div class="box">
        <img src="../assets/img/symbols-order.png" alt="">
        <span>暂无订单</span>
      </div>
  </div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import { Tab, TabItem , XButton ,Confirm, TransferDomDirective as TransferDom} from 'vux'
import Scroll from './scroll/scroll'
import { orderList , orderCancel , orderConfirm ,orderDel , orderRefundCancel } from '../api/api.js'
export default {
   directives: {
    TransferDom
  },
  components: {
    Confirm,
    Tab,
    TabItem,
    XButton,
    Scroll
  },
  data () {
    return {
      token : localStorage.token || '',
      status:1,
      selectIndex:0,
      tabs:[{id:1,name:'全部'},{id:3,name:'待发货'},{id:4,name:'待收货'},{id:5,name:'已完成'},{id:6,name:'售后'}],//{id:2,name:'待付款'}
      orderList:[],
      orderList1:[],
      page:1,
      ifRefrush:false,
      id:'',
      delShow:false,
      cancelShow:false,
      cancelTuiShow:false,
      confirmShow:false,
      indexindex:'',
      count:'',

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

    document.title = '我的订单'
    if(sessionStorage.selectIndex){
      this.selectIndex = sessionStorage.selectIndex
    }else{
      this.selectIndex = 0
    }
    
    this.init(1,this.selectIndex)

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
  mounted(){
    this.$el.querySelector('#boxs').style.height=this.$refs.cons.offsetHeight-this.$refs.navs.offsetHeight+'px'
  },
 
  methods:{
    init(page,status){
      const options = {
        token:this.token,
        page:page,
        rows:10,
        status :status
      }
      orderList(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.count = res.data.data.count
          if(page==1){
            this.page = 1
            this.orderList = res.data.data.result
          }else{
            this.orderList = this.orderList.concat(res.data.data.result)  
            console.log(this.orderList)
          } 
              
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //点击tab切换
    onItemClick(id,index){
      this.orderList = []
      sessionStorage.selectIndex = index
      this.selectIndex = index
      this.init(1,index)
    },
    //删除订单
    del(){
      const options = {
        token :this.token,
        id:this.id
      }
      orderDel(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('订单已删除')
          this.orderList.splice(this.indexindex,1)
          this.$forceUpdate()
          //this.scroll.scrollTo(0, 0, 500)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //取消订单
    // cancel(index){
    //   const options = {
    //     token :this.token,
    //     id:this.id
    //   }
    //   orderCancel(options).then(res=>{
    //     if(res.data.code == 200 && !res.data.error_code){
    //       this.$vux.toast.text('订单已取消成功')
    //     }else{
    //       this.$vux.toast.text(res.data.error_message||res.data.message)
    //     }
    //   })
    // },
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
          this.init(1,3)
          this.$forceUpdate()
          //this.scroll.scrollTo(0, 0, 500)
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
    //去评价
    goEvluate(item){
      this.$router.push('/evaluate');
      sessionStorage.orderComment = JSON.stringify(item)
    },
    onPullingDown() {
      // 模拟更新数据
      this.ifRefrush = true
      this.init(1,this.selectIndex)
      this.$refs.scroll.forceUpdate()
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      if(this.count>this.page*10){
        this.page ++ ;
        this.init(this.page,this.selectIndex)
        this.$refs.scroll.forceUpdate()
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
    },
    selectIndex(oldV,neWV){
      this.init(1,oldV)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  position relative
  height 100vh
 .o_h
    width 100%
    padding 0 4.3%
    background #fff
    position:fixed;
    z-index:99;
    height l(40)
    left 0
    top 0
  .box
    height l(627)
    width: 100%;
    position fixed;
    top l(40)
    overflow-y scroll
    background #F7F7F7 
  div.o_l
    li
      width 100%
      margin-bottom l(10)
      background #fff
      padding l(20) 4.3% l(10)
      list-style none
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
          margin-left l(15)
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
