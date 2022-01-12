import {Schema, model} from "mongoose";
import Provider from "./provider";

const ClientSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  providers: [Provider],
});

const Client = model("Client", ClientSchema);

export default Client;
