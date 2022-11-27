<template>
    <Navbar>
        
    </Navbar>


    <div id="appTran" style="display:block;">
  
        <div id="content-im d-none">
            <button class="btn btn-primary btn-lg" id="btnHistory" v-bind="btn" v-if="btn" @click="btnTransaksi('0')" >Riwayat Transaksi</button>
            <button class="btn btn-primary btn-lg" id="btnEntri" v-bind="btn" v-else @click="btnTransaksi('1')" >Entri Transaksi</button>
            
            <!-- <h1 class="text-warning" v-if="totalAll !== 0" style="position:absolute;margin-top:-50px;margin-left:500px;">Total Semua : </h1> -->
            <!-- <h1 class="text-warning" v-if="totalAll !== 0" style="position:absolute;margin-top:-50px;margin-left:780px;">Rp. @{{ totalAll }}</h1> -->
            <div id="content" v-if="btn"> 
                <div class="card-body">
                        
                    <div class="card-group row">
                    
                        <!-- <center> -->
                        <div class="col-md-4">
                            <button class="btn btn-info btn-lg m-3" v-for="(data, index) in detailTran" v-on:click="detail(index)">{{ data.keterangan }}</button>
                        </div>
                        <div class="col-md-6">

                            <div class="card pb-5">
                                <div id="titleR"  class="mt-5" style="width:100%; height :355px;" >
                                    
                                </div>
                                <img class="card-img-top mx-auto" src="/img/logo2.png" style="width:100px; height:100px;" alt="Card image cap">
                                <div class="card-body " style="width:100%;" v-if="modal">
                                    <!-- <div class="form-group mt-4">                       -->
                                    <!-- <label for="idOutlet">Outlet</label> -->
                                        <!-- <input type="text" name="kdinvoice" id="kdinvoice" v-model="kdinvoice" placeholder="Kode Invoice" class="form-control" readonly>               -->
                                    <!-- </div> -->

                                    <div class="form-group mt-4">                      
                                    <!-- <label for="idOutlet">Outlet</label> -->
                                        <!-- <select class="form-select mr-sm-2" id="idPelanggan" v-model="kodeM">
                                            <option :value="0">Pilih Pelanggan ...</option>
                                            <option v-for="(data, index) in pelanggan" :kode="data.id" :value="data.id">{{ index+1 }}. {{ data.name }}</option>
                                        </select>                   -->
                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="idPel">Nama Pelanggan</label>
                                            <select class="form-select" v-on:change="pilihUser($event)" >
                                                <option :value="0">Pilih Pelanggan</option>
                                                
                                                <option v-for="(data, index) in pelanggan" :value="data.id">{{  data.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                
                                    <div class="form-group mt-4">                      
                                    <!-- <label for="idOutlet">Outlet</label> -->
                                        <!-- <select class="form-select mr-sm-2" id="idPelanggan" v-model="kodeM">
                                            <option :value="0">Pilih Pelanggan ...</option>
                                            <option v-for="(data, index) in pelanggan" :kode="data.id" :value="data.id">{{ index+1 }}. {{ data.name }}</option>
                                        </select>                   -->
                                        <div class="input-group mb-3">
                                            <label class="input-group-text" for="idPel">Nama Outlet</label>
                                            <select class="form-select" v-on:change="pilihOutlet($event)" >
                                                <option :value="0">Pilih Outlet</option>
                                                <option v-for="(data, index) in outlet" :value="data.id">{{  data.nama }}, {{ data.alamat }}</option>
                                            </select>
                                        </div>
                                    </div>
                                
                                    <!-- <div class="md-form mb-3"> -->
                                        <!-- <input placeholder="Batas Waktu" class="datepicker form-control ll-skin-latoja bataswaktu" data-date-format="yyyy-mm-dd" data-date-end-date="+7d" data-date-start-date="0d">     -->
                                        <!-- <label for="date-picker-example">Try me...</label> -->
                                    <!-- </div>        -->

                                    <!-- <div class="form-group pb-3" style="margin-top:50px;" v-if="kodeO > 0 && kodeP > 0 && kodeM > 0"> -->
                                    <div class="form-group pb-3" style="margin-top:50px;" >
                                        <button class="btn btn-block btn-primary font-weight-bold w-75" style="margin-left:12.5%;" v-on:click="btnModal('0')">Lanjutkan</button>
                                    </div>
                                </div>
                                <div class="card-body" style="width:100%;" v-else>
                                    <div class="form-group mt-4">                      
                                        <!-- <label for="idOutlet">Outlet</label> -->
                                        <select class="form-select mr-sm-2" id="paket" v-model="kodePa" v-on:change="qty">
                                            <option :value="-1">Pilih Paket ...</option>
                                            <!-- <option v-for="(data, index) in paket" :kode="data.id" :value="data.id" >{{ data.nama }}, Rp {{ data.harga }} / Kg. </option> -->
                                            <option v-for="(data, index) in paket" :kode="data.id" :value="data.id" >{{ data.nama_paket }}, Rp {{ data.harga }} / Kg. </option>
                                        </select>                  
                                    </div>

                                    <div class="input-group mt-3">
                                        <span class="input-group-text">Quantity</span>
                                        <input type="number" class="form-control" id="qty" min="0" v-model="vqty" v-on:keyup="qty" placeholder="Quantity">
                                        <span class="input-group-text"> kg</span>
                                    </div>   

                                <div class="input-group mt-3">
                                        <!-- <label class="sr-only" for="inlineFormInputGroup">Harga</label> -->
                                        <div class="input-group mb-2">
                                            <span class="input-group-text">Harga</span>
                                            <!-- <div class="input-group-prepend"> -->
                                                <!-- </div> -->
                                            <input type="number" class="form-control" readonly v-model="total" id="harga" placeholder="Harga">
                                            <div class="input-group-text">Rupiah .</div>
                                        </div>
                                    </div>    

                                    <div class="form-group mt-4">
                                        <!-- <label for="inputAddress2">Keterangan</label> -->
                                        <input type="text" class="form-control" id="ket" placeholder="Keterangan" v-model="keterangan">
                                    </div>
                                    <div class="form-group" style="margin-top:50px;">
                                    <div class="btn btn-primary btn-md btn-block" v-on:click="tambah" v-if="TU">Simpan Cucian</div>
                                    <div class="btn btn-warning btn-md btn-block" v-on:click="ubah" v-if="!TU">Ubah Cucian</div>
                                    <div class="btn btn-danger btn-md btn-block" v-on:click="hapus" v-if="!TU">hapus Cucian</div>
                                    <div class="btn btn-success btn-md btn-block" v-on:click="selesai" v-if="saved === 1">Selesai</div>
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

            <div id="content" v-else>    
            <!-- <div id="content" >     -->
                <div class="top">
                    <div id="dialPlanListTable_filter" class="dataTables_filter">
                        <label>
                            <input type="search" v-on:keyup="searchingTran(searchTran)" v-model="searchTran" class="form-control input-sm" style="position:absolute; width:30%; margin-left:60%; z-index:5;" placeholder="Search" aria-controls="dialPlanListTable">
                        </label>
                    </div>
                </div>
                <!-- <h1>@{{ searchOut }}</h1> -->
                <div class="table-responsive">

                    <table class="table table-hover mt-5" id="tableTran">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Tanggal Order</th>
                            <th>Tanggal Bayar</th>
                            <th width="250">Kode Invoice</th>
                            <th>Total</th>
                            <th width="250">Outlet</th>
                            <th>Status Order</th>
                            <th>Status Bayar</th>
                            </tr>
                        </thead>
                        <tbody v-for=" (data, index) in transaksi">
                            <tr>
                            <td> {{ index+1 }}</td>
                            <td> {{ data.user.name }}</td>
                            <td> {{ data.tgl }}</td>
                            <td> {{ data.tgl_bayar }}</td>
                            <td> {{ data.kode_invoice }}</td>
                            <td> {{ data.total }}</td>
                            <td> <p class="fw-bold d-inline">{{ data.outlet.nama }}</p>,<p class="d-inline"> {{ data.outlet.alamat }}</p></td>
                            <td> 
                            <button v-if="data.statusOrder_id == 1" class="btn btn-danger font-weight-bold btnBaru" :idT="data.id" data-bs-toggle="modal" data-bs-target="#modalBaru" v-on:click="kodetran(data.id)">{{ data.status_order.status }}</button>
                            <button v-if="data.statusOrder_id == 2" class="btn btn-warning font-weight-bold btnProses" :idT="data.id" data-bs-toggle="modal" data-bs-target="#modalProses" v-on:click="kodetran(data.id)">{{ data.status_order.status }}</button>
                            <button v-if="data.statusOrder_id == 3" class="btn btn-success font-weight-bold btnSelesai" :idT="data.id" data-bs-toggle="modal" data-bs-target="#modalSelesai" v-on:click="kodetran(data.id)">{{ data.status_order.status }}</button>
                            <button v-if="data.statusOrder_id == 4" class="btn btn-primary font-weight-bold" disabled :idT="data.id">{{ data.status_order.status }}</button>
                            </td>
                            <td> 
                            <button v-if="data.statusBayar === 'belum_dibayar'" class="btn btn-danger font-weight-bold btnBelum" :idT="data.id">Belum</button>
                            <button v-if="data.statusBayar === 'dibayar'" class="btn btn-success font-weight-bold" :idT="data.id">Dibayar</button>
                            </td>
                            </tr>         
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    




    
    
        
<!-- Modal -->

<div class="modal fade" id="modalBaru" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-primary">Update Status CNC</h5>
                    <button type="button" class="btn btn-close btn-danger" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <h1 class="text-center text-primary font-weight-bold">Ubah Status Diproses!</h1>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-info" id="btnSD" v-on:click="ubahStatus('2')">Sedang Diproses</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalProses" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-primary">Update Status CNC</h5>
                    <button type="button" class="btn btn-close btn-danger" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
            <h1 class="text-center text-primary font-weight-bold">Ubah Status Selesai!</h1>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" id="btnS" v-on:click="ubahStatus('3')">Selesai</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalSelesai" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-primary">Update Status CNC</h5>
                    <button type="button" class="btn btn-close btn-danger" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
            <h1 class="text-center text-primary font-weight-bold">Ubah Status Diambil!</h1>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" id="btnS" v-on:click="ubahStatus('4')">Diambil</button>
            </div>
        </div>
    </div>
</div>
    </div>



 <div id="printPage" style="display:none">
    <div class="card-body">
                    
        <div class="card-group row">

            <div class="col-md-6 mx-auto">

                <div class="card pb-5">
                    <div id="titleR"  class="mt-5" style="width:100%; height :500px;" >
                        
                    </div>
                    <img class="card-img-top mx-auto" src="/img/logo2.png" style="width:30%;" alt="Card image cap">
                    <div class="card-body position-relative" style="width:100%;">
                        <h4 class="card-title font-weight-bold text-center h3 text-primary">Bukti Transaksi</h4>     
                        <h6 class="card-title text-center h6 text-secondary">{{ tglP }}</h6>     
                        <table class="mt-5 mx-auto">
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Kode Invoice</p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ KIP }}</p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Outlet </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ OP }}</p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Total </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ HP }}</p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Telp Outlet  </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ TP }}</p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Petugas  </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ PP }}</p>

                                </td>
                            </tr>
                        </table>
                        <div id="qrcode" class="d-flex justify-content-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>

