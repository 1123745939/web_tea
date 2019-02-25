<template>
  <div class="con">
    <!-- 头部 -->
     <div class="e_h">
        <div class="box">
          <div class="li_m">
            <div class="t_img" :style="{background:'url(' + goodObj.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>{{goodObj.tea_title}}</p>
              <span>{{goodObj.tea_date}}</span>
              <div class="in_num">
                <p>￥<span>{{goodObj.tea_price|| goodObj.order_price}}</span>.00</p>
              </div>
            </div>
           <img src="../assets/img/more1.png" alt="" class="j_r" v-show="ifFromMy" @click="nextOrder">
          </div>            
        </div>
     </div>
    <!-- 评论区 -->
    <textarea placeholder="请输入评价" v-model="txt"></textarea>
    <!-- 图片 -->
    <div class="up_file">图片（可选，最多三张）</div>
    <div class="bigBox">
      <ul class="up_img" v-show="imgList.length">
        <li v-for="(item,index) in imgList" :key="index">
          <img :src="item.url" alt="">
          <div @click="delImg(item.url,index)"></div>
        </li>
      </ul>
      <div class="addphoto" v-show="imgList.length<3">
        <img src="../assets/img/add_proto.png" alt="">
        <input type="file" accept="image/*"  id="photoInput" @change="upload($event)">
      </div>
      <div class="vi" v-if="!ifSuccess">
        <img src="../assets/img/add_video.png" alt="">
        <input type="file" accept="video/*"  id="photoInput" @change="tirggerVideo($event)">
      </div>    
      <div class="vi" v-else>
        <video :src="videoSrc" poster="../assets/img/play.png"></video>
        <div @click="delVideo"></div>
      </div>  
      <video :src="videoSrc1" style="display:none" id="videoPlayer"></video>   
    </div>
    <span class="save" @click="submit()">保存</span>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import Exif from 'exif-js'
