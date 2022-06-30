$(document).ready(function(){
    var btnLogin = $("#btnLogin");

    var username = $("#username");
    var password = $("#password");

    btnLogin.on('click',function(){
        axios.post('/api/login', {
            username: username.val(),
            password: password.val()
          })
          .then(response => { 
            alert("status "+response.data['status']+" and role "+response.data['role'])
            if(response.data['role'] == 'admin' && response.data['status'] == 'success'){
                window.location.assign('/clickNclean/admin');
            }
            if(response.data['role'] == 'kasir' && response.data['status'] == 'success'){
                window.location.assign('/clickNclean/kasir');
            }
            if(response.data['role'] == 'owner' && response.data['status'] == 'success'){
                window.location.assign('/clickNclean/owner');
            }
            // alert(response.data)

            })
            .catch(error => {
                console.log(error)
            });
         
    })
})
