<template>
  <div class="con">
    <div class="content">
      
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
    document.title = '投诉建议'
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
  height l(597)
  background  #F7F7F7;
  border-top 1px solid #E8E8E8
  text-align left 
  .content
    height 100%
    background: #FFFFFF;
    .logo
      height l(145)
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
