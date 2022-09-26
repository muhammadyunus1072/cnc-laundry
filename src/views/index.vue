<template>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <!-- Tabs Titles -->
            <div class="formHeader mb-4">
                <div class="underlineHover">
                    <img src="/img/logo3.png" style="width:200px;height:200px;border-radius:50%;"  class=" shadow-lg" alt="ClickNClean">
                </div>
            </div>
            <div class="fadeIn first">
            </div>

            <!-- Login Form -->
            <form @submit.prevent="store()">
                <input type="email" class="fadeIn second"  name="email" placeholder="Email" v-model="data.email">
                <input type="password" class="fadeIn third mt-4" name="password" placeholder="Password" v-model="data.password">
                <button class="btn btn-lg btn-info my-4" type="submit" id="btnCoba">LOG IN</button>
            </form>

            <router-link :to="{ name: 'register'}" class="text-primary text-decoration-none">Register here</router-link>

            <!-- Remind Passowrd -->
            <div id="formFooter" class="mt-2">
            <a class="underlineHover" href="/">
                <img src="/img/logo.png" style="width:200px;height:50px;" alt="ClickNClean">
            </a>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref } from 'vue';
    import Vuex from "vuex";
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import router from '../router';
    
    export default({
        name: 'loginVerify',
        props: ['role'],
        setup(){
            const data = reactive({
                email : '',
                password : ''
            });

            const validation = ref([]);

            const router = useRouter();

            const store = async () => {
                axios.post(
                    'https://apilaundry.arashiyunus.com/api/auth/login',
                    // 'http://localhost:8001/api/auth/login',
                    data, 
                    {
                    headers: {
                        'Accept': 'application/json',
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/json',
                        // 'Accept-Encoding': 'gzip, deflate, br',

                        // 'Content-Length': '268'
                    },
                    }
                    
                )
                .then((res)=>{
                    // console.log(res.data.token.original.access_token)
                    console.log(res);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    // this.props.role = res.data.user.id_role

                    // console.log(this.props.role)
                    localStorage.setItem('access_token', res.data.token.original.access_token);
                    
                     let loginType = res.data.user.role.role
                    if (loginType === 'pelanggan') {
                    router.push('dashboard')
                    } else if (loginType === 'kasir') {
                    router.push('dashboard')
                    } else if (loginType === 'admin') {
                    router.push('dashboard')
                    } else {
                    router.push('home')
                    }
                    this.$emit('loggedIn')

                    router.push({
                        name: 'dashboard'
                    })
                })
                .catch((e)=>{
                    // validation.value = e.response.data
                });
            }

            return {
                data,
                validation,
                router,
                store
            }
        }
    })
</script>