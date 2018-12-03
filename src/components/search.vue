<template>
  <div class="con">
    <!-- 頭部 -->
    <div class="s_h">
      <input type="text" placeholder="关键词搜索" v-model="searchTxt">
      <img src="../assets/img/search.png" alt="" @click="search()">
    </div>
    <div class="content" v-if="!conShow">
      <div class="his" v-if="historyArr.length > 0 && token">
        <div class="his_t">历史搜索<img src="../assets/img/del.png" alt="" @click="show = true"></div>
        <ul class="his_word">
          <li v-for="item in historyArr" :key="item">{{item}}</li>
        </ul>
        <img src="../assets/img/hobbym.png" alt="">
      </div>
      <!-- 各种分类的茶叶 -->
      <ul class="kinds">      
        <li class="k_t" v-for="(item,index) in kindList" :key="item.group_id">
          <div class="his_t"><img src="../assets/img/t_r.png" alt="">{{item.group_name}}</div>
          <ul class="his_word">
            <li v-for="tea in item.type8" :key="tea.id">{{tea.name}}</li>
          </ul>
          <img src="../assets/img/hobbym.png" alt="" class="more" v-show="item.moreKindShow" @click="handle(index)">
        </li>
      </ul>
      <!-- 产地 -->
      <ul class="kinds">
        <li class="k_t">
          <div class="his_t"><img src="../assets/img/t_add.png" alt="">产地</div>
          <ul class="his_word">
            <li v-for="item in placeList8" :key="item.id">{{item.name}}</li>
          </ul>
          <img src="../assets/img/hobbym.png" alt="" class="more" v-show="morePlaceShow" @click="placeList8 = placeList;morePlaceShow = false">
        </li>
      </ul>
    </div>

    <!-- 搜索到的列表 -->
    <div class="big_box" v-if="conShow">
        <!-- tab选项 -->
      <ul class="tab">
        <li class="tab_li">期数<img src="../assets/img/jian_up.png" alt=""></li>
        <li  class="tab_li">产地</li>
        <li  class="tab_li">制茶方法</li>
        <li  class="tab_li">价格<img src="../assets/img/jian_up.png" alt=""></li>
        <li  class="tab_li">年份</li>
        <li class="tab_li" @click="moreShow = !moreShow">
          <img src="../assets/img/tab5.png" alt="" class="more">
          <ul class="more" v-if="moreShow">
            <li>播放量最高</li>
            <li>收藏最多</li>
            <li>点赞最多</li>
            </ul>
        </li>
      </ul>
      <!-- 搜索列表 -->
      <ul class="goodsList">
        <li>
          <div class="li_top">
            <div class="play"><span></span></div>
            <div class="data">
              <div class="d_l">
                5万次播放
              </div>
              <ul class="p_r">
                <li><img src="../assets/img/star.png" alt="">300</li>
                <li><img src="../assets/img/zan.png" alt="">260</li>
                <li><img src="../assets/img/talk.png" alt="">30</li>
              </ul>
            </div>
          </div>
          <div class="li_mid">
            <div class="red"></div>
            <span>这道大红袍如此浓郁的花果香锐不可挡，你一定没喝过！</span>
            <img src="../assets/img/share.png" alt="">
          </div>
          <div class="li_bot">
            <div class="lt_l">
              <div class="all">
                <span>仅剩18分</span>
              </div>
              <div>￥<span class="p1">1800</span>.00 <span class="p2">/50g</span></div>
            </div>
            <img src="../assets/img/l1.png" alt="">
          </div>
        </li>
        <li>
          <div class="li_top">
            <div class="play"><span></span></div>
            <div class="data">
              <div class="d_l">
                5万次播放
              </div>
              <ul class="p_r">
                <li><img src="../assets/img/star.png" alt="">300</li>
                <li><img src="../assets/img/zan.png" alt="">260</li>
                <li><img src="../assets/img/talk.png" alt="">30</li>
              </ul>
            </div>
          </div>
          <div class="li_mid">
            <div class="red"></div>
            <span>这道大红袍如此浓郁的花果香锐不可挡，你一定没喝过！</span>
            <img src="../assets/img/share.png" alt="">
          </div>
          <div class="li_bot">
            <div class="lt_l">
              <div class="all">
                <span style="width:100%;border-radius: 4px ">已抢光</span>
              </div>
              <div>￥<span class="p1">1800</span>.00 <span class="p2">/50g</span></div>
            </div>
            <img src="../assets/img/l2.png" alt="">
          </div>
        </li>
      </ul>
    </div>
    <!-- 删除的弹框提示 -->
    <div>
      <confirm v-model="show" title="" @on-confirm="onConfirm">
        <p style="text-align:center;">确定要清空历史记录吗</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Confirm } from 'vux'
