<template>
  <div class = "productview">
    <Navbar></Navbar>
    <Product></Product>
    <Cart></Cart>
  </div>
</template>
  
  <script>
  import Navbar from '../components/Navbar'
  import Product from '../components/Product'
  import Cart from '../components/Cart'
  
  export default {
    name: "productview",
    props: {
      msg: String
    },
    components:{
      Navbar, Product, Cart
    }
  };
  </script>