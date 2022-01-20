<template>
  <v-app>
    <v-main>
      <ClientList :clients="clients" :providers="providers" />
    </v-main>
  </v-app>
</template>

<script>
import ClientList from "./components/ClientList";
import api from "./utils/api";

export default {
  name: "App",
  components: {
    ClientList,
  },
  data() {
    return {
      clients: [],
      providers: [],
    };
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    async fetchClients() {
      const res = await api.get("/all");
      this.clients = res.data.data.clients;
      this.providers = res.data.data.providers;
    },
  },
};
</script>
