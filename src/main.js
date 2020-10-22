import Vue from "vue"; //當我們install vue的同時也install webpack
import App from "./App.vue";
import router from "./router";
import {fb} from './firebase';
import store from './Store.js'


import "popper.js"; 
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/app.scss";
import 'jquery';
import Swal from 'sweetalert2'
import VueFirestore from 'vue-firestore';
import VueRouter from 'vue-router'

Vue.use(VueRouter)


require('firebase/firestore')

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)


Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueFirestore);

window.Swal = Swal;


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


window.Toast = Toast;

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import Vuex from 'vuex'
Vue.use(Vuex)


Vue.component("Navbar", require('./components/Navbar.vue').default);
Vue.component("Hero", require('./components/Hero.vue').default);
Vue.component("ProductList", require('./components/ProductList.vue').default);
Vue.component("AboutView", require('./views/AboutView.vue').default);
Vue.component("AddToCart", require('./components/AddToCart.vue').default);

let app = '';

fb.auth().onAuthStateChanged(function() {
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

Vue.filter('currency', function (num) {
  return 'NTD ' + num;
  });

  window.checkout = null;