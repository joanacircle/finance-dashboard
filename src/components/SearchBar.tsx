import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC = () => (
  <Box sx={{ bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'center', mb: 4, p: 4 }}>
    <TextField
      variant="outlined"
      placeholder="輸入台 / 美股代號，查看公司價值"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ width: 400, bgcolor: 'white' }}
    />
  </Box>
);

export default SearchBar;