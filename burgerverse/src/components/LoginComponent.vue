<template>
    <div id="cover">
        <v-container>
            <v-col cols="12" lg="8" sm="10" class="mx-auto my-15">
                <v-card class="px-10 py-15 rounded-lg" elevation="20">
                    <div class="d-flex justify-space-between align-center flex-wrap">
                        <v-col cols="10" md="7" class="d-flex align-center justify-center">
                            <div class="py-lg-15 py-md-5 my-lg-5 my-md-2"> 
                                <p class="text-h3 text-uppercase font-weight-medium">Log in for <span class="text-red">5% off</span> on everything</p>
                            </div>
                        </v-col>
                        <v-col cols="12" md="5">
                            <h2 class="mb-3 heading">Login</h2>
                            <v-text-field label="Email" v-model="email" color="red"></v-text-field>
                            <v-text-field label="Password" type="password" v-model="password" color="red"></v-text-field>
                            <p>Haven't got an account yet? <router-link to="/register" class="text-red ml-1">Register</router-link></p>
                            <v-btn color="red" class="mt-5" @click="performLogin">Login</v-btn>
                           <div v-if="error"  class="d-flex bg-red pa-3 mt-3 rounded">
                            <v-icon>mdi-alert</v-icon>
                            <p class="ml-3">Invalid email or password!</p>
                           </div>
                        </v-col>
                    </div>
                </v-card>
            </v-col>
        </v-container>    
    </div>
    
</template>
<script>
export default{
    name:"LoginComponent",
    data: ()=>({
        email:null,
        password:null,
        error:false
    }),
    methods:{
        performLogin(){
            const user = this.$store.state.users.find((user) => user.email == this.email && user.password == this.password);
            if(user){
                this.error = false;
                localStorage.setItem('user', JSON.stringify(user));
                this.$store.commit('setUser', user)
                if(user.role=="user"){
                    this.$router.push("/")
                }
                else if(user.role=="admin"){
                    this.$router.push("/admin")
                }
            }
            else{
                this.error = true;
            }
        }
    },
    mounted(){
        if(this.$store.state.currentUser){
            this.$router.push("/")
        }
    }
}
</script>
<style>
#cover{
    background: url('../assets/proba3.jpg');
    background-size: cover;
}
.heading{
    border-bottom: 3px solid #F44336;
    display: inline-block;
}
</style>