<template>
  <div>
    <v-tabs
      v-model="tab"
      class="elevation-2"
      dark
      :centered="true"
      :grow="true"
      :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
      :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        :href="`#tab1`"
      >
        Entrees
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>
      <v-tab
        :href="`#tab2`"
      >
        Sorties
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>
      <v-tab
        :href="`#tab3`"
      >
        Entrees & Sorties
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>

      <v-tab-item
        :value="'tab1'"
      >
        <v-card
          flat
          tile
        >
          <v-card-text>
            <template>
              <v-row>
    <v-col cols="12" sm="6" md="4">
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
            v-model="date"
            label="Date debut"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" sm="6" md="4">
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
            v-model="date"
            label="Date fin"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
      </v-menu>
    </v-col>
    <div class="flex-grow-1"></div>
  </v-row>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item
        :value="'tab2'"
      >
        <v-card
          flat
          tile
        >
          <v-card-text>
            <template>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>
      
      <v-tab-item
        :value="'tab3'"
      >
        <v-card
          flat
          tile
        >
          <v-card-text>
            <template>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </template>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
  }
</script>