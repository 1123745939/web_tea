import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import goodDetail from '@/components/goodDetail'
import car from '@/components/car'
import pay from '@/components/pay'
import orders from '@/components/orders'
import orderDetail from '@/components/orderDetail'
import my from '@/components/my'
import myInfo from '@/components/myInfo'
import search from '@/components/search'
// import searchResult from '@/components/searchResult'
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
import login from '@/components/login'
import forgetPass from '@/components/forgetPass'
import changePass from '@/components/changePass'
import register from '@/components/register'
import personalInfo from '@/components/personalInfo'
import changePhone from '@/components/changePhone'
import discussAll from '@/components/discussAll'

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
    // {
    //   path: '/searchResult',
    //   name: 'searchResult',
    //   component: searchResult
    // },
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
  ]
})

router.afterEach(res=>{

	window.scrollTo(0,0);
})
export default router
