const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/crud-app')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

const Item = mongoose.model('Item', itemSchema)

app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({message:'Server error'});
    }
});

app.post('/api/items', async (req, res) => {
    try {
      const newItem = new Item({
        name: req.body.name,
        description: req.body.description
      });
  
      const savedItem = await newItem.save();
      res.status(201).json(savedItem); 
    } catch (err) {
      console.error('Error creating item:', err);
      res.status(400).json({ message: 'Failed to create item' });
    }
});

app.put('/api/Items/:id', async (req, res) => {
    try {
        const item = await Item.
        findByIdAndUpdate(req.params.id);
        if (item){
            item.name = req.body.name;
            item.description = req.body.
            description;
            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({message:'Item not found'});
        }
    } catch (error) {
        res.status(400).json({ message: ' Error updating item'});
    }
});

app.delete('/api/Items/:id', async (req, res) => {
    try {
      const item = await Item.findByIdAndDelete(req.params.id);
      if (item) {
        res.json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting item' });
    }
});
  
app.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname,
        'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});