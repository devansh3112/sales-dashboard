import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Box,
  Chip,
  Button,
  IconButton,
  Divider,
  Avatar,
  useTheme,
  LinearProgress,
  linearProgressClasses,
  Stack,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  TextField,
  styled
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Sort as SortIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountCircle as AccountIcon,
  ExpandMore as ExpandMoreIcon,
  Business as BusinessIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sankey,
  Funnel,
  FunnelChart,
  Cell,
  LabelList
} from 'recharts';

// Sample data for pipeline stages
const pipelineStages = [
  { name: 'Lead', value: 845, color: '#64B5F6' },
  { name: 'Qualified', value: 675, color: '#4FC3F7' },
  { name: 'Proposal', value: 410, color: '#29B6F6' },
  { name: 'Negotiation', value: 280, color: '#03A9F4' },
  { name: 'Closed Won', value: 210, color: '#00BCD4' },
];

// Sample data for opportunities
const opportunities = [
  { 
    id: 1, 
    name: 'Enterprise Software Suite', 
    company: 'Acme Corporation',
    value: 125000,
    stage: 'Negotiation',
    probability: 80,
    owner: 'John Anderson',
    avatar: '/avatar1.png',
    daysInStage: 14,
    closeDate: '2023-07-30',
    lastActivity: '2023-06-14'
  },
  { 
    id: 2, 
    name: 'Cloud Migration Project', 
    company: 'Globex Industries',
    value: 85000,
    stage: 'Proposal',
    probability: 60,
    owner: 'Sarah Wilson',
    avatar: '/avatar2.png',
    daysInStage: 7,
    closeDate: '2023-08-15',
    lastActivity: '2023-06-15'
  },
  { 
    id: 3, 
    name: 'Security Compliance Upgrade', 
    company: 'Initech LLC',
    value: 65000,
    stage: 'Qualified',
    probability: 45,
    owner: 'Michael Chen',
    avatar: '/avatar3.png',
    daysInStage: 10,
    closeDate: '2023-09-01',
    lastActivity: '2023-06-12'
  },
  { 
    id: 4, 
    name: 'Data Analytics Platform', 
    company: 'Stark Enterprises',
    value: 145000,
    stage: 'Negotiation',
    probability: 75,
    owner: 'Emily Johnson',
    avatar: '/avatar4.png',
    daysInStage: 21,
    closeDate: '2023-07-15',
    lastActivity: '2023-06-10'
  },
  { 
    id: 5, 
    name: 'Mobile App Development', 
    company: 'Wayne Industries',
    value: 95000,
    stage: 'Proposal',
    probability: 55,
    owner: 'David Lee',
    avatar: '/avatar5.png',
    daysInStage: 5,
    closeDate: '2023-08-30',
    lastActivity: '2023-06-16'
  },
];

// Sample conversion rate data
const conversionData = [
  { name: 'Lead → Qualified', rate: 80 },
  { name: 'Qualified → Proposal', rate: 60 },
  { name: 'Proposal → Negotiation', rate: 70 },
  { name: 'Negotiation → Closed Won', rate: 75 },
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
  },
}));

const PipelineStageCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.background.paper,
  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const OpportunityCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 1.5,
  background: theme.palette.background.paper,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
  },
}));

