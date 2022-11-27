<template>
{{ data }}
</template>
<script>
    import { useRouter } from 'vue-router';
    import router from '../router';

    import axios from 'axios';    

    export default{
        data(){
            return{
                access_token : '',
                data : ''
            }
        },
        mounted(){
            const data = '';
            const router = useRouter();
            this.access_token = localStorage.getItem('access_token');
            axios.post(
                    'https://apilaundry.arashiyunus.com/api/auth/logout',{
                        data
                    },{
                        headers: {
                            'Authorization': `Bearer ${this.access_token}` 
                        }
                    }
                )
                .then((res)=>{
                    
                    if(res.data.message == 'User successfully signed out'){
                        localStorage.removeItem('access_token')
                        router.push({
                            name: 'index'
                        })
                    }
                }, { withCredentials: true })
                .catch((e)=>{
                    // validation.value = e.response.data
                });
            }
    }
</script>