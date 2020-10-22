<template>
    <div class = "about">
      <div class = "container h-100 my-5">
        <div class = "row h-100 justify-content-center align-items-center">
            <div class = "col-md-6">
                <div class = "graphic">
                    <img class = "rounded mx-auto d-block" src = "../assets/about/travel.jpeg" alt="">
                </div>
            </div>
            <div class = "col col-md-6">
                <div class = "hero-content">
                    <h1 class = "hero-title">
                       About Us
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos numquam tempora, iure delectus totam minus quam aperiam ratione dolores magni voluptates ut necessitatibus odio ipsum fuga, voluptas ab praesentium nihil?
                    </p>
                    <div class = "hero-btn mt-6">
                        <router-link to="/productview" class = "btn custom-btn btn-info" style="background-color:cadetblue; border-color: transparent;">Browse Products</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Cart></Cart>
    </div>
  </template>
  
  <script>
    import Cart from "../components/Cart";
  
    export default {
      name: "about",
      props: {
        msg: String
      },
      components: {
        Cart
      }
    };
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped lang="scss">
      .about{
        width: 100%;
        padding-bottom: 5rem;
        margin-right: auto;
        margin-left: auto;
      }
      .graphic img{
        width: 100%;
        height: auto;
      }
      .col{
        padding-top: 5px;
      }
    </style>