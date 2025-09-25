const express = require('express');
const router = express.Router();
const db = require('../utils/mockDb');

router.post('/', async (req, res) => {
  try {
    const vehicleData = req.body;
    
    // Validate required fields
    const requiredFields = ['plateNumber', 'ownerName', 'phoneNumber', 'validityStart', 'validityEnd'];
    for (const field of requiredFields) {
      if (!vehicleData[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    await db.registerVehicle(vehicleData);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in register route:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;