<template>
  <div class="con">
    <!-- 头部 -->
     <div class="e_h">
        <div class="box">
          <div class="li_m"  @click="$router.push('/orderDetail')">
            <div class="t_img">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>安溪铁观音</p>
              <span>2018/09/18 绿茶28期</span>
              <div class="in_num">
                <p>￥<span>1800</span>.00</p>
              </div>
            </div>
           <img src="../assets/img/more1.png" alt="" class="j_r">
          </div>            
        </div>
     </div>
    <!-- 评论区 -->
    <textarea placeholder="请输入评价"></textarea>
    <!-- 图片 -->
    <div class="up_file">图片（可选，最多三张）</div>
    <ul class="up_img">
      <li>
        <img src="../assets/img/list1.png" alt="">
        <div></div>
      </li>
      <li>
        <img src="../assets/img/add_proto.png" alt="">
      </li>
      <li>
        <img src="../assets/img/add_proto.png" alt="">
      </li>
    </ul>
    <div class="vi">
      <img src="../assets/img/add_video.png" alt="">
    </div>
    <span class="save">保存</span>
  </div>
</template>

<script>
import {Login} from '../api/api.js'
export default {
  data () {
    return {
      msg: ''
    }
  },
  created(){
    document.title = '发表评价'
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
  padding l(10) 4.3%
  display flex
  flex-direction column
  align-items center
  .e_h
    width 100%
    .box
      width 100%
      border-bottom 1px solid #E8E8E8;
      background #fff
      padding 0 0 l(10)
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
          width l(125)
          height l(100)
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
          width l(165)
          height l(100)
          display flex
          flex-direction column
          justify-content space-between
          p
            fz(16)
            color: #151515;
            letter-spacing: 0.23px;
            line-height: l(20)
            text-align left 
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
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
        .j_r
          display block
          width l(8)
          height l(13)
  textarea
    background: #F7F7F7;
    border-radius: 6px;
    width l(343)
    height l(140)
    outline none
    border none
    resize none
    fz(14)
    color: #666;
    letter-spacing: 0.3px;
    padding l(10)
    line-height l(20)
    -webkit-appearance: none;
    margin l(20) 0
  textarea::placeholder
    color: #999999;
  .up_file
    width 100%
    font-size: 14px;
    color: #333333;
    letter-spacing: 0.3px;
    line-height l(15)
    text-align left 
  ul.up_img
    width 100%
    margin l(10) 0
    disFlex ()
    li
      width l(100)
      height l(80)
      position relative
      img 
        display block
        width 100%
        height 100%
      div
        width l(18)
        height l(18)
        backgroundIcon ('close.png')
        position absolute
        top l(2)
        right l(2)
  .vi
    width l(100)
    height l(80)
    margin-right l(244)
    img 
      display block
      width 100%
      height 100%
  .save
    display block
    width l(160)
    height l(44)
    background: #83271F;
    border-radius: 100px;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 1.12px;
    line-height l(44)
    margin-top l(60)
</style>
