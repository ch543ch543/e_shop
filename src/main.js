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
import Vue2Filters from 'vue2-filters'
import VueCarousel from 'vue-carousel';
import Vuex from 'vuex'

require('firebase/firestore');
Vue.use(VueCarousel);
Vue.use(Vuex)
Vue.use(VueFirestore);
Vue.use(VueRouter);
Vue.use(Vue2Filters);
Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
});

Vue.config.productionTip = false;
Vue.config.devtools = true;

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
window.Swal = Swal;

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

//金額格式
Vue.filter('currency', function (num) {
  return 'NTD ' + num;
}); 

