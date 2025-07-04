import React from 'react';
import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <SearchBar />
    </Box>
  );
}