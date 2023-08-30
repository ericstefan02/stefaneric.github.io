<template>
    <v-carousel height="600" class="text-red" cycle>
        <v-carousel-item
          src="../assets/smash-burger-mob-F-1.jpg"
          cover
        ></v-carousel-item>
      
        <v-carousel-item
        src="../assets/Untitled-design-13.png"
        cover
        ></v-carousel-item>
      
        <v-carousel-item
        src="../assets/burger2.jpg"
        cover
        >
        <v-container class="d-flex align-center justify-start" id="item">
          <v-col cols="12" md="4" class="text-center">
            <div class=" pa-10 rounded-lg">
              <p class="text-h3 font-weight-bold">
                Already on this slide?  
              </p>
              <router-link to="/food">
                <v-btn append-icon="mdi-arrow-right" class="text-white bg-red mt-2" flat>
                  Must be starving!
                </v-btn>
              </router-link>
            </div>
          </v-col>
        </v-container>
      </v-carousel-item>
      </v-carousel>
    <div>
      <v-container class="text-center d-flex flex-column align-center justify-center" id="cont">
        <h1 class="text-red text-capitalize">Why should you choose us?</h1>
          <v-timeline line-color="grey-darken-2" align="center" :side="isMdScreen ? 'end' : ''">
            <v-timeline-item
              dot-color="red-darken-1"
              fill-dot
            >
              <v-card elevation="10">
                <v-card-title class="bg-red-darken-1">
                  <v-icon
                    size="large"
                    class="me-4"
                    icon="mdi-food-steak"
                  ></v-icon>
                  <h2 class="font-weight-bold">
                    Best ingredients!
                  </h2>
                </v-card-title>
                <v-card-text class="mt-3 font-weight-bold">
                  Our burgers are made from premium, locally sourced meats and accompanied by the freshest produce, ensuring every bite is a testament to our dedication to excellence.
                </v-card-text>
              </v-card>
            </v-timeline-item>
        
            <v-timeline-item
              dot-color="red-darken-2"
              fill-dot
              size="x-small"
            >
              <v-card elevation="10">
                <v-card-title class="bg-red-darken-2 justify-end">
                  <h2 class="me-4 font-weight-bold">
                    Best chefs!
                  </h2>
                  <v-icon
                    size="large"
                    icon="mdi-chef-hat"
                  ></v-icon>
                </v-card-title>
                <v-card-text class="mt-3 font-weight-bold">
                  Our team of accomplished chefs brings years of experience and creativity to the table, infusing every dish with passion and skill by crafting mouthwatering burgers.
                </v-card-text>
              </v-card>
            </v-timeline-item>
        
            <v-timeline-item
              dot-color="red-darken-3"
              fill-dot
            >
              <v-card elevation="10">

                <v-card-title class="bg-red-darken-3">
                  <v-icon
                    class="me-4"
                    size="large"
                    icon="mdi-truck-delivery"
                  ></v-icon>
                  <h2 class="font-weight-bold">
                    Best delivery!
                  </h2>
                </v-card-title>
                <v-card-text class="mt-3 font-weight-bold">
                  Experience the perfect blend of speed and taste with our fast delivery service at Burger Verse.
                </v-card-text>
              </v-card>
            </v-timeline-item>
        
            <v-timeline-item
              dot-color="red-darken-4"
              fill-dot
              size="x-small"
            >
              <v-card elevation="10">
                <v-card-title class="bg-red-darken-4 justify-end">
                  <h2 class="me-4 font-weight-bold">
                    Best customers!
                  </h2>
                  <v-icon
                    size="large"
                    icon="mdi-account-multiple-outline"
                  ></v-icon>
                </v-card-title>
                <v-card-text class="mt-3 font-weight-bold">
                  Your satisfaction is our top priority, which is ensured by quality and we're honored to have you as part of our Burger Verse family.
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
      </v-container>
    </div>
    <div>
      <div class="d-flex flex-wrap">
        <v-col cols="12" md="6" class="bg-black d-flex flex-column align-center justify-center pa-15">
          <v-icon class="text-h1">mdi-silverware</v-icon>
          <h2>Hungry yet?</h2>
          <router-link to="/food" class="text-white">
            <v-btn append-icon="mdi-arrow-right" class="bg-black mt-5" variant="outlined">
              Check our menu
            </v-btn>
          </router-link>
        </v-col>
        <v-col cols="col-12" md="6" class="pa-0">
          <v-img src="../assets/burger1.jpg" cover></v-img>
        </v-col>
      </div>
    </div>
    <div>
      <div class="d-flex flex-wrap">
        <v-col cols="12" md="6" class="pa-0">
          <v-img src="../assets/burger3.jpg" cover></v-img>
        </v-col>
        <v-col cols="12" md="6" class="bg-red-darken-4 d-flex flex-column align-center justify-center pa-15 order-first order-md-last">
          <v-icon class="text-h1">mdi-headset</v-icon>
          <h2>Have any questions?</h2>
          <router-link to="/contact" class="text-white">
            <v-btn append-icon="mdi-arrow-right" class="bg-red-darkent-4 mt-5" variant="outlined">
              Contact us
            </v-btn>
          </router-link>
        </v-col>
      </div>
    </div>
</template>
<script>
export default{
    name:"HomeComponent",
    computed: {
    isMdScreen() {
      return this.$vuetify.display.smAndDown
    },
  }
}
</script>
<style>
#item{
  height: 100%;
}
</style>