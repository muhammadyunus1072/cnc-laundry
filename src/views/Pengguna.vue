<template>
    <Navbar>
        
    </Navbar>


     <div id="appPengguna" style="display:block;">
    <!-- <button class="btn btn-primary btn-lg" id="tambahPengguna" data-toggle="modal" data-target="#modalPen" v-on:click="opsi('tambah', '0')">
      Tambah
    </button> -->
    <button type="button" class="btn btn-primary mx-4" id="tambahPengguna" data-bs-toggle="modal" data-bs-target="#modalPen" v-on:click="opsi('tambah', '0')">
        Tambah
    </button>
    <!-- Modal -->
    <div class="modal fade" id="modalPen" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="/img/logo.png" width="150" height="60" alt="">
                    <h4 class="card-title font-weight-bold text-center h1 text-primary" style="margin-left:19%;">Pengguna</h4>   
                    <button type="button" class="btn btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              
                <div class="modal-body" style="width:100%;height:200px;margin-left:0;z-index:0;">
               <div id="titleR"></div>
                    <div class="card-body mt-3" style="opacity: 1;">

                        <div class="form-group col-md-8 mx-auto">
                                <!-- <label for="">Nama</label> -->
                            <input type="text" name="nama" id="name" class="form-control form-block text-center"  placeholder="Nama" aria-describedby="helpId">
                                <!-- <small id="helpId" class="text-muted">Help text</small> -->
                        </div>
                        <div class="form-group col-md-8 mx-auto mt-3">
                                <!-- <label for="">Nama</label> -->
                            <!-- <input v-if="option === 'tambah'" type="email" name="email" id="email" class="form-control form-block text-center"  placeholder="Email" aria-describedby="helpId"> -->
                            <input :readonly="option == 'ubah'" type="email" name="email" id="email" class="form-control form-block text-center"  placeholder="Email" aria-describedby="helpId">
                                <!-- <small id="helpId" class="text-muted">Help text</small> -->
                        </div>
                        <!-- <div class="form-group col-md-8 mx-auto mt-3"> -->
                                <!-- <label for="">Nama</label> -->
                            <!-- <input type="password" name="password" id="password" class="form-control form-block text-center"  placeholder="Password " aria-describedby="helpId"> -->
                                <!-- <small id="helpId" class="text-muted">Help text</small> -->
                        <!-- </div> -->
                           
                        <div class="form-group col-md-8 mx-auto mt-3" v-if="role == '1'">
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="role_id">Hak Akses</label>
                                <select class="form-select" id="role_id">
                                    <option selected value="3">Pelanggan</option>
                                    <option value="2">Kasir</option>
                                    <option value="1">Admin</option>
                                </select>
                            </div>
                        </div>
                
                        
                    </div>                       
                </div>
            <!-- <div class="modal-footer"> -->
                    <!-- <button type="button" class="btn btn-secondary" style="margin-left:1px;" data-dismiss="modal">Close</button> -->
                    <!-- <button type="button" class="btn btn-primary">Save</button> -->
                <div class="form-group col-md-8 mx-auto pb-3 my-4" >
                    <button class="btn btn-block btn-primary font-weight-bold w-75" style="margin-left:12.5%" id="btnSimpanPen" @click="simpanPengguna">Simpan</button>
                </div>
            <!-- </div> -->
        </div>
    </div>
</div>



    <div class="top">
      <div id="dialPlanListTable_filter" class="dataTables_filter">
          <label>
              <input type="search" @keyup="searchingPen(searchText)" v-model="searchText" class="form-control input-sm" style="position:absolute; width:30%; margin-left:60%; z-index:5;" placeholder="Search" aria-controls="dialPlanListTable">
          </label>
      </div>
    </div>
    <!-- <h1>@{{ searchOut }}</h1> -->
      <table class="table table-hover mt-5 table-lg table-responsive" id="tablePen">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th width="300">Email</th>
            <th>Role</th>
            <th colspan="2" style="text-align:center;">Opsi</th>
          </tr>
        </thead>
        <tbody v-for=" (data, index) in pengguna">
          <tr>
            <td> {{ index+1 }}</td>
            <td> {{ data.name }}</td>
            <td> {{ data.email }}</td>
            <td> {{ data.role.role }}</td>
            <td> 
              <button class="btn btn-warning font-weight-bold btnUbahPen" :idPen="data.id" :name="data.name"  :role_id="data.role_id" :email="data.email" data-bs-toggle="modal" data-bs-target="#modalPen" v-on:click="opsi('ubah', data.id)">Ubah</button>
            </td>
            <td>
              <button class="btn btn-danger font-weight-bold btnHapusPen" v-on:click="hapusPen(data.id)">Hapus</button>
            </td>
          </tr>         
        </tbody>
      </table>
