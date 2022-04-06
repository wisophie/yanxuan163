import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/tab/home",
  },
  {
    path: "/tab",
    component: () => import("components/Tab"),
    children: [
      {
        path: "home",
        component: () => import("../views/Home"),
        meta: {
          title: "首页",
        },
        children: [
          {
            path: "searchPopup",
            component: () => import("components/home/SearchPopup"),
            meta: {
              title: "搜索"
            }
          },
        ],
      },
      {
        path: "special",
        component: () => import("../views/Special"),
        meta: {
          title: "专题",
        },
      },
      {
        path: "category",
        component: () => import("../views/Category"),
        meta: {
          title: "分类",
        },
        children: [
          {
            path: "popup",
            component: () => import("components/home/SearchPopup"),
            meta: {
              title: "搜索"
            }
          },
        ],
      },
      {
        path: "cart",
        component: () => import("../views/Cart"),
        meta: {
          title: "购物车",
        },
      },
      {
        path: "user",
        component: () => import("../views/User"),
        meta: {
          title: "用户",
        },
      },
    ],
  },
  {
    path:'/channel/:id',
    component:()=>import('@/components/home/Channel'),
    meth:{
      title:'商品分类'
    }
  },
  {
    path:'/shopdetail/:id',
    component:()=>import('@/components/common/ShopDetail'),
    meth:{
      title:'商品详情'
    }
  },
  {
    path:'/brand_detail/:id',
    component:()=>import('components/home/BrandDetail'),
    meta:{
      title:'品牌详细'
    }
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

//路由拦截
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.path == "/tab/cart") {
    if (token) {
      next()
    } else {
      console.dir(Vue)
      Vue.prototype.$toast("请先登录")
      setTimeout(()=>{next("/tab/user")},1000)
    }
    return;
  }
  next();
});

//解决路由重复报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
