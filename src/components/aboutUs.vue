<template>
  <div class="con">
    <div class="content">
      <div class="logo"></div>
      <ul class="list">
        <li>
          <div class="circle"></div>
          <div class="word">
            <p>"茶急送"于2018年12月上线，打造特色专业选茶与评茶环节，融合新媒体，首创茶产业新型专业新零售平台。</p>
          </div>
        </li>
        <li>
          <div class="circle"></div>
          <div class="word">
            <p>2018年，茶急送以全新模式切入，致力于互联网+茶叶的发展，打造茶业电商知名品牌。</p>
            <p> "茶急送"会继续努力，成为最懂你的茶叶平台，为你呈现一泡良心好茶。</p>
          </div>
        </li>
        <li>
          <div class="circle"></div>
          <div class="word">
            <p>在目前茶行业鱼龙混杂的现状下，茶急送打造最专业的选茶师团队和评茶师团队，深入各大产地，层层筛选，基于新型电子商务平台，融合新媒体理念，促进整个茶产业专业化分工，打通供应端到零售端的直线交易，达成上下游最优资源的配置，"看到即喝到"，为消费者呈现一泡货真价实的品质好茶，让每位茶客都享受到茶的乐趣！</p>
          </div>
        </li>
      </ul>
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
    document.title = '关于我们'
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
  height 89vh
  background  #F7F7F7;
  border-top 1px solid #E8E8E8
  text-align left 
  .content
    height 100%
    background: #FFFFFF;
 
    .logo
      height l(135)
      backgroundIcon ('us.png')
    ul
      padding l(10) 4.3% 0
      li
        overflow hidden
        padding 0 0 l(20)
        fz(13)
        color: #282828;
        letter-spacing: l(0.28)
        line-height: l(22)
        .circle
          width l(6)
          height l(6)
          background #FFBD9E
          border-radius 50%
          float left
          margin-top l(5)
        .word
          width 95%
          float right 
</style>
