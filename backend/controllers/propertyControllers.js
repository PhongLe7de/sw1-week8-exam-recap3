const Property = require("../models/propertyModel.js");
const mongoose = require("mongoose");

//GET /properties;
const getAllProperties = async (req, res) => {
  try {

    const properties = await Property.find({}).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve properties" });
  }
};

// POST /properties
const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create({ ...req.body });
    res.status(201).json(newProperty);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create property", error: error.message });
  }
};

// GET /properties/:propertyId
const getPropertyById = async (req, res) => {
  const { propertyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  try {
    const property = await Property.findById(propertyId);
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve property" });
  }
};

// PUT /properties/:propertyId
const updateProperty = async (req, res) => {
  const {propertyId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({message: "Invalid property ID"});
  }

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({message: "Property not found"});
    }
    // if (req.body.company) {
    //   req.body.company = {
    //     ...job.company.toObject(),
    //     ...req.body.company
    //   };
    // }
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, req.body, {
      new: true
    });

    return res.status(200).json(updatedProperty);
  } catch (error) {
    return res.status(500).json({message: "Failed to update property"});
  }
};

// DELETE /properties/:propertyId
const deleteProperty = async (req, res) => {
  const { propertyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ message: "Invalid property ID" });
  }

  try {
    const deletedproperty = await Property.findOneAndDelete({ _id: propertyId });
    if (deletedproperty) {
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete property" });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
