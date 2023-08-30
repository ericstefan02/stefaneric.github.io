<template>
    <div id="coverContact">
      <v-container class="d-flex flex-column align-center justify-center">
        <v-col cols="12" md="8" sm="9" lg="6" class="my-15 pa-15" style="background-color: rgba(255, 255, 255, 0.7)">
          <v-form>
            <h2 class="text-h3 font-weight-bold mt-5 mb-5"><span class="text-red">C</span>ontact <span class="text-red">U</span>s</h2>
            <TextComponent type="email" label="Email" id="email" placeholder="Enter your mail" v-model="email" iclass="contactInput" lclass="contactLabel" :error="mailError"/>
            <TextComponent label="Subject" id="subject" placeholder="Enter mail subject" v-model="subject" iclass="contactInput" lclass="contactLabel" :error="subjectError"/>
            <TextComponent label="Message" id="message" placeholder="Enter your message" type="textarea" v-model="message"  iclass="contactInput" lclass="contactLabel" :error="messageError"/>
            <RadioComponent label="Message type" v-model="type" :options="options" name="MessageType" mainLabelClass="contactLabel" iClass="contactRadio"/>
            <v-btn color="red" class="mt-3" @click="checkForm">Send message</v-btn>
          </v-form>
        </v-col>
      </v-container>
    </div>
    <v-dialog persistent v-model="showDialog" max-width="500">
        <!-- Dialog content goes here -->
        <v-card>
            <div class="d-flex flex-column text-center pa-10 align-center justify-center">
                <v-icon icon="mdi-email-check" color="red" class="text-h1"></v-icon>
                <p class="font-weight-medium text-h6">{{contactMessage}}</p>
            </div>
            <v-card-actions>
                <v-btn color="red" @click="finishContact">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </template>
  
  <script>
  import TextComponent from './TextComponent.vue';
  import RadioComponent from './RadioComponent.vue';
  
  export default {
    name: 'ContactComponent',
    components: {
      TextComponent,
      RadioComponent,
    },
    data: () => ({
      email: '',
      subject: '',
      message: '',
      type: '1',
      mailError:"",
      subjectError:"",
      messageError:"",
      showDialog:false,
      contactMessage:"",
      options: [
        {
          value: '1',
          label: 'Suggestion',
        },
        {
          value: '2',
          label: 'Help needed',
        },
      ],
    }),
    methods:{
        checkForm(){
            var err = 0;
            if(!/^[\w\\.]+@[a-zA-Z_]+?(\.[a-zA-Z]{2,3})+$/.test(this.email)){
                err++;
                this.mailError = "Email is invalid"
            }
            else{
                this.mailError =""
            }
            if(!/^[A-Z][A-Za-z]{1,}$/.test(this.subject)){
                err++;
                this.subjectError = "Subject must start with capital and be atleast 2 characters long"
            }
            else{
                this.subjectError = "";
            }
            if(!this.message){
                err++;
                this.messageError = "You must enter a message"
            }
            else{
                this.messageError = "";
            }
            if(err==0){
                this.contactMessage = this.type=="1" ? "Your message has been sent successfuly. Our team will look at your suggestion as soon as possible!" : "Your message has been sent successfuly. Our team wil reach out to help you as soon as possible!"
                this.showDialog = true;
            }
        },
        finishContact(){
            this.showDialog = false;
            this.$router.push("/");
        }
    },
    mounted(){
        if(this.$store.state.currentUser){
            this.email = this.$store.state.currentUser.email
        }
    }
  };
  </script>
  
  <style>
  #coverContact {
    background: url('../assets/bgcontact.jpg');
    background-size: cover;
  }
  .contactInput{
    color: black;
    padding: 14px;
    background-color: #E0E0E0;
    width:100%;
    margin-bottom: 8px;
    border-bottom: 1px solid black;
    transition: border-bottom 0.1s ease;
    box-sizing: border-box;
  }
  .contactInput:focus{
    outline: none;
    border-bottom: 2.4px solid #C62828;
    transition: border-bottom 0.1s ease;
    box-sizing: border-box;
    color:#C62828
  }
  .contactLabel{
    font-weight: 500;
  }
  .contactRadio{
    margin-top: 5px;
    margin-right: 5px;
  }
  </style>
  