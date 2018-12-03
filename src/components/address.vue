<template>
  <div class="con">
    <div class="content">
      <ul v-if="addressList.length>0">
        <li v-for="(item,index) in addressList" :key="item.id">
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
            <div class="default" @click="setDefault(item.id,index)">
              <img src="../assets/img/c_blank.png" alt="" v-if="item.is_default==0">
              <img src="../assets/img/c_active.png" alt="" v-else>
              设为默认
            </div>
          </div>
          <div class="a_r">
            <div @click="editAddress(item)">
              <img src="../assets/img/edit.png" alt="">编辑
            </div>
            <div class="del" @click="delAddress(item.id)"> 
              <img src="../assets/img/del.png" alt="">删除
            </div>
          </div>
        </li>
      </ul>
      <div class="addPlue" @click="$router.push({path:'/addressAdd',query:{type:'add'}})">
        + 添加新地址
      </div>
    </div>
  </div>
</template>

<script>
import {getAddress,defaultAddress,deleteAddress} from '../api/api.js'
export default {
  data () {
    return {
      token : sessionStorage.token,
      addressList:[],
    }
  },
  created(){
    document.title = '地址'
    this.getAddressList()
  },
  methods:{
    getAddressList(){
      const options = {
        token:this.token
      }
      console.log(this.token)
      getAddress(options).then(res=>{
        console.log(res)
        if(res.data.code == 200 && !res.data.error_code){
          this.addressList = res.data.data.address
          console.log(this.addressList)
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
  padding  l(10) 0 l(20)
  .content
    height l(636)
    background #fff
    overflow-y scroll
    box-shadow: 0 0 5px 0 #E8E8E8;
    ul
      padding 0 4.3%
      li
        disFlex ()
        padding l(20) 0
        border-bottom  2px solid #E8E8E8;
        .a_l
          width 85%
          padding-right l(20)
          border-right 2px solid #E8E8E8
          .a
            display flex
            justify-content flex-start
            align-items center
            padding l(5) 0
            p
              width l(70)
              fz(14)
              color: #333333;
              letter-spacing: 0.16px;
              line-height l(20)
              text-align left 
              font-weight 700
            span 
              fz(14)
              color: #333333;
              letter-spacing: 0.3px;
              line-height: l(20)
            span.name
              padding-right l(10)
            span.add
              display block
              width l(200)
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
      color: #83271F;
      letter-spacing: 0.16px;
      line-height l(18)
      padding l(20) 4.3%
      text-align right 
    

</style>
