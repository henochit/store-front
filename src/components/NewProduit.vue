<template>
  <v-container class="grey lighten-5">
    <v-app-bar
      color="amber accent-3"
      dense
    >
      <v-toolbar-title>Nouveau produit</v-toolbar-title>
    </v-app-bar>

    <br/>

    <v-row no-gutters>
      <v-col cols="6" sm="4">
        <v-img
              src="../assets/prod.png"
            ></v-img>
      </v-col>
      <v-col cols="6" sm="8">
           <v-form
                ref="form"
                lazy-validation
              >
                <v-text-field
                  v-model="code"
                  label="Code"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="nom"
                  label="Nom"
                  required
                ></v-text-field>

                <v-row no-gutters>
                  <v-col cols="10" sm="10">
                    <v-select
                      v-model="categorie"
                      :items="categories"
                      item-text="label"
                      item-value="id"
                      label="categorie"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="2" sm="2">
                    <v-btn
                      color="success"
                      @click.stop="dialogCat = true"
                    >
                      +
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="10" sm="10">
                    <v-select
                      v-model="packetage"
                      :items="packetages"
                      item-text="label"
                      item-value="id"
                      label="packetage"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="2" sm="2">
                    <v-btn
                      color="success"
                      @click.stop="dialog = true"
                    >
                      +
                    </v-btn>
                  </v-col>
                </v-row>

                      <v-toolbar flat color="white">
                        <div class="flex-grow-1"></div>
                        <v-dialog v-model="dialog" max-width="500px">
                          <v-card>
                           <v-card-title class="headline">Nouveau Packetage</v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="6" md="12">
                                     <v-text-field v-model="newPack" label="Nom"></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <div class="flex-grow-1"></div>
                              <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
                              <v-btn color="blue darken-1" text @click="newPacketage()">Enregistrer</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                      <v-toolbar flat color="white">
                        <div class="flex-grow-1"></div>
                        <v-dialog v-model="dialogCat" max-width="500px">
                          <v-card>
                           <v-card-title class="headline">Nouvelle Categorie</v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="6" md="12">
                                     <v-text-field v-model="newCat" label="Nom"></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <div class="flex-grow-1"></div>
                              <v-btn color="blue darken-1" text @click="dialogCat = false">Annuler</v-btn>
                              <v-btn color="blue darken-1" text @click="newCategorie()">Enregistrer</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>

                <v-btn
                  color="success"
                  class="mr-10"
                  @click="newProduit()"
                >
                  Enregister 
                </v-btn>

              </v-form>
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
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      printMessage: false,
      message: '',
      colorMessage: '',
      dialog: false,
      dialogCat: false,
      categories: [],
      packetages: [],
      code: "",
      nom: "",
      categorie: null,
      packetage: null,
      newPack: "",
      newCat: "",
    }),
    methods : {
      async newPacketage(){
        try {
          await this.axios.post('http://localhost:1337/packetage', {
                    label: this.newPack,
                });

          this.initialisation();
          this.newPack="";
          this.dialog = false;

          this.message = "Packetage Inseré"
          this.colorMessage = "success"
          this.printMessage = true
        }
        catch(error) {
          this.message = "Erreur de connexion au serveur"
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
        
      },
      async newCategorie(){
        try {
          await this.axios.post('http://localhost:1337/categorie', {
                    label: this.newCat,
                });

          this.initialisation();
          this.newCat = "";
          this.dialogCat = false;


          this.message = "Categorie Inserée"
          this.colorMessage = "success"
          this.printMessage = true
        }
        catch(error) {
          this.message = "Erreur de connexion au serveur"
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
        
      },
      async newProduit(){
        try {
          await this.axios.post('http://localhost:1337/produit', {
                    code: this.code,
                    nom: this.nom,
                    packetage: this.packetage,
                    stock: 0,
                    categorie: this.categorie
                });

          this.code = "";
          this.nom = "";
          this.packetage = null;
          this.categorie = null;


          this.message = "Produit Inseré"
          this.colorMessage = "success"
          this.printMessage = true
        }
        catch(error) {
          this.message = "Erreur de connexion au serveur"
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
        
      },
      async initialisation(){
        try {
        this.categories = (await this.axios.get('http://localhost:1337/categorie')).data;
        this.packetages = (await this.axios.get('http://localhost:1337/packetage')).data;
      
        }
        catch(error) {
            this.message = "Erreur de connexion au serveur"
            this.colorMessage = "error"
            this.printMessage = true
            console(error);
        }
      }
    },
    async mounted () {
        this.initialisation();
    }
  }
</script>
