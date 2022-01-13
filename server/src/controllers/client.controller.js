const {clientModel} = require("../models/client.model");
const logger = require("../utils/logger");

const clientController = {};

// TODO: Write tests for these endpoints
clientController.all = async (req, res) => {
  try {
    const clients = await clientModel.getClients();
    res.status(200).json({success: true, data: clients});
  } catch (error) {
    logger.error("error fetching clients " + error.message);
    res.status(500).json({success: false, message: error.message});
  }
};

clientController.get = async (req, res) => {
  try {
    const {id} = req.params;
    const client = await clientModel.findClient(id);
    res.status(200).json({success: true, data: client});
  } catch (error) {
    logger.error("error finding client " + error.message);
    res.status(404).json({success: false, message: error.message});
  }
};

clientController.add = async (req, res) => {
  try {
    let newClient = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      providers: req.body.providers,
    };

    newClient = await clientModel.addClient(newClient);
    res.status(201).json({success: true, data: newClient});
  } catch (error) {
    logger.error("error adding client " + error.message);
    res.status(500).json({success: false, message: error.message});
  }
};

clientController.delete = (req, res) => {};
clientController.update = (req, res) => {};

module.exports = clientController;
