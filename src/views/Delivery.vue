<template>
  <div class = "delivery">
    <div class="container my-5">
          <div class="text-left mx-3 my-2">
              <h5>Please fill up your delivery information:  </h5>
              <div class="form-group">
                <input class="form-control" placeholder="Full name">
              </div>
              <div class="form-group">
                <input class="form-control" placeholder="Phone">
              </div>
              <div class="form-group">
                <input class="form-control" placeholder="Postcode">
              </div>
              <div class="form-group">
                <input class="form-control" placeholder="Address">
              </div>
              <div class="info mt-3">
                  <h4 class="text-left">Number of items: {{ this.$store.getters.totalItems}}</h4>
                  <h3 class="text-left">Total price: {{ this.$store.getters.totalPrice  | currency}}</h3>
              </div>
          </div>
    </div>    
    <div class = "container d-flex justify-content-between my-5">
        <a type="button" href="/checkout" class="btn btn-light">previous step</a>
        <a type="button" class="btn btn-info" @click="checkout">check out</a>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "delivery",
    props: {
      msg: String
    },
    components: {
    },


    methods: {
      checkout() {
        window.checkout = true;
        this.$router.replace('/admin/orders').catch(e => {console.log(e)}); 
        this.$store.commit('makeorder')
        
      }
    }  
  };
</script>
     
<style scoped lang="scss">
  .myMOUSE {
  cursor: pointer;
  }
  .footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin-bottom: 0px;
  }

  
</style>