<template>
{{ data }}
</template>
<script>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    
    import VueCookies from 'vue-cookies'
    import axios from 'axios';    

    // console.log(store(localStorage.getItem('access_token')))
    import * as Verify from '../router/verified'   
    const v = await Verify.store(localStorage.getItem('access_token'));
    export default{
        data(){
            return{
                access_token : '',
                data : []
            }
        },
        mounted(){
            this.access_token = localStorage.getItem('access_token');
            // if(store(this.access_token) == "verified"){
                axios.get(
                    'https://apilaundry.arashiyunus.com/api/auth/user-profile',{
                        headers: {
                            'Authorization': `Bearer ${this.access_token}` 
                        }
                    }
                )
                .then((res)=>{
                    this.data = res.data
                }, { withCredentials: true })
                .catch((e)=>{
                    // validation.value = e.response.data
                });
            // }else{
            //     console.log("unverified");
            // }
        }
    }
</script>