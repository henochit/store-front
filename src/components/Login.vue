<template>
     <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="warning"
                dark
                flat
              >
                <v-toolbar-title>Harmony trading Authentification</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    type="text"
                    v-model="username"  
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn 
                  color="warning"
                  block
                  v-on:click="login()">Se connecter</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar
          :color="colorMessage"
          v-model="printMessage"
          :timeout="2000"
        >
          {{ message }}
          <v-btn
            color="blue"
            text
            @click="printMessage = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
</template>

<script>

export default {
  name: 'Login',
  props: {
    source: String,
  },
  data(){
    return {
                username: "",
                password: "",
                printMessage: false,
                message: '',
                colorMessage: '',
            }
  },
  methods: {
      login() {
          if(this.login != "" && this.password != "" && this.username == "harmony19" && this.password == "2019@harmony") {
              this.$router.push("/home");
          } else{
            this.message = "Informations incorrectes"
            this.colorMessage = 'error'
            this.printMessage = true
          }
      }
  }
};
</script>
