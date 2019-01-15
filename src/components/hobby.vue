<template>
  <div class="con">
    <div class="content">
      <ul class="h_list">
        <li class="h_li" v-for="(i) in list" :key="i.id" @click.stop="$router.push({path:'/goodDetail',query:{id:i.id}})">
          <div class="left" :style="{background:'url(' + i.tea_img_link + ') no-repeat center/cover',backgroundSize:'100% 100%'}">
            <img src="../assets/img/play.png" alt="">
            <span class="time">{{i.tea_date}} {{i.tea_period}}</span>
            <span class="p_n">{{i.tea_play_count}}次播放</span>
          </div>
          <div class="right">
            <p class="name">{{i.tea_title}}</p>
            <p class="intro">介绍：{{i.tea_desc}}</p>
            <div class="mark">
              评分:
              <ul class="tea">
                <li class="img" v-for="x in i.tea_score" :key="x">
                  <img src="../assets/img/tea.png" alt="">
                </li>
              </ul>
            </div>
            <div class="rest_n">
              <div class="num_n">仅剩{{i.tea_count}}份</div>
              <div class="rest_box" :style="{width:i.tea_count/i.tea_total*100+'%'}"></div>
            </div>
            <div class="pri">
              <div class="pri_l">
                ￥<p>{{i.tea_price}}.</p>00 <span>/{{i.tea_format}}g</span>
              </div>
              <div class="pri_r" @click.stop="$router.push({path:'/pay',query:{id:i.id,type:'buy'}})" v-if="i.tea_count!=0">马上抢</div>
              <div class="pri_r" @click.stop="$router.push({path:'/teaLike',query:{id:i.id}})" v-else>查看相似</div>
            </div>
          </div>
        </li>  
      </ul>
    </div>
    <div class="xuan" @click="$router.push('/myInfo')">
      <img src="../assets/img/question.png" alt="">
    </div>
  </div>
</template>

<script>
import {hobbiesList} from '../api/api.js'
export default {
  data () {
    return {
      token:sessionStorage.token ||"",
      list:[],
    }
  },
  created(){
    document.title = '爱好'
    this.init()
  },
  methods:{
    init(){
      hobbiesList({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.list = res.data.data
          console.log(this.list)
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
  border-top 1px solid  #E8E8E8
  padding  l(10) 0 0
  .xuan
    width l(120)
    height l(80)
    position fixed
    right 0
    top 80%
    img 
      display block
      width 100%
      height 100%
  .content
    height l(656)
    background #F7F7F7
    overflow-y scroll
    box-shadow: 0 0 5px 0 #E8E8E8;
    position relative
    ul.h_list
      
      .h_li
        padding l(25) 4.3% l(15)
        margin-bottom l(15)
        disFlex ()
        background #fff
        .left
          width l(162)
          height l(110)
          position relative
          backgroundIcon ('list1.png')
          img
            display block
            width l(35)
            height l(35)
            position absolute
            left 0
            right 0
            bottom 0
            top 0
            margin auto
          .time
            background rgba(0,0,0,0.2)
            padding 0 l(3)
            font-size: 10px;
            color: #95514C;
            letter-spacing: 0.23px;
            line-height l(14)
            position absolute
            top 0
            right 0
          .p_n
            fz(10)
            color: #FFFFFF;
            letter-spacing: 0.23px;
            line-height l(14)
            position absolute
            left 0
            bottom 0
            padding 0 l(5)
        .right
          height l(110)
          padding-left l(5)
          width 50%
          p.name
            font-size: 14px;
            color: #333333;
            letter-spacing: 0.24px;
            line-height: l(23);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width l(170)
            text-align left 
          p.intro
            font-size: 12px;
            color: #666666;
            letter-spacing: 0.21px;
            line-height: 23px;
            text-align left 
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          div.mark
            display flex
            justify-content flex-start
            align-items center
            font-size: 12px;
            color: #666666;
            letter-spacing: 0.21px;
            margin l(5) 0
            ul
              display flex
              justify-content flex-start
              align-items center
              margin-left l(5)
              li.img
                width l(15)
                height l(12)
                margin-right l(3)
                img 
                  display block
                  width l(15)
                  height l(12)
          .rest_n
            width l(80)
            height l(17)
            background: rgba(230,52,67,0.30);
            border-radius: 4px;  
            position relative 
            margin l(5) 0
            font-size: 10px;
            color: #FFFFFF;
            letter-spacing: 0.21px;
            line-height l(17)
            text-align center
            .num_n
              position absolute
              height 100%
              left 0
              top 0
              z-index 99
              padding-left 5px
            .rest_box
              position absolute
              left 0
              top 0px
              width 80%
              height 100%
              background: #E63443;
              border-radius: 4px 0 0 4px;
          div.pri
            disFlex ()
            .pri_l
              display flex
              justify-content flex-start
              align-items center
              fz(12)
              color:  #E63443;
              letter-spacing: 0.31px;
              p
                fz(14)
              span 
                font-size: 12px;
                color: #3F3F3F;
                letter-spacing: 0.31px;
            .pri_r
              width l(60)
              height l(23)
              background: #FFFFFF;
              border: 1px solid #F6AEAE;
              border-radius: 100px;
              fz(14)
              color: #E63443;
              letter-spacing: 0.23px;
              line-height l(23)
</style>
