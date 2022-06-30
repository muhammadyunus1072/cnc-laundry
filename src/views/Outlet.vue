<template>
    <Navbar>
        
    </Navbar>

    <!-- Button trigger modal -->

        <!-- <button class="btn btn-primary btn-lg" id="btnModalTambah" data-toggle="modal" data-target="#modalOut" v-on:click="opsi('tambah', '0')">
            Tambah
        </button> -->
        <button type="button" class="btn btn-primary mx-4" data-bs-toggle="modal" data-bs-target="#modalOut" v-on:click="opsi('tambah', '0')">
            Tambah
        </button>
    
    <!-- Modal -->
    <div class="modal fade" id="modalOut" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <img src="/img/logo.png" width="150" height="60" alt="">
                <h4 class="card-title font-weight-bold text-center h1 text-primary ml-4">Outlet</h4>   
                       
                    <button type="button" class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
              
                <div class="modal-body relative" id="titleB" style="width:100%;height:350px;margin-top:-40px;">
                <!-- <div id="">oke</div> -->
                <div class="form-group pt-3 mt-4">
                                <!-- <label for="">Nama</label> -->
                            <input type="text" name="nama" id="nama" class="form-control form-block text-center"  placeholder="Nama" aria-describedby="helpId">
                                <!-- <small id="helpId" class="text-muted">Help text</small> -->
                        </div>
                       
                        <div class="form-group pt-2">
                                <!-- <label for="">Nama</label> -->
                            <textarea class="form-control text-center" id="alamat" aria-label="With textarea" placeholder="Alamat"></textarea>
                                <!-- <small id="helpId" class="text-muted">Help text</small> -->
                        </div>
                      
                        <div class="form-group pt-2">
                            <!-- <label for="">Nama</label> -->
                            <input type="text" name="tlp" id="tlp" class="form-control form-block text-center" placeholder="No Telp" aria-describedby="helpId">
                            <!-- <small id="helpId" class="text-muted">Help text</small> -->
                        </div>

                       
                </div>
                <!-- <div class="modal-footer"> -->
                    <!-- <button type="button" class="btn btn-secondary" style="margin-left:1px;" data-dismiss="modal">Close</button> -->
                    <!-- <button type="button" class="btn btn-primary">Save</button> -->

                    <div class="form-group mb-4"  style="margin-top: -50px; z-index:5; ">
                            <button class="btn btn-block btn-primary font-weight-bold w-75 " style="margin-left: 12.5%;" @click="simpanOutlet">Simpan</button>
                        </div>
                <!-- </div> -->
            </div>
        </div>
    </div>




    <div class="top">
      <div id="dialPlanListTable_filter" class="dataTables_filter">
          <label>
              <input type="search" @keyup="searchingOut(searchOut)" v-model="searchOut" class="form-control input-sm" style="position:absolute; width:30%; margin-left:60%; z-index:5;" placeholder="Search" aria-controls="dialPlanListTable">
          </label>
      </div>
    </div>
    <!-- <h1>@{{ searchOut }}</h1> -->
      <table class="table table-hover mt-5 table-lg table-responsive" id="tableOutlet">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th width="750">Alamat</th>
            <th>No Telp</th>
            <th width="200" colspan="2" style="text-align:center;">Opsi</th>
            <!-- <th></th> -->
          </tr>
        </thead>
        <tbody v-for = " (data, index) in list">
          <tr>
            <td> {{ index+1 }}</td>
            <td> {{ data.nama }}</td>
            <td> {{ data.alamat }}</td>
            <td> {{ data.tlp }}</td>
            <td> 
              <button class="btn btn-warning font-weight-bold btnUbahOut" :nama="data.nama" :alamat="data.alamat" :tlp="data.tlp" :idOut="data.id" data-bs-toggle="modal" data-bs-target="#modalOut" v-on:click="opsi('ubah', data.id)">Ubah</button>
            </td>
            <td>
              <button class="btn btn-danger font-weight-bold" :idOut="data.id" @click="hapusOutlet(data.id)">Hapus</button>
            </td>
          </tr>         
        </tbody>
      </table>
<!-- {{ list }} -->
</template>
<script>
    import { reactive, ref } from 'vue';
    import Navbar from '../Components/Navbar.vue'
    import axios from 'axios'

    export default{
        components: {
            Navbar,
        },
        data: function(){
            return{
                idOutlet: "",
                option: "",
                access_token : '',
                list : [],
                searchOut : ''
            }
        },
        methods: {
            // self = this;
            hapusOutlet: function(a){
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
                            url: 'http://localhost:8001/api/auth/outlet/'+a,
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
            
                                self.getOutletAll();
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
            searchingOut: function (a) {
                var self = this;
                const access_token = localStorage.getItem('access_token');
                // console.log(access_token);
                axios.post('http://localhost:8001/api/auth/searchOut/',{param: a},{
                    headers: {
                                'Authorization': `Bearer ${access_token}` 
                            }
                })
                .then(function(res){
                    // console.log(res.data)
                    self.list = res.data.list
                })
            },
            opsi: function (a, b) {
                var self = this;
                self.option = a;
                self.idOutlet = b;
            },
            getOutletAll: function () 
            {
                var self = this;
                self.access_token = localStorage.getItem('access_token');
                // if(store(this.access_token) == "verified"){
                axios.get(
                    'http://127.0.0.1:8001/api/auth/outlet',{
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    }
                )
                .then((res)=>{
                    self.list = res.data.list
                }, { withCredentials: true })
                .catch((e)=>{
                    // validation.value = e.response.data
                });
            // }
            },
            simpanOutlet: function () {
                //    alert(this.option)
                var self = this; 
                if(self.option == "tambah"){
                    // console.log(self.option)
                    axios.post('http://localhost:8001/api/auth/outlet',{
                        nama: $("#nama").val(),
                        alamat: $("#alamat").val(),
                        tlp: $("#tlp").val()
                    },{
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    })
                    .then( function(response){
                        var res = response.data;
                        // let err = res.error[Object.keys(res.error)[0]]
                        // console.log(res.error[Object.keys(res.error)[0]][0])
                        if(res.validate){
                            if(res.status){
                                swal('Sukses !', 'Data berhasil disimpan', 'success')
                                $("#modalOut").modal('hide')
                                console.log(res)
                                self.getOutletAll();
                            }else{
                                swal('Gagal !', 'Gagal menyimpan data', 'error')
                                $("#modalOut").modal('hide')
                            }                       
                        }else{
                            swal('Peringatan !', res.error[Object.keys(res.error)[0]][0] , 'warning')
                            $("#modalOut").modal('hide')
                        }
                    })
                }else if(self.option == "ubah"){
                    // console.log(self.option)
                    axios.put('http://localhost:8001/api/auth/outlet/'+self.idOutlet,{
                        nama: $("#nama").val(),
                        alamat: $("#alamat").val(),
                        tlp: $("#tlp").val()
                    },{
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    })
                    .then( function(response){
                        var res = response.data;

                        if(res.validate){
                            if(res.status){
                                swal('Sukses !', 'Data berhasil diubah', 'success')
                                $("#modalOut").modal('hide')
                                // console.log(res);
                                self.list = res.list;
                            }else{
                                swal('Gagal !', 'Gagal mengubah data', 'error')
                                $("#modalOut").modal('hide')
                            }
                        }else{
                            swal('Peringatan !', res.error[Object.keys(res.error)[0]][0] , 'warning')
                            $("#modalOut").modal('hide')
                        }
                    })

                }
            }
        },
        mounted(){
            this.getOutletAll()
            // 
        },
        
    }
</script>