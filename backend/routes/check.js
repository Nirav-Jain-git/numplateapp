const express = require('express');
const router = express.Router();
const db = require('../utils/mockDb');

router.get('/:plateNumber', async (req, res) => {
  try {
    const { plateNumber } = req.params;
    const data = await db.checkVehicle(plateNumber);
    res.json({ exists: !!data, data });
  } catch (error) {
    console.error('Error in check route:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;