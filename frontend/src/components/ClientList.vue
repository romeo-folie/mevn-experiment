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
                          <v-btn elevation="1" width="100%">Add Provider</v-btn>
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
                            <v-row no-gutters align="center">
                              <v-col cols="8">
                                <v-checkbox
                                  v-model="checkbox"
                                  label="Provider 1"
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

                            <v-row no-gutters align="center">
                              <v-col cols="8">
                                <v-checkbox
                                  v-model="checkbox"
                                  label="Provider 1"
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

                            <v-row no-gutters align="center">
                              <v-col cols="8">
                                <v-checkbox
                                  v-model="checkbox"
                                  label="Provider 1"
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
              <v-btn @click="save" elevation="1"> Add client </v-btn>
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
        <template v-slot:item.actions="{item}">
          <v-dialog v-model="editDialog" max-width="50%">
            <template v-slot:activator="{on, attrs}">
              <v-btn
                elevation="2"
                @click="clickedItem(item.id)"
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
                            <v-btn elevation="1" width="100%"
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
                              <v-row no-gutters align="center">
                                <v-col cols="8">
                                  <v-checkbox
                                    v-model="checkbox"
                                    label="Provider 1"
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

                              <v-row no-gutters align="center">
                                <v-col cols="8">
                                  <v-checkbox
                                    v-model="checkbox"
                                    label="Provider 1"
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

                              <v-row no-gutters align="center">
                                <v-col cols="8">
                                  <v-checkbox
                                    v-model="checkbox"
                                    label="Provider 1"
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
                <v-spacer></v-spacer>
                <v-btn @click="closeEditDialog" elevation="1" class="mr-4">
                  Cancel
                </v-btn>
                <v-btn @click="save" elevation="1"> Update client </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn elevation="1" color="red" dark x-small>Delete</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ClientList",
  data() {
    return {
      search: "",
      newDialog: false,
      editDialog: false,
      deleteDialog: false,
      checkbox: false,
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
        {text: "Providers", value: "providers"},
        {text: "Actions", value: "actions", sortable: false},
      ],
      clients: [
        {
          name: "Romeo Folie",
          email: "romeo@mail.com",
          phone: "0543345432",
        },
        {
          name: "Tsatsu Tsikata",
          email: "tsikata@mail.com",
          phone: "0543345432",
        },
        {
          name: "Zino leesky",
          email: "zino@mail.com",
          phone: "0543345432",
        },
        {
          name: "Abena Wahab",
          email: "awahab@mail.com",
          phone: "0543345432",
        },
        {
          name: "Justice Gram",
          email: "jgram@mail.com",
          phone: "0543345432",
        },
      ],
    };
  },
  methods: {
    clickedItem(itemId) {
      console.log("item id ", itemId);
    },
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
