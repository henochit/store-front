<template>
  <v-container class="grey lighten-5">
    <v-app-bar
      color="amber accent-3"
      dense
    >
      <v-toolbar-title>Produits</v-toolbar-title>
    </v-app-bar>

    <br/>
    <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
       <v-data-table
    :headers="headers"
    :items="produits"
    :search="search"
    sort-by="nom"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.nom" label="Nom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.code" label="Code"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                  <v-select
                      v-model="categorie"
                      :items="categories"
                      item-text="label"
                      item-value="id"
                      label="categorie"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                  <v-select
                      v-model="packetage"
                      :items="packetages"
                      item-text="label"
                      item-value="id"
                      label="packetage"
                      required
                    ></v-select>
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
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="updateProduit()">Enregistrer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.packetage="{ item }">
      <span>{{ item.packetage.label }}</span>
    </template>
    <template v-slot:item.categorie="{ item }">
      <span>{{ item.categorie.label }}</span>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-border-color 
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reinitialiser</v-btn>
    </template>
  </v-data-table>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      printMessage: false,
      message: '',
      colorMessage: '',
      search: "",
      headers: [
        {
          text: 'Noms',
          align: 'left',
          sortable: false,
          value: 'nom',
        },
        { text: 'Codes', value: 'code' },
        { text: 'Packetage', value: 'packetage' },
        { text: 'Categorie', value: 'categorie' },
        { text: 'Stock', value: 'stock' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      produits: [],
      packetages: [],
      categories: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        code: '',
        id: '',
      },
      packetage: null,
      categorie: null,
      defaultItem: {
        name: '',
        code: '',
        packetage: 0,
      },
    }),

    async mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        try {
          this.produits = (await this.axios.get('http://localhost:1337/produit')).data;
          this.categories = (await this.axios.get('http://localhost:1337/categorie')).data;
          this.packetages = (await this.axios.get('http://localhost:1337/packetage')).data;
      
        }
        catch(error) {
          this.message = "Erreur de connexion au serveur"
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
      },
      async updateProduit(){
        try {
          await this.axios.put('http://localhost:1337/produit/'+this.editedItem.id, {
                    code: this.editedItem.code,
                    nom: this.editedItem.nom,
                    packetage: this.packetage,
                    categorie: this.categorie
                });

          
          this.message = "Produit Modifié"
          this.colorMessage = "success"
          this.printMessage = true

          this.produits = (await this.axios.get('http://localhost:1337/produit')).data;
        }
        catch(error) {
          this.message = "Erreur de connexion au serveur"
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
      },

      editItem (item) {
        this.editedItem = item
        this.categorie = item.categorie.id
        this.packetage = item.packetage.id
        this.dialog = true
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
    },
  }
</script>
