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
      providers: []
    };
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    async fetchClients() {
      //TODO: setup endpoint that returns both clients and providers
      // this is so I don't have to make two requests here 
      const clientRes = await api.get("/clients");
      const proRes = await api.get("/providers");
      this.clients = clientRes.data.data;
      this.providers = proRes.data.data;
    },
  },
};
</script>
