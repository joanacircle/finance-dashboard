'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Skeleton } from '@mui/material';

interface SectionHeaderProps {
    stockId: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ stockId }) => {
    const [stockName, useStockName] = useState('')
    useEffect(() => {
        axios
        .get('https://api.finmindtrade.com/api/v4/data?', {
            params: {
                dataset: 'TaiwanStockInfo',
                data_id: stockId,
            },
            headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
        }).then(res => {
            useStockName(res.data.data[0].stock_name)
        })
    }, [])

    return(
        <Box
            sx={{
            background: '#f5f5f5',
            borderRadius: '4px 4px 0 0',
            px: 2,
            py: 1,
            mb: 1,
            }}
        >
        <Typography
        variant="subtitle1"
        sx={{ whiteSpace: 'nowrap', fontWeight: 500, color: '#222', mr: 2 }}
        >
        {stockName ? `${stockName} (${stockId})` : <Skeleton variant="text" width={120} height={28} sx={{ mr: 2 }} />}
        </Typography>
    </Box>
)};

export default SectionHeader;