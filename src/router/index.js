import { createRouter, createWebHistory } from 'vue-router';
    

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import("../views/Index.vue"),
        meta: {
            isLoginReg: true,
            // isAdmin: true,
            // isKasir: true
          }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("../views/Register.vue"),
        meta: {
            isLoginReg: true,
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import("../views/User.vue"),
        meta: {
            requiresAuth: true,
            isAdmin: true,
            isKasir: true
          }
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import("../views/Logout.vue")
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import("../views/Dashboard.vue"),
        meta: {
            requiresAuth: true
          }
        
    },
    {
        path: '/outlet',
        name: 'outlet',
        component: () => import("../views/Outlet.vue"),
        meta: {
            requiresAuth: true,
            isAdmin: true
          }
    },
    {
        path: '/paket',
        name: 'paket',
        component: () => import("../views/Paket.vue"),
        meta: {
            requiresAuth: true,
            isAdmin: true
          }
    },
    {
        path: '/pengguna',
        name: 'pengguna',
        component: () => import("../views/Pengguna.vue"),
        meta: {
            requiresAuth: true,
            isAdmin: true,
            isKasir: true
          }
    },
    {
        path: '/transaksi',
        name: 'transaksi',
        component: () => import("../views/Transaksi.vue"),
        meta: {
            requiresAuth: true,
            isKasir: true
          }
    },
    {
        path: '/laporan',
        name: 'laporan',
        component: () => import("../views/Laporan.vue"),
        meta: {
            requiresAuth: true,
            isAdmin: true,
            isKasir: true
          }
    },
    {
        path: '/history',
        name: 'history',
        component: () => import("../views/History.vue"),
        meta: {
            requiresAuth: true,
            isUser: true
          }
    },
    {
        path: '/payment',
        name: 'payment',
        component: () => import("../views/Payment.vue"),
        meta: {
            requiresAuth: true,
            isKasir: true
          }
    },
    {
        path: '/coba',
        name: 'coba',
        component: () => import("../views/Coba.vue"),
       
    },
];


const router = createRouter({
    history : createWebHistory(),
    routes
});

function verified(param){
    const access_token = localStorage.getItem('access_token')
    // if(param == 'LogReg'){
        axios.get('https://apilaundry.arashiyunus.com/api/auth/verify',{
        // 'https://cnclaundry.000webhostapp.com/api/auth/verify',{
            headers: {
                'Authorization': `Bearer ${access_token}` 
            }
        }
    )
    .then((res)=>{
        // return "data";
        if(param == 'LogReg'){
            if(res.data.message == 'verified'){
                // next()
                router.push({
                    name: 'dashboard'
                })
            }
        }
    })
    .catch((e)=>{
        // localStorage.access_token = res.data.access_token 
        if(e.response.status === 401){
          if(param == 'auth'){
            router.push({
                name: 'index'
            })
          }
            // return "apasih"
        }
    
    });

 

}
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('access_token') != null;
//   if (to.name === 'index' ){
//     next({ name: 'dashboard' })
//   }else 
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (!token) {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      }  else {
            let user = JSON.parse(localStorage.getItem('user'))
            verified('auth')
            let roles = user.role.role
            if (to.matched.some(record => record.meta.isUser)) {
                if (roles.includes('pelanggan')) next()
                else if (roles === 'kasir') {
                    next({
                    name: 'dashboard'
                    })
                } else if (roles === 'admin') {
                    next({
                    name: 'dashboard'
                    })
                } else next({
                    name: 'index'
                })
            } 
            else if (to.matched.some(record => record.meta.isKasir) && to.matched.some(record => record.meta.isAdmin)) {
                if (roles.includes('kasir')) next()
                else if (roles === 'admin') {
                    next()
                } else if (roles === 'pelanggan') {
                    next({
                    name: 'dashboard'
                    })
                } else next({
                    name: 'dashboard'
                })
    
            } 
            else if (to.matched.some(record => record.meta.isKasir)) {
                if (roles.includes('kasir')) next()
                else if (roles === 'admin') {
                    next({
                        name: 'dashboard'
                    })
                } else if (roles === 'pelanggan') {
                    next({
                    name: 'dashboard'
                    })
                } else next({
                    name: 'dashboard'
                })
    
            } 
            else if (to.matched.some(record => record.meta.isAdmin)) {
                if (roles.includes('admin')) next()
                else if (roles[0] === 'kasir') {
                    next({
                    name: 'dashboard'
                    })
                } else if (roles[0] === 'pelanggan') {
                    next({
                    name: 'dashboard'
                    })
                } else next({
                    name: 'index'
                })
        
            } else {
            next()
         }
      }
  }else if(to.matched.some(record => record.meta.isLoginReg)) {
     verified('LogReg')
     next()
  }else{
    next()
  }
  })
  


export default router;