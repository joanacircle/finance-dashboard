'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import SectionHeader from '../components/SectionHeader';
import RevenueChart from '../components/RevenueChart';
import axios from 'axios';
import type { MonthlyRevenueRecord, ChartData } from '../types/finance';

export default function Home() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const stockId = '2330';
  const endYear = new Date().getFullYear();
  const startYear = endYear - 3;

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://api.finmindtrade.com/api/v4/data?', {
        params: {
          dataset: 'TaiwanStockMonthRevenue',
          data_id: stockId,
          start_date: `${startYear}-01-01`,
          end_date: `${endYear}-12-31`,
        },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      })
      .then((res) => {
        const raw: MonthlyRevenueRecord[] = res.data.data;
        const lastTwoYearsData: MonthlyRevenueRecord[] = raw.filter(
          (v: MonthlyRevenueRecord) => v.revenue_year <= endYear && v.revenue_year > endYear - 3
        ); // 3 years
        const dataMap = new Map<string, MonthlyRevenueRecord>();
        raw.forEach((item) => {
          const key = `${item.revenue_year}-${item.revenue_month}`;
          dataMap.set(key, item);
        });
        const chartData: ChartData[] = lastTwoYearsData.map((item) => {
          const lastYearKey = `${item.revenue_year - 1}-${item.revenue_month}`;
          const lastYear = dataMap.get(lastYearKey);
          return {
            month: `${item.revenue_year}/${String(item.revenue_month).padStart(2, '0')}`,
            revenue: item.revenue / 1000,
            yoy: lastYear ? ((item.revenue / lastYear.revenue - 1) * 100) : null,
          };
        });
        setData(chartData);
      })
      .finally(() => setLoading(false));
  }, [stockId, startYear, endYear]);

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <SearchBar />
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
        <SectionHeader stockId={stockId} />
        <RevenueChart data={data} loading={loading} />
        <Table data={data} loading={loading} />
      </Box>
    </Box>
  );
}