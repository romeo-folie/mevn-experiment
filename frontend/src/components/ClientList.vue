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
              <v-container class="d-flex flex-column">
                <div class="form-group">
                  <span class="label">Name:</span>
                  <input type="text" />
                </div>

                <div class="form-group">
                  <span class="label">Email:</span>
                  <input type="text" />
                </div>

                <div class="form-group">
                  <span class="label">Phone:</span>
                  <input type="text" />
                </div>

                <div class="form-group">
                  <span class="label">Provider:</span>
                  <input type="text" />
                  <v-btn elevation="1" small>Add Provider</v-btn>
                </div>
              </v-container>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="close" elevation="1"> Cancel </v-btn>
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
          <v-btn
            elevation="1"
            @click="clickedItem(item.id)"
            class="mr-4"
            x-small
            >Edit</v-btn
          >
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
    close() {
      this.newDialog = false;
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },
  },
};
</script>

<style scoped>
.modal-title {
  color: #517885;
}

.form-group {
  display: flex;
  /* justify-content: flex-start; */
  /* align-items: center; */
  margin-bottom: 20px;
}

.label {
  margin-right: 8px;
  color: black;
  font-weight: bold;
}

.form-group input {
  border: 0.5px solid black;
  width: 55%;
  padding: 5px;
}

.form-group input:focus {
  outline: none;
}
</style>
