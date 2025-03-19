import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SelectChangeEvent,
  useTheme,
  styled
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  GetApp as DownloadIcon,
  FileDownload as ExportIcon,
  Timeline as TimelineIcon
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
  Cell,
  ComposedChart,
  Area,
  Scatter,
  ScatterChart,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// Sample data
const monthlyRevenueData = [
  { name: 'Jan', revenue: 45000, profit: 15000, target: 40000 },
  { name: 'Feb', revenue: 52000, profit: 18000, target: 42000 },
  { name: 'Mar', revenue: 48000, profit: 16000, target: 45000 },
  { name: 'Apr', revenue: 61000, profit: 21000, target: 48000 },
  { name: 'May', revenue: 55000, profit: 19000, target: 50000 },
  { name: 'Jun', revenue: 67000, profit: 24000, target: 52000 },
  { name: 'Jul', revenue: 72000, profit: 26000, target: 55000 },
  { name: 'Aug', revenue: 69000, profit: 24000, target: 57000 },
  { name: 'Sep', revenue: 74000, profit: 27000, target: 60000 },
  { name: 'Oct', revenue: 78000, profit: 29000, target: 62000 },
  { name: 'Nov', revenue: 85000, profit: 32000, target: 65000 },
  { name: 'Dec', revenue: 98000, profit: 38000, target: 68000 },
];

const salesByRegionData = [
  { name: 'North America', value: 35 },
  { name: 'Europe', value: 25 },
  { name: 'Asia Pacific', value: 20 },
  { name: 'Latin America', value: 12 },
  { name: 'Middle East', value: 8 },
];

const productPerformanceData = [
  { name: 'Product A', revenue: 98500, growth: 12.5, units: 2450 },
  { name: 'Product B', revenue: 86700, growth: 8.3, units: 1850 },
  { name: 'Product C', revenue: 65400, growth: 15.2, units: 1200 },
  { name: 'Product D', revenue: 48200, growth: -2.8, units: 980 },
  { name: 'Product E', revenue: 42300, growth: 6.7, units: 850 }
];

const salesMethodsData = [
  { subject: 'Direct Sales', A: 120, fullMark: 150 },
  { subject: 'Channel Partners', A: 98, fullMark: 150 },
  { subject: 'Online', A: 86, fullMark: 150 },
  { subject: 'Inside Sales', A: 99, fullMark: 150 },
  { subject: 'Distributors', A: 85, fullMark: 150 },
  { subject: 'Consultants', A: 65, fullMark: 150 },
];

