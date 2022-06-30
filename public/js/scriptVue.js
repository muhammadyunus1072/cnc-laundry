// $('.datepicker').datepicker({});

var vOut = new Vue({
    el: "#appOutlet",
    data: {
        idOutlet: "",
        option: "",
        list: [],
        searchOut: "",
    },
    mounted : function() {
        this.getOutletAll()
    },
    methods: {
        getOutletAll: () => {
           axios.get('http://localhost:8001/api/auth/outlet/')
           .then( response => {
               var res = response.data;
               vOut.list =res.list;
           })
        },
        searchingOut: (a) => {
            axios.post('http://localhost:8000/api/searchOut/',{param: a})
            .then( function(response){
                var res = response.data;
                vOut.list =res.list;
            })
        },
       opsi: (a, b) => {
           this.option = a;
           this.idOutlet = b;
        },
       simpanOutlet: () => {
    //    alert(this.option)
            if(this.option == "tambah"){
                axios.post('http://localhost:8000/api/outlet',{
                    nama: $("#nama").val(),
                    alamat: $("#alamat").val(),
                    tlp: $("#tlp").val()
                })
                .then( function(response){
                    var res = response.data;

                    if(res.validate){
                        if(res.status){
                            swal('Sukses !', 'Data berhasil disimpan', 'success')
                            $("#modalOut").modal('hide')
                            console.log(res)
                            vOut.getOutletAll();
                        }else{
                            swal('Gagal !', 'Gagal menyimpan data', 'error')
                            $("#modalOut").modal('hide')
                        }                       
                    }else{
                        swal('Peringatan !', res.error[0], 'warning')
                        $("#modalOut").modal('hide')
                    }
                })
            }else if(this.option == "ubah"){
                axios.put('http://localhost:8000/api/outlet/'+this.idOutlet,{
                    nama: $("#nama").val(),
                    alamat: $("#alamat").val(),
                    tlp: $("#tlp").val()
                })
                .then( function(response){
                    var res = response.data;

                    if(res.validate){
                        if(res.status){
                            swal('Sukses !', 'Data berhasil diubah', 'success')
                            $("#modalOut").modal('hide')
                            console.log(res);
                            vOut.list = res.list;
                        }else{
                            swal('Gagal !', 'Gagal mengubah data', 'error')
                            $("#modalOut").modal('hide')
                        }
                    }else{
                        swal('Peringatan !', res.error[0], 'warning')
                        $("#modalOut").modal('hide')
                    }
                })

            }
        }
    }
})

