<template>
    <div class="add-to-cart">
        <button class="btn btn-primary mb-3 mx-auto" @click = 'addToCart' style="background-color:cadetblue; border-color: transparent;">ADD TO CART</button>
        <Cart></Cart>
    </div>
</template>
  
<script>
    import $ from 'jquery'
    import Cart from "@/components/Cart.vue"
    export default {
    name: "add-to-cart",
    props: {
        name: String,
        price: String,
        id: String,
        image: String
    },
    data(){
        return{
            item: {
            productName: this.name, 
            productPrice: this.price,
            productId: this.id,
            productImage: this.image,
            productQuantity: 1, 
            }
        }
    },
    methods: {
        addToCart(){
            $('#miniCart').modal('show');
            this.$store.commit('addToCart', this.item)
        }
    },
    components: {
        Cart
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
