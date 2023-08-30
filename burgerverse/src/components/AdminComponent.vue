<template>
    <v-container>
        <h1 class="text-center"><span class="text-red">A</span>dmin <span class="text-red">p</span>anel</h1>
        <v-divider></v-divider>
        <div class="d-flex align-center justify-center mt-10 mb-5">
            <v-btn class="mr-5" color="red" @click="getHamubrgers">
                Edit hamubrgers
            </v-btn>
            <v-btn color="red" @click="getUsers">
                Edit users
            </v-btn>
        </div>
        <div class="d-flex flex-column justify-center align-center"> 
            <h2 class="heading my-5 mx-auto">Data to edit will be displayed here <v-icon color="red" size="large" icon="mdi-arrow-down-bold"></v-icon></h2>
        </div>
        <div class="d-flex flex-column justify-center align-center" v-if="!hamubrgerData.length&&!usersData.length">
            <div class="d-flex align-center justify-center pa-15 bg-red my-15 w-75">
                <p class="text-h4 font-weight-bold">Choose one of two options to display data</p>
            </div>
        </div>
        <div v-if="hamubrgerData.length" class="d-flex flex-column align-center scrollableDiv">
            <v-btn color="red" class="my-3" @click="dialogInsert=true">Insert new hamburger</v-btn>
            <div v-for="hamburger, index in hamubrgerData" :key="index" class="d-flex align-center justify-center">
                <div>
                    <v-img :src="hamburger.images[0].sm" width="100">
                    </v-img>
                </div>
                <div class="text-center name-section mx-10">
                    <p class="font-weight-bold">Name</p>
                    <p>{{ hamburger.name }}</p>
                </div>
                <div class="text-center mx-10">
                    <p class="font-weight-bold">Price</p>
                    <p>{{ hamburger.price }}</p>
                </div>
                <div class="d-flex mx-10">
                    <v-btn append-icon="mdi-book-edit" color="red" class="mr-3" @click="bindForm(hamburger.id)">
                        Edit
                    </v-btn>
                    <v-btn append-icon="mdi-delete" color="red" @click="hamburger.dialog=true">
                        Delete
                    </v-btn>
                    <v-dialog
                        persistent
                        v-model="hamburger.dialog"
                        width="auto"
                        >
                        <v-card>
                            <v-card-text>
                            Are you sure that you want to delete this item?
                            </v-card-text>
                            <v-card-actions>
                            <v-btn color="red" @click="deleteHamburger(hamburger.id)">Delete</v-btn>
                            <v-btn color="black" @click="hamburger.dialog = false">Close</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                </div>
            </div>
        </div>
        <div v-if="usersData.length" class="d-flex flex-column align-center scrollableDiv">
            <v-btn color="red" class="my-10" @click="dialogInsertUser=true">Insert new user</v-btn>
            <div v-for="user, index in usersData" :key="index" class="d-flex align-center justify-center my-5 ">
                <div class="text-center mx-10 user-section">
                    <p class="font-weight-bold">First name</p>
                    <p>{{ user.name }}</p>
                </div>
                <div class="text-center mx-10 user-section">
                    <p class="font-weight-bold">Last name</p>
                    <p>{{ user.lastname }}</p>
                </div>
                <div class="text-center mx-10 user-section">
                    <p class="font-weight-bold">Role</p>
                    <p>{{ user.role }}</p>
                </div>
                <div class="text-center mx-10 user-section">
                    <p class="font-weight-bold">Email</p>
                    <p>{{ user.email }}</p>
                </div>
                <div class="text-center mx-10 user-section">
                    <p class="font-weight-bold">Password</p>
                    <p>{{ user.password }}</p>
                </div>
                <div class="d-flex mx-10">
                    <v-btn append-icon="mdi-book-edit" color="red" class="mr-3" @click="bindFormUser(user.id)">
                        Edit
                    </v-btn>
                    <v-btn append-icon="mdi-delete" color="red" @click="user.dialog=true">
                        Delete
                    </v-btn>
                    <v-dialog
                        persistent
                        v-model="user.dialog"
                        width="auto"
                        >
                        <v-card>
                            <v-card-text>
                            Are you sure that you want to delete this user?
                            </v-card-text>
                            <v-card-actions>
                            <v-btn color="red" @click="deleteUser(user.id)">Delete</v-btn>
                            <v-btn color="black" @click="user.dialog = false">Close</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                </div>
            </div>
        </div>
        <v-dialog
        persistent
        v-model="dialogInsert"
        width="400"
        >
        <v-card>
            <div class="pa-5">
                <v-form ref="inputForm">
                    <v-text-field :rules="burgerNameRules" v-model="burgerToInsertName" color="red" label="Burger name">
 
                    </v-text-field>
                    <v-text-field :rules="burgerPriceRules" v-model="burgerToInsertPrice" color="red" label="Burger price">

                    </v-text-field>
                    <v-textarea  :rules="burgerDescriptionRules" v-model="burgerToInsertDesc" color="red" label="Burger description" rows="3">

                    </v-textarea>
                    <v-file-input :rules="burgerPictureRules" v-model="burgerToInsertPicture" color="red" label="Burger picture" accept=".png,.jpg,.jpeg">

                    </v-file-input>
                </v-form>
            </div>
            <v-card-actions>
            <v-btn color="red" @click="insertHamburger">Insert</v-btn>
            <v-btn color="black" @click="dialogInsert = false">Close</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <v-dialog
        persistent
        v-model="dialogEdit"
        width="400"
        >
        <v-card>
            <div class="pa-5">
                <v-form ref="editForm">
                    <v-text-field :rules="burgerNameRules" v-model="burgerToEditName" color="red" label="Burger name">
 
                    </v-text-field>
                    <v-text-field :rules="burgerPriceRules" v-model="burgerToEditPrice" color="red" label="Burger price">

                    </v-text-field>
                    <v-textarea  :rules="burgerDescriptionRules" v-model="burgerToEditDesc" color="red" label="Burger description" rows="3">

                    </v-textarea>
                    <v-file-input @change="changePicture" v-model="file" label="Burger picture" color="red" accept=".png,.jpg,.jpeg">
                    </v-file-input>
                    <p class="text-red font-weight-medium">Current picture</p>
                    <v-img :src="burgerToEditPictureUrl" width="100"></v-img>
                </v-form>
            </div>
            <v-card-actions>
            <v-btn color="red" @click="editHamburger">Edit</v-btn>
            <v-btn color="black" @click="dialogEdit = false">Close</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <v-dialog
        persistent
        v-model="dialogInsertUser"
        width="400"
        >
        <v-card>
            <div class="pa-5">
                <v-form ref="inputUserForm">
                    <v-text-field :rules="nameRules" v-model="userToInsertName" color="red" label="First name">
 
                    </v-text-field>
                    <v-text-field :rules="nameRules" v-model="userToInsertLastName" color="red" label="Last name">

                    </v-text-field>
                    <v-text-field  :rules="emailRules" v-model="userToInsertEmail" color="red" label="Email" rows="3">

                    </v-text-field>
                    <v-text-field :rules="passwordRules" v-model="userToInsertPassword" color="red" label="Password">

                    </v-text-field>
                    <v-text-field :rules="addressRules" v-model="userToInsertAddress" color="red" label="Address">

                    </v-text-field>
                    <v-text-field :rules="phoneRules" v-model="userToInsertPhone" color="red" label="Phone number">

                    </v-text-field>
                </v-form>
            </div>
            <v-card-actions>
            <v-btn color="red" @click="insertUser">Insert</v-btn>
            <v-btn color="black" @click="dialogInsertUser = false">Close</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <v-dialog
        persistent
        v-model="dialogEditUser"
        width="400"
        >
        <v-card>
            <div class="pa-5">
                <v-form ref="editUserForm">
                    <v-text-field :rules="nameRules" v-model="userToEditName" color="red" label="First name">
 
                    </v-text-field>
                    <v-text-field :rules="nameRules" v-model="userToEditLastName" color="red" label="Last name">

                    </v-text-field>
                    <v-text-field  :rules="emailRules" v-model="userToEditEmail" color="red" label="Email" rows="3">

                    </v-text-field>
                    <v-text-field :rules="passwordRules" v-model="userToEditPassword" color="red" label="Password">

                    </v-text-field>
                    <v-text-field :rules="addressRules" v-model="userToEditAddress" color="red" label="Address">

                    </v-text-field>
                    <v-text-field :rules="phoneRules" v-model="userToEditPhone" color="red" label="Phone number">

                    </v-text-field>
                </v-form>
            </div>
            <v-card-actions>
            <v-btn color="red" @click="editUser">Edit</v-btn>
            <v-btn color="black" @click="dialogEditUser = false">Close</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name:"AdminComponent",
    data: ()=>({
        hamubrgerData:[],
        usersData:[],
        dialogInsert:false,
        dialogInsertUser:false,
        dialogEditUser:false,
        dialogEdit:false,
        selectedFile:null,
        maxHamburgerId:0,
        maxUserId:0,
        burgerNameRules:[
            (v)=> !! v || "Burger's name is required",
            (v)=> /^[A-Z].{0,49}$/.test(v) || "Name must start with capital and can't be longer than 50 characters"
        ],
        burgerDescriptionRules:[
            (v)=> !! v || "Burger's decription is required"
        ],
        burgerPriceRules:[
            (v)=> !! v || "Burger's price is required",
            (v)=> /^[0-9]+(\.[0-9]+)?$/.test(v) || "You must enter valid price, example: 5.99"
        ],
        burgerPictureRules:[
            (v)=> !! v[0] || "Burger picture is required"
        ],
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
        burgerToInsertName:"",
        burgerToInsertDesc:"",
        burgerToInsertPrice:"",
        burgerToInsertPicture:"",
        userToInsertLastName:"",
        userToInsertName:"",
        userToInsertAddress:"",
        userToInsertEmail:"",
        userToInsertPassword:"",
        userToInsertPhone:"",
        userToEditLastName:"",
        userToEditName:"",
        userToEditAddress:"",
        userToEditEmail:"",
        userToEditPassword:"",
        userToEditPhone:"",
        userToEditId:0,
        burgerToEditName:"",
        burgerToEditPrice:"",
        burgerToEditDesc:"",
        burgerToEditPicture:"",
        burgerToEditPictureUrl:"",
        burgerToEditId:0,
        file:null

    }),
    methods:{
        getHamubrgers(){
            this.usersData = [];
            this.hamubrgerData = JSON.parse(localStorage.getItem('burgers'));
            this.hamubrgerData.forEach((hamburger) => {
            hamburger.dialog = false;
            if(hamburger.id>this.maxHamburgerId){
                this.maxHamburgerId = hamburger.id
            }
            this.maxHamburgerId++;
            });

        },
        getUsers(){
            this.hamubrgerData = [];
            this.usersData = this.$store.state.users;
            this.usersData.forEach(user => {
                user.dialog = false;
                if(user.id>this.maxUserId){
                    this.maxUserId = user.id
                }
                this.maxUserId++;
            });
        },
        deleteHamburger(id){
            var position = 0;
            this.hamubrgerData.forEach((burger, index) => {
                if(burger.id == id){
                    position = index;
                }
            });
            this.hamubrgerData.splice(position, 1);
        },
        deleteUser(id){
            var position = 0;
            this.usersData.forEach((user, index) => {
                if(user.id == id){
                    position = index;
                }
            });
            this.usersData.splice(position, 1);
        },
        insertHamburger(){
            this.$refs.inputForm.validate().then((isValid) => {
                if(isValid.valid){
                    var burgerToAdd = {
                        id:this.maxHamburgerId,
                        name: this.burgerToInsertName,
                        images:[{sm:URL.createObjectURL(this.burgerToInsertPicture[0])}, {lg:""}],
                        desc:this.burgerToInsertDesc,
                        ingredients:[],
                        price:this.burgerToInsertPrice,
                        veg:false,
                        show:false,
                        dialog:false
                    }
                    this.maxHamburgerId++
                    this.hamubrgerData.push(burgerToAdd);
                    this.dialogInsert = false;
                }
            })
        },
        insertUser(){
            this.$refs.inputUserForm.validate().then((isValid)=>{
                if(isValid.valid){
                    var userToAdd = {
                        name:this.userToInsertName,
                        lastname:this.userToInsertLastName,
                        email:this.userToInsertEmail,
                        password:this.userToInsertPassword,
                        phone:this.userToInsertPhone,
                        address:this.userToInsertAddress,
                        role:"user"
                    }
                    this.usersData.push(userToAdd);
                    this.dialogInsertUser = false;
                }
            })
        },
        bindForm(id){
            this.dialogEdit = true
            var burger = this.hamubrgerData.find((b)=>b.id == id);
            this.burgerToEditName = burger.name
            this.burgerToEditPrice = burger.price
            this.burgerToEditDesc = burger.desc
            this.burgerToEditPictureUrl = burger.images[0].sm
            this.burgerToEditId = id;
        },
        bindFormUser(id){
            this.dialogEditUser = true;
            var user = this.usersData.find((u)=>u.id==id)
            this.userToEditName = user.name
            this.userToEditLastName = user.lastname
            this.userToEditEmail = user.email,
            this.userToEditPassword = user.password,
            this.userToEditAddress = user.address,
            this.userToEditPhone = user.phone
            this.userToEditId = user.id
        },
        changePicture(){
            this.changes++
            var newUrl = URL.createObjectURL(this.file[0])
            this.burgerToEditPictureUrl = newUrl
        },
        editHamburger(){
            this.$refs.editForm.validate().then((isValid) => {
                if(isValid.valid){
                    this.hamubrgerData.forEach(burger => {
                        if(burger.id==this.burgerToEditId){
                            burger.name = this.burgerToEditName
                            burger.desc = this.burgerToEditDesc
                            burger.price = this.burgerToEditPrice
                            burger.images[0].sm = this.burgerToEditPictureUrl
                            this.dialogEdit = false
                            return
                        }
                    });
                 } 
                })
        },
        editUser(){
            this.$refs.editUserForm.validate().then((isValid)=>{
                if(isValid.valid){
                    this.usersData.forEach(user=>{
                        if(user.id==this.userToEditId){
                            user.name = this.userToEditName
                            user.lastname = this.userToEditLastName
                            user.email = this.userToEditEmail
                            user.password = this.userToEditPassword
                            user.phone = this.userToEditPhone
                            user.address = this.userToEditAddress
                            this.dialogEditUser = false
                            return
                        }
                    })
                }
            })
        }
    },
    mounted(){
        if(!this.$store.state.currentUser||this.$store.state.currentUser.role!="admin"){
            this.$router.push("/")
        }
    }
}
</script>
<style>
.name-section{
    width: 200px;
}
.user-section{
    width: 100px;
}
.scrollableDiv {
    overflow-x: auto;
    white-space: nowrap; 
    max-width: 100%;
  }
</style>
