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
              :newProvider="newProvider"
              :editedProvider="editedProvider"
              :editProviderDialog="editProviderDialog"
              @addClient="addClient"
              @addProvider="addProvider"
              @update:provider="setProvider"
              @addCheckboxChange="addCheckboxChange"
              @closeNewClientDialog="closeNewClientDialog"
              @closeProviderEditDialog="closeProviderEditDialog"
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
              <v-card>
                <v-card-title>
                  <h3 class="modal-title">Edit Client</h3>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                  <v-container class="form-wrap">
                    <div class="form-group">
                      <v-row>
                        <v-col cols="2" class="d-flex justify-end align-center">
                          <span class="label">Name:</span>
                        </v-col>
                        <v-col cols="10">
                          <input type="text" v-model="editedClient.name" />
                        </v-col>
                      </v-row>
                    </div>

                    <div class="form-group">
                      <v-row>
                        <v-col cols="2" class="d-flex justify-end align-center">
                          <span class="label">Email:</span>
                        </v-col>
                        <v-col cols="10">
                          <input type="text" v-model="editedClient.email" />
                        </v-col>
                      </v-row>
                    </div>

                    <div class="form-group">
                      <v-row>
                        <v-col cols="2" class="d-flex justify-end align-center">
                          <span class="label">Phone:</span>
                        </v-col>
                        <v-col cols="10">
                          <input type="text" v-model="editedClient.phone" />
                        </v-col>
                      </v-row>
                    </div>

                    <div class="form-group">
                      <v-row>
                        <v-col cols="2" class="d-flex justify-end align-center">
                          <span class="label">Provider:</span>
                        </v-col>
                        <v-col cols="10">
                          <v-row>
                            <v-col cols="8">
                              <input type="text" v-model="newProvider.name" />
                            </v-col>
                            <v-col cols="4">
                              <v-btn
                                elevation="1"
                                width="100%"
                                @click="addProvider"
                                :disabled="!newProvider.name.length"
                                >Add Provider</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>

                    <!-- List of providers -->
                    <div class="form-group">
                      <v-row>
                        <v-col cols="2"></v-col>
                        <v-col cols="10">
                          <v-row>
                            <v-col cols="8">
                              <div
                                class="provider-list"
                                v-show="providers.length"
                              >
                                <v-row
                                  no-gutters
                                  align="center"
                                  v-for="pro in providers"
                                  :key="pro._id"
                                >
                                  <v-col cols="8">
                                    <v-checkbox
                                      :label="pro.name"
                                      :input-value="checkRelation(pro)"
                                      @change="editCheckboxChange($event, pro)"
                                      dense
                                      hide-details
                                      color="black"
                                    ></v-checkbox>
                                  </v-col>

                                  <v-col
                                    cols="2"
                                    class="d-flex justify-center align-center"
                                  >
                                    <v-dialog
                                      v-model="editProviderDialog"
                                      max-width="40%"
                                      persistent
                                      :retain-focus="false"
                                    >
                                      <template v-slot:activator="{on, attrs}">
                                        <v-icon
                                          dense
                                          color="black"
                                          v-bind="attrs"
                                          v-on="on"
                                          @click="editProvider(pro)"
                                          >mdi-pencil-box-multiple-outline</v-icon
                                        >
                                      </template>
                                      <v-card>
                                        <v-card-title>
                                          <v-row
                                            justify="space-between"
                                            class="py-2"
                                          >
                                            <h3 class="modal-title">
                                              Edit Provider
                                            </h3>
                                            <v-icon
                                              dense
                                              @click="closeProviderEditDialog"
                                            >
                                              mdi-close-circle
                                            </v-icon>
                                          </v-row>
                                        </v-card-title>

                                        <v-divider></v-divider>

                                        <v-card-text>
                                          <v-container class="form-wrap">
                                            <div class="form-group">
                                              <v-row>
                                                <v-col
                                                  cols="2"
                                                  class="d-flex justify-end align-center"
                                                >
                                                  <span class="label"
                                                    >Provider:</span
                                                  >
                                                </v-col>
                                                <v-col cols="10">
                                                  <v-row>
                                                    <v-col cols="8">
                                                      <input
                                                        type="text"
                                                        v-model="
                                                          editedProvider.name
                                                        "
                                                      />
                                                    </v-col>
                                                    <v-col cols="4">
                                                      <v-btn
                                                        elevation="1"
                                                        @click="
                                                          updateProvider(
                                                            pro._id
                                                          )
                                                        "
                                                        >Update Provider</v-btn
                                                      >
                                                    </v-col>
                                                  </v-row>
                                                </v-col>
                                              </v-row>
                                            </div>
                                          </v-container>
                                        </v-card-text>
                                      </v-card>
                                    </v-dialog>
                                  </v-col>

                                  <v-col
                                    cols="2"
                                    class="d-flex justify-center align-center"
                                  >
                                    <v-icon
                                      @click="deleteProvider(pro._id)"
                                      dense
                                      color="black"
                                      >mdi-delete</v-icon
                                    >
                                  </v-col>
                                </v-row>
                              </div>
                            </v-col>
                            <v-col cols="4"></v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-container>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn
                    color="red"
                    dark
                    elevation="1"
                    @click="deleteClient(editedClient.id)"
                  >
                    Delete client
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="closeClientEditDialog"
                    elevation="1"
                    class="mr-4"
                  >
                    Cancel
                  </v-btn>
                  <v-btn elevation="1" @click="updateClient(editedClient.id)">
                    Update client
                  </v-btn>
                </v-card-actions>
              </v-card>
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
import {required, email, numeric} from "vuelidate/lib/validators";
import NewClientForm from "./NewClientForm.vue";

