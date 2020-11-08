<template>
  <div class="modal fade" id="itemInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-left" id="exampleModalLabel">{{currentProduct.name}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <carousel id = "info" :perPage="1" >
            <slide v-for="(image, index) in currentProduct.images" :key="index">
                  <img :src="image"  alt="..." width="250px">
            </slide>
          </carousel>
          <h5 class="text-left" style="font-weight: 800">Price:</h5>
          <h5 class="text-left mb-5">{{currentProduct.price | currency}}</h5>
          <h5 class="card-description text-left" v-html = "currentProduct.description">Description of the item</h5>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "itemInfo",
    props: {
      product: String 
    },
    data() {
      return {
        currentProduct: this.product
      };
    }
  } 
</script>