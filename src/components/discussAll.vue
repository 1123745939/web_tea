<template>
  <div class="con">

    <!-- 评价 -->
    <div class="pre">
      <ul class="pr_m">
        <li class="active">全部<br>170</li>
        <li>热评<br>170</li>
        <li>视频<br>170</li>
        <li>有图<br>170</li>
        <li>追加<br>170</li>
      </ul>
      <div class="blank"></div>
      <ul class="pr_list">
        <li class="pr_li">
          <div class="li_t">
            <img src="../assets/img/photo.jpg" alt="">&nbsp;
            微微一笑
          </div>
          <p>有没有关于果糖不耐的基因分析？有没有关于果糖不耐的基因分析？</p>
          <div class="li_bt">
            <span>2018/09/08  14:20</span>
            <span><img src="../assets/img/zanb.png" alt="">&nbsp;&nbsp;50</span>
          </div>
        </li>
        <li class="pr_li">
          <div class="li_t">
            <img src="../assets/img/photo.jpg" alt="">&nbsp;
            微微一笑
          </div>
          <p>有没有关于果糖不耐的基因分析？有没有关于果糖不耐的基因分析？</p>
          <ul class="d_img">
            <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
          </ul>
          <div class="li_bt">
            <span>2018/09/08  14:20</span>
            <span><img src="../assets/img/zanb.png" alt="">&nbsp;&nbsp;50</span>
          </div>
          <!-- 追评 -->
          <div class="zhui">
            <li class="pr_li" style="padding-top:0">
              <div class="li_t zhui">用户追评</div>
              <p>有没有关于果糖不耐的基因分析？有没有关于果糖不耐的基因分析？</p>
              <div class="li_bt">
                <span>2018/09/08  14:20</span>
                <span><img src="../assets/img/zanb.png" alt="">&nbsp;&nbsp;50</span>
              </div>
            </li>
          </div>
        </li>
         <li class="pr_li">
          <div class="li_t">
            <img src="../assets/img/photo.jpg" alt="">&nbsp;
            微微一笑
          </div>
          <p>有没有关于果糖不耐的基因分析？有没有关于果糖不耐的基因分析？</p>
          <ul class="d_img">
            <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
          </ul>
          <div class="li_bt">
            <span>2018/09/08  14:20</span>
            <span><img src="../assets/img/zanb.png" alt="">&nbsp;&nbsp;50</span>
          </div>
        </li>
        <li class="pr_li">
          <div class="li_t">
            <img src="../assets/img/photo.jpg" alt="">&nbsp;
            微微一笑
          </div>
          <p>有没有关于果糖不耐的基因分析？有没有关于果糖不耐的基因分析？</p>
          <ul class="d_img">
            <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
             <li class="d_li">
              <img src="../assets/img/list1.png" alt="">
            </li>
          </ul>
          <div class="li_bt">
            <span>2018/09/08  14:20</span>
            <span><img src="../assets/img/zanb.png" alt="">&nbsp;&nbsp;50</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper' 
import 'swiper/dist/css/swiper.min.css'
import {Login} from '../api/api.js'
export default {
  data () {
    return {
      msg: ''
    }
  },
  created(){
    document.title = '详情'
    
  },
  mounted(){
    
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  box-shadow: 0 0 5px 0 #F3F3F3;
  // 评论列表
  .pre
    background #F7F7F7
    width 100%
    ul.pr_m
      width 100%
      display flex
      justify-content space-between
      background #fff
      padding l(10) 4.3% 
      position fixed
      top 0
      left 0
      li.active
        color #83271F
      li
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.3px;
        line-height l(26)
    .blank
      width 100%
      height l(80)
    ul.pr_list
      background #fff
      padding 0 4.3% 
      margin-top l(5)
      li.pr_li:last-of-type
        border-bottom 0
      li.pr_li
        border-bottom 1px solid #cccccc
        padding l(20) 0 l(10)
        div.li_t.zhui
          font-size: 14px;
          color: #83271F;
          letter-spacing: 0.3px;
          padding 0 10%
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
        p
          fz(14)
          color: #333333;
          letter-spacing: 0.3px;
          line-height l(20)
          text-align left 
          padding 0 10%
        ul.d_img
          width 100%
          display flex
          justify-content flex-start
          flex-wrap wrap
          padding l(10) 10%
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
        .li_bt
          padding l(10) 10%
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
              width l(15)
              height l(15)
  
</style>
