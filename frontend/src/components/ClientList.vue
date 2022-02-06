<template>
  <div>
    <v-container>
      <v-row class="mb-5 mt-5">
        <h2>List of Clients</h2>
      </v-row>
      <v-card>
        <v-card-title>
          <v-col md="3">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-dialog v-model="newClientDialog" max-width="50%">
            <template v-slot:activator="{on, attrs}">
              <v-btn elevation="2" v-bind="attrs" v-on="on">New Client</v-btn>
            </template>
            <NewClientForm
              :providers="providers"
              :editedProvider="editedProvider"
              :editProviderDialog="editProviderDialog"
              @addClient="addClient"
              @addProvider="addProvider"
              @updateProvider="updateProvider"
              @deleteProvider="deleteProvider"
              @addCheckboxChange="addCheckboxChange"
              @closeNewClientDialog="closeNewClientDialog"
            />
          </v-dialog>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="clients"
          :search="search"
          :items-per-page="10"
        >
          <template v-slot:item.providers="{item}">
            <td>{{ listProviders(item.providers) }}</td>
          </template>
          <template v-slot:item.actions="{item}">
            <v-dialog
              v-model="editClientDialog"
              max-width="50%"
              :retain-focus="false"
            >
              <template v-slot:activator="{on, attrs}">
                <v-btn
                  elevation="2"
                  @click="editClient(item)"
                  class="mr-4"
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  >Edit</v-btn
                >
              </template>
              <EditClientForm
                :providers="providers"
                :editedClient="editedClient"
                v-bind.sync="editedClient"
                @addProvider="addProvider"
                @pushProvider="pushProvider"
                @removeProvider="removeProvider"
                @updateClient="updateClient"
                @deleteClient="deleteClient"
                @deleteProvider="deleteProvider"
                @updateProvider="updateProvider"
                @closeClientEditDialog="closeClientEditDialog"
              />
            </v-dialog>
            <v-dialog
              v-model="deleteClientDialog"
              max-width="500px"
              :retain-focus="false"
            >
              <template v-slot:activator="{on, attrs}">
                <v-btn
                  elevation="2"
                  color="red"
                  dark
                  x-small
                  v-on="on"
                  @click="setClientToDelete(item._id)"
                  v-bind="attrs"
                  >Delete</v-btn
                >
              </template>
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeClientDeleteDialog"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteClient(clientToDelete)"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-dialog v-model="loading" fullscreen>
      <v-container
        fluid
        fill-height
        style="background-color: rgba(0, 0, 0, 0.5)"
      >
        <v-layout justify-center align-center>
          <v-progress-circular indeterminate color="black">
          </v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import api from "../utils/api";
import NewClientForm from "./NewClientForm.vue";
import EditClientForm from "./EditClientForm.vue";

