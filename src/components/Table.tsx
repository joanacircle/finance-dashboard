'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import type { MonthlyRevenueRecord } from '../types/finance';

type RevenueRow = {
  month: string;
  revenue: number;
  yoy: string;
};

const Table: React.FC = () => {
  const [tableRows, setTableRows] = useState<RevenueRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const endYear = new Date().getFullYear();
  const startYear = endYear - 3;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://api.finmindtrade.com/api/v4/data?', {
        params: {
          dataset: 'TaiwanStockMonthRevenue',
          data_id: '2330',
          start_date: `${startYear}-01-01`,
          end_date: `${endYear}-12-31`,
        },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        const lastTwoYearsData = data.filter(
          (v: MonthlyRevenueRecord) => v.revenue_year <= endYear && v.revenue_year > endYear - 2
        );
        const dataMap = new Map<string, MonthlyRevenueRecord>();
        data.forEach((item: MonthlyRevenueRecord) => {
            const key = `${item.revenue_year}-${item.revenue_month}`;
            dataMap.set(key, item);
        })


        setTableRows(
            lastTwoYearsData.map((item: MonthlyRevenueRecord) => {
            const lastYearKey = `${item.revenue_year - 1}-${item.revenue_month}`;
            const lastYear = dataMap.get(lastYearKey);
            return {
              month: `${item.revenue_year}${String(item.revenue_month).padStart(2,'0')}`,
              revenue: item.revenue,
              yoy: lastYear
                ? (((item.revenue / lastYear.revenue - 1) * 100).toFixed(2))
                : '',
            };
          })
        );
        setError(null);
      })
      .catch((err) => {
        setError('資料獲取失敗');
      })
      .finally(() => setLoading(false));
  }, [startYear, endYear]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [tableRows]);

  // Memoize derived arrays
  const months = useMemo(() => tableRows.map((row) => row.month), [tableRows]);
  const revenues = useMemo(
    () => tableRows.map((row) => row.revenue),
    [tableRows]
  );
  const yoyRates = useMemo(() => tableRows.map((row) => row.yoy), [tableRows]);

  if (loading) {
    return <Typography>載入中...</Typography>;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            詳細數據
          </Typography>
          <TableContainer component={Paper} ref={scrollRef}>
            <MuiTable>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      minWidth: 160,
                    }}
                  >
                    年度月份
                  </TableCell>
                  {months.map((month, idx) => (
                    <TableCell
                      key={idx}
                      sx={{ textAlign: 'end', border: '1px solid #e0e0e0' }}
                    >
                      {month}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      minWidth: 160,
                    }}
                  >
                    每月營收
                  </TableCell>
                  {revenues.map((revenue, idx) => (
                    <TableCell
                      key={idx}
                      sx={{ textAlign: 'end', border: '1px solid #e0e0e0' }}
                    >
                      {Number(revenue).toLocaleString()}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      minWidth: 160,
                    }}
                  >
                    單月營收年增率 (%)
                  </TableCell>
                  {yoyRates.map((yoy, idx) => (
                    <TableCell
                      key={idx}
                      sx={{ textAlign: 'end', border: '1px solid #e0e0e0' }}
                    >
                      {yoy !== '' ? Number(yoy).toLocaleString() : ''}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </MuiTable>
          </TableContainer>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 1 }}
          >
            單位說明：千元，數據來自公開資訊觀測站
            <br />
            資訊僅供參考，請投資人審慎判斷
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Table;