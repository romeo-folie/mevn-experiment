const {providerModel} = require("../models/provider.model");
const logger = require("../utils/logger");

const providerController = {};

providerController.all = async (req, res) => {
  try {
    const providers = await providerModel.getProviders();
    res.status(200).json({success: true, data: providers});
  } catch (error) {
    logger.error("error fetching providers " + error.message);
    res.status(500).json({success: false, message: error.message, data: []});
  }
};

providerController.get = async (req, res) => {
  try {
    const {id} = req.params;
    const provider = await providerModel.findProvider(id);

    if (!provider) {
      res.status(404).json({success: false, message: error.message, data: []});
      return;
    }

    res.status(200).json({success: true, data: provider});
  } catch (error) {
    logger.error("error finding provider " + error.message);
    res.status(500).json({success: false, message: error.message, data: []});
  }
};

providerController.add = async (req, res) => {
  try {
    let newProvider = {name: req.body.name};
    newProvider = await providerModel.addProvider(newProvider);
    res.status(201).json({success: true, data: newProvider});
  } catch (error) {
    logger.error("error adding provider " + error.message);
    res.status(500).json({success: false, message: error.message});
  }
};

providerController.update = async (req, res) => {}
providerController.delete = async (req, res) => {}

module.exports = providerController;