</div>


<div class="card text-left mt-3 mb-0 bg-light" id="appPrint" style="display:none;">
        <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
        <div class="card-body">
        
        <div class="card-group row justify-content-center">
        
            <!-- <center> -->
            <div class="col-md-6">

                <div class="card pb-5">
                    <!-- <img class="card-img-top" src="{{asset('img/logo2.png')}}" style="width:100px; height:100px;" alt="Card image cap"> -->
                    <div class="card-body d-flex flex-column position-relative">
                        <div id="titleP" class="position-absolute" style="width:100%; height :520px;" >                           
                        </div>
                        <div class="d-flex flex-column mx-auto">
                            <!-- <div class="card-header p-1"> -->
                            <h4 class="card-title font-weight-bold text-center h1 text-primary">Akun CNC</h4>   
                            <!-- </div> -->
                            <table class="mt-5">
                                <tr>
                                    <td>
                                        <p class="fw-semibold fs-4 text-secondary">Nama</p>

                                    </td>
                                    <td>
                                        <p class="fw-semibold fs-4 text-secondary"> : </p>

                                    </td>
                                    <td>
                                        <p class="fw-bold fs-2 text-primary">{{ pNama }}</p>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="fw-semibold fs-4 text-secondary">Email </p>

                                    </td>
                                    <td>
                                        <p class="fw-semibold fs-4 text-secondary"> : </p>

                                    </td>
                                    <td>
                                        <p class="fw-bold fs-2 text-primary">{{ pEmail }}</p>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="fw-semibold fs-4 text-secondary">Hak Akses </p>

                                    </td>
                                    <td>
                                        <p class="fw-semibold fs-4 text-secondary"> : </p>

                                    </td>
                                    <td>
                                        <p class="fw-bold fs-2 text-primary">{{ pRole }} </p>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="fw-semibold fs-4 text-secondary">Password  </p>

                                    </td>
                                    <td>
                                        <p class="fw-semibold fs-4 text-secondary"> : </p>

                                    </td>
                                    <td>
                                        <p class="fw-bold fs-2 text-warning">{{ pPassword }}</p>

                                    </td>
                                </tr>
                            </table>
                        </div> 
                    </div>
                </div>
            </div>
            <!-- <div class="card">
                <img class="card-img-top" data-src="holder.js/100x180/" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">Title</h4>
                    <p class="card-text">Text</p>
                </div>
            </div> -->
            <!-- </center> -->
        </div>
        </div>
    </div>

</template>

