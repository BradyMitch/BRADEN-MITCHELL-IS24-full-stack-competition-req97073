import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import BCGovLogo from 'assets/BCGovLogo.png';
import React from 'react';

const sx = {
  header: {
    border: 'solid',
    backgroundColor: 'header.main',
    borderColor: 'header.border',
    borderWidth: '0px 0px 0.3vh 0px',
    borderBottom: '3px solid var(--bc-yellow)',
    minHeight: '6.5vh',
  },
  appBar: {
    maxWidth: '1096px',
    margin: 'auto',
  },
  toolbar: {
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
  },
};

const Header = () => {
  const LogoAndTitle = () => {
    return (
      <>
        <img src={BCGovLogo} style={{ maxHeight: '65px' }} alt="BC Government Logo" />
        <Typography
          variant="h6"
          component="div"
          sx={{ color: 'var(--white)', fontWeight: 'bold', flexGrow: 1 }}
        >
          CITZ, IMB Product Catalog
        </Typography>
      </>
    );
  };

  return (
    <Box sx={sx.header}>
      <AppBar position="static" color="transparent" elevation={0} sx={sx.appBar}>
        <Toolbar>
          <Box sx={sx.toolbar}>
            <LogoAndTitle />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
