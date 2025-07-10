import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import OrderPage from '../pages/OrderPage.vue'
import Pricelist from '../views/PriceList.vue'
import ContactUs from '../views/ContactUs.vue'
import OrderView from '../views/OrderView.vue'
import LoginView from '../views/LoginView.vue'

import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order/:game?',
    name: 'OrderPage',
    component: OrderPage,
    props: true
  },
  {
    path: '/pricelist/:game?',
    name: 'Pricelist',
    component: Pricelist,
    props: true
  },
  {
    path: '/contact',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrderView,
    meta: { requiresAdmin: true }
  },

  {
  path: '/payment/:orderId',
  name: 'Payment',
  component: () => import('@/views/PaymentPage.vue'),
  props: true
  },

  {
  path: '/topup/:game',
  name: 'TopUpForm',
  component: () => import('@/components/TopUpForm.vue'),
  props: true
  },


  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Guard: hanya 'admin' yang bisa akses /orders
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (to.meta.requiresAdmin && store.username !== 'admin') {
    alert('Akses ditolak. Halaman ini hanya bisa diakses oleh admin.')
    return next('/') // redirect ke Home jika bukan admin
  }
  next()
})

export default router
