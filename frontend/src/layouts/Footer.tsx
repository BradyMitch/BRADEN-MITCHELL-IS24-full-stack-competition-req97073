import { Box, Typography } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

const sx = {
  footer: {
    backgroundColor: 'footer.main',
    color: '#fff',
    height: '6.5vh !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: '12px',
  },
  footerInner: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1048px',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
};

const Footer = () => (
  <Box sx={sx.footer}>
    <Box sx={sx.footerInner}>
      <Typography variant="h6">IS24 Full Stack Competition Submission by Brady Mitchell</Typography>
    </Box>
    <a
      href="https://github.com/BradyMitch/BRADEN-MITCHELL-IS24-full-stack-competition-req97073"
      style={{ color: 'inherit' }}
    >
      <GitHubIcon />
    </a>
  </Box>
);

export default Footer;
