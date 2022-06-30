 import axios from 'axios';
 import router from './';
 export const store =  (data) => 
    axios.get(
        'http://127.0.0.1:8001/api/auth/verify',{
            headers: {
                'Authorization': `Bearer ${data}` 
            }
        }
    )
    .then((res)=>{
        // return "data";
        if(res.data.message == 'verified'){
            return "verified";
        }
    })
    .catch((e)=>{
        // localStorage.access_token = res.data.access_token 
        router.push({
            name: 'index'
        })

    });
function verified(data){
    return  store(data)
}

export default verified