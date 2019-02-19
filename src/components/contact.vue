<template>
  <div class="con">
    <div class="content">
      <div class="photo">
        <div class="left">
          <img src="../assets/img/gongsi.png" alt="">
        </div>
        <div class="right">
          <span>公司</span>
          <p>山东茶急送茶业有限公司</p>
        </div>
      </div>
      <div class="photo aa">
        <div class="left">
          <img src="../assets/img/xinfeng.png" alt="">
        </div>
        <div class="right">
          <span>邮箱</span>
          <p>chajisong2018@sohu.com</p>
        </div>
      </div>
      <div class="grey"></div>
      <div class="photo" @click = "show2 = true">
        <div class="left">
          <img src="../assets/img/QQ@2x.png" alt="">
        </div>
        <div class="right">
          <span>QQ</span>
          <p>3484212528</p>
        </div>
      </div>
      <div class="photo">
        <div class="left">
          <img src="../assets/img/erji.png" alt="">
        </div>
        <div class="right">
          <span>客服</span>
          <p>18560039957</p>
        </div>
      </div>
      <div class="photo">
        <div class="left">
          <img src="../assets/img/dianhua.png" alt="">
        </div>
        <div class="right">
          <span>售后</span>
          <p>18560039710</p>
        </div>
      </div>
      <div class="photo aa">
        <div class="left">
          <img src="../assets/img/weixina.png" alt="">
        </div>
        <div class="right">
          <span>微信</span>
          <p>茶急送官方</p>
        </div>
      </div>
      <div class="grey"></div>
      <div class="photo">
        <div class="left">
          <img src="../assets/img/addresss.png" alt="">
        </div>
        <div class="right">
          <span>地址</span>
          <p>山东省济南市高新区汉峪金谷A3区5栋19A</p>
        </div>
      </div>
      <div class="photo">
        <div class="left">
          <img src="../assets/img/luxian.png" alt="">
        </div>
        <div class="right">
          <span>路线</span>
          <p class="bus">乘坐116路、303路、303路支线、305路、k115路、k146路、k209路高峰大站快车、k73路到北胡公交站 <br>
              乘坐k146路、k160路、k168路、通勤快速巴士t20线、通勤快速巴士t22线、通勤快速巴士t5线、通勤快速巴士t7线到舜华南路龙奥北路公交站 <br>
              乘坐119路、303路、303路支线、305路、k115路、k146路、k166路、k301路、k73路到高新开发区公交站
          </p>
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
    document.title = '联系我们'
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
  background  #F7F7F7;
  border-top 1px solid #E8E8E8
  padding-top l(10)
  text-align left 
  .content
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 #E8E8E8;

    .grey
      background #f7f7f7
      height l(10)
    .photo.aa
      .right
        border-bottom 0
    .photo
      overflow hidden
      position relative
      padding l(10) 4.3% 0
      .left
        fz(14)
        color: #333333;
        letter-spacing: 0.3px;
        float left
        padding-top l(16)
        img 
          display block
          width l(18)
          height l(18)
          margin-right l(15)
      .right
        width 90%
        height 100%
        // display flex
        // justify-content space-between
        // align-items center
        border-bottom 1px solid #E8E8E8
        padding l(20) 0
        float right 
        overflow hidden
        img.tou
          width l(46)
          height l(46)
          border-radius 50%
        img 
          display block
          width l(6)
          height l(10)
          margin-left l(10)
        span 
          fz(14)
          color: #282828;
          letter-spacing: 0.3px;
          text-align right
          float left
        p.bus
          text-align left 
        p
          width 66%
          fz(13)
          color #666
          letter-spacing l(0.28)
          text-align right 
          line-height l(22)
          float right 
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
