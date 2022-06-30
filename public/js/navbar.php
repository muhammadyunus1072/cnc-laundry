<?php
    session_start();
    if($_SESSION['role'] == 'admin'){
        ?>
        <div class="container-fluid">

                <div class="alert alert-primary" role="alert">
                    <nav class="navbar navbar-expand-sm navbar-light bg-light">
                        <a class="navbar-brand m-0" href="#">  
                            <img src="{{asset('img/logo.png')}}" class="img-fluid " style="width:270px;height:70px;border-radius:20px;"alt="">
                            <!-- <span class="text-primary h3 font-weight-bold" style="font-family:yellowtail;">ClickNClean</span> -->
                            <!-- <span class="text-danger h3 font-weight-bold">Click</span>
                            <span class="text-primary h3 font-weight-bold">N</span>
                            <span class="text-success h3 font-weight-bold">Clean</span> -->
                        </a>
                        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="collapsibleNavId">
                            
                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <!-- <li class="nav-item active">
                                    <a class="nav-link" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li> -->
                                
                            </ul>
                            
                            <form class="form-inline my-2 my-lg-0">
                                <!-- <input class="form-control mr-sm-2" type="text" placeholder="Search"> -->
                                <ul class="navbar-nav mr-5 mt-2 mt-lg-0">
                                    <li class="nav-item mr-3 ">
                                        <a href="registrasi">
                                            <button type="button" class="button btn btn-primary font-weight-bold">Registrasi</button>
                                        </a>
                                    </li>   
                                    <li class="nav-item mr-3 ">
                                        <a href="outlet">
                                            <button type="button" class="button btn btn-primary font-weight-bold">Outlet</button>
                                        </a>
                                    </li>   
                                    <li class="nav-item mr-3 ">
                                        <a href="produk">
                                            <button type="button" class="button btn btn-primary font-weight-bold">Produk</button>
                                        </a>
                                    </li>   
                                    <li class="nav-item mr-3 ">
                                        <a href="pengguna">
                                            <button type="button" class="button btn btn-primary font-weight-bold">Pengguna</button>
                                        </a>
                                    </li>     
                                    <li class="nav-item mr-3 ">
                                        <a href="transaksi">
                                            <button type="button" class="button btn btn-primary font-weight-bold">Transaksi</button>
                                        </a>
                                    </li>   
                                    <li class="nav-item mr-3 ">
                                        <a href="laporan">
                                            <button type="button" class="button btn btn-primary font-weight-bold">Laporan</button>
                                        </a>
                                    </li>   
                                     
                                </ul>
                                <a href="logout">
                                     <button class="btn btn-outline-danger my-2 my-sm-0 font-weight-bold h2" type="button">Logout</button>
                                </a>
                            </form>
                        </div>
                    </nav>
                </div>

                
            </div>
            <?php
    }
    else if($_SESSION['role'] == 'kasir'){
        ?>
        <div class="container-fluid">

                <div class="alert alert-primary" role="alert">
                    <nav class="navbar navbar-expand-sm navbar-light bg-light">
                        <a class="navbar-brand m-0" href="#">  
                            <img src="{{asset('img/logo.png')}}" class="img-fluid " style="width:270px;height:70px;border-radius:20px;"alt="">
                            <!-- <span class="text-primary h3 font-weight-bold" style="font-family:yellowtail;">ClickNClean</span> -->
                            <!-- <span class="text-danger h3 font-weight-bold">Click</span>
                            <span class="text-primary h3 font-weight-bold">N</span>
                            <span class="text-success h3 font-weight-bold">Clean</span> -->
                        </a>
                        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="collapsibleNavId">
                            
                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <!-- <li class="nav-item active">
                                    <a class="nav-link" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li> -->
                                
                            </ul>
                            
                            <form class="form-inline my-2 my-lg-0">
                                <!-- <input class="form-control mr-sm-2" type="text" placeholder="Search"> -->
                                <ul class="navbar-nav mr-5 mt-2 mt-lg-0">
                                    <li class="nav-item mr-3 ">
                                        <a href="registrasi">
                                            <button type="button" class="button btn btn-primary font-weight-bold">Registrasi</button>
                                        </a>
                                    </li>   
                                   
                                    <li class="nav-item mr-3 ">
                                        <a href="transaksi">
                                            <button type="button" class="button btn btn-primary font-weight-bold">Transaksi</button>
                                        </a>
                                    </li>   
                                    <li class="nav-item mr-3 ">
                                        <a href="laporan">
                                            <button type="button" class="button btn btn-primary font-weight-bold">Laporan</button>
                                        </a>
                                    </li>   
                                     
                                </ul>
                                <a href="logout">
                                     <button class="btn btn-outline-danger my-2 my-sm-0 font-weight-bold h2" type="button">Logout</button>
                                </a>
                            </form>
                        </div>
                    </nav>
                </div>

                
            </div>
            <?php
    }
    else if($_SESSION['role'] == 'owner'){
        ?>
        <div class="container-fluid">

<div class="alert alert-primary" role="alert">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand m-0" href="#">  
            <img src="{{asset('img/logo.png')}}" class="img-fluid " style="width:270px;height:70px;border-radius:20px;"alt="">
            <!-- <span class="text-primary h3 font-weight-bold" style="font-family:yellowtail;">ClickNClean</span> -->
            <!-- <span class="text-danger h3 font-weight-bold">Click</span>
            <span class="text-primary h3 font-weight-bold">N</span>
            <span class="text-success h3 font-weight-bold">Clean</span> -->
        </a>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <!-- <li class="nav-item active">
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li> -->
                
            </ul>
            
            <form class="form-inline my-2 my-lg-0">
                <!-- <input class="form-control mr-sm-2" type="text" placeholder="Search"> -->
                <ul class="navbar-nav mr-5 mt-2 mt-lg-0">
                    
                    <li class="nav-item mr-3 ">
                        <a href="laporan">
                            <button type="button" class="button btn btn-primary font-weight-bold">Laporan</button>
                        </a>
                    </li>   
                     
                </ul>
                <a href="logout">
                     <button class="btn btn-outline-danger my-2 my-sm-0 font-weight-bold h2" type="button">Logout</button>
                </a>
            </form>
        </div>
    </nav>
</div>


</div>
<?php

    }
?>