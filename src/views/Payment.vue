<template>
    <Navbar>
        
    </Navbar>
    <div class="container" id="appCon" style="display: block;">
        <div class="d-flex justify-content-center flex-column">
            <div class="top">
                <div id="dialPlanListTable_filter" class="dataTables_filter">
                    <div class="alert alert-danger mt-5 text-center" style="margin-left:15%;width:70%;" role="alert" v-if="code === 1">
                        Data tidak ditemukan !
                    </div>
                    <div class="alert alert-success mt-5 text-center" style="margin-left:15%;width:70%;" role="alert" v-if="code === 2">
                        Data telah dibayar !
                    </div>
                    <div class="w-full">
                        <input type="search" v-on:keyup="searchingKode(kode)" v-model="kode" class="form-control input-sm" style="width:70%; height:60px; margin-left:15%;margin-top:15px; z-index:5; font-size:25pt;letter-spacing:6px;font-weight:bold;color:#007bff" placeholder="Kode Invoice" aria-controls="dialPlanListTable">
                    </div>
                </div>
            </div>
            <div class="w-100 d-flex justify-content-center mt-3">                
                <button v-if="scanStatus" type="button" class="btn btn-primary mx-auto" v-on:click="stopScan()"> Stop Scanning</button>
                <button v-if="!scanStatus" type="button" class="btn btn-primary mx-auto" v-on:click="startScan()"> Start Scanning</button>
            </div>
            <div class="w-100 d-flex justify-content-center flex-column mt-3">
                <div class="w-100 d-flex justify-content-center" v-if="!scanStatus">
                    <img class="text-center w-40 h-25" src="img/logo2.png" alt="">
                </div>
                <div class="w-100 d-flex justify-content-center">
                    <div id="qrReader" class="w-50 border"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="appPem" style="display:block;">
        <div id="content-im">
        
        <!-- <center> -->
        <div class="w-100 d-flex justify-content-center mt-3">
        </div>
        <!-- </center> -->

        <div class="modal fade" id="modalPem" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <img src="img/logo.png" width="150" height="60" alt="">
                        <h4 class="card-title font-weight-bold text-center h1 text-primary" style="margin-left:15%;">Pembayaran</h4>   
                        <button type="button" class="btn btn-close btn-danger" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" style="width:100%;height:350px;margin-left:0;z-index:0;">
                        <div class="card-body " style="opacity:1;">
                        <p class="fs-4 fw-semibold text-center text-primary">
                            {{ outletName }}
                        </p>
                        <p class="fs-6 fw-semibold text-center text-primary">
                            {{ outletAlamat }}
                        </p>
                        <table class="mt-5 mx-auto w-75">
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Kode Invoice</p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ kode_invoice }}</p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Nama </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ nama }}</p>

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
                                    <p class="fw-bold text-primary">{{ total }}</p>
                                    
                                </td>
                            </tr>
                            <tr class="">
                                <td class="">
                                    <div class="w-auto d-flex align-content-stretch flex-wrap">
                                        <div class="fw-semibold text-secondary">Tunai  </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="w-auto d-flex align-content-stretch flex-wrap">
                                        <div class="fw-semibold text-secondary">:  </div>
                                    </div>

                                </td>
                                <td>
                                    <!-- <p class="fw-bold text-success">{{ bayar }}</p> -->
                                    <div class="input-group w-75">
                                        <input type="number" class="form-control" v-model="bayar" :min="0" placeholder="Tunai"  v-on:keyup="tunai">
                                        <div class="input-group-text">
                                            Rupiah
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Kembalian  </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-warning">{{ kembalian }}</p>

                                </td>
                            </tr>
                        </table>
                           </div>
                    </div>
                    <div class="content p-3">
                        <!-- <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> -->
                        <button type="button" class="btn btn-primary btn-lg w-50" style="margin-left:25%;" v-on:click="selesai">Selesai</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div id="printPage" style="display:none;">
        <div class="card-body">
                    
            <div class="card-group row">
            
                <!-- <center> -->
                <div class="col-md-6 mx-auto">

                    <div class="card pb-5">
                        <h4 class="card-title font-weight-bold text-center h3 text-primary pt-3">Bukti Pembayaran</h4>     
                        <span class="fs-4 fw-semibold text-center text-primary mt-2">
                            {{ outletName }}
                        </span>
                        <span class="fs-6 fw-semibold text-center text-primary">{{ outletAlamat }}</span>
                        <p class="fs-6 lh-1 text-center text-primary">{{ tgl_bayar }}</p>
                        <table class="mt-3 mx-auto">
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Kode Invoice</p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ kode_invoicep }} </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Petugas </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ petugasp }} </p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Pelanggan </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ pelangganp }} </p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Total  </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ totalp }} </p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Tunai  </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ bayarp }} </p>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="fw-semibold text-secondary">Kembalian  </p>

                                </td>
                                <td>
                                    <p class="fw-semibold text-secondary"> : </p>

                                </td>
                                <td>
                                    <p class="fw-bold text-primary">{{ kembalianp }} </p>

                                </td>
                            </tr>
                        </table>
                        <!-- <img class="card-img-top" src="{{asset('img/logo2.png')}}" style="width:100px; height:100px;" alt="Card image cap"> -->
                        <div class="card-body " style="width:100%;">
                            <h4 class="card-title font-weight-bold text-center h1 text-primary">Terimakasih</h4>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Navbar from '../Components/Navbar.vue'
    import  { Html5QrcodeScanner } from 'html5-qrcode'
    import {Html5Qrcode} from "html5-qrcode"
    // const html5QrCode = '';
    export default{
        components: {
            Navbar,
        },
        data(){
            return{
                tgl_bayar : '',
                pelangganp : '',
                petugasp : '',
                access_token : '',
                html5QrCode : '',
                scanStatus : true,
                consfig : '',
                qrCodeSuccessCallback : '',
                kode : "",
                id : "",
                kode_invoice : "",
                outletName : "",
                outletAlamat : "",
                total : "",
                bayar : "",
                kembalian : "",
                nama : "",
                kode_invoicep : "",
                outletp : "",
                totalp : "",
                bayarp : "",
                kembalianp : "",
                code : 0,
                print: false
            }
        },
        mounted(){            
            this.html5QrCode = new Html5Qrcode("qrReader");

        // var html5QrcodeScanner = new Html5QrcodeScanner(
        //     "qrReader", { fps: 10, qrbox: 300 });
        // html5QrcodeScanner.render(this.onScanSuccess);
            
        this.qrCodeSuccessCallback = (decodedText, decodedResult) => {
            /* handle success */
            this.searchingKode(decodedText);
            this.stopScan()
        };
        // const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        this.config = { fps: 10, qrbox: 250 };

        this.startScan()
        // If you want to prefer front camera
        // this.html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccessCallback);

        // If you want to prefer back camera
        // html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

        // Select front camera or fail with `OverconstrainedError`.
        // html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback);

        // Select back camera or fail with `OverconstrainedError`.
        // html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);
        },
        methods: {
            //  onScanSuccess: function(decodedText, decodedResult) {
            //     console.log(`Code scanned = ${decodedText}`, decodedResult);
            //     html5QrcodeScanner.stop();
            //     html5QrcodeScanner.clear();
            // },
            startScan: function(){
                this.html5QrCode.start({ facingMode: "user" }, this.config, this.qrCodeSuccessCallback);
                this.scanStatus = true;
            },
            stopScan: function(){
                this.html5QrCode.stop().then((ignore) => {
                // QR Code scanning is stopped.
                this.scanStatus = false;
                // console.log(this.scanStatus)
                }).catch((err) => {
                // Stop failed, handle it.
                });
            },
            searchingKode: function (a) {
                var self = this;
                self.access_token = localStorage.getItem('access_token');
                axios.post('http://localhost:8001/api/auth/searchingKode',{param : a},{headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                        }
                    }
                )
                .then(function(response){
                    var res = response.data;
                    // console.log(res)
                    if(res.status){
                        if(res.list[0].statusBayar == "dibayar"){
                            self.code = 2;
                        }else if(res.list[0].statusBayar == "belum_dibayar"){
                            // console.log(res)
                            self.id = res.list[0].id;
                            self.kode_invoice = res.list[0].kode_invoice;
                            self.outletName = res.list[0].outlet.nama;
                            self.outletAlamat = res.list[0].outlet.alamat;
                            self.nama = res.list[0].user.name;
                            self.total = res.list[0].total;
                            $("#modalPem").modal("show");
                            self.code = 0;
                        }
                    }else if(a == ""){
                        self.code = 0;
                    }else{
                        self.code = 1;
                    }
                })
            },
            tunai: function () {
                var self = this;
                // alert(self.total)
                var k = self.bayar - self.total;

                if(k < 0){
                    self.kembalian = "";
                }else{
                    self.kembalian = parseInt(k);
                    self.kembalian += ' Rupiah'
                }
            },
            selesai: function () {
                var self = this;
                axios({
                    method : 'post',
                    url : 'http://localhost:8001/api/auth/bayar',
                    data : {
                        id : self.id,
                        dibayar : 'dibayar',
                        kode_invoice : self.kode_invoice,
                        total : self.total,
                        tunai : self.bayar,
                        nama : self.nama,
                        outlet : self.outletName.concat(self.outletAlamat),
                        kembalian : parseInt(self.kembalian),
                    },
                    headers: {
                            'Authorization': `Bearer ${self.access_token}` 
                    }
                })
                .then(function(response){
                    var res = response.data;
                    // console.log(res)
                    if(res.validate){
                        if(res.status){
                            self.print = true;
                            self.kode = "";
                            self.id = "";
                            self.kode_invoice = "";
                            self.total = "";
                            self.nama = "";
                            self.bayar = "";
                            self.kembalian = "";
                            self.kode_invoicep = res.kode_invoice;
                            self.tgl_bayar = res.tgl_bayar;
                            self.petugasp = res.petugas;
                            self.pelangganp = res.nama;
                            self.totalp = res.total;
                            self.bayarp = res.bayar;
                            self.kembalianp = res.kembalian;
                            $("#modalPem").modal("hide");
                            Swal.fire({
                                title: 'Berhasil !',
                                text: "Transaksi anda berhasil",
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
                                $("#appCon").hide();
                                $("#content-im").hide();
                                $("#printPage").show();

                                setTimeout(function(){
                                    window.print()
                                    $("#navbar").show();
                                    $("#appCon").show();
                                    $("#content-im").show();
                                    $("#printPage").hide();
                                },1000);
                                // alert("oke")
                                
                                self.code = 0;
                            })
                        }
                    }
                })
            }
        }
    }
</script>