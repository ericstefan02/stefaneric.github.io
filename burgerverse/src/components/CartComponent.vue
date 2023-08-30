<template>
    <v-container>
        <h1 class="text-center my-4 text-h2 font-weight-medium"><span class="text-red">Y</span>OUR <span class="text-red">C</span>ART</h1>
        <v-divider thickness="3"></v-divider>
    </v-container>
    <v-col cols="11" lg="5" sm="7" v-if="!cartItems||!cartItems.length" class="mx-auto mb-10">
        <div class="d-flex flex-column align-center justify-center pa-10 bg-red rounded-lg">
            <v-icon icon="mdi-cart-remove" class="text-h1"></v-icon>
            <p class="text-h5 text-center">Sorry, but your cart is currently empty...</p>
            <router-link to="/food">
                <v-btn class="my-3 text-black" prepend-icon="mdi-arrow-left">Still hungry?</v-btn>
            </router-link>
        </div>
    </v-col>
    <div v-if="cartItems&&cartItems.length">
        <v-container class="d-flex align-top justify-center flex-wrap">
            <v-col cols="12" md="7" sm="10">
                <p class="font-weight-medium text-h4 cartHeading">Items:</p>
                <div v-for="burgerItem,index in burgerItems" :key="index">
                    <div class="d-flex align-center justify-space-between">
                     <div>
                         <v-img
                         :src="burgerItem.image"
                         width="120"
                         cover>
                         </v-img>
                     </div>
                     <v-col cols="3" md="5" class="d-flex flex-column align-center justify-center">
                         <p class="font-weight-bold text-red">Name</p>
                         <p class="font-weight-medium">{{burgerItem.name}}</p>
                     </v-col>
                     <div class="d-flex flex-column align-center justify-center">
                         <p class="font-weight-bold text-red">Quantity</p>
                         <p class="font-weight-medium">{{burgerItem.quantity}}</p>
                     </div>
                     <div class="d-flex flex-column align-center justify-center">
                         <p class="font-weight-bold text-red">Price</p>
                         <p class="font-weight-medium">{{burgerItem.price}}$</p>
                     </div>
                     <div class="d-flex flex-column align-center justify-center bg-red text-black">
                         <v-btn class="bg-red" flat density="compact" icon="mdi-plus" @click="addOne(burgerItem.id)"></v-btn>
                         <v-btn class="bg-red" flat density="compact" icon="mdi-minus" @click="removeOne(burgerItem.id)"></v-btn>
                         <v-btn class="bg-red" flat density="compact" icon="mdi-close" @click="removeAll(burgerItem.id)"></v-btn>
                     </div>
                 </div>
                    <v-divider color="black"></v-divider>
                </div>
               <p class="font-weight-bold my-5 text-h6">Total price: {{totalPrice}}$ <span v-if="discount" class="text-red font-weight-medium text-subtitle-1"> *with discount</span> </p>
            </v-col>
            <v-col cols="12" md="5" sm="10">    
                <p class="font-weight-medium text-h4 cartHeading">Info:</p>
                <v-form class="mt-4" ref="form">
                    <v-text-field
                    color="red"
                    label="Address"
                    :rules="addressRules"
                    v-model="address"
                    ></v-text-field>
                    <v-text-field
                    color="red"
                    label="Phone number"
                    :rules="phoneRules"
                    v-model="phone"
                    ></v-text-field>
                    <v-textarea color="red" label="Details" rows="4"></v-textarea>
                    <p>Payment method</p>
                    <v-radio-group v-model="card">
                        <v-radio label="Cash" color="red" value="1"></v-radio>
                        <v-radio label="Card" color="red" value="2"></v-radio>
                      </v-radio-group>
                      <v-text-field
                        v-if="card=='2'"
                        color="red"
                        label="Card number"
                        :rules="card == '2' ? cardNumberRules : []"
                    ></v-text-field>
                      <v-btn color="red" block @click="orderProcess">Order</v-btn>
                </v-form>
            </v-col>
            <v-dialog persistent v-model="dialogVisible" max-width="500">
                <!-- Dialog content goes here -->
                <v-card>
                    <div class="d-flex flex-column text-center pa-10 align-center justify-center">
                        <v-icon icon="mdi-cart-check" color="red" class="text-h1"></v-icon>
                        <p class="font-weight-medium text-h6">Your shopping was successful. Food will be at your doors as soon as possible, enjoy!</p>
                    </div>
                    <v-card-actions>
                        <v-btn color="red" @click="finishShopping">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            
        </v-container>
    </div>
    
