import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

interface FormData {
  product: string;
  amount: number;
  region: string;
  customer: string;
  salesRep: string;
  category: string;
  profit: number;
  cost: number;
  date: string;
}

interface AddSaleFormProps {
  onSaleAdded: () => void;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const regions = [
  'North America',
  'Europe',
  'Asia',
  'South America',
  'Africa',
  'Australia'
];

const categories = [
  'Electronics',
  'Software',
  'Hardware',
  'Services',
  'Consulting'
];

const AddSaleForm: React.FC<AddSaleFormProps> = ({ onSaleAdded }) => {
  const [formData, setFormData] = useState<FormData>({
    product: '',
    amount: 0,
    region: 'North America',
    customer: '',
    salesRep: '',
    category: 'Electronics',
    profit: 0,
    cost: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === 'amount' || name === 'profit' || name === 'cost') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post(`${API_URL}/sales`, formData);
      
      setSuccess(true);
      // Reset form fields after successful submission
      setFormData({
        product: '',
        amount: 0,
        region: 'North America',
        customer: '',
        salesRep: '',
        category: 'Electronics',
        profit: 0,
        cost: 0,
        date: new Date().toISOString().split('T')[0]
      });
      
      // Notify parent component to refresh data
      onSaleAdded();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error adding sale:', err);
      setError('Failed to add new sale. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-sale-form-container">
      <h2>Add New Sale</h2>
      
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">Sale added successfully!</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <input
              type="text"
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="region">Region</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="salesRep">Sales Representative</label>
            <input
              type="text"
              id="salesRep"
              name="salesRep"
              value={formData.salesRep}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="profit">Profit ($)</label>
            <input
              type="number"
              id="profit"
              name="profit"
              min="0"
              step="0.01"
              value={formData.profit}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cost">Cost ($)</label>
            <input
              type="number"
              id="cost"
              name="cost"
              min="0"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Sale'}
        </button>
      </form>
    </div>
  );
};

export default AddSaleForm; 