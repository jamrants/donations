import React from 'react';
import PropTypes from 'prop-types';
import { Box, PseudoBox } from '@chakra-ui/core';
import { IsDesktop } from '../utils/mediaQueries';
import Header from './Header';
import Hero from './Hero';

const Layout = ({ children, title, subtitle }) => (
  <Box
    backgroundColor='dark'
    minHeight='100vh'
  >
    <Hero 
      title={title} 
      subtitle={subtitle}
      padding={IsDesktop() ? '20%' : '24px'}
    />
    <PseudoBox px={IsDesktop() ? '20%' : '24px'}>
      { children }
    </PseudoBox>
  </Box>
)

export default Layout;