import {Schema, model} from "mongoose";

const ProviderSchema = new Schema({
  name: String,
});

const Provider = model("Provider", ProviderSchema);

export default Provider;
