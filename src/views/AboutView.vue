<template>
  <div class = "aboutview">
    <Navbar></Navbar>
    <About></About>
    <Cart></Cart>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import About from '../components/About'
import Cart from '../components/Cart'

export default {
  name: "aboutview",
  components:{
    Navbar, About, Cart
  }
};
</script>
  
  