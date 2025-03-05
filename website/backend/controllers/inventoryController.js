const Inventory = require('../models/Inventory');

// ✅ Add New Item
exports.addItem = async (req, res) => {
    const { itemName, category, totalStock } = req.body;

    try {
        const newItem = new Inventory({
            itemName,
            category,
            totalStock,
            currentStock: totalStock
        });

        await newItem.save();
        res.status(201).json({ message: "Item added successfully", item: newItem });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Inventory List
exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update Item Stock
exports.updateItem = async (req, res) => {
    const { totalStock, currentStock } = req.body;

    try {
        const updatedItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            { totalStock, currentStock },
            { new: true }
        );

        if (!updatedItem) return res.status(404).json({ message: "Item not found" });

        res.status(200).json({ message: "Item updated successfully", item: updatedItem });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Item
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);

        if (!deletedItem) return res.status(404).json({ message: "Item not found" });

        res.status(200).json({ message: "Item deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
