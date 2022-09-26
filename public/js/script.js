
$(document).ready(function(){
    var nama = $('#nama');
    var username = $('#username');
    var alamat = $('#alamat');
    var jenis_kelamin = $('#jenis_kelamin');
    var tlp = $('#tlp');
    var jenkel = "";
    $(".datepickert").datepicker({
        // appendText : 'yyyy-mm-dd'
        dateFormat: "yy-mm-dd",
        showOptions: { direction: "up" }
    })
    $("#tablePen").DataTable();
    onprint = function(){
        $("#navbar").show();
        $("#appCon").show();
        $("#content-im").show();
        $("#printPage").hide();

        // $("#navbar").show();
        $("#appTran").show();
        $("#printPage").hide();
        document.title = "CNC Laundry"
        // self.qrClear();
        // $('.datepicker').datepicker({});
    }
    
    $(document).on('click', '#btnSaveUser', function(){
        if($("#jenis_kelamin").val() == 'Laki - Laki'){
            jenkel = "L";
        }else if($("#jenis_kelamin").val() == "Perempuan"){
            jenkel = "P";
        }
        var Coba ={ nama : nama.val(),
        // username : username.val(),
        alamat : alamat.val(),
        jenis_kelamin : jenkel,
        tlp : tlp.val(),
        id_outlet : "0",
        id_role : "4"};
        console.log(Coba)
        axios({
            method: 'post',
            url: 'api/user',
            data: {
                nama : nama.val(),
                // username : username.val(),
                alamat : alamat.val(),
                jenis_kelamin : jenkel,
                tlp : tlp.val(),
                id_outlet : "1",
                id_role : "4",
            }
        })
        .then(function (response){
            var res = response.data;
            console.log(res)
            if(res.validate == false){
                swal('Failed',res.errors[0],'error')
            }else if(res.validate == true){
                
                // printed();
                // window.print()
                // clearPrint();
                // console.log("success")
                vPrint.list = res.list;
                console.log(res.list)
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
                        $("#appReg").hide();
                        $("#appPrint").show();

                        setTimeout(function(){

                            window.print()

                            $("#navbar").show();
                            $("#appReg").show();
                            $("#appPrint").hide();
                        },1000)
                    // alert("oke")
                })
            }
           
        })
    })

   
        // else if(a == "false"){
        //     // alert(a)
        //     $("#navbar").show();
        //     $("#appPengguna").show();
        //     $("#appPrint").hide();
    
        //     // h = 0;
        // }
        // $("#appPrint").css("scroll-y","hide");
        // window.print()
    
   
    function printed(){
        $('#namaP').val(nama.val())
        $('#alamatP').val(alamat.val())
        $('#jenis_kelaminP').val(jenis_kelamin.val())
        $('#tlpP').val(tlp.val())
        $('#usernameP').text(username.val())
        $('#passwordP').text($res.password)
        $('#printedPage').css('display','block');
        $('#displayPage').css('display','none');
        $('#navbar').css('display','none');
        $('body').css('overflow-y','hidden')
    }

    $("#simpanOut").on("click",function(){
        axios({
            method: 'post',
            url: 'api/outlet',
            data: {
                nama : nama.val(),                
                alamat : alamat.val(),
                tlp : tlp.val(),
            }
        })
        .then(function (response){
            $res = response.data;
            console.log($res);
        })
    })

    $(document).on("click", ".btnUbahOut", function(){
        // alert($(this).attr("nama"));
        $("#nama").val( $(this).attr("nama") );
        $("#alamat").val( $(this).attr("alamat") );
        $("#tlp").val( $(this).attr("tlp") );
    })

    $(document).on("click", ".btnHapusOut", function(){
        var id = $(this).attr("idOut");
        
    })
    $(document).on("click", ".btnUbahPak", function(){
        // $("[kode]").removeAttr("selected")
        // alert("paket nih")
        // $("[kode]").removeAttr("selected");
        // $("[kode=default]").removeAttr("selected");
        // var kode = $(this).attr('idoutlet');
        // alert(kode);
        // $("#idOutlet").val($(this).attr("kdoutlet"));
        // $("[kode="+kode+"]").attr("selected")
        var jenis = $(this).attr('jenis');
        // $("[kdjenis]").removeAttr("selected")
        // $("[kdjenis="+jenis+"]").attr("selected","selected")
        // $("#idoutlet").val(kode);
        // alert(kode)
        $("#jenis").val(jenis);
        $("#nama_paket").val( $(this).attr("nama_paket") );
        $("#harga").val( $(this).attr("harga") );
    })
    $(document).on("click", "#tambahPaket", function(){
        $("[kode]").removeAttr("selected")
        $("[kode='1']").attr("selected","selected")
        $("[kdjenis]").removeAttr("selected")
        $("[kdjenis='kiloan']").attr("selected","selected")
        $("#nama_paket").val("");
        $("#harga").val("");
    })

    $("#btnModalTambah").on("click", function(){
        nama.val( "" );
        alamat.val( "" );
        tlp.val( "" );
    })
    $("#tambahPengguna").on("click", function(){
        nama.val( "" );
        alamat.val( "" );
        tlp.val( "" );
        $("#jenis_kelamin").val("Jenis Kelamin");
        $("#role").val("Role");
        $("[kode]").removeAttr("selected");
        $("[kode=default]").attr("selected","selected");
    })


    $(document).on("click", ".btnUbahPen", function(){
        $("#name").val($(this).attr("name"));
        $("#email").val($(this).attr("email"));
        $("#role_id").val($(this).attr("role_id"));
    })
})