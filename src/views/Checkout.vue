<template>
  <div class = "checkout">
  <h3 class=" py-4" > Your Cart </h3> 
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
        <tr v-for='(item, index) in this.$store.state.cart' :key='index'>
          <th>
            <span class="float-left myMOUSE" @click="$store.commit('removeFromCart', item)">X</span>
            <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt=""> 
          </th>
          <td class="align-middle">{{item.productName}}</td>
          <td class="align-middle">{{item.productPrice | currency}}</td>
          <td class="align-middle">
            <span class="myMOUSE" @click="$store.commit('minusitem', item)">-</span>
            {{item.productQuantity}}
            <span class="myMOUSE" @click="$store.commit('additem', item)">+</span>
          </td>
          <td class="align-middle">{{ item.productPrice * item.productQuantity  | currency}}</td>  
        </tr>  
        <tr>
          <td colspan="4" style="text-align:left">Total Price</td>
          <td colspan="1">{{ this.$store.getters.totalPrice  | currency}}</td>
        </tr>
      </tbody>
    </table>
  </div>
    <div class = "container d-flex justify-content-between  my-5">
      <a type="button" href="/" class="btn btn-light">back to homepage</a>
      <a type="button" href="/delivery" class="btn btn-info">next step</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkout",
};
</script>
   
<style scoped lang="scss">
  .myMOUSE {
    cursor: pointer;
  }
</style>