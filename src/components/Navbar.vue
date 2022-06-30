<template >
    <div class="alert alert-primary w-100 fadeDownNav" role="alert" id="navbar">



    <nav class="navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between">
        <a class="navbar-brand m-0" href="/dashboard">  
            <img src="/img/logo.png" class="img-fluid " style="width:270px; height:70px; border-radius:20px;">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div  class="collapse navbar-collapse" id="navbarNavDropdown">
          
                <ul class="navbar-nav d-flex justify-content-evenly float-end w-100 ml-3">
                    <!-- //- @if( $role == '1') -->
                    <li v-if="role == '1' " class="nav-item my-3 mt-3 ">
                        <a href="outlet">
                            <router-link :to="{name:'outlet'}" type="button" class="button btn fs-6 btn-primary fw-semibold">Outlet</router-link>
                        </a>
                    </li>   
                    <li v-if="role == '1' " class="nav-item my-3 mt-3 ">
                        <a href="paket">
                            <router-link :to="{name:'paket'}" type="button" class="button btn fs-6 btn-primary fw-semibold">Paket</router-link>
                        </a>
                    </li>   
                    <li v-if="role == '1' || role == '2'" class="nav-item my-3 mt-3 ">
                        <a href="pengguna">
                            <router-link :to="{name:'pengguna'}" type="button" class="button btn fs-6 btn-primary fw-semibold">Pengguna</router-link>
                        </a>
                    </li>     
                    <!-- //- @endif

                    //- @if( $role == '1' || $role == '2' ) -->
                    <li v-if="role == '1' || role == '2' " class="nav-item my-3 mt-3">
                        <a href="transaksi">
                            <router-link type="button" :to="{name:'transaksi'}" class="button btn fs-6 btn-primary fw-semibold">Transaksi</router-link>
                        </a>
                    </li>  
                    <!-- //- @endif

                    //- @if( $role == '1' || $role == '2' || $role == '3') -->
                    <li v-if="role == '1' || role == '2' " class="nav-item my-3 mt-3 ">
                        <a href="laporan">
                            <router-link type="button" :to="{name:'laporan'}" class="button btn fs-6 btn-primary fw-semibold">Laporan</router-link>
                        </a>
                    </li>   
                    <li v-if="role == '1' || role == '2' " class="nav-item my-3 mt-3 ">
                        <a href="payment">
                            <router-link type="button" :to="{name:'payment'}" class="button btn fs-6 btn-primary fw-semibold">Payment</router-link>
                        </a>
                    </li>   
                   
                    <!-- //- @endif
                    //- @if( $role == '4') -->
                    <li v-if="role == '3'" class="nav-item my-3 mt-3 ">
                        <a href="history">
                            <router-link type="button" :to="{name:'history'}" class="button btn fs-6 btn-primary fw-semibold">History</router-link>
                        </a>
                    </li>   
                    <!-- //- @endif -->

                        <li  v-if="role == '1' || role == '2' || role == '3'" class="nav-item my-3 mt-3">
                            <button type="button" class="btn btn-outline-danger my-2 my-sm-0 fw-semibold h2" v-on:click="logout">Logout</button>
                        </li>
                </ul>
                
        </div>
    </nav>
</div>
</template>

<script>
    import { reactive } from 'vue';
    import axios from 'axios'
    import router from '../router/index';
    import * as Verify from '../router/getRole'   
    export default{
        name: "Navbar",
        data(){
            return{
                access_token : '',
                role : ''
            }
        },
        created(){
            this.access_token = localStorage.getItem('access_token');
            // if(store(this.access_token) == "verified"){
                axios.get(
                    'http://127.0.0.1:8001/api/auth/getRole',{
                        headers: {
                            'Authorization': `Bearer ${this.access_token}` 
                        }
                    }
                )
                .then((res)=>{
                    
                    this.role = res.data
                    // if(res.data.message == 'verified'){
                        // return "verified";
                    // }
                })
                .catch((e)=>{
                    // localStorage.access_token = res.data.access_token 
                    router.push({
                        name: 'index'
                    })

                });
        },
        methods: {
            logout: function(){
                swal.fire({
                    title: "Peringatan !",
                    text: "Apakah anda yakin ingin keluar ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Kembali",
                    confirmButtonText: "Ya, Keluar!"
                }).then(result => {
                    if (result.value){
                        window.location.assign('/logout');
                    }
                })
            }
        }
    }
</script>