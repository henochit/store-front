<template>
  <div>
    <template>
              <v-row>
                <v-col cols="2" sm="2" md="2">
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateDebut"
                        label="Date debut"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateDebut" @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2" sm="2" md="2">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateFin"
                        label="Date fin"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateFin" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="1" sm="1" md="1">
                   <v-btn
                      color="success"
                      @click="fromTo()"
                    >
                      <v-icon>mdi-magnify </v-icon>
                    </v-btn>
                </v-col>
                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>
                <v-col cols="3" sm="3" md="3">
                  <v-select
                    :items="produits"
                    label="Produit"
                    item-text="nom"
                    item-value="produit"
                    :change="byProduit()"
                  ></v-select>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                  <v-select
                    :items="categories"
                    label="Categorie"
                    item-text="label"
                    item-value="id"
                  ></v-select>
                </v-col>
              </v-row>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th class="text-left">Date</th>
                    <th class="text-left">Produit</th>
                    <th class="text-left">Categorie</th>
                    <th class="text-left">Packetage</th>
                    <th class="text-left">Quantite entrees</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in entreesFiltered" :key="item.id">
                    <td>{{ item.createdAt }}</td>
                    <td>{{ item.produit.nom }}</td>
                    <td>{{ item.produit.packetage }}</td>
                    <td>{{ item.produit.categorie }}</td>
                    <td>{{ item.quantite }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </template>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      dateDebut: null,
      dateFin: null,
      menu2: false,
      modal: false,
      menu1: false,
      produits: [],
      categories: [],
      entrees: [],
      entreesFiltered: [],
      produit: null,
      categorie: null, 
      }
    },
    async mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        this.entrees = (await this.axios.get('http://localhost:1337/entree')).data;
        this.produits = (await this.axios.get('http://localhost:1337/produit')).data;
        this.categories = (await this.axios.get('http://localhost:1337/categorie')).data;

        this.entreesFiltered = this.entrees;
      },
      fromTo () {
        if( this.dateDebut != null && this.dateFin != null){
          var dateD = new Date(this.dateDebut);
          var dateF = new Date(this.dateFin);

          this.entreesFiltered = this.entrees.filter(function (e) {
                          return (new Date(e.createdAt) >= dateD && new Date(e.createdAt) <= dateF);
                        });

        }

        
      },
      byProduit(){

          this.entreesFiltered = this.entrees.filter(function (e) {
                            return (e.produit.id == this.produit);
                        });
      }
    }
  }
</script>