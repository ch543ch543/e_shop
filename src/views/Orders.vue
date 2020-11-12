<template>
  <div class = "orders">
    <div v-if="checkout==null"> 
      <h1 style="font-weight: bold; margin-top: 30px; margin-left: 30px; text-align: left;">You have no orders yet!</h1>
    </div>
    <div v-if="checkout==true">
      <h3 class=" py-4" > Your Orders </h3> 
      <div class="container">
        <table class="table">
          <thead>
              <tr>
              <th style="width: 25%" scope="col">Image</th>
              <th style="width: 20%" scope="col">Name</th>
              <th style="width: 15%" scope="col">Price</th>
              <th style="width: 15%" scope="col">Quantity</th>
              <th style="width: 25%" scope="col">Total</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for='(item, index) in this.$store.state.order' :key='index'>
                <th>
                  <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt=""> 
                </th>
                <td class="align-middle">{{item.productName}}</td>
                <td class="align-middle">{{item.productPrice | currency}}</td>
                <td class="align-middle">{{item.productQuantity}}</td>
                <td class="align-middle">{{ item.productPrice * item.productQuantity  | currency}}</td>  
              </tr>  
              <tr>
                <td colspan="4" style="text-align:left">Price of the order</td>
                <td colspan="1">{{ this.$store.state.orderprice  | currency}}</td>
              </tr>
          </tbody>
        </table>
      </div>    
    </div>
  </div>
</template>
  
<script>
export default {
  name: "orders",
  data() {
    return{
      checkout: window.checkout
    }
  }
};
</script>