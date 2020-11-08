<template>
  <div class="addnewproduct" id="addnewproduct">
    <div class="container">
      <hr>
      <div class="d-flex justify-content-between">
        <h2 >Products list</h2>
        <button @click="addNew" class="btn btn-primary align-self-end" style="background-color:cadetblue; border-color: transparent;">Add Product</button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td>
                {{product.name}}
              </td>
              <td>
                {{product.price}}
              </td>
              <td>
                <button class="btn btn-secondary" @click = "editProduct(product)" >edit</button>
                <button class="btn btn-primary" @click = "deleteProduct(product.id)" style="background-color:cadetblue; border-color: transparent; margin-left: 10px;">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal fade bd-example-modal-xl" id="product" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" v-if = " modal === 'edit' ">Edit Product</h5>
              <h5 class="modal-title" id="exampleModalLabel" v-if = " modal === 'new' ">Add Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body row">
              <div class="modal-left col-md-8">
                <div class = "form-group">
                  <input type = "text" placeholder = "Product Name" class = "form-control height:auto" v-model = "product.name">
                </div>
                <div class = "form-group">
                  <vue-editor v-model = "product.description"></vue-editor>
                </div>
              </div>
              <div class="modal-right col-md-4">
                <h5 class="modal-title text-left" id="exampleModalLabel">Product Details</h5>
                <hr>
                <div class = "form-group">
                  <input type = "text" placeholder = "Product Price" class = "form-control" v-model = "product.price">
                </div>
                <div class = "form-group">
                  <input type = "text" @keyup.188="addTag" placeholder = "Product tags" class = "form-control" v-model = "tag">
                  <div class="d-flex">
                    <p  class="p-1" v-for="(tag, index) in product.tags" :key="index"> 
                      <span >{{tag}}</span>
                    </p>
                  </div>
                </div>
                <div class="form-group">
                    <h6 class="text-left">Product Image</h6>
                    <input type="file" class="form-control" @change = "uploadImage" >
                </div>
                <div class = "form-group d-flex" >
                  <div class="p-1" v-for="(image, index) in product.images" :key="index">
                    <div class = "img-wrap">
                      <img :src="image" alt="" width="50px">
                      <span class = "btn delete-img" @click = "deleteImage(image,index)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click = "addProduct()" type="button" class="btn btn-primary" v-if=" modal === 'new' " style="background-color:cadetblue; border-color: transparent;">Save changes</button>
              <button @click = "updateProduct()" type="button" class="btn btn-primary" v-if=" modal === 'edit' " style="background-color:cadetblue; border-color: transparent;">Apply changes</button>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div> 
</template>
  
<script>
import {fb,db} from '../firebase';
import $ from 'jquery';
import { VueEditor } from "vue2-editor";
  
export default {
  name: "addnewproduct",
  props: {
    msg: String
  },
  data(){
    return{
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        images: [],
        tags: []
      },
      modal: null,
      tag: null,
    }
  },
  components:{
    VueEditor
  },
  firestore(){
    return {
      products: db.collection('products'),
    }
  },
  methods:{
    deleteImage(img, index){
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index,1);
      image.delete().then(() => {
        console.log('image delete');
      }).catch(() => {
        console.log('an error occurred');
      });
    },
    uploadImage(e){
      if(e.target.files[0]){
        let file = e.target.files[0];
        var storageRef = fb.storage().ref('products/'+file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', () => {
        }, (error) => {
        console.log(error);
        }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL()
          .then((downloadURL) => {
            this.product.images.push(downloadURL);
            console.log('File available at', downloadURL);
          });
        });
      }
    },
    addTag(){
      this.product.tags.push(this.tag);
      this.tag = null;
    },
    reset(){
      this.product = {
        name: null,
        description: null,
        price: null,
        images: [],
        tags: []
      }
    },
    addNew(){
      this.modal = 'new';  
      this.reset();
      $('#product').modal('show');
    },
    updateProduct(){
      $('#product').modal('hide');
      this.$firestore.products.doc(this.product.id).update(this.product);
      console.log(this.product.id);
      window.Toast.fire({
        type: 'success',
        title: 'Updated it successfully'
      })
    },
    editProduct(product){ 
      this.modal = 'edit'
      this.product = product;
      $('#product').modal('show');
      console.log(this.modal); 
    },
    deleteProduct(doc){
      window.Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.$firestore.products.doc(doc).delete();
          window.Toast.fire({
          icon: 'success',
          title: 'Deleted successfully'
          })
        }
      })
    },
    addProduct(){
      this.$firestore.products.add(this.product);
      this.product.tags.push(this.tag);
      $('#product').modal('hide');
      window.Toast.fire({
        type: 'success',
        title: 'Added it successfully'
      });
    }
  }
};
</script>
  
<style scoped lang="scss">
  .products{
    margin-top: 7rem;
    background: #f2f2f2;
    padding-bottom: 3rem;
  }
  .img-wrap{
    position: relative;
  }
  .img-wrapp span.delete-img{
    position: absolute;
    top:-14px;
    left:-2px;
  }
  .img-wrap span.delete-img:hover{
    cursor: pointer;
  }
</style>
  
    