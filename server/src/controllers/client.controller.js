const {clientModel} = require("../models/client.model");
const logger = require("../utils/logger");

const clientController = {};

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

    if (!client) {
      logger.error(`failed to find client with id of ${id}`);
      res.status(404).json({success: false, message: "client not found"});
      return;
    }

    res.status(200).json({success: true, data: client});
  } catch (error) {
    logger.error("error finding client " + error.message);
    res.status(500).json({success: false, message: error.message});
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

clientController.update = async (req, res) => {
  try {
    const {id} = req.params;
    const existingClient = await clientModel.findClient(id);

    if (!existingClient) {
      logger.error(`failed to find client with id of ${id}`);
      res.status(404).json({success: false, message: "client not found"});
      return;
    }

    let updateDetails = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      providers: req.body.providers,
    };

    updateDetails = await clientModel.updateClient(id, updateDetails);
    res.status(200).json({success: true, data: updateDetails});
  } catch (error) {
    logger.error("error updating client " + error.message);
    res.status(500).json({success: false, message: error.message});
  }
};

clientController.delete = async (req, res) => {
  try {
    const {id} = req.params;
    const existingClient = await clientModel.findClient(id);

    if (!existingClient) {
      logger.error(`failed to find client with id of ${id}`);
      res.status(404).json({success: false, message: "client not found"});
      return;
    }

    let deletedClient = await clientModel.removeClient(id);
    res.status(200).json({success: true, data: deletedClient});
  } catch (error) {
    logger.error("error deleting client " + error.message);
    res.status(500).json({success: false, message: error.message});
  }
};

module.exports = clientController;
