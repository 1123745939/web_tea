import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import goodDetail from '@/components/goodDetail'
import teaSame from '@/components/teaSame'
import teaLike from '@/components/teaLike'
import car from '@/components/car'
import pay from '@/components/pay'
import orders from '@/components/orders'
import orderDetail from '@/components/orderDetail'
import my from '@/components/my'
import myInfo from '@/components/myInfo'
import search from '@/components/search'
import searchResult from '@/components/searchResult'
import infos from '@/components/infos'
import address from '@/components/address'
import addressAdd from '@/components/addressAdd'
import hotDiscuss from '@/components/hotDiscuss'
import videoPlay from '@/components/videoPlay'
import teaFriend from '@/components/teaFriend'
import teaFriendsList from '@/components/teaFriendsList'
import evaluate from '@/components/evaluate'
import hobby from '@/components/hobby'
import collection from '@/components/collection'
import thumbs from '@/components/thumbs'
import slots from '@/components/slots'
import login from '@/components/login'
import forgetPass from '@/components/forgetPass'
import changePass from '@/components/changePass'
import register from '@/components/register'
import personalInfo from '@/components/personalInfo'
import changePhone from '@/components/changePhone'
import discussAll from '@/components/discussAll' 
import applySale from '@/components/applySale' //申请售后
import kinds from '@/components/kinds' 
import more from '@/components/more' 
import aboutUs from '@/components/aboutUs' 
import feedback from '@/components/feedback' 
import contact from '@/components/contact' 
import help from '@/components/help'
import bind from '@/components/bind'



Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/goodDetail',
      name: 'goodDetail',
      component: goodDetail
    },
    {
      path: '/teaSame',
      name: 'teaSame',
      component: teaSame
    },
    {
      path: '/teaLike',
      name: 'teaLike',
      component: teaLike
    },
    {
      path: '/car',
      name: 'car',
      component: car
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    },
    {
      path: '/orders',
      name: 'orders',
      component: orders
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/my',
      name: 'my',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: my
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: myInfo
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: searchResult
    },
    {
      path: '/infos',
      name: 'infos',
      component: infos
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/addressAdd',
      name: 'addressAdd',
      component: addressAdd
    },
    {
      path: '/hotDiscuss',
      name: 'hotDiscuss',
      component: hotDiscuss 
    },
    {
      path: '/videoPlay',
      name: 'videoPlay',
      component: videoPlay 
    },
    {
      path: '/teaFriend',
      name: 'teaFriend',
      component: teaFriend 
    },
    {
      path: '/teaFriendsList',
      name: 'teaFriendsList',
      component: teaFriendsList 
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate 
    },
    {
      path: '/hobby',
      name: 'hobby',
      component: hobby
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection
    },
    {
      path: '/thumbs',
      name: 'thumbs',
      component: thumbs
    },
    {
      path: '/slots',
      name: 'slots',
      component: slots
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forgetPass',
      name: 'forgetPass',
      component: forgetPass
    },
    {
      path: '/changePass',
      name: 'changePass',
      component: changePass
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: personalInfo
    },
    {
      path: '/changePhone',
      name: 'changePhone',
      component: changePhone
    },
    {
      path: '/discussAll',
      name: 'discussAll',
      component: discussAll
    },
    {
      path: '/applySale',
      name: 'applySale',
      component: applySale
    },
    {
      path: '/kinds',
      name: 'kinds',
      component: kinds
    },
    {
      path: '/more',
      name: 'more',
      component: more
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/bind',
      name: 'bind',
      component: bind
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (localStorage.token) {  // 通过vuex state获取当前的token是否存在
//           next();
//       }
//       else {
//           next({
//               path: '/login',
//               //query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//   }
//   else {
//       next();
//   }
// })
export default router
