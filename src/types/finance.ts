export type MonthlyRevenueRecord = {
  country: string;
  date: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
  stock_id: string;
};

export type ChartData = {
  month: string;
  revenue: number;
  yoy: number | null;
};