<template>
  <v-container class="grey lighten-5">
     <v-app-bar
      color="amber accent-3"
      dense
    >
      <v-toolbar-title>Rapport des sorties</v-toolbar-title>
    </v-app-bar>
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
                <v-col cols="2" sm="2" md="2">
                  <v-select
                    v-model="produit"
                    :items="produits"
                    label="Produit"
                    item-text="nom"
                    item-value="id"
                    v-on:change="byProduit()"
                  ></v-select>
                </v-col>
                <v-col cols="2" sm="2" md="2">
                  <v-select
                    v-model="categorie"
                    :items="categories"
                    label="Categorie"
                    item-text="label"
                    item-value="id"
                    v-on:change="byCategorie()"
                  ></v-select>
                </v-col>
                <v-col cols="2" sm="2" md="2">
                  <v-text-field
                    v-model="motif"
                    v-on:input="byMotif()"
                    label="Motif"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th class="text-left">Date</th>
                    <th class="text-left">Produit</th>
                    <th class="text-left">Packetage</th>
                    <th class="text-left">Categorie</th>
                    <th class="text-left">Quantite sorties</th>
                    <th class="text-left">Motif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in sortiesFiltered" :key="item.id">
                    <td>{{ item.createdAt| moment("D/MM/YYYY - h:mm:ss ") }}</td>
                    <td>{{ item.produit.nom }}</td>
                    <td>{{ getPackName(item.produit.packetage) }}</td>
                    <td>{{ getCatName(item.produit.categorie) }}</td>
                    <td>{{ item.quantite }}</td>
                    <td>{{ item.motif }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
    <br/>
              <v-btn
                      color="success"
                      @click="exportPdf()"
                    >
                      Imprimer Rapport
                    </v-btn>
            </template>
  </v-container>
</template>

<script>

  import jsPDF from 'jspdf'
  import * as autoTable from 'jspdf-autotable'
  import moment from 'moment'

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
      sorties: [],
      sortiesFiltered: [],
      produit: null,
      categorie: null, 
      motif: "",  
      }
    },
    async mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        this.produits = (await this.axios.get('http://localhost:1337/produit')).data;
        this.packetages = (await this.axios.get('http://localhost:1337/packetage')).data;
        this.categories = (await this.axios.get('http://localhost:1337/categorie')).data;
        this.sorties = (await this.axios.get('http://localhost:1337/sortie?sort=createdAt+desc')).data;

        this.sortiesFiltered = this.sorties;
      },
      fromTo () {
        this.produit = null;
        this.categorie = null;

        if( this.dateDebut != null && this.dateFin != null){
          var dateD = new Date(this.dateDebut);
          var dateF = new Date(this.dateFin);

          this.sortiesFiltered = this.sorties.filter(function (e) {
                          return (new Date(e.createdAt) >= dateD && new Date(e.createdAt) <= dateF);
                        });

        }

        
      },
      byProduit(){
          this.categorie = null;
          var prod = this.produit;
          if( this.dateDebut != null && this.dateFin != null){
            var dateD = new Date(this.dateDebut);
            var dateF = new Date(this.dateFin);

            this.sortiesFiltered = this.sorties.filter(function (e) {
                            return (new Date(e.createdAt) >= dateD && new Date(e.createdAt) <= dateF && e.produit.id == prod);
                          });

        }else{
          this.sortiesFiltered = this.sorties.filter(function (e) {
                            return (e.produit.id == prod);
                        });

        }
      },
      byCategorie(){
          this.produit = null;
          var cat = this.categorie;
          if( this.dateDebut != null && this.dateFin != null){
            var dateD = new Date(this.dateDebut);
            var dateF = new Date(this.dateFin);

            this.sortiesFiltered = this.sorties.filter(function (e) {
                            return (new Date(e.createdAt) >= dateD && new Date(e.createdAt) <= dateF && e.produit.categorie == cat);
                          });

        }else{
          this.sortiesFiltered = this.sorties.filter(function (e) {
                            return (e.produit.categorie == cat);
                        });

        }
      },
      byMotif(){
          this.produit = null;
          var motif_ = this.motif;
          if( this.dateDebut != null && this.dateFin != null){
            var dateD = new Date(this.dateDebut);
            var dateF = new Date(this.dateFin);

            this.sortiesFiltered = this.sorties.filter(function (e) {
                            return (new Date(e.createdAt) >= dateD && new Date(e.createdAt) <= dateF && (e.motif.toUpperCase()).includes(motif_.toUpperCase()));
                          });

        }else{
          this.sortiesFiltered = this.sorties.filter(function (e) {
                            return (e.motif.toUpperCase()).includes(motif_.toUpperCase())
                        });

        }
      },getCatName(id) {
          for(var cat of this.categories){
            if(cat.id == id){
              return cat.label;
            }
          }
      },getPackName(id) {
          for(var pk of this.packetages){
            if(pk.id == id){
              return pk.label;
            }
          }
      },getProdName(id) {
          for(var p of this.produits){
            if(p.id == id){
              return p.nom;
            }
          }
      },exportPdf(){
          var vm = this
          
          var columns = ["Date", "Produit", "Categorie", "Packetage", "Quantite", "Motif"]; 

          var rows = [];

          for(let e of vm.sortiesFiltered){
              rows.push([moment(e.createdAt).format('D/MM/YYYY - h:mm:ss '), e.produit.nom, vm.getCatName(e.produit.categorie) , vm.getPackName(e.produit.packetage), e.quantite, e.motif])
          }

          var title = 'Rapport des sorties';

          if(vm.produit != null){
            title = title + ' du produit ' + vm.getProdName(vm.produit)
            if(this.dateDebut != null && this.dateFin != null){
              title = title + " du "+ this.dateDebut +" au "+ this.dateFin;
            }
          }else if(vm.categorie != null){
            title = title + ' de la categorie ' + vm.getCatName(vm.categorie)
            if(this.dateDebut != null && this.dateFin != null){
              title = title + " du "+ this.dateDebut +" au "+ this.dateFin;
            }

          }else{
            if(this.dateDebut != null && this.dateFin != null){
              title = title + " du "+ this.dateDebut +" au "+ this.dateFin;
            }
          }
            
          var doc = new jsPDF('p', 'pt');
          doc.text(title,20,20)
          doc.autoTable(columns, rows);
          doc.save(title+'.pdf');
        }
    }
  }
</script>