<template>
  <v-app>
    <v-main>
      <ClientList
        :clients="clients"
        :providers="providers"
        @refresh="fetchData"
      />
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
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await api.get("/all");
      this.clients = res.data.data.clients;
      this.providers = res.data.data.providers;
    },
  },
};
</script>
