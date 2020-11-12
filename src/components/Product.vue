<template>
  <div class="product" >
    <div class="container">
      <h1 class="text-center p-5">Our Products List</h1>
      <div class="row">
        <div class="col-md-4" v-for="(product, index) in products" :key="index">
          <div class="card product-item h-100">
            <carousel id = "pic" :perPage="1">
              <slide v-for="(image, index) in product.images" :key="index">
                <img :src="image" class="card-img-top" alt="..." width="250px">
              </slide>
            </carousel>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title ">{{ product.name}}</h5>
              <h5 class="card-prices ">{{ product.price | currency}}</h5>
              <a class='btn btn-light mx-auto' @click = 'info(product)'>More information</a>
            </div>
              <AddToCart
                :image="getImage(product.images)"
                :id="product.id"
                :price="product.price"
                :name="product.name"> 
              </AddToCart>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="itemInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-left" id="exampleModalLabel">{{ product.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <carousel id = "info" :perPage="1" >
              <slide v-for="(image, index) in product.images" :key="index">
                <img :src="image"  alt="..." width="250px">
              </slide>
            </carousel>
            <h5 class="text-left" style="font-weight: 800">Price:</h5>
            <h5 class="text-left mb-5">{{ product.price | currency }}</h5>
            <h5 class="card-description text-left" v-html = "product.description">Description of the item</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import {db} from '../firebase';
import $ from 'jquery';


import AddToCart from './AddToCart.vue'

export default {
  name: "product",
  components:{
    AddToCart
  },
  data(){
    return {
        products: [],
        product: {},
    }
  },
  methods:{
    getImage(images){
        return images[0]; 
    },
    info(product){
      $('#itemInfo').modal('show');
      this.product = product;
    }
  },
  firestore(){
    return {
      products: db.collection('products'),
    }
  }
};
</script>
  
<style scoped lang="scss">
    .product{
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>