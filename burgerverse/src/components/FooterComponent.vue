<template>
    <div class="bg-black">
        <v-container class="d-flex justify-center align-center flex-wrap">
          <v-col lg="4" sm="8" cols="12">
            <router-link to="/">
              <v-img src="../assets/bg3.png"></v-img>
            </router-link>
          </v-col>
          <v-col lg="4" sm="8" cols="12">
            <div class="d-flex flex-column align-center justify-center">
              <router-link v-for="item, index in filteredItems" :key="index" :to="item.to" class="text-white">
                <v-btn variant="text">
                  {{ item.title }}
                </v-btn>
              </router-link>
              <router-link to="/admin" v-if="this.$store.state.currentUser&&this.$store.state.currentUser.role=='admin'" class="text-white">
                <v-btn variant="text">
                  Admin panel
                </v-btn>
              </router-link>
              <v-btn variant="text" v-if="this.$store.state.currentUser" @click="performLogout">
                Logout
              </v-btn>
            </div>
          </v-col>
          <v-col lg="4" sm="8" cols="12">
            <div class="d-flex flex-column align-center justify-center">
              <div>
                Follow us on social media
              </div>
              <div class="d-flex">
                <v-btn v-for="social,index in socials" :key="index"
                class="ma-2"
                color="red-darken-3"
                :icon="social.icon"
              ></v-btn>
              </div>
            </div>
          </v-col>
        </v-container>
        <v-divider></v-divider>
      </div>
      <div class="d-flex justify-center align-center bg-black">
        <p class="my-2">2023 &copy; <span class="font-weight-bold">Stefan Erić</span></p>
      </div>
</template>
<script>

export default{
    name:"FooterComponent",
    props:{
        items: Array,
        socials:Array
    },
    computed:{
      filteredItems(){
        if(this.$store.state.currentUser){
          return this.items.filter(item=>item.title!="Login" && item.title!="Register")
        }
        else{
          return this.items;
        }
      }
    },
    methods:{
      performLogout(){
        localStorage.removeItem('user');
        this.$store.commit('removeUser')
        this.$router.push("/")
      }
    }

}
</script>