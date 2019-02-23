import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import resetPassword from '@/components/resetPassword'
import homePage from '@/components/homePage'
import approvalLevelUp from '@/components/approvalLevelUp'
import personalCenter from '@/components/personalCenter'
import promotionLinks from '@/components/promotionLinks'
import modifyInfo from '@/components/modifyInfo'
import parternerInfo from '@/components/parternerInfo'
import foot from '@/components/foot'

import axios from 'axios'
Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://b.bozhouit.cn/public/index.php/index/';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'login',component: login},
    {path: '/reset',name: 'resetPassword',component: resetPassword},
    {path: '/homePage',name: 'homePage',component: homePage},
    {path: '/approvalLevelUp',name: 'approvalLevelUp',component: approvalLevelUp},
    {path: '/personalCenter',name: 'personalCenter',component: personalCenter},
    {path: '/promotionLinks',name: 'promotionLinks',component: promotionLinks},
    {path: '/modifyInfo',name: 'modifyInfo',component: modifyInfo},
    {path: '/parternerInfo',name: 'parternerInfo',component: parternerInfo},
		{path: '/foot',name: 'foot',component: foot}
  ]
})
