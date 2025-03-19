import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Divider,
  Box,
  Button,
  IconButton,
  Chip,
  useTheme,
  LinearProgress,
  linearProgressClasses,
  styled
} from '@mui/material';
import {
  ShowChart as ChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  GetApp as DownloadIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

// Sample quarterly data
const quarterlyData = [
  { name: 'Q1', revenue: 240000, target: 220000 },
  { name: 'Q2', revenue: 300000, target: 270000 },
  { name: 'Q3', revenue: 270000, target: 290000 },
  { name: 'Q4', revenue: 320000, target: 300000 },
];

// Sample sales by product
const salesByProduct = [
  { name: 'Product A', value: 40 },
  { name: 'Product B', value: 30 },
  { name: 'Product C', value: 15 },
  { name: 'Product D', value: 10 },
  { name: 'Others', value: 5 },
];

// Sample sales rep performance
const salesRepPerformance = [
  { name: 'John D.', current: 92, previous: 85 },
  { name: 'Emma S.', current: 78, previous: 75 },
  { name: 'Michael W.', current: 86, previous: 70 },
  { name: 'Sarah K.', current: 99, previous: 90 },
  { name: 'David L.', current: 65, previous: 60 },
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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

const SalesPerformance: React.FC = () => {
  const theme = useTheme();

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
                Sales Performance
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Analyze your sales performance metrics and trends over time
              </Typography>
            </Paper>
          </Grid>

          {/* Performance Summary Cards */}
          <Grid item xs={12} md={3}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Revenue (YTD)
                  </Typography>
                  <ChartIcon color="primary" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  $1.13M
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="+12.5%" 
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

          <Grid item xs={12} md={3}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Average Deal Size
                  </Typography>
                  <ChartIcon color="secondary" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  $42,500
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

          <Grid item xs={12} md={3}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Win Rate
                  </Typography>
                  <ChartIcon color="success" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  68.5%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="+5.2%" 
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

          <Grid item xs={12} md={3}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Sales Cycle
                  </Typography>
                  <ChartIcon color="warning" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  32 days
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    icon={<TrendingDownIcon />} 
                    label="-3.5 days" 
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

          {/* Quarterly Performance Chart */}
          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Quarterly Performance
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
                <Box sx={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={quarterlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                      <XAxis dataKey="name" tick={{ fill: theme.palette.text.secondary }} />
                      <YAxis tickFormatter={(value) => `$${value/1000}k`} tick={{ fill: theme.palette.text.secondary }} />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                        contentStyle={{ 
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.divider
                        }}
                      />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" name="Target" fill={theme.palette.grey[400]} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Sales by Product */}
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Sales by Product
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByProduct}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salesByProduct.map((entry, index) => (
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

          {/* Sales Rep Performance */}
          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Sales Representative Performance
                  </Typography>
                  <Box>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      sx={{ mr: 1 }}
                    >
                      Export
                    </Button>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Grid container spacing={4}>
                  {salesRepPerformance.map((rep, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight={500}>
                            {rep.name}
                          </Typography>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {rep.current}%
                          </Typography>
                        </Box>
                        <BorderLinearProgress
                          variant="determinate"
                          value={rep.current}
                          sx={{ 
                            mb: 0.5,
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: rep.current > 85 
                                ? theme.palette.success.main 
                                : rep.current > 70 
                                  ? theme.palette.primary.main 
                                  : theme.palette.warning.main
                            }
                          }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            Previous: {rep.previous}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Change: {rep.current - rep.previous > 0 ? '+' : ''}{rep.current - rep.previous}%
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default SalesPerformance; 