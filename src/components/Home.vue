<template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">Harmony<span class="font-weight-light">trading</span></span>
      
      <div class="flex-grow-1"></div>


      <v-btn 
      icon
      v-on:click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    > <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
  
        <v-list-group
          prepend-icon="mdi-archive"
        >
          <template v-slot:activator>
            <v-list-item-title>Produit</v-list-item-title>
          </template>
          <v-list
        dense
        class="lime lighten-5"
      >
          <v-row align="center">
            <v-col cols="6">
              <v-subheader>
                Produit
              </v-subheader>
            </v-col>
          </v-row>
          <v-list-item @click="goTo('/newProduit')">
             <v-list-item-action>
              <v-icon color="green darken-2">mdi-barcode-scan</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
               Nouveau Produit
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="goTo('/produits')">
             <v-list-item-action>
              <v-icon color="green darken-2">mdi-ballot-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
               List des produits
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

      <v-divider
            dark
            class="my-4"
          >
      </v-divider>
          <v-row align="center">
            <v-col cols="6">
              <v-subheader>
                Entree & Sortie
              </v-subheader>
            </v-col>
          </v-row>
          <v-list-item @click="goTo('/entree')">
             <v-list-item-action>
              <v-icon color="green darken-2">mdi-bank-transfer-in </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
               Nouvel Entree
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="goTo('/sorie')">
             <v-list-item-action>
              <v-icon color="green darken-2">mdi-bank-transfer-out </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
               Nouvelle Sortie
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="goTo('/rapportEntree')">
             <v-list-item-action>
              <v-icon color="green darken-2">mdi-basket-fill </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
               Rapport d'entree
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="goTo('/rapportSortie')">
             <v-list-item-action>
              <v-icon color="green darken-2">mdi-basket-unfill</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
               Rapport de sortie
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

      <v-divider
            dark
            class="my-4"
          >
      </v-divider>

          <v-row align="center">
            <v-col cols="6">
              <v-subheader>
                Stock
              </v-subheader>
            </v-col>
          </v-row>
          <v-list-item @click="goTo('/stock')">
             <v-list-item-action>
              <v-icon color="green darken-2">mdi-clipboard-text-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
               Rapport de stock
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
        </v-list-group>

        <v-list-group
          prepend-icon="mdi-account"
        >
          <template v-slot:activator>
            <v-list-item-title>Fournisseur</v-list-item-title>
          </template>
          <v-list
        dense
        class="lime lighten-5"
      >
          <v-list-item @click="goTo('/fournisseur')">
             <v-list-item-action>
              <v-icon color="green darken-2">mdi-account-check</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
               Nouveau fournisseur
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="goTo('/activite')">
             <v-list-item-action>
              <v-icon color="green darken-2">mdi-account-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
               Liste des forunisseurs
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
        </v-list-group>
      </v-list>
      
    </v-navigation-drawer>

    <v-content>
      <v-container
        fluid
        class="lighten-4"
      >
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    methods: {
        goTo( url ) {
            this.$router.push(url);
        },logout() {
              this.$router.push("/");
          } 
    }
  }
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>
