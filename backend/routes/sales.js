const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get sales by region
router.get('/by-region', async (req, res) => {
  try {
    const salesByRegion = await Sale.aggregate([
      {
        $group: {
          _id: '$region',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(salesByRegion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get sales by product category
router.get('/by-category', async (req, res) => {
  try {
    const salesByCategory = await Sale.aggregate([
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(salesByCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get top sales reps
router.get('/top-sales-reps', async (req, res) => {
  try {
    const topSalesReps = await Sale.aggregate([
      {
        $group: {
          _id: '$salesRep',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { totalAmount: -1 }
      },
      {
        $limit: 5
      }
    ]);
    
    res.json(topSalesReps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get monthly sales
router.get('/monthly', async (req, res) => {
  try {
    const monthlySales = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);
    
    res.json(monthlySales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get total profit and revenue
router.get('/financials', async (req, res) => {
  try {
    const financials = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          totalProfit: { $sum: '$profit' },
          totalCost: { $sum: '$cost' }
        }
      }
    ]);
    
    res.json(financials[0] || { totalRevenue: 0, totalProfit: 0, totalCost: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new sale
router.post('/', async (req, res) => {
  try {
    const newSale = new Sale({
      ...req.body,
      date: new Date(req.body.date || Date.now())
    });
    
    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific sale
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a sale
router.put('/:id', async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    
    res.json(updatedSale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a sale
router.delete('/:id', async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    
    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    
    res.json({ message: 'Sale deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 