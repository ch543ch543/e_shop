<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: white" >
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link" href="#">Home </router-link>
          <li class="nav-item">
            <router-link to="/aboutview" class="nav-link" href="#">About</router-link>
          </li>
          <li class="nav-item">
              <router-link  class="nav-link" to="/productsview" href="#">Products</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/admin" v-if = " login != null " >Member center</a>
            <a class="nav-link" data-toggle="modal" data-target="#login" v-if = " login === null" >Member center</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <a class="btn my-2 my-sm-0" data-toggle="modal" data-target="#login" v-if = " login === null" style="border-color: cadetblue; color: cadetblue;">Login/ Signup</a>
          <a class="btn my-2 my-sm-0" @click = "logout()" v-if = " login != null" style="border-color: cadetblue; color: cadetblue;">Logout</a>
          <a class="fas fa-shopping-cart mx-3 my-3" data-toggle="modal" data-target="#miniCart" style="color: cadetblue;"></a>
        </form>
      </div>
    </nav>
    <Login></Login>
    <router-view></router-view>
  </div>
</template>

<script>
import {fb, db} from '../firebase';
import Login from "../components/Login.vue";
// import $ from 'jquery';

export default {
  name: "Navbar",
  props: {
    msg: String
  },
  components: {
    Login
  },
  data(){
    return{
      login: fb.auth().currentUser
    }
  },
  methods: {
    logout() {
      fb.auth().signOut()
      .then(() => {
          this.$router.replace('/');
          window.Toast.fire({
          type: 'success',
          title: "You're logged out!"
          })
      })
      .catch((error) => {
        console.log(error);
      });
    },
    Membercenter() {
      console.log(fb.auth().currentUser);
      if(fb.auth().currentUser){
        var user = fb.auth().currentUser;
        var docRef = db.collection("profiles").doc(user.uid);
        docRef.get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data().role);
          var role = doc.data().role;
          return role;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        }).then( (role) => {
            if(role != 'user'){
                this.$router.replace('/adminforadmin')
            } else {
              this.$router.replace('/admin')
            }
        })
        .catch(function(error) {
        console.log("Error getting document:", error);
        });
      } else if (fb.auth().currentUser == null){
        window.Swal.fire({
        icon: 'error',
        title: 'Wrong password!'
        })
      };
    }
  }  
}
</script>
