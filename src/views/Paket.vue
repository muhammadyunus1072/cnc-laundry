<template>
    <Navbar>
        
    </Navbar>


    <div id="appPaket">
    <!-- <button class="btn btn-primary btn-lg" id="tambahPaket" data-toggle="modal" data-target="#modalPak" v-on:click="opsi('tambah', '0')">
      Tambah
    </button> -->
    <button type="button" class="btn btn-primary mx-4" id="tambahPaket" data-bs-toggle="modal" data-bs-target="#modalPak" v-on:click="opsi('tambah', '0')">
        Tambah
    </button>
    <!-- Modal -->
    <div class="modal fade" id="modalPak" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <!-- <div class="modal fade" id="modalPak" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true"> -->
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                  <img src="/img/logo.png" width="150" height="60" alt="">
                  <h4 class="card-title font-weight-bold text-center h1 text-primary mx-auto">Paket</h4> 
                  <button type="button" class="btn btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                  <!-- <button type="button" class="btn btn-danger btn-close" data-bs-dismiss="modal" aria-label="Close">Close</button> -->

                </div>
              
                <div class="modal-body" style="width:90%;margin-left:5%;z-index:0;">
                    <div id="titleR"></div>
                
                  <div class="card-body mt-3 d-flex flex-column">
                        <div class="form-group mt-3 col-md-8 mx-auto">                      
                            <!-- <label for="idOutlet">Outlet</label> -->
                          <select class="form-control text-center" id="jenis">
                            <option>Jenis</option>
                            <option value="selimut">Selimut</option>
                            <option value="kiloan">kiloan</option>
                            <option value="bed cover">Bed Cover</option>
                            <option value="lainnya">Lainnya</option>
                            <!-- <option v-for=" (data, index) in jenis " :kdjenis="data.nama" :value="data.nama"> @{{ index+1 }}. @{{ data.nama }}.</option> -->
                          </select>                     
                        </div>
                          
                        <div class="form-group mt-3 col-md-8 mx-auto">
                            <!-- <label for="">Nama</label> -->
                          <input type="text" name="nama_paket" id="nama_paket" class="form-control form-block text-center" placeholder="Nama Paket" aria-describedby="helpId">
                            <!-- <small id="helpId" class="text-muted">Help text</small> -->
                        </div>
                        <div class="fomr-group mt-3 col-md-8 mx-auto">
                          <!-- <label class="sr-only" for="inlineFormInputGroup">Harga</label> -->
                          <div class="input-group mb-2">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                Rp . 
                              </div>
                            </div>
                            <input type="number" class="form-control" id="harga" placeholder="Harga" min="0">
                          </div>
                        </div>                       
                  </div>
                </div>
                    <div class="form-group mb-4 w-50 mx-auto" style="z-index:5;">
                        <button class="btn btn-block btn-primary font-weight-bold w-75 mt-5" style="margin-left: 12.5%;" id="btnSimpanPak" @click="simpanPaket">Simpan</button>
                    </div>
            </div>
        </div>
      </div>




    <div class="top">
      <div id="dialPlanListTable_filter" class="dataTables_filter">
          <label>
              <input type="search" @keyup="searchingPak(searchPak)" v-model="searchPak" class="form-control input-sm" style="position:absolute; width:30%; margin-left:60%; z-index:5;" placeholder="Search" aria-controls="dialPlanListTable">
          </label>
      </div>
    </div>
    <!-- <h1>@{{ searchOut }}</h1> -->
    <div class="table-responsive">
      <table class="table table-hover mt-5 table-lg" id="tableOutlet">
        <thead>
          <tr>
            <th>#</th>
            <!-- <th width="650">Outlet</th> -->
            <th>Jenis</th>
            <th >Nama Paket</th>
            <th>Harga</th>
            <th width="50" colspan="2" style="text-align:center;">Opsi</th>
            <!-- <th width="50"></th> -->
          </tr>
        </thead>
        <tbody v-for=" (data, index) in paket">
          <tr>
            <td> {{ index+1 }}</td>
            <!-- <td> {{ detOutlet[index] }}</td> -->
            <td> {{ data.jenis }}</td>
            <td> {{ data.nama_paket }}</td>
            <td> Rp. {{ data.harga }} / Kg</td>
            <td> 
              <button class="btn btn-warning font-weight-bold btnUbahPak" :kdoutlet="data.id_outlet" :detOutlet="detOutlet[index]" :jenis="data.jenis" :nama_paket="data.nama_paket" :harga="data.harga" data-bs-toggle="modal" data-bs-target="#modalPak" v-on:click="opsi('ubah', data.id)">Ubah</button>
            </td>
            <td>
              <button class="btn btn-danger font-weight-bold btnHapusPak" :idPak="data.id" @click="hapusPaket(data.id)">Hapus</button>
            </td>


          </tr>         
        </tbody>
      </table>
    </div>
