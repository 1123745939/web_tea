<template>
  <div class="con">
    <div>
      <video src="../assets/img/A-TEEN.mp4" 
        poster="../assets/img/list1.png" 
        preload="auto" 
        x5-video-player-fullscreen="false" 
        x5-video-orientation="landscape"
        style="object-fit:fill"
        controls="controls"
        autoplay="autoplay">
      </video>

      <!-- <video src="../assets/img/A-TEEN.mp4" autoplay width="100%" controls x5-video-player-type="h5" x5-video-orientation="landscape"></video> -->
    </div>
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
    document.title = '视频'
   
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
  height l(667)
  overflow-y scroll
  border-top 1px solid  #E8E8E8
  padding-top l(10)
 

</style>
