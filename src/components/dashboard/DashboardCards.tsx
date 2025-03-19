import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Tooltip, 
  CardHeader,
  Grid,
  LinearProgress,
  Avatar,
  Paper,
  Chip,
  Stack,
  Divider,
  useTheme,
  linearProgressClasses,
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as MoneyIcon,
  ShoppingBag as BagIcon,
  Person as PersonIcon,
  ShowChart as ShowChartIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Group as GroupIcon,
  BarChart as ChartIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
  secondaryValue?: string;
  secondaryLabel?: string;
}

interface TopPerformerProps {
  name: string;
  role: string;
  performance: number;
  avatar: string;
  sales: string | number;
}

interface ProgressCardProps {
  title: string;
  value: number;
  target: number;
  subtitle?: string;
  icon?: React.ReactNode;
}

interface PerformanceDataPoint {
  label: string;
  data: number | string;
  previous?: number | string;
  icon: React.ReactNode;
  color: string;
}

interface PerformanceCardProps {
  title: string;
  data: PerformanceDataPoint[];
  icon?: React.ReactNode;
}

// Styled components
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

const StyledIconBox = styled(Box)<{ bgColor?: string }>(({ theme, bgColor }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: bgColor || theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const ProgressLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: '0.875rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const ProgressValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.75rem',
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
}));

const StyledChip = styled(Chip)<{ trend: 'up' | 'down' }>(({ theme, trend }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 24,
  backgroundColor: trend === 'up' 
    ? theme.palette.success.light 
    : theme.palette.error.light,
  color: trend === 'up' 
    ? theme.palette.success.dark 
    : theme.palette.error.dark,
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
}));

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color,
  secondaryValue,
  secondaryLabel
}) => {
  // Determine if trending up or down
  const trend = (change && change >= 0) ? 'up' : 'down';
  const TrendIcon = trend === 'up' ? TrendingUpIcon : TrendingDownIcon;
  const trendColor = trend === 'up' ? 'success.main' : 'error.main';
  const chipIcon = trend === 'up' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />;
  
  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight={700}>
              {value}
            </Typography>
            
            {change !== undefined && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <StyledChip 
                  trend={trend}
                  size="small"
                  label={`${Math.abs(change)}%`}
                  icon={chipIcon}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  vs last period
                </Typography>
              </Box>
            )}
          </Box>
          <StyledIconBox bgColor={color}>
            {icon}
          </StyledIconBox>
        </Box>
        
        {secondaryValue && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              {secondaryLabel}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {secondaryValue}
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export const ProgressCard: React.FC<ProgressCardProps> = ({ title, value, target, subtitle, icon }) => {
  const progress = Math.min(Math.round((value / target) * 100), 100);
  
  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
              <Typography variant="h4" component="div" fontWeight={700}>
                {value.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                / {target.toLocaleString()}
              </Typography>
            </Box>
            
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {icon && (
            <StyledIconBox>
              {icon}
            </StyledIconBox>
          )}
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: 'rgba(0,0,0,0.05)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              }
            }} 
          />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export const TopPerformersCard: React.FC<{ performers: TopPerformerProps[] }> = ({ performers }) => {
  return (
    <StyledCard>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600}>
            Top Sales Representatives
          </Typography>
        }
        action={
          <Tooltip title="More options">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <Stack spacing={2}>
          {performers.map((performer, index) => (
            <Paper 
              key={performer.name}
              elevation={0}
              sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: index === 0 ? 'rgba(37, 99, 235, 0.08)' : 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Avatar src={performer.avatar} sx={{ width: 48, height: 48 }} />
              <Box sx={{ ml: 2, flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {performer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {performer.role}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" fontWeight={700}>
                  ${typeof performer.sales === 'number' 
                    ? performer.sales.toLocaleString() 
                    : performer.sales}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={performer.performance} 
                  sx={{ 
                    width: 60, 
                    height: 4, 
                    borderRadius: 2,
                    mt: 0.5,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 2,
                      backgroundColor: index === 0 ? 'primary.main' : 'primary.light',
                    }
                  }} 
                />
              </Box>
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export const PerformanceCard: React.FC<PerformanceCardProps> = ({ title, data, icon }) => {
  return (
    <StyledCard>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        }
        action={
          <Tooltip title="More options">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {data.map((item, index) => {
            // Only calculate change if current data is a number
            const numericData = typeof item.data === 'number' ? item.data : 0;
            const numericPrevious = typeof item.previous === 'number' ? item.previous : 0;
            
            let change = 0;
            let trend = null;
            
            if (typeof item.data === 'number' && typeof item.previous === 'number' && item.previous !== 0) {
              change = ((numericData - numericPrevious) / numericPrevious) * 100;
              trend = change >= 0 ? 
                <TrendingUpIcon fontSize="small" sx={{ color: 'success.main' }} /> : 
                <TrendingDownIcon fontSize="small" sx={{ color: 'error.main' }} />;
            }
            
            return (
              <React.Fragment key={item.label}>
                {index > 0 && <Divider sx={{ my: 1.5 }} />}
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      width: 36,
                      height: 36,
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      mr: 2,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {item.data}
                    </Typography>
                  </Box>
                  {trend && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {trend}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: change >= 0 ? 'success.main' : 'error.main',
                          ml: 0.5
                        }}
                      >
                        {Math.abs(change).toFixed(1)}%
                      </Typography>
                    </Box>
                  )}
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export const KPIGrid: React.FC = () => {
  const theme = useTheme();
  
  const performanceData: PerformanceDataPoint[] = [
    {
      label: 'Revenue',
      data: '$468,500',
      previous: 398000,
      icon: <MoneyIcon fontSize="small" />,
      color: theme.palette.primary.main
    },
    {
      label: 'Customers',
      data: 1240,
      previous: 1180,
      icon: <GroupIcon fontSize="small" />,
      color: theme.palette.secondary.main
    },
    {
      label: 'Conversion Rate',
      data: '24.8%',
      previous: '22.5%',
      icon: <ChartIcon fontSize="small" />,
      color: theme.palette.success.main
    },
    {
      label: 'Average Order Value',
      data: '$378',
      previous: '$352',
      icon: <BagIcon fontSize="small" />,
      color: theme.palette.warning.main
    }
  ];
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <StatsCard 
          title="Total Revenue"
          value="$56,432"
          change={12.3}
          icon={<MoneyIcon />}
          color="#2563eb"
          secondaryValue="$4,875 avg. per sale"
          secondaryLabel="Average sale value"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatsCard 
          title="Total Sales"
          value="145"
          change={-5.8}
          icon={<BagIcon />}
          color="#10b981"
          secondaryValue="12 days"
          secondaryLabel="Average sales cycle"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatsCard 
          title="New Customers"
          value="64"
          change={8.2}
          icon={<PersonIcon />}
          color="#f59e0b"
          secondaryValue="76%"
          secondaryLabel="Retention rate"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <StatsCard 
          title="Conversion Rate"
          value="24.8%"
          change={2.1}
          icon={<ShowChartIcon />}
          color="#ef4444"
          secondaryValue="352"
          secondaryLabel="Total leads"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProgressCard 
          title="Quarterly Target"
          value={82400}
          target={100000}
          subtitle="$17,600 remaining to target"
          icon={<SpeedIcon />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PerformanceCard
          title="Key Performance Indicators"
          data={performanceData}
        />
      </Grid>
    </Grid>
  );
};

export default KPIGrid; 