import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart');

export default new Vuex.Store({
    state: {
        cart: cart ? JSON.parse(cart) : [],
        
    },

    getters: {
        totalPrice: state => {
            let total = 0;
            state.cart.filter((item) => {
                total +=( item.productPrice * item.productQuantity );
            });

            return total;
        },
        totalItems: state => {
            let totalitem = 0;
            state.cart.filter((item) => {
                totalitem +=(item.productQuantity );
            });

            return totalitem;
        },
    },

    mutations: {
         
        addToCart(state, item){

            let found = state.cart.find(product => product.productId == item.productId) 
            //item是要新加入購物車的商品，state.cart是一個array，裡面有已經放入購物車的商品，這裡做的就是讓state.cart內的所有商品跟要新加入的item做配對

            if(found){
                found.productQuantity++;
                console.log(found);
                console.log(state.cart)
            } else{
                state.cart.push(item);
            }

            this.commit('saveData');
        },

        saveData(state){
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        removeFromCart(state, item){

            let index = state.cart.indexOf(item);
            state.cart.splice(index,1);
            this.commit('saveData');
            console.log(index)
        },

        additem(state, item){

            let index = state.cart.indexOf(item);
            state.cart[index].productQuantity++;
            this.commit('saveData');
        },

        minusitem(state, item){
            let index = state.cart.indexOf(item);
            if(state.cart[index].productQuantity >= 0){
                state.cart[index].productQuantity--;
            }else{
                state.cart[index].productQuantity == 0;
            }
            this.commit('saveData');
        }

    }
})