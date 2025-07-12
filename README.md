# Finance Dashboard

A modern, responsive finance dashboard built with Next.js that provides real-time stock revenue data visualization and analysis. The application fetches monthly revenue data for Taiwanese stocks and presents it through interactive charts and detailed tables.

## 🚀 Features

- **Real-time Data**: Fetches live stock revenue data from FinMind API
- **Interactive Charts**: Visualize revenue trends with Recharts
- **Responsive Design**: Modern UI built with Material-UI and Tailwind CSS
- **Search Functionality**: Search for different stock symbols (currently supports Taiwanese stocks)
- **Year-over-Year Analysis**: Compare current revenue with previous year's performance
- **TypeScript Support**: Fully typed for better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5
- **Language**: TypeScript 5.8.3
- **UI Library**: Material-UI (MUI) 7.2.0
- **Styling**: Tailwind CSS 3.4.17
- **Charts**: Recharts 3.1.0
- **HTTP Client**: Axios 1.10.0
- **Data Source**: FinMind API

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- A FinMind API key (free tier available)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd finance-dashboard
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your FinMind API key:

```env
NEXT_PUBLIC_API_KEY=your_finmind_api_key_here
```

To get a free API key, visit [FinMind](https://finmindtrade.com/) and sign up for an account.

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📊 Usage

1. **Default View**: The dashboard loads with TSMC (2330) stock data by default
2. **Search Stocks**: Use the search bar to look up different stock symbols
3. **Data Visualization**: View revenue trends in the interactive chart
4. **Detailed Table**: Scroll through the table for detailed monthly revenue data
5. **Year-over-Year Analysis**: Compare current performance with previous years

## 🏗️ Project Structure

```
finance-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Main dashboard page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── RevenueChart.tsx    # Chart visualization component
│   │   ├── SearchBar.tsx       # Search functionality
│   │   ├── SectionHeader.tsx   # Header component
│   │   └── Table.tsx           # Data table component
│   └── types/
│       └── finance.ts          # TypeScript type definitions
├── public/                     # Static assets
└── package.json               # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📈 Data Sources

The application uses the FinMind API to fetch:
- **Dataset**: TaiwanStockMonthRevenue
- **Data**: Monthly revenue records for Taiwanese stocks
- **Time Range**: Last 3 years of data
- **Calculations**: Year-over-year growth percentages


### Styling

The project uses both Material-UI and Tailwind CSS:
- Material-UI components for layout and interactions
- Tailwind CSS for utility classes and custom styling

### Chart Customization

Modify `src/components/RevenueChart.tsx` to customize chart appearance and behavior.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FinMind](https://finmindtrade.com/) for providing the financial data API
- [Next.js](https://nextjs.org/) for the React framework
- [Material-UI](https://mui.com/) for the component library
- [Recharts](https://recharts.org/) for the charting library

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/finance-dashboard/issues) page
2. Create a new issue with detailed information
3. Include your Node.js version and any error messages

---

**Note**: This project is for educational and personal use. Please ensure compliance with FinMind's API terms of service for commercial use.
