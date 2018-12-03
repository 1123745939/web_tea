<template>
  <div class="con">
    <!-- 有地址 -->
    <div class="add" v-if="hasAddress">
      <span class="add_l">收货地址</span>
      <div class="add_r"  @click="$router.push('/address')">
        <span>刘湘燕&nbsp;15966622119</span>
        <p>山东省济南市历下区经十路街道玉兰广场5号楼23层</p>
      </div>
      <img src="../assets/img/more1.png" alt="" class="add_m" @click="$router.push('/address')">
    </div>
    <div class="addNo" v-else>
      无收货地址，去添加<img src="../assets/img/more1.png" alt="">
    </div>
    <ul>
      <li>
        <img src="../assets/img/list1.png" alt="" class="car_img">
        <div class="car_p">
          <span>安溪铁观音</span>
          <p class="t_d">2018/09/18 绿茶18期</p>
          <div class="t_num">
            <p>￥<span>1399</span>.00</p>
            <div>
              <p></p>3 <p></p>
            </div>
          </div>
        </div>
      </li>
       <li>
        <img src="../assets/img/list1.png" alt="" class="car_img">
        <div class="car_p">
          <span>安溪铁观音</span>
          <p class="t_d">2018/09/18 绿茶18期</p>
          <div class="t_num">
            <p>￥<span>1399</span>.00</p>
            <div>
              <p></p>3 <p></p>
            </div>
          </div>
        </div>
      </li>
      <li class="last">
        <img src="../assets/img/list1.png" alt="" class="car_img">
        <div class="car_p">
          <span>安溪铁观音</span>
          <p class="t_d">2018/09/18 绿茶18期</p>
          <div class="t_num">
            <p>￥<span>1399</span>.00</p>
            <div>数量*3 </div>
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
        <input type="text" placeholder="请输入">
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
      <span>共4件商品</span>
      <div>合计：￥<span>1399</span>.00</div>
    </div>
    <div class="blank"></div>
    <!-- 底部 -->
    <div class="footer">去付款</div>
  </div>
</template>

<script>
import {Login} from '../api/api.js'
export default {
  data () {
    return {
      hasAddress:false
    }
  },
  created(){
    document.title = '结算'
  },
  methods:{
    goDetail(){
      this.$router.push('/goodDetail')
    }
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
  height l(666)
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
  ul
    padding 0 4.3%
    background #fff
    li.last
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
        span 
          line-height l(22)
          fz(16)
          color: #333333
          letter-spacing 0.3px
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
      border: 2px solid #E8E8E8;
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
      border-bottom 2px solid #E8E8E8
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
</style>
