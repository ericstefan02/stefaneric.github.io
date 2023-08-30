<template>
    <v-container class="d-flex jusfiy-center align-center flex-column mt-2">
        <h1>Explore our <span class="text-red">B</span>urger <span class="text-red">V</span>erse</h1>
        <v-col lg="6" sm="8">
            <v-combobox
            v-model="keyword"
            class="my-2"
            base-color="red"
            label="Search for your favorite burger..."
            :items="burgerNames"
            ></v-combobox>
        </v-col>
        <v-col v-if="!burgersData.length" cols="11" lg="5" sm="7" class="bg-red d-flex flex-column justify-center align-center pa-10 rounded">
            <div class="my-5 d-flex flex-column justify-center align-center">
                <v-icon class="text-h1">mdi-emoticon-sad</v-icon>
                <p class="text-h4 font-weight-medium">We are sorry</p>
                <p class="text-center">We currently do not have the burger you are looking for, but feel free to contact us and recommend it!</p>
            </div>
        </v-col>
        <v-col cols="12" class="d-flex flex-wrap">
            <v-col v-for="burger, index in burgersData" :key="index" lg="4" sm="6">
                <v-card
                elevation="10"
                >
                    <v-img
                    :src="burger.images[0].sm"
                    height="200"
                    ></v-img>
                    <div>
                        <v-card-title>
                        {{ burger.name }}
                        </v-card-title>
    
                        <p
                        
                        class="font-weight-bold text-h4 ml-4"
                        >
                        {{burger.price}}$
                        </p>
    
                        <v-card-actions class="d-flex justify-space-between align-center my-2 pa-3"> 
                        <v-btn
                            class="bg-red"
                            append-icon="mdi-cart-plus"
                            @click="addToCart(burger.id)"
                        >
                            Add to cart
                        </v-btn>
    
    
                        <v-btn
                            :prepend-icon="burger.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                            @click="burger.show = !burger.show"
                        >   
                        Details
                        <v-tooltip
                            activator="parent"
                            location="top"
                        >Click to see more!</v-tooltip>  
                        </v-btn>
                        </v-card-actions>
    
                        <v-expand-transition>
                        <div v-show="burger.show">
                            <v-divider></v-divider>
    
                            <v-card-text>
                                {{ burger.desc }}
                            </v-card-text>
                        </div>
                        </v-expand-transition>
                    </div>
                </v-card>
            </v-col>
        </v-col>
        <v-snackbar
            timeout="2000"
            v-model="snackbar"
            >
            Product added to cart!

            <template v-slot:actions>
                <v-btn
                color="red"    
                variant="text"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>
<script>

import axios from 'axios'

export default{
    name:"FoodComponent",
    data: ()=>({
        burgersData:[],
        burgerNames:[],
        keyword:null,
        snackbar:false
    }),
    async mounted(){
        const storedBurgers = localStorage.getItem('burgers');
    
        if (storedBurgers !== null) {
        this.burgersData = JSON.parse(storedBurgers);
        console.log('Burgers are available:', this.burgersData);
        this.burgerNames = this.burgersData.map(burger => burger.name);
        } 
        else {
        await this.fetchAndStoreBurgers();
    }
    },
    methods:{
        async fetchAndStoreBurgers() {
        const options = {
        method: 'GET',
        url: 'https://burgers-hub.p.rapidapi.com/burgers',
        headers: {
          'X-RapidAPI-Key': '30a0d3f91bmshc44b74c04e806b1p16e501jsn357a7962732a',
          'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        this.burgersData = response.data.map(burger => ({
            ...burger,
            show: false
        }));
        console.log(this.burgersData);
        this.burgerNames = this.burgersData.map(burger => burger.name);

        localStorage.setItem('burgers', JSON.stringify(this.burgersData));
      } catch (error) {
        console.error(error);
      }
    },
    addToCart(id){
        this.snackbar = true;
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        var i = 0;
        if(cartItems.length>0){
            cartItems.forEach(burgerItem => {
                if(burgerItem.id == id){
                    burgerItem.quantity++;
                    i++;
                }
            });
            if(i==0){
                let burgerToAdd = {
                    id:id,
                    quantity:1
                }
                cartItems.push(burgerToAdd);
            }
        }
        else{
            let burgerToAdd = {
                id:id,
                quantity:1
            }
            cartItems.push(burgerToAdd);
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  },
  watch:{
    keyword(newValue){
        if(newValue==null||newValue==""){
            this.burgersData = JSON.parse(localStorage.getItem("burgers"));
        }
        else{
            var keywordToCheck = newValue.trim().toLowerCase()
            var allBurgers = JSON.parse(localStorage.getItem("burgers"));
            var newBurgers = allBurgers.filter(burger=>{
               return burger.name.toLowerCase().includes(keywordToCheck);
            })
            if(newBurgers.length==0){
                console.log("Nema")
            }
            this.burgersData = newBurgers;
        }
    }
  }
}
</script>