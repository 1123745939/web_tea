<template>
  <div id="app">
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    this.init()
  },
  methods:{
    //屏蔽掉微信分享的按钮
    init(){
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
          WeixinJSBridge.call('hideOptionMenu');
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #ccc;
}
</style>

