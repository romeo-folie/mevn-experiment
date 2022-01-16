<template>
  <v-app>
    <v-main>
      <ClientList />
    </v-main>
  </v-app>
</template>

<script>
import ClientList from "./components/ClientList";

export default {
  name: "App",

  components: {
    // HelloWorld,
    ClientList,
  },

  data: () => ({
    //
  }),
};
</script>
