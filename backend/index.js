const express = require('express');
const cors = require('cors');
const detectRouter = require('./routes/detect');
const checkRouter = require('./routes/check');
const registerRouter = require('./routes/register');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/detect', detectRouter);
app.use('/check', checkRouter);
app.use('/register', registerRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});