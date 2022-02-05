<template>
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
              <input
                type="text"
                :value="editedClient.name"
                @change="$emit('update:name', $event.target.value)"
              />
            </v-col>
          </v-row>
        </div>

        <div class="form-group">
          <v-row>
            <v-col cols="2" class="d-flex justify-end align-center">
              <span class="label">Email:</span>
            </v-col>
            <v-col cols="10">
              <input
                type="text"
                :value="editedClient.email"
                @change="$emit('update:email', $event.target.value)"
              />
            </v-col>
          </v-row>
        </div>

        <div class="form-group">
          <v-row>
            <v-col cols="2" class="d-flex justify-end align-center">
              <span class="label">Phone:</span>
            </v-col>
            <v-col cols="10">
              <input
                type="text"
                :value="editedClient.phone"
                @change="$emit('update:phone', $event.target.value)"
              />
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
                  <div class="provider-list" v-show="providers.length">
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
                              <v-row justify="space-between" class="py-2">
                                <h3 class="modal-title">Edit Provider</h3>
                                <v-icon dense @click="closeProviderEditDialog">
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
                                      <span class="label">Provider:</span>
                                    </v-col>
                                    <v-col cols="10">
                                      <v-row>
                                        <v-col cols="8">
                                          <input
                                            type="text"
                                            v-model="editedProvider.name"
                                          />
                                        </v-col>
                                        <v-col cols="4">
                                          <v-btn
                                            elevation="1"
                                            @click="updateProvider(pro._id)"
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
      <v-btn @click="closeClientEditDialog" elevation="1" class="mr-4">
        Cancel
      </v-btn>
      <v-btn elevation="1" @click="updateClient(editedClient.id)">
        Update client
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// If I bring the editedClient in as a prop
// that means I can't perform validation on it cos there's no v-model to tie it to
// I might be able to still manage to do validation on it using the .sync approach
// That approach won't work cos we bind the value
// I think I'm gonna have to sacrifice validation or the edit form
// Vuelidate can't handle this very well due to the way it's setup
export default {
  name: "EditClientForm",
  props: {
    providers: {
      required: true,
      type: Array,
      default: () => [],
    },
    editedClient: {
      required: true,
      type: Object,
      default: () => ({
        id: "",
        name: "",
        email: "",
        phone: "",
        providers: [],
      }),
    },
  },
  data() {
    return {
      editProviderDialog: false,
      newProvider: {
        name: "",
      },
      editedProvider: {
        name: "",
      },
    };
  },
  methods: {
    addProvider() {
      this.$emit("addProvider", this.newProvider);
      this.newProvider.name = "";
    },
    deleteProvider(providerId) {
      this.$emit("deleteProvider", providerId);
    },
    updateProvider(providerId) {
      this.$emit("updateProvider", providerId, this.editedProvider);
      this.closeProviderEditDialog();
    },
    deleteClient(clientId) {
      this.$emit("deleteClient", clientId);
      this.closeClientEditDialog();
    },
    updateClient(clientId) {
      this.$emit("updateClient", clientId);
      this.closeClientEditDialog();
    },
    closeClientEditDialog() {
      this.$emit("closeClientEditDialog");
    },
    closeProviderEditDialog() {
      this.editedProvider.name = "";
      this.editProviderDialog = false;
    },
    checkRelation(currentProvider) {
      return this.editedClient.providers.some(function (el) {
        return el === currentProvider._id;
      });
    },
    editCheckboxChange(val, pro) {
      if (val) {
        const exists = this.editedClient.providers.find((el) => el === pro._id);

        if (!exists) {
          this.$emit('pushProvider', pro._id);
        }
      } else {
        this.$emit('removeProvider', pro._id);
      }
    },
  },
};
</script>

<style></style>
