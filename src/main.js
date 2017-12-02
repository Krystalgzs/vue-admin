// 1.0 导入vue.js  <script src="vue.js">
// import vue from 'vue'
// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件


// 3.0 导入vue-router这个路由模块进行整个系统的路由控制
// 3.0.1 导入vue-router这个包
import VueRouter from 'vue-router';

// 3.0.0 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

// 3.0.2 导入组件对象
import layout from './components/layout.vue';
import login from './components/account/login.vue';

import '../statics/theme_rms/index.css';
// 商品相关的组件
import goodslist from './components/goods/goodslist.vue';
import goodsadd from './components/goods/goodsadd.vue';
import goodsedit from './components/goods/goodsedit.vue';
import catelist from './components/goods/catelist.vue';
// 3.0.2 实例化对象并且定义路由规则
var router = new VueRouter({
    routes:[
        // 默认跳转的路由规则
        {name:'default',path:'/',redirect:'/admin'},
        // 登录
        {name:'login',path:'/login',component:login,meta:"nologin"},
        // 布局
        {name:'layout',path:'/admin',component:layout,
        children:[
            // 商品列表
            {name:'goodslist',path:'goodslist',component:goodslist,meta:{mno:"1-1"}},
            {name:'goodsadd',path:"goodsadd",component:goodsadd,meta:{mno:"1-1"}},
            {name:'goodsedit',path:"goodsedit/:goodsid",component:goodsedit,meta:{mno:"1-1"}},
            {name:'catelist',path:"catelist",component:catelist,meta:{mno:"1-2"}},
        ]
    }
    ]
});

// 4.0 导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入自己编写的全局样式
import '../statics/css/site.css';
// 绑定到vue中
Vue.use(elementUI);
// 导入默认样式(由于咱们自己修改了样式所以要替换默认样式)
import '../statics/theme_rms/index.css';
// 5.0导入axios
import axios from 'axios';
// 设定axios的默认请求域名 
// axios.defaults.baseURL = 'http://192.168.84.200';
// http://127.0.0.1:8899/admin/goods/getlist?pageIndex=1&pageSize=12&searchvalue=
axios.defaults.baseURL = 'http://127.0.0.1:8899';

// 配置axios在请求数据服务接口的时候 允许带上cookie(凭证)
axios.defaults.withCredentials = true;

// 将axios对象绑定到Vue的原型属性$ajax上
Vue.prototype.$ajax = axios;

router.beforeEach((to,from,next)=>{
    // console.log(to);
    // console.log(from);
    // 如果进入的时登录页面 由于登录的路由规则上有一个  meta:{nologin:true} 而其他规则上没有
    // console.log(to.meta.nologin);
    if(to.meta.mno){
        window.localStorage.setItem("currentMID",to.meta.mno);
        console.log(to.meta.mno);
    }
    if(to.meta=="nologin"){
        next();
        return;
    }
    axios.get("/admin/account/islogin").then(res=>{
        if(res.data.code=="logined"){
            next();
        }else if(res.data.code=="nologin"){
            // 跳转回登录页面
            router.push({name:'login'});
        }
    })
    // next();
})

// 3.0 实例化vue对象
new Vue({
    el:'#app',
    router,  //绑定路由对象使它生效
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render:create=>create(App)
});