export default {
  name: "ClientList",
  props: ["clients", "providers"],
  components: {
    NewClientForm,
    EditClientForm,
  },
  data() {
    return {
      search: "",
      clientToDelete: "",
      checkboxDefault: false,
      loading: false,
      newClientDialog: false,
      editClientDialog: false,
      deleteClientDialog: false,
      editProviderDialog: false,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        {text: "Email", value: "email"},
        {text: "Phone", value: "phone"},
        {
          text: "Providers",
          value: "providers",
          sortable: false,
        },
        {text: "Actions", value: "actions", sortable: false, align: "center"},
      ],
      newProvider: {name: ""},
      editedProvider: {
        name: "",
      },
      editedClient: {
        id: "",
        name: "",
        email: "",
        phone: "",
        providers: [],
      },
    };
  },
  methods: {
    setClientToDelete(id) {
      this.clientToDelete = id;
    },
    closeNewClientDialog() {
      this.newClientDialog = false;
    },
    closeClientEditDialog() {
      this.editClientDialog = false;
    },
    closeClientDeleteDialog() {
      this.clientToDelete = "";
      this.deleteClientDialog = false;
    },
    addCheckboxChange(val, pro, newClient) {
      if (val) {
        const exists = newClient.providers.find((el) => el === pro._id);

        if (!exists) {
          newClient.providers.push(pro._id);
        }
      } else {
        const idx = newClient.providers.indexOf(pro._id);
        newClient.providers.splice(idx, 1);
      }
    },
    listProviders(pros) {
      if (pros.length) {
        const names = pros.map(
          (pro) => this.providers.find((el) => el._id === pro).name
        );

        return names.join(", ");
      }
    },
    editClient(item) {
      this.editedClient = {
        id: item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        providers: [...item.providers],
      };
    },
    pushProvider(providerId) {
      this.editedClient.providers.push(providerId);
    },
    removeProvider(providerId) {
      const idx = this.editedClient.providers.indexOf(providerId);
      this.editedClient.providers.splice(idx, 1);
    },
    async addProvider(newProvider) {
      try {
        this.loading = true;
        await api.post("/providers", newProvider);
        this.$emit("refresh");
        // this.providers.push(res.data.data);
        this.$toastr.s("Successfully added provider", "Success");
      } catch (error) {
        // console.log("error adding provider ", error);
        this.$toastr.e("Failed to add provider", "Error");
      }
      this.loading = false;
    },
    async deleteProvider(id) {
      try {
        this.loading = true;
        await api.delete(`/providers/${id}`);

        if (this.editedClient.providers.length) {
          const idx = this.editedClient.providers.indexOf(id);
          this.editedClient.providers.splice(idx, 1);
        }

        this.$emit("refresh");
        this.$toastr.s("Successfully deleted provider", "Success");
      } catch (error) {
        // console.log("error deleting provider ", error);
        this.$toastr.e("Failed to delete provider", "Error");
      }
      this.loading = false;
    },
    async updateProvider(proId, updatedProvider) {
      try {
        this.loading = true;
        await api.put(`/providers/${proId}`, updatedProvider);
        this.$emit("refresh");
        // this.closeProviderEditDialog();
        this.$toastr.s("Successfully updated provider", "Success");
      } catch (error) {
        // console.log("error updating provider ", error);
        this.$toastr.e("Failed to update provider", "Error");
      }
      this.loading = false;
    },
    async addClient(newClient) {
      try {
        this.loading = true;
        await api.post("/clients", newClient);
        this.$emit("refresh");
        this.closeNewClientDialog();
        this.$toastr.s("Successfully added client", "Success");
      } catch (error) {
        // console.log("error adding client ", error);
        this.$toastr.e("Failed to add client", "Error");
      }
      this.loading = false;
    },
    async deleteClient(id) {
      try {
        // remove deleted provider from list of edited client providers
        // this is so that updates to the client will not send deleted data to the api
        this.loading = true;
        await api.delete(`/clients/${id}`);
        this.closeClientEditDialog();
        this.$emit("refresh");
        this.closeClientDeleteDialog();
        this.$toastr.s("Successfully deleted client", "Success");
      } catch (error) {
        // console.log("error deleting client ", error);
        this.$toastr.e("Failed to delete client", "Error");
      }
      this.loading = false;
    },
    async updateClient(id) {
      try {
        this.loading = true;
        await api.put(`/clients/${id}`, this.editedClient);
        this.$emit("refresh");
        this.closeClientEditDialog();
        this.$toastr.s("Updated client", "Success");
      } catch (error) {
        // console.log("error updating client ", error);
        this.$toastr.e("Failed to update client", "Error");
      }
      this.loading = false;
    },
  },
};
</script>

<style>
.modal-title {
  color: #517885;
}

.form-group {
  width: inherit;
}

.form-group:not(:last-of-type) {
  margin-bottom: 30px;
}

.form-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  padding: 20px 0;
}

.label {
  color: black;
  font-weight: bold;
}

.form-group input {
  border: 0.5px solid black;
  padding: 6px;
  width: 100%;
  border-radius: 4px;
}

.form-group input:focus {
  outline: none;
}

button {
  text-transform: capitalize !important;
}

.provider-list {
  border: 0.5px solid black;
  border-radius: 4px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
}

i {
  cursor: pointer !important;
}

.error-text {
  color: red;
}

.group-error {
  border: 1px solid red !important;
}
</style>
