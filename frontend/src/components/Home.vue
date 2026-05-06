<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {},
  emits: ["go-to-basic-info", "go-to-discover"],
};
</script>

<template>
  <div class="home-text">
    <h1>Velkommen til Borrow!</h1>
    <!--   <v-img
      src="@/assets/images/borrowLogo.png"
      contain
      max-width="200"
      class="mx-auto"
    /> -->
    <h2>Del mere. Køb mindre.</h2>
    <h3>
      Del og lån genstande i dit lokalsamfund! <br />
      Reducer overforbrug, spar penge og styrk fællesskabet.
    </h3>
    <v-row class="mt-4 ga-3 justify-center">
      <v-col cols="12" md="auto">
        <v-btn
          color="green-lighten-1"
          class="text-black"
          @click="$emit('go-to-discover')"
        >
          Find genstande
          <v-icon size="18" class="ml-1">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto">
        <v-btn
          color="grey-darken-4"
          class="text-white"
          @click="$emit('go-to-basic-info')"
        >
          Opret ny genstand
          <v-icon size="18" class="ml-1">mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-col class="mt-4 ga-3 justify-center">
          <v-row cols="12" md="auto">
            <v-card>
              <v-card-title>Lån & Del</v-card-title>
              <v-card-text>
                <p>
                  Del ting du sjældent bruger <br />
                  og lån hvad du har brug for
                </p>
              </v-card-text>
            </v-card>
            <v-card>
              <v-card-title>Reducer Spild</v-card-title>
              <v-card-text>
                <p>
                  Hver lånt genstand er én <br />
                  mindre der købes og smides ud
                </p>
              </v-card-text>
            </v-card>
            <v-card>
              <v-card-title>Styrk Fællesskabet</v-card-title>
              <v-card-text>
                <p>
                  Forbind dig med naboer og <br />
                  styrk lokale bånd
                </p>
              </v-card-text>
            </v-card>
          </v-row>
        </v-col> -->
  </div>
</template>

<style scoped>
.home-text {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 80px;
}

.home-text h2,
.home-text h3 {
  color: #757575;
  font-weight: normal;
}

.text-black {
  color: black;
}

.text-white {
  color: white;
}
</style>