import Vue from 'vue'
import {getHistory,delHistory,getSearchDate,getFilter} from '../api/api.js'
import util from '../utils/js/style.js'
export default {
  components: {
    Confirm,
  },
  data () {
    return {
      token :sessionStorage.token || '',
      show:false,//弹框是否显示
      moreShow :false,
      conShow :false,//列表和历史记录的切换
      searchTxt:'',
      historyArr:[],
      filterArr:[],
      kindList:[],
      kindList8:[],
      placeList:[],
      placeList8:[],
      morePlaceShow:false,
    }
  },
  created(){
    document.title = '搜索'
    this.init()
    this.getHistoryDate()
    //this.historyArr = util.getHistory('teaSearch')

  },
  methods:{
    init(){
      //茶的数据
      getSearchDate().then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.kindList = res.data.data.types
          this.kindList.forEach(item=>{
            if(item.type.length>8){
              item.type = item.type.slice(0,12)
              item.type8 = item.type.slice(0,8)
              item.moreKindShow = true
            }else{
              item.type8 = item.type
              item.moreKindShow = false
            }
          })
          console.log(this.kindList,'kindlist')
          this.placeList = res.data.data.places.length>12 ?  res.data.data.places.slice(0,12) : res.data.data.places
          if(this.placeList.length>8){
            this.morePlaceShow = true
            this.placeList8 = this.placeList.slice(0,8)
          }
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
      //filter
      getFilter().then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.filterArr = res.data.data
          console.log(this.filterArr,555555555555)
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
      
    },
    //历史记录
    getHistoryDate(){
      if(this.token){
        getHistory({token:this.token}).then(res=>{
          if(res.data.code == 200 && !res.data.error_code){
            this.historyArr = res.data.data
          }else{
            this.$vux.toast.text(res.data.error_message||res.data.message)
          }
          
        })
      }
    },
    handle(index){
      this.$forceUpdate();//页面强制手动重新渲染
      Vue.set(this.kindList[index],'type8',this.kindList[index].type)
      Vue.set(this.kindList[index],'moreKindShow',false)
    },
    search(){
      if(!this.searchTxt){
        this.$vux.toast.text('请输入要搜索的内容','middle')
        return
      }

      //请求接口,然后显示数据，反之显示没有您要找的数据
      this.conShow = true
      //向接口增加历史记录,
      if(this.token){

      }
      // util.setHistory(this.searchTxt,'teaSearch')
      // this.historyArr = util.getHistory('teaSearch')

    
    },
    //确认删除历史记录
    onConfirm () {
      if(!this.token){return}
      delHistory({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.historyArr = []
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }
      })
    },
  },
  watch:{
    searchTxt(oldV,newV){
      if(oldV ==''){
        this.getHistoryDate()
        this.conShow = false
      }
    },

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
  .s_h
    disFlex ()
    padding l(10) 4.3%
    background #fff
    input 
      display block
      width l(308)
      height l(32)
      background: #F2F2F2;
      border-radius: 6px;
      border none
      outline none
      padding-left l(10)
    input::placeholder
      fz(14)
      color: #999999;
      letter-spacing: 0.2px;
    img 
      display block
      width l(23)
      height l(23)
  .content
    padding l(20) 4.3%
    background #F7F7F7
    margin-bottom l(20)
    // 头部
    .his
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      background #fff
      box-shadow: 0 0 5px 0 #F3F3F3;
      border-radius: 5px;
      padding l(20) l(10)
      .his_t
        width 100%
        disFlex()
        fz(14)
        color: #999999;
        letter-spacing: 0.2px;
        padding-bottom l(10)
        img 
          display block
          width l(18)
          height l(20)
      .his_word
        width 100%
        display flex
        justify-content flex-start
        flex-wrap wrap
        li
          width 25%
          line-height l(30)
          fz(14)
          color: #333333;
          letter-spacing: 0.2px;    
      img 
        display block
        width l(25)
        height l(5)
        margin-top l(10)
    .kinds
      margin-top l(10)
      li.k_t  
        display flex
        flex-direction column
        justify-content flex-start
        align-items center
        background #fff
        box-shadow: 0 0 5px 0 #F3F3F3;
        border-radius: 5px;
        padding l(20) l(10)
        margin-bottom l(10)
        .his_t
          width 100%
          display flex
          justify-content flex-start
          align-items center
          fz(14)
          color: #999999;
          letter-spacing: 0.2px;
          padding-bottom l(10)
          img 
            display block
            width l(18)
            height l(20)
            margin-right l(8)
        .his_word
          width 100%
          display flex
          justify-content flex-start
          flex-wrap wrap
          li
            width l(72)
            height l(30)
            background: #FFFFFF;
            border: 1px solid #DFC8C6;
            border-radius: l(100)
            line-height l(30)
            margin-bottom l(10)
            fz(14)
            color: #333333;
            letter-spacing: 0.2px;
            margin-right l(10) 
          li:nth-of-type(4n)
            margin-right 0
        img.more 
          display block
          width l(25)
          height l(5)
          margin-top l(10) 
  .big_box

    // tab
    .tab
      width l(375)
      background #ffffff
      padding 0 4.3%
      disFlex ()
      li.tab_li:last-of-type
        color: #666666;
        position relative
        ul
          width l(80)
          height l(95)
          position absolute
          backgroundIcon ('btd.png')
          bottom -2.5rem
          right 0rem
          z-index 88
          fz(12)
          color: #FFFFFF;
          letter-spacing: 0.28px;
          padding-top l(3)
          li:last-of-type
            border-bottom 0
          li
            height l(30)
            line-height l(30)
            border-bottom 1px solid rgba(255,255,255,0.20)
      li.tab_li
        padding l(10) 0
        disFlex()
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.3px;
        line-height l(20)
        img 
          display block
          width l(13)
          height l(8)
          margin-left l(3)
        img.more 
          display block
          width l(18)   
          height l(18) 
    //列表
    ul.goodsList
      width l(375)
      background #F7F7F7
      margin-top l(10)
      li
        width 100%
        height l(387)
        background #ffffff
        padding l(10) 4.3%
        margin-bottom l(10)
        .li_top
          width 100%
          height l(190)
          backgroundIcon('list1.png')
          position relative
          border-radius 3% 0 3% 0
          .play
            opacity: 0.3;
            backgroundIcon('play.png')
            width l(44)
            height l(44)
            border-radius 50%
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            margin auto
          .data
            width 100%
            height l(25)
            background colorB(30)
            display flex
            justify-content space-between
            position absolute
            bottom 0
            left 0
            font-family: PingFangSC-Regular;
            fz(12)
            color: #FFFFFF;
            letter-spacing: 0.28px;
            .d_l
              padding 0 5px
              line-height l(25)
            ul 
              display flex
              justify-content space-between
              li
                height 100%
                display flex
                justify-content space-between
                align-items center
                padding 0 5px
                background colorB(0)
                img 
                  display block
                  width l(15)
                  height l(15)
                  margin-right 5px
        .li_mid
          background: #F7F7F7;
          height l(97)
          position relative
          font-family: PingFangSC-Medium;
          fz(16)
          color: #333333;
          letter-spacing: 0.28px;
          line-height l(22)
          padding 0.9% 0 0 2.4%
          text-align left 
          padding-top l(10)
          .red
            width l(4)
            height l(16)
            background: #83271F;
            position absolute
            left 0
            top l(10)
          img 
            display block
            width l(22)
            height l(22)
            position absolute
            right 2.7%
            bottom 20%
        .li_bot
          width 100%
          height l(100)
          display flex
          justify-content space-between
          align-items center
          padding-bottom 1.9%
          img 
            display block
            width l(95)
            height l(40)
          .lt_l
            height 100%
            padding-top l(20)
            .all
              width l(104)
              height l(17)
              background: rgba(230,52,67,0.30);
              border-radius: 4px;
              position relative
              margin-bottom l(10)
              span 
                display block
                height 100%
                position absolute
                width 70%
                background: #E63443;
                border-radius: 4px 0 0 4px;  
                left 0
                top 0
                fz(10)
                color #fff 
                line-height l(17)
            div
              color: #E63443;
              fz(14)
              letter-spacing: 0.31px;
              line-height l(30)
              .p1
                fz(18)
              .p2
                color: #3F3F3F;
                fz(14)

</style>
