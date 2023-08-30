<template>
  <NavComponent :items="headerItems"/>
    <router-view></router-view>
    <FooterComponent :items="footerItems" :socials="socialMediaItems"/>
</template>

<script>

import NavComponent from './components/NavComponent.vue'
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components:{
    NavComponent,
    FooterComponent,
  },
  data: () => ({
    headerItems: [
        { title: 'Home', icon:'home', to:"/"},
        { title: 'Food Options', icon:'silverware', to:"/food"},
        { title: 'Cart', icon:"cart", to:"/cart"},
        { title: 'Login', icon: "login", to: "/login" },
        { title: 'Register', icon: "account-plus", to:"/register" },
        { title: 'Contact', icon:"headset", to:"/contact"}
      ],
    footerItems:[
        { title: 'Home', icon:'home', to:"/"},
        { title: 'Food Options', icon:'silverware', to:"/food"},
        { title: 'Cart', icon:"cart", to:"/cart"},
        { title: 'Register', icon:"account-plus", to:"/register"},
        { title:'Login', icon:'login', to:"/login" },
        { title: 'Contact', icon:"headset", to:"/contact"}
    ],
    socialMediaItems:[
      {title: 'Instagram', icon:'mdi-instagram'},
      {title: 'Facebook', icon:'mdi-facebook'},
      {title: 'Twitter', icon:'mdi-twitter'},
      {title: 'Youtube', icon:'mdi-youtube'},
      {title: 'Reddit', icon:'mdi-reddit'},
    ]
  }),
  mounted(){
    this.$store.dispatch('getUserFromLS');
    this.$router.push("/")
    if(this.$store.state.currentUser&&this.$store.state.currentUser.role=="admin"){
      this.$router.push("/admin");
    }
  },
}
</script>

<style>
#cont{
  background-image: url('./assets/bg.jpg');
  background-size: cover;
}
</style>