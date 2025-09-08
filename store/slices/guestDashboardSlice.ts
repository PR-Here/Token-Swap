import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChartDataPoint {
  value: number;
  label: string;
}

interface ChartData {
  [key: string]: ChartDataPoint[];
}

interface DashboardState {
  selectedTimeRange: string;
  chartData: ChartData;
  currentPrice: string;
  goal: string;
  isLoading: boolean;
  error: string | null;
}

const initialChartData: ChartData = {
  '6h': [
    { value: 300, label: '12PM' },
    { value: 450, label: '2PM' },
    { value: 380, label: '4PM' },
    { value: 520, label: '6PM' },
    { value: 480, label: '8PM' },
    { value: 580, label: '10PM' },
    { value: 520, label: '12AM' },
  ],
  '12h': [
    { value: 250, label: '6AM' },
    { value: 380, label: '8AM' },
    { value: 320, label: '10AM' },
    { value: 450, label: '12PM' },
    { value: 520, label: '2PM' },
    { value: 480, label: '4PM' },
    { value: 580, label: '6PM' },
  ],
  '24h': [
    { value: 280, label: 'Sun' },
    { value: 420, label: 'Mon' },
    { value: 350, label: 'Tue' },
    { value: 480, label: 'Wed' },
    { value: 580, label: 'Thu' },
    { value: 520, label: 'Fri' },
    { value: 450, label: 'Sat' },
  ],
  '1W': [
    { value: 200, label: 'Week 1' },
    { value: 350, label: 'Week 2' },
    { value: 280, label: 'Week 3' },
    { value: 420, label: 'Week 4' },
    { value: 380, label: 'Week 5' },
    { value: 520, label: 'Week 6' },
    { value: 580, label: 'Week 7' },
  ],
  '1M': [
    { value: 220, label: 'Jan' },
    { value: 380, label: 'Feb' },
    { value: 320, label: 'Mar' },
    { value: 450, label: 'Apr' },
    { value: 400, label: 'May' },
    { value: 520, label: 'Jun' },
    { value: 580, label: 'Jul' },
  ],
  ALL: [
    { value: 180, label: '2020' },
    { value: 320, label: '2021' },
    { value: 280, label: '2022' },
    { value: 420, label: '2023' },
    { value: 380, label: '2024' },
    { value: 520, label: '2025' },
  ],
};

const initialState: DashboardState = {
  selectedTimeRange: '24h',
  chartData: initialChartData,
  currentPrice: '$106,996.3',
  goal: 'I want a vineyard',
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<string>) => {
      state.selectedTimeRange = action.payload;
    },
    setCurrentPrice: (state, action: PayloadAction<string>) => {
      state.currentPrice = action.payload;
    },
    setGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    },
    setChartData: (state, action: PayloadAction<ChartData>) => {
      state.chartData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setTimeRange,
  setCurrentPrice,
  setGoal,
  setChartData,
  setLoading,
  setError,
  clearError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer; 