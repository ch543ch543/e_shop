import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

let cart = window.localStorage.getItem('cart'); //將網頁資料儲存在使用者的瀏覽器（localstorage）中並擷取下來 -> 本地儲存空間
let currentuser = window.localStorage.getItem('currentuser');
let usercarts = window.localStorage.getItem('usercarts')

export default new Vuex.Store({
    state: {
        cart: cart ? JSON.parse(cart) : [],  //將網頁資料由 JSON 格式字串轉回原本的資料內容及型別
        currentuser: JSON.parse(currentuser),
        usercarts: usercarts ? JSON.parse(usercarts) : [],
        currentusercart: [],
        order: [],
        orderprice: null,
    },
    getters: {
        //計算購物車內所有商品的總價
        totalPrice: state => {
            let total = 0;
            state.cart.filter((item) => {
                total +=( item.productPrice * item.productQuantity );
            });
            return total;
        },//計算購物車內總商品數目
        totalItems: state => {
            let totalitem = 0;
            state.cart.filter((item) => {
                totalitem +=(item.productQuantity );
            });
            return totalitem;
        },
    },
    mutations: {
        getcurrentuser (state, user) {
            state.currentuser = user;
            //若localstorage還未存在登入者的購物車則新增至localstorage
            console.log(state.usercarts.indexOf(user))
            state.usercarts.push([user, state.cart]);
            if(state.usercarts.filter(e => { return e[0] === user}).length === 0){ 
                state.currentusercart = [user, state.cart]
            //否則將登入者購物車新增至localstorage 
            } else {
                state.currentusercart = state.usercarts.filter(e => { return e[0] === user})
            //如果該使用者的購物車存在於localstorage，則該使用者的購物車為過去購物車加現有購物車
            }
            this.commit('saveData');
        },
        logoutuser (state) {
            state.cart = [];
            this.commit('saveData');
        },
        makeorder (state) {
            state.order = state.cart;
            state.orderprice = this.getters.totalPrice;
            state.cart = [];
            this.commit('saveData');
        },
        addToCart(state, item){
            let found = state.cart.find(product => product.productId == item.productId) 
            //item是要新加入購物車的商品，state.cart是一個array，裡面有已經放入購物車的商品，這裡做的就是讓state.cart內的所有商品跟要新加入的item做配對
            if(found){
                found.productQuantity++;
                console.log(state.cart)
            } else{
                state.cart.push(item);
            }
            this.commit('saveData');
        },
        saveData(state){
            window.localStorage.setItem('cart', JSON.stringify(state.cart)); //將資料轉為 JSON 格式的字串並儲存到localstorage
            window.localStorage.setItem('currentuser', JSON.stringify(state.currentuser));
            window.localStorage.setItem('usercarts', JSON.stringify(state.usercarts))
        },
        removeFromCart(state, item){
            let index = state.cart.indexOf(item);
            state.cart.splice(index,1); //將指定商品從商品array移除
            this.commit('saveData'); 
        },
        additem(state, item){
            let index = state.cart.indexOf(item);
            state.cart[index].productQuantity++;
            this.commit('saveData');
        },
        minusitem(state, item){
            let index = state.cart.indexOf(item);
            if(state.cart[index].productQuantity > 0){
                state.cart[index].productQuantity--;
            }else{
                state.cart[index].productQuantity == 0;
            }
            this.commit('saveData');
        }
    }
})