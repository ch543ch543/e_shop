<template>
  <div class="cart">
    <div class="modal fade" id="miniCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">My cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body row" v-for="(item, index) in this.$store.state.cart" :key="index">
            <div class="col-4">
                <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt=""> 
            </div> 
            <div class="col-8">
              <h5 class = "text-left" >{{item.productName}}
                <span class="float-right myMOUSE" @click="$store.commit('removeFromCart', item)">X</span>
              </h5>
              <h5 class = "text-left">{{item.productPrice}}</h5>
              <h5 class = "text-left">Quantity: {{item.productQuantity}}</h5>
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue shopping</button>
            <!-- 若為登入狀態則進入結帳頁面 -->
            <a class="btn btn-primary" href="#" v-if = " login != null" @click = "checkout">Check your Cart</a> 
            <!-- 若為未登入狀態則跳出登入視窗 -->
            <a class="btn btn-primary" data-toggle="modal" data-target="#login" @click = "checkout" v-if = " login === null">Check your Cart</a>
          </div>
        </div>
      </div>
    </div>
    <Login></Login>
  </div>
</template>

<script>
  import $ from 'jquery';
  import {fb} from "../firebase";
  import Login from "@/components/Login.vue";

  export default {
    name: "cart",
    data(){
      return{
        login: fb.auth().currentUser
      }
    },
    components:{
      Login
    },
    methods: {
      checkout(){
        if(fb.auth().currentUser){
          this.$router.replace('checkout');
          $('#miniCart').modal('hide');
        }else if (fb.auth().currentUser == null){
          $('#miniCart').modal('hide');
        };
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  
</style>