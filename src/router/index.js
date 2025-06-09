import { createRouter, createWebHashHistory } from "vue-router";
import useMainStore from '@/stores/modules/main'

const router = createRouter({
  history: createWebHashHistory(),
  //映射关系：path->components
  routes:[
    {
      path: "/login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        hideTabBar: true
      }
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: () => import("@/views/home/home.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/favor",
      component: () => import("@/views/favor/favor.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/message",
      component: () => import("@/views/message/message.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/order",
      component: () => import("@/views/order/order.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/city",
      component: () => import("@/views/city/city.vue"),
      meta: {
        hideTabBar: true,
        requiresAuth: true
      }
    },
    {
      path: "/search",
      component: () => import("@/views/search/search.vue"),
      meta: {
        hideTabBar: true,
        requiresAuth: true
      }
    },
    {
      path: "/detail/:houseId",
      component: () => import("@/views/detail/detail.vue"),
      meta: {
        hideTabBar: true,
        requiresAuth: true
      }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const mainStore = useMainStore()
  const token = mainStore.token

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router