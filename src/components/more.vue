<template>
  <div class="con">
    <div class="content">
      <div class="photo" @click="$router.push('/aboutUs')">
        <div class="left">关于我们</div>
        <div class="right">
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
      <div class="photo" @click="$router.push('./feedback')">
        <div class="left">投诉建议</div>
        <div class="right">
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
      <div class="photo" @click = "$router.push('/contact')">
        <div class="left">联系我们</div>
        <div class="right">
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
      <div class="photo" @click = "$router.push('/help')">
        <div class="left">帮助</div>
        <div class="right">
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
    </div>
    <footers :index = 4></footers>
  </div>
</template>

<script>
import footers from './footers'
export default {
  data () {
    return {
      token : localStorage.token || '',
    }
  },
  created(){
    document.title = '更多'
  },
  components:{
    footers
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  height 100vh
  background  #F7F7F7;
  border-top 1px solid #E8E8E8
  padding-top l(10)
  text-align left 
  .content
    height 100%
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 #E8E8E8;
    padding l(10) 4.3% 0
    .photo
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #E8E8E8
      padding l(10) 0
      height l(60)
      position relative
      #photoInput
        display block
        width 100%
        height 100%
        position absolute
        top 0
        left 0
        opacity 0

      .left
        display flex
        justify-content flex-start
        align-items center
        fz(14)
        color: #333333;
        letter-spacing: 0.3px;
        img 
          display block
          width l(20)
          height l(20)
          margin-right l(15)
      .right
        height 100%
        display flex
        justify-content flex-end
        align-items center
        img.tou
          width l(46)
          height l(46)
          border-radius 50%
        img 
          display block
          width l(6)
          height l(10)
          margin-left l(10)
        input 
          font-size: 14px;
          color: #666;
          letter-spacing: 0.3px;
          text-align right 
        span 
          font-size: 14px;
          color: #666;
          letter-spacing: 0.3px;
          text-align right 
    .weui-cell__hd  span
      display: flex;
      justify-content: flex-start;
      align-items: center;
    .weui-cell__hd  span img
      display block
      width l(24)
      height l(24)
      margin-right l(10)
      .vux-popup-picker-select span 
        font-size: 14px;
        color: #666666;
        letter-spacing: 0.3px;
  .save
    width l(160)
    height l(44)
    background: #FF5100
    border-radius: 100px;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 1.12px;
    line-height l(44)
    margin-left 28.8%
    margin-top l(60)
    text-align center
.province>div {
    height: 30px;
    overflow: hidden;
  }

  .province select {
    background: transparent;
    padding-left: 10px;
    height: 100%;
  }
  .pro1{
    width: 30%;
    margin-left  l(10)
    float: left;
  }
  .mint-popup-bottom{
    width: 100%;
  }
  .pop1{
    width: 100%;
    display: inline-block;
    position: relative;
  }
  .popt
    margin l(15) l(10)
    display: inline-block;
    width l(355)
    p
      fz(16)
      margin l(20) 0
      text-align center
      z-index 9997
  select{
    width: 100%;
    max-height: 250px;
    line-height l(30)
  }
  .person_list{
    background-color: #fff;

  }
  .person_list>div{
    margin: 0px 10px;
    border-bottom: 1px solid #e3e3e3;
    text-align: left;
    position: relative;
  }
  .person_list div span{
    width: 70px;
    display: inline-block;
    color: #808080;
    font-size: 15px;
  }
  .person_list input{
    border: 0px;
    outline: none;
    font-size: 15px;
    padding: 15px 0px;
  }
  .person_list i{
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .inputBox{
    width: 75%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .icon-guanbi{
    position: absolute;
    top:10px;
    right:20px;
    z-index 999999
  }
.btn
  background: #30A0FE;
  border-radius: 100px;
  line-height l(44)
  fz(18)
  color: #FFFFFF;
  letter-spacing: 1.12px;
  margin l(50) l(16)
  text-align center
.weui-cell {
    padding: 0!important;
    display: flex;
    position: relative;
    align-items: center;}
</style>
