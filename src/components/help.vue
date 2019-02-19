<template>
  <div class="con">
    <div class="content">
      <img src="../assets/img/shouhoufuwu.png" alt="" class="title">
      <div class="intro">退货原则</div>
      <span class="tips">1、“7天无理由退换货”</span>
      <p>茶急送承诺自客户签收包裹之日起，7天内，提供退换货服务。</p>
      <span class="tips">2、声明</span>
      <p>任何非茶急送出售的商品及已使用的品牌商品，将不提供退换货服务。</p>
      <div class="intro">退换货要求与运费规则</div>
      <img src="../assets/img/table.png" alt="" class="table">
      <div class="intro">退换货流程</div>
      <span class="tips">1、联系售后申请</span>
      <p>QQ在线客服：3484212528</p>
      <p>售后电话：18560039710</p>
      <p>微信服务号：茶急送官方</p>
      <span class="tips">2、寄回产品</span>
      <p>申请之日48小时内寄出，寄出的邮费客户您先垫付，如退货请将产品及发票、配件一并寄回。</p>
      <span class="tips">3、换货发货</span>
      <p>我们收到货后48小时内重新寄出换货产品（节假日除外）</p>
      <span class="tips">4、退货退款</span>
      <p>我们收到您退回的商品后，三个工作日内完成退款。</p>
      <img src="../assets/img/help.png" alt="" class="title aa">
      <div class="intro">购物疑问</div>
      <span class="tips">1.商品质量有保障吗？如果出现问题可以找你们吗？</span>
      <p>在茶急送购买的商品，全部是经过厂家授权的正规渠道正品，与您在正规专卖店购买的商品完全一致。如果产品有质量问题，您可以跟我们联系，我们会用心为您做好售后服务。</p>
      <span class="tips">2.如何订购？</span>
      <p>请您拨打我们的客服热线：18560039957，客服人员会为您安排订购；同时您也可以登陆我们的小程序自行订购。</p>
      <span class="tips">3.为什么我喜欢的产品会遇上缺货呢？</span>
      <p>有时的确会有这种情况发生，这也是茶急送对客户感到非常抱歉的地方，不能及时把您中意的产品送到您手中，同时也抱歉的地方，不能及时把您中意的产品送到您手中，同时也们，对于每一种缺货我们都会积极为客户去备货，具体到货时间可咨询客服人员。</p>
      <span class="tips">4.我的订单已经下了几天了，为什么还收不到货</span>
      <p>如遇此类情况，建议您可以联系茶急送客服进行咨询，电话：18560039957</p>
      <span class="tips">5.如何获得发票</span>
      <p>(1) 电话订购时，确认好所需要的产品后，请将您的发票抬头及电子邮箱提供给客服人员，电子发票将在3个工作日内发送到您指定的电子邮箱。</p>
      <p>(2) 如您在网站订购，请在订单备注处填写详细发票抬头及电子邮箱。电子发票将在3个工作日内发送到您指定的电子邮箱。</p>
      <span class="tips">6.如果收到的商品不满意怎么办？是否可以办理退换货？</span>
      <p>自您签收商品之日7日内，茶急送将无条件为您办理退换货服务，详情可见退换货原则。</p>
      <span class="tips">7.如何办理退换货</span>
      <p>如果您的订单需要办理退换货，请您务必通过电话或邮件方式与我们的客服中心联系，点击查看如何退换货。售后电话：18560039710</p>
      <div class="intro">投诉通道</div>
      <span class="tips">如果您对我们有任何建议或不满，非常欢迎您与我们请联系，我们将在三个工作日内为您处理并给您回复，非常感谢您对我们的督促和支持。</span>
      <p>1、进入“我的账户——投诉与建议”，请将您的投诉与建议发送给我们。</p>
      <p>2、我们的邮件：chajisong2018@sohu.com</p>
      <p>3、我们的电话：18560039710(工作时间：周一至周六9:00--21:00</p>
      <div class="intro">退换货流程</div>
      <span class="tips">有关商品、订单查询等问题请各位用户尽量将邮件发送到客户服务信箱和客户满意监督信箱，以便获得最快的回复！</span>
      <div class="intro">茶急送订购热线</div>
      <span class="tips">订购、咨询等，请拨打茶急送订购热线：18560039957</span>
      <div class="intro">茶急送售后热线</div>
      <span class="tips">退换货、投诉等，请拨打茶急送售后热线：18560039710</span>
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
    document.title = '帮助'
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
  text-align left 
  box-shadow: 0 0 5px 0 #F3F3F3;
  padding-bottom l(10)
  .content
    background: #FFFFFF;
    padding l(25) 4.3%
    .title.aa
      margin l(20) l(100) l(30)
    .title
      display block
      width l(155)
      height l(16)
      margin 0 l(100)
    .intro
      fz(14)
      color: #333333;
      letter-spacing: 0.21px;
      padding l(10) 0
      font-family: PingFangSC-Medium;
    .tips
      display block
      color #282828
      fz(13)
      margin-bottom l(5)
      line-height l(20)
      font-family: PingFangSC-Regular;
    p
      font-size: 13px;
      color: #2A2A2A;
      letter-spacing: 0.21px;
      line-height: 20px;
      margin-bottom l(8)
      font-family: PingFangSC-Regular;
    .table  
      width 100%
      height l(177)
      display block
    
</style>
