<template>
  <v-container class="grey lighten-5">
    <v-app-bar
      color="amber accent-3"
      dense
    >
      <v-toolbar-title>Liste des fournisseurs</v-toolbar-title>
    </v-app-bar>

    <br/>
     <v-row no-gutters>
      <v-col cols="6" sm="8">
           <v-form
                ref="form"
                lazy-validation
              >
                <v-text-field
                  v-model="name"
                  label="Nom"
                  required
                ></v-text-field>
                <v-btn
                  color="success"
                  class="mr-10"
                  @click="newFournisseur()"
                >
                  Enregister 
                </v-btn>

              </v-form>
      </v-col>

      <v-col cols="6" sm="4">
        <v-img
              src="../assets/four.jpg"
            ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      printMessage: false,
      name: '',
      }),

    methods: {
      async newFournisseur() {
        try {
          await this.axios.post('http://localhost:1337/fournisseur', {
                    name: this.name
                });

          this.name = "";
        }
        catch(error) {
          this.message = "Erreur "
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
      },
    },
  }
</script>
