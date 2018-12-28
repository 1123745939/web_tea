<template>
  <div class="con"  v-if="carList.length">
    <swipeout class="vux-1px-tb">
      <swipeout-item transition-mode="follow" v-for="(i,index) in carList" :key="i.id">
        <div slot="right-menu">
          <swipeout-button @click.native="show = true;id=i.tea_id" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
          <li :class="i.is_advance==1?'active':''">
            <img src="../assets/img/c_blank.png" alt="" class="car_s" v-if="i.active == false" @click="select(index,i.tea_left_count)"> 
            <img src="../assets/img/c_active.png" alt="" class="car_s" v-else  @click="select(index,tea_left_count)"> 
            <img src="../assets/img/list1.png" alt="" class="car_img">
            <div class="car_p">
              <div class="t_top">
                <span>{{i.tea_title}}</span> <span class="ku" v-show="i.tea_left_count==0">库存不足</span>
              </div>
              <p class="t_d">{{i.tea_date}} {{i.tea_period}}</p>
              <div class="t_num">
                <p>￥<span>{{i.tea_price}}</span>.00</p>
                <div>
                  <p @click="reduce(i.id,index)"></p>{{i.tea_count}} <p  @click="add(i.id,index)"></p>
                </div>
              </div>
              <div class="yugoutime" v-if="i.is_advance==1">预计发货时间{{i.advance_date}}</div>
            </div>
         </li>
        </div>
      </swipeout-item>
    </swipeout>
    <!-- 是否删除的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="show"  @on-confirm="handle">
        <p style="text-align:center;">确认要删除吗</p>
      </confirm>
    </div>
    <div class="yun">
      运费
      <span>顺丰包邮</span>
    </div>
    <div class="blank"></div>
    <!-- 底部 -->
    <div class="footer">
      <img src="../assets/img/c_blank.png" alt="" v-if="!selectAll" @click="selectAllAll">
      <img src="../assets/img/c_active.png" alt="" v-else  @click="selectAllAll">
      <span>全选</span>
      <div>
        总计:<p>￥<span>{{totalP}}</span>.00</p>
      </div>
      <p class="goPay" @click="goPay">去结算</p>
    </div>
    
  </div>
  
  <div class="noList" v-else>
    <div class="box">
      <img src="../assets/img/symbols-car.png" alt="">
      <span>购物车空空如也哟～</span>
      <p @click="$router.push('/')">去添加</p>
    </div>
    <!-- 提示是否删除的弹框 -->
  </div>
</template>

