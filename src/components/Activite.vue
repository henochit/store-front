<template>
  <v-container class="grey lighten-5">
     <v-app-bar
      color="amber accent-3"
      dense
    >
      <v-toolbar-title>fournisseurs</v-toolbar-title>
    </v-app-bar>
    <br/>
    <v-row>
      <v-col class="spacing-playground py-0 px-2"  cols="12" sm="4">
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
            :items="fournisseurs"
            :search="search"
            dense
          >
          <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="addFournisseur(item)"
          >
            mdi-basket 
          </v-icon>
        </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col class="spacing-playground py-2 px-2" cols="12" sm="8">
        <v-card>
              <v-card-title>
                Compte du fournisseur : 
                <div class="flex-grow-1"></div>
              </v-card-title>
              <template>
                <v-row>
                <v-col cols="4" sm="4" md="4">
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
                <v-col cols="4" sm="4" md="4">
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
                <v-col cols="2" sm="2" md="2">
                   <v-btn
                      color="success"
                      @click="fromTo()"
                    >
                      <v-icon>mdi-magnify </v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="2" sm="2" md="2">
                  <v-btn color="success"@click.stop="modal = true"
                    >
                      +
                    </v-btn>
                </v-col>
              </v-row>
              <v-toolbar flat color="white">
                        <div class="flex-grow-1"></div>
                        <v-dialog v-model="modal" max-width="500px">
                          <v-card>
                           <v-card-title class="headline">Nouvelle ligne</v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="6" md="12">
                                     <v-menu
                                        v-model="menu3"
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
                                        <v-date-picker v-model="dateDebut" @input="menu3 = false"></v-date-picker>
                                      </v-menu>
                                     <v-text-field v-model="newPack" label="Ref"></v-text-field>
                                     <v-text-field v-model="newPack" label="Narration"></v-text-field>
                                     <v-select
                                      v-model="type"
                                      :items="types"
                                      label="types"
                                      required
                                    ></v-select>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <div class="flex-grow-1"></div>
                              <v-btn color="blue darken-1" text @click="modal = false">Annuler</v-btn>
                              <v-btn color="blue darken-1" text @click="">Enregistrer</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                <v-simple-table dense>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Ref</th>
                      <th>Narration</th>
                      <th>Debit</th>
                      <th>Credit</th>
                      <th>Running balance</th>
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
          menu2: false,
          modal: false,
          menu1: false,
          menu3: false,
          printMessage: false,
          message: '',
          colorMessage: '',
          headers: [
          {
            text: 'Noms',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          { text: 'Actions', value: 'action', sortable: false }],  
          produits: [],
          types: ['Debut','Credit'],
          packetages: [],
          fournisseurs: [],
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
          this.fournisseurs = (await this.axios.get('http://localhost:1337/fournisseur')).data;

        }
        catch(error) {
          this.message = "Erreur de connexion au serveur"
          this.colorMessage = "error"
          this.printMessage = true
          console.error(error);
        }
      },
      addFournisseur(item) {
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