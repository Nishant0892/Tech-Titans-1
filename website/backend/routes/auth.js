const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Staff = require('../models/Staff');

const router = express.Router();
const JWT_SECRET = "your_secret_key"; // Change this to a strong secret

const multer = require('multer');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/', // Folder where images will be stored
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage });

// ✅ Modify Staff Registration Route to Accept Images
router.post('/register', upload.fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'leftImage', maxCount: 1 },
    { name: 'rightImage', maxCount: 1 }
]), async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await Staff.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new Staff({
            name,
            email,
            password: hashedPassword,
            role,
            images: {
                front: req.files['frontImage'][0].filename,
                left: req.files['leftImage'][0].filename,
                right: req.files['rightImage'][0].filename
            }
        });

        await user.save();
        res.json({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ Staff/Admin Login
router.post('/login', [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    console.log("Received Body:", req.body); 
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const user = await Staff.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Verify JWT Token (Middleware)
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

// ✅ Protected Route Example (Only for Logged-in Users)
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ msg: `Welcome, user ID: ${req.user.id}, Role: ${req.user.role}` });
});

module.exports = router;
