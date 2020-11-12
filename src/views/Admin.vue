<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a id="show-sidebar" class="btn-sidebar btn-sm btn-dark pull-left">
        <i class = "fas fa-bars" @click = "closeMenu"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#">pro sidebar</a>
            <div id = "close-sidebar">
                <i class = "fas fa-times" @click = "closeMenu"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header d-flex flex-nowrap">
            <div class="user-pic">
                <img class="img-responsive img-rounded" :src="photoURL" alt="User picture">
            </div>
            <div class="user-info">
              <span class="user-email">{{email}}</span>
              <span class="admin" style="color:cadetblue; font-weight: bold;  text-align: left;" >USER</span>
              <span class="user-status">
                <i class="fa fa-circle" style="text-align: left;"></i>
                <span style="text-align: left;">Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-menu  -->
          <div class=" sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                  <span>Menu</span>
              </li>
              <li>
                <router-link to = "/admin/profiles">
                    <i class="fa fa-book"></i>
                    <span class="menu-text">Profiles</span>
                </router-link> 
              </li> 
              <li>
                <router-link to = "/admin/checkout">
                      <i class="fa fa-folder"></i>
                      <span class="menu-text">Checkout</span>
                    </router-link>
              </li>
              <li>
                <router-link  to = "/admin/orders">
                    <i class="fa fa-book"></i>
                    <span class="menu-text">Orders</span>
                </router-link> 
              </li>
              <li>
                <router-link to = "/">
                      <i class="fa fa-folder"></i>
                      <span class="menu-text">Home</span>
                    </router-link>
              </li>
              <li>
                <a href="#" @click = "logout()">
                  <i class="fa fa-folder"></i>
                  <span class="menu-text">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class = "page-content">
         <!-- 路由組件渲染到這裡 -->
          <router-view/> 
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import $ from 'jquery';
import {fb} from '../firebase';

export default {
  name: "Admin",
  data(){
    return{
        name: null,
        email: null ,
        photoURL: null,
        checkout: window.checkout,
    }
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled")
    },
    logout() {
      this.$router.replace('/')
      fb.auth().signOut()
      .then(() => {
        this.$router.replace('');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  created(){
    var user = fb.auth().currentUser;
    this.email = user.email;
    this.photoURL = user.photoURL;
  }
} 
</script>