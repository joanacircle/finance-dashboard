import { useEffect, useRef } from 'react';
import { Box, Card, CardContent, Typography, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material';
import type { ChartData } from '../types/finance';

interface TableProps {
  data: ChartData[];
  loading: boolean;
}

const Table: React.FC<TableProps> = ({ data, loading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  const months = data.map((row) => row.month);
  const revenues = data.map((row) => row.revenue);
  const yoyRates = data.map((row) => row.yoy);

  if (loading) {
    return (
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              <Skeleton width={80} />
            </Typography>
            <TableContainer component={Paper}>
              <MuiTable>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Skeleton width={60} />
                    </TableCell>
                    {[...Array(6)].map((_, idx) => (
                      <TableCell key={idx}>
                        <Skeleton width={60} />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(2)].map((_, rowIdx) => (
                    <TableRow key={rowIdx}>
                      <TableCell>
                        <Skeleton width={80} />
                      </TableCell>
                      {[...Array(6)].map((_, colIdx) => (
                        <TableCell key={colIdx}>
                          <Skeleton width={60} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </MuiTable>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    );
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
                      {yoy ? Number(yoy).toLocaleString() : ''}
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