const SalesPipeline: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setFilterAnchorEl(null);
    setSortAnchorEl(null);
  };

  // Calculate pipeline total value
  const pipelineTotal = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  
  // Calculate weighted pipeline
  const weightedPipeline = opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);

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
                Sales Pipeline
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Track opportunities, analyze your sales funnel, and forecast revenue
              </Typography>
            </Paper>
          </Grid>

          {/* Summary Cards */}
          <Grid item xs={12} md={3}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Pipeline Value
                  </Typography>
                  <MoneyIcon color="primary" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  ${pipelineTotal.toLocaleString()}
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
                    vs last month
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
                    Weighted Pipeline
                  </Typography>
                  <MoneyIcon color="secondary" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  ${weightedPipeline.toLocaleString()}
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
                    vs last month
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
                    Opportunity Count
                  </Typography>
                  <BusinessIcon color="info" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  {opportunities.length}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="+5" 
                    size="small" 
                    color="success"
                    sx={{ height: 24 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs last month
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
                  <BusinessIcon color="success" />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: 600 }}>
                  ${Math.round(pipelineTotal / opportunities.length).toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="+7.5%" 
                    size="small" 
                    color="success"
                    sx={{ height: 24 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs last month
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Pipeline Funnel Chart */}
          <Grid item xs={12} md={7}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Pipeline Funnel
                  </Typography>
                  <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ minHeight: 36 }}
                  >
                    <Tab label="Count" sx={{ minHeight: 36, py: 0 }} />
                    <Tab label="Value" sx={{ minHeight: 36, py: 0 }} />
                  </Tabs>
                </Box>
                <Box sx={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <FunnelChart>
                      <Tooltip 
                        formatter={(value) => [
                          tabValue === 0 
                            ? `${value} Opportunities` 
                            : `$${Number(value).toLocaleString()}`,
                          undefined
                        ]}
                        contentStyle={{ 
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.divider
                        }}
                      />
                      <Funnel
                        dataKey="value"
                        data={pipelineStages}
                        nameKey="name"
                        fill="#8884d8"
                      >
                        {pipelineStages.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Conversion Rates */}
          <Grid item xs={12} md={5}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Conversion Rates
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Stack spacing={3}>
                  {conversionData.map((item, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={500}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {item.rate}%
                        </Typography>
                      </Box>
                      <BorderLinearProgress
                        variant="determinate"
                        value={item.rate}
                        sx={{ 
                          mb: 0.5,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 
                              item.rate > 70 ? theme.palette.success.main :
                              item.rate > 50 ? theme.palette.info.main :
                              theme.palette.warning.main
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Pipeline Board */}
          <Grid item xs={12}>
            <StyledCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Pipeline Board
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    size="small"
                    placeholder="Search opportunities..."
                    sx={{ 
                      width: 240,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                  <Button 
                    variant="outlined" 
                    startIcon={<FilterIcon />}
                    size="small"
                    onClick={handleFilterClick}
                  >
                    Filter
                  </Button>
                  <Menu
                    anchorEl={filterAnchorEl}
                    open={Boolean(filterAnchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>All Opportunities</MenuItem>
                    <MenuItem onClick={handleMenuClose}>My Opportunities</MenuItem>
                    <MenuItem onClick={handleMenuClose}>High Value ({'>'}$100k)</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Closing This Month</MenuItem>
                  </Menu>
                  <Button 
                    variant="outlined" 
                    startIcon={<SortIcon />}
                    size="small"
                    onClick={handleSortClick}
                  >
                    Sort
                  </Button>
                  <Menu
                    anchorEl={sortAnchorEl}
                    open={Boolean(sortAnchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Value (High to Low)</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Value (Low to High)</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Closing Date (Earliest)</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Probability (High to Low)</MenuItem>
                  </Menu>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    size="small"
                  >
                    Add Opportunity
                  </Button>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ p: 2, overflowX: 'auto' }}>
                <Grid container spacing={2} sx={{ minWidth: 1000 }}>
                  {/* Pipeline Stages */}
                  {['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won'].map((stage) => (
                    <Grid item xs={12} md={15/5} key={stage}>
                      <PipelineStageCard>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {stage}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {opportunities.filter(opp => opp.stage === stage).length} opportunities
                            </Typography>
                          </Box>
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ flexGrow: 1, overflow: 'auto', maxHeight: 500 }}>
                          {opportunities
                            .filter(opp => opp.stage === stage)
                            .map((opportunity) => (
                              <OpportunityCard key={opportunity.id}>
                                <Box sx={{ mb: 1 }}>
                                  <Typography variant="subtitle2" noWrap>
                                    {opportunity.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" noWrap>
                                    {opportunity.company}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                  <Typography variant="body2" fontWeight={500}>
                                    ${opportunity.value.toLocaleString()}
                                  </Typography>
                                  <Chip 
                                    label={`${opportunity.probability}%`}
                                    size="small" 
                                    color={
                                      opportunity.probability > 75 ? 'success' :
                                      opportunity.probability > 50 ? 'primary' :
                                      opportunity.probability > 25 ? 'warning' : 'error'
                                    }
                                    sx={{ height: 20, fontSize: '0.75rem' }}
                                  />
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar 
                                      src={opportunity.avatar}
                                      sx={{ width: 24, height: 24, mr: 1 }}
                                    >
                                      {opportunity.owner.charAt(0)}
                                    </Avatar>
                                    <Typography variant="caption" color="text.secondary">
                                      {opportunity.owner}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TimeIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                                    <Typography variant="caption" color="text.secondary">
                                      {opportunity.daysInStage}d
                                    </Typography>
                                  </Box>
                                </Box>
                              </OpportunityCard>
                            ))}
                          {opportunities.filter(opp => opp.stage === stage).length === 0 && (
                            <Box 
                              sx={{ 
                                textAlign: 'center', 
                                py: 4, 
                                color: 'text.secondary',
                                border: '2px dashed',
                                borderColor: 'divider',
                                borderRadius: 2
                              }}
                            >
                              <Typography variant="body2">
                                No opportunities
                              </Typography>
                              <Button
                                size="small"
                                startIcon={<AddIcon />}
                                sx={{ mt: 1 }}
                              >
                                Add
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </PipelineStageCard>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default SalesPipeline; 