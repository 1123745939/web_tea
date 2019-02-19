<template>
  <div class="con">
    <div class="content">
      <!-- 各种分类的茶叶 -->
      <ul class="kinds">      
        <li class="k_t" v-for="(item,index) in kindList" :key="item.group_id">
          <div class="his_t">
            {{item.group_name}}
          </div>
          <ul class="his_word">
            <li v-for="tea in item.type8" :key="tea.id" @click.stop="searchIdCon(tea.id)">{{tea.name}}</li>
          </ul>
          <img src="../assets/img/jian_down.png" alt="" class="more" v-show="item.moreKindShow" @click.stop="handle(index)">
          <img src="../assets/img/jian_up.png" alt="" class="more" v-show="item.upShow" @click.stop="handleUp(index)">
        </li>
      </ul>
    </div>
    <footers :index = tabIndex></footers>
  </div>
</template>

<script>
import Vue from 'vue'
import footers from './footers'
import { getSearchDate } from '../api/api.js'
import utils from '../utils/js/style.js'
import domain from '../api/domain';
export default {
  data () {
    return {
      token : localStorage.token || '',
      show:false,//弹框是否显示
      moreShow :false,
      historyArr:[],
      historyArr8:[],
      filterArr:[],
      kindList:[],
      tabIndex:1,
    }
  },
  components:{
    footers
  },  
  created(){
    document.title = '分类'
    this.init()
  },
  mounted() {
   
  },
  methods:{
    init(){
      //茶的数据
      getSearchDate().then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.kindList = res.data.data.types
          this.kindList.forEach(item=>{
            item.upShow = false
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
    },
    //展开
     handle(index){
      this.$forceUpdate();//页面强制手动重新渲染
      Vue.set(this.kindList[index],'type8',this.kindList[index].type)
      Vue.set(this.kindList[index],'upShow',true)
      Vue.set(this.kindList[index],'moreKindShow',false)
    },
    //收起
     handleUp(index){
      this.$forceUpdate();//页面强制手动重新渲染
      Vue.set(this.kindList[index],'type8',this.kindList[index].type8.slice(0,8))
      Vue.set(this.kindList[index],'upShow',false)
      Vue.set(this.kindList[index],'moreKindShow',true)
      console.log(this.kindList[index])
    },
    searchIdCon(id){
      this.$router.push({path:'/searchResult',query:{id:id}})
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" scoped>
@import '../utils/css/util.styl';
.con
  background #F7F7F7
  height 100vh
  overflow-y scroll
  border-top 1px solid #f7f7f7
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
    padding l(10) 4.3% 0
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
          fz(16)
          color: #282828;
          letter-spacing: 0.2px;
          padding l(5) 0 l(10)
          img 
            display block
            width l(20)
            height l(16)
            margin-right l(8)
        .his_word
          width 100%
          overflow hidden
          // display flex
          // justify-content flex-start
          // flex-wrap wrap
          li
            min-width l(50)
            float left
            height l(30)
            background: #FFFFFF;
            border: 1px solid #d6d4d4;
            border-radius: l(100)
            line-height l(30)
            margin-bottom l(10)
            fz(14)
            color: #666;
            letter-spacing: 0.2px;
            margin-right l(10) 
            padding 0 l(5)
            font-family: PingFangSC-Regular;
          // li:nth-of-type(4n)
          //   margin-right 0
        img.more 
          display block
          width l(18)
          height l(9)
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
