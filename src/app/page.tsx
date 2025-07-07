import React from 'react';
import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <SearchBar />
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
        <Table />
      </Box>
    </Box>
  );
}