</div>
</template>

<script>
    import Navbar from '../Components/Navbar.vue';
    import router from '../router';

    export default{
        components: {
            Navbar,
        },
        data: function(){
          return{
            outlet: [],
            paket: [],
            detOutlet: [],
            jenis: [],
            option: "",
            idPaket: "",
            searchPak: "",
            access_token: ""
          }
        },
        methods: {
          hapusPaket: function(a){
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
                        url: 'https://apilaundry.arashiyunus.com/api/auth/paket/'+a,
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
                            self.getPaketAll();
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
          getPaketAll: function () {
            var self = this
            self.access_token = localStorage.getItem("access_token");
            axios.get('https://apilaundry.arashiyunus.com/api/auth/paket',{
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    })
            .then( function(response){
                // alert("oke")
                var res = response.data;
                // console.log(res)
                self.outlet = res.outlet;
                self.jenis = res.jenis;
                self.paket = res.paket;
                var lp = res.paket.length;

                var exists = 0;
                self.detOutlet.length = 0;
                for(var a = 0; a < lp; a++){
                  // console.log(self.paket)
                    // console.log("pak = "+self.paket[a].outlet_id)
                    // console.log("pak = "+self.paket[a])
                    var lo = self.outlet.length;
                    // console.log("pak = "+lo)
                    for(var b = 0; b < lo; b++){
                        // console.log("out = "+self.outlet[b].id)
                        if(self.paket[a].outlet_id == self.outlet[b].id){
                            var nama = self.outlet[b].nama.concat(", ",self.outlet[b].alamat);
                           self.detOutlet.push(nama)
                        }
                    }
                 }                  
            }, { withCredentials: true })
                .catch((e)=>{
                    // console.log(e)
                     router.push({
                        name: 'index'
                    })
                    // validation.value = e.response.data
                });
          },
          searchingPak: function (a) {
            var self = this;
            var access_token = localStorage.getItem('access_token')
            axios.post('https://apilaundry.arashiyunus.com/api/auth/searchPak/',{param: a},{
                    headers: {
                                'Authorization': `Bearer ${access_token}` 
                            }
                })
            .then( function(response){
                var res = response.data;
                self.paket =res.paket;
            })
          },
          opsi: function (a, b) {
              var self = this;
              self.option = a;
              self.idPaket = b;
          },
           simpanPaket: function () {
            var self = this;
            if(self.option == "tambah"){
                axios.post("https://apilaundry.arashiyunus.com/api/auth/paket",{
                    // id_outlet : $('#idOutlet').val(),
                    jenis : $('#jenis').val(),
                    nama_paket : $('#nama_paket').val(),
                    harga : $('#harga').val(),
                },{
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    })
                .then( function(response){
                    var res = response.data;
                    if(res.validate){
                        if(res.status){
                            swal('Sukses !', 'Data berhasil disimpan', 'success')
                            $("#modalPak").modal('hide')
                            // console.log(res)
                           self.getPaketAll();
                        }else{
                            swal('Gagal !', 'Gagal menyimpan data', 'error')
                            $("#modalPak").modal('hide')
                        }                       
                    }else{
                        swal('Peringatan !', res.error[Object.keys(res.error)[0]][0] , 'warning')
                        $("#modalPak").modal('hide')
                    }
                })
            }else if(self.option == "ubah"){
                axios.put('https://apilaundry.arashiyunus.com/api/auth/paket/'+self.idPaket,{
                    // id_outlet : $('#idOutlet').val(),
                    jenis : $('#jenis').val(),
                    nama_paket : $('#nama_paket').val(),
                    harga : $('#harga').val(),
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
                            $("#modalPak").modal('hide')
                            // console.log(res);
                            self.getPaketAll(); 
                        }else{
                            swal('Gagal !', 'Gagal mengubah data', 'error')
                            $("#modalPak").modal('hide')
                        }
                    }else{
                        swal('Peringatan !', res.error[Object.keys(res.error)[0]][0] , 'warning')
                        $("#modalPak").modal('hide')
                    }
                })
            }
          },
        },
        mounted(){
          this.getPaketAll()
        }
    }
</script>