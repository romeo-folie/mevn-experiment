<template>
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
              <input
                type="text"
                v-model.trim="$v.newClient.name.$model"
                :class="{'group-error': $v.newClient.name.$error}"
              />
            </v-col>
          </v-row>
          <v-row v-if="$v.newClient.name.$dirty && $v.newClient.name.$error">
            <v-col cols="2"> </v-col>
            <v-col cols="10">
              <div class="error-text" v-if="!$v.newClient.name.required">
                Field is required
              </div>
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
                v-model.trim="$v.newClient.email.$model"
                :class="{'group-error': $v.newClient.email.$error}"
              />
            </v-col>
          </v-row>
          <v-row v-if="$v.newClient.email.$dirty && $v.newClient.email.$error">
            <v-col cols="2"> </v-col>
            <v-col cols="10">
              <div class="error-text" v-if="!$v.newClient.email.required">
                Field is required
              </div>
              <div class="error-text" v-if="!$v.newClient.email.email">
                Must be a valid email
              </div>
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
                v-model.trim="$v.newClient.phone.$model"
                :class="{'group-error': $v.newClient.phone.$error}"
              />
            </v-col>
          </v-row>

          <v-row v-if="$v.newClient.phone.$dirty && $v.newClient.phone.$error">
            <v-col cols="2"> </v-col>
            <v-col cols="10">
              <div class="error-text" v-if="!$v.newClient.phone.required">
                Field is required
              </div>
              <div class="error-text" v-if="!$v.newClient.phone.numeric">
                Value must be numeric
              </div>
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
                          dense
                          hide-details
                          color="black"
                          @change="addCheckboxChange($event, pro)"
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
                          dense
                          color="black"
                          @click="deleteProvider(pro._id)"
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
      <v-btn @click="closeNewClientDialog" elevation="1" class="mr-4">
        Cancel
      </v-btn>
      <v-btn elevation="1" @click="addClient"> Add client </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "NewClientForm",
  props: ["newClient"],
};
</script>

<style></style>
