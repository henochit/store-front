<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>
import Login from './components/Login';

export default {
  name: 'App',
  components: {
    Login,
  },
  data: () => ({
    //
  }),
};
</script>
