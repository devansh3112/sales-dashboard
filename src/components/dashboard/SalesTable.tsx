import React, { useState } from 'react';
import { Sale } from '../../services/api';
import './Dashboard.css';

interface SalesTableProps {
  sales: Sale[];
}

const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  const [sortField, setSortField] = useState<keyof Sale>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Sale) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSales = [...sales].sort((a, b) => {
    if (sortField === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }

    // Handle null/undefined values with nullish coalescing
    const valueA = (a[sortField] as any) ?? '';
    const valueB = (b[sortField] as any) ?? '';

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="sales-table-container">
      <h2>Sales Records</h2>
      <div className="table-responsive">
        <table className="sales-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('product')}>
                Product {sortField === 'product' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('amount')}>
                Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('region')}>
                Region {sortField === 'region' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('customer')}>
                Customer {sortField === 'customer' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('salesRep')}>
                Sales Rep {sortField === 'salesRep' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('date')}>
                Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('category')}>
                Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('profit')}>
                Profit {sortField === 'profit' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSales.map(sale => (
              <tr key={sale._id}>
                <td>{sale.product}</td>
                <td>${sale.amount.toLocaleString()}</td>
                <td>{sale.region}</td>
                <td>{sale.customer}</td>
                <td>{sale.salesRep}</td>
                <td>{formatDate(sale.date)}</td>
                <td>{sale.category}</td>
                <td>${sale.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable; 