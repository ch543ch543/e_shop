<template>
    <div class = "hero">
        <div class = "container h-100">
            <div class = "row h-100 justify-content-center align-items-center my-5">
                <div class = "col-md-6 pb-3">
                    <div class = "hero-content">
                        <h1 class = "hero-title" style="text-align: left;">
                            Check out our latest apparel collection! 
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos numquam tempora, iure delectus totam minus quam aperiam ratione dolores magni voluptates ut necessitatibus odio ipsum fuga, voluptas ab praesentium nihil?
                        </p>
                        <div class = "hero-btn mt-5 text-center">
                            <router-link to="/aboutview" class = "btn btn-info mx-2" style="border-color: transparent; background-color: cadetblue;">About</router-link>
                            <router-link to="/productsview" class = "btn btn-outline-secondary mx-2">Products</router-link>
                        </div>
                    </div>
                </div>
                <div class = "col-md-6">
                    <div class = "graphic">
                        <img class = "rounded mx-auto d-block" src = "../assets/hero/hero_main.jpeg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: "Hero",
    };
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .hero{
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    }
    .graphic img{
    width: 100%;
    height: auto;
    }
    
</style>