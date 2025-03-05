const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// CRUD Operations
router.post('/add', inventoryController.addItem);
router.get('/', inventoryController.getInventory);
router.put('/update/:id', inventoryController.updateItem);
router.delete('/delete/:id', inventoryController.deleteItem);

module.exports = router;
