<template>
  <div class="con">
    <div class="sex">
      <div class="aa" v-for="(item,index) in questionList" :key="item.question_nid">
        <span>{{item.title}}</span>
        <ul v-if="item.type!='text'">
          <li v-for="(i,index1) in item.values" :key="i.key" @click="change(index,index1)">
            <div :class="i.if_select?'active':''"></div><p>{{i.value}}</p>
          </li>
        </ul>
        <textarea  v-else @change="write(index)" v-model="item.value" placeholder="请输入"></textarea>
      </div>
    </div>
    <div class="sub" @click="checkCode">保存并提交</div>
  </div>
</template>

<script>
import utils from '../utils/js/style.js'
import { Group, CellBox, Checklist ,XTextarea} from 'vux'
import { HobbyList ,saveQuestion } from '../api/api.js'
export default {
   components: {
    Group,
    Checklist,
    XTextarea,
  },
  data () {
    return {
      token : localStorage.token || '',
      questionList:[],
      value:''
    }
  },
  created(){
    document.title = '爱好调查'
    this.init()
  },
  methods:{
    init(){
      HobbyList({token:this.token}).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.questionList = res.data.data
          this.questionList.forEach(item=>{
            item.values.forEach(ele=>{
              if(item.value){
                if(item.value.split(',').indexOf(ele.key)!=-1){
                  ele.if_select = true
                }else{
                  ele.if_select = false
                }
              }else{
                ele.if_select = false
              }
              
            })
          })           
          console.log(this.questionList,'this.questionList')
        }else{
          this.$vux.toast.text(res.data.error_message||res.data.message)
        }        
      })
    },
    change (index1, index2) {
      console.log('change', index1, index2)
      if(this.questionList[index1].type=='radio'){//单选
        if(this.questionList[index1].values[index2].if_select == false){
          this.questionList[index1].values.forEach(item=>{
            item.if_select = false
          })
          this.questionList[index1].values[index2].if_select = true
        }else{
          this.questionList[index1].values.forEach(item=>{
            item.if_select = false
          })
        this.questionList[index1].values[index2].if_select = false
        }
        
      }else{
        if(this.questionList[index1].values[index2].if_select == false){
          this.questionList[index1].values[index2].if_select = true
        }else{
          this.questionList[index1].values[index2].if_select = false
        }
      }
      this.$forceUpdate();//页面强制手动重新渲染
      console.log(this.questionList)
    },
    write(index){
      console.log()
    },
    checkCode(){
      var arr = []
      this.questionList.forEach(item=>{
        var obj = {}
        obj.q_id = item.id
        obj.key = item.values[0].question_nid
        if(item.type!='text'){
          var selArr = []
          item.values.forEach(ele=>{
            if(ele.if_select == true){
              selArr.push(ele.key)
            }
          })
          obj[item.values[0].question_nid] = selArr.join(',')
        }else{
          obj[item.values[0].question_nid] = item.value
        }
        
        arr.push(obj)
      })
      console.log(arr)
      console.log(this.questionList)
   
      //接下来 调接口 保存
      const options = {
        token :this.token,
        data :JSON.stringify({values:arr})
      }
      console.log(options)
      
      saveQuestion(options).then(res=>{
        if(res.data.code == 200 && !res.data.error_code){
          this.$vux.toast.text('提交成功')
          setTimeout(()=>{
            this.$router.push('/hobby')
          },1000)
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
  border-top 1px solid #E8E8E8;
  height l(667)
  text-align left 
  padding-bottom l(20)
  .sub
    width l(160)
    height l(44)
    background: #FF5100;
    border-radius: 100px;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 1.12px;
    line-height l(44)
    margin-left 28.8%
    margin-top l(50)
    text-align center
    margin-bottom l(50)
  .gr
    background #ffffff
    padding 0 4.3%
    height l(598)
    li
      height l(58)
      disFlex ()
      border-bottom 1px solid #E8E8E8
      span 
        fz(16)
        color: #333333;
        letter-spacing: 0.36px;
      div
        disFlex ()
        fz(14)
        color #333
        img 
          display block
          width l(8)
          height l(13)
          margin-left l(10)
  .sex
    background #ffffff
    margin-top l(10)
    .aa
      padding l(5) 4.3% 0
      
      span 
        fz(16)
        color: #333333;
        letter-spacing: 0.36px;
        display block
        padding l(5) 0
      ul
        width 100%
        margin-top l(5)
        li
          display flex
          justify-content flex-start
          height l(40)
          align-items center
          border-bottom 1px solid #E8E8E8
          div
            width l(18)
            height l(18)
            backgroundIcon ('c_blank.png')
            margin-right l(20)
          div.active
            backgroundIcon ('c_active.png')
          p
            fz(14)
            color: #333333;
            letter-spacing: 0.31px;
            margin-right l(20)
      textarea
        border 1px solid #cccccc
        resize none 
        display block
        width 100%
        height l(50)
        padding l(5)
</style>
