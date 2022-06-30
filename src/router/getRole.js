 import axios from 'axios';
 import router from './index';
 export const getRole =  (data) => 
    axios.get(
        'http://127.0.0.1:8001/api/auth/getRole',{
            headers: {
                'Authorization': `Bearer ${data}` 
            }
        }
    )
    .then((res)=>{
        return res;
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
function verified(data){
    return  getRole(data)
}

export default verified