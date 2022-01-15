const {providerModel} = require("../models/provider.model");
const logger = require("../utils/logger");

const providerController = {};

providerController.all = async (req, res) => {
  try {
    const providers = await providerModel.getProviders();
    res.status(200).json({success: true, data: providers});
  } catch (error) {
    logger.error("error fetching providers " + error.message);
    res.status(500).json({success: false, message: error.message});
  }
};

providerController.get = async (req, res) => {
  try {
    const {id} = req.params;
    const provider = await providerModel.findProvider(id);

    if (!provider) {
      logger.error(`failed to find provider with id of ${id}`);
      res.status(404).json({success: false, message: "provider not found"});
      return;
    }

    res.status(200).json({success: true, data: provider});
  } catch (error) {
    logger.error("error finding provider " + error.message);
    res.status(500).json({success: false, message: error.message});
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

providerController.update = async (req, res) => {
  try {
    const {id} = req.params;
    const existingProvider = await providerModel.findProvider(id);

    if (!existingProvider) {
      logger.error(`failed to find provider with id of ${id}`);
      res.status(404).json({success: false, message: "provider not found"});
      return;
    }

    let updateDetails = {
      name: req.body.name,
    };

    updateDetails = await providerModel.updateProvider(id, updateDetails);
    res.status(200).json({success: true, data: updateDetails});
  } catch (error) {
    logger.error("error updating provider " + error.message);
    res.status(500).json({success: false, message: error.message});
  }
};

providerController.delete = async (req, res) => {
  try {
    const {id} = req.params;
    const existingProvider = await providerModel.findProvider(id);

    if (!existingProvider) {
      logger.error(`failed to find provider with id of ${id}`);
      res.status(404).json({success: false, message: "provider not found"});
      return;
    }

    let deletedprovider = await providerModel.removeprovider(id);
    res.status(200).json({success: true, data: deletedprovider});
  } catch (error) {
    logger.error("error deleting provider " + error.message);
    res.status(500).json({success: false, message: error.message});
  }
};

module.exports = providerController;
