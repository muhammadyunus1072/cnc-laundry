<template>
    <Navbar>
        
    </Navbar>

     <div id="appLapH">    
        <div id="content-im">
        <center>
            <select class="form-select mr-sm-2 w-50 font-weight-bold mt-4" v-model="kode" v-on:change="kodelfalse">
                <option selected :value="0" >Pilih Laporan ...</option>
                <option :value="1">Laporan Outlet</option>
                <option :value="2">Laporan Paket</option>
                <option :value="3">Laporan Pengguna</option>
                <option :value="4">Laporan Transaksi</option>
            </select> 
        </center>

           

        <div class="card text-white bg-info w-75 mt-5" style="margin-left:12.5%;" v-if="kode === 3">
          <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
          <div class="card-body">
            <div class="form-group row">
                <!-- <label for="inputPassword" class="col-md-2 h1">Role </label> -->
                <div class="w-auto mx-auto">
                    <select class="form-select mr-sm-2 font-weight-bold" id="idRole" v-model="kodeR" v-on:change="kodelfalse">
                        <option :value="0">Semua Role</option>
                        <option v-for="(data, index) in role" :kode="data.id" :value="data.id">{{ index+1 }}. {{ data.role }}</option>
                    </select>  
                </div>
            </div>
          

            <div class="form-group">
                <center>
                    <button class="btn btn-warning bnt-lg mt-3 mx-4 h1 font-weight-bold" v-on:click="liat">Lihat Data</button>
                    <button class="btn btn-success bnt-lg mt-3 mx-4 h1 font-weight-bold" v-on:click="printed">Print</button>
                </center>
            </div>
             
          </div>
        </div>
       
       
        <div id="content-im" class="card text-white bg-info w-75 mt-5" style="margin-left:12.5%;" v-if="kode === 2">
          <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
          <div class="card-body">
            <div class="form-group row">
                <div class="form-group row">
                    <div class="col-md-4 h1 mx-auto text-center">Paket </div>
                </div>
                <!-- <div class="col-sm-10">
                    <select class="form-select mr-sm-10 font-weight-bold" id="idOutlet" v-model="kodeO" v-on:change="kodelfalse">
                        <option :value="0">Semua Outlet</option>
                        <option v-for="(data, index) in outlet" :kode="data.id" :value="data.id">{{ index }}. {{ data.nama }}, {{ data.alamat }}</option>
                    </select>  
                </div> -->
            </div>

            <div class="form-group">
                <center>
                    <button class="btn btn-warning bnt-lg mt-3 mx-4 h1 font-weight-bold" v-on:click="liat">Lihat Data</button>
                    <button class="btn btn-success bnt-lg mt-3 mx-4 h1 font-weight-bold" v-on:click="printed">Print</button>
                </center>
            </div>
             
          </div>
        </div>
       
       
        <div id="content-im" class="card text-white bg-info w-75 mt-5" style="margin-left:12.5%;" v-if="kode === 1">
          <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
          <div class="card-body">
            <div class="form-group row">
                <div class="col-md-4 h1 mx-auto text-center">Outlet </div>
            </div>

            <div class="form-group">
                <center>
                    <button class="btn btn-warning bnt-lg mt-3 mx-4 h1 font-weight-bold" v-on:click="liat">Lihat Data</button>
                    <button class="btn btn-success bnt-lg mt-3 mx-4 h1 font-weight-bold" v-on:click="printed">Print</button>
                </center>
            </div>
             
          </div>
        </div>
        <div id="content-im" class="card text-white bg-info w-75 mt-5" style="margin-left:12.5%;" v-if="kode === 0">
          <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
        
        </div>


        <div id="content-im" class="card text-white bg-info w-75 mt-5" style="margin-left:12.5%;" v-show="kode === 4">
          <!-- <img class="card-img-top" src="holder.js/100px180/" alt=""> -->
          <div class="card-body">
          <!-- <input placeholder="Batas Waktu" class="datepicker form-control ll-skin-latoja bataswaktu" data-date-format="yyyy-mm-dd" data-date-end-date="+7d" data-date-start-date="0d">     -->
    
          <div class="form-group row">
                <div class="w-auto mx-auto">
                    <select class="form-select mr-sm-10 font-weight-bold" id="idOutlet" v-model="kodeO" @change="kodelfalse">
                        <option :value="0" >Semua Outlet</option>
                        <option v-for="(data, index) in outlet" :kode="data.id" :value="data.id">{{ index+1 }}. {{ data.nama }}, {{ data.alamat }}</option>
                    </select>   
                </div>
            </div>
            <div class="form-group row mt-3">
                <label for="inputPassword" class="col-md-4 h4">Tanggal</label>
                <div class="col-sm-8">
                    <input placeholder="Tanggal Transaksi" class="datepickert form-control ll-skin-latoja tgl" data-date-format="yyyy-mm-dd" data-date-end-date="+0d" v-on:keyup="kodelfalse">    
                </div>
            </div>
            <div class="form-group row mt-3">
                <label for="inputPassword" class="col-md-4 h4">Tanggal Bayar </label>
                <div class="col-sm-8">
                    <input placeholder="Tanggal Bayar" class="datepickert form-control ll-skin-latoja byr" data-date-format="yyyy-mm-dd" data-date-end-date="+0d" v-on:keyup="kodelfalse">    
                </div>
            </div>

            <div class="form-group">
                <center>
                    <button class="btn btn-warning bnt-lg mt-3 mx-4 h1 font-weight-bold" v-on:click="liat">Lihat Data</button>
                    <button class="btn btn-success bnt-lg mt-3 mx-4 h1 font-weight-bold" v-on:click="printed">Print</button>
                </center>
            </div>
             
          </div>
        </div>
    </div>
        <div id="printPage">
            <table class="table table-hover mt-5" v-if="kode === 1 && kodel === true">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>No Telp</th>
                    </tr>
                </thead>
                <tbody v-for=" (data, index) in list ">
                    <tr>
                        <td> {{ index+1 }}</td>
                        <td> {{ data.nama }}</td>
                        <td> {{ data.alamat }}</td>
                        <td> {{ data.tlp }}</td>
                      </tr>         
                </tbody>
            </table>
            <table class="table table-hover mt-5" v-if="kode === 2 && kodel === true && kodeO === 0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jenis</th>
                        <th>Nama Paket</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody v-for=" (data, index) in list ">
                    <tr>
                        <td> {{ index+1 }}</td>
                        <td> {{ data.jenis }}</td>
                        <td> {{ data.nama_paket }}</td>
                        <td> {{ data.harga }}</td>
                      </tr>         
                </tbody>
            </table>
            <table class="table table-hover mt-5" v-if="kode === 2 && kodel === true && kodeO > 0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jenis</th>
                        <th>Nama Paket</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody v-for=" (data, index) in list ">
                    <tr>
                        <td> {{ index+1 }}</td>
                        <td> {{ data.jenis }}</td>
                        <td> {{ data.nama_paket }}</td>
                        <td> {{ data.harga }}</td>
                      </tr>         
                </tbody>
            </table>
            <table class="table table-hover mt-5" v-if="kode === 3 && kodel === true ">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody v-for=" (data, index) in list ">
                    <tr>
                        <td> {{ index+1 }}</td>
                        <td> {{ data.name }}</td>
                        <td> {{ data.email }}</td>
                        <td> {{ data.role.role }}</td>

                      </tr>         
                </tbody>
            </table>
            <table class="table table-hover mt-5" v-if="kode === 4 && kodel === true">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Kode Invoice</th>
                        <th>Nama</th>
                        <th>Tanggal</th>
                        <th>Tanggal Bayar</th>
                        <th>Total</th>
                        <th>Nama Outlet</th>
                        <th>Status Order</th>
                        <th>Status Bayar</th>
                    </tr>
                </thead>
                <tbody v-for=" (data, index) in list ">
                    <tr>
                        <td> {{ index+1 }}</td>
                        <td> {{ data.kode_invoice }}</td>
                        <td> {{ data.user.name }}</td>
                        <td> {{ data.tgl }}</td>
                        <td> {{ data.tgl_bayar }}</td>
                        <td> {{ data.total }}</td>
                        <td> {{ data.outlet.nama }}</td>
                        <td> {{ data.status_order.status }}</td>
                        <td> {{ data.statusBayar }}</td>

                      </tr>         
                </tbody>
            </table>
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
                kode : 0,
                role : [],
                outlet : [],
                kodeR : 0,
                kodeO : 0,
                list : [],
                kodel : false,
                access_token : ''
            }
        },
        methods : {
            prepare: function() {
                var self = this;
                
                self.access_token = localStorage.getItem('access_token');
                axios({
                    method : "get",
                    url : "http://localhost:8001/api/auth/laporan",
                    headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                            }
                })
                .then(function(response){
                    var res = response.data;
                    // console.log(response)
                    self.role = res.role;
                    self.outlet = res.outlet;
                    $(".datepickert").datepicker({
                        // appendText : 'yyyy-mm-dd'
                        dateFormat: "yy-mm-dd",
                        showOptions: { direction: "up" }
                    })
                })
            }, 
            kodelfalse: function() {
                var self = this;
                self.kodel = false;
            },
            liat: function() {
                var self = this;
                // alert("oke")
                var table = "";
                if(self.kode == 1){
                    table = "outlet";

                    axios({
                        method : "post",
                        url : "http://localhost:8001/api/auth/laporan",
                        data : {
                            table : table
                        },
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                            }
                    })
                    .then(function(response){
                        var res = response.data;
                        // console.log(res)
                        self.list = res.list;
                        self.kodel = true;
                    })
                }else if(self.kode == 2){
                    table = "paket";
                    if(self.kodeO == 0){
                        axios({
                            method : "post",
                            url : "http://localhost:8001/api/auth/laporan",
                            data : {
                                table : table,
                                outlet : "semua"
                            },
                            headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                            }
                        })
                        .then(function(response){
                            var res = response.data;
                            // console.log(res)
                            self.list = res.list;
                            self.kodel = true;
                        })
                    }else {
                        axios({
                            method : "post",
                            url : "http://localhost:8001/api/auth/laporan",
                            data : {
                                table : table,
                                outlet : self.kodeO
                            },
                            headers: {
                                'Authorization': `Bearer ${self.access_token}` 
                            }
                        })
                        .then(function(response){
                            var res = response.data;
                            // console.log(res)
                            self.list = res.list;
                            self.kodel = true;
                        })
                    }
                }else if(self.kode == 3){
                    table = "user";

                if(self.kodeR == 0 ){
                    axios({
                        method : "post",
                        url : "http://localhost:8001/api/auth/laporan",
                        data : {
                            table : table,
                            role : "semua",
                        },
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                            }
                    })
                    .then(function(response){
                        var res = response.data;
                        // console.log(res)
                        self.list = res.list;
                        self.kodel = true;
                    })
                }
                if(self.kodeR == 0 ){
                    axios({
                        method : "post",
                        url : "http://localhost:8001/api/auth/laporan",
                        data : {
                            table : table,
                            role : "semua",
                        },
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                            }
                    })
                    .then(function(response){
                        var res = response.data;
                        // console.log(res)
                        self.list = res.list;
                        self.kodel = true;
                    })
                }
                if(self.kodeR != 0 ){
                    // alert(self.kodeR)
                    axios({
                        method : "post",
                        url : "http://localhost:8001/api/auth/laporan",
                        data : {
                            table : table,
                            role : self.kodeR,
                        },
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                            }
                    })
                    .then(function(response){
                        var res = response.data;
                        // console.log(res)
                        self.list = res.list;
                        self.kodel = true;
                    })
                }
                if(self.kodeR != 0){
                    axios({
                        method : "post",
                        url : "http://localhost:8001/api/auth/laporan",
                        data : {
                            table : table,
                            role : self.kodeR,
                        },
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                            }
                    })
                    .then(function(response){
                        var res = response.data;
                        // console.log(res)
                        self.list = res.list;
                        self.kodel = true;
                    })
                }
                    
                }else if(self.kode == 4){
                    table = "transaksis";

                    var tgl = $(".tgl");
                    var byr = $(".byr");

                    var tanggal = "";
                    var bayar = "";
                    var outlet = "";

                    if(self.kodeO == 0 && tgl.val() == "" && byr.val() == ""){
                        outlet = "semua";
                        tanggal = "semua";
                        bayar = "semua";
                    }
                    else if(self.kodeO == 0 && tgl.val() != "" && byr.val() == ""){
                        outlet = "semua";
                        tanggal = tgl.val();
                        bayar = "semua";
                    }
                    else if(self.kodeO == 0 && tgl.val() == "" && byr.val() != ""){
                        outlet = "semua";
                        tanggal = "semua";
                        bayar = byr.val();
                    }
                    else if(self.kodeO != 0 && tgl.val() == "" && byr.val() == ""){
                        outlet = self.kodeO;
                        tanggal = "semua";
                        bayar = "semua";
                    }
                    else if(self.kodeO != 0 && tgl.val() != "" && byr.val() == ""){
                        outlet = self.kodeO;
                        tanggal = tgl.val();
                        bayar = "semua";
                    }
                    else if(self.kodeO != 0 && tgl.val() == "" && byr.val() != ""){
                        outlet = self.kodeO;
                        tanggal = "semua";
                        bayar = byr.val();
                    }
                    else if(self.kodeO == 0 && tgl.val() != "" && byr.val() != ""){
                        outlet = "semua";
                        tanggal = tgl.val();
                        bayar = byr.val();
                    }
                    else if(self.kodeO != 0 && tgl.val() != "" && byr.val() != ""){
                        outlet = self.kodeO;
                        tanggal = tgl.val();
                        bayar = byr.val();
                    }

                    axios({
                        method : "post",
                        url : "http://localhost:8001/api/auth/laporan",
                        data : {
                            table : table,
                            outlet : outlet,
                            tanggal : tanggal,
                            bayar : bayar
                        },
                        headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                            }
                    })
                    .then(function(response){
                        var res = response.data;
                        // console.log(res)
                        self.list = res.list;
                        self.kodel = true;
                    })
                }
            },
            printed: function() {
                var self = this;
                self.liat();
                setTimeout(function(){
                    $("#navbar").hide();
                    $("#content-im").hide();
                    $("#printPage").show();
        
                    window.print()
        
                    $("#navbar").show();
                    $("#content-im").show();
                    // $("#printPage").hide();
                },1000);
                // self.kodel = false;
            }
        },
        mounted: function () {
            this.prepare();
        },
    }
</script>