export default {
  name: "ClientList",
  props: ["clients", "providers"],
  components: {
    NewClientForm,
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
  validations: {
    editedClient: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        numeric,
      },
    },
  },
  methods: {
    setProvider(val) {
      this.newProvider.name = val.trim();
    },
    setClientToDelete(id) {
      this.clientToDelete = id;
    },
    closeNewClientDialog() {
      this.newClientDialog = false;
    },
    closeClientEditDialog() {
      this.editedClient = {
        id: "",
        name: "",
        email: "",
        phone: "",
        providers: [],
      };
      this.editClientDialog = false;
    },
    closeClientDeleteDialog() {
      this.clientToDelete = "";
      this.deleteClientDialog = false;
    },
    closeProviderEditDialog() {
      this.editedProvider.name = "";
      this.editProviderDialog = false;
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
    editCheckboxChange(val, pro) {
      if (val) {
        const exists = this.editedClient.providers.find((el) => el === pro._id);

        if (!exists) {
          this.editedClient.providers.push(pro._id);
        }
      } else {
        const idx = this.editedClient.providers.indexOf(pro._id);
        this.editedClient.providers.splice(idx, 1);
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
    editProvider(pro) {
      this.editedProvider = {
        name: pro.name,
      };
    },
    checkRelation(currentProvider) {
      return this.editedClient.providers.some(function (el) {
        return el === currentProvider._id;
      });
    },
    async addProvider() {
      try {
        this.loading = true;
        await api.post("/providers", this.newProvider);
        this.newProvider.name = "";
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
        // TODO: Might have to close modals here
        this.$emit("refresh");

        this.$toastr.s("Successfully deleted provider", "Success");
      } catch (error) {
        // console.log("error deleting provider ", error);
        this.$toastr.e("Failed to delete provider", "Error");
      }
      this.loading = false;
    },
    async updateProvider(id) {
      try {
        this.loading = true;
        await api.put(`/providers/${id}`, this.editedProvider);
        this.$emit("refresh");
        this.closeProviderEditDialog();
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
