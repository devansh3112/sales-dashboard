import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  IconButton, 
  Tooltip, 
  Box,
  useTheme,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Paper,
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Chart card props interface
interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: number | string;
  filters?: boolean;
  downloadable?: boolean;
}

// Chart data interfaces
interface MonthlySalesDataPoint {
  month: string;
  sales: number;
  lastYear: number;
}

interface RegionSalesDataPoint {
  name: string;
  value: number;
}

interface SalesRepDataPoint {
  name: string;
  sales: number;
  quota: number;
}

interface PieChartLabelProps {
  name: string;
  percent: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
  },
}));

// Monthly sales data
const monthlySalesData: MonthlySalesDataPoint[] = [
  { month: 'Jan', sales: 24000, lastYear: 18000 },
  { month: 'Feb', sales: 26000, lastYear: 22000 },
  { month: 'Mar', sales: 35000, lastYear: 30000 },
  { month: 'Apr', sales: 32000, lastYear: 28000 },
  { month: 'May', sales: 38000, lastYear: 32000 },
  { month: 'Jun', sales: 42000, lastYear: 34000 },
  { month: 'Jul', sales: 39000, lastYear: 36000 },
  { month: 'Aug', sales: 36000, lastYear: 35000 },
  { month: 'Sep', sales: 41000, lastYear: 32000 },
  { month: 'Oct', sales: 45000, lastYear: 36000 },
  { month: 'Nov', sales: 52000, lastYear: 42000 },
  { month: 'Dec', sales: 58000, lastYear: 48000 },
];

// Region sales data
const regionSalesData: RegionSalesDataPoint[] = [
  { name: 'North America', value: 42 },
  { name: 'Europe', value: 28 },
  { name: 'Asia', value: 18 },
  { name: 'South America', value: 8 },
  { name: 'Africa', value: 4 },
];

// Category sales data
const categorySalesData: RegionSalesDataPoint[] = [
  { name: 'Electronics', value: 38 },
  { name: 'Software', value: 32 },
  { name: 'Hardware', value: 15 },
  { name: 'Services', value: 10 },
  { name: 'Consulting', value: 5 },
];

// Sales funnel data
const salesFunnelData: RegionSalesDataPoint[] = [
  { name: 'Leads', value: 4800 },
  { name: 'Qualified Leads', value: 3200 },
  { name: 'Opportunities', value: 1800 },
  { name: 'Proposals', value: 950 },
  { name: 'Negotiations', value: 460 },
  { name: 'Closed Deals', value: 210 },
];

// Sales performance by rep data
const salesRepData: SalesRepDataPoint[] = [
  { name: 'John Smith', sales: 32500, quota: 30000 },
  { name: 'Emma Johnson', sales: 28900, quota: 30000 },
  { name: 'Michael Chen', sales: 27400, quota: 25000 },
  { name: 'Sarah Wilson', sales: 22800, quota: 25000 },
  { name: 'David Lee', sales: 18500, quota: 20000 },
];

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  height = 380,
  filters = false,
  downloadable = false,
}) => {
  const [timeRange, setTimeRange] = React.useState('year');

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };

  return (
    <StyledCard>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        }
        subheader={subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {filters && (
              <FormControl size="small" sx={{ minWidth: 120, mr: 1 }}>
                <Select
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Time range' }}
                  sx={{ fontSize: '0.875rem' }}
                >
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="quarter">This Quarter</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                  <MenuItem value="all">All Time</MenuItem>
                </Select>
              </FormControl>
            )}
            
            {downloadable && (
              <Tooltip title="Download data">
                <IconButton size="small">
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            
            <Tooltip title="More options">
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        }
      />
      <CardContent sx={{ flexGrow: 1, height }}>
        {children}
      </CardContent>
    </StyledCard>
  );
};

export const SalesOverviewChart: React.FC = () => {
  const theme = useTheme();
  
  return (
    <ChartCard 
      title="Revenue Overview" 
      subtitle="Monthly revenue performance compared to last year"
      filters
      downloadable
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={monthlySalesData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis 
            dataKey="month" 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          <YAxis 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
            tickFormatter={(value: number) => `$${value / 1000}k`}
          />
          <RechartsTooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Area
            type="monotone"
            dataKey="lastYear"
            stroke={theme.palette.grey[400]}
            fillOpacity={0.3}
            fill={theme.palette.grey[200]}
            name="Last Year"
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke={theme.palette.primary.main}
            fillOpacity={0.8}
            fill={theme.palette.primary.light}
            name="Current Year"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const RegionSalesChart: React.FC = () => {
  const theme = useTheme();
  
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];
  
  return (
    <ChartCard 
      title="Sales by Region" 
      subtitle="Percentage of sales by geographic region"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={regionSalesData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={130}
            innerRadius={75}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }: PieChartLabelProps) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {regionSalesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <RechartsTooltip 
            formatter={(value: number) => [`${value}%`, 'Percentage']}
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const CategorySalesChart: React.FC = () => {
  const theme = useTheme();
  
  return (
    <ChartCard 
      title="Sales by Category" 
      subtitle="Revenue distribution across product categories"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={categorySalesData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis 
            type="number" 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          <RechartsTooltip 
            formatter={(value: number) => [`${value}%`, 'Percentage']}
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Bar 
            dataKey="value" 
            name="Percentage" 
            radius={[0, 4, 4, 0]}
            barSize={30}
          >
            {categorySalesData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={theme.palette.primary.main} 
                fillOpacity={0.8 - (index * 0.15)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const SalesFunnelChart: React.FC = () => {
  const theme = useTheme();
  
  return (
    <ChartCard 
      title="Sales Funnel" 
      subtitle="Conversion through sales pipeline stages"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={salesFunnelData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          <YAxis 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          <RechartsTooltip 
            formatter={(value: number) => [value.toLocaleString(), 'Count']}
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Bar 
            dataKey="value" 
            name="Leads" 
            radius={[4, 4, 0, 0]}
            fill={theme.palette.secondary.main}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const SalesPerformanceChart: React.FC = () => {
  const theme = useTheme();
  
  return (
    <ChartCard 
      title="Sales Rep Performance" 
      subtitle="Current performance against quota"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={salesRepData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          <YAxis 
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
            tickFormatter={(value: number) => `$${value / 1000}k`}
          />
          <RechartsTooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
          <Legend />
          <Bar dataKey="quota" name="Quota" fill={theme.palette.grey[300]} />
          <Bar dataKey="sales" name="Sales" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const ChartsGrid: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SalesOverviewChart />
      </Grid>
      <Grid item xs={12} md={4}>
        <RegionSalesChart />
      </Grid>
      <Grid item xs={12} md={8}>
        <CategorySalesChart />
      </Grid>
      <Grid item xs={12} md={6}>
        <SalesFunnelChart />
      </Grid>
      <Grid item xs={12} md={6}>
        <SalesPerformanceChart />
      </Grid>
    </Grid>
  );
};

export default ChartsGrid; 