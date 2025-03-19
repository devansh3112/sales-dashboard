import axios from 'axios';

// Define the API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Define types for our sales data
export interface Sale {
  _id?: string;
  product: string;
  amount: number;
  region: string;
  customer: string;
  salesRep: string;
  date: Date;
  category: string;
  profit: number;
  cost: number;
}

export interface RegionSales {
  _id: string;
  totalAmount: number;
  count: number;
}

export interface CategorySales {
  _id: string;
  totalAmount: number;
  count: number;
}

export interface SalesRep {
  _id: string;
  totalAmount: number;
  count: number;
}

export interface MonthlySales {
  _id: {
    year: number;
    month: number;
  };
  totalAmount: number;
  count: number;
}

// API functions
export const getAllSales = async (): Promise<Sale[]> => {
  const response = await axios.get(`${API_URL}/sales`);
  return response.data as Sale[];
};

export const getSalesByRegion = async (): Promise<RegionSales[]> => {
  const response = await axios.get(`${API_URL}/sales/by-region`);
  return response.data as RegionSales[];
};

export const getSalesByCategory = async (): Promise<CategorySales[]> => {
  const response = await axios.get(`${API_URL}/sales/by-category`);
  return response.data as CategorySales[];
};

export const getTopSalesReps = async (): Promise<SalesRep[]> => {
  const response = await axios.get(`${API_URL}/sales/top-sales-reps`);
  return response.data as SalesRep[];
};

export const getMonthlySales = async (): Promise<MonthlySales[]> => {
  const response = await axios.get(`${API_URL}/sales/monthly`);
  return response.data as MonthlySales[];
};
