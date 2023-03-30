import { Container } from '@mui/material';
import { ReactNode } from 'react';
import React from 'react';

interface IPageLayout {
  children: ReactNode;
}

const PageLayout = (props: IPageLayout) => {
  const { children } = props;
  return (
    <Container
      sx={{
        width: '100% !important',
        minHeight: '86.8vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </Container>
  );
};

export default PageLayout;
