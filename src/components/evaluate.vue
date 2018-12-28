<template>
  <div class="con">
    <!-- 头部 -->
     <div class="e_h">
        <div class="box">
          <div class="li_m">
            <div class="t_img">
              <img src="../assets/img/play.png" alt="">
            </div>
            <div class="t_info">
              <p>{{goodObj.tea_title}}</p>
              <span>{{goodObj.tea_date}} {{goodObj.tea_period}}</span>
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
        <input type="file" accept="image/*"  id="photoInput" @change="tirggerFile($event)">
      </div>
      <div class="vi" v-if="!ifSuccess">
        <img src="../assets/img/add_video.png" alt="">
        <input type="file" accept="video/*"  id="photoInput" @change="tirggerVideo($event)">
      </div>    
      <div class="vi" v-else>
        <video :src="videoSrc"></video>
        <div @click="delVideo"></div>
      </div>  
      <video :src="videoSrc1" style="display:none" id="videoPlayer"></video>   
    </div>
    <span class="save" @click="submit()">保存</span>
  </div>
</template>

<script>
import { orderUploadImg , orderUploadVidio ,orderDelComment ,orderAddComment ,orderCanComment} from '../api/api.js'
export default {
  data () {
    return {
      token: sessionStorage.token || '',
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
     console.log(this.token)
    document.title = '发表评价'
    this.init()
  },
  methods:{
    //渲染需要评价的产品
    init(){
      if(!sessionStorage.orderComment){
        this.ifFromMy = true
        this.orderComment(this.index)
      }else{
        this.ifFromMy = false
        this.goodObj = JSON.parse(sessionStorage.orderComment)
      }
    },
    //当从我的页面点击进来的话 ，此页面的渲染需要从后台获取可评价订单的数据
    orderComment(){
      console.log(this.token)
      orderCanComment({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.commentList = res.data.data
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
    //上传图片
    tirggerFile:function(e){
      var that=this;
      console.log(e)
      console.log("ssssssssssss");
      var file = e.target.files[0];
      var filename = e.target.files[0].name
      console.log(filename)
      var imgSize=file.size/1024;
      if(imgSize>200){
        // 图片压缩
        // alert('请上传大小不要超过200KB的图片')
        that.photoCompress(file, {
          quality: 0.2
        }, function(base64Codes){
          console.log("压缩后：" + base64Codes.length / 1024 + " " + base64Codes);
          this.img = dataURL
          var imgs=dataURL.replace(/\+/g,'-');
              imgs=imgs.replace(/=/g,'')
              imgs=imgs.replace(/\//g,'_')

          that.uploadPhoto(filename,imgs);
          // var bl = convertBase64UrlToBlob(base64Codes);
          // form.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
        });
      }else {
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          console.log(dataURL,'url');
          this.img = dataURL
           var  imgs=dataURL.replace(/\+/g,'-');
                imgs=imgs.replace(/=/g,'')
                imgs=imgs.replace(/\//g,'_')
          that.uploadPhoto(filename,imgs);
        }
      }
    },
    photoCompress(file,w,objDiv){
      var that = this;
      var ready=new FileReader();
      /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
      ready.readAsDataURL(file);
      ready.onload=function(){
        var re=this.result;
        that.canvasDataURL(re,w,objDiv)
      }
    },
    // 图片压缩
    canvasDataURL(path, obj, callback){
      var img = new Image();
      img.src = path;
      img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = h;
        var anh = document.createAttribute("height");
        anh.nodeValue = w;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.transform(0, 1, 1, 0, 0, 0);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        console.log(base64);
        callback(base64);
      }
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
        comment_type :'video'
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
      var images = JSON.stringify(this.imgUrlList)
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
            fz(12)
            color: #333333;
            letter-spacing: 0.17px;
            display flex
            justify-content flex-start
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
    background: #83271F;
    border-radius: 100px;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 1.12px;
    line-height l(44)
    margin-top l(60)
    margin-left 30%
</style>
