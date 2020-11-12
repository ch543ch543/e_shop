import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ProductsView from "../views/ProductsView.vue";
import Product from "../components/Product.vue";
import Admin from "../views/Admin.vue"
import Profiles from "../views/Profiles.vue"
import {fb} from "../firebase"
import Checkout from "../views/Checkout.vue"
import AboutView from "../views/AboutView.vue"
import Addnewproduct from "../views/Addnewproduct.vue"
import Delivery from "../views/Delivery.vue"
import Adminforadmin from "../views/Adminforadmin.vue"
import Orders from "../views/Orders.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/productsview",
    name: "productsview",
    component: ProductsView
  },
  {
    path: "/product",
    name: "product",
    component: Product
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true }, //有登入的人才能進入會員中心
    children: [
      {
        path: "profiles",
        name: "profiles",
        component: Profiles
      },
      {
        path: "checkout",
        name: "checkout",
        component: Checkout
      },
      {
        path: "orders",
        name: "orders",
        component: Orders
      }
    ]
  },
  {
    path: "/adminforadmin",
    name: "adminforadmin",
    component: Adminforadmin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "addnewproduct",
        name: "addnewproduct",
        component: Addnewproduct
      },
      {
        path: "profile",
        name: "profile",
        component: Profiles
      },
    ]
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout
  },
  {
    path: "/aboutview",
    name: "aboutview",
    component: AboutView
  },
  {
    path: "/delivery",
    name: "delivery",
    component: Delivery
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some( x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser 
  if (requiresAuth && !currentUser) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
      next("/")
    } else {
      next()
    }
})

export default router;
