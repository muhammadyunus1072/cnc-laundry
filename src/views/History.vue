<template>
    <Navbar>
        
    </Navbar>

      <div id="appHis">
        <input type="hidden" name="iduser" id="iduser" value="<?= $id; ?>">
        <div class="top">
            <div id="dialPlanListTable_filter" class="dataTables_filter">
                <label>
                    <input type="search" @keyup="searchingHis(searchHis)" v-model="searchHis" class="form-control input-sm" style="position:absolute; width:30%; margin-left:60%; z-index:5;" placeholder="Search" aria-controls="dialPlanListTable">
                </label>
            </div>
        </div>
        <!-- <h1>@{{ searchOut }}</h1> -->
        <table class="table table-hover mt-5 table-sm table-responsive" id="tableHis">
            <thead>
                <tr>
                <th>#</th>
                <th width="250">Kode Invoice</th>
                <th>Tanggal</th>
                <th width="250">Nama Outlet</th>
                <th>Telp Outlet</th>
                <th>Kode Petugas</th>
                <th>Quantity</th>
                <th width="100">Total</th>
                <th>Keterangan</th>
                <!-- <th>Username</th> -->
                <th>Status</th>
                <th>Dibayar</th>
                </tr>
            </thead>
            <tbody v-for=" (data, index) in list">
                <tr>
                <td> @{{ index+1 }}</td>
                <td> @{{ data.kode_invoice }}</td>
                <td> @{{ data.tgl }}</td>
                <td> @{{ data.nama_outlet }}, @{{ data.alamat_outlet }}</td>
                <td> @{{ data.tlp_outlet }}</td>
                <td> @{{ data.id_user }}</td>
                <td> @{{ data.qty }}</td>
                <td> Rp. @{{ data.biaya_tambahan }}</td>
                <td> @{{ data.keterangan }}</td>
                <td> 
                    <button v-if="data.status === 'baru'" class="btn btn-warning font-weight-bold btnBaru" :idT="data.id">@{{ data.status }}</button>
                    <button v-if="data.status === 'proses'" class="btn btn-info font-weight-bold btnProses" :idT="data.id">@{{ data.status }}</button>
                    <button v-if="data.status === 'selesai'" class="btn btn-success font-weight-bold btnSelesai" :idT="data.id">@{{ data.status }}</button>
                    <button v-if="data.status === 'diambil'" class="btn btn-primary font-weight-bold" disabled :idT="data.id">@{{ data.status }}</button>
                </td>
                <td> 
                    <button v-if="data.dibayar === 'belum_dibayar'" class="btn btn-danger font-weight-bold btnBelum" :idT="data.id">Belum</button>
                    <button v-if="data.dibayar === 'dibayar'" class="btn btn-success font-weight-bold" :idT="data.id">Dibayar</button>
                    </td>
                </tr>         
            </tbody>
        </table>
    </div>

</template>

<script>
    import Navbar from '../Components/Navbar.vue'

    export default{
        components: {
            Navbar,
        }
    }
</script>