<script>
    import Navbar from '../Components/Navbar.vue'
    import router from '../router';

    export default{
        components: {
            Navbar,
        },
        data: function(){
            return{
                access_token : "",
                outlet: [],
                paket: [],
                pelanggan: [],
                kdinvoice: "",
                transaksi: [],
                searchTran: "",
                vqty: "",
                btn: true,
                modal : true,
                kodePa : "-1",
                harga : 0,
                idPel : "0",
                idOut : "0",
                total : "",
                keterangan : "",
                detailTran : [],
                TU: true,
                IU: null,
                totalAll : 0,
                batas_waktu : "",
                print: false,
                KIP : "",
                OP : "",
                HP : "",
                BP : "",
                TP : "",
                PP : "",
                Kodetran: "",
                saved : 0,
                tglP : "",
                qrcodeg : ""
            }
        },
        methods: {
             kodetran: function (a){
                var self = this;
                self.Kodetran = a;
            },
            ubahStatus: function (a) {
                var self = this;
                var status = a;

                axios.post('https://apilaundry.arashiyunus.com/api/auth/ubahStatus/',{status: status, id : self.Kodetran},{
                    headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                })
                .then(function(response){
                    var res = response.data;

                    if(res.status){
                        swal('Berhasil !', 'Status berhasil diubah', 'success')
                        $("#modalBaru").modal('hide');
                        $("#modalProses").modal('hide');
                        self.getAll();
                    }else{
                        swal('Gagal !', 'Status gagal diubah', 'error')
                    }
                })
            },
            getAll: function() {
                var self = this;
                // self.qrcode('a')
                self.qrcodeg = new QRCode(document.getElementById('qrcode'));
                self.access_token = localStorage.getItem('access_token');
                // self.qrcodeg.makeCode("CNC-2221IG6vkyT0Fk");
                axios.get("https://apilaundry.arashiyunus.com/api/auth/transaksi",{
                    headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    })
                .then(function(response){
                    var res = response.data;
                    self.pelanggan = res.pelanggan;
                    self.paket = res.paket;
                    self.outlet = res.outlet;
                    self.transaksi = res.list;

                    var ran = "";
                    
                    var date = new Date();

                    self.kdinvoice = ran.concat("CNC-",date.getDate(),date.getHours(),self.Random(10,"c"))
                }, { withCredentials: true })
                .catch((e)=>{
                     router.push({
                        name: 'index'
                    })
                    // validation.value = e.response.data
                });
            },
            qty: function () {
                var self = this;
                if(self.vqty <= 0 ){
                    self.vqty = "";
                    self.total = "";
                }else{
                    var kodePa = self.kodePa;
                
                    var j = parseInt(self.vqty);
                    if(kodePa == 0){
                        self.harga = 5000;    
                    }else if(kodePa > 0){
                        self.harga = parseInt(self.paket[kodePa - 1].harga);                    
                    }else{
                        self.vqty = "";
                        self.total = "";
                    }
                    
                    if(kodePa >= 0){
                        self.total = ( ( self.harga * j ));
                    }
                }

            },
            btnModal: function (a) {
                var self =this;
                if(a == "0"){
                    self.modal = false;
                }
            },
             Random: (a,b) => {
                var chars = "";
                if(b == "b"){
                    chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
                }else if(b == "c"){
                    // chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890!@#$%^&*()-=_+|?~";
                    chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890";
                }
                var string_length = a;

                var rom = "";
                // var randomstring = '';
                for (var i=0; i<string_length; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    rom += chars.substring(rnum,rnum+1);
                }
                return rom;
            },
            btnTransaksi: function(a) {
                var self = this;
                if(a == "0"){
                    self.btn = false;
                }else if(a == "1" ){
                    self.btn = true;
                }
            },
            searchingTran: function (a) {
                var self = this;
                const data = new FormData();

                data.append('param', a)

                axios({
                    method : "POST",
                    url : 'https://apilaundry.arashiyunus.com/api/auth/searchTran',
                    data : data,
                    headers: {
                            'Authorization': `Bearer ${self.access_token}` ,
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        }
                })
                .then( function(response){
                    var res = response.data;
                    
                    self.transaksi = res.list;
                })
            },
            detail: function (a) {
                var self = this;
                self.kodePa = self.detailTran[a].id_paket; 
                self.harga = self.detailTran[a].harga; 
                self.vqty = self.detailTran[a].qty; 
                self.total = self.detailTran[a].total; 
                self.keterangan = self.detailTran[a].keterangan; 
                self.IU = a;
                self.TU = false;
            },
            tambah: function() {
                var self =this;
                if(self.harga == "" || self.keterangan == ""){
                    swal("Peringatan !", "Mohon isi data dengan benar", "warning");
                }else{
                    var data = {
                        harga : self.harga,
                        qty : self.vqty,
                        total : self.total,
                        keterangan : self.keterangan,
                        id_paket : self.kodePa
                    }
                    self.totalAll += self.total;  
                    self.harga = ""; 
                    self.vqty = ""; 
                    self.total = ""; 
                    self.keterangan = ""; 
                    self.kodePa = "-1"; 
        
                    self.detailTran.push(data);
                    self.saved = 1;
                }
            },
            ubah: function() {
                var self = this;
                var data = {
                    id_paket : self.kodePa,
                    harga : self.harga,
                    qty : self.vqty,
                    total : self.total,
                    keterangan : self.keterangan,
                }

                self.totalAll -= self.detailTran[self.IU].total;
                self.totalAll += self.total;

                self.harga = ""; 
                self.vqty = ""; 
                self.total = ""; 
                self.keterangan = ""; 
                self.kodePa = "-1"; 
                self.TU = true;

                self.detailTran[self.IU] = data;
            },
            hapus: function(){
                var self = this;
                self.detailTran.splice(self.IU, 1);
                self.harga = ""; 
                self.vqty = ""; 
                self.total = ""; 
                self.keterangan = ""; 
                self.kodePa = "-1"; 
                self.TU = true;
            },
            pilihUser: function(event){
                var self = this;
                self.idPel = event.target.value;
            },
            pilihOutlet: function(event){
                var self = this;
                self.idOut = event.target.value;
            },
            selesai: function (){
                var self = this;
                var le = self.detailTran.length;
                var dataTran = {
                    user_id : self.idPel,
                    outlet_id : self.idOut,
                    kode_invoice : self.kdinvoice,
                    total : self.totalAll,
                    statusOrder : "1",
                    statusBayar : "belum_dibayar",
                    detail : self.detailTran
                };
                axios({
                    method : "post",
                    url : "https://apilaundry.arashiyunus.com/api/auth/transaksi",
                    data: dataTran ,
                    headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    
                })
                .then(function(response){
                    var res = response.data;
                    // console.log(response)

                    // if(res.validate){
                        if(res.status){
                            // swal('Sukses !', 'Data berhasil disimpan', 'success')
                            
                            self.print = true;
                            self.vqty= "";
                            self.btn= true;
                            self.modal = true;
                            self.kodePa = "-1";
                            self.harga = 0;
                            self.total = "";
                            self.keterangan = "";
                            self.detailTran = [];
                            self.TU= true;
                            self.IU= null;
                            self.totalAll = 0;


                            var ran = "";
                    
                            var date = new Date();
            
                            self.kdinvoice = ran.concat("CNC-",date.getDate(),date.getHours(),self.Random(10,"c"))

                            self.transaksi = res.list;
                                
                                self.KIP = res.print[0].kode_invoice
                                self.OP = res.print[0].outlet.nama.concat(", ",res.print[0].outlet.alamat,".")
                                self.HP = res.print[0].total
                                self.TP = res.print[0].outlet.tlp
                                self.tglP = res.print[0].tgl
                                self.PP = res.petugas
                                self.qrcodeg.makeCode(res.print[0].kode_invoice);
                                document.title = "CNC Laundry Bukti Transaksi "+self.tglP

                                // window.onbeforeprint = function(){
                                    
                                //     }

                            Swal.fire({
                                title: 'Berhasil !',
                                text: "Transaksi telah di tambahkan",
                                type: 'success',
                                showCancelButton: false,
                                // cancel: false,
                                // close: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                // cancelButtonText: 'Kembali',
                                confirmButtonText: 'Lanjutkan !'
                            }).then((result) => {
                                // var str = document.querySelector("input").value;
                                    setTimeout(function(){
                                window.print()
                                },2000)
                                document.title = "CNC Laundry"
                            })

                        }else{
                            swal('Gagal !', 'Gagal menambah transaksi', 'error')
                            
                        }                       
                    // }
                })
            },
            // qrcode: function(a){
            //     new QRCode(document.getElementById("qrcode"), a);
            // },
            // qrclear: function(){
            //     new QRCode(document.getElementById("qrcode")).clear();          
            // }
        },
        mounted(){
            var self = this;
            window.addEventListener('beforeprint', function(){
                $("#navbar").hide();
                $("#appTran").hide();
                $("#printPage").show();

            })
            window.addEventListener('afterprint', function(){
                $("#navbar").show();
                // $("#appCon").show();
                // $("#content-im").show();
                // $("#printPage").hide();

                // $("#navbar").show();
                $("#appTran").show();
                $("#printPage").hide();
                
                self.getAll()
            })
            this.getAll()
        }
    }
</script>