</template>
<script>
export default{
    name:"CartComponent",
    data:()=>({
        cartItems:[],
        burgerItems:[],
        totalPrice:0,
        card: "1",
        address:null,
        phone:null,
        discount:false,
        dialogVisible:false,
        phoneRules:[
            (v)=> !!v || "Phone number is required",
            (v)=> /^\(\d{3}\) \d{8,9}$/.test(v) || "Enter number in format (XXX) XXXXXXX"

        ],
        addressRules:[
            (v)=> !!v || "Address is required",
            (v)=> /^([A-ZČĆŠŽĐ][a-zčćšžđ]+)\s*([A-ZČĆŠŽĐa-zčćšžđ][a-zčćšžđ]+(\s)*)*[0-9]+([/][0-9])*$/.test(v) || "Enter a valid address"
        ],
        cardNumberRules:[
            (v)=> !!v || "Card number is required",
            (v)=> /^\d{16}$/.test(v) || "Card number must be 16 digits"

        ]
    }),
    mounted(){
        this.cartItems = JSON.parse(localStorage.getItem('cart'));
        console.log(this.cartItems)
        if(this.cartItems!=null && this.cartItems.length!=0){
            let burgers = JSON.parse(localStorage.getItem('burgers'));
            this.cartItems.forEach(cartItem => {
                burgers.forEach(burger => {
                    if(cartItem.id == burger.id){
                        var burgerToAdd = {
                            id:cartItem.id,
                            name:burger.name,
                            quantity:cartItem.quantity,
                            price:burger.price,
                            image:burger.images[0].sm
                        }
                        this.totalPrice += cartItem.quantity * burger.price
                        this.burgerItems.push(burgerToAdd)
                    }
                });
            });
            this.totalPrice = this.totalPrice.toFixed(2);
            if(this.$store.state.currentUser){
                this.address = this.$store.state.currentUser.address;
                this.phone = this.$store.state.currentUser.phone;
                this.discount = true;
                this.totalPrice = (this.totalPrice*0.95).toFixed(2);
            }
        }
    },
    methods:{
        addOne(id){
            this.burgerItems.forEach(burgerItem => {
                if(burgerItem.id==id){
                    burgerItem.quantity++;
                    this.totalPrice = (parseFloat(this.totalPrice) + (this.$store.state.currentUser ? burgerItem.price * 0.95 : burgerItem.price)).toFixed(2);
                }
            });
            this.cartItems.forEach(cartItem => {
                if(cartItem.id==id){
                    cartItem.quantity++;
                }
                localStorage.setItem('cart', JSON.stringify(this.cartItems));
            });
        },
        removeAll(id){
            var indexToRemove;
            var indexToRemoveInStorage;
            this.burgerItems.forEach((burgerItem, index) => {
                if(burgerItem.id==id){
                    indexToRemove = index;
                    this.totalPrice = (parseFloat(this.totalPrice) - (this.$store.state.currentUser ? burgerItem.price * 0.95 * burgerItem.quantity : burgerItem.price * burgerItem.quantity)).toFixed(2);
                }
            });
            this.cartItems.forEach((cartItem, index) => {
                if(cartItem.id == id){
                    indexToRemoveInStorage = index;
                }
            });
            this.burgerItems.splice(indexToRemove, 1);
            this.cartItems.splice(indexToRemoveInStorage, 1);
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
        },
        removeOne(id){
            this.burgerItems.forEach(burgerItem => {
                if(burgerItem.id == id){
                    if(burgerItem.quantity>1){
                        burgerItem.quantity--;
                        this.totalPrice = (parseFloat(this.totalPrice) - (this.$store.state.currentUser ? burgerItem.price * 0.95 : burgerItem.price)).toFixed(2);
                    }
                }
            });
            this.cartItems.forEach(cartItem => {
                if(cartItem.id == id){
                    if(cartItem.quantity>1){
                        cartItem.quantity--;
                    }
                }
            });
            localStorage.setItem('cart', JSON.stringify(this.cartItems))
        },
        orderProcess(){
            this.$refs.form.validate().then((isValid) => {
            if (isValid.valid) {
                this.dialogVisible = true;
            } 
            });
        },
        finishShopping(){
            this.dialogVisible = false;
            this.$router.push('/');
            localStorage.removeItem('cart');
        }
    }
}
</script>
<style>
.cartHeading{
    display: inline-block;
    border-bottom: 4px solid #F44336;
}
</style>