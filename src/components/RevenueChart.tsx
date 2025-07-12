'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Skeleton } from '@mui/material';
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from 'recharts';
import type { MonthlyRevenueRecord } from '../types/finance';

interface RevenueChartProps {
    stockId: string;
}

type ChartData = {
    month: string;
    revenue: number;
    yoy: number | null;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ stockId }) => {
    const [data, setData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);

    const endYear = new Date().getFullYear();
    const startYear = endYear - 3; // 4 years

    const yAxisInterval: number = 5000000
    const yTickCount: number = 6
    const generateYAxisTicks = () => {
        const res: number[] = [0]
        for (let i = 1; i < yTickCount; i++) {
            res.push(res[i - 1] + yAxisInterval)
        }
        return res
    }
    console.log('result: ' + typeof (generateYAxisTicks()))

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

    if (loading) {
        return (
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                            <Skeleton width={120} />
                        </Typography>
                        <Skeleton variant="rectangular" height={320} />
                    </CardContent>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Card>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={data} margin={{ top: 60, right: 40, left: 100 }} >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                interval={12}
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => {
                                    const [year, month] = String(value).split('/');
                                    return year;
                                }}
                            />

                            <YAxis
                                yAxisId="left"
                                orientation="left"
                                tickLine={false}
                                tickCount={5}
                                tickFormatter={v => v.toLocaleString()}
                                label={{ value: '千元', position: 'top', offset: 40 }}

                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                tickCount={10}
                                label={{ value: '%', position: 'top', offset: 40 }}
                            />
                            <Tooltip
                                formatter={(value: any, name: string) =>
                                    name === '每月營收'
                                        ? `${Number(value).toLocaleString()}`
                                        : `${value?.toFixed(2)}%`
                                }
                            />
                            <Legend />
                            <Bar
                                yAxisId="left"
                                dataKey="revenue"
                                name="每月營收"
                                fill="#FFD600"
                                barSize={18}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="yoy"
                                name="單月營收年增率 (%)"
                                stroke="#D32F2F"
                                strokeWidth={2}
                                dot={false}
                                connectNulls
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RevenueChart;