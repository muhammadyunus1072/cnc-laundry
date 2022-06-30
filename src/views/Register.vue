<template>
    <div class="fadeInDown d-flex justify-content-center mt-2">
        <div id="regContent" class="col-md-6">
            <div class="card text-left " id="appReg">
                <div class="card-body"> 
                    <div class="card-group row justify-content-center">
                        <div class="col-8 fadeInDown">
                            <div id="titleR" style="width:100%;" >
                                
                            </div>
                            <form  @submit.prevent="store()">
                                <div class="card-body d-flex flex-column justify-content-center"> 
                                    <div class="formHeader  d-flex justify-content-center">
                                        <div class="underlineHover">
                                            <img src="img/logo3.png" style="width:200px;height:200px;border-radius:50%;"  class=" shadow-lg" alt="ClickNClean">
                                        </div>
                                    </div>
                                        <div class="fadeIn first">
                                    </div>                     
                                    <h4 class="card-title font-weight-bold text-center h3 text-primary">Registrasi</h4>
                                    <div class="form-group my-2 d-flex justify-content-center">
                                        <!-- <label for="">Nama</label> -->
                                        <input type="text" v-model="data.name" class="text-center"  placeholder="Name" autocomplete="false" aria-describedby="helpId">
                                    </div>
                                    
                                    <div class="form-group my-2 d-flex justify-content-center">
                                        <input type="email" v-model="data.email" class="text-center"  placeholder="Email" autocomplete="false" aria-describedby="helpId">
                                        <!-- <textarea class="form-control text-center" id="alamat" aria-label="With textarea" placeholder="Alamat"></textarea> -->
                                    </div>  
                                    <div class="form-group my-2 d-flex justify-content-center">
                                        <!-- <label for="">Nama</label> -->
                                        <input type="password" v-model="data.password" class="text-center"  placeholder="Password" autocomplete="false" aria-describedby="helpId">
                                    </div>
        
                                    <div class="form-group mt-2 w-100 d-flex justify-content-center">
                                        <button class="btn btn-primary font-weight-bold" type="submit">Register</button>
                                    </div>
                                    <div class="form-group d-flex justify-content-center mt-2">
                                        <router-link :to="{ name: 'index'}" class="text-center text-decoration-none">Login Now</router-link>
                                    </div>
                                </div>
                            </form>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    export default{
         setup(){
            const data = reactive({
                name : '',
                email : '',
                password : ''
            });

            const validation = ref([]);

            const router = useRouter();

            const store = async () => {
                console.log(data)
                axios.post(
                    'http://127.0.0.1:8001/api/auth/register',
                    data, 
                )
                .then((res)=>{
                    if(res.data.message == 'User successfully registered')
                    router.push({
                        name: 'index'
                    })
                })
                .catch((e)=>{
                    validation.value = e.response.data
                });
            }

            return {
                data,
                validation,
                router,
                store
            }
        }
    }
</script>