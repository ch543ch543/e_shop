<template>
  <div class="products" >
    <div class="container">
      <h1 class="text-center p-5">Our Products List</h1>
      <div class="row">
        <div class="col-md-4" v-for="(product, index) in products" :key="index">
            <div class="card product-item h-100">
              <carousel :perPage="1">
                <slide v-for="(image, index) in product.images" :key="index">
                      <img :src="image" class="card-img-top" alt="..." width="250px">
                </slide>
              </carousel>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <h5 class="card-prices">{{ product.price | currency}}</h5>
                  <!-- <h5 class="card-description" v-html = "product.description"></h5> --> 
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
  </div>
</template>

<script>
import {db} from '../firebase';
import AddToCart from './AddToCart.vue'

export default {
  name: "Products-list",
  props: {
    msg: String
  },
  components:{
    AddToCart
  },
  data(){
    return {
        products: [],
        currency: '$'
    }
  },
  methods:{
  getImage(images){
      return images[0]; 
    }
  },
  firestore(){
    return {
      products: db.collection('products'),
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>