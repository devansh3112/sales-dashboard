import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Avatar,
  Chip,
  useTheme,
  Tabs,
  Tab,
  Divider,
  TextField,
  InputAdornment,
  styled,
  Rating
} from '@mui/material';
import {
  Search as SearchIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  GetApp as DownloadIcon,
  Loyalty as LoyaltyIcon,
  Timeline as TimelineIcon,
  ReceiptLong as ReceiptIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data
const customerSegments = [
  { name: 'Enterprise', value: 42 },
  { name: 'Mid-Market', value: 28 },
  { name: 'SMB', value: 18 },
  { name: 'Startup', value: 12 },
];

const customerRetentionData = [
  { month: 'Jan', retention: 92 },
  { month: 'Feb', retention: 93 },
  { month: 'Mar', retention: 94 },
  { month: 'Apr', retention: 91 },
  { month: 'May', retention: 95 },
  { month: 'Jun', retention: 97 },
  { month: 'Jul', retention: 96 },
  { month: 'Aug', retention: 94 },
  { month: 'Sep', retention: 92 },
  { month: 'Oct', retention: 94 },
  { month: 'Nov', retention: 95 },
  { month: 'Dec', retention: 96 },
];

const customerSatisfactionData = [
  { month: 'Jan', score: 4.3 },
  { month: 'Feb', score: 4.4 },
  { month: 'Mar', score: 4.5 },
  { month: 'Apr', score: 4.2 },
  { month: 'May', score: 4.6 },
  { month: 'Jun', score: 4.7 },
  { month: 'Jul', score: 4.8 },
  { month: 'Aug', score: 4.6 },
  { month: 'Sep', score: 4.5 },
  { month: 'Oct', score: 4.7 },
  { month: 'Nov', score: 4.8 },
  { month: 'Dec', score: 4.9 },
];

const topCustomers = [
  { 
    id: 1, 
    name: 'Acme Corporation', 
    industry: 'Technology', 
    revenue: 1235000, 
    loyalty: 'Platinum', 
    status: 'Active', 
    lastPurchase: '2023-06-12',
    avatar: '/acme-logo.png'
  },
  { 
    id: 2, 
    name: 'Globex Industries', 
    industry: 'Manufacturing', 
    revenue: 985000, 
    loyalty: 'Gold', 
    status: 'Active', 
    lastPurchase: '2023-06-05',
    avatar: '/globex-logo.png'
  },
  { 
    id: 3, 
    name: 'Initech LLC', 
    industry: 'Finance', 
    revenue: 795000, 
    loyalty: 'Silver', 
    status: 'At Risk', 
    lastPurchase: '2023-04-22',
    avatar: '/initech-logo.png'
  },
  { 
    id: 4, 
    name: 'Stark Enterprises', 
    industry: 'Energy', 
    revenue: 1450000, 
    loyalty: 'Platinum', 
    status: 'Active', 
    lastPurchase: '2023-06-14',
    avatar: '/stark-logo.png'
  },
  { 
    id: 5, 
    name: 'Wayne Industries', 
    industry: 'Defense', 
    revenue: 1265000, 
    loyalty: 'Gold', 
    status: 'Active', 
    lastPurchase: '2023-05-30',
    avatar: '/wayne-logo.png'
  },
];

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.02)' 
      : 'rgba(255, 255, 255, 0.02)',
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.04)' 
      : 'rgba(255, 255, 255, 0.04)',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomerInsights: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 8, p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 2,
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                Customer Insights
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Analyze customer behavior, track retention metrics, and identify key opportunities
              </Typography>
            </Paper>
          </Grid>

          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Active Customers
                  </Typography>
                  <PeopleIcon color="primary" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  1,245
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="+8.3%" 
                    size="small" 
                    color="success"
                    sx={{ height: 24 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs last year
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Retention Rate
                  </Typography>
                  <LoyaltyIcon color="secondary" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  94.8%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="+2.1%" 
                    size="small" 
                    color="success"
                    sx={{ height: 24 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs last year
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Customer Satisfaction
                  </Typography>
                  <TimelineIcon color="success" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, mr: 1 }}>
                    4.7
                  </Typography>
                  <Rating value={4.7} precision={0.1} readOnly size="small" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="+0.3" 
                    size="small" 
                    color="success"
                    sx={{ height: 24 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs last year
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Customer Segments */}
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Customer Segments
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={90}
                        innerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {customerSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, undefined]}
                        contentStyle={{ 
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.divider
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Customer Retention Trend */}
          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Customer Metrics
                  </Typography>
                  <Box>
                    <Tabs 
                      value={tabValue} 
                      onChange={handleTabChange}
                      textColor="primary"
                      indicatorColor="primary"
                      sx={{ minHeight: 36 }}
                    >
                      <Tab label="Retention" sx={{ minHeight: 36, py: 0 }} />
                      <Tab label="Satisfaction" sx={{ minHeight: 36, py: 0 }} />
                    </Tabs>
                  </Box>
                </Box>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {tabValue === 0 ? (
                      <LineChart data={customerRetentionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                        <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary }} />
                        <YAxis domain={[80, 100]} tick={{ fill: theme.palette.text.secondary }} />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Retention Rate']}
                          contentStyle={{ 
                            backgroundColor: theme.palette.background.paper,
                            borderColor: theme.palette.divider
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="retention" 
                          stroke={theme.palette.primary.main} 
                          activeDot={{ r: 8 }} 
                          strokeWidth={3}
                        />
                      </LineChart>
                    ) : (
                      <LineChart data={customerSatisfactionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                        <XAxis dataKey="month" tick={{ fill: theme.palette.text.secondary }} />
                        <YAxis domain={[3.5, 5]} tick={{ fill: theme.palette.text.secondary }} />
                        <Tooltip 
                          formatter={(value) => [`${value}/5.0`, 'Satisfaction Score']}
                          contentStyle={{ 
                            backgroundColor: theme.palette.background.paper,
                            borderColor: theme.palette.divider
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke={theme.palette.secondary.main} 
                          activeDot={{ r: 8 }} 
                          strokeWidth={3}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Top Customers Table */}
          <Grid item xs={12}>
            <StyledCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Top Customers
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    size="small"
                    placeholder="Search customers..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      width: 240,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                  <Button 
                    variant="outlined" 
                    startIcon={<DownloadIcon />}
                    size="small"
                  >
                    Export
                  </Button>
                </Box>
              </Box>
              <Divider />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer</TableCell>
                      <TableCell>Industry</TableCell>
                      <TableCell>Annual Revenue</TableCell>
                      <TableCell>Loyalty Tier</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Purchase</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topCustomers.map((customer) => (
                      <StyledTableRow key={customer.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={customer.avatar} 
                              sx={{ 
                                width: 36, 
                                height: 36, 
                                bgcolor: theme.palette.primary.main,
                                mr: 2
                              }}
                            >
                              {customer.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={500}>
                              {customer.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{customer.industry}</TableCell>
                        <TableCell>
                          ${customer.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={customer.loyalty} 
                            size="small" 
                            color={
                              customer.loyalty === 'Platinum' 
                                ? 'secondary' 
                                : customer.loyalty === 'Gold' 
                                  ? 'primary' 
                                  : 'default'
                            }
                            variant={customer.loyalty === 'Silver' ? 'outlined' : 'filled'}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={customer.status} 
                            size="small" 
                            color={
                              customer.status === 'Active' 
                                ? 'success' 
                                : customer.status === 'At Risk' 
                                  ? 'warning' 
                                  : 'error'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(customer.lastPurchase).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default CustomerInsights; 