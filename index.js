require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Staff = require('./models/Staff');
const Inventory = require('./models/Inventory');
const TheftLog = require('./models/Theftlog');

const inventoryRoutes = require('./routes/inventory');
const authRoutes = require('./routes/auth');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use('/api/inventory', inventoryRoutes);
app.use(bodyParser.json()); // If needed

// ✅ Check if Mongo URI is provided
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env file");
    process.exit(1);
}

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ Default Route
app.get('/', (req, res) => {
    res.send('✅ Smart Inventory Backend is Running...');
});

// ✅ Test Database Route
app.get('/test-db', async (req, res) => {
    try {
        const testItem = new Inventory({ 
            itemName: "Laptop", 
            category: "Electronics", 
            totalStock: 10, 
            currentStock: 10 
        });
        await testItem.save();
        res.send("✅ Test Data Added to MongoDB!");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