$(document).on("click", ".btnHapusOut", function(){
    var id = $(this).attr("idOut");
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
                url: 'api/outlet/'+id,
            })
            .then( function(response){
                if(response.data.status){
                    Swal.fire(
                      'Berhasil!',
                      'Data berhasil dihapus.',
                      'success'
                    )
                    $(this).parent().parent().remove();

                    vOut.getOutletAll();
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
})

var vPak = new Vue({
    el: "#appPaket",
    data: {
        outlet: [],
        paket: [],
        detOutlet: [],
        jenis: [],
        option: "",
        idPaket: "",
        searchPak: ""
    },
    mounted: function(){
        this.getPaketAll();
    },
    methods: {
        getPaketAll: () => {
            axios.get('http://localhost:8000/api/paket')
            .then( function(response){
                // alert("oke")
                var res = response.data;
                vPak.outlet = res.outlet;
                vPak.jenis = res.jenis;
                vPak.paket = res.paket;
                var lp = res.paket.length;

                var exists = 0;
                vPak.detOutlet.length = 0;
                for(var a = 0; a < lp; a++){
                    console.log("pak = "+vPak.paket[a].id_outlet)
                    var lo = vPak.outlet.length;
                    // console.log("pak = "+lo)
                    for(var b = 0; b < lo; b++){
                        console.log("out = "+vPak.outlet[b].id)
                        if(vPak.paket[a].id_outlet == vPak.outlet[b].id){
                            var nama = vPak.outlet[b].nama.concat(", ",vPak.outlet[b].alamat);
                           vPak.detOutlet.push(nama)
                        }
                    }
                 }                  
            })
        },
        simpanPaket: () => {
            if(this.option == "tambah"){
                axios.post("http://localhost:8000/api/paket",{
                    id_outlet : $('#idOutlet').val(),
                    jenis : $('#jenis').val(),
                    nama_paket : $('#nama_paket').val(),
                    harga : $('#harga').val(),
                })
                .then( function(response){
                    var res = response.data;
                    if(res.validate){
                        if(res.status){
                            swal('Sukses !', 'Data berhasil disimpan', 'success')
                            $("#modalPak").modal('hide')
                            console.log(res)
                           vPak.getPaketAll();
                        }else{
                            swal('Gagal !', 'Gagal menyimpan data', 'error')
                            $("#modalPak").modal('hide')
                        }                       
                    }else{
                        swal('Peringatan !', res.error[0], 'warning')
                        $("#modalPak").modal('hide')
                    }
                })
            }else if(this.option == "ubah"){
                axios.put('http://localhost:8000/api/paket/'+this.idPaket,{
                    id_outlet : $('#idOutlet').val(),
                    jenis : $('#jenis').val(),
                    nama_paket : $('#nama_paket').val(),
                    harga : $('#harga').val(),
                })
                .then( function(response){
                    var res = response.data;

                    if(res.validate){
                        if(res.status){
                            swal('Sukses !', 'Data berhasil diubah', 'success')
                            $("#modalPak").modal('hide')
                            console.log(res);
                            vPak.getPaketAll(); 
                        }else{
                            swal('Gagal !', 'Gagal mengubah data', 'error')
                            $("#modalPak").modal('hide')
                        }
                    }else{
                        swal('Peringatan !', res.error[0], 'warning')
                        $("#modalPak").modal('hide')
                    }
                })
            }
        },
        searchingPak: (a) => {
            axios.post('http://localhost:8000/api/searchPak/',{param: a})
            .then( function(response){
                var res = response.data;
                vPak.paket =res.paket;
            })
        },
        opsi: (a, b) => {
            this.option = a;
            this.idPaket = b;
        }
    }
})

$(document).on("click", ".btnHapusPak", function(){
    var id = $(this).attr("idPak");
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
                url: 'api/paket/'+id,
            })
            .then( function(response){
                if(response.data.status){
                    Swal.fire(
                      'Berhasil!',
                      'Data berhasil dihapus.',
                      'success'
                    )
                    $(this).parent().parent().remove();
                    vPak.getPaketAll();
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
})

var vPen = new Vue({
    el : "#appPengguna",
    data: {
        outlet: [],
        role: [],
        pengguna: [],
        option: [],
        searchPen: "",
        idPen: ""

    },
    mounted: function () {    
        this.getPenggunaAll();
    },
    methods: {
        opsi: (a, b) => {
            this.option = a;
            this.idPaket = b;
        },
        getPenggunaAll: () => {
            axios({
                method : "get",
                url : "http://localhost:8000/api/view_user"
            })
            .then(function(response){
                var res = response.data;

                vPen.pengguna = res.list;
                vPen.outlet = res.outlet;
                vPen.role = res.role;
            })
        },
        simpanPengguna: function(){
            var jenkel = "";
            if($("#jenis_kelamin").val() == "Laki - Laki"){
                jenkel = "L";
            }else if($("#jenis_kelamin").val() == "Perempuan"){
                jenkel = "P";
            }

            var r = 0;

            if($("#role").val() == "admin"){
                r = 1;
            }
            else if($("#role").val() == "kasir"){
                r = 2;
            }
            else if($("#role").val() == "owner"){
                r = 3;
            }
            else if($("#role").val() == "member"){
                r = 4;
            }
            if(vPen.option == "ubah"){
               
                axios({
                    method: "put",
                    url: "http://localhost:8000/api/user/"+vPen.idPen,
                    data: {
                        nama : $("#nama").val(),
                        alamat : $("#alamat").val(),
                        tlp : $("#tlp").val(),
                        jenis_kelamin : jenkel,
                        id_role : r,
                        id_outlet : $("#idOutlet").val()
                    }
                })
                .then(function(response){
                    var res = response.data;

                    if(res.validate){
                        if(res.status){
                            // swal('Sukses !', 'Data berhasil diubah', 'success')
                            $("#modalPen").modal('hide')
                            console.log(res);
                            vPen.getPenggunaAll(); 
                           
                            vPrint.list = res.list;
                            if(res.list.jenis_kelamin == "L"){
                                vPrint.list.jenis_kelamin = "Laki - Laki"
                            }else if(res.list.jenis_kelamin == "P"){
                                vPrint.list.jenis_kelamin = "Perempuan";
                            }
                            vPrint.list.nama_outlet = res.list.nama_outlet+", "+res.list.alamat_outlet;
                            vPrint.up = false;

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
                                prints("true")
                                // alert("oke")
                            })


                        }else{
                            swal('Gagal !', 'Gagal mengubah data', 'error')
                            $("#modalPen").modal('hide')
                        }
                    }else{
                        swal('Peringatan !', res.error[0], 'warning')
                        $("#modalPen").modal('hide')
                    }

                    
                })

            }else if(vPen.option == "tambah"){
                // alert(r+"and"+$("#idOutlet").val())
                axios({
                    method: "post",
                    url: "http://localhost:8000/api/user",
                    data: {
                        nama : $("#nama").val(),
                        alamat : $("#alamat").val(),
                        tlp : $("#tlp").val(),
                        jenis_kelamin : jenkel,
                        id_role : r,
                        id_outlet : $("#idOutlet").val()
                    }
                })
                .then(function(response){
                    var res = response.data;
                    // console.log(res.save)
                    if(res.validate){
                        if(res.status){
                            // swal('Sukses !', 'Data berhasil disimpan', 'success')
                            $("#modalPen").modal('hide')
                            console.log(res)
                           vPen.getPenggunaAll();

                           vPrint.list = res.list;
                            if(res.list.jenis_kelamin == "L"){
                                vPrint.list.jenis_kelamin = "Laki - Laki"
                            }else if(res.list.jenis_kelamin == "P"){
                                vPrint.list.jenis_kelamin = "Perempuan";
                            }
                            vPrint.list.nama_outlet = res.list.nama_outlet+", "+res.list.alamat_outlet;
                            vPrint.up = true;
                            vPrint.username = res.username;
                            vPrint.password = res.password;

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
                        swal('Peringatan !', res.error[0], 'warning')
                        $("#modalPen").modal('hide')
                    }

                   
                })
            }
        },
        // print: function(){
        //     window.print();
        //     // alert("cobaPrint")
        //     // window.location.assign("coba");
        // },
        searchingPen: function(a){
            axios.post('http://localhost:8000/api/searchPen/',{param: a})
            .then( function(response){
                var res = response.data;
                vPen.pengguna =res.list;
            })
        },
        opsi: function(a, b){
            vPen.option = a;
            vPen.idPen = b;
        },
    }
})

$(document).on("click", ".btnHapusPen", function(){
    var id = $(this).attr("idPen");
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
                url: 'api/user/'+id,
            })
            .then( function(response){
                if(response.data.status){
                    Swal.fire(
                      'Berhasil!',
                      'Data berhasil dihapus.',
                      'success'
                    )
                    $(this).parent().parent().remove();
                    vPen.getPenggunaAll();
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
})

var vPrint = new Vue({
    el: "#appPrint",
    data: {
        list: [],
        up: false,
        password: "password",
        username: "username",
    }
})
// var h = 0;

    // else if(a == "false"){
    //     // alert(a)
    //     $("#navbar").show();
    //     $("#appPengguna").show();
    //     $("#appPrint").hide();

    //     // h = 0;
    // }
    // $("#appPrint").css("scroll-y","hide");
    // window.print();

// $(document).on("mouseover","body", function(){
//     if($("#navbar").css("display") == "none"){

//         window.print();
//         $("#navbar").show();
//         $("#appPengguna").show();
//         $("#appPrint").hide();
//         // prints("false");
//     }
// })

var vTran = new Vue({
    el: "#appTran",
    data: {
        outlet: [],
        paket: [],
        pelanggan: [],
        petugas: [],
        kdinvoice: "",
        transaksi: [],
        searchTran: "",
        vqty: "",
        btn: true,
        modal : true,
        kodeO : "-1",
        kodeP : "0",
        kodeM : "0",
        kodePa : "-1",
        harga : 0,
        dis : 0,
        pajak : 0,
        total : "",
        keterangan : "",
        detailTran : [],
        TU: true,
        IU: null,
        totalAll : 0,
        diskon: 0,
        paj : 0,
        batas_waktu : "",
        print: false,
        KIP : "",
        OP : "",
        HP : "",
        BP : "",
        TP : "",
        PP : "",
        Kodetran: "",
        saved : 0
    },
    mounted: function(){
        this.getAll();
    },
    methods: {
        btnTransaksi: (a) => {
            if(a == "0"){
                vTran.btn = false;
            }else if(a == "1" ){
                vTran.btn = true;
            }
        },
        getAll: () => {
            axios.get("http://localhost:8000/api/transaksi")
            .then(function(response){
                console.log(response)
                var res = response.data;
                vTran.pelanggan = res.pelanggan;
                vTran.petugas = res.petugas;
                vTran.paket = res.paket;
                vTran.outlet = res.outlet;
                vTran.transaksi = res.list;

                console.log(res.list)
                var ran = "";
                
                var date = new Date();

                vTran.kdinvoice = ran.concat("CNC-",date.getDate(),date.getHours(),vTran.Random(10,"c"))
            })
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
        qty: () => {
            // alert(vTran.vqty)


            if(vTran.vqty <= 0 ){
                vTran.vqty = "";
                vTran.total = "";
            }else{
                var kodePa = vTran.kodePa;
               

                // var total = 0;

                var jum = parseInt( vTran.vqty / 10 );
              
                var j = parseInt(vTran.vqty);
                if(kodePa == 0){
                    vTran.harga = 5000;    
                }else if(kodePa > 0){
                    vTran.harga = parseInt(vTran.paket[kodePa - 1].harga);                    
                }else{
                    vTran.vqty = "";
                    vTran.total = "";
                }
                
                if(kodePa >= 0){
                    vTran.dis = (vTran.harga * jum);

                    vTran.pajak = (vTran.harga * j) * 10 / 100;
                                  
                    vTran.total = ( ( vTran.harga * j ) - vTran.dis + vTran.pajak);
                }
            }

        },
        tambah: () => {

            if(vTran.harga == "" || vTran.keterangan == ""){
                swal("Peringatan !", "Mohon isi data dengan benar", "warning");
            }else{
                var data = {
                    harga : vTran.harga,
                    qty : vTran.vqty,
                    dis : vTran.dis,
                    pajak : vTran.pajak,
                    total : vTran.total,
                    keterangan : vTran.keterangan,
                    id_paket : vTran.kodePa
                }
                vTran.totalAll += vTran.total; 
                vTran.diskon += vTran.dis; 
                vTran.paj += vTran.pajak; 
                vTran.harga = ""; 
                vTran.vqty = ""; 
                vTran.dis = ""; 
                vTran.pajak = ""; 
                vTran.total = ""; 
                vTran.keterangan = ""; 
                vTran.kodePa = "-1"; 
    
                vTran.detailTran.push(data);
                vTran.saved = 1;
            }
        },
        ubah: () => {
            var data = {
                harga : vTran.harga,
                qty : vTran.vqty,
                dis : vTran.dis,
                pajak : vTran.pajak,
                total : vTran.total,
                keterangan : vTran.keterangan,
                id_paket : vTran.kodePa
            }

            vTran.totalAll -= vTran.detailTran[vTran.IU].total;
            vTran.totalAll += vTran.total;
            vTran.diskon -= vTran.detailTran[vTran.IU].dis;
            vTran.diskon += vTran.dis; 
            vTran.paj -= vTran.detailTran[vTran.IU].pajak;
            vTran.paj += vTran.pajak; 

            vTran.harga = ""; 
            vTran.vqty = ""; 
            vTran.dis = ""; 
            vTran.pajak = ""; 
            vTran.total = ""; 
            vTran.keterangan = ""; 
            vTran.kodePa = "-1"; 
            vTran.TU = true;

            vTran.detailTran[vTran.IU] = data;
        },
        selesai: () => {
            var le = vTran.detailTran.length;
            data = {
                id_outlet : vTran.kodeO,
                id_member : vTran.kodeM,
                id_user : vTran.kodeP,
                kode_invoice : vTran.kdinvoice,
                biaya_tambahan : vTran.totalAll,
                pajak : vTran.paj,
                diskon : vTran.diskon,
                batas_waktu : vTran.batas_waktu,
                status : "baru",
                dibayar : "belum_dibayar",
                detail : vTran.detailTran
            };
            console.log(data)
            // alert($("#bataswaktu").val())
            axios({
                method : "post",
                url : "http://localhost:8000/api/transaksi",
                data : data
                
            })
            .then(function(response){
                var res = response.data;
                console.log(res)

                // if(res.validate){
                    if(res.status){
                        // swal('Sukses !', 'Data berhasil disimpan', 'success')
                        
                        vTran.print = true;
                        vTran.vqty= "";
                        vTran.btn= true;
                        vTran.modal = true;
                        vTran.kodeO = "-1";
                        vTran.kodeP = "0";
                        vTran.kodeM = "0";
                        vTran.kodePa = "-1";
                        vTran.harga = 0;
                        vTran.dis = 0;
                        vTran.pajak = 0;
                        vTran.total = "";
                        vTran.keterangan = "";
                        vTran.detailTran = [];
                        vTran.TU= true;
                        vTran.IU= null;
                        vTran.totalAll = 0;
                        vTran.diskon= 0;
                        vTran.paj = 0;
                        vTran.batas_waktu = "";


                        var ran = "";
                
                        var date = new Date();
        
                        vTran.kdinvoice = ran.concat("CNC-",date.getDate(),date.getHours(),vTran.Random(15,"c"))

                        vTran.transaksi = res.list;

                        Swal.fire({
                            title: 'Berhasil !',
                            text: "Transaksi telah di tambahkan",
                            type: 'success',
                            showCancelButton: false,
                            cancel: false,
                            close: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            // cancelButtonText: 'Kembali',
                            confirmButtonText: 'Lanjutkan !'
                          }).then((result) => {

                            $("#KIP").val(res.print.kode_invoice)
                            $("#OP").val(res.print.nama_outlet.concat(", ",res.print.alamat_outlet,"."))
                            $("#HP").val(res.print.biaya_tambahan)
                            $("#TP").val(res.print.tlp)
                            $("#BP").val(res.print.batas_waktu)
                            $("#PP").val(res.PP.nama.concat(", ", res.PP.alamat))

                            $("#navbar").hide();
                            $("#appTran").hide();
                            $("#printPage").show();
                            setTimeout(function(){
                                window.print()
                                $("#navbar").show();
                                $("#appTran").show();
                                $("#printPage").hide();
                                
                                $('.datepicker').datepicker({});
                            },3000)
                        })

                    }else{
                        swal('Gagal !', 'Gagal menambah transaksi', 'error')
                        
                    }                       
                // }
            })
        },
        detail: (a) => {
            vTran.kodePa = vTran.detailTran[a].id_paket; 
            vTran.harga = vTran.detailTran[a].harga; 
            vTran.vqty = vTran.detailTran[a].qty; 
            vTran.dis = vTran.detailTran[a].dis; 
            vTran.pajak = vTran.detailTran[a].pajak; 
            vTran.total = vTran.detailTran[a].total; 
            vTran.keterangan = vTran.detailTran[a].keterangan; 
            vTran.IU = a;
            vTran.TU = false;
        },
        opsi: (a, b) => {
            // alert("oke")
            $(".modal1").show();
            $(".modal2").hide();
        },
        searchingTran: (a) => {
            axios.post('http://localhost:8000/api/searchTran/',{param: a})
            .then( function(response){
                var res = response.data;
                vTran.transaksi = res.list;
            })
        },
        kodetran: (a) => {
            vTran.Kodetran = a;
        },
        ubahStatus: (a) => {
            var status = a;

            axios.post('http://localhost:8000/api/ubahStatus/',{status: status, id : vTran.Kodetran})
            .then(function(response){
                var res = response.data;

                if(res.status){
                    swal('Berhasil !', 'Status berhasil diubah', 'success')
                    $("#modalBaru").modal('hide');
                    $("#modalProses").modal('hide');
                    vTran.transaksi = res.list;
                }else{
                    swal('Gagal !', 'Status gagal diubah', 'error')
                }
            })
        },

        simpanTran: () => {
            $("#modal1").hide();
            $("#modal2").fadeIn("slow");
        },
        btnModal: (a) => {
            if(a == "0"){
                vTran.modal = false;
            }
        }
    }
})

$(document).on("change",".bataswaktu", function(){
    vTran.batas_waktu = $(this).val();
})



var vPem = new Vue({
    el : "#appPem",
    data : {
        kode : "",
        id : "",
        kode_invoice : "",
        outlet : "",
        total : "",
        bayar : "",
        kembalian : "",
        nama : "",
        kode_invoicep : "",
        outletp : "",
        totalp : "",
        bayarp : "",
        kembalianp : "",
        namap : "",
        code : 0,
        print: false
    },
    mounted: function(){
        // this.getAll()
    },
    methods: {
        searchingKode: (a)=> {
            axios.post('http://localhost:8000/api/searchingKode',{param : a})
            .then(function(response){
                var res = response.data;
                
                if(res.status){
                    if(res.list[0].dibayar == "dibayar"){
                        vPem.code = 2;
                    }else if(res.list[0].dibayar == "belum_dibayar"){
                        console.log(res)
                        vPem.id = res.list[0].id;
                        vPem.kode_invoice = res.list[0].kode_invoice;
                        vPem.outlet = res.list[0].nama_outlet.concat(", ", res.list[0].alamat_outlet);
                        vPem.nama = res.list[0].nama;
                        vPem.total = res.list[0].biaya_tambahan;
                        $("#modalPem").modal("show");
                        vPem.code = 0;
                    }
                }else if(a == ""){
                    vPem.code = 0;
                }else{
                    vPem.code = 1;
                }
            })
        },
        tunai: () => {
            // alert(vPem.total)
            var k = vPem.bayar - vPem.total;

            if(k < 0){
                vPem.kembalian = "";
            }else{
                vPem.kembalian = parseInt(k);
            }
        },
        selesai: ()=> {
            axios({
                method : 'post',
                url : 'http://localhost:8000/api/bayar',
                data : {
                    id : vPem.id,
                    dibayar : 'dibayar',
                    bayar : vPem.bayar,
                    kembalian : vPem.kembalian,
                    outlet : vPem.outlet,
                    nama : vPem.nama,
                    kode_invoice : vPem.kode_invoice,
                    total : vPem.total,
                }
            })
            .then(function(response){
                var res = response.data;

                if(res.validate){
                    if(res.status){
                        vPem.print = true;
                        vPem.kode = "";
                        vPem.id = "";
                        vPem.kode_invoice = "";
                        vPem.outlet = "";
                        vPem.total = "";
                        vPem.nama = "";
                        vPem.bayar = "";
                        vPem.kembalian = "";
                        vPem.kode_invoicep = res.kode_invoice;
                        vPem.outletp = res.outlet;
                        vPem.totalp = res.total;
                        vPem.bayarp = res.bayar;
                        vPem.kembalianp = res.kembalian;
                        vPem.namap = res.nama;
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
                            $("#content-im").hide();
                            $("#printPage").show();

                            setTimeout(function(){
                                window.print()
                                $("#navbar").show();
                                $("#content-im").show();
                                $("#printPage").hide();
                            },1000);
                            // alert("oke")
                            
                            vPem.code = 0;
                        })
                    }
                }
            })
        }
    }
})

var vLap = new Vue({
    el : "#appLapH",
    data : {
        kode : 0,
        role : [],
        outlet : [],
        kodeR : 0,
        kodeO : 0,
        list : [],
        kodel : false
    },
    mounted: function () {
        this.prepare();
    },
    methods : {
        prepare: () => {
            axios({
                method : "get",
                url : "http://localhost:8000/api/laporan"
            })
            .then(function(response){
                var res = response.data;

                vLap.role = res.role;
                vLap.outlet = res.outlet;
            })
        }, 
        kodelfalse: () => {
            vLap.kodel = false;
        },
        liat: () => {
            // alert("oke")
            var table = "";
            if(vLap.kode == 1){
                table = "outlet";

                axios({
                    method : "post",
                    url : "http://localhost:8000/api/laporan",
                    data : {
                        table : table
                    }
                })
                .then(function(response){
                    var res = response.data;
                    console.log(res)
                    vLap.list = res.list;
                    vLap.kodel = true;
                })
            }else if(vLap.kode == 2){
                table = "paket";
                if(vLap.kodeO == 0){
                    axios({
                        method : "post",
                        url : "http://localhost:8000/api/laporan",
                        data : {
                            table : table,
                            outlet : "semua"
                        }
                    })
                    .then(function(response){
                        var res = response.data;
                        console.log(res)
                        vLap.list = res.list;
                        vLap.kodel = true;
                    })
                }else {
                    axios({
                        method : "post",
                        url : "http://localhost:8000/api/laporan",
                        data : {
                            table : table,
                            outlet : vLap.kodeO
                        }
                    })
                    .then(function(response){
                        var res = response.data;
                        console.log(res)
                        vLap.list = res.list;
                        vLap.kodel = true;
                    })
                }
            }else if(vLap.kode == 3){
                table = "tb_view_user";

               if(vLap.kodeR == 0 && vLap.kodeO == 0){
                axios({
                    method : "post",
                    url : "http://localhost:8000/api/laporan",
                    data : {
                        table : table,
                        role : "semua",
                        outlet : "semua"
                    }
                })
                .then(function(response){
                    var res = response.data;
                    console.log(res)
                    vLap.list = res.list;
                    vLap.kodel = true;
                })
               }
               if(vLap.kodeR == 0 && vLap.kodeO != 0){
                axios({
                    method : "post",
                    url : "http://localhost:8000/api/laporan",
                    data : {
                        table : table,
                        role : "semua",
                        outlet : vLap.kodeO
                    }
                })
                .then(function(response){
                    var res = response.data;
                    console.log(res)
                    vLap.list = res.list;
                    vLap.kodel = true;
                })
               }
               if(vLap.kodeR != 0 && vLap.kodeO == 0){
                axios({
                    method : "post",
                    url : "http://localhost:8000/api/laporan",
                    data : {
                        table : table,
                        role : vLap.kodeR,
                        outlet : "semua"
                    }
                })
                .then(function(response){
                    var res = response.data;
                    console.log(res)
                    vLap.list = res.list;
                    vLap.kodel = true;
                })
               }
               if(vLap.kodeR != 0 && vLap.kodeO != 0){
                axios({
                    method : "post",
                    url : "http://localhost:8000/api/laporan",
                    data : {
                        table : table,
                        role : vLap.kodeR,
                        outlet : vLap.kodeO
                    }
                })
                .then(function(response){
                    var res = response.data;
                    console.log(res)
                    vLap.list = res.list;
                    vLap.kodel = true;
                })
               }
                
            }else if(vLap.kode == 4){
                table = "tb_view_transaksi";

                var tgl = $(".tgl");
                var bts = $(".bts");
                var byr = $(".byr");

                var tanggal = "";
                var batas = "";
                var bayar = "";
                var outlet = "";

                if(vLap.kodeO == 0 && tgl.val() == "" && bts.val() == "" && byr.val() == ""){
                    outlet = "semua";
                    tanggal = "semua";
                    batas = "semua";
                    bayar = "semua";
                }
                else if(vLap.kodeO == 0 && tgl.val() != "" && bts.val() == "" && byr.val() == ""){
                    outlet = "semua";
                    tanggal = tgl.val();
                    batas = "semua";
                    bayar = "semua";
                }
                else if(vLap.kodeO == 0 && tgl.val() == "" && bts.val() != "" && byr.val() == ""){
                    outlet = "semua";
                    tanggal = "semua";
                    batas = bts.val();
                    bayar = "semua";
                }
                else if(vLap.kodeO == 0 && tgl.val() == "" && bts.val() == "" && byr.val() != ""){
                    outlet = "semua";
                    tanggal = "semua";
                    batas = "semua";
                    bayar = byr.val();
                }
                else if(vLap.kodeO != 0 && tgl.val() == "" && bts.val() == "" && byr.val() == ""){
                    outlet = vLap.kodeO;
                    tanggal = "semua";
                    batas = "semua";
                    bayar = "semua";
                }
                else if(vLap.kodeO != 0 && tgl.val() != "" && bts.val() == "" && byr.val() == ""){
                    outlet = vLap.kodeO;
                    tanggal = tgl.val();
                    batas = "semua";
                    bayar = "semua";
                }
                else if(vLap.kodeO != 0 && tgl.val() == "" && bts.val() != "" && byr.val() == ""){
                    outlet = vLap.kodeO;
                    tanggal = "semua";
                    batas = bts.val();
                    bayar = "semua";
                }
                else if(vLap.kodeO != 0 && tgl.val() == "" && bts.val() == "" && byr.val() != ""){
                    outlet = vLap.kodeO;
                    tanggal = "semua";
                    batas = "semua";
                    bayar = byr.val();
                }
                else if(vLap.kodeO == 0 && tgl.val() != "" && bts.val() != "" && byr.val() == ""){
                    outlet = "semua";
                    tanggal = tgl.val();
                    batas = bts.val();
                    bayar = "semua";
                }
                else if(vLap.kodeO == 0 && tgl.val() != "" && bts.val() == "" && byr.val() != ""){
                    outlet = "semua";
                    tanggal = tgl.val();
                    batas = "semua";
                    bayar = byr.val();
                }
                else if(vLap.kodeO == 0 && tgl.val() == "" && bts.val() != "" && byr.val() != ""){
                    outlet = "semua";
                    tanggal = "semua";
                    batas = bts.val();
                    bayar = byr.val();
                }
                else if(vLap.kodeO == 0 && tgl.val() != "" && bts.val() != "" && byr.val() != ""){
                    outlet = "semua";
                    tanggal = tgl.val();
                    batas = bts.val();
                    bayar = byr.val();
                }
                else if(vLap.kodeO != 0 && tgl.val() == "" && bts.val() != "" && byr.val() != ""){
                    outlet = vLap.kodeO;
                    tanggal = "semua";
                    batas = bts.val();
                    bayar = byr.val();
                }
                else if(vLap.kodeO != 0 && tgl.val() != "" && bts.val() == "" && byr.val() != ""){
                    outlet = vLap.kodeO;
                    tanggal = tgl.val();
                    batas = "semua";
                    bayar = byr.val();
                }
                else if(vLap.kodeO != 0 && tgl.val() != "" && bts.val() != "" && byr.val() == ""){
                    outlet = vLap.kodeO;
                    tanggal = tgl.val();
                    batas = bts.val();
                    bayar = "semua";
                }
                else if(vLap.kodeO != 0 && tgl.val() != "" && bts.val() != "" && byr.val() != ""){
                    outlet = vLap.kodeO;
                    tanggal = tgl.val();
                    batas = bts.val();
                    bayar = byr.val();
                }

                axios({
                    method : "post",
                    url : "http://localhost:8000/api/laporan",
                    data : {
                        table : table,
                        outlet : outlet,
                        tanggal : tanggal,
                        batas : batas,
                        bayar : bayar
                    }
                })
                .then(function(response){
                    var res = response.data;
                    console.log(res)
                    vLap.list = res.list;
                    vLap.kodel = true;
                })
            }
        },
        printed: () => {
            vLap.liat();
            setTimeout(function(){
                $("#navbar").hide();
                $("#content-im").hide();
                $("#printPage").show();
    
                window.print()
    
                $("#navbar").show();
                $("#content-im").show();
                $("#printPage").hide();
            },1000);
            // vLap.kodel = false;
        }
    }
})

var vHis = new Vue({
    el : "#appHis",
    data : {
        list: [],
        searchHis : ""
    },
    mounted: function(){
        this.getData();
    },
    methods: {
        getData: () => {
            axios({
                method : "post",
                url : "http://localhost:8000/api/idhis",
                data : {
                    param : $("#iduser").val()
                }
            })
            .then(function(response){
                var res = response.data;
                console.log(res)
                vHis.list = res.list;
            })
        },
        searchingHis: (a) => {
            axios({
                method : "post",
                url : "http://localhost:8000/api/history",
                data : {
                    param : a
                }
            })
        }
    }
})

// closeLoad()

openLoad();

function openLoad(){
    // alert('loading');
    // $("#loadPage").css('display','block');

    // $("#allPage").css('opacity','0.05');
   
    setTimeout(function(){  $("#loadPage").css('display','none');

    $("#allPage").css('opacity','1'); }, 1000);
}

// function closeLoad(){
//     $("#loadPage").css('display','none');

//     $("#allPage").css('opacity','1');
// }