<script>
import {  Swipeout, SwipeoutItem, SwipeoutButton, XButton ,Confirm, TransferDomDirective as TransferDom} from 'vux'
import {carList,delShop ,SaveShop,orderCheck} from '../api/api.js'
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  data () {
    return {
      token:sessionStorage.token,
      selectAll :false,
      carList:[],
      show:false,
      id:'',
      totalP:0,
    }
  },
  created(){
    document.title = '购物车'
    this.init()
  },
  methods:{
    init(){
      const options = {
        token:this.token,
      }
      carList(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.carList = res.data.data.result
          console.log(this.carList)
          this.carList.forEach(item=>{
            item.active = false
          })
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //删除
    handle(){
      const options = {
        token :this.token,
        id:this.id
      }
      delShop(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('删除成功')
          this.carList.forEach((item,index)=>{
            if(item.id==this.id){
              this.carList.splice(index,1)
            }
          })
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //单个的选择
    select(index,count){
      if(count ==0){
        this.$vux.toast.text('库存不足,请删除该产品并重新选择')
        return
      }
      this.carList[index].active = !this.carList[index].active
     
      this.$forceUpdate()
      this.totalP = 0
      this.carList.forEach(item=>{
        if(item.active == true){
          this.totalP = Number(this.totalP) + Number(item.tea_count*item.tea_price)
        }      
      })
      var aa = this.carList.every(item=>{
        return item.active == true
      })
      this.selectAll = aa == true ? true : false
    },
    //全选
    selectAllAll(){
      if(this.selectAll){
        this.selectAll = false
        this.totalP = 0
        this.carList.forEach(item=>{
          item.active = false
        })
      }else{
        this.selectAll = true
        this.carList.forEach(item=>{
          if(item.tea_left_count!=0){
            item.active = true
            this.totalP +=item.tea_count*item.tea_price
          }
          
        })
      }
    },
    //减
    reduce(id,index){

      if(this.carList[index].tea_count > 1){
        this.carList[index].tea_count -- 
      }
      this.shopCount(id,this.carList[index].tea_count)
      if(!this.carList[index].active){return}
      this.totalP = this.totalP - this.carList[index].tea_price
      this.$forceUpdate()
    },
    //加
    add(id,index){  
      this.carList[index].tea_count ++ 
      this.shopCount(id,this.carList[index].tea_count)
      if(!this.carList[index].active){return}
      this.totalP = this.totalP + this.carList[index].tea_price
      this.$forceUpdate()
    },
    //掉接口，保存每次操作之后的购物车数量
    shopCount(id,count){
      const options = {
        token :this.token,
        id:id,
        count :count
      }
      SaveShop(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
    //去结算
    goPay(){
      var bb = this.carList.some(item=>{
        return item.active == true
      })
      if(!bb){
        this.$vux.toast.text('您还没有选择任何商品')
        return
      }
      var ids = ''
      var arr = []
      this.carList.forEach(item=>{
        if(item.active){
          ids = ids + item.id +','
          var obj = {}
          obj.id = item.id
          obj.count = item.tea_count
          arr.push(obj)
        }
      })
      ids = ids.slice(0,-1)
      this.check(arr,ids)
    },
    //校验库存
    check(arr,ids){
      const options = {
        token :this.token,
        ids :JSON.stringify(arr)
      }
      orderCheck(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$router.push({path:'/pay',query:{ids:ids,type:'shop'}})
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
          setTimeout(()=>{
            this.init()
          },1000)
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
  height l(666)
  overflow-y scroll
  .demo-content.vux-1px-t
    // padding 0
  ul,.demo-content
    padding 0 4.3%
    background #fff
    li.last
      border-bottom 0
    li.active
      backgroundIcon ('yugou@2x.png')
    li
      height l(126) 
      disFlex()
      padding 6% 0
      border-bottom 1px solid #E8E8E8
      .car_s
        display block
        width l(18)
        height l(18)
      .car_img
        display block
        width l(106)
        height l(85)
      .car_p
        width 54%
        height 100%
        text-align left 
        div.t_top
          width 100%
          display flex
          justify-content space-between
          align-items center
          .ku
            fz(14)
            color: #E63443;
            letter-spacing: 0.23px;
          span 
            line-height l(22)
            fz(16)
            color: #333333
            letter-spacing 0.3px
        p.t_d
          line-height l(20)
          fz(14)
          color #666666
          letter-spacing 0.3px
          margin-top l(6)
        div.t_num
          disFlex()
          margin-top l(10)
          p
            color #E63443
            fz(14)
            span 
              fz(18)
              color #E63443
          div
            width l(82)
            height l(23)
            backgroundIcon ('a&r.png')
            disFlex()
            color: #666666;
            letter-spacing: 0.22px;
            p
              width l(25)
              height 100%
        .yugoutime
          font-size: 10px;
          color: #E63443;
          letter-spacing: 0.3px;
  .yun
    margin-top l(10)
    height l(64)
    fz(16)
    color #333
    line-height l(64)
    disFlex()
    padding 0 4.3%
    background #fff
    span 
      color: #E63443;
      fz(14)

  .footer
    background #fff
    width 100%
    display flex
    justify-content flex-start
    align-items center
    height l(44)
    position fixed
    bottom 0
    left 0
    padding-left 4.3%
    img
      display block
      width l(18)
      height l(18)
    span 
      fz(14)
      color: #666666;
      letter-spacing: 0.31px;
      margin-left l(5)
    div
      height 100%
      color: #333333;
      letter-spacing: 0.17px;
      fz(14)
      disFlex()
      line-height l(44)
      margin-left l(30)
      p
        color: #E63443;
        letter-spacing: 0.17px;
        fz(14)
        margin-left l(5)
        span 
          fz(18)
          color: #E63443;
    p.goPay
      height 100%
      width l(117)
      background: #83271F;
      fz(18)
      color: #FFFFFF;
      letter-spacing: 1.12px;
      line-height l(44)
      position absolute
      top 0
      right 0
  .blank
    height l(44)
    margin-top l(20)
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
      height l(150)
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

