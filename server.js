require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const propertyRoutes = require('./routes/property');
const paymentRoutes = require('./routes/payment');
const placeRoutes = require('./routes/placeRoutes');
const businessRoutes = require('./routes/businessRoutes');
const agreementRoutes = require('./routes/agreementRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/property', propertyRoutes);
// Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/places', placeRoutes);
// Use business routes
app.use('/api/businesses', businessRoutes);
// Use agreement routes
app.use('/api/agreements', agreementRoutes);
app.use('/api/reports', reportRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
