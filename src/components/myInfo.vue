<template>
  <div class="con">
    <div class="sex">
      <div class="aa">
        <span>您的性别</span>
        <div class="active"></div><p>男</p>
        <div></div><p>女</p>
      </div>
    </div>
    <ul class="gr">
      <li>
        <span>您的年龄</span>
        <div>50-55
          <img src="../assets/img/more1.png" alt="">
        </div>
      </li>
      <li>
        <span>您的职业</span>
        <div>白领
          <img src="../assets/img/more1.png" alt="">
        </div>
      </li>
      <li>
        <span>喝茶频率</span>
        <div>每天
          <img src="../assets/img/more1.png" alt="">
        </div>
      </li>
      <li>
        <span>喝茶频率</span>
        <div>每天
          <img src="../assets/img/more1.png" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'
import {Login} from '../api/api.js'
export default {
  data () {
    return {
      msg: ''
    }
  },
  created(){
    document.title = '我的信息'
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
  border-top 1px solid #E8E8E8;
  height l(667)
  text-align left 
  .gr
    background #ffffff
    padding 0 4.3%
    height l(598)
    li
      height l(58)
      disFlex ()
      border-bottom 1px solid #E8E8E8
      span 
        fz(16)
        color: #333333;
        letter-spacing: 0.36px;
      div
        disFlex ()
        fz(14)
        color #333
        img 
          display block
          width l(8)
          height l(13)
          margin-left l(10)
  .sex
    background #ffffff
    margin-top l(10)
    .aa
      padding 0 4.3%
      border-bottom 1px solid #E8E8E8
      display flex
      justify-content flex-start
      align-items center
      height l(58)
      span 
        fz(16)
        color: #333333;
        letter-spacing: 0.36px;
      div
        width l(18)
        height l(18)
        backgroundIcon ('c_blank.png')
        margin-right l(20)
        margin-left l(20)
      div.active
        backgroundIcon ('c_active.png')
      p
        fz(14)
        color: #333333;
        letter-spacing: 0.31px;
        margin-right l(20)
</style>
