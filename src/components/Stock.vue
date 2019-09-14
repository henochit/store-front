<template>
  <v-container class="grey lighten-5">
    <v-app-bar
      color="amber accent-3"
      dense
    >
      <v-toolbar-title>Stock</v-toolbar-title>
    </v-app-bar>
    <br/>
      <v-card>
          <v-card-title>
            Produit
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
             <v-select
                    v-model="categorie"
                    :items="categories"
                    label="Categorie"
                    item-text="label"
                    item-value="id"
                    v-on:change="byCategorie()"
                  ></v-select>
          </v-card-title>
           <v-data-table
              :headers="headers"
              :items="produitsTemp"
              :search="search"
              sort-by="nom"
              dense
              class="elevation-1"
            >
              <template v-slot:item.packetage="{ item }">
                <span>{{ item.packetage.label }}</span>
              </template>
              <template v-slot:item.categorie="{ item }">
                <span>{{ item.categorie.label }}</span>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reinitialiser</v-btn>
              </template>
          </v-data-table>
        </v-card>
      
    <br/>
              <v-btn
                      color="success"
                      @click="exportPdf()"
                    >
                      Imprimer la liste
                    </v-btn>
  </v-container>
</template>

<script>

  import jsPDF from 'jspdf'
  import * as autoTable from 'jspdf-autotable'
  
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
      ],
      produits: [],
      categorie: "",
      search: "",
      packetages: [],
      categories: [],
      produitsTemp: [],
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
        this.categories = (await this.axios.get('http://localhost:1337/categorie')).data;
        this.produitsTemp = this.produits;
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
      byCategorie(){
          var cat = this.categorie 

          this.produitsTemp = this.produits.filter(function (e) {
                            return (e.categorie.id == cat);
                        });

        },getCatName(id) {
          for(var cat of this.categories){
            if(cat.id == id){
              return cat.label;
            }
          }
      },exportPdf(){
          var vm = this
          
          var columns = ["Code","Produit", "Categorie", "Packetage", "Quantite"]; 

          var rows = [];

          for(let e of vm.produitsTemp){
              rows.push([e.code, e.nom, e.categorie.label, e.packetage.label, e.stock])
          }

          var title = 'Liste des produits';

          if(vm.categorie != null){
            title = title + ' de la categorie ' + vm.getCatName(vm.categorie)
          }
            
          var doc = new jsPDF('p', 'pt');
          doc.text(title,20,20)
          doc.autoTable(columns, rows);
          doc.save(title+'.pdf');
        }
    },
  }
</script>
