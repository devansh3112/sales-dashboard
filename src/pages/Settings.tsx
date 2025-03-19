import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Box,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Button,
  FormControlLabel,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  Alert,
  IconButton,
  Avatar,
  Badge,
  Chip,
  useTheme,
  SelectChangeEvent,
  styled
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  BarChart as AnalyticsIcon,
  DataUsage as DataIcon,
  Share as ShareIcon,
  Email as EmailIcon,
  Language as LanguageIcon,
  CloudUpload as UploadIcon,
  Edit as EditIcon,
  SaveAlt as SaveIcon,
  AddAPhoto as PhotoIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/layout/DashboardLayout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Styled components
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Settings: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [chartAnimations, setChartAnimations] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleTimezoneChange = (event: SelectChangeEvent) => {
    setTimezone(event.target.value);
  };

  const handleRefreshIntervalChange = (event: Event, newValue: number | number[]) => {
    setRefreshInterval(newValue as number);
  };

  const handleSaveSettings = () => {
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
    }, 3000);
  };

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
                Settings
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Manage your preferences, account settings, and application configurations
              </Typography>
            </Paper>
          </Grid>

          {successAlert && (
            <Grid item xs={12}>
              <Alert 
                severity="success" 
                onClose={() => setSuccessAlert(false)}
                sx={{ borderRadius: 2 }}
              >
                Your settings have been saved successfully.
              </Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  aria-label="settings tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ px: 2 }}
                >
                  <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
                  <Tab icon={<NotificationsIcon />} label="Notifications" iconPosition="start" />
                  <Tab icon={<PaletteIcon />} label="Appearance" iconPosition="start" />
                  <Tab icon={<SecurityIcon />} label="Security" iconPosition="start" />
                  <Tab icon={<AnalyticsIcon />} label="Analytics" iconPosition="start" />
                  <Tab icon={<DataIcon />} label="Data" iconPosition="start" />
                </Tabs>
              </Box>

              {/* Profile Settings */}
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <IconButton 
                          sx={{ 
                            bgcolor: 'background.paper', 
                            border: `2px solid ${theme.palette.divider}`,
                            width: 32, 
                            height: 32,
                          }}
                          component="label"
                        >
                          <PhotoIcon fontSize="small" />
                          <VisuallyHiddenInput type="file" />
                        </IconButton>
                      }
                    >
                      <Avatar 
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        sx={{ width: 120, height: 120 }}
                      />
                    </Badge>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        defaultValue="John"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        defaultValue="Smith"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        defaultValue="john.smith@example.com"
                        variant="outlined"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Job Title"
                        defaultValue="Sales Manager"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        defaultValue="Sales professional with over 10 years of experience in B2B software sales."
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="language-label">Language</InputLabel>
                        <Select
                          labelId="language-label"
                          value={language}
                          label="Language"
                          onChange={handleLanguageChange}
                        >
                          <MenuItem value="en">English</MenuItem>
                          <MenuItem value="es">Spanish</MenuItem>
                          <MenuItem value="fr">French</MenuItem>
                          <MenuItem value="de">German</MenuItem>
                          <MenuItem value="zh">Chinese</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="timezone-label">Timezone</InputLabel>
                        <Select
                          labelId="timezone-label"
                          value={timezone}
                          label="Timezone"
                          onChange={handleTimezoneChange}
                        >
                          <MenuItem value="UTC">UTC (Coordinated Universal Time)</MenuItem>
                          <MenuItem value="EST">EST (Eastern Standard Time)</MenuItem>
                          <MenuItem value="CST">CST (Central Standard Time)</MenuItem>
                          <MenuItem value="MST">MST (Mountain Standard Time)</MenuItem>
                          <MenuItem value="PST">PST (Pacific Standard Time)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button variant="outlined">Cancel</Button>
                        <Button 
                          variant="contained" 
                          onClick={handleSaveSettings}
                          startIcon={<SaveIcon />}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              {/* Notification Settings */}
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Notification Preferences
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notificationsEnabled} 
                          onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
                        />
                      }
                      label="Enable all notifications"
                    />
                    <Box sx={{ ml: 3, mt: 2 }}>
                      <List disablePadding>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <NotificationsIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Sales alerts" 
                            secondary="Get notified when sales targets are reached or missed"
                          />
                          <Switch 
                            edge="end"
                            disabled={!notificationsEnabled}
                            defaultChecked
                          />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <AnalyticsIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Performance reports" 
                            secondary="Weekly and monthly performance reports"
                          />
                          <Switch 
                            edge="end"
                            disabled={!notificationsEnabled}
                            defaultChecked
                          />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <PersonIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Team activity" 
                            secondary="Updates on team member activities and achievements"
                          />
                          <Switch 
                            edge="end"
                            disabled={!notificationsEnabled}
                            defaultChecked
                          />
                        </ListItem>
                      </List>
                    </Box>
                  </FormGroup>
                  
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Email Notifications
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={emailNotifications} 
                          onChange={() => setEmailNotifications(!emailNotifications)} 
                        />
                      }
                      label="Receive email notifications"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                      You'll receive emails for important alerts and weekly digests
                    </Typography>
                    
                    <TextField
                      fullWidth
                      label="Notification Email"
                      defaultValue="john.smith@example.com"
                      variant="outlined"
                      disabled={!emailNotifications}
                      sx={{ mb: 2 }}
                    />
                  </FormGroup>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button 
                      variant="contained" 
                      onClick={handleSaveSettings}
                      startIcon={<SaveIcon />}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </TabPanel>

              {/* Appearance Settings */}
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Theme Preferences
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper
                        sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          bgcolor: 'background.paper',
                          border: theme.palette.mode === 'light' ? '2px solid' : '2px solid transparent',
                          borderColor: theme.palette.mode === 'light' ? 'primary.main' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: '100%', 
                            height: 100, 
                            bgcolor: '#ffffff',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                          }}
                        >
                          <Box sx={{ height: 20, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }} />
                          <Box sx={{ display: 'flex', flex: 1 }}>
                            <Box sx={{ width: 60, bgcolor: '#f5f5f5', borderRight: '1px solid #e0e0e0' }} />
                            <Box sx={{ flex: 1, p: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              <Box sx={{ height: 10, width: '60%', bgcolor: '#e0e0e0', borderRadius: 0.5 }} />
                              <Box sx={{ height: 10, width: '40%', bgcolor: '#e0e0e0', borderRadius: 0.5 }} />
                              <Box sx={{ height: 10, width: '80%', bgcolor: '#e0e0e0', borderRadius: 0.5 }} />
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Light Mode
                        </Typography>
                        {theme.palette.mode === 'light' && (
                          <Chip
                            label="Active"
                            color="primary"
                            size="small"
                          />
                        )}
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper
                        sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          bgcolor: '#1e1e1e',
                          border: theme.palette.mode === 'dark' ? '2px solid' : '2px solid transparent',
                          borderColor: theme.palette.mode === 'dark' ? 'primary.main' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: '100%', 
                            height: 100, 
                            bgcolor: '#121212',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'rgba(255,255,255,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                          }}
                        >
                          <Box sx={{ height: 20, bgcolor: '#1e1e1e', borderBottom: '1px solid rgba(255,255,255,0.1)' }} />
                          <Box sx={{ display: 'flex', flex: 1 }}>
                            <Box sx={{ width: 60, bgcolor: '#1e1e1e', borderRight: '1px solid rgba(255,255,255,0.1)' }} />
                            <Box sx={{ flex: 1, p: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              <Box sx={{ height: 10, width: '60%', bgcolor: '#333', borderRadius: 0.5 }} />
                              <Box sx={{ height: 10, width: '40%', bgcolor: '#333', borderRadius: 0.5 }} />
                              <Box sx={{ height: 10, width: '80%', bgcolor: '#333', borderRadius: 0.5 }} />
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'white' }}>
                          Dark Mode
                        </Typography>
                        {theme.palette.mode === 'dark' && (
                          <Chip
                            label="Active"
                            color="primary"
                            size="small"
                          />
                        )}
                      </Paper>
                    </Grid>
                  </Grid>

                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Dashboard Layout
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Compact navigation"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Show welcome banner"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Dense tables"
                    />
                  </FormGroup>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button variant="outlined">Reset to Default</Button>
                    <Button 
                      variant="contained" 
                      onClick={handleSaveSettings}
                      startIcon={<SaveIcon />}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </TabPanel>

              {/* Security Settings */}
              <TabPanel value={tabValue} index={3}>
                <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Password & Authentication
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Password should be at least 8 characters, include one uppercase letter, number, and special character.
                  </Typography>
                  
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Two-Factor Authentication
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch />}
                      label="Enable two-factor authentication"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                      Enhance account security by requiring a verification code in addition to your password.
                    </Typography>
                  </FormGroup>
                  
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Session Management
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id="session-timeout-label">Session Timeout</InputLabel>
                      <Select
                        labelId="session-timeout-label"
                        defaultValue="30"
                        label="Session Timeout"
                      >
                        <MenuItem value="15">15 minutes</MenuItem>
                        <MenuItem value="30">30 minutes</MenuItem>
                        <MenuItem value="60">1 hour</MenuItem>
                        <MenuItem value="120">2 hours</MenuItem>
                        <MenuItem value="240">4 hours</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Button 
                    variant="outlined" 
                    color="error" 
                    sx={{ mt: 2 }}
                  >
                    Sign Out All Devices
                  </Button>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button 
                      variant="contained" 
                      onClick={handleSaveSettings}
                      startIcon={<SaveIcon />}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </TabPanel>

              {/* Analytics Settings */}
              <TabPanel value={tabValue} index={4}>
                <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Analytics Preferences
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={analyticsEnabled} 
                          onChange={() => setAnalyticsEnabled(!analyticsEnabled)} 
                        />
                      }
                      label="Enable analytics features"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={chartAnimations} 
                          onChange={() => setChartAnimations(!chartAnimations)}
                          disabled={!analyticsEnabled}
                        />
                      }
                      label="Enable chart animations"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={autoRefresh} 
                          onChange={() => setAutoRefresh(!autoRefresh)}
                          disabled={!analyticsEnabled}
                        />
                      }
                      label="Auto-refresh dashboards"
                    />
                    
                    <Box sx={{ ml: 4, mt: 2, maxWidth: 400 }}>
                      <Typography id="refresh-interval-slider" gutterBottom>
                        Refresh interval: {refreshInterval} minutes
                      </Typography>
                      <Slider
                        disabled={!analyticsEnabled || !autoRefresh}
                        value={refreshInterval}
                        onChange={handleRefreshIntervalChange}
                        aria-labelledby="refresh-interval-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                      />
                    </Box>
                  </FormGroup>
                  
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Default Dashboard View
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <FormControl fullWidth sx={{ maxWidth: 400 }}>
                    <InputLabel id="default-dashboard-label">Default Dashboard</InputLabel>
                    <Select
                      labelId="default-dashboard-label"
                      defaultValue="sales"
                      label="Default Dashboard"
                      disabled={!analyticsEnabled}
                    >
                      <MenuItem value="sales">Sales Overview</MenuItem>
                      <MenuItem value="performance">Performance Metrics</MenuItem>
                      <MenuItem value="pipeline">Sales Pipeline</MenuItem>
                      <MenuItem value="customers">Customer Insights</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button 
                      variant="contained" 
                      onClick={handleSaveSettings}
                      startIcon={<SaveIcon />}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </TabPanel>

              {/* Data Settings */}
              <TabPanel value={tabValue} index={5}>
                <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Data Management
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                        Export Data
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Download your sales data and reports as CSV or Excel files.
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" startIcon={<ShareIcon />}>
                          Export as CSV
                        </Button>
                        <Button variant="outlined" startIcon={<ShareIcon />}>
                          Export as Excel
                        </Button>
                      </Box>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                        Import Data
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Upload data files to import into the system.
                      </Typography>
                      <Button 
                        variant="outlined" 
                        component="label" 
                        startIcon={<UploadIcon />}
                      >
                        Upload File
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    </Box>
                  </Stack>
                  
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Privacy Settings
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={dataSharing} 
                          onChange={() => setDataSharing(!dataSharing)} 
                        />
                      }
                      label="Share anonymous usage data"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                      Help us improve by sharing anonymous usage statistics and error reports.
                    </Typography>
                  </FormGroup>
                  
                  <Button 
                    variant="outlined" 
                    color="error"
                  >
                    Clear All Dashboard Data
                  </Button>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button variant="outlined">Cancel</Button>
                    <Button 
                      variant="contained" 
                      onClick={handleSaveSettings}
                      startIcon={<SaveIcon />}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default Settings; 