$(document).ready(function(){
    var nama = $('#nama');
    var alamat = $('#alamat');
    var jenkel = $('#jenkel');
    var telp = $('#telp');
    var user = $('#user');

    var btnsimpan = $('#btnsimpan');

    btnsimpan.on('click',function(){
        axios.post('/api/pengguna', {
            nama: nama.val(),
            alamat: alamat.val(),
            jenkel: jenkel.val(),
            telp: telp.val(),
            user: user.val()
          })
          .then(function (response) {
            console.log(response.data.status);
          })
         
    })
})