<template>
  <div class="adminforadmin">
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
                          <span class="admin" style="color:cadetblue; font-weight: bold;  text-align: left;" >ADMIN</span>
                          <span class="user-status" style="text-align: left;">
                              <i class="fa fa-circle"></i>
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
                            <router-link to = "/adminforadmin/profiles">
                                <i class="fa fa-book"></i>
                                <span class="menu-text">Profiles</span>
                            </router-link> 
                          </li> 

                          <li>
                            <router-link to = "/adminforadmin/addnewproduct">
                                <i class="fa fa-book"></i>
                                <span class="menu-text">Add new Products</span>
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
                  <!-- sidebar-menu  -->
              </div>
          </nav>
          <!-- sidebar-content  -->
          <main class = "page-content">
              <router-view/>
          </main>
          <!-- page-content  -->
          <main class="page-content pt-2">
              <div id="overlay" class="overlay"></div>
              <div class="container-fluid p-5">
 
              </div>
          </main>
        <!-- page-content" -->
      </div>
      <!-- page-wrapper -->
  </div>

</template>

<script>
// @ is an alias to /src
import $ from 'jquery';
import {db, fb} from '../firebase';

export default {
  name: "adminforadmin",
  data(){
    return{
        profiles: [],
        name: null,
        email: null ,
        photoURL: null
    }
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled")
    },
    logout() {
        fb.auth().signOut()
        .then(() => {
            this.$router.replace('/');
        })
        .catch((error) => {
            console.log(error);
        });
    }
  },
  firestore(){
      return{
        profiles: db.collection('profiles')
          }  
    },
  created(){
    var user = fb.auth().currentUser;
    this.email = user.email;
    this.photoURL = user.photoURL;
}
} 
</script>

<style>
  
</style>
