const {Schema, model} = require("mongoose");

const providerSchema = new Schema({
  name: {type: String, required: true},
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
