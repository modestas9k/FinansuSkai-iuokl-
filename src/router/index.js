import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAnon: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAnon: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAnon: true,
    },
  },
  {
    path: "/finance",
    name: "Finance",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Finance.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/addProduct",
    name: "AddProduct",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddProduct.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users/:user/:type/:id",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Product.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users/:user/:type/:id/add",
    name: "addProductItems",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddProductItems.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((route) => route.meta.requiresAuth)) {
      next({ path: "/" });
    } else if (user && to.matched.some((route) => route.meta.requiresAnon)) {
      next({ path: "/finance" });
    } else {
      next();
    }
  });
});

export default router;
