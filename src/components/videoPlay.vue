<template>
  <div class="con">
    <!-- poster="../assets/img/list1.png"  背景图 -->
    <div>
      <video :src="videoSrc"  
        preload="auto" 
        x5-video-player-fullscreen="false" 
        x5-video-orientation="landscape"
        style="object-fit:fill"
        controls="controls"
        autoplay="autoplay">
      </video>
      <!-- 遮罩 -->

        <div class="left">
          立即购买
        </div>
        <div class="right">
          点赞
        </div>
      <!-- <video src="../assets/img/A-TEEN.mp4" autoplay width="100%" controls x5-video-player-type="h5" x5-video-orientation="landscape"></video> -->
    </div>
  </div>
</template>

<script>
import {getGoodDetail} from '../api/api.js'
import {Login} from '../api/api.js'
export default {
  data () {
    return {
      token : sessionStorage.token || '',
      id:'',
      videoSrc:''
    }
  },
  created(){
    document.title = '视频'
    this.id = this.$route.query.id
    this.init(this.id)
  },
  methods:{
    init(id){
      getGoodDetail({id:id}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          console.log(res.data.data)
          this.videoSrc = res.data.data.detail.tea_vidio_link
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  height l(667)
  overflow-y scroll
  border-top 1px solid  #E8E8E8
  padding-top l(10)
  div 
    width 100%
    height 100%
    position relative
    video 
      width 100%
      height 100%
      position absolute
      top 0px
      left 0
    
    .left
      position absolute
      width 100px
      height 200px
      left 0
      top 0px
    .right
      position absolute
      right 0
      bottom 0
      width 100px
      height 200px
</style>
