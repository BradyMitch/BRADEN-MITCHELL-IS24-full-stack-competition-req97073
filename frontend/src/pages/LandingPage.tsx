import { Box, Grid, Stack } from '@mui/material';
import { PageLayout } from 'layouts';
import React from 'react';

const sx = {
  landingPage: { marginTop: '6.5vh' },
  section: {
    height: '85vh',
    backgroundColor: 'var(--white)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const LandingPage = () => {
  return (
    <Stack sx={sx.landingPage}>
      <Box sx={sx.section}>
        <PageLayout>
          <Grid container justifyContent="space-between" alignItems="center" gap={2}>
            <Grid item xs={12} sm={10}>
              <Stack gap={2}></Stack>
            </Grid>
          </Grid>
        </PageLayout>
      </Box>
    </Stack>
  );
};

export default LandingPage;
