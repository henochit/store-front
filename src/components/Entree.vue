<template>
  <v-container class="grey lighten-5">
     <v-app-bar
      color="amber accent-3"
      dense
    >
      <v-toolbar-title>Nouvel entree</v-toolbar-title>
    </v-app-bar>
    <br/>
    <v-row>
      <v-col cols="12" sm="6">
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
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="produits"
            :search="search"
            dense
          >
          <template v-slot:item.packetage="{ item }">
            <span>{{ item.packetage.label }}</span>
          </template>
          <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="addProduit(item)"
          >
            mdi-basket 
          </v-icon>
        </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col class="spacing-playground py-0 px-2" cols="12" sm="6">
        <v-card>
          <v-card-text>
              <v-row>
              <v-col cols="3" sm="3">
                <v-text-field
                  v-model="produitSelect.nom"
                  label="Product"
                  required
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="3">
                <v-text-field
                  v-model="motif"
                  label="Motif"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="3">
                <v-text-field
                  v-model="qte"
                  label="Qte"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="3">
                <v-btn
                  color="success"
                  @click="pushEntree()"
                >
                  +
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <br/>

        <v-card>
              <v-card-title>
                Entree
                <div class="flex-grow-1"></div>
              </v-card-title>
              <template>
                <v-simple-table dense dark>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Qte</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in entrees" :key="item.produit.id">
                      <td>{{ item.produit.nom }}</td>
                      <td>{{ item.qte }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </template>
          <v-btn
            block
            color="success"
            @click="saveEntree()">
            Valider les entrees
          </v-btn>
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
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data () {
        return {
          search: '',
          printMessage: false,
          message: '',
          colorMessage: '',
          headers: [
          {
            text: 'Noms',
            align: 'left',
            sortable: false,
            value: 'nom',
          },
          { text: 'Packetage', value: 'packetage' },
          { text: 'Stock', value: 'stock' },
          { text: 'Actions', value: 'action', sortable: false }],  
          produits: [],
          packetages: [],
          entrees: [],
          qte: 0,
          motif: '',
          produitSelect: {
              nom: '',
              code: '',
              packetage: null,
              categorie: null,
            },
        }
      },
    async mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        try {
          this.packetages = (await this.axios.get('http://localhost:1337/packetage')).data;
          this.produits = (await this.axios.get('http://localhost:1337/produit')).data;

          for(let produit of this.produits) {
            for(let pack of this.packetages){
                if(produit.packetage == pack.id){
                  produit.packetage = pack.label;
                  break;
                }
              }
          }
        }
        catch(error) {
          this.message = "Erreur de connexion au serveur"
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
      },
      addProduit(item) {
        this.produitSelect = Object.assign({}, item);
      },
      pushEntree(){

        if(isNaN(Number(this.qte)) || Number(this.qte) <= 0) return false;

        for(let entree of this.entrees){
          if(entree.produit.id == this.produitSelect.id){
            entree.qte = entree.qte + Number(this.qte);
            this.qte = 0;
            return true;
          }
        }
        this.entrees.push({ 
          produit: this.produitSelect,
          qte: Number(this.qte),
          motif: this.motif});
        this.qte = 0;
      },
      async saveEntree(){
         try {
          var date = new Date();
          var dateStr= date.getFullYear() + '-' +(date.getMonth() + 1) + '-' + date.getDate();
          
          for(let entree of this.entrees){

            await this.axios.post('http://localhost:1337/entree', {
                      date: dateStr,
                      quantite: entree.qte,
                      produit: entree.produit.id,
                      motif: entree.motif
                  });
          }

          this.entrees = [];
          this.initialize();

          this.message = "Entrées Inserées"
          this.colorMessage = "success"
          this.printMessage = true
          
        }catch(error) {
          this.message = "Erreur de connexion au serveur"
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
      }
    }
  }
</script>

/*
delimiter |

CREATE TRIGGER UpdateStkIn BEFORE INSERT ON entree
  FOR EACH ROW BEGIN
    UPDATE produit SET stock = stock + NEW.quantite WHERE id = NEW.produit;
  END;
|

delimiter |

CREATE TRIGGER UpdateStkOut BEFORE INSERT ON sortie
  FOR EACH ROW BEGIN
    UPDATE produit SET stock = stock - NEW.quantite WHERE id = NEW.produit;
  END;
|
*/