<script>
    import Navbar from '../Components/Navbar.vue'

    export default{
        components: {
            Navbar,
        },
        data: function(){
            return{
                option:"",
                pengguna: [],
                access_token: "",
                searchText: "",
                pNama: "",
                pEmail: "",
                pRole: '',
                pPassword: "",
                idPen: "",
                role: ""
            }
        },
        methods: {
            hapusPen: function (id){
                var self = this;
                Swal.fire({
                    title: 'Apakah anda yakin?',
                    text: "Data akan dihapus permanen!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Kembali',
                    confirmButtonText: 'Ya, hapus!'
                }).then((result) => {
                    if (result.value) {
                        axios({
                            method: 'delete',
                            url: 'http://localhost:8001/api/auth/user/'+id,
                            headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                            }
                        })
                        .then( function(response){
                            if(response.data.status){
                                Swal.fire(
                                'Berhasil!',
                                'Data berhasil dihapus.',
                                'success'
                                )
                                $(this).parent().parent().remove();
                                self.getPenggunaAll();
                            }else{
                                Swal.fire(
                                    'Gagal!',
                                    'Data tidah berhasil dihapus.',
                                    'error'
                                )
                            }
                        })
                    }
                })
            },
            getPenggunaAll: function(){
                
                var self = this;
                self.access_token = localStorage.getItem('access_token');

                // console.log(access_token)
                axios.get('http://localhost:8001/api/auth/getAllUser',{
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    })
                .then(function(response){
                    var res = response.data;
                    self.role = res.role;
                    self.pengguna = res.list;
                    // self.outlet = res.outlet;
                    // self.role = res.role;
                })
            },
             searchingPen: function(a){
                var self = this;
                axios.post('http://localhost:8001/api/auth/searchPen/',{
                    // id_outlet : $('#idOutlet').val(),
                    param : a
                },{
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    })
                .then( function(response){
                    var res = response.data;
                    // console.log(res)
                    self.pengguna =res.list;
                })
            },
            opsi: function(a, b){
                var self = this;
                // alert($("#name").val())
                        $("#name").val("");
                        $("#email").val("");
                        $("#role_id").val("3");
                self.option = a;
                self.idPen = b;
            },
            simpanPengguna: function(){
            var self = this;

            if(self.option == "ubah"){
                var data = {
                    name : '',
                    role_id : ''
                }
               if(self.role=="1"){
                    data = {
                        name : $("#name").val(),
                        email : $("#email").val(),
                        role_id : $("#role_id").val(),
                    }
               }else if(self.role=='2'){
                    data = {
                        name : $("#name").val(),
                        email : $("#email").val(),
                        role_id : '',
                    }
               }
                axios({
                    method: "put",
                    url: "http://localhost:8001/api/auth/user/"+self.idPen,
                    data,           
                    headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                    }                    
                })
                .then(function(response){
                    var res = response.data;

                    if(res.validate){
                        
                        if(res.status){
                            // swal('Sukses !', 'Data berhasil diubah', 'success')
                            $("#modalPen").modal('hide')
                            // console.log(res);
                            self.getPenggunaAll();

                            Swal.fire({
                                title: 'Sukses',
                                text: "Data berhasil diubah!",
                                type: 'success',
                                showCancelButton: false,
                                cancel: false,
                                close: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                // cancelButtonText: 'Kembali',
                                confirmButtonText: 'Lanjutkan !'
                              }).then((result) => {
                                
                            })

                            
                        }else{
                            swal('Gagal !', 'Gagal mengubah data', 'error')
                            $("#modalPen").modal('hide')
                        }
                    }else{
                        swal('Peringatan !', res.error[Object.keys(res.error)[0]][0] , 'warning')
                        $("#modalPen").modal('hide')
                    }

                    
                })

            }else if(self.option == "tambah"){
                // alert(r+"and"+$("#idOutlet").val())
                var data = {
                    name : '',
                    role_id : ''
                }
               if(self.role=="1"){
                    data = {
                        name : $("#name").val(),
                        email : $("#email").val(),
                        role_id : $("#role_id").val(),
                    }
               }else if(self.role=='2'){
                    data = {
                        name : $("#name").val(),
                        email : $("#email").val(),
                        role_id : '3',
                    }
               }
            //    console.log(data)
                axios({
                    method: "post",
                    url: "http://localhost:8001/api/auth/user",
                    data,
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    
                })
                .then(function(response){
                    var res = response.data;
                    // console.log(response)
                    if(res.validate){
                        if(res.status){
                            $("#modalPen").modal('hide')
                           self.getPenggunaAll();

                            self.pNama = res.list.name;
                            self.pEmail = res.list.email;
                            self.pRole = res.list.role.role;
                            self.pPassword = res.password;

                            Swal.fire({
                                title: 'Sukses',
                                text: "Data berhasil disimpan!",
                                type: 'success',
                                showCancelButton: false,
                                cancel: false,
                                close: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                // cancelButtonText: 'Kembali',
                                confirmButtonText: 'Lanjutkan !'
                              }).then((result) => {
                                $("#navbar").hide();
                                $("#appPengguna").hide();
                                $("#appPrint").show();

                                setTimeout(function(){
                                    // alert("vb")
                                    window.print()
                            
                                    $("#navbar").show();
                                    $("#appPengguna").show();
                                    $("#appPrint").hide();
                                },1000);
                                // alert("oke")
                            })

                        }else{
                            swal('Gagal !', 'Gagal menyimpan data', 'error')
                            $("#modalPen").modal('hide')
                        }                       
                    }else{
                        swal('Peringatan !', res.error[Object.keys(res.error)[0]][0], 'warning')
                        $("#modalPen").modal('hide')
                    }

                   
                })
            }
        },
        },
        mounted(){
            var self = this;
            self.getPenggunaAll()
        }
    }
</script>