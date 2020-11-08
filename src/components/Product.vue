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
              <a class='btn btn-light mx-auto' @click="info(product)">More information</a> 
            </div>
              <Iteminfo :product="product"></Iteminfo>
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
  </div>
</template>
  
<script>
import {db} from '../firebase';
import $ from 'jquery'
import Iteminfo from './Iteminfo.vue'
import AddToCart from './AddToCart.vue'

export default {
  name: "product",
  components:{
    Iteminfo, AddToCart
  },
  data(){
    return {
        products: [],
        currentProduct: ''
    }
  },
  methods:{
    getImage(images){
        return images[0]; 
    },
    info(product){
          this.currentProduct = product
          console.log(product);
          $('#itemInfo').modal('show')
    }
  },
  firestore(){
    return {
      products: db.collection('products'),
    }
  },
  created() {
    console.log(this.products)
  }
};
</script>
  
<style scoped lang="scss">
    .product{
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>