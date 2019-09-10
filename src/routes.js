
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import NewProduit from './components/NewProduit.vue'
import Produits from './components/Produits.vue'
import Entree from './components/Entree.vue'
import Sortie from './components/Sortie.vue'
import RapportEntree from './components/RapportEntree.vue'
import RapportSortie from './components/RapportSortie.vue'
import Stock from './components/Stock.vue'


const routes = [
    { path: '/', component: Login, name: "login" },
    { path: '/home', component: Home, name: "home" ,
    children: [
        { path: '/newProduit', component: NewProduit, name: "newProduit" },
        { path: '/produits', component: Produits, name: "produits" },
        { path: '/entree', component: Entree, name: "entree" },
        { path: '/sorie', component: Sortie, name: "sortie" },
        { path: '/rapportEntree', component: RapportEntree, name: "rapportEntree" },
        { path: '/rapportSortie', component: RapportSortie, name: "rapportSortie" },
        { path: '/stock', component: Stock, name: "stock" }
    ]}
  ];

export default routes;