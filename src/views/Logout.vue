<template>
{{ data }}
</template>
<script>
    import { useRouter } from 'vue-router';

    import axios from 'axios';    

    export default{
        data(){
            return{
                access_token : ''
            }
        },
        mounted(){
            const data = '';
            const router = useRouter();
            this.access_token = localStorage.getItem('access_token');
            axios.post(
                    'http://127.0.0.1:8001/api/auth/logout',{
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