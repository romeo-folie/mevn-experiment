<template>
  <v-app>
    <v-main>
      <ClientList :clients="clients" />
    </v-main>
  </v-app>
</template>

<script>
import ClientList from "./components/ClientList";
import httpClient from "./utils/api";

export default {
  name: "App",
  components: {
    ClientList,
  },
  data() {
    return {
      clients: [],
    };
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    async fetchClients() {
      const res = await httpClient.get("/clients");
      this.clients = res.data.data;
    },
  },
};
</script>
