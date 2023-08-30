<template>
    <v-toolbar class="bg-black"
    height="80"
    elevation="10">
    <v-container
    class="bg-black d-flex align-center justify-space-between"
    >
    <v-col cols="4">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="red"
            v-bind="props"
          >
            <p class="text-button ml-4">Menu <v-icon>mdi-menu</v-icon></p>
          </v-btn>
        </template>
        <v-list>
          <div
          v-for="(item, index) in items"
          :key="index"
          class="text-black text-decoration-none">
          <router-link :to="item.to" v-if="item.title!='Login'&&item.title!='Register'" class="text-black text-decoration-none">
            <v-list-item class="customDiv">
              <div class="d-flex align-center" title="">
                <v-list-item-title class="mr-2">{{ item.title }}</v-list-item-title>
                <v-icon color="red">mdi-{{item.icon}}</v-icon>
              </div>
            </v-list-item>
          </router-link>
          <router-link :to="item.to" v-else-if="!this.$store.state.currentUser" class="text-black text-decoration-none">
            <v-list-item class="customDiv d-flex d-md-none">
              <div class="d-flex align-center" title="">
                <v-list-item-title class="mr-2">{{ item.title }}</v-list-item-title>
                <v-icon color="red">mdi-{{item.icon}}</v-icon>
              </div>
            </v-list-item>
          </router-link>
        </div>
        <v-list-item
        v-if="this.$store.state.currentUser"
        @click="performLogout" 
        class="customDiv d-flex d-md-none">
          <div class="d-flex align-center" title="">
            <v-list-item-title class="mr-2">Log out</v-list-item-title>
            <v-icon color="red">mdi-logout</v-icon>
          </div>
        </v-list-item>
          <router-link v-if="this.$store.state.currentUser&&this.$store.state.currentUser.role=='admin'" to="/admin" class="text-black text-decoration-none">
          <v-list-item 
          class="customDiv">
            <div class="d-flex align-center" title="">
              <v-list-item-title class="mr-2">Admin panel</v-list-item-title>
              <v-icon color="red">mdi-wrench</v-icon>
            </div>
          </v-list-item>
        </router-link>
        </v-list>
      </v-menu>
    </v-col>
      <router-link to="/">
        <div> <v-img src="../assets/bg3.png" alt="nema" width="175"></v-img></div>
      </router-link>
      <v-col cols="4" class="d-none d-md-flex justify-end" v-if="!this.$store.state.currentUser">
        <router-link to="/register" class="text-white">
          <v-btn class="mr-4">
            Register <v-icon end class="text-red">mdi-account-plus</v-icon>
          </v-btn>
        </router-link>
        <router-link to="/login" class="text-white">
          <v-btn class="mr-4">
            Log in <v-icon end class="text-red">mdi-login</v-icon>
            <v-tooltip
            activator="parent"
            location="bottom"
            >Log in to get 5% off everything!</v-tooltip>
          </v-btn>
        </router-link>
      </v-col>
      <v-col cols="4" class="d-none d-md-flex justify-end align-center" v-else>
        <v-btn class="mr-4" @click="performLogout">
          Log out <v-icon end class="text-red">mdi-logout</v-icon>
        </v-btn>
        <p>{{ this.$store.state.currentUser.role=="admin"? "Have a nice work" : "Bon Appetit " }} <span class="text-red font-weight-medium">{{this.$store.state.currentUser.name}}</span>!</p>
      </v-col>
    </v-container>
  </v-toolbar>
</template>
<script>
export default{
    name:"NavComponent",
    props:{
        items:Array
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
<style>
.customDiv:hover{
  background-color: #F5F5F5;
}
</style>