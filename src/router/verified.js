 import axios from 'axios';
 import router from './';
 export const store = (data) => 
    axios.get(
        'https://apilaundry.arashiyunus.com/api/auth/verify',{
        // 'https://cnclaundry.000webhostapp.com/api/auth/verify',{
            headers: {
                'Authorization': `Bearer ${data}` 
            }
        }
    )
    .then((res)=>{
        // return "data";
        if(res.data.message == 'verified'){
            alert("sudah")
            // return "verified";
        }
        else(
            alert("belum")
        )
    })
    .catch((e)=>{
        // localStorage.access_token = res.data.access_token 
        if(e.response.status === 401){
            // alert("401 nih")
            // return "apasih"
        }

    });
function verified(data){
    return  store(data)
}

export default verified