const {Schema, model} = require("mongoose");

const clientSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  providers: {
    type: [{type: Schema.Types.ObjectId, ref: "Provider"}],
    default: [],
  },
});

const clientModel = model("Client", clientSchema);

clientModel.getClients = function () {
  return this.find({});
};

clientModel.findClient = function (id) {
  return this.findById(id);
};

clientModel.addClient = function (newClient) {
  return this.create({...newClient});
};

clientModel.removeClient = function (id) {
  return this.findByIdAndRemove(id);
};

clientModel.updateClient = function (id, updatedClient) {
  return this.findByIdAndUpdate(id, updatedClient);
};

module.exports = {clientModel, clientSchema};