import { orderUploadImg , orderUploadVidio ,orderDelComment ,orderAddComment ,orderCanComment} from '../api/api.js'
export default {
  data () {
    return {
      token : localStorage.token || '',
      txt:'',
      imgList:[],
      imgUrlList:[],
      videoSrc:'',
      videoSrc1:'',
      ifSuccess:false,
      goodObj:{},
      ifFromMy:false,
      index :0,
      commentList:[]
    }
  },
  created(){
    document.title = '发表评价'
    this.init()
  },
  methods:{
    //渲染需要评价的产品
    init(){
      if(!sessionStorage.orderComment){
        this.ifFromMy = true
        this.orderComment()
      }else{
        this.ifFromMy = false
        this.goodObj = JSON.parse(sessionStorage.orderComment)
      }
    },
    //当从我的页面点击进来的话 ，此页面的渲染需要从后台获取可评价订单的数据
    orderComment(){
      orderCanComment({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.commentList = res.data.data
          this.commentList.forEach(item=>{
            item.tea_id = item.id
            item.id = item.order_id
          })
          this.goodObj = this.commentList[0]
          console.log(res,'res')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //点击右箭头 切换至下一个可以评论的订单
    nextOrder(){
      ++this.index  
      if(this.index == this.commentList.length){
        this.$vux.toast.text('已经是最后一个可以评价的订单了')
        return
      }
      this.goodObj = this.commentList[this.index]
    },

    //new   上传图片
    upload (e) {  
      let files = e.target.files || e.dataTransfer.files;
      var filename = e.target.files[0].name
      if (!files.length) return;  
      this.imgPreview(files[0],filename);  
    }, 
    imgPreview (file,name) {  
      let that = this;  
      let Orientation;  
      //去获取拍照时的信息，解决拍出来的照片旋转问题  
      Exif.getData(file, function(){  
          Orientation = Exif.getTag(this, 'Orientation');  
      });  
      // 看支持不支持FileReader  
      if (!file || !window.FileReader) return;  
  
      if (/^image/.test(file.type)) {  
          // 创建一个reader  
          let reader = new FileReader();  
          // 将图片2将转成 base64 格式  
          reader.readAsDataURL(file);  
          // 读取成功后的回调  
          reader.onloadend = function () {  
            let result = this.result;  
            let img = new Image();  
            img.src = result;  
            //判断图片是否小于100K,是就直接上传，反之压缩图片  
            if (this.result.length <= (100 * 1024)) {
              var imgs=this.result.replace(/\+/g,'-');
              imgs=imgs.replace(/=/g,'')
              imgs=imgs.replace(/\//g,'_')
              that.uploadPhoto(name,imgs);               
            }else { 
              img.onload = function () {  
                let data = that.compress(img,Orientation);  
                console.log(data) 
                var imgs=data.replace(/\+/g,'-');
                imgs=imgs.replace(/=/g,'')
                imgs=imgs.replace(/\//g,'_')    
                that.uploadPhoto(name,imgs);      
              }  
            }  
          }   
        }  
      },  
     rotateImg (img, direction,canvas) {  
      //最小与最大旋转方向，图片旋转4次后回到原方向      
      const min_step = 0;      
      const max_step = 3;        
      if (img == null)return;      
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错      
      let height = img.height;      
      let width = img.width;        
      let step = 2;      
      if (step == null) {      
         step = min_step;      
      }      
      if (direction == 'right') {      
          step++;      
          //旋转到原位置，即超过最大值      
          step > max_step && (step = min_step);      
      } else {      
          step--;      
          step < min_step && (step = max_step);      
      }       
      //旋转角度以弧度值为参数      
      let degree = step * 90 * Math.PI / 180;      
      let ctx = canvas.getContext('2d');      
      switch (step) {      
        case 0:      
            canvas.width = width;      
            canvas.height = height;      
            ctx.drawImage(img, 0, 0);      
            break;      
        case 1:      
            canvas.width = height;      
            canvas.height = width;      
            ctx.rotate(degree);      
            ctx.drawImage(img, 0, -height);      
            break;      
        case 2:      
            canvas.width = width;      
            canvas.height = height;      
            ctx.rotate(degree);      
            ctx.drawImage(img, -width, -height);      
            break;      
        case 3:      
            canvas.width = height;      
            canvas.height = width;      
            ctx.rotate(degree);      
            ctx.drawImage(img, -width, 0);      
            break;  
      }      
    },
    compress(img,Orientation) {  
      let canvas = document.createElement("canvas");  
      let ctx = canvas.getContext('2d');  
        //瓦片canvas  
      let tCanvas = document.createElement("canvas");  
      let tctx = tCanvas.getContext("2d");  
      let initSize = img.src.length;  
      let width = img.width;  
      let height = img.height;  
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
      let ratio;  
      if ((ratio = width * height / 4000000) > 1) {  
        console.log("大于400万像素")  
        ratio = Math.sqrt(ratio);  
        width /= ratio;  
        height /= ratio;  
      } else {  
        ratio = 1;  
      }  
      canvas.width = width;  
      canvas.height = height;  
  //        铺底色  
      ctx.fillStyle = "#fff";  
      ctx.fillRect(0, 0, canvas.width, canvas.height);  
      //如果图片像素大于100万则使用瓦片绘制  
      let count;  
      if ((count = width * height / 1000000) > 1) {  
        console.log("超过100W像素");  
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
  //            计算每块瓦片的宽和高  
        let nw = ~~(width / count);  
        let nh = ~~(height / count);  
        tCanvas.width = nw;  
        tCanvas.height = nh;  
        for (let i = 0; i < count; i++) {  
          for (let j = 0; j < count; j++) {  
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
          }  
        }  
      } else {  
        ctx.drawImage(img, 0, 0, width, height);  
      }  
      //修复ios上传图片的时候 被旋转的问题  
      if(Orientation != "" && Orientation != 1){  
        switch(Orientation){  
          case 6://需要顺时针（向左）90度旋转  
              this.rotateImg(img,'left',canvas);  
              break;  
          case 8://需要逆时针（向右）90度旋转  
              this.rotateImg(img,'right',canvas);  
              break;  
          case 3://需要180度旋转  
              this.rotateImg(img,'right',canvas);//转两次  
              this.rotateImg(img,'right',canvas);  
              break;  
        }  
      }  
      //进行最小压缩  
      let ndata = canvas.toDataURL('image/jpeg', 0.1);  
      console.log('压缩前：' + initSize);  
      console.log('压缩后：' + ndata.length);  
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");  
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
      return ndata;  
    }, 
    //上传头像
    uploadPhoto(base,name){
      const options = {
        token :this.token,
        comment_object:name,
        filename :base
      }
      console.log(options)
      orderUploadImg(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          var obj = {}
          obj.name = base
          obj.url = res.data.data
          this.imgUrlList.push(obj.url)
          this.imgList.push(obj)
          console.log(this.imgList,'this.imgList')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //删除某个图片
    delImg(url,index){
      console.log(url)
      var name = url.substring(url.lastIndexOf('/')+1)
      const options = {
        token :this.token,
        comment_object:name,
        comment_type :'image'
      }
      console.log(options)
      orderDelComment(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.imgList.splice(index,1)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //上传视频
    tirggerVideo(e){
      console.log(e,'e')
      if(e.target.files[0].size>=1024*1024*1024){
        this.$vux.toast.text('请选择2M以内的视频')
      }else{
         var video = e.target.files[0];  //选择的文件
          var reader = new FileReader();  
          var rs = reader.readAsDataURL(video); 
          var name = e.target.files[0].name 
          reader.onload = (event) =>{
            var videoSrc = reader.result;
            this.videoSrc1 = videoSrc
            setTimeout(()=>{
              var time = document.getElementById('videoPlayer').duration
              console.log(time,'time')
              if(time>15){
                this.$vux.toast.text('请上传15s之内的视频')
              }else{
                  var video64=videoSrc.replace(/\+/g,'-');
                  video64=video64.replace(/=/g,'')
                  video64=video64.replace(/\//g,'_')
                  console.log(111111111111111)
                  this.uploadVodeo(video64,name)
              }
            },1000)         
          }
      }
    },
    uploadVodeo(video64,name){
      const options = {
        token :this.token,
        comment_vidio:video64,
        filename:name
      }
      orderUploadVidio(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.videoSrc = res.data.data
          this.ifSuccess = true
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //删除视频
    delVideo(){
      var name = this.videoSrc.substring(this.videoSrc.lastIndexOf('/')+1)
      const options = {
        token :this.token,
        comment_object:name,
        comment_type :'vidio'
      }
      orderDelComment(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.videoSrc1 = ''
          this.videoSrc = ''
          this.ifSuccess = false
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //发表评价
    submit(){
      if(!this.txt){
        this.$vux.toast.text('请输入内容')
        return
      }
     
      var a = this.videoSrc ? this.videoSrc.substring(this.videoSrc.lastIndexOf('/')+1) :''
      if(this.imgUrlList){
        var obj = {}
        obj.images = this.imgUrlList
      }
      var images = JSON.stringify(obj)

      const options = {
        token  :this.token,
        tea_id : this.goodObj.tea_id,
        content:this.txt,
        order_id:this.goodObj.id,
        vidio :a,
        images:images
      }
      console.log(options)
      orderAddComment(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('评价成功')
          sessionStorage.removeItem('orderComment')
          sessionStorage.selectIndex = 0
          setTimeout(()=>{
            this.$router.push('/orders')
          },1000)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    }
  },
  beforeRouteLeave(to,from,next){
    sessionStorage.removeItem('orderComment')
    next()
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
            height l(40)
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
            height l(20)
            fz(12)
            color: #333333;
            letter-spacing: 0.17px;
            display flex
            justify-content flex-start
            line-height l(20)
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
    line-height l(30)
    text-align left
  .bigBox
    overflow hidden
    .up_file
      width 100%
      font-size: 14px;
      color: #333333;
      letter-spacing: 0.3px;
      line-height l(15)
      text-align left 
    ul.up_img
      //width 100%
      margin l(10) 0
      //overflow hidden
      li
        width l(100)
        height l(80)
        float left
        position relative
        margin-right l(10)
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
    .addphoto
      width l(100)
      height l(80)
      float left
      margin-right l(10)
      position relative
      img 
        display block
        width 100%
        height 100%
      input 
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        opacity 0
    .vi
      width l(100)
      height l(80)
      display inline-block
      float left
      position relative
      video  
        display block
        width 100%
        height 100%
        object-fit: fill;
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
      input 
        position absolute
        top 0
        left 0
        display block
        width 100%
        opacity 0
        height 100%
  .save
    display block
    width l(160)
    height l(44)
    background: #ff5100;
    border-radius: 100px;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 1.12px;
    line-height l(44)
    margin-top l(60)
    margin-left 30%
</style>
