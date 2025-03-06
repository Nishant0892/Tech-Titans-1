import React, { useEffect, useState } from 'react';
import '../styles/Inventory.css';
import axios from 'axios';

const Inventory = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [totalStock, setTotalStock] = useState('');
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const res = await axios.get('http://localhost:5000/api/inventory');
    setInventory(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = { itemName, category, totalStock };

    if (editingId) {
      await axios.put(`http://localhost:5000/api/inventory/update/${editingId}`, { totalStock, currentStock: totalStock });
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/inventory/add', newItem);
    }

    setItemName('');
    setCategory('');
    setTotalStock('');
    fetchInventory();
  };

  const handleEdit = (item) => {
    setItemName(item.itemName);
    setCategory(item.category);
    setTotalStock(item.totalStock);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/inventory/delete/${id}`);
    fetchInventory();
  };

  return (
    <div className="inventory-container">
      <h2>Inventory Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="number" placeholder="Total Stock" value={totalStock} onChange={(e) => setTotalStock(e.target.value)} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Item</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Total Stock</th>
            <th>Current Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.category}</td>
              <td>{item.totalStock}</td>
              <td>{item.currentStock}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
