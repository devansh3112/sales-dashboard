const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sale = require('./models/Sale');

// Load environment variables
dotenv.config();

// Sample sales data
const salesData = [
  {
    product: 'Laptop Pro',
    amount: 1299.99,
    region: 'North America',
    customer: 'TechCorp Inc.',
    salesRep: 'John Smith',
    date: new Date('2023-01-15'),
    category: 'Electronics',
    profit: 350,
    cost: 949.99
  },
  {
    product: 'Smartphone X',
    amount: 899.99,
    region: 'Europe',
    customer: 'Digital Solutions Ltd.',
    salesRep: 'Emma Johnson',
    date: new Date('2023-01-20'),
    category: 'Electronics',
    profit: 250,
    cost: 649.99
  },
  {
    product: 'Office Suite Pro',
    amount: 199.99,
    region: 'Asia',
    customer: 'Global Services Co.',
    salesRep: 'Michael Chen',
    date: new Date('2023-01-25'),
    category: 'Software',
    profit: 150,
    cost: 49.99
  },
  {
    product: 'Cloud Storage Plan',
    amount: 49.99,
    region: 'South America',
    customer: 'Data Systems S.A.',
    salesRep: 'Ana Rodriguez',
    date: new Date('2023-02-05'),
    category: 'Services',
    profit: 40,
    cost: 9.99
  },
  {
    product: 'Marketing Strategy',
    amount: 4999.99,
    region: 'North America',
    customer: 'Retail Giants Inc.',
    salesRep: 'John Smith',
    date: new Date('2023-02-10'),
    category: 'Consulting',
    profit: 3000,
    cost: 1999.99
  },
  {
    product: 'Server Hardware',
    amount: 2499.99,
    region: 'Europe',
    customer: 'TechCorp Inc.',
    salesRep: 'Emma Johnson',
    date: new Date('2023-02-15'),
    category: 'Hardware',
    profit: 800,
    cost: 1699.99
  },
  {
    product: 'AI Software License',
    amount: 1499.99,
    region: 'Asia',
    customer: 'Innovation Tech',
    salesRep: 'Michael Chen',
    date: new Date('2023-02-20'),
    category: 'Software',
    profit: 1000,
    cost: 499.99
  },
  {
    product: 'Security Suite',
    amount: 299.99,
    region: 'Africa',
    customer: 'Secure Solutions',
    salesRep: 'David Okafor',
    date: new Date('2023-03-05'),
    category: 'Software',
    profit: 200,
    cost: 99.99
  },
  {
    product: 'Laptop Pro',
    amount: 1299.99,
    region: 'North America',
    customer: 'Education First',
    salesRep: 'Sarah Wilson',
    date: new Date('2023-03-10'),
    category: 'Electronics',
    profit: 350,
    cost: 949.99
  },
  {
    product: 'Smartphone X',
    amount: 899.99,
    region: 'Europe',
    customer: 'Mobile Retail Ltd.',
    salesRep: 'Emma Johnson',
    date: new Date('2023-03-15'),
    category: 'Electronics',
    profit: 250,
    cost: 649.99
  },
  {
    product: 'Data Analysis',
    amount: 3499.99,
    region: 'North America',
    customer: 'Finance Corp',
    salesRep: 'John Smith',
    date: new Date('2023-03-20'),
    category: 'Consulting',
    profit: 2500,
    cost: 999.99
  },
  {
    product: 'Network Setup',
    amount: 1999.99,
    region: 'Asia',
    customer: 'Global Services Co.',
    salesRep: 'Michael Chen',
    date: new Date('2023-04-05'),
    category: 'Services',
    profit: 1200,
    cost: 799.99
  },
  {
    product: 'Cloud Storage Plan',
    amount: 49.99,
    region: 'South America',
    customer: 'Small Business Inc.',
    salesRep: 'Ana Rodriguez',
    date: new Date('2023-04-10'),
    category: 'Services',
    profit: 40,
    cost: 9.99
  },
  {
    product: 'Laptop Pro',
    amount: 1299.99,
    region: 'Europe',
    customer: 'Tech Innovations',
    salesRep: 'Emma Johnson',
    date: new Date('2023-04-15'),
    category: 'Electronics',
    profit: 350,
    cost: 949.99
  },
  {
    product: 'Server Hardware',
    amount: 2499.99,
    region: 'North America',
    customer: 'Data Center Co.',
    salesRep: 'John Smith',
    date: new Date('2023-04-20'),
    category: 'Hardware',
    profit: 800,
    cost: 1699.99
  },
  {
    product: 'Project Management Tool',
    amount: 199.99,
    region: 'Europe',
    customer: 'Creative Studios',
    salesRep: 'Emma Johnson',
    date: new Date('2023-05-05'),
    category: 'Software',
    profit: 150,
    cost: 49.99
  },
  {
    product: 'Enterprise CRM',
    amount: 4999.99,
    region: 'North America',
    customer: 'Global Retail Inc.',
    salesRep: 'John Smith',
    date: new Date('2023-05-10'),
    category: 'Software',
    profit: 3500,
    cost: 1499.99
  },
  {
    product: 'Networking Equipment',
    amount: 3499.99,
    region: 'Asia',
    customer: 'Tech Solutions Ltd.',
    salesRep: 'Michael Chen',
    date: new Date('2023-05-15'),
    category: 'Hardware',
    profit: 1200,
    cost: 2299.99
  },
  {
    product: 'Digital Marketing Campaign',
    amount: 7999.99,
    region: 'Europe',
    customer: 'Fashion Brand Co.',
    salesRep: 'Emma Johnson',
    date: new Date('2023-05-20'),
    category: 'Services',
    profit: 5000,
    cost: 2999.99
  },
  {
    product: 'VR Headset Pro',
    amount: 499.99,
    region: 'North America',
    customer: 'Gaming Paradise',
    salesRep: 'Sarah Wilson',
    date: new Date('2023-06-05'),
    category: 'Electronics',
    profit: 200,
    cost: 299.99
  }
];

// Connect to MongoDB
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');

    // Delete existing data
    await Sale.deleteMany({});
    console.log('Existing sales data deleted');

    // Insert new data
    await Sale.insertMany(salesData);
    console.log(`${salesData.length} sales records inserted successfully`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 