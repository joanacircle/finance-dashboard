import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import SectionHeader from '../components/SectionHeader'
import RevenueChart from '../components/RevenueChart';

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <SearchBar />
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
        <SectionHeader stockId='2330'/>
        <RevenueChart stockId='2330' /> 
        <Table stockId='2330'/>
      </Box>
    </Box>
  );
}