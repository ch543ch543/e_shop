<template>
  <div class="login">
    <!-- Modal -->
    <div class="modal fade" id="login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class = "modal--navbar">
            <ul class="nav nav-fill nav-pills my-3 mx-2" id="pills-tab" role="tablist" >
              <li class="nav-item">
                  <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true" style="color: rgb(5, 28, 34);">Login</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false" style="color:rgb(5, 28, 34);">Signup</a>
              </li>
            </ul>

          
            <div class = "tab-content" id="pills-tabcontent">
            <!-- Login tag -->
              <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby = "pills-login-tab">

                <h5 class="text-center">Login Please</h5>
                <div class="login-input text-left mx-3 my-2">
                    <div class="form-group">
                      <label for="exampleInputEmail1" >Email address</label>
                      <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1" >Password</label>
                      <input type="password" @keyup.enter = "login" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-primary" @click = 'login' style="background-color: cadetblue; border-color:transparent ; color:rgb(5, 28, 34);">Login</button>
                </div>
              </div>

              <!-- Signup tag -->
              <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby = "pills-login-tab">
                <h5 class="text-center">Create New Account</h5>
                <div class="login-input text-left mx-3 my-2">

                    <div class="form-group">
                      <label for="name">Your name</label>
                      <input type="text" v-model="name" class="form-control" id="name" placeholder="Your beautiful name">
                    </div>

                    <div class="form-group">
                      <label for="email">Email address</label>
                      <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>

                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
                    </div>

                    <button class="btn btn-primary" @click = "register" style="background-color: cadetblue; border-color:transparent; color:rgb(5, 28, 34);">Signup</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>

import {fb, db} from '../firebase'
import $ from 'jquery';

export default {
  name: "Login",
  props: {
    msg: String
  },
  data(){
    return {
      name: null,
      email: null,
      password: null
    }
  },

  methods: {
    register(){
      fb.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => { 
        
        $('#login').modal('hide');
        
        db.collection("profiles").doc(user.user.uid).set({
          name: this.name,
          id: user.user.uid,
          role: "user",
        });

        db.collection("orders").doc(user.user.uid).set({
          name: this.name,
          id: user.user.uid,
        })


        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        this.$router.replace('admin').catch(e => {console.log(e)});
      })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      });
    },

    login(){

      fb.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => { 
        this.$router.replace('admin');
        $('#login').modal('hide');
      })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      //var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        window.Swal.fire({
        icon: 'error',
        title: 'Wrong password!',
        })
      } else {
        window.Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "The user does't exist!",
        })
      }
      console.log(error);
      });

    }
  }  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: #fff;
    background-color: cadetblue;
}

</style>
