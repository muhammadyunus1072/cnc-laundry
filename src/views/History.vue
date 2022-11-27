<template>
    <Navbar>
        
    </Navbar>

      <div id="appHis">
        <input type="hidden" name="iduser" id="iduser" value="<?= $id; ?>">
        <div class="top">
            <div id="dialPlanListTable_filter" class="dataTables_filter">
                <label>
                    <input type="search" v-on:keyup="searchingHis(searchHis)" v-model="searchHis" class="form-control input-sm" style="position:absolute; width:30%; margin-left:60%; z-index:5;" placeholder="Search" aria-controls="dialPlanListTable">
                </label>
            </div>
        </div>
        <!-- <h1>{{ searchOut }}</h1> -->
        <div class="table-responsive">

            <table class="table table-hover mt-5 table-sm" id="tableHis">
                <thead>
                    <tr>
                    <th>#</th>
                    <th width="200">Kode Invoice</th>
                    <th>Tanggal</th>
                    <th width="200">Nama Outlet</th>
                    <th>Total</th>
                    <th>Kembalian</th>
                    <th>Status Order</th>
                    <th>Status Bayar</th>
                    </tr>
                </thead>
                <tbody v-for=" (data, index) in list">
                    <tr>
                    <td>{{ index }}</td>
                    <td>{{ data.kode_invoice }}</td>
                    <td>{{ data.tgl }}</td>
                    <td>{{ data.outlet.nama }},{{ data.outlet.alamat }}</td>
                    <td> Rp.{{ data.total }}</td>
                    <td> Rp.{{ data.kembalian }}</td>
                    <td> 
                        <button v-if="data.status_order.status === 'baru'" class="btn btn-danger font-weight-bold btnBaru" :idT="data.id">{{ data.status_order.status }}</button>
                        <button v-if="data.status_order.status === 'proses'" class="btn btn-warning font-weight-bold btnProses" :idT="data.id">{{ data.status_order.status }}</button>
                        <button v-if="data.status_order.status === 'selesai'" class="btn btn-success font-weight-bold btnSelesai" :idT="data.id">{{ data.status_order.status }}</button>
                        <button v-if="data.status_order.status === 'diambil'" class="btn btn-primary font-weight-bold" disabled :idT="data.id">{{ data.status_order.status }}</button>
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

</template>

<script>
import Navbar from '../Components/Navbar.vue'

    export default{
        components: {
            Navbar,
        },
        data: function(){
            return{
                list : [],
                searchHis : ''
            }
        },
        methods: {
            getAll: function(){
                var self = this;
                let user =JSON.parse(localStorage.getItem('user'));
                let idUser = user.id
                axios({
                    method: 'get',
                    url: 'https://apilaundry.arashiyunus.com/api/auth/history/'+idUser+'',
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                .then(function(res){
                    self.list = res.data.list
                })
            },
            searchingHis: function(a){
                var self =this;
                let user =JSON.parse(localStorage.getItem('user'));
                let idUser = user.id
                axios({
                    method : 'post',
                    url : 'https://apilaundry.arashiyunus.com/api/auth/searchHistory',
                    data: {
                        param : a,
                        idUser : idUser
                    },
                    headers : {
                        'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                .then(function(res){
                    self.list = res.data.list;
                })
            }
        },
        mounted(){
            this.getAll();
        },
    }
</script>