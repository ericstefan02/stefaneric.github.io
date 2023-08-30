<template>
    <div id="cover">
        <v-container>
            <v-col cols="12" lg="8" sm="10" class="mx-auto my-15">
                <v-card class="px-10 py-15 rounded-lg" elevation="20">
                    <div class="d-flex flex-column justify-center align-center">
                        <div class="mb-4">
                            <h2 class="text-center">Register and become part of our <span class="text-red">B</span>urger <span class="text-red">V</span>erse family</h2>
                        </div>
                    </div>
                    <v-form ref="form">
                        <div class="d-flex  flex-wrap">
                            <v-col cols="12" md="6" sm="12">
                                <v-text-field color="red" label="First name" v-model="firstName" :rules="nameRules" ref="firstNameField"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <v-text-field color="red" label="Last name" v-model="lastName" :rules="lastnameRules"></v-text-field>
                            </v-col>
                        </div>
                        <div class="d-flex flex-wrap">
                            <v-col cols="12" md="6" sm="12">
                                <v-text-field color="red" label="Email" v-model="email" :rules="emailRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <v-text-field color="red" label="Phone number" v-model="phoneNumber" :rules="phoneRules" ></v-text-field>
                            </v-col>
                        </div>
                        <div class="d-flex flex-wrap">
                            <v-col cols="12" md="6" sm="12">
                                <v-text-field color="red" type="password" label="Password" v-model="password" :rules="passwordRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <v-text-field color="red" type="password" label="Confirm password" v-model="confirmedPassword" :rules="confirmedPasswordRules"></v-text-field>
                            </v-col>
                        </div>
                        <div class="d-flex flex-wrap">
                            <v-col cols="12" md="6" sm="12">
                                <v-text-field color="red" label="Address" v-model="address" :rules="addressRules" ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="12">
                                <v-checkbox label="I agree to BurgerVers terms and conditions and privacy notice." color="red" :rules="agreedRules"></v-checkbox>
                            </v-col>
                        </div>
                        <div class="d-flex justify-space-between align-center flex-wrap">
                            <v-btn append-icon="mdi-arrow-right" color="red" size="large" @click="registrationProcess">Register</v-btn>
                            <p>Already have an account? <router-link to="/login" class="text-red ml-1">Log in</router-link></p>
                        </div>
                    </v-form>
                </v-card>
            </v-col>
            <v-dialog persistent v-model="dialogVisible" max-width="500">
                <!-- Dialog content goes here -->
                <v-card>
                    <div class="d-flex flex-column text-center pa-10 align-center justify-center">
                        <v-icon icon="mdi-check-circle" color="red" class="text-h1"></v-icon>
                        <p class="font-weight-medium text-h6">Your registration was successful. Proceed to log in!</p>
                    </div>
                    <v-card-actions>
                        <v-btn color="red" @click="finishRegistration">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>    
    </div>
    
</template>
<script>
export default{
    name:"RegisterComponent",
    data: ()=>({
        firstName:null,
        lastName:null,
        email:null,
        phoneNumber:null,
        password:null,
        confirmedPassword:null,
        dialogVisible:false,
        address:null,
        nameRules:[
            (v) => !!v || "Name is required",
            (v) =>
            /^[A-ZĆČĐŠŽ][a-zćčšđžA-ZĆČĐŠŽ]{1,29}$/.test(v) ||
            "Name must start with a capital letter and be 2-30 characters long",
        ],
        lastnameRules:[
            (v) => !!v || "Last name is required",
            (v) =>
            /^[A-ZĆČĐŠŽ][a-zćčšđžA-ZĆČĐŠŽ]{1,29}$/.test(v) ||
            "Last name must start with a capital letter and be 2-30 characters long",
        ],
        emailRules:[
            (v)=> !!v || "Email is required",
            (v) => /^[\w\\.]+@[a-zA-Z_]+?(\.[a-zA-Z]{2,3})+$/.test(v) ||
            "Please enter a valid email"
        ],
        phoneRules:[
            (v)=> !!v || "Phone number is required",
            (v)=> /^\(\d{3}\) \d{8,9}$/.test(v) || "Enter number in format (XXX) XXXXXXX"

        ],
        addressRules:[
            (v)=> !!v || "Address is required",
            (v)=> /^([A-ZČĆŠŽĐ][a-zčćšžđ]+)\s*([A-ZČĆŠŽĐa-zčćšžđ][a-zčćšžđ]+(\s)*)*[0-9]+([/][0-9])*$/.test(v) || "Enter a valid address"
        ],
        passwordRules:[
            (v)=> !!v || "Password is required",
            (v)=> /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || "Password must be at least 8 characters long and must contain at least one capital and one number"
        ],
        agreedRules:[
            (v)=> v === true || "You must agree to the terms and conditions"
        ]
    }),
    mounted(){
        if(this.$store.state.currentUser){
            this.$router.push("/")
        }
    },
    methods:{
        registrationProcess() {
        this.$refs.form.validate().then((isValid) => {
        if (isValid.valid) {
          var userToRegister = {
            email:this.email,
            password:this.password,
            role:"user",
            phone:this.phoneNumber,
            address:this.address,
            name: this.firstName,
            lastname: this.lastName,
          }
          this.$store.commit('addNewUser', userToRegister)
          this.dialogVisible = true;
        } 
      });
    },
    finishRegistration(){
        this.dialogVisible = false;
        this.$router.push("/login")
    },
    confirmPasswordRule: (password) => (v) =>
    v === password || "Passwords do not match",
    },
    computed:{
        confirmedPasswordRules() {
        return [
        (v) => !!v || "You must confirm the password",
        this.confirmPasswordRule(this.password),
        ];
  },
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