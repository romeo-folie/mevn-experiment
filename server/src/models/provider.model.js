const {Schema, model} = require("mongoose");
const {clientModel} = require("./client.model");

const providerSchema = new Schema({
  name: {type: String, required: true},
});

providerSchema.post("findOneAndRemove", async function (doc) {
  const clients = await clientModel.getClients();

  // remove deleted provider relations to client
  await Promise.all(
    clients.map(async (cl) => {
      if (cl.providers.length) {
        const idx = cl.providers.indexOf(doc._id);
        if (idx >= 0) {
          cl.providers.splice(idx, 1);
          await clientModel.updateClient(cl._id, cl);
        }
      }
    })
  );
});

const providerModel = model("Provider", providerSchema);

providerModel.getProviders = function () {
  return this.find({});
};

providerModel.findProvider = function (id) {
  return this.findById(id);
};

providerModel.addProvider = function (newProvider) {
  return this.create(newProvider);
};

providerModel.removeProvider = function (id) {
  return this.findByIdAndRemove(id);
};

providerModel.updateProvider = function (id, updatedProvider) {
  return this.findByIdAndUpdate(id, updatedProvider, {new: true});
};

module.exports = {providerModel, providerSchema};
