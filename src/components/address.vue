<template>
  <div class="con">
    <div class="content"  v-if="addressList.length>0">
      <swipeout>
        <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow" v-for="(item,index) in addressList" :key="item.id" @click="go(item)">
          <div slot="right-menu">
            <swipeout-button @click.native="editAddress(item)" type="primary">编辑</swipeout-button>
            <swipeout-button @click.native="delAddress(item.id)" type="warn">删除</swipeout-button>
          </div>
          <div slot="content" class="demo-content vux-1px-t">
            <li>
              <div class="a_l">
                <div class="a">
                  <p>收货人：</p>
                  <span class="name">{{item.username}}</span>
                  <span class="tel">{{item.mobile}}</span>
                </div>
                <div class="a">
                  <p>地址：</p>
                  <span class="add">{{item.addr_content}}{{item.addr_detail}}</span>
                </div>
                <div class="default" @click.stop="setDefault(item.id,index)">
                  <img src="../assets/img/c_blank.png" alt="" v-if="item.is_default==0">
                  <img src="../assets/img/c_active.png" alt="" v-else>
                  设为默认
                </div>
              </div>
            </li>
          </div>
        </swipeout-item>
      </swipeout>
      <div class="addPlue" @click="$router.push({path:'/addressAdd',query:{type:'add'}})">
        + 添加新地址
      </div>
    </div>
    <div class="noList" v-else>
    <div class="box">
      <img src="../assets/img/symbols-add.png" alt="">
      <span>还没有收货地址</span>
      <p @click="$router.push('/addressAdd')">去添加</p>
    </div>
  </div>
  <footers :index = 2></footers>
  </div>
</template>

<script>
import footers from './footers'
import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
import utils from '../utils/js/style.js'
import {getAddress,defaultAddress,deleteAddress, thumbsList} from '../api/api.js'
export default {
  components: {
    GroupTitle,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton,
    footers
  },
  data () {
    return {
      token : localStorage.token || '',
      addressList:[],
    }
  },

  created(){
    document.title = '地址'
    this.getAddressList()
  },
  methods:{
    go(item){
      // if(this.$route.query.fromPage == 'pay'){
      //   this.$router.push('/pay')
      //   sessionStorage.address = JSON.stringify(item)
      //   sessionStorage.is_from_addlist = true
      // }
      this.$router.push('/pay')
      sessionStorage.address = JSON.stringify(item)
      sessionStorage.is_from_addlist = true
    },
    //init
    getAddressList(){
      const options = {
        token:this.token
      }
      console.log(this.token)
      getAddress(options).then(res=>{
        console.log(res)
        if(res.data.code == 200 && !res.data.error_code){
          this.addressList = res.data.data.address
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      })
    },
    //设为默认
    setDefault(id,index){
      const options = {
        token :this.token,
        addr_id:id
      }
      defaultAddress(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('已设为默认地址', 'middle')
          this.addressList.forEach((ele,i)=>{
            ele.is_default = 0
            if(i==index){
              ele.is_default =1
            }
          })
          console.log(this.addressList)
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      })
    },
    //删除
    delAddress(id){
      const options = {
        token :this.token,
        addr_id:id
      }
      deleteAddress(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('地址已删除', 'middle')
          this.getAddressList()
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      })
    },
    //编辑
    editAddress(item){
      this.$router.push({path:'/addressAdd',query:{type:'edit'}})
      sessionStorage.addItem = JSON.stringify(item)
    },
    onButtonClick (type) {
      alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  border-top 1px solid  #E8E8E8
  height 100vh
  padding  l(10) 0 0
  .content
    height 100%
    background #fff
    overflow-y scroll
    box-shadow: 0 0 5px 0 #E8E8E8;
    ul,.demo-content
      padding 0 4.3%
      li
        disFlex ()
        padding l(20) 0
        border-bottom  2px solid #E8E8E8;
        .a_l
          width 100%
          padding-right l(20)
          .a
            overflow hidden
            padding l(5) 0
            p
              width l(70)
              fz(14)
              color: #333333;
              letter-spacing: 0.16px;
              line-height l(20)
              text-align left 
              font-weight 700
              float left
            span 
              fz(14)
              color: #333333;
              letter-spacing: 0.3px;
              line-height: l(20)
              float left
            span.name
              padding-right l(10)
            span.add
              display block
              width l(250)
              text-align left 
          .default.active
            color: #83271F;
          .default
            display flex
            justify-content flex-start
            align-items center
            padding l(8) 0
            fz(13)
            color: #666666;
            letter-spacing: 0.16px;
            line-height l(18)
            img 
              display block
              width l(18)
              height l(18)
              margin-right l(10)
        .a_r
          div.del
            margin-top l(10)
          div
            fz(11)
            color: #666666;
            letter-spacing: 0.24px;
            line-height l(16)
            display flex
            flex-direction column
            align-items center
            img 
              display block
              width l(21)
              height l(21)
              margin-bottom l(8)
    .addPlue
      fz(13)
      color: #FF5100;
      letter-spacing: 0.16px;
      line-height l(18)
      padding l(20) 4.3%
      text-align right 
    
  .noList
    width l(175)
    height l(280)
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    div
      width 100%
      height 100%
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      img 
        display block
        width l(170)
        height l(170)
      span 
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #BABABA;
        letter-spacing: 1px;
      p
        width l(160)
        height l(44)
        background: #83271F;
        border-radius: 100px;
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 1.12px;
        line-height l(44)
</style>
