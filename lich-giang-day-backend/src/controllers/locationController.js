const Location = require('../models/Location');

const createLocation = async (req, res) => {
  const location = new Location(req.body);
  try {
    const savedLocation = await location.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    const location = await Location.findOne({ locationId: req.params.id });
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const updatedLocation = await Location.findOneAndUpdate({ locationId: req.params.id }, req.body, { new: true });
    if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findOneAndDelete({ locationId: req.params.id });
    if (!deletedLocation) return res.status(404).json({ message: 'Location not found' });
    res.json({ message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
