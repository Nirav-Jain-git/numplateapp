const express = require('express');
const router = express.Router();

// Mock OCR function (replace with actual Roboflow + EasyOCR implementation)
const mockOCR = async (imageBase64) => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "ABC123"; // Mock plate number
};

router.post('/', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const plateNumber = await mockOCR(image);
    res.json({ plateNumber });
  } catch (error) {
    console.error('Error in detect route:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;