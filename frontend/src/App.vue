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
    ClientList,
  },
  // perform call to get clients and related providers
  // pass them to the clientlist component
};
</script>
