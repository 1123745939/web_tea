<template>
  <div class="con" @click.stop="moreShow = moreShow ? !moreShow : moreShow">
    <!-- 頭部 -->
    <div class="s_h">
      <input type="text" placeholder="关键词搜索" v-model="searchTxt" @focus="getHistoryDate();conShow = false">
      <img src="../assets/img/search.png" alt="" @click.stop="search()">
    </div>
    <div class="content" v-if="!conShow">
      <div class="his" v-if="historyArr.length > 0 && token">
        <div class="his_t">历史搜索<img src="../assets/img/del.png" alt="" @click.stop="show = true"></div>
        <ul class="his_word">
          <li v-for="(item,index) in historyArr8" :key="index" @click.stop="searchTxt=item.word;search()">{{item.word}}</li>
        </ul>
        <img src="../assets/img/hobbym.png" alt="" v-if="historyArr.length>8" @click.stop="historyArr8 = historyArr">
      </div>
      <!-- 各种分类的茶叶 -->
      <ul class="kinds">      
        <li class="k_t" v-for="(item,index) in kindList" :key="item.group_id">
          <div class="his_t"><img src="../assets/img/t_r.png" alt="">{{item.group_name}}</div>
          <ul class="his_word">
            <li v-for="tea in item.type8" :key="tea.id" @click.stop="searchIdCon(tea.id)">{{tea.name}}</li>
          </ul>
          <img src="../assets/img/hobbym.png" alt="" class="more" v-show="item.moreKindShow" @click.stop="handle(index)">
        </li>
      </ul>
    </div>

    <!-- 搜索到的列表 -->
    <div class="big_box" v-if="conShow " style="position:relative" @click.stop="makeShow = false;placeShow=false;yearShow=false">
        <!-- tab选项 -->
      <ul class="tab">
        <li class="tab_li" :class="selectLi == 1 ?'active':''" @click.stop="selectLi=1;searchResultList = [];sort(1,'tea_period');yearShow=false;makeShow=false;placeShow=false">期数
          <img src="../assets/img/jian_up.png" alt="" v-if="preiodUp">
          <img src="../assets/img/jian_down.png" alt="" v-else>
        </li>
        <li  class="tab_li" :class="selectLi == 2 ?'active':''" @click.stop="placeShow = !placeShow;selectLi=2; preiodUp=true;priceUp=true;yearShow=false;makeShow=false;moreShow=false" >产地
          <ul class="liMore" v-show="placeShow">
            <li v-for="year in filterArr.places" :key="year.id" @click.stop="placeShow=false;filter('tea_place_id',year.id,year.name)">{{year.name}}</li>
          </ul>
        </li>
        <li  class="tab_li" :class="selectLi == 3 ?'active':''" @click.stop="makeShow = !makeShow;selectLi=3;preiodUp=true;priceUp=true;placeShow=false;yearShow=false;moreShow=false">制茶方法
          <ul class="liMore" v-show="makeShow">
            <li v-for="year in filterArr.makes" :key="year.id"  @click.stop="makeShow=false;filter('tea_make',year.id,year.name)">{{year.name}}</li>
          </ul>
        </li>
        <li  class="tab_li" :class="selectLi == 4 ?'active':''" @click.stop="selectLi=4;searchResultList = [];sortP(1,'tea_price');yearShow=false;makeShow=false;placeShow=false">价格
          <img src="../assets/img/jian_up.png" alt="" v-if="priceUp">
          <img src="../assets/img/jian_down.png" alt="" v-else>
        </li>
        <li  class="tab_li" :class="selectLi == 5 ?'active':''" @click.stop="yearShow = !yearShow;selectLi=5;preiodUp=true;priceUp=true;placeShow=false;makeShow=false;moreShow=false">年份
          <ul class="liMore" v-show="yearShow">
            <li v-for="year in filterArr.years" :key="year.id"  @click.stop="yearShow=false;filter('tea_year',year.id,year.name)">{{year.year}}</li>
          </ul>
        </li>
        <li class="tab_li" @click.stop="moreShow = !moreShow;placeShow=false;yearShow=false;makeShow=false">
          <img src="../assets/img/tab5.png" alt="" class="more">
          <ul class="more" v-if="moreShow">
            <li v-for="item in threeArr" :key="item.id" @click="searchResultList = [];filter(item.eng,'','asc')">{{item.name}}</li>
            </ul>
        </li>
      </ul>
      <!-- 搜索列表 -->
    <div class="boxbox" v-if="searchResultList.length>0">
      <scroll ref="scroll"
          :data="searchResultList"
          :pullDownRefresh="pullDownRefreshObj"
          :pullUpLoad="pullUpLoadObj"
          :startY="parseInt(startY)"
          @pullingDown="onPullingDown"
          @pullingUp="onPullingUp">

          <ul class="goodsList">    
            <li v-for="(item,index) in searchResultList" :key="item.id" @click="$router.push({path:'/goodDetail',query:{id:item.id}})">
              <div class="li_top">
                <div class="play"><span></span></div>
                <div class="data">
                  <div class="d_l">
                    {{item.tea_play_count}}次播放
                  </div>
                  <ul class="p_r">
                    <li><img src="../assets/img/star.png" alt="">{{item.tea_collect_count}}</li>
                    <li><img src="../assets/img/zan.png" alt="">{{item.tea_thumb_count}}</li>
                    <li><img src="../assets/img/talk.png" alt="">{{item.tea_comment_count}}</li>
                  </ul>
                </div>
                <div class="time">{{item.tea_date}} {{item.tea_period}}</div>
              </div>
              <div class="li_mid">
                <div class="red"></div>
                <span>{{item.tea_title}}</span>
                <ul class="mark">
                  <li v-for="i in item.tea_score" :key="i"></li>
                </ul>
                <input type="text" style="opacity:0;" v-model='urls+item.id' id="foo">
                <img src="../assets/img/share.png" alt=""  @click.stop="share(item.id,index)" ref='copy' data-clipboard-action="copy" data-clipboard-target="#foo" class="aaa">
              </div>
              <div class="li_bot">
                <div class="lt_l">
                  <div class="all">            
                    <span :style="{width:item.tea_count/item.tea_total*100+'%'}"></span>
                    <div>仅剩{{item.tea_count}}分</div>
                  </div>
                  <div>￥<span class="p1">{{item.tea_price}}</span>.00 <span class="p2">/50g</span></div>
                </div>
                <img src="../assets/img/l1.png" alt="">
              </div>
            </li>
          </ul>      
          <div class="order-list" v-if="searchResultList.length == 0 && !loading">
            <load-more :show-loading="false" tip="暂无数据" background-color="#f0f7f5"></load-more>
          </div>

        </scroll>
      </div>
        <!-- 没有数据的话 -->
      <div class="noList" v-else>
        <div class="box">
          <img src="../assets/img/symbols-search.png" alt="">
          <span>暂无数据</span>
        </div>
      </div>
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
import Scroll from './scroll/scroll'
import {getHistory,delHistory,getSearchDate,getFilter,getSearch} from '../api/api.js'
import util from '../utils/js/style.js'
export default {
  components: {
    Confirm,
    Scroll
  },
  data () {
    return {
      token :sessionStorage.token || '',
      show:false,//弹框是否显示
      moreShow :false,
      conShow :false,//列表和历史记录的切换
      searchTxt:'',
      historyArr:[],
      historyArr8:[],
      filterArr:[],
      kindList:[],
      searchResultList:[],//搜索到的列表
      tea_type_id:'',
      key:'',
      value:'',
      page:1,
      selectLi:'',
      placeShow:false,
      makeShow:false,
      yearShow:false,
      preiodUp:true,
      priceUp:true,
      type:'',//0 无需筛选 1 排序 2 筛选
      threeArr:[{id:6,name:'播放量最高',eng:'tea_play_count '},{id:7,name:'收藏最多',eng:'tea_collect_count'},{id:8,name:'点赞最多',eng:'tea_thumb_count '}],
      urls:'http://uat.chajisong.com/#/goodDetail?id=',


      pullUpLoadThreshold: 0,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '数据加载中',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      startY: 0,
      scrollToTime: 700,
      items: [],
      itemIndex: 0,
      loading :true,
    }
  },
  created(){
    document.title = '搜索'
    this.init()
    this.getHistoryDate()
    //this.historyArr = util.getHistory('teaSearch')

  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(()=>{
        this.copyBtn = new this.clipboard(this.$refs.copy[0]);
      },10)
    })
  },
  computed:{
    pullDownRefreshObj: function () {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop)
      } : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
      } : false
    }
  },
  methods:{
    share(id,index) {
     
      this.copyBtn = new this.clipboard(this.$refs.copy[index]);
      let _this = this;
      let clipboard = this.copyBtn;
      console.log(clipboard,'clipboard')
      clipboard.on('success', function() {
         _this.$vux.toast.text('复制成功，可直接粘贴给好友！')
      });
      clipboard.on('error', function() {
          _this.$vux.toast.text('复制失败，请重新复制！')
      });
    },
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
          console.log(this.kindList)
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
            console.log(res.data.data)
            this.historyArr = res.data.data
            console.log(this.historyArr,'this.historyArr')
            if(this.historyArr.length>8){
              this.historyArr8 = this.historyArr.slice(0,8)
            }else{
              this.historyArr8 = this.historyArr
            }
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
    //在所搜页输入内容搜索
    search(){
      if(!this.searchTxt){
        this.$vux.toast.text('请输入要搜索的内容','middle')
        return
      }
      
      if(!this.tea_type_id){
        //只根据关键字搜索
        this.searchCon(1,1,this.searchTxt,'',0,'','')
      }else{
        //有关键字也有类型
        this.searchCon(1,0,this.searchTxt,this.tea_type_id,0,'','')
      }
      

         
    },
    //点击每个li，根据类型搜索
    searchIdCon(id){
      this.tea_type_id = id;
      console.log(this.tea_type_id)
      this.searchCon(1,2,'',this.tea_type_id,0,'','')
    },
    //  期数排序   搜索结果页  期数 排序
    sort(type,key){
      this.type = type
      this.key = key
      if(this.tea_type_id && !this.searchTxt){
        if(this.preiodUp){// 只有类型  没有关键字  升序
          this.searchCon(1,2,'',this.tea_type_id,this.type,this.key,'desc',)
        }else{// 只有类型  没有关键字  降序
          this.searchCon(1,2,'',this.tea_type_id,this.type,this.key,'asc',)
        }
      }else if(this.tea_type_id && this.searchTxt){
        if(this.preiodUp){// 有类型  有关键字  升序
          this.searchCon(1,0,this.searchTxt,this.tea_type_id,this.type,this.key,'desc',)
        }else{// 有类型  有关键字  降序
          this.searchCon(1,0,this.searchTxt,this.tea_type_id,this.type,this.key,'asc',)
        }
      }else if(!this.tea_type_id && this.searchTxt){
        if(this.preiodUp){// 没有类型  有关键字  升序
          this.searchCon(1,1,this.searchTxt,this.tea_type_id,this.type,this.key,'desc',)
        }else{// 没有类型  有关键字  降序
          this.searchCon(1,1,this.searchTxt,this.tea_type_id,this.type,this.key,'asc',)
        }
      }
      this.preiodUp =!this.preiodUp
    },
    //  价格排序   搜索结果页  期数 排序
    sortP(type,key){
      this.type = type
      this.key = key
      if(this.tea_type_id && !this.searchTxt){
        if(this.priceUp){// 只有类型  没有关键字  升序
          this.searchCon(1,2,'',this.tea_type_id,this.type,this.key,'desc',)
        }else{// 只有类型  没有关键字  降序
          this.searchCon(1,2,'',this.tea_type_id,this.type,this.key,'asc',)
        }
      }else if(this.tea_type_id && this.searchTxt){
        if(this.priceUp){// 有类型  有关键字  升序
          this.searchCon(1,0,this.searchTxt,this.tea_type_id,this.type,this.key,'desc',)
        }else{// 有类型  有关键字  降序
          this.searchCon(1,0,this.searchTxt,this.tea_type_id,this.type,this.key,'asc',)
        }
      }else if(!this.tea_type_id && this.searchTxt){
        if(this.priceUp){// 没有类型  有关键字  升序
          this.searchCon(1,1,this.searchTxt,this.tea_type_id,this.type,this.key,'desc',)
        }else{// 没有类型  有关键字  降序
          this.searchCon(1,1,this.searchTxt,this.tea_type_id,this.type,this.key,'asc',)
        }
      }
      this.priceUp =!this.priceUp
    },
    //搜索结果页   筛选
    filter(key,id,name){
      this.key = key
      console.log(key,this.key)
      this.value = id
      this.searchResultList = []     
      
      if(this.tea_type_id && !this.searchTxt){
         //只有类型的筛选 
        this.searchCon(1,2,'',this.tea_type_id,2,this.key,name)
      }else if(this.tea_type_id && this.searchTxt){
        //类型和关键字都有的筛选
        this.searchCon(1,0,this.searchTxt,this.tea_type_id,2,this.key,name)
      }else if(!this.tea_type_id && this.searchTxt){
        //只有关键字的筛选
        this.searchCon(1,1,this.searchTxt,'',2,this.key,name)
      }
     
    },
    searchCon(page,search_type,tea_desc,tea_type_id,type,key,value){
      const options = {
        token:this.token,
        page:page,
        rows:10,
        search_type:search_type,//检索时 类型和关键词是否参与检索 取值 0 1 2    0 都有 1 仅关键词 2 仅类型
        tea_title:tea_desc,//检索关键词 若search_type 为0 1时必传
        tea_type_id:tea_type_id,//检索类型id 若search_type 为0 2 时必传
        type:type,//筛选类型  0 无需筛选 1 排序 2 筛选
        key:key,//筛选的key 当type=1,2时必传  tea_period(期数)/tea_price(价格)/tea_place_id(产地id)/tea_make(制茶方法)/tea_year(年份)
        value:value//	筛选的key对应的值 当type=1,2时必传
      }
      console.log(options)
      getSearch(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          console.log(res)
          this.searchResultList = this.searchResultList.concat(res.data.data.tea)
          console.log(this.searchResultList)
          this.conShow = true

        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        } 
      })
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
    //下拉刷新
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and load data')
    
     },
     //上拉加载
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      this.page++
      this.searchCon(this.page,2,'',this.tea_type_id,0,'','')

      this.$refs.scroll.forceUpdate()
    },
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  },
  watch:{
    searchTxt(oldV,newV){
      if(oldV =='' || newV == ''){
        this.getHistoryDate()
        this.conShow = false
      }
    },
    scrollbarObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullDownRefreshObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullUpLoadObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    startY() {
      this.rebuildScroll()
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
            width l(20)
            height l(16)
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
            color: #83271F;
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
      li.tab_li.active
        color #83271f
      li.tab_li:last-of-type
        color: #666666;
        position relative
        ul.more
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
        position relative
        ul.liMore
          width l(60)
          position absolute
          top 1rem
          right -0.5rem
          z-index 88
          fz(12)
          color: #FFFFFF;
          letter-spacing: 0.28px;
          padding-top l(3)
          background rgba(0,0,0,0.5)
          border-radius 3px
          li
            line-height l(26)
        img 
          display block
          width l(13)
          height l(8)
          margin-left l(3)
        img.more 
          display block
          width l(18)   
          height l(18) 
    .boxbox
      height l(580)
      position relative
      //列表
      .goodsList
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
            .time
              font-size: 12px;
              color: #95514C;
              letter-spacing: 0.23px;  
              line-height l(17)
              width l(123)
              height l(17)
              position absolute
              top l(5)   
              right l(8)  
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
            ul.mark
              position absolute
              left 2.7%
              bottom 20%
              display flex
              justify-content flex-start
              li
                width l(18)
                height l(14)
                margin-right l(5)
                backgroundIcon('tea.png')
                margin-bottom 0
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
                div
                  position absolute
                  left 0
                  top 0
                  fz(10)
                  color #fff 
                  line-height l(17)
                  padding-left l(5)
                span 
                  display block
                  height 100%
                  position absolute
                  width 70%
                  background: #E63443;
                  border-radius: 4px 0 0 4px;  
                  left 0
                  top 0
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
  //没有数据
  .noList
    width l(175)
    height l(200)
    position absolute  
    bottom -10rem
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
        width l(150)
        height l(147)
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
