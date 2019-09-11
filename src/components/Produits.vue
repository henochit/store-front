<template>
  <v-container class="grey lighten-5">
    <v-app-bar
      color="amber accent-3"
      dense
    >
      <v-toolbar-title>Produits</v-toolbar-title>
      </v-menu>
    </v-app-bar>

    <br/>
       <v-data-table
    :headers="headers"
    :items="produits"
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
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="save">Enregistrer</v-btn>
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
        packetage: null,
        categorie: null,
      },
      defaultItem: {
        name: '',
        code: '',
        packetage: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    async mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        this.produits = (await this.axios.get('http://localhost:1337/produit')).data;
      },

      editItem (item) {
        this.editedIndex = this.produits.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
