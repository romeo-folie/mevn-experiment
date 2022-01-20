<template>
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
        <v-dialog v-model="newDialog" max-width="50%">
          <template v-slot:activator="{on, attrs}">
            <v-btn elevation="2" v-bind="attrs" v-on="on">New Client</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h3 class="modal-title">New Client</h3>
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
                      <input type="text" />
                    </v-col>
                  </v-row>
                </div>

                <div class="form-group">
                  <v-row>
                    <v-col cols="2" class="d-flex justify-end align-center">
                      <span class="label">Email:</span>
                    </v-col>
                    <v-col cols="10">
                      <input type="text" />
                    </v-col>
                  </v-row>
                </div>

                <div class="form-group">
                  <v-row>
                    <v-col cols="2" class="d-flex justify-end align-center">
                      <span class="label">Phone:</span>
                    </v-col>
                    <v-col cols="10">
                      <input type="text" />
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
                          <input type="text" />
                        </v-col>
                        <v-col cols="4">
                          <v-btn elevation="1" width="100%" @click="addProvider"
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
                          <div class="provider-list">
                            <v-row
                              no-gutters
                              align="center"
                              v-for="pro in providers"
                              :key="pro.id"
                            >
                              <v-col cols="8">
                                <v-checkbox
                                  :label="pro.name"
                                  dense
                                  hide-details
                                  color="black"
                                ></v-checkbox>
                              </v-col>

                              <v-col
                                cols="2"
                                class="d-flex justify-center align-center"
                              >
                                <v-icon dense color="black"
                                  >mdi-pencil-box-multiple-outline</v-icon
                                >
                              </v-col>

                              <v-col
                                cols="2"
                                class="d-flex justify-center align-center"
                              >
                                <v-icon dense color="black">mdi-delete</v-icon>
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
              <v-spacer></v-spacer>
              <v-btn @click="closeNewDialog" elevation="1" class="mr-4">
                Cancel
              </v-btn>
              <v-btn elevation="1"> Add client </v-btn>
            </v-card-actions>
          </v-card>
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
          <v-dialog v-model="editDialog" max-width="50%">
            <template v-slot:activator="{on, attrs}">
              <v-btn
                elevation="2"
                @click="editItem(item)"
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
                        <input type="text" v-model="editedItem.name" />
                      </v-col>
                    </v-row>
                  </div>

                  <div class="form-group">
                    <v-row>
                      <v-col cols="2" class="d-flex justify-end align-center">
                        <span class="label">Email:</span>
                      </v-col>
                      <v-col cols="10">
                        <input type="text" v-model="editedItem.email" />
                      </v-col>
                    </v-row>
                  </div>

                  <div class="form-group">
                    <v-row>
                      <v-col cols="2" class="d-flex justify-end align-center">
                        <span class="label">Phone:</span>
                      </v-col>
                      <v-col cols="10">
                        <input type="text" v-model="editedItem.phone" />
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
                            <div class="provider-list">
                              <v-row
                                no-gutters
                                align="center"
                                v-for="pro in providers"
                                :key="pro.id"
                              >
                                <v-col cols="8">
                                  <v-checkbox
                                    :label="pro.name"
                                    :input-value="associatedProvider(pro)"
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
                                  <v-icon dense color="black"
                                    >mdi-pencil-box-multiple-outline</v-icon
                                  >
                                </v-col>

                                <v-col
                                  cols="2"
                                  class="d-flex justify-center align-center"
                                >
                                  <v-icon dense color="black"
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
                <v-btn color="red" dark elevation="1"> Delete client </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="closeEditDialog" elevation="1" class="mr-4">
                  Cancel
                </v-btn>
                <v-btn elevation="1"> Update client </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="deleteDialog" max-width="500px">
            <template v-slot:activator="{on, attrs}">
              <v-btn
                elevation="1"
                color="red"
                dark
                x-small
                v-on="on"
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
                <v-btn color="blue darken-1" text @click="closeDeleteDialog"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text>OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import api from "../utils/api";

export default {
  name: "ClientList",
  props: ["clients", "providers"],
  data() {
    return {
      search: "",
      newProvider: {name: ""},
      newDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedProviders: [],
      editedItem: {
        name: "",
        email: "",
        phone: "",
        providers: [],
      },
      defaultItem: {
        name: "",
        email: "",
        phone: "",
        providers: [],
      },
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
    };
  },
  methods: {
    closeNewDialog() {
      this.newDialog = false;
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },
    closeEditDialog() {
      this.editDialog = false;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
    },
    listProviders(pros) {
      return pros.map((pro) => pro.name).join(", ");
    },
    editItem(item) {
      this.editedItem = {
        name: item.name,
        email: item.email,
        phone: item.phone,
        providers: [...item.providers],
      };
    },
    associatedProvider(currentProvider) {
      return this.editedItem.providers.some(function (el) {
        return el._id === currentProvider._id;
      });
    },
    async addProvider() {
      // v-model of input already bound so we can access value from data
      // submit that name value to the provider creation endpoint
      // clear out provider after submission

      // what happens incase it fails to submit the request
      // how do I handle that on the frontend
      try {
        await api.post("/providers", this.newProvider);
        this.newProvider.name = "";
        // emit an event to the parent to maybe fetch the providers one more time?
      } catch (error) {
        // handle errors here
        // maybe incorporate a toastr that displays the received error
      }
    },
    editCheckboxChange(val, pro) {
      // console.log("checkbox event ", pro._id);
      // if the value is true, we'll add the provider's id to the list of providers in the editedItem object
      // can't do this cos the list of providers in the editedItem object has provider objects and not just their ids
      // to mitigate this, the endpoint for all the resources has to have the id's of the providers and not the actual documents
    },
  },
};
</script>

<style scoped>
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
</style>
