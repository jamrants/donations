import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';
import { IsDesktop } from '../utils/mediaQueries';
import Header from './Header';

const Layout = ({ children }) => (
  <Box
    mx={IsDesktop() ? '20%' : '24px'}
  >
    <Header />
    { children }
  </Box>
)

export default Layout;