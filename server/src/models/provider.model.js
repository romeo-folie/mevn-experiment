const {Schema, model} = require("mongoose");

const providerSchema = new Schema({
  name: String,
});

const providerModel = model("Provider", providerSchema);

module.exports = {providerModel, providerSchema};
