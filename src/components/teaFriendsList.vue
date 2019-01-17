<template>
  <div class="con">
    <!-- 头部 -->
    <div class="content">
      <ul>
        <li v-for="item in list" :key="item.friend_id" @click="$router.push({path:'/teaFriend',query:{id:item.user.id}})">
          <div class="top">
            <div class="left">
              <img :src="item.user.img_link" alt="">{{item.user.username}}
            </div>
            <div class="right"></div>
          </div>
          <div class="bottom" v-if="item.notifies.length">
            <img src="../assets/img/logo.png" alt="">{{item.notifies[0].target_type}}
            <span>{{item.notifies[0].notify_content}}</span>
          </div>
        </li>         
      </ul>
    </div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import {friendsList} from '../api/api.js'
export default {
  data () {
    return {
      token : utils.getCookie('token') || '',
      list:[]
    }
  },
  created(){
    document.title = '茶友'
    this.init()
  },
  methods:{
    init(){
      friendsList({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.list = res.data.data
          console.log(res)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
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
  background #F7F7F7
  padding l(10) 0 0
  border-top  1px solid #E8E8E8
  .content
    height l(656)
    background #ffffff
    overflow-y scroll
    padding 0 4.3% l(20)
    box-shadow: 0 0 5px 0 #F3F3F3;
    ul
      li:last-of-type
        border-bottom 0
      li
        padding l(15) 0
        border-bottom 1px solid #E8E8E8
        .top
          disFlex ()
          margin-bottom l(10)
          .left 
            disFlex ()
            fz(16)
            color: #333333;
            letter-spacing: 0.32px;
            img 
              display block
              width l(47)
              height l(47)
              border-radius 50%
              margin-right l(10)
          .right
            width l(60)
            height l(30)
            backgroundIcon ('people.png')
        .bottom
          display flex
          justify-content flex-start
          align-items center
          img 
            display block
            width l(18)
            height l(18)
            fz(14)
            color: #000000;
            letter-spacing: 0.32px;
            margin-right l(5)
          span 
            fz(14)
            color: #666666;
            letter-spacing: 0.32px;
            margin-left l(10)
</style>
