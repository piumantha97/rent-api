const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// const tenantRoutes = require('./routes/tenants');
// const paymentRoutes = require('./routes/payments');
// const propertyRoutes = require('./routes/properties');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/rental-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// // Routes 
// app.use('/api/tenants', tenantRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/properties', propertyRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
