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
import type { ChartData } from '../types/finance';

interface RevenueChartProps {
    data: ChartData[];
    loading: boolean;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data, loading }) => {
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