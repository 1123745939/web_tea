<template>
  <div class="con">
    <div class="content">
      <ul>
        <li>
          <p>收货人</p>
          <input type="text" placeholder="请输入收货人姓名" v-model="uname">
        </li>
        <li>
          <p>联系电话</p>
          <input type="tel" placeholder="请输入11位手机号" v-model="uphone">
        </li>
        <li class="address">        
          <x-address v-model="value"  title="所在地区" :list="addressData" @on-shadow-change="onShadowChange"  placeholder="请选择地址" :show.sync="showAddress"></x-address>
        </li>
        <li>
          <p>详细地址</p>
          <input type="text" placeholder="请输入街道门牌信息" v-model="udetail">
        </li>
      </ul>
      <span class="save" @click="save">保存</span>

   
    </div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import {createAddress,editAddress} from '../api/api.js'
import { XAddress, ChinaAddressV4Data, Value2nameFilter as value2name,Actionsheet ,Icon,Confirm,TransferDomDirective as TransferDom} from 'vux'
export default {
   directives: {
    TransferDom
  },
  components: {
    Actionsheet,
    Icon,
    Confirm,
    XAddress,
  },
  data () {
    return {
      token:sessionStorage.token,
      uname:'',
      uphone:'',
      uaddress:'',
      udetail:'',
      value: [],
      addressData: ChinaAddressV4Data,
      showAddress: false,
      province:'',
      provinceId:'',
      city:'',
      cityId:'',
      distinct:'',
      distinctId:'',
      ifEditAddress : false,
      addressId:''
    }
  },
  created(){
    document.title = '新增地址'
    if(this.$route.query.type == 'edit'){
      this.ifEditAddress = true
      var addressItem = JSON.parse(sessionStorage.addItem)
      this.addressId = addressItem.id
      this.udetail = addressItem.addr_detail
      this.uname = addressItem.username
      this.uphone = addressItem.mobile
      var valueStr = `${addressItem.addr_province_id},${addressItem.addr_city_id},${addressItem.addr_distinct_id},`
      this.value = valueStr.slice(0,valueStr.length-1).split(',')
    }
  },  
  methods:{
    //记录下id和名字
    onShadowChange (ids, names) {
      this.provinceId = ids[0]
      this.cityId = ids[1]
      this.distinctId = ids[2]
      this.province = names[0]
      this.city = names[1]
      this.distinct = names[2]
    },
    //点击确定的时候
    save(){
      this.ifEditAddress ? this.saveEdit():this.saveAdd()
    },
    //编辑后保存
    saveEdit(){
      if(!this.uname){
        this.$vux.toast.text('请输入收货人姓名', 'middle')
        return
      }if(!utils.regPhone(this.uphone)){
        this.$vux.toast.text('请输入正确手机号', 'middle')
        return
      }if(!this.udetail){
        this.$vux.toast.text('请输入详细地址', 'middle')
        return
      }
      const options = {
        token:this.token,
        province_id :this.provinceId,
        province:this.province,
        city_id:this.cityId,
        city:this.city,
        distinct_id:this.distinctId,
        distinct:this.distinct,
        addr_detail:this.udetail,
        username:this.uname,
        mobile:this.uphone,
        addr_id :this.addressId
      }
      editAddress(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('地址修改成功', 'middle')
          sessionStorage.removeItem('addItem')
          setTimeout(()=>{
            this.$router.push('/address')
          },1000)
        }else{
          this.$vux.toast.text(res.data.message, 'middle')
        }
      })
    },
    //添加后保存
    saveAdd(){
      if(!this.uname){
        this.$vux.toast.text('请输入收货人姓名', 'middle')
        return
      }if(!utils.regPhone(this.uphone)){
        this.$vux.toast.text('请输入正确手机号', 'middle')
        return
      }if(!this.udetail){
        this.$vux.toast.text('请输入详细地址', 'middle')
        return
      }
      const options = {
        token:this.token,
        province_id :this.provinceId,
        province:this.province,
        city_id:this.cityId,
        city:this.city,
        distinct_id:this.distinctId,
        distinct:this.distinct,
        addr_detail:this.udetail,
        username:this.uname,
        mobile:this.uphone
      }
      createAddress(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('添加地址成功', 'middle')
          setTimeout(()=>{
            this.$router.push('/address')
          },1000)
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
  background #F7F7F7
  border-top 1px solid  #E8E8E8
  padding-top l(10)
  .content
    height l(650)
    background #fff
    padding 0 4.3%
    box-shadow: 0 0 5px 0 #E8E8E8;
    display flex
    flex-direction column
    justify-content flex-start
    align-items center
    ul
      width l(375)
      padding 0 4.3%
      li
        height l(60)
        disFlex ()
        border-bottom 1px solid #E8E8E8
        p
          width l(66)
          fz(16)
          color: #333333;
          letter-spacing: 0.19px;
          line-height l(22)
          
        input 
          display block
          width 75%
          height 100%
          outline none 
          border none
          color: #666;
          line-height l(20)
          fz(16)
        input::placeholder
          fz(14)
          color: #666;
          letter-spacing: 0.3px;
          line-height: l(20)
    .save
      display block
      width l(160)
      height l(44)
      background: #83271F;
      border-radius: l(100)
      fz(18)
      color: #FFFFFF;
      letter-spacing: 1.12px;
      line-height l(44)
      margin-top l(80)

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
  }
.btn
  background: #30A0FE;
  border-radius: 100px;
  line-height l(44)
  fz(18)
  color: #FFFFFF;
  letter-spacing: 1.12px;
  margin l(50) l(16)

</style>
