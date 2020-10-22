<template>
    <div class="profiles">
        <div class="container py-3">
            <h2 style="text-align: left; margin-bottom: 50px; margin-top: 20px;">You can edit your personal information here!</h2>
                <ul class="nav nav-tabs px-3">

                    <li class="nav-item">
                    <a class="nav-link active" href="#profile" data-toggle="tab" style="color:cadetblue">Profile</a>
                    </li>

                    <li class="nav-item">
                    <a class="nav-link" href="#account" data-toggle="tab" style="color:cadetblue">Account settings</a>
                    </li>

                </ul>

             <!--tag content-->   
            <div class = "tab-content">
                <!-- Profile tag -->
                  <div class="tab-pane fade show active" id="profile" >
                    <div class="login-input text-left mx-3 my-2">

                        <div class="form-row my-3">
                            <div class="form-group col">
                            <input class="form-control" placeholder="Full name" v-model="profile.name">
                            </div>
                            <div class="form-group col">
                            <input class="form-control" placeholder="Phone" v-model="profile.phone">
                            </div> 
                        </div>

                        <div class="form-row my-3">
                          <input class="form-control" placeholder="Address" v-model="profile.address">
                        </div>
   

                        <div class="form-row my-3">
                            <div class="form-group col-8">
                                <input class="form-control" placeholder="Postcode" v-model="profile.postcode">
                            </div>

                            <div class="form-group col-4">
                                <button type="button" class="btn" @click = 'updateProfile()' >Save Changes</button>
                            </div>
                        </div>

                    </div>
                </div>
    
                  <!-- Account setting tag -->
                  <div class="tab-pane fade" id="account">
                    <div class="login-input text-left mx-3 my-2">
    
                        <div class="form-row my-3">
                            <div class="col">
                                <input class="form-control" placeholder="User name" v-model="account.name">
                            </div>
                            <div class="col">
                                <input class="form-control" placeholder="Email address" v-model="account.email">
                            </div> 
                        </div>


                        <div class="form-row my-3">
                            <div class="form-group col-5">
                                <input type="file"  class="form-control" placeholder="profile picture" @change="uploadImage"> 
                                <label for="">for your profile picture</label>
                            </div>  
                        
                            <div class = "form-group col-1" >               
                                <div class = "img-wrap">
                                  <img :src="account.photoURL" alt="" width="80px">
                                  <span class = "btn delete-img" @click = "deleteImage(image,index)" style="background-color:transparent; font-size: small; padding-left: 5px;">X</span>
                                </div>                               
                            </div>

                            <div class="form-group col-6">
                                <button type="button" class="btn mr-3"  @click = "Resetemailandusername" >Save Changes</button>
                                <button type="button" class="btn" @click = "ResetPasswordEmail"  >Reset password</button>
                            </div> 

                            
                        </div>  

                    </div>
                  </div>
                </div>  
            </div>
    </div>  
  </template>
  
  <script>
  // @ is an alias to /src
  
  import { fb, db} from '../firebase'
  
  export default {
    name: "Profiles",
    
    props: {
        msg: String
    },

    data(){
        return {
            profiles: [],
            profile: {
                name: null,
                phone: null,
                address: null,
                postcode: null,
            },
            account: {
                name: null,
                email: null,
                emailVerified: null,
                password: null,
                confirmPassword: null,
                uid: null,
                photoURL: null
            }
        }
    },

        firestore(){
            const user = fb.auth().currentUser;
            return {
                profiles: db.collection('profiles').doc(user.uid)
            }
        },

        methods: {

            deleteImage(img, index){
  
                let image = fb.storage().refFromURL(img);
        
                this.acount.photoURL.splice(index,1);
        
                image.delete().then(() => {
                console.log('image delete');
                }).catch(() => {
                console.log('an error occurred');
                });
                
            },
            
            Resetemailandusername(){
                var user = fb.auth().currentUser;
                
                user.updateEmail(this.account.email).then(() => {
                 console.log('success')
                 window.Toast.fire({
                    type: 'success',
                    title: 'Updated it successfully'
                })
                }).catch(function(error) {
                    console.log(error);
                });

                user.updateProfile({
                displayName: this.account.name,
                photoURL: this.account.photoURL,
                }).then(function() {
                    console.log('success')
                }).catch(function(error) {
                    console.log(error);
                });
            },
            ResetPasswordEmail(){
                const auth = fb.auth();
                console.log(auth);
                auth.sendPasswordResetEmail(auth.currentUser.email).then(() => {
                 window.Toast.fire({
                     type: 'success',
                     title: 'Email sent'
                 })
                }).catch((error) => {
                 console.log(error);
                }); 
            },
            updateProfile(){
                this.$firestore.profiles.update(this.profile);
                this.profile.name = null,
                this.profile.phone = null,
                this.profile.address = null,
                this.profile.postcode = null
            
                window.Toast.fire({
                    type: 'success',
                    title: 'Updated it successfully'
                })
            },

            uploadImage(e){

                if(e.target.files[0]){
                let file = e.target.files[0];
                var storageRef = fb.storage().ref('profiles/'+file.name);
                console.log(storageRef)
                let uploadTask = storageRef.put(file);
                uploadTask.on('state_changed', () => {
                }, (error) => {
                console.log(error);
                },
                () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                
               uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                this.account.photoURL = downloadURL;
                console.log('File available at', downloadURL);
                });
                }
                );
  
            }
        
         }
        },

        created(){
            const user = fb.auth().currentUser;
            this.account.photoURL = user.photoURL;
        }
  };
  </script>

  <style>
    .profiles{
        background: transparent;
    }

    .form-row input{
        font-size: 1rem;
        font-family: inherit;
        color: inherit; 
        padding: 1.5rem 2rem;
        border-radius: 2px;
        border: none;
        border-bottom: 1px solid grey;
        width: 100%;
        display: block;
        transition: all 0.3s;
        background-color: transparent
    }

    .form-row > .form-group .btn{
        background-color: cadetblue;
        color: #11122b;
        font-size: 1.25em;
        margin: 10px 25px;
        border-radius: 2px;
        outline: none;
        transition: 0.2s;
        top: 50%;
        left: 50%;
    }

    .form-row > .form-group{
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding-left: 50px;
    }   
/* .form input:focus{
    outline: none;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1) ;
    border-bottom: 3px solid #cea135;
}

.form textarea{
    margin-top: 20px;
    width: 100%;
    height: 250px;
    border-radius: 3px;
    border: 3px solid #11122b;
    font-size: 1.5rem;
    font-family: inherit;
    color: #11122b; 
    padding: 1.5rem 2rem;
    transition: all 0.3s;
}

.form textarea:focus {
    outline: none;
    border: 3px solid #cea135;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1) ;
}

.form input::-webkit-input-placeholder, .form textarea::-webkit-input-placeholder{
    color: #11122b;
    opacity: 1;
    visibility: visible;
}

.form input:focus::-webkit-input-placeholder, .form textarea:focus::-webkit-input-placeholder:focus{
    opacity: 0;
    visibility: hidden;
}

.form label {
    font-size: 1.2rem;
    font-weight: 700;
    margin-left: 2rem;
    margin-top: 0.7rem;
    display: block;
    transition: all 0.3s;
    color: #cea135;
    visibility: hidden;
    opacity: 0;
}

.form input:focus + label, .form textarea:focus + label{
    opacity: 1;
    visibility: visible;
    transform: translateY(1rem); */
/* } */
  </style>
  