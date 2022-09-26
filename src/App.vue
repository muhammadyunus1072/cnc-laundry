
<template>
  <router-view></router-view>
</template>

<script>
  export default{
    name: 'App',
    data(){
      return{
        user : null,
        isLoggedIn : false
      }
    },mounted(){
      var self = this;
      self.setUser();
    },
    methods: {
        setUser: function() {
          var self = this;
          if(localStorage.getItem('user') && localStorage.getItem('access_token')){
            self.user = JSON.parse(localStorage.getItem('user'))
            self.isLoggedIn = localStorage.getItem('access_token') != null
          }

        },
        logout: function() {
          var self =this;
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          self.setUser()

          this.$router.push('/')
        }
    }
    
  }
</script>