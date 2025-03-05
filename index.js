require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Staff = require('./models/Staff');
const Inventory = require('./models/Inventory');
const TheftLog = require('./models/Theftlog');

const app = express();

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Default Route
app.get('/', (req, res) => {
    res.send('✅ Smart Inventory Backend is Running...');
});

app.get('/test-db', async (req, res) => {
  try {
      const testItem = new Inventory({ itemName: "Laptop", category: "Electronics", totalStock: 10, currentStock: 10 });
      await testItem.save();
      res.send("✅ Test Data Added to MongoDB!");
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
