const {Schema, model} = require("mongoose");
const {providerSchema} = require("./provider.model");

const clientSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  providers: [providerSchema],
});

const clientModel = model("Client", clientSchema);

clientModel.getClients = () => {
  return clientModel.find({});
};

clientModel.findClient = (id) => {
  return clientModel.findById(id);
};

clientModel.addClient = (newClient) => {
  return clientModel.create({...newClient});
};

clientModel.removeClient = (id) => {
  return clientModel.findByIdAndRemove(id);
};

clientModel.updateClient = (id, updatedClient) => {
  return clientModel.findByIdAndUpdate(id, updatedClient);
};

module.exports = {clientModel, clientSchema};
