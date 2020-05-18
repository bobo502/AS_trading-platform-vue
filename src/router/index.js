import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import index from '../components/index.vue';
import goods from '../components/goods.vue';
import AskForBuy from '../components/AskForBuy.vue';
import AddSchool from '../components/AddSchool.vue';
import register from '../components/register.vue';
import login from '../components/login.vue';
import productdetail from '../components/productdetail.vue';

import Admin from '../components/manager/admin.vue';
import category from '../components/manager/category.vue';
import articles from '../components/manager/articles.vue';
import ask_buy from '../components/manager/ask_buy.vue';
import commodity from '../components/manager/commodity.vue';
import university from '../components/manager/university.vue';
import user from '../components/manager/user.vue';




import Personal from '../components/personal.vue';
import release1 from '../components/user/release_commodities.vue';
import release2 from '../components/user/release_buy.vue';


import personInfo from '../components/user/personInfo.vue';
import goodsInfo from '../components/user/goodsInfo.vue';
import BuyInfo from '../components/user/BuyInfo.vue';

export default new VueRouter({
    routes: [{
            path: '/',
            component: index,
            name: "首页"
        },
        {
            path: '/goods',
            component: goods,
            name: "二手"
        },
        {
            path: '/AskForBuy',
            component: AskForBuy,
            name: "求购"
        },
        {
            path: '/AddSchool',
            component: AddSchool,
            name: "开通学校"
        },
        {
            path: '/register',
            component: register,
            name: "注册",
            hidden: true
        },
        {
            path: '/login',
            component: login,
            name: "登录",
            hidden: true
        },
        {
            path: '/manager',
            component: Admin,
            name: "管理员后台",
            hidden: true,
        },
        {
            path: '/manager',
            component: Admin,
            name: "用户管理",
            manager: true,
            hidden: true,
            children: [{
                    path: '/university',
                    component: university,
                    name: '学校列表'
                },


                {
                    path: '/user',
                    component: user,
                    name: '用户管理'
                },

            ]
        },
        {
            path: '/manager',
            component: Admin,
            name: "资讯管理",
            manager: true,
            hidden: true,
            children: [{
                    path: '/articles',
                    component: articles,
                    name: '动态信息管理'
                },
                {
                    path: '/ask_buy',
                    component: ask_buy,
                    name: '求购管理'
                },
            ]
        },
        {
            path: '/manager',
            component: Admin,
            name: "商品管理",
            manager: true,
            hidden: true,
            children: [{
                    path: '/category',
                    component: category,
                    name: '商品分类'
                },
                {
                    path: '/commodity',
                    component: commodity,
                    name: '商品信息'
                },
            ]
        },
        {
            path: '/personal',
            component: Personal,
            name: "个人中心",
            hidden: true,
            person: true,
            children: [{
                    path: '/personInfo',
                    component: personInfo,
                    name: '个人信息'
                },
                {
                    path: '/goodsInfo',
                    component: goodsInfo,
                    name: '我的商品'
                },
                {
                    path: '/BuyInfo',
                    component: BuyInfo,
                    name: '我的求购'
                }
            ]
        },
        {
            path: '/release',
            component: release1,
            name: "发布商品",
            hidden: true
        },
        {
            path: '/release_buy',
            component: release2,
            name: "发布求购",
            hidden: true
        }, {
            path: '/productshowdetail',
            hidden: true,
            component: productdetail,
            name: '商品详情'
        }
    ]
})