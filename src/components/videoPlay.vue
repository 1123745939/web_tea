<template>
  <div class="con">
    <!--   背景图 
         autoplay="autoplay"
              style="object-fit:fill"
                 playsinline="true"
    -->
    <div>
      <video :src="videoSrc"  
       x5-video-player-type="h5" 
       preload="auto" 
       x5-video-player-fullscreen="false" 
       x5-video-orientation="landscape" 
       controls="controls" 
       id="video_content" 
       playsinline="true" 
       style="object-fit: fill;"  
       webkit-playsinline="true"
       :poster="imgSrc"
       >
      </video>

      <!-- <video :poster="imgSrc" id="video" controls x5-video-player-type="h5">
    　　<source :src="videoSrc" type="video/mp4">当前浏览器不能支持视频播放，请采用chrome或IE9以上浏览器
    </video> -->

      <!-- <div class="left" @click="con">
        立即购买
      </div>
      <div class="right" @click="con2">
        点赞
      </div> -->
      <!-- <video src="../assets/img/A-TEEN.mp4" autoplay width="100%" controls x5-video-player-type="h5" x5-video-orientation="landscape"></video> -->
    </div>
  </div>
</template>

<script>
import {getGoodDetail} from '../api/api.js'
import {Login} from '../api/api.js'
import $ from 'jquery'
export default {
  data () {
    return {
      token : sessionStorage.token || '',
      id:'',
      videoSrc:'',
      imgSrc:''
    }
  },
  created(){
    document.title = '视频'
    this.id = this.$route.query.id
    this.init(this.id)


   
    // this.$nextTick(() => {
    //   // alert('现在是竖着')
    //     $('video').attr('height', window.innerHeight);
    //     $('video').attr('width', window.innerWidth);

    //     $(window).resize(function() {
    //       //alert('现在横着了')
    //       alert(window.innerWidth)
    //       $('video').attr('height', window.innerWidth);
    //       $('video').attr('width', window.innerHeight);
    //     });
    // })
   


  },
  mounted(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      //this.videoFullScreen();
      //console.log('ios')
    }else{
      //console.log('adriod')
    }


    //  window.addEventListener("orientationchange", function() {
    // // Announce the new orientation number
    // alert(window.orientation);

    // }, false);

    if (window.orientation == 90 || window.orientation == -90) {
      alert('苹果竖着')
    }else if (window.orientation == 0 || window.orientation == 180) {
      alert('苹果横着')
    }

  },
  methods:{
    init(id){
      getGoodDetail({id:id}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          console.log(res.data.data)
          this.videoSrc = res.data.data.detail.tea_vidio_link
          this.imgSrc = res.data.data.detail.tea_img_link
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    con(){
      alert('快色购买哦')
    },
    con2(){
      alert('点赞点赞点赞')
    }
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
      height l(250)
      position absolute
      top 0px
      left 0
      z-index 99
      // object-fit fill
    
    // .left
    //   position absolute
    //   width 100px
    //   height 200px
    //   left 0
    //   top 0px
    //   z-index 999
    // .right
    //   position absolute
    //   right 0
    //   bottom 0
    //   width 100px
    //   height 200px
    //   z-index 999
</style>