const opportunityScatterData = [
  { name: 'Deal A', value: 125000, probability: 80, size: 12 },
  { name: 'Deal B', value: 85000, probability: 60, size: 8 },
  { name: 'Deal C', value: 65000, probability: 45, size: 6 },
  { name: 'Deal D', value: 148000, probability: 75, size: 15 },
  { name: 'Deal E', value: 95000, probability: 55, size: 10 },
  { name: 'Deal F', value: 72000, probability: 65, size: 7 },
  { name: 'Deal G', value: 190000, probability: 70, size: 19 },
  { name: 'Deal H', value: 165000, probability: 85, size: 16 },
  { name: 'Deal I', value: 110000, probability: 50, size: 11 },
  { name: 'Deal J', value: 135000, probability: 90, size: 13 },
  { name: 'Deal K', value: 78000, probability: 40, size: 8 },
  { name: 'Deal L', value: 55000, probability: 30, size: 5 },
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

const Analytics: React.FC = () => {
  const theme = useTheme();
  const [timePeriod, setTimePeriod] = useState('year');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePeriodChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
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
                Analytics Dashboard
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Comprehensive sales analytics, trends, and performance insights
              </Typography>
            </Paper>
          </Grid>

          {/* Filter Bar */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tabs 
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{ mr: 3 }}
                >
                  <Tab label="Overview" />
                  <Tab label="Products" />
                  <Tab label="Regions" />
                  <Tab label="Forecasts" />
                </Tabs>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel id="time-period-label">Time Period</InputLabel>
                  <Select
                    labelId="time-period-label"
                    value={timePeriod}
                    label="Time Period"
                    onChange={handlePeriodChange}
                  >
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="quarter">This Quarter</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" startIcon={<ExportIcon />} size="medium">
                  Export Data
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Revenue Trend Chart */}
          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Revenue and Profit Trends
                  </Typography>
                  <Box>
                    <IconButton size="small">
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: 380 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={monthlyRevenueData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.divider }}
                        tickLine={{ stroke: theme.palette.divider }}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.divider }}
                        tickLine={{ stroke: theme.palette.divider }}
                        tickFormatter={(value) => `$${value/1000}k`}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.divider }}
                        tickLine={{ stroke: theme.palette.divider }}
                        tickFormatter={(value) => `$${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                        contentStyle={{ 
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.divider,
                          borderRadius: 8
                        }}
                      />
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        fill={theme.palette.primary.light} 
                        stroke={theme.palette.primary.main}
                        fillOpacity={0.2}
                        name="Revenue"
                      />
                      <Bar 
                        yAxisId="left"
                        dataKey="profit" 
                        fill={theme.palette.success.main} 
                        name="Profit"
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="target" 
                        stroke={theme.palette.warning.main}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target"
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Sales by Region Pie Chart */}
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Sales Distribution by Region
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ height: 380 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByRegionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {salesByRegionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend 
                        layout="vertical"
                        verticalAlign="bottom"
                        align="center" 
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{ 
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.divider,
                          borderRadius: 8
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Product Performance Table */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Product Performance
                  </Typography>
                  <Button 
                    variant="text" 
                    size="small" 
                    endIcon={<DownloadIcon />}
                  >
                    Export
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">Units Sold</TableCell>
                        <TableCell align="right">Growth</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productPerformanceData.map((row) => (
                        <StyledTableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                          <TableCell align="right">{row.units.toLocaleString()}</TableCell>
                          <TableCell align="right">
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'flex-end',
                              color: row.growth >= 0 ? 'success.main' : 'error.main'
                            }}>
                              {row.growth >= 0 
                                ? <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> 
                                : <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                              }
                              {Math.abs(row.growth)}%
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Sales Methods Radar Chart */}
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Sales Methods Effectiveness
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={salesMethodsData}>
                      <PolarGrid stroke={theme.palette.divider} />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                      />
                      <PolarRadiusAxis 
                        angle={90}
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} 
                      />
                      <Radar
                        name="Performance"
                        dataKey="A"
                        stroke={theme.palette.primary.main}
                        fill={theme.palette.primary.main}
                        fillOpacity={0.5}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.divider,
                          borderRadius: 8
                        }}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Opportunity Scatter Plot */}
          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Opportunity Analysis
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary" mr={1}>
                      Size indicates potential deal value
                    </Typography>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ height: 380 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 30, bottom: 10, left: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                      <XAxis 
                        type="number" 
                        dataKey="value" 
                        name="Deal Value" 
                        unit="$"
                        domain={['dataMin - 10000', 'dataMax + 10000']}
                        tick={{ fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.divider }}
                        tickLine={{ stroke: theme.palette.divider }}
                        label={{ 
                          value: 'Deal Value ($)', 
                          position: 'insideBottom', 
                          offset: -5,
                          fill: theme.palette.text.secondary
                        }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="probability" 
                        name="Win Probability" 
                        unit="%" 
                        domain={[0, 100]}
                        tick={{ fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.divider }}
                        tickLine={{ stroke: theme.palette.divider }}
                        label={{ 
                          value: 'Win Probability (%)', 
                          angle: -90, 
                          position: 'insideLeft',
                          fill: theme.palette.text.secondary
                        }}
                      />
                      <ZAxis dataKey="size" range={[50, 400]} />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value, name) => {
                          if (name === 'Deal Value') return [`$${Number(value).toLocaleString()}`, name];
                          if (name === 'Win Probability') return [`${value}%`, name];
                          return [value, name];
                        }}
                        contentStyle={{ 
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.divider,
                          borderRadius: 8
                        }}
                      />
                      <Scatter 
                        name="Opportunities" 
                        data={opportunityScatterData} 
                        fill={theme.palette.primary.main}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default Analytics; 