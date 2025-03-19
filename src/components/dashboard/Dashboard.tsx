import React from 'react';
import { Container, Grid, Typography, Paper, Divider } from '@mui/material';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardCards from './DashboardCards';
import ChartsGrid from './ChartComponents';

const Dashboard: React.FC = () => {
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
                Sales Dashboard
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Your comprehensive overview of sales performance, trends, and key metrics
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <DashboardCards />
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
              Analytics & Insights
            </Typography>
            <ChartsGrid />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default Dashboard; 