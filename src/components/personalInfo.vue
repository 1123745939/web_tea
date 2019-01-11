<template>
  <div class="con">
    <div class="content">
      <!-- 头像 -->
      <div class="photo">
        <input type="file" accept="image/*"  id="photoInput" @change="tirggerFile($event)">
        <div class="left">
          <img src="../assets/img/touxiang@1x.png" alt="">头像
        </div>
        <div class="right">
          <img src="../assets/img/photo-no.png" alt="" class="tou" v-if="havePhoto">
          <img :src="photoSrc" alt="" class="tou" v-else>
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
      <!-- 昵称 -->
      <div class="photo" @click="show5 = true">
        <div class="left">
          <img src="../assets/img/nicheng@1x.png" alt="">昵称
        </div>
        <div class="right">
          <span>{{nickname}}</span>
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
      <!-- 性别 -->
      <div class="photo" @click = "show2 = true">
        <div class="left">
          <img src="../assets/img/xingbie@1x.png" alt="">性别
        </div>
        <div class="right">
          <span>{{sex}}</span>
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
      <!-- 地区 -->
      <div class="photo" @click = "show6 = true">
        <div class="left">
          <img src="../assets/img/diqu@1x.png" alt="">地区
        </div>
        <div class="right">
          <span>{{address}}</span>
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
      <!-- 手机号 -->
      <div class="photo"  @click="$router.push('/changePhone')">
        <div class="left">
          <img src="../assets/img/shoujihao@1x.png" alt="">手机号
        </div>
        <div class="right">
          <span>{{tel}}</span>
          <img src="../assets/img/more1.png" alt="" class="more1">
        </div>
      </div>
      <!-- 更换密码 -->
      <div class="photo" @click="$router.push('/changePass')">
        <div class="left">
          <img src="../assets/img/suo1.png" alt="">更换密码
        </div>
        <div class="right">
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="photo"  @click="$router.push('/address')">
        <div class="left">
          <img src="../assets/img/dizhi@1x.png" alt="">收货地址
        </div>
        <div class="right">
          <span>{{ifHasAddress ? '查看':'去添加'}}</span>
          <img src="../assets/img/more1.png" alt="">
        </div>
      </div>
      <div class="save" @click="showLoginOut = true">退出登录</div>
    </div>
    <!-- 昵称弹框 -->
    <div v-transfer-dom>
      <confirm v-model="show5" show-input ref="confirm5" title="修改昵称"  @on-confirm="onConfirm5" @on-show="onShow5">
      </confirm>
    </div>
    <!-- 地区弹框 -->
    <div v-transfer-dom>
      <confirm v-model="show6" show-input ref="confirm6" title="修改地区"  @on-confirm="onConfirm6" @on-show="onShow6">
      </confirm>
    </div>
    <!-- 性别弹框 -->
    <actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>
    <!-- 确定退出的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="showLoginOut" title="" @on-confirm="loginOuter">
        <p style="text-align:center;">确定要退出吗</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import {addressInfo,getMyInfo,updataPhoto,updataName,updataSex,updataAddress,loginOut,getAddress} from '../api/api.js'
import {  Actionsheet ,Confirm,TransferDomDirective as TransferDom} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Actionsheet,
    Confirm,
  },
  data () {
    return {
      token:sessionStorage.getItem('token')||'',
      havePhoto :false,
      photoSrc :'',
      show5:false,
      show6:false,
      nickname :'请设置',
      menus2:['男','女'],
      show2:false,
      sex:'',
      tel:'',
      address:'',
      showLoginOut:false,
      img:'',
      ifHasAddress:false,
    }
  },
  created(){
    document.title = '个人信息'
    this.getUserInfo()
    this.getAddressList()
  },
  methods:{    
    getUserInfo(){
      getMyInfo({token:this.token}).then(res=>{
        console.log(res)
        if(!res.data.data.img_link){
          this.havePhoto = false
        }
        if(!res.data.data.sex){
          this.sex = '请选择性别'
        }else if(res.data.data.sex==1){
          this.sex = '男'
        }else{
          this.sex = '女'
        }
        this.photoSrc = res.data.data.img_link
        console.log(this.photoSrc)
        this.tel = res.data.data.mobile
        res.data.data.nickname ? this.nickname = res.data.data.nickname : this.nickname ="请设置"
        res.data.data.address ? this.address = res.data.data.address : this.address ="请完善地址"
        
      })
    },
    //init  有没有地址
    getAddressList(){
      const options = {
        token:this.token
      }
      console.log(this.token)
      getAddress(options).then(res=>{
        console.log(res)
        if(res.data.code == 200 && !res.data.error_code){    
          if(res.data.data.address.length){
            this.ifHasAddress = true
          }
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      })
    },
    //头像   
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
        filename:base,
        user_photo :name
      }
      updataPhoto(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          // this.photoSrc = this.img;
          console.log(this.photoSrc)
           var imgs=name.replace(/-/g,'+');
              imgs=imgs.replace(/\s+/g,'=')
              imgs=imgs.replace(/_/g,'/')
              this.photoSrc = imgs
          this.havePhoto = false
          this.$vux.toast.text('头像修改成功')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //昵称
    onShow5(){
      this.$refs.confirm5.setInputValue(this.nickname)
    },
    onConfirm5 (value) {
      this.$refs.confirm5.setInputValue('')
      console.log(value)
      const options = {
        token :this.token,
        nickname :value
      }
      updataName(options).then(res=>{
         if(res.data.code == 200 && !res.data.error_code){
          this.nickname = value
          sessionStorage.username = value
          this.$vux.toast.text('昵称修改成功', 'middle')
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      })
    },
     //性别
    click(key){
      console.log(key)
      const options = {
        token : this.token,
        sex : key== 0 ? 1:2
      }
      console.log(options)
      updataSex(options).then(res=>{
         if(res.data.code == 200 && !res.data.error_code){
          key == 0 ? this.sex ='男' :this.sex ='女'
          this.$vux.toast.text('性别修改成功', 'middle')
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      })
    },
    //地区
    onShow6(){
      this.$refs.confirm6.setInputValue(this.address)
    },
    onConfirm6 (value) {
      this.$refs.confirm6.setInputValue('')
      console.log(value)
      const options = {
        token :this.token,
        address :value
      }
      updataAddress(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.address = value
          this.$vux.toast.text('住址修改成功', 'middle')
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      })
    },
    //退出登录
    loginOuter(){
      loginOut({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$router.push('/login')
          sessionStorage.removeItem('token')
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      })
    }
    
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
  padding l(10) 4.3% 0
  text-align left 
  .content
    height l(656)
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 #E8E8E8;
    border-radius 10px 10px  0 0 
    padding 0 3% 0
    .photo
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #E8E8E8
      padding l(10) 0
      height l(70)
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
    background: #83271F;
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
