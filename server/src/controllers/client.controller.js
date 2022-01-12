const {clientModel} = require("../models/client.model");

const clientController = {};

clientController.all = async (req, res) => {
  try {
    const clients = await clientModel.getClients();
    res.status(200).json({success: true, data: clients});
  } catch (error) {
    logger.error("error fetching clients " + error.message);
    res.status(500).json({success: false, message: error.message, data: []});
  }
};

clientController.get = async (req, res) => {
  try {
    const {id} = req.params;
    const client = await clientModel.findClient(id);
    // write a test case to assert that the right response is sent
    // when the client is not found
    if (!client) {
      res.status(404).json({success: false, message: error.message, data: []});
      return;
    }

    res.status(200).json({success: true, data: client});
  } catch (error) {
    logger.error("error finding client" + error.message);
    res.status(500).json({success: false, message: error.message, data: []});
  }
};

clientController.add = async (req, res) => {
  try {
    let newClient = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    newClient = await clientModel.addClient(newClient);
    res.status(200).json({success: true, data: newClient});
  } catch (error) {
    logger.error("error adding client" + error.message);
    res.status(500).json({success: false, message: error.message});
  }
};

clientController.delete = (req, res) => {};
clientController.update = (req, res) => {};

module.exports = clientController;
